// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IFreedomPlusTokenController {
    function onFirstActivation(address participant, uint8 level, uint256 amount) external;
    function onGenesisActivation(address participant, uint8 level, uint256 amount) external;
    function onFundedRecycle(
        address participant,
        uint8 level,
        uint256 amount,
        bytes32 recycleActivationId
    ) external;
}
