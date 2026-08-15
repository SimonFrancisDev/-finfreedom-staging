// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MockMigrationGuardian {
    function validateUpgrade(address, address) external pure returns (bool) {
        return true;
    }
}
