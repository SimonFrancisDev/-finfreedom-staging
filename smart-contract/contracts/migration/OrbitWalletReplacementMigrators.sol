// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "../interfaces/IOrbitState.sol";

interface IWalletReplacementGuardian {
    function validateUpgrade(address proxy, address implementation) external view returns (bool);
}

/**
 * Temporary implementation sharing BaseOrbit's exact storage layout. It only
 * migrates manifest-bound current state while paused; historical cycles remain
 * immutable under the old identity for backend aliasing.
 */
abstract contract OrbitWalletReplacementStorage is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    PausableUpgradeable
{
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

    address internal constant WP_OLD = 0xC0545331E20587208d4b27b2A3e4920Cc481133a;
    address internal constant WP_NEW = 0x1EA5513e017b4e25847e91aBc84aC8686331f80B;
    address internal constant RY_OLD = 0x2F1E28756A42A3680b5AD42C58A0c3887C9e60bA;
    address internal constant RY_NEW = 0xFb8D46674f51882baaA2c9606122484434FF2DC2;

    error WalletReplacementInvalidState();
    error WalletReplacementManifestMismatch();
    error WalletReplacementLengthMismatch();
    error UpgradeBlocked();

    event OrbitOwnerCurrentStateMoved(address indexed oldWallet, address indexed newWallet, uint8 indexed level);
    event OrbitCurrentReferenceRewritten(address indexed owner, uint8 indexed level, uint8 indexed position);
    event InvalidCurrentOrbitQuarantined(address indexed oldWallet, uint8 indexed level);

    function _replacementOf(address wallet) internal pure returns (address) {
        if (wallet == WP_OLD) return WP_NEW;
        if (wallet == RY_OLD) return RY_NEW;
        return wallet;
    }

    function _isOld(address wallet) internal pure returns (bool) {
        return wallet == WP_OLD || wallet == RY_OLD;
    }

    function _patchCurrentReferences(address owner, uint8 level, uint8 totalPositions) internal {
        IOrbitState.OrbitData storage orbit = userOrbits[owner][level];
        for (uint8 position = 1; position <= totalPositions; ++position) {
            IOrbitState.Position storage item = orbit.positions[position];
            StoredRuleSnapshot storage snap = storedRuleSnapshots[owner][level][position];
            bool changed;

            if (_isOld(item.user)) { item.user = _replacementOf(item.user); changed = true; }
            if (_isOld(item.referrer)) { item.referrer = _replacementOf(item.referrer); changed = true; }
            if (_isOld(orbit.positionAbove[position])) {
                orbit.positionAbove[position] = _replacementOf(orbit.positionAbove[position]);
                changed = true;
            }
            if (_isOld(snap.spillover1Recipient)) {
                snap.spillover1Recipient = _replacementOf(snap.spillover1Recipient);
                changed = true;
            }
            if (_isOld(snap.spillover2Recipient)) {
                snap.spillover2Recipient = _replacementOf(snap.spillover2Recipient);
                changed = true;
            }
            if (changed) emit OrbitCurrentReferenceRewritten(owner, level, position);
        }
    }

    function _requirePristine(address owner, uint8 level, uint8 totalPositions) internal view {
        IOrbitState.OrbitData storage orbit = userOrbits[owner][level];
        if (
            orbit.currentPosition != 0 || orbit.escrowBalance != 0 || orbit.autoUpgradeCompleted || orbit.isActive ||
            orbit.positionsInLine1 != 0 || orbit.positionsInLine2 != 0 || orbit.positionsInLine3 != 0 ||
            orbit.totalCycles != 0 || orbit.totalEarned != 0 ||
            linePaymentCounts[owner][level][1] != 0 || linePaymentCounts[owner][level][2] != 0 ||
            linePaymentCounts[owner][level][3] != 0
        ) revert WalletReplacementInvalidState();
        for (uint8 position = 1; position <= totalPositions; ++position) {
            if (
                orbit.positions[position].user != address(0) || orbit.positionAbove[position] != address(0) ||
                positionLineArrivalNumber[owner][level][position] != 0 || positionActivationId[owner][level][position] != 0 ||
                positionIsMirror[owner][level][position] || storedRuleSnapshots[owner][level][position].exists
            ) revert WalletReplacementInvalidState();
        }
    }

    function _requireSummary(
        address owner, uint8 level, uint8 currentPosition, uint256 escrowBalance,
        bool autoUpgradeCompleted, uint8 line1, uint8 line2, uint8 line3,
        uint256 cycles, uint256 earned
    ) internal view {
        IOrbitState.OrbitData storage orbit = userOrbits[owner][level];
        if (
            orbit.currentPosition != currentPosition || orbit.escrowBalance != escrowBalance ||
            orbit.autoUpgradeCompleted != autoUpgradeCompleted || !orbit.isActive ||
            orbit.positionsInLine1 != line1 || orbit.positionsInLine2 != line2 || orbit.positionsInLine3 != line3 ||
            orbit.totalCycles != cycles || orbit.totalEarned != earned ||
            linePaymentCounts[owner][level][1] != line1 || linePaymentCounts[owner][level][2] != line2 ||
            linePaymentCounts[owner][level][3] != line3
        ) revert WalletReplacementInvalidState();
    }

    function _moveCurrentOwnerState(address oldWallet, address newWallet, uint8 level, uint8 totalPositions) internal {
        _requirePristine(newWallet, level, totalPositions);
        _patchCurrentReferences(oldWallet, level, totalPositions);
        IOrbitState.OrbitData storage source = userOrbits[oldWallet][level];
        IOrbitState.OrbitData storage target = userOrbits[newWallet][level];

        target.currentPosition = source.currentPosition;
        target.escrowBalance = source.escrowBalance;
        target.autoUpgradeCompleted = source.autoUpgradeCompleted;
        target.isActive = source.isActive;
        target.positionsInLine1 = source.positionsInLine1;
        target.positionsInLine2 = source.positionsInLine2;
        target.positionsInLine3 = source.positionsInLine3;
        target.totalCycles = source.totalCycles;
        target.totalEarned = source.totalEarned;

        for (uint8 line = 1; line <= 3; ++line) {
            linePaymentCounts[newWallet][level][line] = linePaymentCounts[oldWallet][level][line];
            delete linePaymentCounts[oldWallet][level][line];
        }
        for (uint8 position = 1; position <= totalPositions; ++position) {
            target.positions[position] = source.positions[position];
            target.positionAbove[position] = source.positionAbove[position];
            positionLineArrivalNumber[newWallet][level][position] = positionLineArrivalNumber[oldWallet][level][position];
            positionActivationId[newWallet][level][position] = positionActivationId[oldWallet][level][position];
            positionIsMirror[newWallet][level][position] = positionIsMirror[oldWallet][level][position];
            storedRuleSnapshots[newWallet][level][position] = storedRuleSnapshots[oldWallet][level][position];

            delete source.positions[position];
            delete source.positionAbove[position];
            delete positionLineArrivalNumber[oldWallet][level][position];
            delete positionActivationId[oldWallet][level][position];
            delete positionIsMirror[oldWallet][level][position];
            delete storedRuleSnapshots[oldWallet][level][position];
        }
        source.currentPosition = 0;
        source.escrowBalance = 0;
        source.autoUpgradeCompleted = false;
        source.isActive = false;
        source.positionsInLine1 = 0;
        source.positionsInLine2 = 0;
        source.positionsInLine3 = 0;
        source.totalCycles = 0;
        source.totalEarned = 0;
        emit OrbitOwnerCurrentStateMoved(oldWallet, newWallet, level);
    }

    function _clearInvalidCurrentState(address owner, uint8 level, uint8 totalPositions) internal {
        IOrbitState.OrbitData storage orbit = userOrbits[owner][level];
        for (uint8 line = 1; line <= 3; ++line) delete linePaymentCounts[owner][level][line];
        for (uint8 position = 1; position <= totalPositions; ++position) {
            delete orbit.positions[position];
            delete orbit.positionAbove[position];
            delete positionLineArrivalNumber[owner][level][position];
            delete positionActivationId[owner][level][position];
            delete positionIsMirror[owner][level][position];
            delete storedRuleSnapshots[owner][level][position];
        }
        orbit.currentPosition = 0;
        orbit.escrowBalance = 0;
        orbit.autoUpgradeCompleted = false;
        orbit.isActive = false;
        orbit.positionsInLine1 = 0;
        orbit.positionsInLine2 = 0;
        orbit.positionsInLine3 = 0;
        orbit.totalCycles = 0;
        orbit.totalEarned = 0;
        emit InvalidCurrentOrbitQuarantined(owner, level);
    }

    function _authorizeUpgrade(address implementation) internal view override onlyOwner {
        if (
            implementation.code.length == 0 || guardian == address(0) ||
            !IWalletReplacementGuardian(guardian).validateUpgrade(address(this), implementation)
        ) revert UpgradeBlocked();
    }
}

