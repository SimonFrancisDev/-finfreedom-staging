// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../freedom-plus/orbits/FreedomPlusBaseOrbit.sol";
import "./Id1HistoricalRepair.sol";

interface IFreedomPlusRepairRouter {
    function id1Wallet() external view returns (address);
    function registration() external view returns (address);
    function manager() external view returns (address);
    function activationSettled(bytes32 activationId) external view returns (bool);
    function recycleReserve(address account, uint8 level, uint256 cycle) external view returns (uint256);
    function recycleReserveConsumed(address account, uint8 level, uint256 cycle) external view returns (bool);
}

interface IFreedomPlusRepairPause {
    function paused() external view returns (bool);
}

/// Temporary append-only implementation. No transfer, mint, or primary-parent edits.
abstract contract FreedomPlusHistoricalOrbitRepair is FreedomPlusBaseOrbit, Id1RepairGuard {
    struct Addition {
        uint8 slot;
        Position data;
        bytes32 originalTransaction;
    }

    struct Edit {
        address account;
        uint8 level;
        uint256 cycle;
        bytes32 beforeHash;
        Addition[] additions;
    }

    event FreedomPlusHistoricalPositionRestored(
        address indexed account, address indexed participant, uint8 indexed level,
        uint256 cycle, uint8 position, bytes positionData, bytes32 originalTransaction
    );
    event FreedomPlusHistoricalOrbitRestored(
        address indexed account, uint8 indexed level, bytes32 indexed planHash,
        bytes32 beforeHash, bytes32 afterHash
    );

    constructor(address proxy, address executor, bytes32 planHash, uint256 chain)
        Id1RepairGuard(proxy, executor, planHash, chain) {
        require(chain == 137 || chain == 31337, "Unsupported repair chain");
    }

    function repairStateHash(address account, uint8 level) public view returns (bytes32 result) {
        if (!supportsLevel(level)) revert UnsupportedLevel(level);
        uint256 cycle = _currentCycles[account][level];
        CycleData storage state = _cycles[account][level][cycle];
        result = keccak256(abi.encode(owner(), manager, guardian, orbitType(), account, level,
            cycle, state.filledPositions, state.closed, _currentStructuralParents[account][level]));
        for (uint8 ring = 1; ring <= FreedomPlusConfig.ringCount(orbitType()); ring++) {
            result = keccak256(abi.encode(result, state.ringFilledCounts[ring]));
        }
        for (uint8 slot = 1; slot <= FreedomPlusConfig.positionCount(orbitType()); slot++) {
            Position memory position = state.positions[slot];
            result = keccak256(abi.encode(result, position, placementRecorded[position.placementId],
                _currentStructuralParents[position.participant][level]));
        }
    }

    function repair(bytes calldata plan) external whenPaused {
        _beginRepair(plan, owner());
        IFreedomPlusRepairRouter router = IFreedomPlusRepairRouter(manager);
        if (!IFreedomPlusRepairPause(manager).paused() ||
            !IFreedomPlusRepairPause(router.registration()).paused() ||
            !IFreedomPlusRepairPause(router.manager()).paused()) revert RepairInvalidState();
        Edit[] memory edits = abi.decode(plan, (Edit[]));
        if (edits.length > 4) revert RepairInvalidState();
        for (uint256 i; i < edits.length; i++) {
            Edit memory edit = edits[i];
            if (repairStateHash(edit.account, edit.level) != edit.beforeHash ||
                _currentCycles[edit.account][edit.level] != edit.cycle) revert RepairStateChanged();
            if (edit.additions.length == 0 || edit.additions.length > 16 ||
                router.recycleReserve(edit.account, edit.level, edit.cycle) != 0 ||
                router.recycleReserveConsumed(edit.account, edit.level, edit.cycle)) revert RepairInvalidState();
            _validateCounts(edit);
            for (uint256 j; j < edit.additions.length; j++) _append(edit, edit.additions[j], router);
            _validateCounts(edit);
            emit FreedomPlusHistoricalOrbitRestored(edit.account, edit.level, repairPlanHash,
                edit.beforeHash, repairStateHash(edit.account, edit.level));
        }
    }

    function _validateCounts(Edit memory edit) private view {
        CycleData storage state = _cycles[edit.account][edit.level][edit.cycle];
        uint8 capacity = FreedomPlusConfig.positionCount(orbitType());
        uint8[4] memory counts;
        uint8 total;
        for (uint8 slot = 1; slot <= capacity; slot++) {
            if (state.positions[slot].participant == address(0)) continue;
            total++;
            counts[FreedomPlusConfig.ringForPosition(orbitType(), slot)]++;
        }
        if (state.closed || total != state.filledPositions || total >= capacity) revert RepairInvalidState();
        uint8 lastRing = FreedomPlusConfig.ringCount(orbitType());
        for (uint8 ring = 1; ring <= lastRing; ring++) {
            if (counts[ring] != state.ringFilledCounts[ring]) revert RepairInvalidState();
        }
        // This package must not manufacture a reserve contribution or close a cycle.
        if (counts[lastRing] >= FreedomPlusConfig.firstRecycleQualifyingArrival(orbitType())) {
            revert RepairInvalidState();
        }
    }

    function _append(Edit memory edit, Addition memory addition, IFreedomPlusRepairRouter router) private {
        CycleData storage state = _cycles[edit.account][edit.level][edit.cycle];
        Position memory value = addition.data;
        uint8 ring = FreedomPlusConfig.ringForPosition(orbitType(), addition.slot);
        Position memory empty;
        if (keccak256(abi.encode(state.positions[addition.slot])) != keccak256(abi.encode(empty))) {
            revert RepairStateChanged();
        }
        if (value.participant == address(0) || value.participant == edit.account ||
            value.activationId == bytes32(0) || value.placementId == bytes32(0) ||
            addition.originalTransaction == bytes32(0) || value.timestamp == 0 ||
            value.timestamp > block.timestamp || placementRecorded[value.placementId] ||
            !router.activationSettled(value.activationId)) revert RepairInvalidState();
        uint8 parentSlot = FreedomPlusConfig.parentPosition(orbitType(), addition.slot);
        address parent = parentSlot == 0 ? edit.account : state.positions[parentSlot].participant;
        if (parent == address(0) || value.structuralParent != parent) revert RepairInvalidState();
        for (uint8 slot = 1; slot <= FreedomPlusConfig.positionCount(orbitType()); slot++) {
            Position storage existing = state.positions[slot];
            if (existing.participant == value.participant || existing.activationId == value.activationId) {
                revert RepairInvalidState();
            }
        }
        address id1 = router.id1Wallet();
        if (value.kind == PlacementKind.Genesis) {
            // Only the omitted zero-money representative link at binary levels 2/4.
            if ((edit.level != 2 && edit.level != 4) || edit.account == id1 || ring != 1 ||
                value.financial || value.amount != 0 ||
                value.placementId != keccak256(abi.encode(value.activationId, "GENESIS_ANCESTRY"))) {
                revert RepairInvalidState();
            }
            Position memory original = _cycles[id1][edit.level][0].positions[3];
            if (original.kind != PlacementKind.Genesis || original.financial || original.amount != 0 ||
                original.participant != value.participant || original.structuralParent != edit.account ||
                original.activationId != value.activationId || original.timestamp != value.timestamp ||
                _currentStructuralParents[value.participant][edit.level] != edit.account) revert RepairInvalidState();
        } else {
            if (value.kind != PlacementKind.RoutedPayment || !value.financial || edit.account != id1 ||
                edit.level > 3 || ring < 2 || value.amount !=
                FreedomPlusConfig.levelConfig(edit.level).price * FreedomPlusConfig.payoutBps(orbitType(), ring) / 10000 ||
                value.placementId != keccak256(abi.encode(value.activationId, "COMPONENT", ring))) {
                revert RepairInvalidState();
            }
            bool matchingParentAppearance;
            CycleData storage parentState = _cycles[parent][edit.level][_currentCycles[parent][edit.level]];
            for (uint8 slot = 1; slot <= FreedomPlusConfig.positionCount(orbitType()); slot++) {
                if (FreedomPlusConfig.ringForPosition(orbitType(), slot) != 1) break;
                Position storage original = parentState.positions[slot];
                if (original.participant == value.participant && original.activationId == value.activationId &&
                    original.financial && original.amount > 0 && original.timestamp == value.timestamp) {
                    matchingParentAppearance = true;
                }
            }
            if (!matchingParentAppearance) revert RepairInvalidState();
        }
        state.positions[addition.slot] = value;
        state.filledPositions++;
        state.ringFilledCounts[ring]++;
        placementRecorded[value.placementId] = true;
        emit FreedomPlusHistoricalPositionRestored(edit.account, value.participant, edit.level,
            edit.cycle, addition.slot, abi.encode(value), addition.originalTransaction);
    }
}

