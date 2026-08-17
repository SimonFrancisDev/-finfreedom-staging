// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../freedom-plus/interfaces/IFreedomPlusOrbit.sol";

contract FreedomPlusOrbitManagerHarness {
    function record(
        IFreedomPlusOrbit orbit,
        address orbitOwner,
        address participant,
        address matrixAnchor,
        uint8 level,
        bytes32 activationId,
        bytes32 placementId,
        uint256 amount,
        IFreedomPlusOrbit.PlacementKind kind,
        bool financial
    ) external returns (uint256, uint8, uint8, address) {
        return orbit.recordPosition(
            orbitOwner,
            participant,
            matrixAnchor,
            level,
            activationId,
            placementId,
            amount,
            kind,
            financial
        );
    }
}
