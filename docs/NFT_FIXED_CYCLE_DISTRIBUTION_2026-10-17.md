# Freedom NFT Fixed-Cycle Distribution

## Approved Rules

- Operational launch anchor: `2026-10-03 00:00:00 UTC`.
- Cycle 1 distribution: `2026-11-02 00:00:00 UTC`.
- Cycle 1 eligibility cutoff: `2026-11-01 00:00:00 UTC`.
- Every later distribution is exactly 30 days after the previous distribution.
- Eligibility freezes exactly 24 hours before each distribution.
- Mint, upgrade, unlock, downgrade, and restore remain open during the freeze. Any membership change during that window applies to the next cycle.
- ID 1 is excluded from NFT rewards until governance explicitly removes the exclusion.
- Foundational requires exactly 5,700 combined locked FGT/FPT and receives 50% of the cycle pool.
- Intermediate requires exactly 18,700 combined locked FGT/FPT and receives 30%.
- Advanced requires exactly 62,000 combined locked FGT/FPT and receives 20%.
- FGT and FPT qualify. FGTr and FPTr do not qualify.
- Qualifying tokens are locked, not burned or transferred.
- A tier with no eligible members retains its allocation as unreserved NFT pool funds. Integer rounding dust also remains unreserved.

## Canonical Source Layout

| Concern | Canonical path |
| --- | --- |
| Contracts and upgrade tooling | `smart-contract/` |
| Staging backend and worker | `backend/` |
| Staging frontend | `frontend/` |
| Environment records | `env-files/` |
| Deployment manifests | `smart-contract/deployments-*` |
| Operational source of truth | `operations/` |
| Current rules and runbooks | `docs/` |

Directories named `deployments-*` are evidence, not editable source. Historical documents retain their original dates and must not override this rule record. Production runtime repositories remain the repositories named in `operations/production/deployment-baseline.json`.

## Safety Model

1. The NFT reward proxy remains UUPS-upgradeable and governed by the existing multisig and Guardian.
2. The upgrade call atomically configures the first distribution, excludes ID 1, and authorizes one dedicated reward operator.
3. The worker snapshots membership once at the cutoff. A completed snapshot is reused and does not repeatedly query historical chain state.
4. Before publishing, the worker verifies chain ID, on-chain schedule, operator authority, ID 1 exclusion, confirmed cutoff block, membership deployment, Merkle roots, and member counts.
5. The pool budget is the smaller of the unreserved balance at cutoff and the currently available unreserved balance. Funds arriving after cutoff are left for a later cycle.
6. Payment batches are bounded and idempotent. Completed wallets cannot be paid twice.
7. The worker fails closed on any mismatch and records the error without exposing credentials or RPC URLs.

## Required Runtime Configuration

Configure only the worker service with the signing key. The API does not require it.

```text
NFT_REWARD_FIRST_DISTRIBUTION_AT=2026-11-02T00:00:00.000Z
NFT_AUTO_DISTRIBUTION_ENABLED=true
NFT_REWARD_OPERATOR_PRIVATE_KEY=<dedicated funded operator key>
```

Keep `NFT_AUTO_DISTRIBUTION_ENABLED=false` until the proxy upgrade is executed and verified. The worker address derived from `NFT_REWARD_OPERATOR_PRIVATE_KEY` must equal the on-chain `rewardOperator()`.

## Controlled Rollout

1. Compile and run the complete contract and backend suites; build the frontend.
2. Validate the new implementation storage layout against both deployed Amoy and Polygon proxies.
3. Create a dedicated operator wallet, store its key only in the worker secret store, and fund only enough POL for bounded batch execution.
4. Prepare the Amoy implementation and governance calldata with `scripts/prepareFreedomNFTRewardDistributorUpgrade.js`.
5. Decode, simulate, approve, and execute Guardian approval followed by the atomic proxy upgrade/configuration.
6. Verify proxy implementation, owner, Guardian, first distribution, operator, ID 1 exclusion, token, and vault on Amoy.
7. Deploy the matching backend and frontend candidate, with automatic distribution disabled until those checks pass.
8. Certify membership status, cutoff messaging, next-cycle messaging, reward history, receipt generation, and empty-tier retention.
9. Repeat the same prepared implementation and governance process on Polygon mainnet from the exact certified commit.
10. Verify mainnet state independently, then enable the worker environment variables and redeploy only the worker.

No database reset, contract reset, historical fund movement, or RPC replacement is part of this rollout.

## Verification Evidence

As of 2026-10-17:

- Focused NFT contract tests: 6 passing.
- Complete contract regression after the final empty-tier correction: 176 passing.
- Backend tests: 38 passing.
- Frontend production build: passing.
- Polygon production proxy storage layout: valid.
- Amoy staging proxy storage layout: valid.
- Amoy implementation deployed at `0x5B8174d1549B395e94cD2152c9A7Da312209539c` in transaction `0x3cb004ecaf9cb67d82a05772e73e7b77e8544d9a66d130f23dd235ff5e3eb57c`.
- Amoy multisig proposals `38`, `39`, and `40` approved the proxy, approved the implementation, and atomically upgraded/configured the reward distributor.
- Amoy upgrade execution transaction: `0x92a874e8204f9d4c287f0f9794b38cf8c5f440d91240118aa0d20aac3fc8141b`.
- Post-upgrade and idempotent verification: passing. The proxy uses the expected implementation, Cycle 1 is scheduled for `2026-11-02 00:00:00 UTC`, the cutoff is `2026-11-01 00:00:00 UTC`, ID 1 is excluded, and the dedicated Amoy operator is configured.
- Evidence: `smart-contract/test-reports/nft-fixed-cycle/amoy-fixed-cycle-upgrade.json`.
- Post-upgrade canonical-wallet fork certification: passing against the upgraded Amoy proxy. Account 9 received the Foundational 50% share, Account 10 received the Intermediate 30% share, and Account 8 received the Advanced 20% share. Early publication, legacy publication, and ID 1 payment were rejected; duplicate execution paid nothing twice; an empty Cycle 2 retained its funds unreserved in the NFT pool.
- Canonical fork evidence: `smart-contract/test-reports/nft-fixed-cycle/amoy-post-upgrade-canonical-fork.json`.
- No production environment change, production proposal, Polygon mainnet transaction, database reset, or historical fund movement has been executed by this change set.

## Rollback

1. Set `NFT_AUTO_DISTRIBUTION_ENABLED=false` and redeploy the worker to stop all automated publication and payment attempts.
2. Do not delete snapshots, jobs, events, or indexed history.
3. If the proxy implementation must be reverted, prepare and storage-validate the previous implementation, obtain Guardian approval, and execute the rollback through the multisig.
4. Existing reserved entitlements and completed transfers remain immutable; rollback must not attempt to recreate or repay them.