contract FreedomPlusP39HistoricalRepair is FreedomPlusHistoricalOrbitRepair {
    constructor(address p, address e, bytes32 h, uint256 c) FreedomPlusHistoricalOrbitRepair(p, e, h, c) {}
    function supportsLevel(uint8 level) public pure override returns (bool) { return level == 1; }
    function orbitType() public pure override returns (FreedomPlusConfig.OrbitType) { return FreedomPlusConfig.OrbitType.P39; }
}

contract FreedomPlusP14HistoricalRepair is FreedomPlusHistoricalOrbitRepair {
    constructor(address p, address e, bytes32 h, uint256 c) FreedomPlusHistoricalOrbitRepair(p, e, h, c) {}
    function supportsLevel(uint8 level) public pure override returns (bool) { return level == 2; }
    function orbitType() public pure override returns (FreedomPlusConfig.OrbitType) { return FreedomPlusConfig.OrbitType.P14; }
}

contract FreedomPlusP12HistoricalRepair is FreedomPlusHistoricalOrbitRepair {
    constructor(address p, address e, bytes32 h, uint256 c) FreedomPlusHistoricalOrbitRepair(p, e, h, c) {}
    function supportsLevel(uint8 level) public pure override returns (bool) { return level == 3; }
    function orbitType() public pure override returns (FreedomPlusConfig.OrbitType) { return FreedomPlusConfig.OrbitType.P12; }
}

contract FreedomPlusP6HistoricalRepair is FreedomPlusHistoricalOrbitRepair {
    constructor(address p, address e, bytes32 h, uint256 c) FreedomPlusHistoricalOrbitRepair(p, e, h, c) {}
    function supportsLevel(uint8 level) public pure override returns (bool) { return level == 4; }
    function orbitType() public pure override returns (FreedomPlusConfig.OrbitType) { return FreedomPlusConfig.OrbitType.P6; }
}
