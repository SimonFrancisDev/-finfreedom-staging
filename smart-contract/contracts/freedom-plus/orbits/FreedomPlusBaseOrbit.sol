// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "../interfaces/IFreedomPlusOrbit.sol";

interface IFreedomPlusGuardian {
    function validateUpgrade(address proxy, address implementation) external view returns (bool);
}

abstract contract FreedomPlusBaseOrbit is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    PausableUpgradeable,
    IFreedomPlusOrbit
{
    struct CycleData {
        uint8 filledPositions;
        bool closed;
        mapping(uint8 => Position) positions;
    }

    address public manager;
    address public guardian;

    mapping(address => mapping(uint8 => uint256)) private _currentCycles;
    mapping(address => mapping(uint8 => mapping(uint256 => CycleData))) private _cycles;
    mapping(address => mapping(uint8 => address)) private _currentStructuralParents;

    error OnlyManager();
    error InvalidContract(address target);
    error InvalidAddress();
    error UnsupportedLevel(uint8 level);
    error InvalidActivationId();
    error CycleAlreadyClosed(address orbitOwner, uint8 level, uint256 cycle);
    error MissingParentPosition(address orbitOwner, uint8 level, uint256 cycle, uint8 position);
    error InvalidPlacementId();
    error DuplicatePlacement(bytes32 placementId);
    error InvalidGenesisFinancialState();
    error InvalidPaidPlacementAmount();

    mapping(bytes32 => bool) public placementRecorded;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    modifier onlyManager() {
        if (msg.sender != manager) revert OnlyManager();
        _;
    }

    function __FreedomPlusBaseOrbit_init(
        address manager_,
        address initialOwner,
        address guardian_
    ) internal onlyInitializing {
        _requireContract(manager_);
        if (initialOwner == address(0)) revert InvalidAddress();
        _requireContract(guardian_);

        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __Pausable_init();

        manager = manager_;
        guardian = guardian_;
    }

    function _authorizeUpgrade(address implementation) internal view override onlyOwner {
        _requireContract(implementation);
        if (!IFreedomPlusGuardian(guardian).validateUpgrade(address(this), implementation)) {
            revert InvalidContract(implementation);
        }
    }

    function setManager(address manager_) external onlyOwner {
        _requireContract(manager_);
        address previous = manager;
        manager = manager_;
        emit ManagerUpdated(previous, manager_);
    }

    function setGuardian(address guardian_) external onlyOwner {
        _requireContract(guardian_);
        address previous = guardian;
        guardian = guardian_;
        emit GuardianUpdated(previous, guardian_);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function recordPosition(
        address orbitOwner,
        address participant,
        uint8 level,
        bytes32 activationId,
        bytes32 placementId,
        uint256 amount,
        PlacementKind kind,
        bool financial
    ) external onlyManager whenNotPaused returns (
        uint256 cycle,
        uint8 position,
        uint8 ring,
        address structuralParent
    ) {
        if (orbitOwner == address(0) || participant == address(0)) revert InvalidAddress();
        if (!supportsLevel(level)) revert UnsupportedLevel(level);
        if (activationId == bytes32(0)) revert InvalidActivationId();
        if (placementId == bytes32(0)) revert InvalidPlacementId();
        if (placementRecorded[placementId]) {
            revert DuplicatePlacement(placementId);
        }
        if (kind == PlacementKind.Genesis && (financial || amount != 0)) {
            revert InvalidGenesisFinancialState();
        }
        if (kind != PlacementKind.Genesis && (!financial || amount == 0)) {
            revert InvalidPaidPlacementAmount();
        }

        cycle = _currentCycles[orbitOwner][level];
        CycleData storage cycleData = _cycles[orbitOwner][level][cycle];
        if (cycleData.closed) revert CycleAlreadyClosed(orbitOwner, level, cycle);

        uint8 capacity = FreedomPlusConfig.positionCount(orbitType());
        position = cycleData.filledPositions + 1;
        ring = FreedomPlusConfig.ringForPosition(orbitType(), position);

        uint8 parentSlot = FreedomPlusConfig.parentPosition(orbitType(), position);
        if (parentSlot == 0) {
            structuralParent = orbitOwner;
        } else {
            structuralParent = cycleData.positions[parentSlot].participant;
            if (structuralParent == address(0)) {
                revert MissingParentPosition(orbitOwner, level, cycle, parentSlot);
            }
        }

        cycleData.positions[position] = Position({
            participant: participant,
            structuralParent: structuralParent,
            activationId: activationId,
            placementId: placementId,
            amount: amount,
            timestamp: uint40(block.timestamp),
            kind: kind,
            financial: financial
        });
        cycleData.filledPositions = position;
        placementRecorded[placementId] = true;

        if (kind == PlacementKind.Activation || kind == PlacementKind.Recycle) {
            _currentStructuralParents[participant][level] = structuralParent;
            emit StructuralParentRecorded(
                participant,
                level,
                structuralParent,
                orbitOwner,
                cycle,
                position,
                kind
            );
        }

        emit PositionRecorded(
            orbitOwner,
            participant,
            level,
            cycle,
            position,
            ring,
            structuralParent,
            activationId,
            placementId,
            amount,
            kind,
            financial
        );

        if (position == capacity) {
            cycleData.closed = true;
            emit CycleClosed(orbitOwner, level, cycle);
            _currentCycles[orbitOwner][level] = cycle + 1;
        }
    }

    function currentCycleOf(address orbitOwner, uint8 level) external view returns (uint256) {
        if (!supportsLevel(level)) revert UnsupportedLevel(level);
        return _currentCycles[orbitOwner][level];
    }

    function cycleState(address orbitOwner, uint8 level, uint256 cycle)
        external
        view
        returns (CycleView memory viewData)
    {
        if (!supportsLevel(level)) revert UnsupportedLevel(level);
        CycleData storage stored = _cycles[orbitOwner][level][cycle];
        viewData = CycleView({
            filledPositions: stored.filledPositions,
            capacity: FreedomPlusConfig.positionCount(orbitType()),
            closed: stored.closed
        });
    }

    function positionAt(address orbitOwner, uint8 level, uint256 cycle, uint8 position)
        external
        view
        returns (Position memory)
    {
        if (!supportsLevel(level)) revert UnsupportedLevel(level);
        FreedomPlusConfig.ringForPosition(orbitType(), position);
        return _cycles[orbitOwner][level][cycle].positions[position];
    }

    function currentStructuralParentOf(address participant, uint8 level)
        external
        view
        returns (address)
    {
        if (!supportsLevel(level)) revert UnsupportedLevel(level);
        return _currentStructuralParents[participant][level];
    }

    function supportsLevel(uint8 level) public pure virtual returns (bool);
    function orbitType() public pure virtual returns (FreedomPlusConfig.OrbitType);

    function _requireContract(address target) internal view {
        if (target == address(0) || target.code.length == 0) revert InvalidContract(target);
    }

    uint256[43] private __gap;
}
