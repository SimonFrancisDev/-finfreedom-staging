// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "./libraries/FreedomPlusConfig.sol";
import "./interfaces/IFreedomPlusOrbit.sol";
import "./interfaces/IFreedomPlusRegistrationView.sol";
import "./interfaces/IFreedomPlusSettlementRouter.sol";
import "./interfaces/IFreedomPlusRecycleManager.sol";

interface IFreedomPlusRouterGuardian {
    function validateUpgrade(address proxy, address implementation) external view returns (bool);
}

contract FreedomPlusSettlementRouter is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable,
    IFreedomPlusSettlementRouter
{
    using SafeERC20 for IERC20;

    struct Component {
        uint8 role;
        uint16 bps;
        address candidate;
        address anchor;
    }

    struct SourcePlacement {
        IFreedomPlusOrbit orbit;
        FreedomPlusConfig.OrbitType orbitType;
        address orbitOwner;
        uint256 cycle;
        uint8 position;
        uint8 ring;
        address parent;
    }

    IERC20 public usdt;
    IFreedomPlusRegistrationView public registration;
    address public manager;
    address public id1Wallet;
    address public nftPoolVault;
    address public operationsVault;
    address public guardian;
    bool public configurationLocked;

    mapping(uint8 => IFreedomPlusOrbit) public orbitByType;
    mapping(bytes32 => bool) public activationSettled;
    mapping(address => mapping(uint8 => mapping(uint256 => uint256))) public recycleReserve;
    mapping(address => mapping(uint8 => mapping(uint256 => bool))) public recycleReserveConsumed;

    event OrbitConfigured(uint8 indexed orbitType, address indexed orbit);
    event ConfigurationLocked();
    event GuardianUpdated(address indexed previousGuardian, address indexed newGuardian);
    event ComponentSettled(
        bytes32 indexed activationId,
        uint8 indexed role,
        address indexed recipient,
        address originalCandidate,
        uint8 level,
        uint16 bps,
        uint256 amount,
        bool id1Fallback,
        bytes32 placementId
    );
    event SystemChargeSettled(
        bytes32 indexed activationId,
        uint8 indexed level,
        uint256 grossCharge,
        uint256 nftPoolAmount,
        uint256 operationsAmount
    );
    event ActivationSettlementCompleted(
        bytes32 indexed activationId,
        address indexed participant,
        uint8 indexed level,
        uint256 participantComponents,
        uint256 systemCharge
    );
    event RecycleReserveUpdated(
        address indexed orbitOwner,
        uint8 indexed level,
        uint256 indexed cycle,
        uint256 added,
        uint256 total
    );
    event RecycleCompleted(
        address indexed orbitOwner,
        uint8 indexed level,
        uint256 indexed closedCycle,
        bytes32 recycleActivationId,
        address sponsor,
        uint256 repurchasePrice
    );
    event GenesisPlacementRecorded(
        bytes32 indexed activationId,
        address indexed participant,
        uint8 indexed level,
        address sponsor,
        uint256 cycle,
        uint8 position,
        uint8 ring
    );

    error OnlyManager();
    error InvalidAddress();
    error InvalidContract(address target);
    error InvalidLevel(uint8 level);
    error InvalidPrice(uint256 expected, uint256 supplied);
    error ActivationAlreadySettled(bytes32 activationId);
    error OrbitAlreadyConfigured(uint8 orbitType);
    error OrbitNotConfigured(uint8 orbitType);
    error ConfigurationIsLocked();
    error ConfigurationIncomplete(uint8 orbitType);
    error UplineSearchLimitReached(address candidate, uint8 level);
    error AccountingMismatch(uint256 expected, uint256 actual);
    error RecycleReserveOverflow(uint256 expected, uint256 actual);
    error RecycleReserveAlreadyConsumed(address orbitOwner, uint8 level, uint256 cycle);
    error RecycleDepthExceeded();

    uint16 private constant SYSTEM_BPS = 1_000;
    uint16 private constant NFT_POOL_SHARE_BPS = 8_000;
    uint16 private constant BPS = 10_000;
    uint16 private constant MAX_UPLINE_SEARCH = 256;
    uint8 private constant MAX_RECYCLE_DEPTH = 64;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() { _disableInitializers(); }

    modifier onlyManager() {
        if (msg.sender != manager) revert OnlyManager();
        _;
    }

    function initialize(
        address usdt_,
        address registration_,
        address manager_,
        address id1Wallet_,
        address nftPoolVault_,
        address operationsVault_,
        address initialOwner,
        address guardian_
    ) public initializer {
        _requireContract(usdt_);
        _requireContract(registration_);
        _requireContract(manager_);
        if (id1Wallet_ == address(0) || initialOwner == address(0)) revert InvalidAddress();
        _requireContract(nftPoolVault_);
        _requireContract(operationsVault_);
        _requireContract(guardian_);

        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __Pausable_init();
        __ReentrancyGuard_init();

        usdt = IERC20(usdt_);
        registration = IFreedomPlusRegistrationView(registration_);
        manager = manager_;
        id1Wallet = id1Wallet_;
        nftPoolVault = nftPoolVault_;
        operationsVault = operationsVault_;
        guardian = guardian_;
    }

    function _authorizeUpgrade(address implementation) internal view override onlyOwner {
        _requireContract(implementation);
        if (!IFreedomPlusRouterGuardian(guardian).validateUpgrade(address(this), implementation)) {
            revert InvalidContract(implementation);
        }
    }

    function configureOrbit(FreedomPlusConfig.OrbitType orbitType_, address orbit_) external onlyOwner {
        if (configurationLocked) revert ConfigurationIsLocked();
        uint8 key = uint8(orbitType_);
        if (address(orbitByType[key]) != address(0)) revert OrbitAlreadyConfigured(key);
        _requireContract(orbit_);
        IFreedomPlusOrbit orbit = IFreedomPlusOrbit(orbit_);
        if (orbit.orbitType() != orbitType_) revert InvalidContract(orbit_);
        orbitByType[key] = orbit;
        emit OrbitConfigured(key, orbit_);
    }

    function lockConfiguration() external onlyOwner {
        if (configurationLocked) revert ConfigurationIsLocked();
        for (uint8 key = 0; key < 6; key++) {
            if (address(orbitByType[key]) == address(0)) revert ConfigurationIncomplete(key);
        }
        configurationLocked = true;
        emit ConfigurationLocked();
    }

    function settlePaidActivation(
        address participant,
        address sponsor,
        uint8 level,
        uint256 price,
        bytes32 activationId
    ) external onlyManager whenNotPaused nonReentrant {
        if (!configurationLocked) revert ConfigurationIncomplete(type(uint8).max);
        if (participant == address(0) || sponsor == address(0) || activationId == bytes32(0)) {
            revert InvalidAddress();
        }
        if (level < 1 || level > 7) revert InvalidLevel(level);
        if (activationSettled[activationId]) revert ActivationAlreadySettled(activationId);

        FreedomPlusConfig.LevelConfig memory config = FreedomPlusConfig.levelConfig(level);
        if (price != config.price) revert InvalidPrice(config.price, price);

        _settleActivation(
            participant,
            sponsor,
            level,
            price,
            activationId,
            config.orbitType,
            IFreedomPlusOrbit.PlacementKind.Activation,
            0
        );

        activationSettled[activationId] = true;
    }

    function recordGenesisActivation(
        address participant,
        address sponsor,
        uint8 level,
        bytes32 activationId
    ) external onlyManager whenNotPaused nonReentrant {
        if (!configurationLocked) revert ConfigurationIncomplete(type(uint8).max);
        if (participant == address(0) || sponsor == address(0) || activationId == bytes32(0)) {
            revert InvalidAddress();
        }
        if (level < 1 || level > 7) revert InvalidLevel(level);
        if (activationSettled[activationId]) revert ActivationAlreadySettled(activationId);

        FreedomPlusConfig.LevelConfig memory config = FreedomPlusConfig.levelConfig(level);
        IFreedomPlusOrbit orbit = orbitByType[uint8(config.orbitType)];
        bytes32 placementId = keccak256(abi.encode(activationId, "GENESIS"));
        (uint256 cycle, uint8 position, uint8 ring,) = orbit.recordPosition(
            sponsor,
            participant,
            sponsor,
            level,
            activationId,
            placementId,
            0,
            IFreedomPlusOrbit.PlacementKind.Genesis,
            false
        );
        activationSettled[activationId] = true;
        emit GenesisPlacementRecorded(
            activationId,
            participant,
            level,
            sponsor,
            cycle,
            position,
            ring
        );
    }

    function _settleActivation(
        address participant,
        address sponsor,
        uint8 level,
        uint256 price,
        bytes32 activationId,
        FreedomPlusConfig.OrbitType orbitType_,
        IFreedomPlusOrbit.PlacementKind placementKind,
        uint8 recycleDepth
    ) internal {
        if (recycleDepth > MAX_RECYCLE_DEPTH) revert RecycleDepthExceeded();
        SourcePlacement memory source = _recordSource(
            participant,
            sponsor,
            level,
            price,
            activationId,
            orbitType_,
            placementKind
        );
        bool recycleWindow = _isRecycleWindow(source, level);

        if (
            recycleWindow
                && (source.orbitType == FreedomPlusConfig.OrbitType.P4
                    || source.orbitType == FreedomPlusConfig.OrbitType.P3)
        ) {
            bool completed = _addRecycleReserve(source, level, price, price);
            emit ActivationSettlementCompleted(activationId, participant, level, 0, 0);
            if (completed) _executeRecycle(source, participant, level, price, recycleDepth);
            return;
        }

        Component[3] memory components;
        uint8 componentCount = _buildComponents(source, sponsor, level, components);
        uint256 componentTotal;
        uint256 reservedTotal;
        for (uint8 index = 0; index < componentCount; index++) {
            uint256 amount = price * components[index].bps / BPS;
            if (recycleWindow && components[index].bps == 5_000) {
                reservedTotal += amount;
                _addRecycleReserve(source, level, amount, price);
            } else {
                componentTotal += amount;
                _settleComponent(
                    participant,
                    level,
                    activationId,
                    source,
                    components[index],
                    amount
                );
            }
        }

        uint256 systemCharge = price * SYSTEM_BPS / BPS;
        _settleSystemCharge(activationId, level, systemCharge);
        uint256 accounted = componentTotal + reservedTotal + systemCharge;
        if (accounted != price) revert AccountingMismatch(price, accounted);

        emit ActivationSettlementCompleted(
            activationId,
            participant,
            level,
            componentTotal,
            systemCharge
        );

        if (recycleWindow && recycleReserve[source.orbitOwner][level][source.cycle] == price) {
            _executeRecycle(source, participant, level, price, recycleDepth);
        }
    }

    function _recordSource(
        address participant,
        address sponsor,
        uint8 level,
        uint256 price,
        bytes32 activationId,
        FreedomPlusConfig.OrbitType orbitType_,
        IFreedomPlusOrbit.PlacementKind placementKind
    ) internal returns (SourcePlacement memory source) {
        source.orbitType = orbitType_;
        source.orbitOwner = sponsor;
        source.orbit = orbitByType[uint8(orbitType_)];
        bytes32 placementId = keccak256(abi.encode(activationId, "SOURCE"));
        (source.cycle, source.position, source.ring, source.parent) = source.orbit.recordPosition(
            sponsor,
            participant,
            sponsor,
            level,
            activationId,
            placementId,
            price,
            placementKind,
            true
        );
    }

    function _addRecycleReserve(
        SourcePlacement memory source,
        uint8 level,
        uint256 amount,
        uint256 required
    ) internal returns (bool completed) {
        if (recycleReserveConsumed[source.orbitOwner][level][source.cycle]) {
            revert RecycleReserveAlreadyConsumed(source.orbitOwner, level, source.cycle);
        }
        uint256 total = recycleReserve[source.orbitOwner][level][source.cycle] + amount;
        if (total > required) revert RecycleReserveOverflow(required, total);
        recycleReserve[source.orbitOwner][level][source.cycle] = total;
        emit RecycleReserveUpdated(source.orbitOwner, level, source.cycle, amount, total);
        return total == required;
    }

    function _executeRecycle(
        SourcePlacement memory completedSource,
        address,
        uint8 level,
        uint256 price,
        uint8 recycleDepth
    ) internal {
        address orbitOwner = completedSource.orbitOwner;
        uint256 closedCycle = completedSource.cycle;
        if (recycleReserveConsumed[orbitOwner][level][closedCycle]) {
            revert RecycleReserveAlreadyConsumed(orbitOwner, level, closedCycle);
        }
        if (recycleReserve[orbitOwner][level][closedCycle] != price) {
            revert AccountingMismatch(price, recycleReserve[orbitOwner][level][closedCycle]);
        }
        recycleReserveConsumed[orbitOwner][level][closedCycle] = true;
        recycleReserve[orbitOwner][level][closedCycle] = 0;

        address sponsor = orbitOwner == id1Wallet
            ? id1Wallet
            : registration.sponsorOf(orbitOwner);
        if (sponsor == address(0)) sponsor = id1Wallet;
        bytes32 recycleActivationId = keccak256(
            abi.encode("FREEDOM_PLUS_RECYCLE", orbitOwner, level, closedCycle)
        );
        if (activationSettled[recycleActivationId]) {
            revert ActivationAlreadySettled(recycleActivationId);
        }
        activationSettled[recycleActivationId] = true;

        FreedomPlusConfig.LevelConfig memory config = FreedomPlusConfig.levelConfig(level);
        _settleActivation(
            orbitOwner,
            sponsor,
            level,
            price,
            recycleActivationId,
            config.orbitType,
            IFreedomPlusOrbit.PlacementKind.Recycle,
            recycleDepth + 1
        );
        IFreedomPlusRecycleManager(manager).completeFundedRecycle(
            orbitOwner,
            level,
            recycleActivationId
        );
        emit RecycleCompleted(
            orbitOwner,
            level,
            closedCycle,
            recycleActivationId,
            sponsor,
            price
        );
    }

    function _buildComponents(
        SourcePlacement memory source,
        address orbitOwner,
        uint8 level,
        Component[3] memory components
    ) internal view returns (uint8 count) {
        if (source.orbitType == FreedomPlusConfig.OrbitType.P4
            || source.orbitType == FreedomPlusConfig.OrbitType.P3) {
            components[0] = Component(1, 9_000, orbitOwner, orbitOwner);
            return 1;
        }

        address parentOutsideOwner = source.orbit.currentStructuralParentOf(orbitOwner, level);
        if (source.orbitType == FreedomPlusConfig.OrbitType.P12
            || source.orbitType == FreedomPlusConfig.OrbitType.P6) {
            if (source.ring == 1) {
                components[0] = Component(1, 4_000, orbitOwner, orbitOwner);
                components[1] = Component(2, 5_000, parentOutsideOwner, orbitOwner);
            } else {
                components[0] = Component(1, 4_000, source.parent, source.parent);
                components[1] = Component(2, 5_000, orbitOwner, orbitOwner);
            }
            return 2;
        }

        uint16 firstBps = source.orbitType == FreedomPlusConfig.OrbitType.P14 ? 1_500 : 2_000;
        uint16 secondBps = source.orbitType == FreedomPlusConfig.OrbitType.P14 ? 2_500 : 2_000;
        if (source.ring == 1) {
            components[0] = Component(1, firstBps, orbitOwner, orbitOwner);
            components[1] = Component(2, secondBps, parentOutsideOwner, orbitOwner);
            components[2] = Component(
                3,
                5_000,
                source.orbit.currentStructuralParentOf(parentOutsideOwner, level),
                parentOutsideOwner
            );
        } else if (source.ring == 2) {
            components[0] = Component(1, firstBps, source.parent, source.parent);
            components[1] = Component(2, secondBps, orbitOwner, orbitOwner);
            components[2] = Component(3, 5_000, parentOutsideOwner, source.parent);
        } else {
            uint8 parentSlot = FreedomPlusConfig.parentPosition(source.orbitType, source.position);
            uint8 grandparentSlot = FreedomPlusConfig.parentPosition(source.orbitType, parentSlot);
            address grandparent = source.orbit
                .positionAt(orbitOwner, level, source.cycle, grandparentSlot)
                .participant;
            components[0] = Component(1, firstBps, source.parent, source.parent);
            components[1] = Component(2, secondBps, grandparent, grandparent);
            components[2] = Component(3, 5_000, orbitOwner, orbitOwner);
        }
        return 3;
    }

    function _settleComponent(
        address participant,
        uint8 level,
        bytes32 activationId,
        SourcePlacement memory source,
        Component memory component,
        uint256 amount
    ) internal {
        address recipient = _resolveRecipient(component.candidate, participant, level);
        bool fallbackToId1 = recipient == id1Wallet
            && (component.candidate != id1Wallet || component.candidate == participant);
        bytes32 placementId;

        if (
            recipient != id1Wallet
                && recipient != address(0)
                && recipient != source.orbitOwner
        ) {
            placementId = keccak256(abi.encode(activationId, "COMPONENT", component.role));
            address anchor = recipient == component.candidate ? component.anchor : recipient;
            source.orbit.recordPosition(
                recipient,
                participant,
                anchor,
                level,
                activationId,
                placementId,
                amount,
                IFreedomPlusOrbit.PlacementKind.RoutedPayment,
                true
            );
        }

        usdt.safeTransfer(recipient, amount);
        emit ComponentSettled(
            activationId,
            component.role,
            recipient,
            component.candidate,
            level,
            component.bps,
            amount,
            fallbackToId1,
            placementId
        );
    }

    function _resolveRecipient(address candidate, address participant, uint8 level)
        internal view returns (address)
    {
        if (candidate == participant || candidate == address(0)) return id1Wallet;
        address cursor = candidate;
        for (uint16 depth = 0; depth < MAX_UPLINE_SEARCH; depth++) {
            if (cursor == participant) return id1Wallet;
            if (cursor == id1Wallet) return id1Wallet;
            if (registration.isRegistered(cursor) && registration.isLevelActive(cursor, level)) {
                return cursor;
            }
            cursor = registration.sponsorOf(cursor);
            if (cursor == address(0)) return id1Wallet;
        }
        revert UplineSearchLimitReached(candidate, level);
    }

    function _settleSystemCharge(bytes32 activationId, uint8 level, uint256 charge) internal {
        uint256 nftAmount = charge * NFT_POOL_SHARE_BPS / BPS;
        uint256 operationsAmount = charge - nftAmount;
        usdt.safeTransfer(nftPoolVault, nftAmount);
        usdt.safeTransfer(operationsVault, operationsAmount);
        emit SystemChargeSettled(activationId, level, charge, nftAmount, operationsAmount);
    }

    function _isRecycleWindow(SourcePlacement memory source, uint8 level)
        internal view returns (bool)
    {
        if (source.orbitType == FreedomPlusConfig.OrbitType.P4) return source.position == 4;
        if (source.orbitType == FreedomPlusConfig.OrbitType.P3) return source.position == 3;
        uint8 finalRing = FreedomPlusConfig.ringCount(source.orbitType);
        if (source.ring != finalRing) return false;
        uint8 arrival = source.orbit.ringFilledCount(
            source.orbitOwner,
            level,
            source.cycle,
            finalRing
        );
        return arrival >= FreedomPlusConfig.firstRecycleQualifyingArrival(source.orbitType);
    }

    function setGuardian(address guardian_) external onlyOwner {
        _requireContract(guardian_);
        address previous = guardian;
        guardian = guardian_;
        emit GuardianUpdated(previous, guardian_);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function _requireContract(address target) internal view {
        if (target == address(0) || target.code.length == 0) revert InvalidContract(target);
    }

    uint256[40] private __gap;
}