contract P4OrbitWalletReplacementMigrator is OrbitWalletReplacementStorage {
    uint256[50] private __gap;
    bytes32 internal constant APPROVED_KEYS_HASH =
        0x81bf9a38d1e5cce3d1ccd7fa08b4b885835ddb4e596972829039733cd64775e9;

    function executeApprovedWalletReplacement(address[] calldata owners, uint8[] calldata levels) external onlyOwner whenPaused {
        if (owners.length != levels.length || keccak256(abi.encode(owners, levels)) != APPROVED_KEYS_HASH) {
            revert WalletReplacementManifestMismatch();
        }
        _requireSummary(WP_OLD, 1, 1, 0, false, 0, 0, 0, 3, 81 * 1e6);
        _requireSummary(WP_OLD, 4, 4, 160 * 1e6, true, 3, 0, 0, 0, 216 * 1e6);
        _requireSummary(RY_OLD, 1, 3, 0, false, 2, 0, 0, 0, 18 * 1e6);
        for (uint256 i; i < owners.length; ++i) _patchCurrentReferences(owners[i], levels[i], 4);
        _moveCurrentOwnerState(WP_OLD, WP_NEW, 1, 4);
        _moveCurrentOwnerState(WP_OLD, WP_NEW, 4, 4);
        // Normalize against the independently verified 88 USDT escrow custody.
        userOrbits[WP_NEW][4].escrowBalance = 88 * 1e6;
        userOrbits[WP_NEW][4].autoUpgradeCompleted = false;
        _moveCurrentOwnerState(RY_OLD, RY_NEW, 1, 4);
    }
}

