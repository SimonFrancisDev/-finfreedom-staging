// contracts/mocks/MockEscrow.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MockEscrow {
    mapping(address => mapping(uint8 => mapping(uint8 => uint256))) public locked;

    function lockFunds(address user, uint8 from, uint8 to, uint256 amount) external {
        locked[user][from][to] += amount;
    }

    function releaseForUpgrade(address, uint8, uint8, address) external {}

    function releaseToUser(address, uint8, uint8) external {}

    function getLockedAmount(address user, uint8 from, uint8 to) external view returns(uint256) {
        return locked[user][from][to];
    }
}