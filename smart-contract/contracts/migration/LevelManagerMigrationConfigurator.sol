// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IRegistration.sol";
import "../interfaces/ILevelSettlementRouter.sol";

interface IMigrationManagedOrbit {}

interface ILevelManagerMigrationGuardian {
    function validateUpgrade(address proxy, address newImplementation) external view returns (bool);
}

/**
 * @dev Storage-only implementation used while LevelManager is paused for the
 * production transition. It intentionally exposes no activation functions.
 */
abstract contract LevelManagerMigrationStorage is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable
{
    IERC20 public usdt;
    IRegistration public registration;
    address public escrow;
    IMigrationManagedOrbit public p4Orbit;
    IMigrationManagedOrbit public p12Orbit;
    IMigrationManagedOrbit public p39Orbit;
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
}

/// @custom:oz-upgrades-unsafe-allow missing-initializer
contract LevelManagerMigrationConfigurator is LevelManagerMigrationStorage {
    error InvalidMigrationBatch();
    error MigrationAlreadyConfigured();
    error GuardianNotSet();
    error UpgradeBlocked();

    bytes32 internal constant LEGACY_RECYCLE_MIGRATION_STORAGE_SLOT =
        keccak256("ffreedom.levelManager.legacyRecycleMigration.v1");

    struct LegacyRecycleMigrationLayout {
        mapping(bytes32 => bool) transitions;
        bool configured;
    }

    event LegacyRecycleMigrationConfigured(uint256 count);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function configureLegacyRecycleMigration(
        uint8[] calldata orbitTypes,
        address[] calldata orbitOwners,
        uint8[] calldata levels,
        uint32[] calldata sourceCycles
    ) external onlyOwner {
        LegacyRecycleMigrationLayout storage migration = _legacyRecycleMigrationLayout();
        if (migration.configured) revert MigrationAlreadyConfigured();

        uint256 count = orbitTypes.length;
        if (count != orbitOwners.length || count != levels.length || count != sourceCycles.length) {
            revert InvalidMigrationBatch();
        }

        for (uint256 i; i < count; ++i) {
            uint8 orbitType = orbitTypes[i];
            uint8 level = levels[i];
            if (
                (orbitType != 12 && orbitType != 39) ||
                orbitOwners[i] == address(0) ||
                _orbitCodeForLevel(level) != orbitType
            ) revert InvalidMigrationBatch();

            bytes32 key = keccak256(abi.encode(orbitType, orbitOwners[i], level, sourceCycles[i]));
            if (migration.transitions[key]) revert InvalidMigrationBatch();
            migration.transitions[key] = true;
        }

        migration.configured = true;
        emit LegacyRecycleMigrationConfigured(count);
    }

    function legacyRecycleMigrationState(
        uint8 orbitType,
        address orbitOwner,
        uint8 level,
        uint32 sourceCycle
    ) external view returns (bool configured, bool pending) {
        LegacyRecycleMigrationLayout storage migration = _legacyRecycleMigrationLayout();
        bytes32 key = keccak256(abi.encode(orbitType, orbitOwner, level, sourceCycle));
        return (migration.configured, migration.transitions[key]);
    }

    function _orbitCodeForLevel(uint8 level) internal pure returns (uint8) {
        if (level < 1 || level > 10) revert InvalidMigrationBatch();
        uint8 remainder = level % 3;
        if (remainder == 1) return 4;
        if (remainder == 2) return 12;
        return 39;
    }

    function _legacyRecycleMigrationLayout() internal pure returns (LegacyRecycleMigrationLayout storage layout) {
        bytes32 slot = LEGACY_RECYCLE_MIGRATION_STORAGE_SLOT;
        assembly {
            layout.slot := slot
        }
    }

    function _authorizeUpgrade(address newImplementation) internal view override onlyOwner {
        address currentGuardian = guardian;
        if (currentGuardian == address(0)) revert GuardianNotSet();
        if (!ILevelManagerMigrationGuardian(currentGuardian).validateUpgrade(address(this), newImplementation)) {
            revert UpgradeBlocked();
        }
    }
}
