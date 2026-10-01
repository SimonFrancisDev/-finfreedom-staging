// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../LevelManager.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Utils.sol";

/// @custom:oz-upgrades-unsafe-allow missing-initializer
contract OctoberStagingRepresentativeReplacement is Initializable, OwnableUpgradeable, UUPSUpgradeable,
    PausableUpgradeable, ReentrancyGuardUpgradeable {
    // Exact LevelManager storage sequence; no new storage is introduced.
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
    struct PendingAutoUpgradeCheck { address user; uint8 level; }
    address[] public founderRepWallets;
    uint256 private autoUpgradeExecutionDepth;
    PendingAutoUpgradeCheck[] private pendingAutoUpgradeChecks;
    bool private drainingAutoUpgradeChecks;
    uint256[45] private __gap;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() { _disableInitializers(); }

    function _authorizeUpgrade(address implementation) internal view override onlyOwner {
        if (!IGuardian(guardian).validateUpgrade(address(this), implementation)) revert ReplacementNotAllowed();
    }
    error ReplacementNotAllowed();
    event StagingRepresentativeReplaced(address indexed previous, address indexed replacement);

    /// @custom:oz-upgrades-unsafe-allow-reachable delegatecall
    function replaceUnusedStagingRepresentative(address restoreImplementation) external onlyOwner {
        address previous = 0xf72873d6233B5e3dfbA6D1D8058BF90E990902f0;
        address replacement = 0x0de1B6F15Fe8E5Cf7fbBA2cD4C576357Ececa962;
        if (block.chainid != 80002 || address(this) != 0xaf6cC44C5B860BA076Ee703244edcaB0C806c27A
            || address(registration) != 0xC5750BfA5b4Dd888e55420911b58CB57539aEb90
            || founderRepWallets.length != 3 || founderRepWallets[2] != previous
            || !founderRepresentative[previous] || founderRepresentative[replacement]
            || registration.isRegistered(previous) || registration.isRegistered(replacement)
            || founderRepUsed[previous] || founderRepUsed[replacement]
            || founderRepLevelsActivated[previous] != 0 || founderRepLevelsActivated[replacement] != 0
            || founderRepAllLevelsCompleted[previous] || founderRepAllLevelsCompleted[replacement]) {
            revert ReplacementNotAllowed();
        }
        for (uint8 level = 1; level <= 10; ++level) {
            if (userLevelActivated[previous][level] || userLevelActivated[replacement][level]) {
                revert ReplacementNotAllowed();
            }
        }
        founderRepresentative[previous] = false;
        founderRepresentative[replacement] = true;
        founderRepWallets[2] = replacement;
        emit StagingRepresentativeReplaced(previous, replacement);
        if (!IGuardian(guardian).validateUpgrade(address(this), restoreImplementation)) revert ReplacementNotAllowed();
        ERC1967Utils.upgradeToAndCall(restoreImplementation, "");
    }
}
