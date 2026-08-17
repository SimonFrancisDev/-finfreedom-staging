// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./FreedomPlusBaseVault.sol";

contract FreedomPlusOperationsVault is FreedomPlusBaseVault {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() { _disableInitializers(); }

    function initialize(address initialOwner, address guardian_) public initializer {
        __FreedomPlusBaseVault_init(initialOwner, guardian_);
    }
}
