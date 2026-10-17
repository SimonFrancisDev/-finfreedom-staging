// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

interface IFreedomNFTRewardVault {
    function reserveRewards(address token, uint256 amount, bytes32 distributionId) external;
    function disburse(
        address token,
        address recipient,
        uint256 amount,
        bytes32 distributionId
    ) external;
}

interface IFreedomNFTRewardGuardian {
    function validateUpgrade(address proxy, address implementation) external view returns (bool);
}

contract FreedomNFTRewardDistributor is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable
{
    struct Period {
        uint64 cutoff;
        uint256 poolAmount;
        uint256 reservedAmount;
        bytes32[3] eligibleRoots;
        uint256[3] eligibleCounts;
        uint256[3] rewardPerMember;
        bool created;
        uint64 distributionAt;
    }

    address public rewardToken;
    IFreedomNFTRewardVault public vault;
    address public guardian;
    mapping(uint32 => Period) private _periods;
    mapping(uint32 => mapping(address => bool)) public claimed;

    event PeriodCreated(
        uint32 indexed periodId,
        uint64 indexed cutoff,
        uint256 poolAmount,
        uint256 reservedAmount,
        bytes32[3] eligibleRoots,
        uint256[3] eligibleCounts,
        uint256[3] rewardPerMember
    );
    event RewardClaimed(
        uint32 indexed periodId,
        address indexed member,
        uint8 indexed tier,
        uint256 amount
    );
    event GuardianUpdated(address indexed previousGuardian, address indexed newGuardian);
    event CycleScheduleConfigured(uint64 indexed firstDistributionAt);
    event RewardExclusionUpdated(address indexed member, bool excluded);

    error InvalidAddress();
    error InvalidContract(address target);
    error InvalidDate(uint16 year, uint8 month);
    error CutoffNotReached(uint64 cutoff);
    error PeriodAlreadyExists(uint32 periodId);
    error PeriodNotFound(uint32 periodId);
    error InvalidPoolAmount();
    error InvalidTier(uint8 tier);
    error InvalidEligibilityRoot(uint8 tier);
    error AlreadyClaimed(uint32 periodId, address member);
    error InvalidProof();
    error NoTierMembers(uint8 tier);
    error InvalidCycle(uint32 cycleId);
    error InvalidCycleSchedule(uint64 firstDistributionAt);
    error CycleScheduleAlreadyConfigured();
    error CycleScheduleNotConfigured();
    error DistributionNotReached(uint64 distributionAt);
    error LegacyPeriodCreationDisabled();
    error RewardRecipientExcluded(address member);

    uint256 private constant BPS = 10_000;
    uint64 public constant CYCLE_DURATION = 30 days;
    uint64 public constant ELIGIBILITY_FREEZE = 1 days;
    uint16[3] private TIER_BPS;
    address public rewardOperator;
    uint256 public constant MAX_DISTRIBUTION_BATCH = 50;
    uint64 public firstDistributionAt;
    mapping(address => bool) public rewardExcluded;

    event RewardOperatorUpdated(address indexed previousOperator, address indexed newOperator);
    error UnauthorizedRewardOperator();
    error InvalidDistributionBatch();

    modifier onlyRewardPublisher() {
        if (msg.sender != owner() && msg.sender != rewardOperator) revert UnauthorizedRewardOperator();
        _;
    }

    function setRewardOperator(address operator) external onlyOwner {
        emit RewardOperatorUpdated(rewardOperator, operator);
        rewardOperator = operator;
    }

    function configureCycleSchedule(
        uint64 firstDistributionAt_,
        address excludedId1,
        address rewardOperator_
    )
        external onlyOwner
    {
        if (firstDistributionAt != 0) revert CycleScheduleAlreadyConfigured();
        if (
            firstDistributionAt_ <= block.timestamp + ELIGIBILITY_FREEZE
                || firstDistributionAt_ % 1 days != 0
        ) {
            revert InvalidCycleSchedule(firstDistributionAt_);
        }
        if (excludedId1 == address(0) || rewardOperator_ == address(0)) revert InvalidAddress();

        address previousOperator = rewardOperator;
        firstDistributionAt = firstDistributionAt_;
        rewardExcluded[excludedId1] = true;
        rewardOperator = rewardOperator_;
        emit CycleScheduleConfigured(firstDistributionAt_);
        emit RewardExclusionUpdated(excludedId1, true);
        emit RewardOperatorUpdated(previousOperator, rewardOperator_);
    }

    function setRewardExclusion(address member, bool excluded) external onlyOwner {
        if (member == address(0)) revert InvalidAddress();
        rewardExcluded[member] = excluded;
        emit RewardExclusionUpdated(member, excluded);
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() { _disableInitializers(); }

    function initialize(
        address rewardToken_,
        address vault_,
        address initialOwner,
        address guardian_
    ) public initializer {
        _requireContract(rewardToken_);
        _requireContract(vault_);
        if (initialOwner == address(0)) revert InvalidAddress();
        _requireContract(guardian_);
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __Pausable_init();
        __ReentrancyGuard_init();
        rewardToken = rewardToken_;
        vault = IFreedomNFTRewardVault(vault_);
        guardian = guardian_;
        TIER_BPS = [uint16(5_000), uint16(3_000), uint16(2_000)];
    }

    function _authorizeUpgrade(address implementation) internal view override onlyOwner {
        _requireContract(implementation);
        if (!IFreedomNFTRewardGuardian(guardian).validateUpgrade(address(this), implementation)) {
            revert InvalidContract(implementation);
        }
    }

    function createPeriod(
        uint16 year,
        uint8 month,
        uint256 poolAmount,
        bytes32[3] calldata eligibleRoots,
        uint256[3] calldata eligibleCounts
    ) external pure returns (uint32) {
        year;
        month;
        poolAmount;
        eligibleRoots;
        eligibleCounts;
        revert LegacyPeriodCreationDisabled();
    }

    function cycleTimes(uint32 cycleId)
        public view returns (uint64 distributionAt, uint64 eligibilityCutoff)
    {
        if (firstDistributionAt == 0) revert CycleScheduleNotConfigured();
        if (cycleId == 0) revert InvalidCycle(cycleId);
        uint256 scheduled = uint256(firstDistributionAt) + uint256(cycleId - 1) * CYCLE_DURATION;
        if (scheduled > type(uint64).max) revert InvalidCycle(cycleId);
        distributionAt = uint64(scheduled);
        eligibilityCutoff = distributionAt - ELIGIBILITY_FREEZE;
    }

    function createCycle(
        uint32 cycleId,
        uint256 poolAmount,
        bytes32[3] calldata eligibleRoots,
        uint256[3] calldata eligibleCounts
    ) external onlyRewardPublisher whenNotPaused nonReentrant returns (uint32 periodId) {
        if (poolAmount == 0) revert InvalidPoolAmount();
        (uint64 distributionAt, uint64 cutoff) = cycleTimes(cycleId);
        if (block.timestamp < distributionAt) revert DistributionNotReached(distributionAt);
        periodId = cycleId;
        if (_periods[periodId].created) revert PeriodAlreadyExists(periodId);

        uint256[3] memory rewards;
        uint256 reserved;
        for (uint8 index = 0; index < 3; index++) {
            uint256 count = eligibleCounts[index];
            if (count == 0) {
                if (eligibleRoots[index] != bytes32(0)) revert NoTierMembers(index + 1);
                continue;
            }
            if (eligibleRoots[index] == bytes32(0)) revert InvalidEligibilityRoot(index + 1);
            uint256 allocation = poolAmount * TIER_BPS[index] / BPS;
            rewards[index] = allocation / count;
            reserved += rewards[index] * count;
        }
        bytes32 distributionId = keccak256(abi.encode("FREEDOM_NFT_PERIOD", periodId));
        if (reserved > 0) vault.reserveRewards(rewardToken, reserved, distributionId);

        Period storage period = _periods[periodId];
        period.cutoff = cutoff;
        period.poolAmount = poolAmount;
        period.reservedAmount = reserved;
        period.eligibleRoots = eligibleRoots;
        period.eligibleCounts = eligibleCounts;
        period.rewardPerMember = rewards;
        period.created = true;
        period.distributionAt = distributionAt;
        emit PeriodCreated(
            periodId,
            cutoff,
            poolAmount,
            reserved,
            eligibleRoots,
            eligibleCounts,
            rewards
        );
    }

    function claim(uint32 periodId, uint8 tier, bytes32[] calldata proof)
        external whenNotPaused nonReentrant
    {
        _payReward(periodId, msg.sender, tier, proof, false);
    }

    // A gas-paying executor cannot redirect a member's immutable entitlement.
    function distributeBatch(
        uint32 periodId,
        address[] calldata members,
        uint8[] calldata tiers,
        bytes32[][] calldata proofs
    ) external whenNotPaused nonReentrant {
        if (members.length == 0 || members.length > MAX_DISTRIBUTION_BATCH
            || members.length != tiers.length || members.length != proofs.length) {
            revert InvalidDistributionBatch();
        }
        for (uint256 i; i < members.length; ++i) {
            _payReward(periodId, members[i], tiers[i], proofs[i], true);
        }
    }

    function _payReward(uint32 periodId, address member, uint8 tier, bytes32[] calldata proof, bool skipPaid)
        internal
    {
        Period storage period = _periods[periodId];
        if (!period.created) revert PeriodNotFound(periodId);
        if (tier < 1 || tier > 3) revert InvalidTier(tier);
        if (member == address(0)) revert InvalidAddress();
        if (rewardExcluded[member]) revert RewardRecipientExcluded(member);
        if (claimed[periodId][member]) {
            if (skipPaid) return;
            revert AlreadyClaimed(periodId, member);
        }
        uint8 index = tier - 1;
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(member, tier))));
        if (!MerkleProof.verifyCalldata(proof, period.eligibleRoots[index], leaf)) {
            revert InvalidProof();
        }
        uint256 amount = period.rewardPerMember[index];
        claimed[periodId][member] = true;
        bytes32 distributionId = keccak256(
            abi.encode("FREEDOM_NFT_CLAIM", periodId, member, tier)
        );
        if (amount > 0) vault.disburse(rewardToken, member, amount, distributionId);
        emit RewardClaimed(periodId, member, tier, amount);
    }

    function periodOf(uint32 periodId) external view returns (Period memory) {
        return _periods[periodId];
    }

    function tierBps(uint8 tier) external view returns (uint16) {
        if (tier < 1 || tier > 3) revert InvalidTier(tier);
        return TIER_BPS[tier - 1];
    }

    function setGuardian(address guardian_) external onlyOwner {
        _requireContract(guardian_);
        address previous = guardian;
        guardian = guardian_;
        emit GuardianUpdated(previous, guardian_);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function _requireContract(address target) internal view {
        if (target == address(0) || target.code.length == 0) revert InvalidContract(target);
    }

    uint256[41] private __gap;
}
