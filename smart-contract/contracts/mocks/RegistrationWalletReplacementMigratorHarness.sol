// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../migration/RegistrationWalletReplacementMigrator.sol";

contract RegistrationWalletReplacementMigratorHarness is RegistrationWalletReplacementMigrator {
    function seedIdentity(address wallet, address sponsor, uint8[] calldata activeLevels) external {
        isRegistered[wallet] = true;
        referrerOf[wallet] = sponsor;
        for (uint256 i = 0; i < activeLevels.length; ++i) {
            levelActivated[wallet][activeLevels[i]] = true;
        }
    }

    function seedMatrixParent(address user, uint8 level, address parent) external {
        currentMatrixParentOf[user][level] = parent;
    }
}
