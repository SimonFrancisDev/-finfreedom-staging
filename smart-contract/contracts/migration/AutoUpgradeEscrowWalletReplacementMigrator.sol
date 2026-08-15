// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../AutoUpgradeEscrow.sol";

/** @notice Temporary one-shot wallet replacement implementation. */
contract AutoUpgradeEscrowWalletReplacementMigrator is AutoUpgradeEscrow {
    address internal constant WP_OLD = 0xC0545331E20587208d4b27b2A3e4920Cc481133a;
    address internal constant WP_NEW = 0x1EA5513e017b4e25847e91aBc84aC8686331f80B;
    address internal constant RY_OLD = 0x2F1E28756A42A3680b5AD42C58A0c3887C9e60bA;
    address internal constant RY_NEW = 0xFb8D46674f51882baaA2c9606122484434FF2DC2;
    uint256 internal constant WP_LOCK = 88 * 10 ** 6;
    uint256 internal constant RY_LOCK = 8 * 10 ** 6;

    error WalletReplacementInvalidLock(address wallet, uint8 fromLevel, uint256 actual, uint256 expected);
    error WalletReplacementGlobalChanged(uint256 beforeValue, uint256 afterValue);

    event EscrowWalletReplaced(
        address indexed oldWallet,
        address indexed newWallet,
        uint8 indexed fromLevel,
        uint8 toLevel,
        uint256 amount
    );

    function executeApprovedWalletReplacement() external onlyOwner whenPaused {
        uint256 globalBefore = currentEscrowLockedGlobal;

        _validateOnlyExpectedLock(WP_OLD, 4, WP_LOCK);
        _validateOnlyExpectedLock(RY_OLD, 3, RY_LOCK);
        _validateOnlyExpectedLock(WP_NEW, 0, 0);
        _validateOnlyExpectedLock(RY_NEW, 0, 0);

        _moveLock(WP_OLD, WP_NEW, 4, WP_LOCK);
        _moveLock(RY_OLD, RY_NEW, 3, RY_LOCK);

        if (currentEscrowLockedGlobal != globalBefore) {
            revert WalletReplacementGlobalChanged(globalBefore, currentEscrowLockedGlobal);
        }
    }

    function _validateOnlyExpectedLock(address wallet, uint8 expectedFromLevel, uint256 expectedAmount) internal view {
        for (uint8 fromLevel = MIN_LEVEL; fromLevel < MAX_LEVEL; ++fromLevel) {
            uint256 expected = fromLevel == expectedFromLevel ? expectedAmount : 0;
            uint256 actual = lockedFunds[wallet][fromLevel][fromLevel + 1];
            if (actual != expected) {
                revert WalletReplacementInvalidLock(wallet, fromLevel, actual, expected);
            }
        }
    }

    function _moveLock(address oldWallet, address newWallet, uint8 fromLevel, uint256 amount) internal {
        lockedFunds[oldWallet][fromLevel][fromLevel + 1] = 0;
        lockedFunds[newWallet][fromLevel][fromLevel + 1] = amount;
        emit EscrowWalletReplaced(oldWallet, newWallet, fromLevel, fromLevel + 1, amount);
    }
}
