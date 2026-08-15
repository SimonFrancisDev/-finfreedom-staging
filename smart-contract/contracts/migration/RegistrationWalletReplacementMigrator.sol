// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../RegistrationFixed.sol";

/**
 * @notice Temporary, one-shot implementation for the approved production
 * wallet replacement. Restore the certified Registration implementation after
 * execution and verification.
 */
contract RegistrationWalletReplacementMigrator is RegistrationFixed {
    address internal constant WP_OLD = 0xC0545331E20587208d4b27b2A3e4920Cc481133a;
    address internal constant WP_NEW = 0x1EA5513e017b4e25847e91aBc84aC8686331f80B;
    address internal constant RY_OLD = 0x2F1E28756A42A3680b5AD42C58A0c3887C9e60bA;
    address internal constant RY_NEW = 0xFb8D46674f51882baaA2c9606122484434FF2DC2;
    bytes32 internal constant APPROVED_INPUT_HASH =
        0x67b5ebaadb725b816b0c81d489813aab6c64fc3abdd7da1d793bd6d10f5c57a3;

    error WalletReplacementInvalidState(address wallet);
    error WalletReplacementLengthMismatch();
    error WalletReplacementManifestMismatch();
    error WalletReplacementUnexpectedSponsor(address child, address actual, address expected);
    error WalletReplacementUnexpectedParent(address user, uint8 level, address actual, address expected);

    event ParticipantWalletReplaced(address indexed oldWallet, address indexed newWallet, address indexed sponsor);
    event ParticipantSponsorRewritten(address indexed child, address indexed oldSponsor, address indexed newSponsor);
    event ParticipantMatrixParentRewritten(address indexed user, uint8 indexed level, address indexed oldParent, address newParent);
    event WalletReplacementMigrationCompleted(address indexed wpReplacement, address indexed ryReplacement);

    function executeApprovedWalletReplacement(
        address[] calldata sponsorChildren,
        address[] calldata sponsorOldParents,
        address[] calldata matrixUsers,
        uint8[] calldata matrixLevels,
        address[] calldata matrixOldParents
    ) external onlyOwner whenPaused {
        if (
            sponsorChildren.length != sponsorOldParents.length ||
            matrixUsers.length != matrixLevels.length ||
            matrixUsers.length != matrixOldParents.length ||
            sponsorChildren.length != 11 ||
            matrixUsers.length != 10
        ) revert WalletReplacementLengthMismatch();
        if (
            keccak256(
                abi.encode(
                    sponsorChildren,
                    sponsorOldParents,
                    matrixUsers,
                    matrixLevels,
                    matrixOldParents
                )
            ) != APPROVED_INPUT_HASH
        ) revert WalletReplacementManifestMismatch();

        _validateIdentityPreconditions(WP_OLD, WP_NEW);
        _validateIdentityPreconditions(RY_OLD, RY_NEW);

        // WP98HB is migrated first because RYMQK4 is its direct child.
        _moveIdentity(WP_OLD, WP_NEW, referrerOf[WP_OLD]);

        for (uint256 i = 0; i < sponsorChildren.length; ++i) {
            address child = sponsorChildren[i];
            address expected = sponsorOldParents[i];
            address actual = referrerOf[child];
            if (actual != expected) revert WalletReplacementUnexpectedSponsor(child, actual, expected);

            address replacement = _replacementOf(expected);
            if (child != RY_OLD) {
                referrerOf[child] = replacement;
                emit ParticipantSponsorRewritten(child, expected, replacement);
            }
        }

        // Its sponsor has already been canonicalized to WP_NEW.
        _moveIdentity(RY_OLD, RY_NEW, WP_NEW);

        for (uint256 i = 0; i < matrixUsers.length; ++i) {
            address sourceUser = matrixUsers[i];
            uint8 level = matrixLevels[i];
            address expected = matrixOldParents[i];
            address targetUser = _replacementOf(sourceUser);
            address actual = currentMatrixParentOf[targetUser][level];

            // Migrated identities may already contain the canonical parent.
            if (actual == _replacementOf(expected)) continue;
            if (actual != expected) revert WalletReplacementUnexpectedParent(targetUser, level, actual, expected);

            address replacement = _replacementOf(expected);
            currentMatrixParentOf[targetUser][level] = replacement;
            emit ParticipantMatrixParentRewritten(targetUser, level, expected, replacement);
        }

        emit WalletReplacementMigrationCompleted(WP_NEW, RY_NEW);
    }

    function _validateIdentityPreconditions(address oldWallet, address newWallet) internal view {
        if (!isRegistered[oldWallet]) revert WalletReplacementInvalidState(oldWallet);
        if (
            isRegistered[newWallet] ||
            referrerOf[newWallet] != address(0)
        ) revert WalletReplacementInvalidState(newWallet);

        for (uint8 level = 1; level <= 10; ++level) {
            if (levelActivated[newWallet][level] || currentMatrixParentOf[newWallet][level] != address(0)) {
                revert WalletReplacementInvalidState(newWallet);
            }
        }
    }

    function _moveIdentity(address oldWallet, address newWallet, address sponsor) internal {
        isRegistered[newWallet] = true;
        referrerOf[newWallet] = sponsor;
        for (uint8 level = 1; level <= 10; ++level) {
            levelActivated[newWallet][level] = levelActivated[oldWallet][level];
            currentMatrixParentOf[newWallet][level] = _replacementOf(currentMatrixParentOf[oldWallet][level]);

            levelActivated[oldWallet][level] = false;
            currentMatrixParentOf[oldWallet][level] = address(0);
        }

        isRegistered[oldWallet] = false;
        referrerOf[oldWallet] = address(0);
        emit ParticipantWalletReplaced(oldWallet, newWallet, sponsor);
    }

    function _replacementOf(address wallet) internal pure returns (address) {
        if (wallet == WP_OLD) return WP_NEW;
        if (wallet == RY_OLD) return RY_NEW;
        return wallet;
    }
}
