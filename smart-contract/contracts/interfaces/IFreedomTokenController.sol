// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IFreedomTokenController {
    function onManualActivation(address user, uint8 level, uint256 levelPrice) external;
    function onAutoUpgradeActivation(address user, uint8 level, uint256 levelPrice) external;
    function onFounderFreeActivation(address user, uint8 level, uint256 levelPrice) external;
    function onRecycleCompleted(address orbitOwner, uint8 level, uint256 recycleReward) external;
}