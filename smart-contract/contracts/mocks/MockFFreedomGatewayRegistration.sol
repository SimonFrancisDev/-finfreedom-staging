// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MockFFreedomGatewayRegistration {
    mapping(address => bool) public isRegistered;
    mapping(address => mapping(uint8 => bool)) public isLevelActivated;
    mapping(address => address) private _referrer;

    function setParticipant(address participant, address sponsor, bool registered, bool levelOneActive) external {
        isRegistered[participant] = registered;
        isLevelActivated[participant][1] = levelOneActive;
        _referrer[participant] = sponsor;
    }

    function getReferrer(address participant) external view returns (address) {
        return _referrer[participant];
    }
}