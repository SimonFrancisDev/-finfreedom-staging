// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../../tokens/BaseUtilityToken.sol";

contract FPTToken is BaseUtilityToken {
    function initialize(address initialOwner, address guardian_) public initializer {
        __BaseUtilityToken_init("Freedom-Plus Token", "FPT", initialOwner, guardian_);
    }
}
