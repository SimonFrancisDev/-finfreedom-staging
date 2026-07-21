// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ILevelSettlementRouter {
    function validatesConfig(address expectedLevelManager, address expectedUsdt) external view returns (bool);

    function recordStructuralPlacement(
        address registration,
        address orbit,
        uint8 orbitType,
        address orbitOwner,
        address user,
        uint8 level,
        uint8 position,
        uint32 cycleNumber
    ) external returns (address parent);

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

    function consumeLegacyRecycleTransition(
        uint8 orbitType,
        address orbitOwner,
        uint8 level,
        uint32 sourceCycle
    ) external returns (bool);

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
        returns (
            uint8 mirroredPosition,
            uint32 mirroredCycle,
            uint256 liquidAmount,
            uint256 escrowLocked,
            uint256 recycleAmount
        );

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
        returns (
            address recycleReceiver,
            uint256 recycleLiquidPaid,
            uint256 recycleEscrowLocked,
            uint8 mirrorPosition,
            uint32 mirrorCycle
        );

    function distributeFounders(
        uint256 amount,
        uint256 activationId,
        address sourceUser,
        uint8 level,
        address[] calldata wallets,
        uint256[] calldata ratios,
        bytes32 reasonCode
    ) external;

}
