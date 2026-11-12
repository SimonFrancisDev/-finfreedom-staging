// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./OrbitWalletReplacementMigrators.sol";
import "../RegistrationFixed.sol";

interface IId1RepairTarget {
    function repair(bytes calldata plan) external;
}

interface IId1RepairExecutor {
    function governance() external view returns (address);
}

abstract contract Id1RepairGuard {
    address public immutable repairProxy;
    address public immutable repairExecutor;
    bytes32 public immutable repairPlanHash;
    uint256 public immutable repairChain;
    bytes32 private constant DONE_SLOT = bytes32(uint256(keccak256("finfreedom.id1.historical-repair.2026-11-12")) - 1);

    error RepairUnauthorized();
    error RepairAlreadyExecuted();
    error RepairPlanMismatch();
    error RepairStateChanged();
    error RepairInvalidState();

    constructor(address proxy, address executor, bytes32 planHash, uint256 chain) {
        require(proxy != address(0) && chain != 0, "Invalid repair binding");
        repairProxy = proxy;
        repairExecutor = executor;
        repairPlanHash = planHash;
        repairChain = chain;
    }

    function repairExecuted() public view returns (bool done) {
        bytes32 slot = DONE_SLOT;
        assembly { done := sload(slot) }
    }

    function _beginRepair(bytes calldata plan, address governance) internal {
        if (address(this) != repairProxy || block.chainid != repairChain || msg.sender != repairExecutor ||
            repairExecutor == address(0) || IId1RepairExecutor(repairExecutor).governance() != governance) revert RepairUnauthorized();
        if (repairExecuted()) revert RepairAlreadyExecuted();
        if (keccak256(plan) != repairPlanHash) revert RepairPlanMismatch();
        bytes32 slot = DONE_SLOT;
        assembly { sstore(slot, 1) }
    }
}

/**
 * Temporary, manifest-bound implementations. Reuse the existing orbit storage
 * template only; wallet-replacement helpers are not called. Original receipts
 * and completed cycles are never rewritten. Changes to the open-cycle archive
 * are explicitly journaled so the eventual cycle archive reflects the repair.
 */
