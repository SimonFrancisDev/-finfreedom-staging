// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./interfaces/ILevelSettlementRouter.sol";
import "./interfaces/IRegistration.sol";

interface ISettlementOrbitDetailed {
    function fillPositionDetailed(
        address orbitOwner,
        uint8 level,
        address newUser,
        address referrer,
        uint256 amount,
        uint256 activationId
    ) external returns (
        uint8 sourcePosition,
        uint32 sourceCycle,
        uint256 toOwner,
        uint256 toSpillover1,
        address spillover1Recipient,
        uint256 toSpillover2,
        address spillover2Recipient,
        uint256 toEscrow,
        uint256 toRecycle
    );

    function getPosition(address orbitOwner, uint8 level, uint8 position)
        external
        view
        returns (address occupant, uint256 amount, uint256 timestamp, address referrer, bool isActive);

    function getHistoricalPosition(address orbitOwner, uint8 level, uint256 cycleNumber, uint8 position)
        external
        view
        returns (address occupant, uint256 amount, uint256 timestamp, address referrer, bool isActive);

    function mirrorPositionDetailed(
        address orbitOwner,
        uint8 level,
        address newUser,
        address referrer,
        uint256 amount,
        uint256 ruleBaseAmount,
        uint256 activationId
    )
        external
        returns (
            uint8 position,
            uint32 cycleNumber,
            uint256 mirrorOwnerLiquidAmount,
            uint256 mirrorEscrowLockAmount,
            uint256 mirrorRecycleAmount
        );

    function recyclePositionDetailed(
        address orbitOwner,
        uint8 level,
        address newUser,
        uint256 amount,
        uint256 ruleBaseAmount,
        uint256 activationId
    )
        external
        returns (
            uint8 sourcePosition,
            uint32 sourceCycle,
            uint256 toOwner,
            uint256 toSpillover1,
            address spillover1Recipient,
            uint256 toSpillover2,
            address spillover2Recipient,
            uint256 toEscrow,
            uint256 toRecycle
        );
}

interface ISettlementOrbitEarnings {
    function recordExternalEarning(address user, uint8 level, uint256 amount) external;
}

interface ISettlementMatrixParent {
    function matrixParentOf(address user, uint8 level) external view returns (address);
}

interface ISettlementChargeRecipients {
    function nftPool() external view returns (address);
    function operationsWallet() external view returns (address);
}

interface ISettlementManagerCallbacks {
    function lockRecycleEscrow(address beneficiary, uint8 level, uint256 amount) external;
    function settlementRevision() external pure returns (uint256);
}

