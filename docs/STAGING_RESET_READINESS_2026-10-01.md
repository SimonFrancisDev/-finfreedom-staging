# October 1 staging reset readiness

Status: NOT RESET. Existing staging database and hosted address configuration are
preserved. No production transaction or deployment was performed.

## Confirmed sponsor defect

Read-only Amoy checks found different permanent sponsors, not merely different
orbit parents:

- 0xdd78425335c0c698615845d94f9fee7492266396: F-Freedom registered under
  0x3a596f67585F27cfD7F449FeC0a92b7bf34B1df5, but Plus sponsor is
  0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A (ID1).
- 0x3f6bb1e6bfeb9c52f763a197d27b580d7de7f100 and
  0xf72873d6233b5e3dfba6d1d8058bf90e990902f0: not registered in F-Freedom,
  but already initialized in Plus under ID1.

Evidence: smart-contract/test-reports/freedom-plus/representative-sponsor-check.json.
The wallet-to-FFN-9BQ4O5 mapping was not independently checked in this run.

## Source correction

Plus genesis now requires every representative to be registered with active
F-Freedom Level 1 and an explicit ID1 sponsor before creating any genesis state.
It fails atomically for missing registration, inactive Level 1 or another sponsor.
This preserves the established Plus genesis positions under ID1 without silently
changing a user's permanent referral sponsor. It does not repair existing records.

Owner-only genesis can run while paused, allowing deployment to keep ordinary
registrations closed. The production preparation script in this staging repository
was reordered accordingly; it has NOT been executed against production.

The staging deployment script checks representative eligibility before deploying
the suite, preventing a late failure after spending deployment gas.

## Required reset sequence additions

1. Retain the backup/suspension/address-cutover safeguards in the existing runbook.
2. Deploy fresh F-Freedom, then register the three approved representatives under
   ID1 and activate Level 1 BEFORE Plus genesis. F-Freedom's normal representative
   behavior still allows a chosen sponsor; the Plus genesis preflight now rejects
   a sponsor incompatible with its ID1 genesis policy.
3. Each representative signs from their own wallet. The approved canonical test
   signer file contains none of these three wallets. Do not request private keys,
   impersonate them, or substitute wallets silently. Owner availability is needed.
4. Deploy the tested Plus/NFT suite with the eight founder payout addresses.
5. Configure and verify the NFT reward operator, UTC schedule and shared funding
   destination; the previous staging deployment did not prove monthly automation.
   The deployment now requires an explicit NFT_REWARD_OPERATOR_ADDRESS, configures
   it and reads it back. It rejects the deployer, ID1 and multisig as automation
   signers. The local backend .env has no reward operator key, enabled flag or
   first-period setting; hosted settings have not been checked in this run.
6. Verify a live ID1-routed payment reaches all eight payout wallets. The earlier
   successful member-payment smoke did not exercise this branch.
7. Only after deployment validation, cut over staging addresses and reset the
   backed-up staging database; index from the new deployment blocks and smoke-test
   the website before reopening testing.

## Validation

- Final Plus settlement and NFT membership/rewards run: 39 passing (about 2 minutes).
- Covers representative sponsor rejection, paused genesis, all seven Plus level
  percentages, routed/mixed recycle windows, FPTr, equal founder payout regression,
  NFT mixed-token thresholds, unlock/restore, tier changes, monthly 50/30/20,
  empty-tier retention, duplicate-period rejection and idempotent payout batches.
- These are local contract tests, not proof that hosted configuration is ready.
- F-Freedom audit invariants, canonical model/end-to-end trace and Plus registration
  suite: 79 passing (about 5 minutes). Total across both final runs: 118 passing.
  Existing delegatecall allowlist warnings were emitted by the F-Freedom fixture;
  these passing tests are not a substitute for a full security audit.

No old funds, database records or historical placements have been removed.
