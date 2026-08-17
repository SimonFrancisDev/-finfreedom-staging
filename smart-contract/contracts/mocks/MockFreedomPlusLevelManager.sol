// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../freedom-plus/interfaces/IFreedomPlusTokenController.sol";

contract MockFreedomPlusLevelManager {
    bool public shouldRevert;
    uint256 public activationNonce;
    address public lastParticipant;
    address public lastSponsor;
    uint8 public lastLevel;

    function setShouldRevert(bool value) external {
        shouldRevert = value;
    }

    function activatePaidLevel(address participant, address sponsor, uint8 level)
        external
        returns (bytes32 activationId)
    {
        require(!shouldRevert, "Mock settlement failed");
        activationNonce += 1;
        lastParticipant = participant;
        lastSponsor = sponsor;
        lastLevel = level;
        activationId = keccak256(abi.encode(participant, sponsor, level, activationNonce));
    }

    function issueFirstActivation(
        IFreedomPlusTokenController controller,
        address participant,
        uint8 level,
        uint256 amount
    ) external {
        controller.onFirstActivation(participant, level, amount);
    }

    function issueGenesisActivation(
        IFreedomPlusTokenController controller,
        address participant,
        uint8 level,
        uint256 amount
    ) external {
        controller.onGenesisActivation(participant, level, amount);
    }

    function issueRecycle(
        IFreedomPlusTokenController controller,
        address participant,
        uint8 level,
        uint256 amount,
        bytes32 recycleActivationId
    ) external {
        controller.onFundedRecycle(participant, level, amount, recycleActivationId);
    }
}
