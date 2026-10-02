# Production Layer Execution

## 2026-10-02 safety hold

The paused mainnet deployment is complete, but its Freedom-Plus settlement
router contains the inactive-orbit prefill defect documented in
`FREEDOM_PLUS_INACTIVE_ORBIT_INCIDENT_2026-10-02.md`. Do not open production
Freedom-Plus or early access until the corrected router implementation has been
storage-validated, approved by the Guardian, executed through governance and
verified on chain. Existing production F-Freedom remains unchanged.

Polygon storage validation has passed and corrected implementation
`0x668536AE74B229a3f33A2f46fbFc91BbC67aC799` is deployed but not active.
Governance submission and execution remain required.

## Current result

Superseding checkpoint: mainnet deployment started from commit 29cac9a using
the approved Polygon RPC, at 220 gwei with a cumulative 15-POL guard.
The real transaction journal is production-layer-deployment.json; its status
is authoritative. At this checkpoint deployment is incomplete and one
transaction is pending following a base-fee increase above 220 gwei.
Do not restart deployment or use partial addresses to open new features.
The refreshed passing rehearsal used 39,897,538 gas and binds script/artifacts.
The older funding and rehearsal observations below are retained as history,
not current deployment status. Existing production data has not been reset.

The deployment and five target governance calls passed on a local Polygon fork.
Evidence: smart-contract/deployments-production-migration/production-layer-fork-rehearsal.json.
The report is explicitly marked rehearsal=true and is NOT a mainnet deployment.
Its addresses must never be copied into hosted production configuration.

The rehearsal verified:

- Fifteen new proxies deployed and configured; the existing operations vault reused.
- ID1 and exactly three representatives initialized, all seven Plus levels active,
  54,650 FPT each and zero FPTr.
- New public registration remained paused during initialization; the gateway
  was configured before owner-only genesis to validate permanent sponsors.
- New registration, manager and membership paused before ownership handoff.
- All new contract owners set to the existing production multisig.
- FGT authorization and existing LevelManager recipient update callable by governance.
- Opening calls succeeded locally after integration; historical pool balance unchanged.

The owner calls were simulated by local impersonation. Real multisig approvals
and execution remain outstanding. This is focused deployment-wiring evidence,
not a new full production activation or monthly-reward acceptance test.

The configured RPC lacked historical state. A public Polygon fallback supported
the local fork. No production RPC environment variables were changed.

## Gas and funding

Rehearsal gas across deployment, configuration and five simulated governance
calls: 39,863,886 gas. At the observed quote of 280.509350827 gwei, a 25% buffer
gives a deployment budget of 13.977740979126917152 POL. The deployer held
5.354428239655199348 POL. Fees can change; refresh the quote before deployment.

No mainnet deployment was started because the budget exceeded available funding.
The deployment script now checks funding and requires an explicit gas price,
with a default 50-gwei cap. Raising the cap requires an explicit operator setting;
do not silently raise it. The budget guard was added after the recorded fork run;
the deployment and governance transaction sequence did not change.

## Commands and records

Run from staging-environment/smart-contract using the approved production signer
and RPC in process environment; never paste keys into documentation or command logs.

- Read-only preflight:
  npx hardhat run scripts/prepareProductionLayer.js --network polygon
- Local rehearsal: set PRODUCTION_LAYER_FORK_REHEARSAL=true and use --network hardhat.
- Paused deployment: unset the rehearsal flag, set PRODUCTION_LAYER_EXECUTE to
  DEPLOY_PAUSED_LAYER, set reviewed POLYGON_GAS_PRICE in wei, and run on polygon.
- The real deployment writes production-layer-deployment.json after each step.
  If this file exists, the script refuses to redeploy. Inspect and reconcile any
  partial/pending transactions; do not delete it and start over.
- Preview integration proposals:
  npx hardhat run scripts/submitProductionLayerIntegration.js --network polygon
- After reviewing the preview, set PRODUCTION_LAYER_SUBMIT=INTEGRATION_ONLY to
  submit only FGT authorization and the new shared-pool recipient update.
  Existing matching pending proposals are reused, not submitted again.
- Submission records go to production-layer-proposals.json. Opening actions are
  excluded from this submitter.

## Owners

Three owners each call approveTransaction(proposalId) on the existing multisig.
An owner then calls executeTransaction(proposalId) after sufficient approvals and
the timelock. The 120-second timer starts at submission, not at the third approval.
Submission alone changes no pool wiring or token permissions.

Review target, zero native value, decoded arguments and new deployment addresses.
These proposals do not move the historical pool's funds. Do not execute opening
actions until integration, hosted configuration and feature readiness are verified.

Superseding status: the paused mainnet layer was deployed and integration
proposals 115 and 116 were approved and executed. Production backend code was
promoted in commit `05c84ec`; production frontend code was promoted in commit
`da73cca`. Hosted backend wiring, reward-operator readiness, the corrected
router upgrade and early-access opening remain outstanding.
