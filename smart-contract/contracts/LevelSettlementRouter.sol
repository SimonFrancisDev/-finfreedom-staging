// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./interfaces/ILevelSettlementRouter.sol";
import "./interfaces/IRegistration.sol";

interface ISettlementOrbitDetailed {
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
            uint256 mirrorEscrowLockAmount
        );
}

interface ISettlementOrbitEarnings {
    function recordExternalEarning(address user, uint8 level, uint256 amount) external;
}

contract LevelSettlementRouter is ILevelSettlementRouter {
    using SafeERC20 for IERC20;

    error OnlyLevelManager();
    error OnlyDelegateCall();
    error InvalidConfig();
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

    modifier onlyDelegateCall() {
        if (address(this) == self) revert OnlyDelegateCall();
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
    ) external onlyDelegateCall returns (uint8 mirroredPosition, uint32 mirroredCycle, uint256 liquidAmount, uint256 escrowLocked) {
        if (recipient == address(0) || routedAmount == 0) return (0, 0, 0, 0);
        if (recipient == sponsor) return (0, 0, routedAmount, 0);

        uint256 mirrorOwnerLiquid;
        (mirroredPosition, mirroredCycle, mirrorOwnerLiquid, escrowLocked) = _mirrorFill(
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
        liquidAmount = mirrorOwnerLiquid > 0
            ? mirrorOwnerLiquid
            : (routedAmount >= escrowLocked ? routedAmount - escrowLocked : 0);
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
    ) internal returns (address upline, uint8 mirroredPosition, uint32 mirroredCycle, uint256 recycleEscrowLocked, bool fallbackToId1) {
        upline = IRegistration(registration).getReferrer(orbitOwner);
        uint8 depth = 0;
        while (upline != address(0) && !IRegistration(registration).isLevelActivated(upline, level)) {
            if (depth >= MAX_UPLINE_SEARCH_DEPTH) revert UplineSearchTooDeep(orbitOwner, level);
            upline = IRegistration(registration).getReferrer(upline);
            unchecked {
                ++depth;
            }
        }

        if (upline == address(0)) {
            upline = id1Wallet;
            fallbackToId1 = true;
        }

        if (upline != address(0)) {
            uint256 mirrorOwnerLiquid;
            (mirroredPosition, mirroredCycle, mirrorOwnerLiquid, recycleEscrowLocked) = _mirrorFill(
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
        }
    }

    function settleRecycle(
        uint8 orbitType,
        address registration,
        address p4Orbit,
        address p12Orbit,
        address p39Orbit,
        address id1Wallet,
        address orbitOwner,
        uint8 level,
        uint256 amount,
        uint256 activationId,
        address fromUser,
        uint8 sourcePosition,
        uint32 sourceCycle,
        address[] calldata founderWallets,
        uint256[] calldata founderRatios
    )
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
        if (amount == 0) {
            emit PayoutNotDelivered(
                orbitOwner,
                fromUser,
                level,
                orbitType,
                sourcePosition,
                sourceCycle,
                0,
                address(0),
                0,
                RECEIPT_RECYCLE,
                ROLE_RECYCLE_CODE,
                REASON_ZERO_AMOUNT,
                ACTION_NO_ACTION,
                activationId
            );
            return (address(0), 0, 0, 0, 0);
        }

        if (orbitOwner == id1Wallet) {
            _distributeFounders(amount, activationId, fromUser, level, founderWallets, founderRatios, REASON_FOUNDER_ROUTE);
            _recordExternalEarning(orbitType, p4Orbit, p12Orbit, p39Orbit, id1Wallet, level, amount);
            _emitRecycleReceipt(id1Wallet, activationId, level, fromUser, orbitOwner, sourcePosition, sourceCycle, 0, 0, amount, 0, amount);
            emit RecycleCompletedDetailed(activationId, orbitOwner, level, fromUser, sourcePosition, sourceCycle, id1Wallet, amount, amount, 0, 0, 0, false);
            return (id1Wallet, amount, 0, 0, 0);
        }

        bool fallbackToId1;
        (recycleReceiver, mirrorPosition, mirrorCycle, recycleEscrowLocked, fallbackToId1) = _resolveRecycleMirror(
            orbitType,
            registration,
            p4Orbit,
            p12Orbit,
            p39Orbit,
            id1Wallet,
            orbitOwner,
            level,
            amount,
            activationId
        );

        if (fallbackToId1) {
            emit PayoutNotDelivered(
                orbitOwner,
                fromUser,
                level,
                orbitType,
                sourcePosition,
                sourceCycle,
                amount,
                id1Wallet,
                amount,
                RECEIPT_RECYCLE,
                ROLE_RECYCLE_CODE,
                REASON_RECYCLE_FALLBACK,
                ACTION_ACTIVATE_LEVEL,
                activationId
            );
        }

        recycleLiquidPaid = amount >= recycleEscrowLocked ? amount - recycleEscrowLocked : 0;
        if (recycleReceiver == id1Wallet) {
            _distributeFounders(recycleLiquidPaid, activationId, fromUser, level, founderWallets, founderRatios, REASON_FOUNDER_ROUTE);
        } else if (recycleReceiver != address(0) && recycleLiquidPaid > 0) {
            usdt.safeTransfer(recycleReceiver, recycleLiquidPaid);
        }

        _recordExternalEarning(orbitType, p4Orbit, p12Orbit, p39Orbit, recycleReceiver, level, amount);

        if (recycleEscrowLocked > 0) {
            emit PayoutNotDelivered(
                recycleReceiver,
                fromUser,
                level,
                orbitType,
                sourcePosition,
                sourceCycle,
                amount,
                recycleReceiver,
                recycleLiquidPaid,
                RECEIPT_RECYCLE,
                ROLE_RECYCLE_CODE,
                REASON_ESCROW_INSTEAD_OF_LIQUID,
                ACTION_NO_ACTION,
                activationId
            );
        }

        _emitRecycleReceipt(
            recycleReceiver,
            activationId,
            level,
            fromUser,
            orbitOwner,
            sourcePosition,
            sourceCycle,
            mirrorPosition,
            mirrorCycle,
            amount,
            recycleEscrowLocked,
            recycleLiquidPaid
        );
        emit RecycleCompletedDetailed(
            activationId,
            orbitOwner,
            level,
            fromUser,
            sourcePosition,
            sourceCycle,
            recycleReceiver,
            amount,
            recycleLiquidPaid,
            recycleEscrowLocked,
            mirrorPosition,
            mirrorCycle,
            false
        );
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
            uint256 mirrorEscrowAmount
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
        address[] calldata wallets,
        uint256[] calldata ratios,
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
