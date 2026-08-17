// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IFreedomPlusRegistrationView {
    function isRegistered(address participant) external view returns (bool);
    function sponsorOf(address participant) external view returns (address);
    function isLevelActive(address participant, uint8 level) external view returns (bool);
}