abstract contract MatrixOrbitWalletReplacementMigrator is OrbitWalletReplacementStorage {
    mapping(address => mapping(uint8 => address)) internal matrixPlacementParent;

    function _patchMatrixParents(
        address[] calldata users,
        uint8[] calldata levels,
        address[] calldata expectedParents
    ) internal {
        if (users.length != levels.length || users.length != expectedParents.length) revert WalletReplacementLengthMismatch();
        for (uint256 i; i < users.length; ++i) {
            address sourceUser = users[i];
            address targetUser = _replacementOf(sourceUser);
            address actual = matrixPlacementParent[sourceUser][levels[i]];
            if (actual != expectedParents[i]) revert WalletReplacementInvalidState();
            if (targetUser != sourceUser && matrixPlacementParent[targetUser][levels[i]] != address(0)) {
                revert WalletReplacementInvalidState();
            }
            matrixPlacementParent[targetUser][levels[i]] = _replacementOf(actual);
            if (targetUser != sourceUser) delete matrixPlacementParent[sourceUser][levels[i]];
        }
    }
}

contract P12OrbitWalletReplacementMigrator is MatrixOrbitWalletReplacementMigrator {
    uint256[49] private __gap;
    bytes32 internal constant APPROVED_MANIFEST_HASH =
        0xdc31f19de5dbb19cc0b733eba0e4f7a084bc04b78609af332e629fafc5c27da8;

    function executeApprovedWalletReplacement(
        address[] calldata owners,
        uint8[] calldata levels,
        address[] calldata matrixUsers,
        uint8[] calldata matrixLevels,
        address[] calldata matrixExpectedParents
    ) external onlyOwner whenPaused {
        if (
            owners.length != levels.length ||
            keccak256(abi.encode(owners, levels, matrixUsers, matrixLevels, matrixExpectedParents)) != APPROVED_MANIFEST_HASH
        ) revert WalletReplacementManifestMismatch();
        _requireSummary(WP_OLD, 2, 12, 0, false, 3, 8, 0, 0, 94 * 1e6);
        _requireSummary(RY_OLD, 2, 5, 0, false, 3, 4, 0, 0, 64 * 1e6);
        for (uint256 i; i < owners.length; ++i) _patchCurrentReferences(owners[i], levels[i], 12);
        _patchMatrixParents(matrixUsers, matrixLevels, matrixExpectedParents);
        _moveCurrentOwnerState(WP_OLD, WP_NEW, 2, 12);
        _moveCurrentOwnerState(RY_OLD, RY_NEW, 2, 12);
    }
}

contract P39OrbitWalletReplacementMigrator is MatrixOrbitWalletReplacementMigrator {
    uint256[49] private __gap;
    bytes32 internal constant APPROVED_MANIFEST_HASH =
        0x44a8f03aee70cf493a13110d3517b41f00afb4faac8544d9e031613c019c2a95;

    function executeApprovedWalletReplacement(
        address[] calldata owners,
        uint8[] calldata levels,
        address[] calldata matrixUsers,
        uint8[] calldata matrixLevels,
        address[] calldata matrixExpectedParents
    ) external onlyOwner whenPaused {
        if (
            owners.length != levels.length ||
            keccak256(abi.encode(owners, levels, matrixUsers, matrixLevels, matrixExpectedParents)) != APPROVED_MANIFEST_HASH
        ) revert WalletReplacementManifestMismatch();
        _requireSummary(WP_OLD, 3, 9, 0, false, 3, 5, 6, 0, 160 * 1e6);
        _requireSummary(RY_OLD, 3, 2, 0, false, 1, 1, 0, 0, 16 * 1e6);
        _requireSummary(WP_OLD, 6, 2, 0, false, 1, 1, 0, 0, 224 * 1e6);
        for (uint256 i; i < owners.length; ++i) _patchCurrentReferences(owners[i], levels[i], 39);
        _patchMatrixParents(matrixUsers, matrixLevels, matrixExpectedParents);
        _moveCurrentOwnerState(WP_OLD, WP_NEW, 3, 39);
        _moveCurrentOwnerState(RY_OLD, RY_NEW, 3, 39);
        _clearInvalidCurrentState(WP_OLD, 6, 39);
    }
}
