// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MockFreedomPlusSettlementRouter {
    bool public shouldRevert;
    address public lastParticipant;
    address public lastSponsor;
    uint8 public lastLevel;
    uint256 public lastPrice;
    bytes32 public lastActivationId;

    function setShouldRevert(bool value) external { shouldRevert = value; }

    function settlePaidActivation(
        address participant,
        address sponsor,
        uint8 level,
        uint256 price,
        bytes32 activationId
    ) external {
        require(!shouldRevert, "Mock router failed");
        lastParticipant = participant;
        lastSponsor = sponsor;
        lastLevel = level;
        lastPrice = price;
        lastActivationId = activationId;
    }
}
