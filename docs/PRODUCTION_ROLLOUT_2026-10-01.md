# Production rollout: 2026-10-01

## Latest execution checkpoint

Staging live activation/NFT smoke and approved worker setup are committed at
8f1b2b4. Production backend and frontend worktrees were clean at this checkpoint.
No production database reset or mainnet write has been performed in this step.

Refreshed mainnet preflight passed for existing governance, eight founder
ratios, representative registration/Level 1 and preserved charge recipients.
The historical NFT pool balance remains 3,306.24 USDT and is excluded from
this additive deployment. The deployer balance was 30.354428239655199348 POL.
The observed gas quote was 251.581560587 gwei, exceeding the existing 50-gwei
guard. Approval was requested for a 300-gwei cap and 15-POL ceiling; it has
not yet been received. The old rehearsal estimate at 300 gwei with 25% buffer
is approximately 14.95 POL; refresh actual estimates before execution.

The three configured mainnet representatives are registered but each has
getReferrer() equal to zero in the legacy gateway. Ordinary Plus registration
already normalizes zero to ID1; genesis did not. The candidate now uses the
same normalization, without modifying legacy records. Explicit non-ID1 sponsors
remain rejected. Production preflight now checks this before spending gas.
This changes genesis only and does not require resetting existing staging.

Attempts to rehearse the current package on the configured RPC and a public
Polygon fallback both failed because historical state was unavailable, before
any deployment. The earlier local-fork report is historical evidence, not a
passing rehearsal of this updated candidate. Do not label these attempts PASS.

Validation completed: 42 tests passed in the settlement-router and
registration/token-controller suites, including zero-referrer genesis,
conflicting-sponsor rejection, founder distributions and all recycle engines.
The deployment guard now binds rehearsal evidence to the script hash and
all fifteen compiled deployment-artifact hashes. Old evidence cannot authorize
the updated candidate. No deployed staging implementation was upgraded.
The configured primary mainnet RPC also failed the minimal historical read.

Next gates: obtain gas approval,
refresh the local-fork wiring rehearsal with usable historical RPC state,
deploy the paused layer, and submit exact governance proposals. Three real
multisig-owner approvals and execution remain necessary before opening.
The production reward operator requires its own explicit setup; the staging
private key must not be reused or copied into production.

Status: preparation started; no production deployment executed.
The user approved moving to production preparation with acknowledged residual risk.
This does not establish that unfinished features passed validation.

## Pinned starting points

- Canonical staging: 2d59ae1a79ca1788395a5a43a6a42f80ae2d2f2f plus uncommitted work.
- Legacy contract repository: 541fa2ab15be1e6e39d5dc000c0e1509cc0516ad.
  Do not select that repository as the new contract source.
- Production backend: 1c1367bd679f6cbb1635c79a9201ea7f0f03b98f.
- Production frontend: a461dc7e4d882adbde14b464a4b3dfaabb8e9641.
- All three production worktrees were clean during this inspection.

## Scope and preservation

Use canonical staging source with production-specific configuration. Never copy
Amoy addresses, mock USDT, staging database settings or the staging repair
implementation into production. Preserve existing production users, balances,
escrow, positions and history. No production reset is authorized by this record.
Use the existing production migration transition audit for partial cycles.
Its July inventory is historical evidence, not a current mainnet state snapshot.

## Approved business decisions

- Three founder representatives are distinct from eight founder payout wallets.
- ID1 distributions split equally across the eight payout wallets.
- Representative addresses supplied for production:
  0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A,
  0xb673c9D14Da920f187d25Cc793f1955a43284622,
  0x117C9258a95775Ecf448fd086D00cA22506Ea79d.
- Verify their F-Freedom registration before Freedom-Plus initialization.
- Monthly NFT distribution is automatic, with first-of-month 00:00 UTC cutoff
  and tier allocation 50/30/20. Batch completion is not instantaneous at cutoff.
- For the intended October 1 launch, first monthly period is November 1 (202611).
- Keep existing public functionality available. Early access/countdown applies
  only to new features, not the entire existing site.

## Evidence and unresolved work

Prior committed evidence covers live Amoy seven-level activation and NFT
membership. It does not certify the subsequently changed reward worker.
The current work record reports 35 targeted contract tests and five backend
schedule/snapshot tests passing. These were not rerun during this inspection.
The eight-founder split and automatic reward worker remain uncommitted and
undeployed. Worker integration, quiet-period snapshot catchup, storage upgrade
compatibility and frontend validation remain unresolved. Operator authority
includes publishing reward roots and budgets; it requires explicit governance
configuration and must not silently reuse a production deployer secret.

## Execution order

1. Finish and pin the candidate source, tests and generated ABIs in staging.
2. Package backend/frontend changes against the pinned production revisions;
   preserve production configuration and existing public functionality.
3. Refresh only migration-relevant mainnet state and verify storage layouts,
   eight payout addresses, governance and token configuration.
4. Prepare and simulate exact migration/deployment calldata before signing.
   Configure founder payout wallets atomically where required.
5. Deploy approved contracts; capture addresses, receipts and start blocks.
6. Update production API/worker/frontend to that same deployment manifest.
7. Verify activation, membership and projection consistency; then enable new
   features. Enable automatic rewards only after operator and snapshot checks.
8. Record release commits, hosted deployments and rollback instructions.

No transaction receipt or hosted release is implied by this preparation record.

## Mainnet preflight update

Read-only evidence: smart-contract/deployments-production-migration/production-layer-preflight-2026-10-01.json.
No transactions were sent. Observations are sequential reads, not a pinned-block snapshot.

- Chain: Polygon mainnet, 137. The configured backup HTTP provider responded.
- All three approved representatives are registered and have F-Freedom Level 1 active.
- Eight live founder payout wallets each have ratio 1250 (12.5%).
- Existing FGT is unpaused and operator configuration is unlocked. No FGT replacement
  or reset is required to authorize a new NFT membership contract.
- Live FGT owner is 0x785cC854ce9e13CE1140cbFD7C08620713E1711d.
  Its multisig requires three confirmations and a 120-second timelock.
- Deployer 0x884e48f9897E8633238747b608DD49dE12bF94df may submit proposals,
  but is not an owner and cannot supply the three required confirmations.
- The historical deployment manifest's owner must not override this live owner.

Production execution dependencies:

1. Build the mainnet deployment package against existing shared NFT/operations
   vaults. The staging deploy script creates separate vaults and is not suitable
   unchanged. The treasury NFTPoolVault source has an owner-only distribution
   interface, unlike the new reward distributor's vault interface; verify live
   vault wiring and resolve compatibility before signing a deployment package.
2. Prepare exact governance calldata for FGT membership authorization and any
   required shared-vault integration. Obtain the three owner confirmations.
3. Configure an explicitly approved reward operator, deploy and verify the new
   contracts, then publish one mainnet manifest to backend and frontend.
4. Only then enable production feature access and issue production invitations.

The launch-access source is committed at fb3223d and its staging Vercel build
passed. This is not evidence of a production deployment or financial-contract
upgrade. Production users, balances and data have not been reset.

The packaged candidate is now committed and pushed as 6cfd9b9.
The live shared-vault incompatibility and proposed governance sequence are
recorded in PRODUCTION_LAYER_GOVERNANCE_HANDOFF_2026-10-01.md. This is a remaining
production integration dependency, not a completed deployment.
