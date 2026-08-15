// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "../LevelManager.sol";

/**
 * @notice Minimal temporary implementation with LevelManager's exact storage
 * sequence. It is usable only while paused and must be replaced immediately
 * by the certified LevelManager implementation after verification.
 */
contract LevelManagerWalletReplacementMigrator is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable
{
    IERC20 public usdt;
    IRegistration public registration;
    address public escrow;
    IManagedOrbit public p4Orbit;
    IManagedOrbit public p12Orbit;
    IManagedOrbit public p39Orbit;
    address public tokenController;
    address public guardian;
    ILevelSettlementRouter public settlementRouter;
    mapping(uint8 => string) private __deprecatedLevelToOrbitType;
    mapping(uint8 => uint256) private __deprecatedLevelPrices;
    address public nftPool;
    address public operationsWallet;
    address[] public founderWallets;
    uint256[] public founderRatios;
    mapping(address => bool) public founderRepresentative;
    mapping(address => bool) public founderRepUsed;
    mapping(address => uint8) public founderRepLevelsActivated;
    mapping(address => bool) public founderRepAllLevelsCompleted;
    address public id1Wallet;
    mapping(address => bool) public isID1Downline;
    mapping(address => mapping(uint8 => bool)) public userLevelActivated;
    uint256 public nextActivationId;

    struct PendingAutoUpgradeCheck {
        address user;
        uint8 level;
    }

    address[] public founderRepWallets;
    uint256 private autoUpgradeExecutionDepth;
    PendingAutoUpgradeCheck[] private pendingAutoUpgradeChecks;
    bool private drainingAutoUpgradeChecks;
    uint256[45] private __gap;

    address internal constant WP_OLD = 0xC0545331E20587208d4b27b2A3e4920Cc481133a;
    address internal constant WP_NEW = 0x1EA5513e017b4e25847e91aBc84aC8686331f80B;
    address internal constant RY_OLD = 0x2F1E28756A42A3680b5AD42C58A0c3887C9e60bA;
    address internal constant RY_NEW = 0xFb8D46674f51882baaA2c9606122484434FF2DC2;

    error WalletReplacementInvalidState();
    error UpgradeBlocked();

    function executeApprovedWalletReplacement() external onlyOwner whenPaused {
        _moveParticipant(WP_OLD, WP_NEW, 4);
        _moveParticipant(RY_OLD, RY_NEW, 3);
    }

    function _moveParticipant(address oldWallet, address newWallet, uint8 highestActiveLevel) internal {
        if (isID1Downline[newWallet]) revert WalletReplacementInvalidState();
        for (uint8 level = 1; level <= 10; ++level) {
            bool expected = level <= highestActiveLevel;
            if (userLevelActivated[newWallet][level] || userLevelActivated[oldWallet][level] != expected) {
                revert WalletReplacementInvalidState();
            }
            userLevelActivated[newWallet][level] = expected;
            userLevelActivated[oldWallet][level] = false;
        }
        isID1Downline[newWallet] = isID1Downline[oldWallet];
        isID1Downline[oldWallet] = false;
    }

    function _authorizeUpgrade(address newImplementation) internal view override onlyOwner {
        if (
            newImplementation.code.length == 0 ||
            guardian == address(0) ||
            !IGuardian(guardian).validateUpgrade(address(this), newImplementation)
        ) revert UpgradeBlocked();
    }
}