abstract contract Id1OrbitRepairBase is OrbitWalletReplacementStorage, Id1RepairGuard {
    struct SlotState {
        IOrbitState.Position position;
        address above;
        uint8 arrival;
        uint256 activationId;
        bool isMirror;
        StoredRuleSnapshot rule;
    }

    struct OrbitEdit {
        address account;
        uint8 level;
        bytes32 beforeHash;
        SlotState[] slots;
        uint8 ancestryOnlyPosition;
    }

    event HistoricalOrbitSlotRepaired(address indexed account, uint8 indexed level, uint256 indexed cycle,
        uint8 position, bytes previousState, bytes correctedState, bytes previousArchive);
    event HistoricalOrbitRepaired(address indexed account, uint8 indexed level, bytes32 indexed planHash,
        bytes32 beforeHash);
    event HistoricalAncestryRestored(address indexed account, uint8 indexed level, address indexed user,
        uint8 position, uint256 activationId);

    constructor(address proxy, address executor, bytes32 planHash, uint256 chain)
        Id1RepairGuard(proxy, executor, planHash, chain) { _disableInitializers(); }

    function _slot(address account, uint8 level, uint8 index) internal view returns (SlotState memory s) {
        s = SlotState(userOrbits[account][level].positions[index], userOrbits[account][level].positionAbove[index],
            positionLineArrivalNumber[account][level][index], positionActivationId[account][level][index],
            positionIsMirror[account][level][index], storedRuleSnapshots[account][level][index]);
    }

    function _archive(address account, uint8 level, uint256 cycle, uint8 index) internal view returns (bytes memory) {
        return abi.encode(historicalCyclePositions[account][level][cycle][index],
            historicalPositionLineArrivalNumber[account][level][cycle][index],
            historicalPositionActivationId[account][level][cycle][index],
            historicalPositionIsMirror[account][level][cycle][index],
            historicalStoredRuleSnapshots[account][level][cycle][index]);
    }

    function repairState(address account, uint8 level) public view returns (bytes32 stateHash, SlotState[] memory slots) {
        IOrbitState.OrbitData storage orbit = userOrbits[account][level];
        uint8 capacity = levelConfig[level].totalPositions;
        if (capacity != 4 && capacity != 12 && capacity != 39) revert RepairInvalidState();
        uint256 cycle = orbit.totalCycles + 1;
        stateHash = keccak256(abi.encode(owner(), levelManager, escrow, registration, guardian, levelConfig[level],
            account, level, orbit.currentPosition, orbit.escrowBalance, orbit.autoUpgradeCompleted, orbit.isActive,
            orbit.positionsInLine1, orbit.positionsInLine2, orbit.positionsInLine3, orbit.totalCycles, orbit.totalEarned,
            linePaymentCounts[account][level][1], linePaymentCounts[account][level][2], linePaymentCounts[account][level][3],
            historicalCycleStored[account][level][cycle], historicalCycleArchiveMask[account][level][cycle]));
        slots = new SlotState[](capacity);
        for (uint8 i = 1; i <= capacity; ++i) {
            slots[i - 1] = _slot(account, level, i);
            stateHash = keccak256(abi.encode(stateHash, slots[i - 1], _archive(account, level, cycle, i)));
        }
    }

    function completedCycleHash(address account, uint8 level, uint256 cycle) external view returns (bytes32 result) {
        if (cycle == 0 || cycle > userOrbits[account][level].totalCycles) revert RepairInvalidState();
        result = keccak256(abi.encode(historicalCycleStored[account][level][cycle], historicalCycleArchiveMask[account][level][cycle]));
        for (uint8 i = 1; i <= levelConfig[level].totalPositions; ++i) {
            result = keccak256(abi.encode(result, _archive(account, level, cycle, i)));
        }
    }

    function repairStateHash(address account, uint8 level) external view returns (bytes32 stateHash) {
        (stateHash,) = repairState(account, level);
    }

    function repair(bytes calldata plan) external whenPaused {
        _beginRepair(plan, owner());
        OrbitEdit[] memory edits = abi.decode(plan, (OrbitEdit[]));
        if (edits.length == 0 || edits.length > 10) revert RepairInvalidState();
        for (uint256 row; row < edits.length; ++row) {
            OrbitEdit memory edit = edits[row];
            // Separate read frames bound temporary hashing memory across large P39 batches.
            bytes32 beforeHash = this.repairStateHash(edit.account, edit.level);
            if (beforeHash != edit.beforeHash) revert RepairStateChanged();
            _applyEdit(edit);
            emit HistoricalOrbitRepaired(edit.account, edit.level, repairPlanHash, beforeHash);
        }
    }

    function _applyEdit(OrbitEdit memory edit) internal {
        IOrbitState.OrbitData storage orbit = userOrbits[edit.account][edit.level];
        uint8 capacity = levelConfig[edit.level].totalPositions;
        uint256 cycle = orbit.totalCycles + 1;
        if (edit.slots.length != capacity || historicalCycleStored[edit.account][edit.level][cycle]) revert RepairInvalidState();
        if (edit.ancestryOnlyPosition > capacity) revert RepairInvalidState();
        uint8[3] memory counts;
        uint256[3] memory seen;
        uint8 firstEmpty;
        uint256 archiveMask;
        for (uint8 i = 1; i <= capacity; ++i) {
            SlotState memory s = edit.slots[i - 1];
            bool ancestryOnly = edit.ancestryOnlyPosition == i;
            if (ancestryOnly) {
                // Restore ancestry, not a payment receipt or an earnings credit.
                if (edit.level != 8 || i != 1 || orbit.positions[i].user != address(0) ||
                    s.position.user == address(0) || s.position.amount != 0 || s.activationId == 0 ||
                    !s.isMirror || s.arrival != 1 || s.rule.line != 1 || s.rule.linePaymentNumber != 1 ||
                    s.rule.autoUpgradeEnabled || s.rule.isFounderNoReferrerPath ||
                    s.rule.toOwner != 0 || s.rule.toSpillover1 != 0 || s.rule.toSpillover2 != 0 ||
                    s.rule.toEscrow != 0 || s.rule.toRecycle != 0 ||
                    s.rule.spillover1Recipient != address(0) || s.rule.spillover2Recipient != address(0)) revert RepairInvalidState();
                emit HistoricalAncestryRestored(edit.account, edit.level, s.position.user, i, s.activationId);
            }
            if (s.position.user == address(0)) {
                if (keccak256(abi.encode(s)) != keccak256(abi.encode(SlotState(
                    IOrbitState.Position(address(0), 0, 0, address(0), false), address(0), 0, 0, false,
                    StoredRuleSnapshot(false, 0, 0, false, false, 0, 0, 0, 0, 0, address(0), address(0))
                )))) revert RepairInvalidState();
                if (firstEmpty == 0) firstEmpty = i;
            } else {
                if (!s.position.isActive || !s.rule.exists || s.arrival == 0 || s.arrival > capacity ||
                    s.position.timestamp == 0 ||
                    (s.position.amount == 0 && !ancestryOnly && !founderRepActivated[s.position.user])) revert RepairInvalidState();
                uint8 line = capacity == 4 || i <= 3 ? 0 : i <= 12 ? 1 : 2;
                uint256 bit = uint256(1) << (s.arrival - 1);
                if ((seen[line] & bit) != 0) revert RepairInvalidState();
                seen[line] |= bit;
                ++counts[line];
                archiveMask |= uint256(1) << (i - 1);
            }
            bytes memory oldState = abi.encode(_slot(edit.account, edit.level, i));
            bytes memory newState = abi.encode(s);
            bool slotChanged = keccak256(oldState) != keccak256(newState);
            bytes memory oldArchive = _archive(edit.account, edit.level, cycle, i);
            bytes memory newArchive = abi.encode(s.position, s.arrival, s.activationId, s.isMirror, s.rule);
            bool archiveChanged = keccak256(oldArchive) != keccak256(newArchive);
            if (slotChanged || archiveChanged) {
                emit HistoricalOrbitSlotRepaired(edit.account, edit.level, cycle, i, oldState, newState,
                    oldArchive);
            }
            // Most slots are unchanged or empty; avoid rewriting them in the atomic batch.
            if (slotChanged) {
                orbit.positions[i] = s.position;
                orbit.positionAbove[i] = s.above;
                positionLineArrivalNumber[edit.account][edit.level][i] = s.arrival;
                positionActivationId[edit.account][edit.level][i] = s.activationId;
                positionIsMirror[edit.account][edit.level][i] = s.isMirror;
                storedRuleSnapshots[edit.account][edit.level][i] = s.rule;
            }
            if (archiveChanged) {
                historicalCyclePositions[edit.account][edit.level][cycle][i] = s.position;
                historicalPositionLineArrivalNumber[edit.account][edit.level][cycle][i] = s.arrival;
                historicalPositionActivationId[edit.account][edit.level][cycle][i] = s.activationId;
                historicalPositionIsMirror[edit.account][edit.level][cycle][i] = s.isMirror;
                historicalStoredRuleSnapshots[edit.account][edit.level][cycle][i] = s.rule;
            }
        }
        // A repair must not silently complete a cycle or mint a recycle reward.
        if (firstEmpty == 0) revert RepairInvalidState();
        for (uint8 line; line < 3; ++line) {
            if (seen[line] != (uint256(1) << counts[line]) - 1) revert RepairInvalidState();
            linePaymentCounts[edit.account][edit.level][line + 1] = counts[line];
        }
        orbit.currentPosition = firstEmpty;
        orbit.positionsInLine1 = counts[0];
        orbit.positionsInLine2 = counts[1];
        orbit.positionsInLine3 = counts[2];
        if (archiveMask != 0) orbit.isActive = true;
        historicalCycleArchiveMask[edit.account][edit.level][cycle] = archiveMask;
    }

}

