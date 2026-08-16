// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../freedom-plus/libraries/FreedomPlusConfig.sol";

contract FreedomPlusConfigHarness {
    function levelConfig(uint8 level)
        external
        pure
        returns (
            FreedomPlusConfig.OrbitType orbitType,
            uint256 price,
            uint256 fptReward,
            uint256 fptrReward
        )
    {
        FreedomPlusConfig.LevelConfig memory config = FreedomPlusConfig.levelConfig(level);
        return (config.orbitType, config.price, config.fptReward, config.fptrReward);
    }

    function positionCount(FreedomPlusConfig.OrbitType orbitType) external pure returns (uint8) {
        return FreedomPlusConfig.positionCount(orbitType);
    }

    function ringCount(FreedomPlusConfig.OrbitType orbitType) external pure returns (uint8) {
        return FreedomPlusConfig.ringCount(orbitType);
    }

    function ringForPosition(FreedomPlusConfig.OrbitType orbitType, uint8 position)
        external
        pure
        returns (uint8)
    {
        return FreedomPlusConfig.ringForPosition(orbitType, position);
    }

    function parentPosition(FreedomPlusConfig.OrbitType orbitType, uint8 position)
        external
        pure
        returns (uint8)
    {
        return FreedomPlusConfig.parentPosition(orbitType, position);
    }

    function payoutBps(FreedomPlusConfig.OrbitType orbitType, uint8 ring)
        external
        pure
        returns (uint16)
    {
        return FreedomPlusConfig.payoutBps(orbitType, ring);
    }

    function systemChargeBps() external pure returns (uint16) {
        return FreedomPlusConfig.systemChargeBps();
    }

    function isRecycleOnlyPosition(FreedomPlusConfig.OrbitType orbitType, uint8 position)
        external
        pure
        returns (bool)
    {
        return FreedomPlusConfig.isRecycleOnlyPosition(orbitType, position);
    }

    function firstRecycleQualifyingArrival(FreedomPlusConfig.OrbitType orbitType)
        external
        pure
        returns (uint8)
    {
        return FreedomPlusConfig.firstRecycleQualifyingArrival(orbitType);
    }
}
