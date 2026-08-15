// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../tokens/FGTToken.sol";
import "../tokens/FGTrToken.sol";

abstract contract UtilityTokenWalletReplacementLogic {
    address internal constant WP_OLD = 0xC0545331E20587208d4b27b2A3e4920Cc481133a;
    address internal constant WP_NEW = 0x1EA5513e017b4e25847e91aBc84aC8686331f80B;
    address internal constant RY_OLD = 0x2F1E28756A42A3680b5AD42C58A0c3887C9e60bA;
    address internal constant RY_NEW = 0xFb8D46674f51882baaA2c9606122484434FF2DC2;

    error WalletReplacementInvalidBalance(address wallet, uint256 actual, uint256 expected);
    error WalletReplacementLockedBalance(address wallet, uint256 amount);
}

contract FGTWalletReplacementMigrator is FGTToken, UtilityTokenWalletReplacementLogic {
    uint256 internal constant WP_BALANCE = 150 * 10 ** 6;
    uint256 internal constant RY_BALANCE = 70 * 10 ** 6;

    function executeApprovedWalletReplacement() external onlyOwner whenPaused {
        _moveBalance(WP_OLD, WP_NEW, WP_BALANCE);
        _moveBalance(RY_OLD, RY_NEW, RY_BALANCE);
    }

    function _moveBalance(address oldWallet, address newWallet, uint256 expected) internal {
        _requireExactBalance(oldWallet, expected);
        _requireExactBalance(newWallet, 0);
        _balances[oldWallet] = 0;
        _balances[newWallet] = expected;
        emit Transfer(oldWallet, newWallet, expected);
    }

    function _requireExactBalance(address wallet, uint256 expected) internal view {
        uint256 actual = _balances[wallet];
        if (actual != expected) revert WalletReplacementInvalidBalance(wallet, actual, expected);
        uint256 locked = _lockedBalances[wallet];
        if (locked != 0) revert WalletReplacementLockedBalance(wallet, locked);
    }
}

contract FGTrWalletReplacementMigrator is FGTrToken, UtilityTokenWalletReplacementLogic {
    uint256 internal constant WP_BALANCE = 15 * 10 ** 6;

    function executeApprovedWalletReplacement() external onlyOwner whenPaused {
        _moveBalance(WP_OLD, WP_NEW, WP_BALANCE);
        _requireExactBalance(RY_OLD, 0);
        _requireExactBalance(RY_NEW, 0);
    }

    function _moveBalance(address oldWallet, address newWallet, uint256 expected) internal {
        _requireExactBalance(oldWallet, expected);
        _requireExactBalance(newWallet, 0);
        _balances[oldWallet] = 0;
        _balances[newWallet] = expected;
        emit Transfer(oldWallet, newWallet, expected);
    }

    function _requireExactBalance(address wallet, uint256 expected) internal view {
        uint256 actual = _balances[wallet];
        if (actual != expected) revert WalletReplacementInvalidBalance(wallet, actual, expected);
        uint256 locked = _lockedBalances[wallet];
        if (locked != 0) revert WalletReplacementLockedBalance(wallet, locked);
    }
}
