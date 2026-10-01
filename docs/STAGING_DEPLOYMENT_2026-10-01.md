# Fresh staging deployment - October 1

Scope: Amoy 80002 only. Production unchanged. Existing hosted API/worker addresses
and database remain unchanged pending representative signatures and Plus genesis.

## Completed

- Read-only deployment preflight passed (11.57 test POL initially available).
- Fresh F-Freedom suite deployed with eight payout wallets and exactly three
  approved representatives. Retained staging mock USDT.
- Manifest: smart-contract/deployments-staging/deployment-october-20261001.json.
- Registration: 0xC5750BfA5b4Dd888e55420911b58CB57539aEb90.
- ID1: 0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A.
- Earliest deployment block: 49054197. Never use the final block as indexer start.
- Existing fresh-deployment validator passed code, ownership and core graph links.
  Fresh baseline was registeredCount=0, totalParticipants=1 before owner signing.
- Dedicated staging NFT reward operator generated in ignored private storage:
  0x4e0b5aE304d657fF9E460161DaBD38E1566306a8, funded to 0.2 test POL by
  0x54f1546c2281d68cb2301d6dc588bfad0d2cff8e4c66a3972ac951be3a320fbd.
  Not yet authorized on a new reward distributor; no private key is included.
- Render access verified for staging API srv-d8h37kj7uimc73cg3750 and worker
  srv-d8h3bptdt1ts73fuc7eg. Both were not_suspended; neither was reconfigured.
- Vercel authentication and project finfreedom-staging verified.
- Vercel deployment succeeded and aliased finfreedom-staging.vercel.app.
  The /staging-representative-setup.html endpoint returned HTTP 200 with the exact
  fresh contract and Amoy guard. Main application address variables are unchanged.
- All three representative register(ID1) gas simulations passed without signing.
  The third wallet had zero test POL and was funded to 0.2 test POL in transaction
  0xa6d0f1ae9c3af0068c82d325a65b604f1ca2c944d22209548eed7bfc54293935.
- Added temporary staging-representative-setup.html signing page. Seven mocked
  wallet tests pass: exact zero-USDT register(ID1), wrong network/wallet/host,
  wrong contract ID1, conflicting sponsor and already-registered handling.
- Earlier contract validation: 118 tests passed, recorded in reset-readiness doc.

## Deployment recovery

Automatic fee estimation was rejected before the first transaction. Explicit
30-gwei gas pricing was used subsequently. Public RPC receipt inconsistency
interrupted the token stage; existing deployed tokens/vaults were verified and
reused, not duplicated. The approved authenticated QuickNode Amoy endpoint then
carried the remainder. A transport reset interrupted ownership handoff; the
finalizer read owners and transferred only those still owned by the deployer.

Recovery addresses, transaction journal, and resulting manifest are retained.
Do not rerun the one-off resume script after this completed deployment. The
finalizer is address-locked and checks existing ownership before writes.

## Required handoff

The following wallet owners must register using the temporary signing page before
the corrected Plus genesis can run:

1. 0x3f6Bb1E6Bfeb9C52f763a197d27B580d7DE7f100
2. 0xDd78425335C0c698615845d94f9FeE7492266396
3. 0x0de1B6F15Fe8E5Cf7fbBA2cD4C576357Ececa962

The third entry supersedes the original unused f728 wallet. Its on-chain
replacement is recorded in STAGING_REPRESENTATIVE_REPLACEMENT_2026-10-01.md.
The first two registrations were confirmed under ID1; the third owner signature
remains pending as of the preparation record below. The signing-page gas-tip fix
is deployed in commit 40ea2c9.

Registration is under ID1 and costs zero mock USDT because these three wallets
are configured as F-Freedom representatives. Their own test POL pays gas.
Verify all three sponsors and Level 1 states on-chain after signing. Do not
request private keys or substitute wallets. The main app remains on its previous
address set until the coordinated cutover; the temporary page is independent.

## Still gated before general testing

Prepared independently while checking the third signature every ten seconds:

- Non-secret deployment inputs: smart-contract/deployments-staging/october-plus-preparation.json.
- Fresh manager confirms eight distinct founder payout wallets at 1250 each.
- Fresh FGT configuration is unlocked, but its owner is the multisig. NFT
  membership authorization therefore requires a governance transaction.
- Dedicated NFT operator has 0.2 test POL; deployer has approximately 10.77 test POL.
  These balances are observations, not a guarantee of sufficient deployment gas.
- Earliest F-Freedom indexer block remains 49054197.
- The shared NFT vault must be wired into F-Freedom after Plus deployment,
  preserving the existing operations recipient.
- The worker requires an explicit NFT_REWARD_FIRST_PERIOD (YYYYMM); none was
  selected or enabled during this preparation. Do not imply monthly payouts are live.

This preparation made no hosted-environment or database changes. The signing
monitor was a bounded session, not a permanent cloud service.

- Fresh Plus/NFT deployment and genesis after representative signatures.
- NFT operator funding/role, monthly schedule and shared pool configuration.
- Backup, suspension, guarded staging database reset and complete address cutover.
- Live founder payout and NFT automation checks, index reconciliation and UI smoke.

The signing-page publication alone is NOT general reopening or completed reset.
Remove the temporary page after the representatives are initialized and cutover
is validated. Never promote this Amoy-specific page to the production project.

## Build observations

## Completed cutover preparation (supersedes earlier pending items)

All three representatives registered under ID1. Fresh Plus/NFT deployment is
recorded in deployment-1790884982975.json. Genesis activated seven Plus levels
for ID1 and the three representatives, issued 54,650 FPT each, and moved no USDT.
All sixteen new contracts were handed to the staging multisig.

october-nft-permissions.json records completed multisig execution authorizing
the fresh NFT membership in FGT and routing F-Freedom charges to the shared
NFT pool. F-Freedom's operations recipient was preserved. The deployment
manifest's pendingGovernanceActions field is historical, resolved by this report.

Both staging services were suspended before the database backup/reset.
The verified backup contains 41 collections and 10,039 documents. The reset
used the guarded deletion fallback and verified every collection empty.
Private backup archives and credentials remain ignored and are not committed.
october-database-backup.json records the archive checksum.

Render API and worker each have 51 verified configuration updates. Vercel has
36 verified public settings in staging Production and Preview; stale duplicate
Production-only variables were removed only after replacement readback.
The actual production/mainnet project and database were not changed.

Monthly automation remains DISABLED pending explicit approval to upload the
dedicated staging operator private key to the worker only. Its contract role
is configured. The first configured monthly period is 202611 (November 1,
2026 at 00:00 UTC); this is not evidence that a monthly payout has executed.

Recovery uses recoverOctoberStaging.js and fresh deployment start blocks.
Recovery completed successfully: F-Freedom reported zero lag at its sampled
confirmed head; all sixteen Plus/NFT streams reached block 49064428.
The historical StagingRepresentativeReplaced event was added to the decoder
after it blocked strict replay. Unknown events still fail rather than being
silently skipped. october-recovery.json records actual completion or failure.

Hosted service resumption, deployment verification and new live transaction
checks must be recorded separately; configuration readback alone is not a
claim that general testing or production rollout is ready.

Vercel build passed. npm reported 28 dependency vulnerabilities (3 critical,
17 high, 7 moderate, 1 low) and large bundle warnings. These findings were not
remediated in this deployment and must not be represented as a clean security
audit. No browser visual test was performed; Playwright was unavailable locally.
