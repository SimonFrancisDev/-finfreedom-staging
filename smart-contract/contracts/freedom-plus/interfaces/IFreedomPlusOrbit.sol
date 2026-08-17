// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../libraries/FreedomPlusConfig.sol";

interface IFreedomPlusOrbit {
    enum PlacementKind {
        Genesis,
        Activation,
        RoutedPayment,
        Recycle
    }

    struct Position {
        address participant;
        address structuralParent;
        bytes32 activationId;
        bytes32 placementId;
        uint256 amount;
        uint40 timestamp;
        PlacementKind kind;
        bool financial;
    }

    struct CycleView {
        uint8 filledPositions;
        uint8 capacity;
        bool closed;
    }

    event ManagerUpdated(address indexed previousManager, address indexed newManager);
    event GuardianUpdated(address indexed previousGuardian, address indexed newGuardian);
    event PositionRecorded(
        address indexed orbitOwner,
        address indexed participant,
        uint8 indexed level,
        uint256 cycle,
        uint8 position,
        uint8 ring,
        address structuralParent,
        bytes32 activationId,
        bytes32 placementId,
        uint256 amount,
        PlacementKind kind,
        bool financial
    );
    event StructuralParentRecorded(
        address indexed participant,
        uint8 indexed level,
        address indexed parent,
        address orbitOwner,
        uint256 cycle,
        uint8 position,
        PlacementKind kind
    );
    event CycleClosed(address indexed orbitOwner, uint8 indexed level, uint256 indexed cycle);

    function recordPosition(
        address orbitOwner,
        address participant,
        address matrixAnchor,
        uint8 level,
        bytes32 activationId,
        bytes32 placementId,
        uint256 amount,
        PlacementKind kind,
        bool financial
    ) external returns (uint256 cycle, uint8 position, uint8 ring, address structuralParent);

    function currentCycleOf(address orbitOwner, uint8 level) external view returns (uint256);
    function cycleState(address orbitOwner, uint8 level, uint256 cycle)
        external
        view
        returns (CycleView memory);
    function positionAt(address orbitOwner, uint8 level, uint256 cycle, uint8 position)
        external
        view
        returns (Position memory);
    function currentStructuralParentOf(address participant, uint8 level)
        external
        view
        returns (address);
    function ringFilledCount(address orbitOwner, uint8 level, uint256 cycle, uint8 ring)
        external
        view
        returns (uint8);
    function orbitType() external pure returns (FreedomPlusConfig.OrbitType);
    function supportsLevel(uint8 level) external pure returns (bool);
}