/// @custom:oz-upgrades-unsafe-allow missing-initializer
contract Id1P4RepairMigrator is Id1OrbitRepairBase {
    uint256[50] private __gap;
    constructor(address proxy, address executor, bytes32 planHash, uint256 chain)
        Id1OrbitRepairBase(proxy, executor, planHash, chain) {}
}

/// @custom:oz-upgrades-unsafe-allow missing-initializer
contract Id1MultiRingRepairMigrator is Id1OrbitRepairBase {
    mapping(address => mapping(uint8 => address)) internal matrixPlacementParent;
    uint256[49] private __gap;
    constructor(address proxy, address executor, bytes32 planHash, uint256 chain)
        Id1OrbitRepairBase(proxy, executor, planHash, chain) {}
}

/// @custom:oz-upgrades-unsafe-allow missing-initializer
contract Id1RegistrationRepairMigrator is RegistrationFixed, Id1RepairGuard {
    struct ParentEdit { address account; uint8 level; address previousParent; address correctedParent; address sponsor; }
    event HistoricalMatrixParentRepaired(address indexed account, uint8 indexed level,
        address previousParent, address correctedParent, bytes32 indexed planHash);

    constructor(address proxy, address executor, bytes32 planHash, uint256 chain)
        Id1RepairGuard(proxy, executor, planHash, chain) {}

    function repair(bytes calldata plan) external whenPaused {
        _beginRepair(plan, owner());
        ParentEdit[] memory edits = abi.decode(plan, (ParentEdit[]));
        if (edits.length == 0 || edits.length > 10) revert RepairInvalidState();
        for (uint256 i; i < edits.length; ++i) {
            ParentEdit memory edit = edits[i];
            if (edit.level != 8 && edit.level != 9) revert RepairInvalidState();
            if (!isRegistered[edit.account] || !levelActivated[edit.account][edit.level] ||
                edit.correctedParent == address(0) || edit.correctedParent == edit.account ||
                referrerOf[edit.account] != edit.sponsor ||
                currentMatrixParentOf[edit.account][edit.level] != edit.previousParent ||
                (edit.correctedParent != id1Wallet && !levelActivated[edit.correctedParent][edit.level])) revert RepairStateChanged();
            currentMatrixParentOf[edit.account][edit.level] = edit.correctedParent;
            emit HistoricalMatrixParentRepaired(edit.account, edit.level, edit.previousParent, edit.correctedParent, repairPlanHash);
        }
    }
}

