// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./BaseUtilityToken.sol";

contract FGTToken is BaseUtilityToken {
    function initialize(address initialOwner, address guardian_) public initializer {
        __BaseUtilityToken_init("Freedom Game Token", "FGT", initialOwner, guardian_);
    }
}






// // This is a stable version
// pragma solidity ^0.8.24;

// import "./BaseUtilityToken.sol";

// contract FGTToken is BaseUtilityToken {
//     constructor(address initialOwner)
//         BaseUtilityToken("Freedom Game Token", "FGT", initialOwner)
//     {}
// }

