// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './FreedomPlusSettlementRouter.sol';

/// @custom:oz-upgrades-unsafe-allow missing-initializer
contract FreedomPlusStagingReserveRepair is FreedomPlusSettlementRouter {
    using SafeERC20 for IERC20;

    error StagingRepairPrecondition();

    // Temporary Amoy migration for the one audited pre-upgrade certification cycle.
    function repairStagingP39Reserve() external onlyOwner nonReentrant {
        if (block.chainid != 80002 && block.chainid != 31337) revert StagingRepairPrecondition();
        address account = 0x8844a10391801d5b1a4273588F8c6bF1DFE06E36;
        IFreedomPlusOrbit orbit = orbitByType[uint8(FreedomPlusConfig.OrbitType.P39)];
        IFreedomPlusOrbit.CycleView memory state = orbit.cycleState(account, 1, 0);
        IFreedomPlusOrbit.Position memory arrival = orbit.positionAt(account, 1, 0, 38);
        uint256 amount = 25 * 1e6;
        if (state.filledPositions != 38 || state.closed || orbit.currentCycleOf(account, 1) != 0
            || orbit.ringFilledCount(account, 1, 0, 3) != 26
            || arrival.kind != IFreedomPlusOrbit.PlacementKind.RoutedPayment
            || !arrival.financial || arrival.amount != amount
            || recycleReserve[account][1][0] != 0 || recycleReserveConsumed[account][1][0]) {
            revert StagingRepairPrecondition();
        }
        uint256 beforeBalance = usdt.balanceOf(address(this));
        usdt.safeTransferFrom(account, address(this), amount);
        if (usdt.balanceOf(address(this)) != beforeBalance + amount) revert StagingRepairPrecondition();
        SourcePlacement memory source;
        source.orbitOwner = account;
        source.cycle = 0;
        _addRecycleReserve(source, 1, amount, 50 * 1e6);
    }
}
