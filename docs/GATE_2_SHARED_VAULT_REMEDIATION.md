# Gate 2: Shared Vault Remediation

Status: completed on staging

## Decision

F-Freedom and Freedom-Plus share the ecosystem system-charge recipients:

- NFT Pool Vault: `0x1AF1e23b2820935AF9D8FD4DE0024B79E6119aaA`
- Operations Vault: `0x8C53D90348A4C73C73db2E21dF07DAa29144A823`

This decision concerns the settlement router's system-charge recipients. The
Freedom NFT reward-distribution vault remains a separate functional component
because it implements distributor-controlled reward reservation and disbursal.
Do not substitute one role for the other during production rollout.

## Contract Change

`FreedomPlusSettlementRouter` now exposes owner-only `setSystemVaults`, which:

- requires both recipients to contain contract code;
- updates both recipients atomically;
- emits `SystemVaultsUpdated` with previous and new values;
- introduces no new storage slots.

## Staging Governance Execution

Canonical router proxy: `0x5Cc0594a2d275c9CfaC38F5Ef6E03e84f0E05B63`

Prepared implementation: `0x11B0E0B4a9329bc1F8Faa00e2850139649E0D9ec`

The OpenZeppelin upgrade storage-layout validation passed before governance
submission. The 2-confirmation multisig and Guardian workflow was then used:

1. Proposal 11 approved the canonical router proxy in the Guardian.
2. Proposal 12 approved the prepared implementation for that proxy.
3. Proposal 13 atomically called `upgradeToAndCall` and `setSystemVaults`.

Final execution transaction:
`0xbcd723edf4d9f917a3f3ca07dc09052196b626ec0e60e61c01ae54e1c52bf0e5`

## Post-Execution Verification

- implementation slot: `0x11B0E0B4a9329bc1F8Faa00e2850139649E0D9ec`
- `nftPoolVault()`: `0x1AF1e23b2820935AF9D8FD4DE0024B79E6119aaA`
- `operationsVault()`: `0x8C53D90348A4C73C73db2E21dF07DAa29144A823`
- `owner()`: `0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A`
- proposal 13: executed with two confirmations

## Production Rollout Requirement

Production must repeat the same sequence against production addresses:

1. validate the implementation storage layout;
2. prepare, but do not directly upgrade, the implementation;
3. approve proxy through Guardian governance;
4. approve implementation through Guardian governance;
5. submit one atomic `upgradeToAndCall` migration;
6. decode and verify every proposal before confirmations;
7. verify the implementation slot, both recipients, ownership, and emitted
