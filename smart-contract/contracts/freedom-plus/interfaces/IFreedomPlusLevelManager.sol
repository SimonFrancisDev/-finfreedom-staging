// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IFreedomPlusLevelManager {
    function activatePaidLevel(
        address participant,
        address sponsor,
        uint8 level
    ) external returns (bytes32 activationId);
}
