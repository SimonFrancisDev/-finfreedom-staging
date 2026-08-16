// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./FreedomPlusBaseOrbit.sol";

contract P3PlusOrbit is FreedomPlusBaseOrbit {
    function initialize(address manager_, address initialOwner, address guardian_) public initializer {
        __FreedomPlusBaseOrbit_init(manager_, initialOwner, guardian_);
    }

    function supportsLevel(uint8 level) public pure override returns (bool) { return level == 7; }
    function orbitType() public pure override returns (FreedomPlusConfig.OrbitType) {
        return FreedomPlusConfig.OrbitType.P3;
    }
}
