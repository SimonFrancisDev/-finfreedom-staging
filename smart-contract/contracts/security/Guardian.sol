// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title Guardian
 * @notice Upgrade gatekeeper for UUPS proxy contracts.
 *
 * DESIGN:
 * - This contract is intentionally NOT upgradeable.
 * - Proxy contracts call validateUpgrade(proxy, newImplementation)
 *   inside their _authorizeUpgrade(...) logic.
 * - A proxy can only upgrade to an implementation address that has
 *   been explicitly approved here.
 * - Guardian can also globally freeze upgrades.
 *
 * RECOMMENDED OWNERSHIP:
 * - Transfer ownership to a multisig wallet.
 * - In production, combine with a timelock executor/governance flow.
 */
contract Guardian is Ownable, Pausable {
    /// @dev Whether upgrades are globally frozen.
    bool public globalUpgradeFreeze;

    /// @dev Which proxy contracts are allowed to use this guardian.
    mapping(address => bool) public approvedProxies;

    /// @dev Explicit allowlist: proxy => implementation => approved.
    mapping(address => mapping(address => bool)) public approvedImplementations;

    event ProxyApprovalUpdated(address indexed proxy, bool allowed);
    event ImplementationApprovalUpdated(
        address indexed proxy,
        address indexed implementation,
        bool allowed
    );
    event GlobalUpgradeFreezeUpdated(bool frozen);

    constructor(address initialOwner) Ownable(initialOwner) {
        require(initialOwner != address(0), "Invalid owner");
    }

    /**
     * @notice Approve or revoke a proxy contract.
     * @dev Only approved proxies can pass validation.
     */
    function setApprovedProxy(address proxy, bool allowed) external onlyOwner whenNotPaused {
        require(proxy != address(0), "Invalid proxy");
        approvedProxies[proxy] = allowed;
        emit ProxyApprovalUpdated(proxy, allowed);
    }

    /**
     * @notice Approve or revoke a specific implementation for a specific proxy.
     */
    function setApprovedImplementation(
        address proxy,
        address implementation,
        bool allowed
    ) external onlyOwner whenNotPaused {
        require(proxy != address(0), "Invalid proxy");
        require(implementation != address(0), "Invalid implementation");

        approvedImplementations[proxy][implementation] = allowed;
        emit ImplementationApprovalUpdated(proxy, implementation, allowed);
    }

    /**
     * @notice Freeze or unfreeze all upgrades globally.
     * @dev When frozen, validateUpgrade will return false.
     */
    function setGlobalUpgradeFreeze(bool frozen) external onlyOwner whenNotPaused {
        globalUpgradeFreeze = frozen;
        emit GlobalUpgradeFreezeUpdated(frozen);
    }

    /**
     * @notice Pause admin mutation functions on the guardian itself.
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause admin mutation functions on the guardian itself.
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @notice Upgrade validation hook used by managed contracts.
     * @dev This function is intentionally view-only and deterministic.
     */
    function validateUpgrade(
        address proxy,
        address newImplementation
    ) external view returns (bool) {
        if (paused()) return false;
        if (globalUpgradeFreeze) return false;
        if (!approvedProxies[proxy]) return false;
        if (!approvedImplementations[proxy][newImplementation]) return false;
        return true;
    }

    /**
     * @notice Batch approve/revoke implementations for a single proxy.
     */
    function batchSetApprovedImplementations(
        address proxy,
        address[] calldata implementations,
        bool allowed
    ) external onlyOwner whenNotPaused {
        require(proxy != address(0), "Invalid proxy");
        uint256 len = implementations.length;
        for (uint256 i = 0; i < len; ++i) {
            address implementation = implementations[i];
            require(implementation != address(0), "Invalid implementation");
            approvedImplementations[proxy][implementation] = allowed;
            emit ImplementationApprovalUpdated(proxy, implementation, allowed);
        }
    }
}
