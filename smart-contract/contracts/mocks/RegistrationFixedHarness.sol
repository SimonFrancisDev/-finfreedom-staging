// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../RegistrationFixed.sol";

contract RegistrationFixedHarness is RegistrationFixed {
    function setReferrerForTest(address user, address referrer) external {
        referrerOf[user] = referrer;
    }

    function setLevelActiveForTest(address user, uint8 level, bool active) external {
        levelActivated[user][level] = active;
    }
}
