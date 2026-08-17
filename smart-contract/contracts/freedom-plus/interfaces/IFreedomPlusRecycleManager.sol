// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IFreedomPlusRecycleManager {
    function completeFundedRecycle(
        address orbitOwner,
        uint8 level,
        bytes32 recycleActivationId
    ) external;
}
