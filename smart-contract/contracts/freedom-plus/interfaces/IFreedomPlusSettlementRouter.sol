// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IFreedomPlusSettlementRouter {
    function settlePaidActivation(
        address participant,
        address sponsor,
        uint8 level,
        uint256 price,
        bytes32 activationId
    ) external;
}
