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

    uint256 private constant BPS = 10_000;
    uint16[3] private TIER_BPS;

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
    ) external onlyOwner whenNotPaused nonReentrant returns (uint32 periodId) {
        if (year < 1970 || month == 0 || month > 12) revert InvalidDate(year, month);
        if (poolAmount == 0) revert InvalidPoolAmount();
        uint64 cutoff = uint64(_timestampFromDate(year, month, 1));
        if (block.timestamp < cutoff) revert CutoffNotReached(cutoff);
        periodId = uint32(year) * 100 + month;
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
        vault.reserveRewards(rewardToken, reserved, distributionId);

        Period storage period = _periods[periodId];
        period.cutoff = cutoff;
        period.poolAmount = poolAmount;
        period.reservedAmount = reserved;
        period.eligibleRoots = eligibleRoots;
        period.eligibleCounts = eligibleCounts;
        period.rewardPerMember = rewards;
        period.created = true;
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
        Period storage period = _periods[periodId];
        if (!period.created) revert PeriodNotFound(periodId);
        if (tier < 1 || tier > 3) revert InvalidTier(tier);
        if (claimed[periodId][msg.sender]) revert AlreadyClaimed(periodId, msg.sender);
        uint8 index = tier - 1;
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender, tier))));
        if (!MerkleProof.verifyCalldata(proof, period.eligibleRoots[index], leaf)) {
            revert InvalidProof();
        }
        uint256 amount = period.rewardPerMember[index];
        claimed[periodId][msg.sender] = true;
        bytes32 distributionId = keccak256(
            abi.encode("FREEDOM_NFT_CLAIM", periodId, msg.sender, tier)
        );
        vault.disburse(rewardToken, msg.sender, amount, distributionId);
        emit RewardClaimed(periodId, msg.sender, tier, amount);
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

    function _timestampFromDate(uint16 year, uint8 month, uint8 day)
        internal pure returns (uint256 timestamp)
    {
        int256 y = int256(uint256(year));
        int256 m = int256(uint256(month));
        int256 d = int256(uint256(day));
        int256 daysSinceEpoch = d - 32075
            + 1461 * (y + 4800 + (m - 14) / 12) / 4
            + 367 * (m - 2 - (m - 14) / 12 * 12) / 12
            - 3 * ((y + 4900 + (m - 14) / 12) / 100) / 4
            - 2440588;
        timestamp = uint256(daysSinceEpoch) * 1 days;
    }

    function _requireContract(address target) internal view {
        if (target == address(0) || target.code.length == 0) revert InvalidContract(target);
    }

    uint256[43] private __gap;
}
