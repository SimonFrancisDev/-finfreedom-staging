// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../LevelManager.sol";

contract MockLevelManagerRecycleHarness is LevelManager {
    function testHandleRecycle(
        address orbitOwner,
        uint8 level,
        uint256 amount,
        uint256 activationId,
        address fromUser,
        uint8 sourcePosition,
        uint32 sourceCycle
    ) external returns (address receiver, uint256 liquid, uint256 locked, uint8 position, uint32 cycle) {
        RecycleResult memory result = _handleRecycle(
            orbitOwner,
            level,
            amount,
            activationId,
            fromUser,
            sourcePosition,
            sourceCycle
        );
        return (
            result.actualRecycleReceiver,
            result.recycleLiquidPaid,
            result.recycleEscrowLocked,
            result.mirrorPosition,
            result.mirrorCycle
        );
    }
}
