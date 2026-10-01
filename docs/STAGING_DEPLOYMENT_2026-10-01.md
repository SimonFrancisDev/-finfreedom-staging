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
3. 0xf72873d6233B5e3dfbA6D1D8058BF90E990902f0

Registration is under ID1 and costs zero mock USDT because these three wallets
are configured as F-Freedom representatives. Their own test POL pays gas.
Verify all three sponsors and Level 1 states on-chain after signing. Do not
request private keys or substitute wallets. The main app remains on its previous
address set until the coordinated cutover; the temporary page is independent.

## Still gated before general testing

- Fresh Plus/NFT deployment and genesis after representative signatures.
- NFT operator funding/role, monthly schedule and shared pool configuration.
- Backup, suspension, guarded staging database reset and complete address cutover.
- Live founder payout and NFT automation checks, index reconciliation and UI smoke.

The signing-page publication alone is NOT general reopening or completed reset.
Remove the temporary page after the representatives are initialized and cutover
is validated. Never promote this Amoy-specific page to the production project.

## Build observations

Vercel build passed. npm reported 28 dependency vulnerabilities (3 critical,
17 high, 7 moderate, 1 low) and large bundle warnings. These findings were not
remediated in this deployment and must not be represented as a clean security
audit. No browser visual test was performed; Playwright was unavailable locally.
