# Production Layer Governance Handoff

## 2026-10-02 correction required before opening

The mainnet layer is deployed and still paused. Integration proposals 115 and
116 were executed. A subsequently confirmed Freedom-Plus router defect allowed
inactive-level orbit positions to be recorded even though payment recipients
were skipped correctly. Governance must install the corrected router described
in `FREEDOM_PLUS_INACTIVE_ORBIT_INCIDENT_2026-10-02.md` before any production
Freedom-Plus access is opened.

Status: mainnet deployment is in progress from commit 29cac9a. Read the real
production-layer-deployment.json journal for confirmed addresses and receipts.
Integration proposals have not yet been submitted at this checkpoint. No pool
transfer, production database reset or hosted environment update has occurred.

## Verified existing system

| Role | Mainnet address |
| --- | --- |
| Governance | 0x785cC854ce9e13CE1140cbFD7C08620713E1711d |
| F-Freedom LevelManager | 0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53 |
| Current settlement router | 0xC1F7d1E68A624B896DA2881AFfC7De5B18a75B44 |
| Shared NFT pool | 0xf8F60Da42681b73DFeCa7731E78b29C8707C184b |
| Shared operations vault | 0x3ee9B4913e175c15B2Ef76Ac352B6737210248Fb |
| FGT | 0x615201edaddB5CFD839Cc4eE693Dc464F6E2B5E4 |
| USDT | 0xc2132D05D31c914a87C6611C10748AEb04B58e8F |

Evidence is recorded in
smart-contract/deployments-production-migration/production-layer-preflight-2026-10-01.json.
The current router differs from the old migration script's historical router;
do not run that historical migration package for this additive rollout.

## Blocking compatibility finding

The current NFT pool answers usdt() and owner(), but distributor() and
unreservedBalance(address) revert. The repository's legacy NFTPoolVault interface
does not provide reserveRewards/disburse, which the new reward distributor
requires. The automatic worker also requires unreservedBalance.
Do not configure the new distributor or worker against this incompatible pool.

At the recorded observation, the pool held 3306240000 USDT base units
(3,306.24 USDT). A balance is not proof that all funds are uncommitted.
No existing funds may be drained, reassigned or included in new monthly budgets
without separately reconciling existing commitments and obtaining approval.

## Proposed additive integration

This path requires the user's shared-pool migration decision before execution.

1. Deploy the canonical Freedom-Plus and NFT contracts with a compatible shared
   NFT vault. Reuse the existing operations vault; do not create a separate
   Freedom-Plus operations treasury.
2. Configure the new Plus router to use that same compatible NFT vault.
3. Prepare the LevelManager updateChargeRecipients(newSharedNftVault,
   existingOperationsVault) proposal. Verify support and simulate this exact
   operation against the live implementation before submitting it.
4. Prepare FGT setAuthorizedOperator(newMembership, true).
5. Configure the new vault's distributor and explicitly approve a dedicated
   reward operator. Do not silently assign the deployer as the hosted operator.
6. Transfer new contract ownership to the current governance address and verify
   both programs' recipient addresses before opening new-feature access.
7. Retain the historical pool and its accounting intact. A later funds movement
   requires a separate approved amount and settlement of any old obligations.

Actual calldata is generated from the completed real deployment manifest.
This document is not an executable transaction package and grants no extra
authority to move existing funds.

## Required signatures and opening conditions

The live multisig requires three of its four owners and a 120-second timelock.
The deployment wallet may submit proposals, but cannot provide owner approvals.
Obtain confirmation of owner availability before announcing a completion time.

Keep new-feature access closed until the approved wiring is executed, the
frontend/API/worker use one mainnet manifest, and a focused integration check
passes. A countdown reaching its deadline must not be used to expose incomplete
financial functionality. Existing production F-Freedom access stays unchanged.
