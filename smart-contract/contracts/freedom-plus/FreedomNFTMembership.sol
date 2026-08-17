// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

interface IFreedomQualifyingToken {
    function availableBalanceOf(address user) external view returns (uint256);
    function lockFrom(address user, uint256 amount, string calldata reason) external;
    function unlockFrom(address user, uint256 amount, string calldata reason) external;
}

interface IFreedomNFTGuardian {
    function validateUpgrade(address proxy, address implementation) external view returns (bool);
}

contract FreedomNFTMembership is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    ERC721Upgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable
{
    enum Tier { None, Foundational, Intermediate, Advanced }

    struct Membership {
        Tier tier;
        uint256 tokenId;
        uint256 lockedFGT;
        uint256 lockedFPT;
        bool rewardEligible;
    }

    IFreedomQualifyingToken public fgt;
    IFreedomQualifyingToken public fpt;
    address public guardian;
    uint256 public nextTokenId;

    mapping(address => Membership) private _memberships;
    mapping(uint256 => Tier) public tierOfToken;

    event MembershipMinted(
        address indexed member,
        uint256 indexed tokenId,
        Tier indexed tier,
        uint256 lockedFGT,
        uint256 lockedFPT
    );
    event MembershipTierChanged(
        address indexed member,
        uint256 indexed previousTokenId,
        uint256 indexed newTokenId,
        Tier previousTier,
        Tier newTier,
        uint256 lockedFGT,
        uint256 lockedFPT
    );
    event QualificationUnlocked(
        address indexed member,
        uint256 unlockedFGT,
        uint256 unlockedFPT,
        uint256 remainingLocked,
        bool rewardEligible
    );
    event EligibilityRestored(
        address indexed member,
        Tier indexed tier,
        uint256 lockedFGT,
        uint256 lockedFPT
    );
    event GuardianUpdated(address indexed previousGuardian, address indexed newGuardian);

    error InvalidAddress();
    error InvalidContract(address target);
    error InvalidTier(Tier tier);
    error MembershipAlreadyExists(address member);
    error MembershipNotFound(address member);
    error SameTier();
    error UpgradeRequired();
    error DowngradeRequired();
    error IncorrectLockTotal(uint256 expected, uint256 supplied);
    error InsufficientLockedBalance();
    error AlreadyEligible();
    error NonTransferable();

    uint256 private constant UNIT = 1e6;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() { _disableInitializers(); }

    function initialize(
        address fgt_,
        address fpt_,
        address initialOwner,
        address guardian_
    ) public initializer {
        _requireContract(fgt_);
        _requireContract(fpt_);
        if (initialOwner == address(0)) revert InvalidAddress();
        _requireContract(guardian_);

        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __ERC721_init("Freedom NFT Membership", "FNFT");
        __Pausable_init();
        __ReentrancyGuard_init();
        fgt = IFreedomQualifyingToken(fgt_);
        fpt = IFreedomQualifyingToken(fpt_);
        guardian = guardian_;
        nextTokenId = 1;
    }

    function _authorizeUpgrade(address implementation) internal view override onlyOwner {
        _requireContract(implementation);
        if (!IFreedomNFTGuardian(guardian).validateUpgrade(address(this), implementation)) {
            revert InvalidContract(implementation);
        }
    }

    function mintMembership(Tier tier, uint256 fgtAmount, uint256 fptAmount)
        external whenNotPaused nonReentrant
    {
        if (_memberships[msg.sender].tier != Tier.None) {
            revert MembershipAlreadyExists(msg.sender);
        }
        uint256 threshold = thresholdFor(tier);
        _requireExactTotal(threshold, fgtAmount, fptAmount);
        _lock(msg.sender, fgtAmount, fptAmount);

        uint256 tokenId = nextTokenId++;
        _memberships[msg.sender] = Membership(tier, tokenId, fgtAmount, fptAmount, true);
        tierOfToken[tokenId] = tier;
        _safeMint(msg.sender, tokenId);
        emit MembershipMinted(msg.sender, tokenId, tier, fgtAmount, fptAmount);
    }

    function upgradeMembership(Tier newTier, uint256 targetFGT, uint256 targetFPT)
        external whenNotPaused nonReentrant
    {
        Membership storage membership = _membership(msg.sender);
        if (newTier <= membership.tier) revert UpgradeRequired();
        _replaceTier(membership, newTier, targetFGT, targetFPT);
    }

    function downgradeMembership(Tier newTier, uint256 targetFGT, uint256 targetFPT)
        external whenNotPaused nonReentrant
    {
        Membership storage membership = _membership(msg.sender);
        if (newTier == Tier.None || newTier >= membership.tier) revert DowngradeRequired();
        _replaceTier(membership, newTier, targetFGT, targetFPT);
    }

    function unlockQualification(uint256 fgtAmount, uint256 fptAmount)
        external whenNotPaused nonReentrant
    {
        Membership storage membership = _membership(msg.sender);
        if (fgtAmount > membership.lockedFGT || fptAmount > membership.lockedFPT) {
            revert InsufficientLockedBalance();
        }
        if (fgtAmount == 0 && fptAmount == 0) revert InsufficientLockedBalance();
        if (fgtAmount > 0) {
            membership.lockedFGT -= fgtAmount;
            fgt.unlockFrom(msg.sender, fgtAmount, "freedomNftUnlock");
        }
        if (fptAmount > 0) {
            membership.lockedFPT -= fptAmount;
            fpt.unlockFrom(msg.sender, fptAmount, "freedomNftUnlock");
        }
        uint256 remaining = membership.lockedFGT + membership.lockedFPT;
        membership.rewardEligible = remaining >= thresholdFor(membership.tier);
        emit QualificationUnlocked(
            msg.sender,
            fgtAmount,
            fptAmount,
            remaining,
            membership.rewardEligible
        );
    }

    function restoreEligibility(uint256 fgtAmount, uint256 fptAmount)
        external whenNotPaused nonReentrant
    {
        Membership storage membership = _membership(msg.sender);
        if (membership.rewardEligible) revert AlreadyEligible();
        uint256 required = thresholdFor(membership.tier);
        uint256 current = membership.lockedFGT + membership.lockedFPT;
        _requireExactTotal(required - current, fgtAmount, fptAmount);
        _lock(msg.sender, fgtAmount, fptAmount);
        membership.lockedFGT += fgtAmount;
        membership.lockedFPT += fptAmount;
        membership.rewardEligible = true;
        emit EligibilityRestored(
            msg.sender,
            membership.tier,
            membership.lockedFGT,
            membership.lockedFPT
        );
    }

    function membershipOf(address member) external view returns (Membership memory) {
        return _memberships[member];
    }

    function thresholdFor(Tier tier) public pure returns (uint256) {
        if (tier == Tier.Foundational) return 5_700 * UNIT;
        if (tier == Tier.Intermediate) return 18_700 * UNIT;
        if (tier == Tier.Advanced) return 62_000 * UNIT;
        revert InvalidTier(tier);
    }

    function setGuardian(address guardian_) external onlyOwner {
        _requireContract(guardian_);
        address previous = guardian;
        guardian = guardian_;
        emit GuardianUpdated(previous, guardian_);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function _replaceTier(
        Membership storage membership,
        Tier newTier,
        uint256 targetFGT,
        uint256 targetFPT
    ) internal {
        if (newTier == membership.tier) revert SameTier();
        uint256 threshold = thresholdFor(newTier);
        _requireExactTotal(threshold, targetFGT, targetFPT);
        _rebalance(msg.sender, membership.lockedFGT, targetFGT, fgt, "freedomNftTierChange");
        _rebalance(msg.sender, membership.lockedFPT, targetFPT, fpt, "freedomNftTierChange");

        uint256 previousTokenId = membership.tokenId;
        Tier previousTier = membership.tier;
        _burn(previousTokenId);
        uint256 newTokenId = nextTokenId++;
        membership.tier = newTier;
        membership.tokenId = newTokenId;
        membership.lockedFGT = targetFGT;
        membership.lockedFPT = targetFPT;
        membership.rewardEligible = true;
        tierOfToken[newTokenId] = newTier;
        _safeMint(msg.sender, newTokenId);
        emit MembershipTierChanged(
            msg.sender,
            previousTokenId,
            newTokenId,
            previousTier,
            newTier,
            targetFGT,
            targetFPT
        );
    }

    function _rebalance(
        address member,
        uint256 current,
        uint256 target,
        IFreedomQualifyingToken token,
        string memory reason
    ) internal {
        if (target > current) token.lockFrom(member, target - current, reason);
        else if (current > target) token.unlockFrom(member, current - target, reason);
    }

    function _lock(address member, uint256 fgtAmount, uint256 fptAmount) internal {
        if (fgtAmount > 0) fgt.lockFrom(member, fgtAmount, "freedomNftQualification");
        if (fptAmount > 0) fpt.lockFrom(member, fptAmount, "freedomNftQualification");
    }

    function _requireExactTotal(uint256 expected, uint256 fgtAmount, uint256 fptAmount)
        internal pure
    {
        uint256 supplied = fgtAmount + fptAmount;
        if (supplied != expected) revert IncorrectLockTotal(expected, supplied);
    }

    function _membership(address member) internal view returns (Membership storage membership) {
        membership = _memberships[member];
        if (membership.tier == Tier.None) revert MembershipNotFound(member);
    }

    function _update(address to, uint256 tokenId, address auth)
        internal override returns (address previousOwner)
    {
        previousOwner = _ownerOf(tokenId);
        if (previousOwner != address(0) && to != address(0)) revert NonTransferable();
        return super._update(to, tokenId, auth);
    }

    function _requireContract(address target) internal view {
        if (target == address(0) || target.code.length == 0) revert InvalidContract(target);
    }

    uint256[43] private __gap;
}
