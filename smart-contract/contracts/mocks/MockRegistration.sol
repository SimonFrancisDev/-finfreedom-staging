// contracts/mocks/MockRegistration.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ILevelManager {
    function setID1Wallet(address) external;
}

contract MockRegistration {
    mapping(address => address) public ref;
    mapping(address => mapping(uint8 => bool)) public active;
    address public id1Wallet;
    address public levelManager;  // Add this

    // Add this function to set the LevelManager address
    function setLevelManager(address _lm) external {
        levelManager = _lm;
    }

    function setID1Wallet(address _id1Wallet) external {
        id1Wallet = _id1Wallet;
        // Also call LevelManager if it's set
        if (levelManager != address(0)) {
            ILevelManager(levelManager).setID1Wallet(_id1Wallet);
        }
    }

    function setRef(address user, address r) external {
        ref[user] = r;
    }

    function setActive(address user, uint8 level) external {
        active[user][level] = true;
    }

    function setActiveStatus(address user, uint8 level, bool status) external {
        active[user][level] = status;
    }

    function getReferrer(address user) external view returns(address) {
        return ref[user];
    }

    function isLevelActivated(address user, uint8 level) external view returns(bool) {
        return active[user][level];
    }

    function resolveEligibleRecipient(address candidate, uint8 level, address fallbackRecipient) external view returns(address) {
        if (candidate == address(0)) return address(0);

        address current = candidate;
        for (uint8 depth = 0; depth < 64; ++depth) {
            if (current == fallbackRecipient || active[current][level]) return current;
            current = ref[current];
            if (current == address(0)) return fallbackRecipient;
        }

        return fallbackRecipient;
    }

    function hadNoReferrer(address user) external view returns(bool) {
        return ref[user] == address(0);
    }

    function isParticipant(address) external pure returns(bool) {
        return true;
    }

    function triggerAutoUpgrade(address, uint8) external {}

    function totalParticipants() external pure returns(uint256) {
        return 0;
    }
}