/** One governance call applies the manifest-bound structural edits atomically. No token operations. */
contract Id1HistoricalRepairExecutor {
    address public immutable governance;
    uint256 public immutable executionChain;
    address[4] public targets;
    bytes32[4] public planHashes;
    bool public executed;

    event HistoricalRepairExecuted(bytes32 indexed manifestHash);

    constructor(address owner_, address[4] memory targets_, bytes32[4] memory hashes_, uint256 chain_) {
        require(owner_ != address(0) && chain_ != 0, "Invalid configuration");
        governance = owner_; targets = targets_; planHashes = hashes_; executionChain = chain_;
        for (uint256 i; i < 4; ++i) {
            require(targets_[i].code.length > 0 && hashes_[i] != bytes32(0), "Invalid target");
            for (uint256 j; j < i; ++j) require(targets_[i] != targets_[j], "Duplicate target");
        }
    }

    function execute(bytes[4] calldata plans) external {
        require(msg.sender == governance && block.chainid == executionChain, "Not authorized");
        require(!executed, "Already executed");
        executed = true;
        for (uint256 i; i < 4; ++i) {
            require(keccak256(plans[i]) == planHashes[i], "Plan mismatch");
            IId1RepairTarget(targets[i]).repair(plans[i]);
        }
        emit HistoricalRepairExecuted(keccak256(abi.encode(planHashes)));
    }
}