contract LevelSettlementRouter is ILevelSettlementRouter {
    using SafeERC20 for IERC20;

    error OnlyLevelManager();
    error OnlyDelegateCall();
    error InvalidConfig();
    error InvalidStructuralParent(address user, address orbitOwner, address parent, uint8 level, uint8 position);
    error UplineSearchTooDeep(address startUser, uint8 level);

    IERC20 public immutable usdt;
    address public immutable levelManager;
    address private immutable self;

    bytes32 internal constant REASON_FOUNDER_DUST = "FOUNDER_DUST_ASSIGNED";
    bytes32 internal constant REASON_ZERO_AMOUNT = "ZERO_AMOUNT";
    bytes32 internal constant REASON_RECYCLE_FALLBACK = "RECYCLE_FALLBACK_ID1";
    bytes32 internal constant REASON_ESCROW_INSTEAD_OF_LIQUID = "ESCROW_INSTEAD_OF_LIQUID";
    bytes32 internal constant REASON_FOUNDER_ROUTE = "FOUNDER_ROUTE";
    bytes32 internal constant ACTION_NO_ACTION = "NO_ACTION";
    bytes32 internal constant ACTION_ACTIVATE_LEVEL = "ACTIVATE_LEVEL";
    bytes32 internal constant ROLE_RECYCLE_CODE = "RECYCLE";
    uint8 internal constant RECEIPT_RECYCLE = 4;
    uint8 internal constant ROUTED_ROLE_RECYCLE = 4;
    uint8 internal constant MAX_UPLINE_SEARCH_DEPTH = 64;
    bytes32 internal constant RECYCLE_RESERVE_STORAGE_SLOT = keccak256("ffreedom.levelSettlementRouter.recycleReserve.v1");
    bytes32 internal constant LEGACY_RECYCLE_BYPASS_STORAGE_SLOT = keccak256("ffreedom.levelSettlementRouter.legacyRecycleBypass.v1");
    bytes32 internal constant LEGACY_RECYCLE_MIGRATION_STORAGE_SLOT = keccak256("ffreedom.levelManager.legacyRecycleMigration.v1");

    struct LegacyRecycleMigrationLayout {
        mapping(bytes32 => bool) transitions;
        bool configured;
    }

    struct StructuredRecycleInput {
        uint8 orbitType;
        address registration;
        address p12Orbit;
        address p39Orbit;
        address id1Wallet;
        address orbitOwner;
        uint8 level;
        uint256 amount;
        uint256 activationId;
        address fromUser;
        uint8 sourcePosition;
        uint32 sourceCycle;
        bool systemChargeAlreadyPaid;
        address[] founderWallets;
        uint256[] founderRatios;
        uint8 depth;
    }

    struct RecycleComponent {
        address receiver;
        uint8 position;
        uint32 cycle;
        uint256 liquid;
        uint256 escrow;
        uint256 reserve;
    }

    struct RecyclePlacement {
        uint8 position;
        uint32 cycle;
        uint256 owner;
        uint256 spillover1;
        address recipient1;
        uint256 spillover2;
        address recipient2;
        uint256 escrow;
        uint256 reserve;
    }

    struct RecycleOutcome {
        address receiver;
        uint256 liquid;
        uint256 escrow;
        uint8 position;
        uint32 cycle;
    }

    struct P4RecycleInput {
        address registration;
        address p4Orbit;
        address p12Orbit;
        address p39Orbit;
        address id1Wallet;
        address orbitOwner;
        uint8 level;
        uint256 amount;
        uint256 activationId;
        address fromUser;
        uint8 sourcePosition;
        uint32 sourceCycle;
        address[] founderWallets;
        uint256[] founderRatios;
        uint8 depth;
    }

    struct RecycleReserve {
        uint256 amount;
        uint8 fills;
    }

    struct RecycleReserveLayout {
        mapping(bytes32 => RecycleReserve) reserves;
    }

    event PayoutReceiptRecorded(
        address indexed receiver,
        uint8 indexed level,
        uint8 indexed receiptType,
        address fromUser,
        address orbitOwner,
        uint256 grossAmount,
        uint256 escrowLocked,
        uint256 liquidPaid
    );

    event DetailedPayoutReceiptRecorded(
        address indexed receiver,
        uint256 indexed activationId,
        uint8 indexed level,
        uint8 receiptType,
        address fromUser,
        address orbitOwner,
        uint8 sourcePosition,
        uint32 sourceCycle,
        uint8 mirroredPosition,
        uint32 mirroredCycle,
        uint8 routedRole,
        uint256 grossAmount,
        uint256 escrowLocked,
        uint256 liquidPaid
    );

    event PayoutNotDelivered(
        address indexed affectedUser,
        address indexed sourceUser,
        uint8 indexed level,
        uint8 orbitType,
        uint8 sourcePosition,
        uint32 sourceCycle,
        uint256 expectedAmount,
        address actualReceiver,
        uint256 actualAmount,
        uint8 receiptType,
        bytes32 routedRole,
        bytes32 reasonCode,
        bytes32 actionCode,
        uint256 activationId
    );

    event SystemChargeDistributedDetailed(
        uint256 indexed activationId,
        address indexed user,
        uint8 indexed level,
        uint256 systemChargeTotal,
        uint256 nftPoolAmount,
        uint256 operationsAmount,
        address nftPool,
        address operationsWallet
    );

    event FounderDistributionDetailed(
        uint256 indexed activationId,
        address indexed sourceUser,
        uint8 indexed level,
        address founderWallet,
        uint256 amount,
        uint256 ratioBps,
        bytes32 reasonCode
    );

    event FounderIncomeDistributed(uint256 totalAmount);

    event RecycleCompletedDetailed(
        uint256 indexed activationId,
        address indexed orbitOwner,
        uint8 indexed level,
        address sourceUser,
        uint8 sourcePosition,
        uint32 sourceCycle,
        address recycleReceiver,
        uint256 recycleGross,
        uint256 recycleLiquidPaid,
        uint256 recycleEscrowLocked,
        uint8 mirrorPosition,
        uint32 mirrorCycle,
        bool triggeredOrbitReset
    );

    event RecycleReserveUpdated(
        uint256 indexed activationId,
        address indexed orbitOwner,
        uint8 indexed level,
        address sourceUser,
        uint8 sourcePosition,
        uint32 sourceCycle,
        uint256 reservedAmount,
        uint8 fills,
        uint8 requiredFills,
        bool released
    );

    event LegacyRecycleTransitionConsumed(
        uint8 indexed orbitType,
        address indexed orbitOwner,
        uint8 indexed level,
        uint32 sourceCycle
    );

    function consumeLegacyRecycleTransition(
        uint8 orbitType,
        address orbitOwner,
        uint8 level,
        uint32 sourceCycle
    ) external onlyDelegateCall returns (bool) {
        bytes32 key = keccak256(abi.encode(orbitType, orbitOwner, level, sourceCycle));
        LegacyRecycleMigrationLayout storage migration = _legacyRecycleMigrationLayout();
        if (!migration.transitions[key]) return false;

        delete migration.transitions[key];
        bytes32 bypassSlot = LEGACY_RECYCLE_BYPASS_STORAGE_SLOT;
        assembly {
            sstore(bypassSlot, 1)
        }
        emit LegacyRecycleTransitionConsumed(orbitType, orbitOwner, level, sourceCycle);
        return true;
    }

    event AutoUpgradeCompleted(
        uint256 indexed activationId,
        address indexed user,
        uint8 indexed fromLevel,
        uint8 toLevel,
        uint256 requiredAmount,
        uint256 usedAmount,
        uint256 escrowBefore,
        uint256 escrowAfter
    );

    modifier onlyLevelManager() {
        if (msg.sender != levelManager) revert OnlyLevelManager();
        _;
    }

    constructor(address _levelManager, address _usdt) {
        if (_levelManager == address(0) || _usdt == address(0)) revert InvalidConfig();
        levelManager = _levelManager;
        usdt = IERC20(_usdt);
        self = address(this);
    }

    function validatesConfig(address expectedLevelManager, address expectedUsdt) external view returns (bool) {
        return expectedLevelManager == levelManager && expectedUsdt == address(usdt);
    }

    function settlementRevision() external pure returns (uint256) {
        return 2;
    }

    function recordStructuralPlacement(
        address registration,
        address orbit,
        uint8 orbitType,
        address orbitOwner,
        address user,
        uint8 level,
        uint8 position,
        uint32 cycleNumber
    ) external onlyDelegateCall returns (address parent) {
        return _recordStructuralPlacement(registration, orbit, orbitType, orbitOwner, user, level, position, cycleNumber);
    }

    function fillAndRecordStructuralPosition(
        address registration,
        address orbit,
        uint8 orbitType,
        address orbitOwner,
        address user,
        address referrer,
        uint8 level,
        uint256 amount,
        uint256 activationId
    ) external onlyDelegateCall returns (
        uint8 sourcePosition,
        uint32 sourceCycle,
        uint256 toOwner,
        uint256 toSpillover1,
        address spillover1Recipient,
        uint256 toSpillover2,
        address spillover2Recipient,
        uint256 toEscrow,
        uint256 toRecycle
    ) {
        (
            sourcePosition,
            sourceCycle,
            toOwner,
            toSpillover1,
            spillover1Recipient,
            toSpillover2,
            spillover2Recipient,
            toEscrow,
            toRecycle
        ) = ISettlementOrbitDetailed(orbit).fillPositionDetailed(
            orbitOwner, level, user, referrer, amount, activationId
        );
        _recordStructuralPlacement(registration, orbit, orbitType, orbitOwner, user, level, sourcePosition, sourceCycle);
    }

    function _recordStructuralPlacement(
        address registration,
        address orbit,
        uint8 orbitType,
        address orbitOwner,
        address user,
        uint8 level,
        uint8 position,
        uint32 cycleNumber
    ) internal returns (address parent) {
        parent = orbitOwner;
        uint8 parentPosition;

        if (orbitType == 12 && position > 3) {
            parentPosition = uint8(((position - 4) % 3) + 1);
        } else if (orbitType == 39) {
            if (position > 12) parentPosition = uint8(4 + ((position - 13) % 9));
            else if (position > 3) parentPosition = uint8(((position - 4) % 3) + 1);
        }

        if (parentPosition != 0) {
            (parent, , , , ) = ISettlementOrbitDetailed(orbit).getPosition(orbitOwner, level, parentPosition);
            if (parent == address(0)) {
                (parent, , , , ) = ISettlementOrbitDetailed(orbit).getHistoricalPosition(
                    orbitOwner, level, cycleNumber, parentPosition
                );
            }
        }

        if (parent == user) parent = orbitOwner;
        if (parent == address(0) || parent == user) {
            revert InvalidStructuralParent(user, orbitOwner, parent, level, position);
        }
        IRegistration(registration).recordCurrentMatrixParent(user, level, parent);
    }

    modifier onlyDelegateCall() {
        if (address(this) == self) revert OnlyDelegateCall();
        if (ISettlementManagerCallbacks(address(this)).settlementRevision() != 2) revert InvalidConfig();
        _;
    }

    function applyMirrorEscrowSplit(
        uint8 orbitType,
        address p4Orbit,
        address p12Orbit,
        address p39Orbit,
        address recipient,
        address sponsor,
        uint8 level,
        address activatingUser,
        address referrer,
        uint256 routedAmount,
        uint256 ruleBaseAmount,
        uint256 activationId
    )
        external
        onlyDelegateCall
        returns (
            uint8 mirroredPosition,
            uint32 mirroredCycle,
            uint256 liquidAmount,
            uint256 escrowLocked,
            uint256 recycleAmount
        )
    {
        if (recipient == address(0) || routedAmount == 0) return (0, 0, 0, 0, 0);
        if (recipient == sponsor) return (0, 0, routedAmount, 0, 0);

        uint256 mirrorOwnerLiquid;
        (mirroredPosition, mirroredCycle, mirrorOwnerLiquid, escrowLocked, recycleAmount) = _mirrorFill(
            orbitType,
            p4Orbit,
            p12Orbit,
            p39Orbit,
            recipient,
            level,
            activatingUser,
            referrer,
            routedAmount,
            ruleBaseAmount,
            activationId
        );
        if (recycleAmount > 0) {
            liquidAmount = 0;
        } else if (mirrorOwnerLiquid == 0 && escrowLocked == 0) {
            liquidAmount = routedAmount;
        } else {
            liquidAmount = mirrorOwnerLiquid;
        }
    }

    function _resolveRecycleMirror(
        uint8 orbitType,
        address registration,
        address p4Orbit,
        address p12Orbit,
        address p39Orbit,
        address id1Wallet,
        address orbitOwner,
        uint8 level,
        uint256 amount,
        uint256 activationId
    ) internal returns (
        address upline,
        uint8 mirroredPosition,
        uint32 mirroredCycle,
        uint256 recycleEscrowLocked,
        uint256 mirrorRecycleAmount,
        bool fallbackToId1
    ) {
        upline = IRegistration(registration).getReferrer(orbitOwner);
        uint8 depth = 0;
        while (upline != address(0) && !IRegistration(registration).isLevelActivated(upline, level)) {
            if (depth >= MAX_UPLINE_SEARCH_DEPTH) revert UplineSearchTooDeep(orbitOwner, level);
            upline = IRegistration(registration).getReferrer(upline);
            unchecked {
                ++depth;
            }
        }

        if (upline == address(0) || upline == orbitOwner) {
            upline = id1Wallet;
        }
        fallbackToId1 = orbitOwner == id1Wallet;

        if (upline != address(0) && !fallbackToId1) {
            uint256 mirrorOwnerLiquid;
            (mirroredPosition, mirroredCycle, mirrorOwnerLiquid, recycleEscrowLocked, mirrorRecycleAmount) = _mirrorFill(
                orbitType,
                p4Orbit,
                p12Orbit,
                p39Orbit,
                upline,
                level,
                orbitOwner,
                orbitOwner,
                amount,
                amount,
                activationId
            );
            mirrorOwnerLiquid;
            _recordStructuralPlacement(
                registration,
                orbitType == 4 ? p4Orbit : orbitType == 12 ? p12Orbit : p39Orbit,
                orbitType, upline, orbitOwner, level, mirroredPosition, mirroredCycle
            );
        }
    }

    function settleRecycle(RecycleInput calldata request)
        external
        onlyDelegateCall
        returns (
            address recycleReceiver,
            uint256 recycleLiquidPaid,
            uint256 recycleEscrowLocked,
            uint8 mirrorPosition,
            uint32 mirrorCycle
        )
    {
        if (request.amount == 0) {
            emit PayoutNotDelivered(
                request.orbitOwner,
                request.fromUser,
                request.level,
                request.orbitType,
                request.sourcePosition,
                request.sourceCycle,
                0,
                address(0),
                0,
                RECEIPT_RECYCLE,
                ROLE_RECYCLE_CODE,
                REASON_ZERO_AMOUNT,
                ACTION_NO_ACTION,
                request.activationId
            );
            return (address(0), 0, 0, 0, 0);
        }

        if (request.orbitType == 12 || request.orbitType == 39) {
            StructuredRecycleInput memory input;
            input.orbitType = request.orbitType;
            input.registration = request.registration;
            input.p12Orbit = request.p12Orbit;
            input.p39Orbit = request.p39Orbit;
            input.id1Wallet = request.id1Wallet;
            input.orbitOwner = request.orbitOwner;
            input.level = request.level;
            input.amount = request.amount;
            input.activationId = request.activationId;
            input.fromUser = request.fromUser;
            input.sourcePosition = request.sourcePosition;
            input.sourceCycle = request.sourceCycle;
            input.founderWallets = request.founderWallets;
            input.founderRatios = request.founderRatios;
            input.systemChargeAlreadyPaid = _consumeLegacyRecycleBypass();
            if (!input.systemChargeAlreadyPaid) {
                (bool ready, uint256 total) = _reserveStructuredRecycle(
                    request.orbitOwner, request.level, request.amount, request.activationId,
                    request.fromUser, request.sourcePosition, request.sourceCycle
                );
                if (!ready) return (address(0), 0, 0, 0, 0);
                input.amount = total;
            }
            RecycleOutcome memory result = _settleStructuredRecycle(input);
            return (result.receiver, result.liquid, result.escrow, result.position, result.cycle);
        }

        P4RecycleInput memory p4Input;
        p4Input.registration = request.registration;
        p4Input.p4Orbit = request.p4Orbit;
        p4Input.p12Orbit = request.p12Orbit;
        p4Input.p39Orbit = request.p39Orbit;
        p4Input.id1Wallet = request.id1Wallet;
        p4Input.orbitOwner = request.orbitOwner;
        p4Input.level = request.level;
        p4Input.amount = request.amount;
        p4Input.activationId = request.activationId;
        p4Input.fromUser = request.fromUser;
        p4Input.sourcePosition = request.sourcePosition;
        p4Input.sourceCycle = request.sourceCycle;
        p4Input.founderWallets = request.founderWallets;
        p4Input.founderRatios = request.founderRatios;
        return _settleP4Recycle(p4Input);
    }

    function _settleP4Recycle(
        P4RecycleInput memory input
    ) internal returns (
        address recycleReceiver,
        uint256 recycleLiquidPaid,
        uint256 recycleEscrowLocked,
        uint8 mirrorPosition,
        uint32 mirrorCycle
    ) {
        if (input.depth >= MAX_UPLINE_SEARCH_DEPTH) {
            revert UplineSearchTooDeep(input.orbitOwner, input.level);
        }

        if (input.orbitOwner == input.id1Wallet) {
            _distributeFounders(
                input.amount,
                input.activationId,
                input.fromUser,
                input.level,
                input.founderWallets,
                input.founderRatios,
                REASON_FOUNDER_ROUTE
            );
            _recordExternalEarning(4, input.p4Orbit, input.p12Orbit, input.p39Orbit, input.id1Wallet, input.level, input.amount);
            _emitRecycleReceipt(
                input.id1Wallet,
                input.activationId,
                input.level,
                input.fromUser,
                input.orbitOwner,
                input.sourcePosition,
                input.sourceCycle,
                0,
                0,
                input.amount,
                0,
                input.amount
            );
            emit RecycleCompletedDetailed(
                input.activationId,
                input.orbitOwner,
                input.level,
                input.fromUser,
                input.sourcePosition,
                input.sourceCycle,
                input.id1Wallet,
                input.amount,
                input.amount,
                0,
                0,
                0,
                false
            );
            return (input.id1Wallet, input.amount, 0, 0, 0);
        }

        bool fallbackToId1;
        uint256 mirrorRecycleAmount;
        (
            recycleReceiver,
            mirrorPosition,
            mirrorCycle,
            recycleEscrowLocked,
            mirrorRecycleAmount,
            fallbackToId1
        ) = _resolveRecycleMirror(
            4,
            input.registration,
            input.p4Orbit,
            input.p12Orbit,
            input.p39Orbit,
            input.id1Wallet,
            input.orbitOwner,
            input.level,
            input.amount,
            input.activationId
        );

        if (fallbackToId1) {
            emit PayoutNotDelivered(
                input.orbitOwner,
                input.fromUser,
                input.level,
                4,
                input.sourcePosition,
                input.sourceCycle,
                input.amount,
                input.id1Wallet,
                input.amount,
                RECEIPT_RECYCLE,
                ROLE_RECYCLE_CODE,
                REASON_RECYCLE_FALLBACK,
                ACTION_ACTIVATE_LEVEL,
                input.activationId
            );
        }

        recycleLiquidPaid = mirrorRecycleAmount > 0
            ? 0
            : input.amount >= recycleEscrowLocked ? input.amount - recycleEscrowLocked : 0;

        if (recycleReceiver == input.id1Wallet && recycleLiquidPaid > 0) {
            _distributeFounders(
                recycleLiquidPaid,
                input.activationId,
                input.fromUser,
                input.level,
                input.founderWallets,
                input.founderRatios,
                REASON_FOUNDER_ROUTE
            );
        } else if (recycleReceiver != address(0) && recycleLiquidPaid > 0) {
            usdt.safeTransfer(recycleReceiver, recycleLiquidPaid);
        }

        _recordExternalEarning(
            4,
            input.p4Orbit,
            input.p12Orbit,
            input.p39Orbit,
            recycleReceiver,
            input.level,
            recycleLiquidPaid + recycleEscrowLocked
        );

        if (recycleEscrowLocked > 0) {
            ISettlementManagerCallbacks(address(this)).lockRecycleEscrow(
                recycleReceiver, input.level, recycleEscrowLocked
            );
            emit PayoutNotDelivered(
                recycleReceiver,
                input.fromUser,
                input.level,
                4,
                input.sourcePosition,
                input.sourceCycle,
                input.amount,
                recycleReceiver,
                recycleLiquidPaid,
                RECEIPT_RECYCLE,
                ROLE_RECYCLE_CODE,
                REASON_ESCROW_INSTEAD_OF_LIQUID,
                ACTION_NO_ACTION,
                input.activationId
            );
        }

        _emitRecycleReceipt(
            recycleReceiver,
            input.activationId,
            input.level,
            input.fromUser,
            input.orbitOwner,
            input.sourcePosition,
            input.sourceCycle,
            mirrorPosition,
            mirrorCycle,
            input.amount,
            recycleEscrowLocked,
            recycleLiquidPaid
        );
        emit RecycleCompletedDetailed(
            input.activationId,
            input.orbitOwner,
            input.level,
            input.fromUser,
            input.sourcePosition,
            input.sourceCycle,
            recycleReceiver,
            input.amount,
            recycleLiquidPaid,
            recycleEscrowLocked,
            mirrorPosition,
            mirrorCycle,
            false
        );

        if (mirrorRecycleAmount > 0) {
            P4RecycleInput memory nested = P4RecycleInput({
                registration: input.registration,
                p4Orbit: input.p4Orbit,
                p12Orbit: input.p12Orbit,
                p39Orbit: input.p39Orbit,
                id1Wallet: input.id1Wallet,
                orbitOwner: recycleReceiver,
                level: input.level,
                amount: mirrorRecycleAmount,
                activationId: input.activationId,
                fromUser: input.orbitOwner,
                sourcePosition: mirrorPosition,
                sourceCycle: mirrorCycle,
                founderWallets: input.founderWallets,
                founderRatios: input.founderRatios,
                depth: input.depth + 1
            });
            (, uint256 nestedLiquid, uint256 nestedEscrow, , ) = _settleP4Recycle(nested);
            recycleLiquidPaid += nestedLiquid;
            recycleEscrowLocked += nestedEscrow;
        }
    }

    function _recordExternalEarning(
        uint8 orbitType,
        address p4Orbit,
        address p12Orbit,
        address p39Orbit,
        address recipient,
        uint8 level,
        uint256 amount
    ) internal {
        if (recipient == address(0) || amount == 0) return;
        if (orbitType == 4) ISettlementOrbitEarnings(p4Orbit).recordExternalEarning(recipient, level, amount);
        else if (orbitType == 12) ISettlementOrbitEarnings(p12Orbit).recordExternalEarning(recipient, level, amount);
        else if (orbitType == 39) ISettlementOrbitEarnings(p39Orbit).recordExternalEarning(recipient, level, amount);
        else revert InvalidConfig();
    }

    function _settleStructuredRecycle(
        StructuredRecycleInput memory input
    )
        internal
        returns (RecycleOutcome memory result)
    {
        if (input.depth >= MAX_UPLINE_SEARCH_DEPTH) {
            revert UplineSearchTooDeep(input.orbitOwner, input.level);
        }
        bool fallbackToId1;
        (result.receiver, fallbackToId1) = _resolveActiveUpline(
            input.registration,
            input.id1Wallet,
            input.orbitOwner,
            input.level
        );
        uint256 ruleBaseAmount = input.systemChargeAlreadyPaid
            ? (input.amount * 100) / 90
            : input.amount;
        uint256 systemCharge = input.systemChargeAlreadyPaid
            ? 0
            : (input.amount * 10) / 100;
        uint256 nftPoolAmount = (systemCharge * 80) / 100;
        uint256 operationsAmount = systemCharge - nftPoolAmount;
        ISettlementChargeRecipients chargeRecipients = ISettlementChargeRecipients(address(this));
        address nftPool = chargeRecipients.nftPool();
        address operationsWallet = chargeRecipients.operationsWallet();

        if (nftPoolAmount > 0) {
            usdt.safeTransfer(nftPool, nftPoolAmount);
        }
        if (operationsAmount > 0) {
            usdt.safeTransfer(operationsWallet, operationsAmount);
        }
        if (systemCharge > 0) {
            emit SystemChargeDistributedDetailed(
                input.activationId,
                input.fromUser,
                input.level,
                systemCharge,
                nftPoolAmount,
                operationsAmount,
                nftPool,
                operationsWallet
            );
        }

        if (fallbackToId1) {
            uint256 founderAmount = input.amount - systemCharge;
            _distributeFounders(
                founderAmount,
                input.activationId,
                input.fromUser,
                input.level,
                input.founderWallets,
                input.founderRatios,
                REASON_RECYCLE_FALLBACK
            );
            _recordExternalEarning(input.orbitType, address(0), input.p12Orbit, input.p39Orbit, input.id1Wallet, input.level, founderAmount);
            _emitRecycleReceipt(
                input.id1Wallet,
                input.activationId,
                input.level,
                input.fromUser,
                input.orbitOwner,
                input.sourcePosition,
                input.sourceCycle,
                0,
                0,
                founderAmount,
                0,
                founderAmount
            );
            emit PayoutNotDelivered(
                input.orbitOwner,
                input.fromUser,
                input.level,
                input.orbitType,
                input.sourcePosition,
                input.sourceCycle,
                founderAmount,
                input.id1Wallet,
                founderAmount,
                RECEIPT_RECYCLE,
                ROLE_RECYCLE_CODE,
                REASON_RECYCLE_FALLBACK,
                ACTION_NO_ACTION,
                input.activationId
            );
            emit RecycleCompletedDetailed(
                input.activationId,
                input.orbitOwner,
                input.level,
                input.fromUser,
                input.sourcePosition,
                input.sourceCycle,
                input.id1Wallet,
                input.amount,
                founderAmount,
                0,
                0,
                0,
                true
            );
            return RecycleOutcome(input.id1Wallet, founderAmount, 0, 0, 0);
        }

        RecyclePlacement memory placement = _placeStructuredRecycle(input, result.receiver, ruleBaseAmount);
        result.position = placement.position;
        result.cycle = placement.cycle;

        uint256 ownerGross = placement.owner + placement.escrow;
        if (ownerGross > 0) {
            result.liquid += _payStructuredRecycleComponent(
                input,
                result.receiver,
                ownerGross,
                placement.escrow,
                0,
                result.position,
                result.cycle,
                false
            );
            result.escrow += placement.escrow;
        }

        address routedParent = result.position > 3 && placement.recipient1 != address(0)
            ? placement.recipient1
            : result.receiver;
        RecycleComponent memory componentA = _prepareRecyclePayout(
            input, placement.recipient1, placement.spillover1, ruleBaseAmount, routedParent,
            result.receiver == input.id1Wallet
        );
        RecycleComponent memory componentB = _prepareRecyclePayout(
            input, placement.recipient2, placement.spillover2, ruleBaseAmount, routedParent,
            result.receiver == input.id1Wallet ||
                (componentA.receiver == input.id1Wallet && componentA.position != 0)
        );
        result.liquid += _payStructuredRecycleComponent(
            input,
            componentA.receiver,
            placement.spillover1,
            componentA.escrow,
            componentA.reserve,
            componentA.position,
            componentA.cycle,
            true
        );
        result.liquid += _payStructuredRecycleComponent(
            input,
            componentB.receiver,
            placement.spillover2,
            componentB.escrow,
            componentB.reserve,
            componentB.position,
            componentB.cycle,
            true
        );
        result.escrow += componentA.escrow + componentB.escrow;

        (uint256 nestedLiquid, uint256 nestedEscrow) = _settleNestedRecycleReserve(
            input, componentA.receiver, componentA.reserve, componentA.position, componentA.cycle
        );
        result.liquid += nestedLiquid;
        result.escrow += nestedEscrow;
        (nestedLiquid, nestedEscrow) = _settleNestedRecycleReserve(
            input, componentB.receiver, componentB.reserve, componentB.position, componentB.cycle
        );
        result.liquid += nestedLiquid;
        result.escrow += nestedEscrow;
        (nestedLiquid, nestedEscrow) = _settleNestedRecycleReserve(
            input, result.receiver, placement.reserve, result.position, result.cycle
        );
        result.liquid += nestedLiquid;
        result.escrow += nestedEscrow;

        emit RecycleCompletedDetailed(
            input.activationId,
            input.orbitOwner,
            input.level,
            input.fromUser,
            input.sourcePosition,
            input.sourceCycle,
            result.receiver,
            input.amount,
            result.liquid,
            result.escrow,
            result.position,
            result.cycle,
            false
        );
    }

    function _placeStructuredRecycle(
        StructuredRecycleInput memory input,
        address receiver,
        uint256 ruleBaseAmount
    ) internal returns (RecyclePlacement memory placement) {
        address orbitAddress = input.orbitType == 12 ? input.p12Orbit : input.p39Orbit;
        (
            placement.position,
            placement.cycle,
            placement.owner,
            placement.spillover1,
            placement.recipient1,
            placement.spillover2,
            placement.recipient2,
            placement.escrow,
            placement.reserve
        ) = ISettlementOrbitDetailed(orbitAddress).recyclePositionDetailed(
            receiver, input.level, input.orbitOwner, input.amount, ruleBaseAmount, input.activationId
        );
        _recordStructuralPlacement(
            input.registration, orbitAddress, input.orbitType, receiver,
            input.orbitOwner, input.level, placement.position, placement.cycle
        );
    }

    function _settleNestedRecycleReserve(
        StructuredRecycleInput memory input,
        address orbitOwner,
        uint256 amount,
        uint8 position,
        uint32 cycleNumber
    ) internal returns (uint256 liquidPaid, uint256 escrowLocked) {
        if (amount == 0) return (0, 0);
        (bool ready, uint256 total) = _reserveStructuredRecycle(
            orbitOwner, input.level, amount, input.activationId,
            input.orbitOwner, position, cycleNumber
        );
        if (!ready) return (0, 0);

        // Construct a separate input: memory-to-memory assignment would alias and
        // overwrite the outer event's owner, amount and occurrence coordinates.
        RecycleOutcome memory result = _settleStructuredRecycle(StructuredRecycleInput({
            orbitType: input.orbitType,
            registration: input.registration,
            p12Orbit: input.p12Orbit,
            p39Orbit: input.p39Orbit,
            id1Wallet: input.id1Wallet,
            orbitOwner: orbitOwner,
            level: input.level,
            amount: total,
            activationId: input.activationId,
            fromUser: input.orbitOwner,
            sourcePosition: position,
            sourceCycle: cycleNumber,
            systemChargeAlreadyPaid: false,
            founderWallets: input.founderWallets,
            founderRatios: input.founderRatios,
            depth: input.depth + 1
        }));
        return (result.liquid, result.escrow);
    }

    function _normalizeRecycleRecipient(
        StructuredRecycleInput memory input,
        address receiver,
        uint256 amount
    ) internal returns (address) {
        if (receiver != input.orbitOwner || amount == 0) return receiver;

        emit PayoutNotDelivered(
            input.orbitOwner,
            input.fromUser,
            input.level,
            input.orbitType,
            input.sourcePosition,
            input.sourceCycle,
            amount,
            input.id1Wallet,
            amount,
            RECEIPT_RECYCLE,
            ROLE_RECYCLE_CODE,
            REASON_RECYCLE_FALLBACK,
            ACTION_NO_ACTION,
            input.activationId
        );
        return input.id1Wallet;
    }

    function _prepareRecyclePayout(
        StructuredRecycleInput memory input,
        address receiver,
        uint256 amount,
        uint256 ruleBaseAmount,
        address placementReferrer,
        bool id1AlreadyPlaced
    ) internal returns (RecycleComponent memory result) {
        if (receiver == address(0) || amount == 0) return result;
        bool selfFallback = receiver == input.orbitOwner && amount > 0;
        result.receiver = _normalizeRecycleRecipient(input, receiver, amount);
        if (selfFallback || (result.receiver == input.id1Wallet && id1AlreadyPlaced)) {
            result.liquid = amount;
            return result;
        }
        (
            result.position,
            result.cycle,
            result.liquid,
            result.escrow,
            result.reserve
        ) = _mirrorFill(
            input.orbitType,
            address(0),
            input.p12Orbit,
            input.p39Orbit,
            result.receiver,
            input.level,
            input.orbitOwner,
            placementReferrer,
            amount,
            ruleBaseAmount,
            input.activationId
        );
    }

    function _resolveActiveUpline(
        address registration,
        address id1Wallet,
        address orbitOwner,
        uint8 level
    ) internal view returns (address upline, bool fallbackToId1) {
        if (orbitOwner == id1Wallet) return (id1Wallet, true);
        upline = IRegistration(registration).getReferrer(orbitOwner);
        uint8 depth = 0;

        while (upline != address(0) && !IRegistration(registration).isLevelActivated(upline, level)) {
            if (depth >= MAX_UPLINE_SEARCH_DEPTH) revert UplineSearchTooDeep(orbitOwner, level);
            upline = IRegistration(registration).getReferrer(upline);
            unchecked {
                ++depth;
            }
        }

        if (upline == address(0) || upline == orbitOwner) {
            upline = id1Wallet;
        }
    }

    function _reserveStructuredRecycle(
        address orbitOwner,
        uint8 level,
        uint256 amount,
        uint256 activationId,
        address fromUser,
        uint8 sourcePosition,
        uint32 sourceCycle
    ) internal returns (bool ready, uint256 releasableAmount) {
        uint8 requiredFills = 2;
        RecycleReserveLayout storage layout = _recycleReserveLayout();
        bytes32 key = keccak256(abi.encodePacked(orbitOwner, level));
        RecycleReserve storage reserve = layout.reserves[key];

        if (reserve.fills == 0) {
            reserve.amount = amount;
            reserve.fills = 1;

            emit RecycleReserveUpdated(
                activationId,
                orbitOwner,
                level,
                fromUser,
                sourcePosition,
                sourceCycle,
                amount,
                1,
                requiredFills,
                false
            );

            return (false, 0);
        }

        releasableAmount = reserve.amount + amount;
        delete layout.reserves[key];

        emit RecycleReserveUpdated(
            activationId,
            orbitOwner,
            level,
            fromUser,
            sourcePosition,
            sourceCycle,
            releasableAmount,
            requiredFills,
            requiredFills,
            true
        );

        return (true, releasableAmount);
    }

    function _recycleReserveLayout() internal pure returns (RecycleReserveLayout storage layout) {
        bytes32 slot = RECYCLE_RESERVE_STORAGE_SLOT;
        assembly {
            layout.slot := slot
        }
    }

    function _legacyRecycleMigrationLayout() internal pure returns (LegacyRecycleMigrationLayout storage layout) {
        bytes32 slot = LEGACY_RECYCLE_MIGRATION_STORAGE_SLOT;
        assembly {
            layout.slot := slot
        }
    }

    function _consumeLegacyRecycleBypass() internal returns (bool enabled) {
        bytes32 slot = LEGACY_RECYCLE_BYPASS_STORAGE_SLOT;
        assembly {
            enabled := sload(slot)
            sstore(slot, 0)
        }
    }

    function _payStructuredRecycleComponent(
        StructuredRecycleInput memory input,
        address receiver,
        uint256 grossAmount,
        uint256 escrowLocked,
        uint256 reserved,
        uint8 mirrorPosition,
        uint32 mirrorCycle,
        bool recordEarning
    ) internal returns (uint256 liquidPaid) {
        if (receiver == address(0) || grossAmount == 0) return 0;

        liquidPaid = grossAmount - escrowLocked - reserved;
        if (escrowLocked > 0) {
            ISettlementManagerCallbacks(address(this)).lockRecycleEscrow(
                receiver, input.level, escrowLocked
            );
        }
        if (receiver == input.id1Wallet) {
            _distributeFounders(liquidPaid, input.activationId, input.fromUser, input.level, input.founderWallets, input.founderRatios, REASON_FOUNDER_ROUTE);
        } else if (liquidPaid > 0) {
            usdt.safeTransfer(receiver, liquidPaid);
        }

        if (recordEarning) {
            _recordExternalEarning(
                input.orbitType, address(0), input.p12Orbit, input.p39Orbit,
                receiver, input.level, grossAmount - reserved
            );
        }
        _emitRecycleReceipt(
            receiver,
            input.activationId,
            input.level,
            input.fromUser,
            input.orbitOwner,
            input.sourcePosition,
            input.sourceCycle,
            mirrorPosition,
            mirrorCycle,
            grossAmount,
            escrowLocked,
            liquidPaid
        );
    }

    function _emitRecycleReceipt(
        address receiver,
        uint256 activationId,
        uint8 level,
        address fromUser,
        address orbitOwner,
        uint8 sourcePosition,
        uint32 sourceCycle,
        uint8 mirroredPosition,
        uint32 mirroredCycle,
        uint256 grossAmount,
        uint256 escrowLocked,
        uint256 liquidPaid
    ) internal {
        emit PayoutReceiptRecorded(receiver, level, RECEIPT_RECYCLE, orbitOwner, orbitOwner, grossAmount, escrowLocked, liquidPaid);
        emit DetailedPayoutReceiptRecorded(
            receiver,
            activationId,
            level,
            RECEIPT_RECYCLE,
            fromUser,
            orbitOwner,
            sourcePosition,
            sourceCycle,
            mirroredPosition,
            mirroredCycle,
            ROUTED_ROLE_RECYCLE,
            grossAmount,
            escrowLocked,
            liquidPaid
        );
    }

    function _mirrorFill(
        uint8 orbitType,
        address p4Orbit,
        address p12Orbit,
        address p39Orbit,
        address orbitOwner,
        uint8 level,
        address user,
        address referrer,
        uint256 amount,
        uint256 ruleBaseAmount,
        uint256 activationId
    )
        internal
        returns (
            uint8 position,
            uint32 cycleNumber,
            uint256 mirrorOwnerLiquidAmount,
            uint256 mirrorEscrowAmount,
            uint256 mirrorRecycleAmount
        )
    {
        if (orbitType == 4) {
            return ISettlementOrbitDetailed(p4Orbit).mirrorPositionDetailed(orbitOwner, level, user, referrer, amount, ruleBaseAmount, activationId);
        }
        if (orbitType == 12) {
            return ISettlementOrbitDetailed(p12Orbit).mirrorPositionDetailed(orbitOwner, level, user, referrer, amount, ruleBaseAmount, activationId);
        }
        if (orbitType == 39) {
            return ISettlementOrbitDetailed(p39Orbit).mirrorPositionDetailed(orbitOwner, level, user, referrer, amount, ruleBaseAmount, activationId);
        }
        revert InvalidConfig();
    }

    function distributeFounders(
        uint256 amount,
        uint256 activationId,
        address sourceUser,
        uint8 level,
        address[] calldata wallets,
        uint256[] calldata ratios,
        bytes32 reasonCode
    ) external onlyDelegateCall {
        _distributeFounders(amount, activationId, sourceUser, level, wallets, ratios, reasonCode);
    }

    function _distributeFounders(
        uint256 amount,
        uint256 activationId,
        address sourceUser,
        uint8 level,
        address[] memory wallets,
        uint256[] memory ratios,
        bytes32 reasonCode
    ) internal {
        if (wallets.length != 8 || ratios.length != 8) revert InvalidConfig();
        if (amount == 0) return;

        uint256 totalSent;
        for (uint256 i; i < 8; ) {
            address wallet = wallets[i];
            if (wallet == address(0)) revert InvalidConfig();

            uint256 share = i == 7 ? amount - totalSent : (amount * ratios[i]) / 10000;
            if (share > 0) {
                usdt.safeTransfer(wallet, share);
                totalSent += share;
                uint256 expectedShare = (amount * ratios[i]) / 10000;
                emit FounderDistributionDetailed(
                    activationId,
                    sourceUser,
                    level,
                    wallet,
                    share,
                    ratios[i],
                    (i == 7 && share != expectedShare) ? REASON_FOUNDER_DUST : reasonCode
                );
            }

            unchecked {
                ++i;
            }
        }

        emit FounderIncomeDistributed(amount);
    }

}
