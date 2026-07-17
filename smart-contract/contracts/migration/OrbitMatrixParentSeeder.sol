// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "../interfaces/IOrbitState.sol";

interface IMigrationGuardian {
    function validateUpgrade(address proxy, address newImplementation) external view returns (bool);
}

/**
 * @dev Temporary implementation used only between the old and corrected orbit
 * implementations. Its storage declarations intentionally mirror BaseOrbit and
 * the first P12/P39 derived slot. It cannot process participant activity.
 */
abstract contract OrbitSeederBaseStorage is Initializable, OwnableUpgradeable, UUPSUpgradeable, PausableUpgradeable {
    error InvalidMigrationBatch();
    error GuardianNotSet();
    error UpgradeBlocked();

    address public levelManager;
    address public escrow;
    address public registration;
    address public guardian;

    mapping(address => mapping(uint8 => IOrbitState.OrbitData)) public userOrbits;
    mapping(uint8 => IOrbitState.OrbitConfig) public levelConfig;
    mapping(address => bool) public founderRepActivated;
    mapping(address => mapping(uint8 => mapping(uint256 => mapping(uint8 => IOrbitState.Position)))) internal historicalCyclePositions;
    mapping(address => mapping(uint8 => mapping(uint256 => bool))) internal historicalCycleStored;
    mapping(address => mapping(uint8 => mapping(uint8 => uint8))) internal linePaymentCounts;
    mapping(address => mapping(uint8 => mapping(uint8 => uint8))) internal positionLineArrivalNumber;
    mapping(address => mapping(uint8 => mapping(uint256 => mapping(uint8 => uint8)))) internal historicalPositionLineArrivalNumber;
    mapping(address => mapping(uint8 => mapping(uint8 => uint256))) internal positionActivationId;
    mapping(address => mapping(uint8 => mapping(uint8 => bool))) internal positionIsMirror;
    mapping(address => mapping(uint8 => mapping(uint256 => mapping(uint8 => uint256)))) internal historicalPositionActivationId;
    mapping(address => mapping(uint8 => mapping(uint256 => mapping(uint8 => bool)))) internal historicalPositionIsMirror;

    struct StoredRuleSnapshot {
        bool exists;
        uint8 line;
        uint8 linePaymentNumber;
        bool autoUpgradeEnabled;
        bool isFounderNoReferrerPath;
        uint256 toOwner;
        uint256 toSpillover1;
        uint256 toSpillover2;
        uint256 toEscrow;
        uint256 toRecycle;
        address spillover1Recipient;
        address spillover2Recipient;
    }

    mapping(address => mapping(uint8 => mapping(uint8 => StoredRuleSnapshot))) internal storedRuleSnapshots;
    mapping(address => mapping(uint8 => mapping(uint256 => mapping(uint8 => StoredRuleSnapshot)))) internal historicalStoredRuleSnapshots;
    mapping(address => mapping(uint8 => mapping(uint256 => uint256))) internal historicalCycleArchiveMask;
    uint256[48] private __gap;
}

/// @custom:oz-upgrades-unsafe-allow missing-initializer
contract OrbitMatrixParentSeeder is OrbitSeederBaseStorage {
    mapping(address => mapping(uint8 => address)) internal matrixPlacementParent;
    uint256[49] private __gap;

    event MatrixParentsSeeded(uint256 count);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function seedMatrixParents(
        address[] calldata users,
        uint8[] calldata levels,
        address[] calldata parents
    ) external onlyOwner {
        if (users.length == 0 || users.length != levels.length || users.length != parents.length) {
            revert InvalidMigrationBatch();
        }
        for (uint256 i; i < users.length; ++i) {
            if (users[i] == address(0) || parents[i] == address(0)) revert InvalidMigrationBatch();
            matrixPlacementParent[users[i]][levels[i]] = parents[i];
        }
        emit MatrixParentsSeeded(users.length);
    }

    function matrixParentOf(address user, uint8 level) external view returns (address) {
        return matrixPlacementParent[user][level];
    }

    function _authorizeUpgrade(address newImplementation) internal view override onlyOwner {
        address currentGuardian = guardian;
        if (currentGuardian == address(0)) revert GuardianNotSet();
        if (!IMigrationGuardian(currentGuardian).validateUpgrade(address(this), newImplementation)) revert UpgradeBlocked();
    }
}
