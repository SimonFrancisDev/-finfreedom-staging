// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IGuardian {
    function validateUpgrade(address proxy, address newImplementation) external view returns (bool);
}