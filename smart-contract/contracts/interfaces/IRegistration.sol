// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title IRegistration
 * @dev Minimal registration interface used by LevelManager and orbit contracts.
 */
interface IRegistration {
    function getReferrer(address user) external view returns (address);
    function hadNoReferrer(address user) external view returns (bool);
    function isRegistered(address user) external view returns (bool);
    function isLevelActivated(address user, uint8 level) external view returns (bool);
    function resolveEligibleRecipient(address candidate, uint8 level, address fallbackRecipient) external view returns (address);
    function highestActiveLevel(address user) external view returns (uint8);
    function triggerAutoUpgrade(address user, uint8 fromLevel) external;
    function totalParticipants() external view returns (uint256);
    function isParticipant(address user) external view returns (bool);
}
