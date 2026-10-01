# Production Layer Execution

## Current result

The deployment and five target governance calls passed on a local Polygon fork.
Evidence: smart-contract/deployments-production-migration/production-layer-fork-rehearsal.json.
The report is explicitly marked rehearsal=true and is NOT a mainnet deployment.
Its addresses must never be copied into hosted production configuration.

The rehearsal verified:

- Fifteen new proxies deployed and configured; the existing operations vault reused.
- ID1 and exactly three representatives initialized, all seven Plus levels active,
  54,650 FPT each and zero FPTr.
- New public registration remained unavailable during initialization because the
  F-Freedom gateway was unset until genesis completed.
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

Still outstanding: real deployment, proposal submission/owner execution,
dedicated monthly reward operator approval, production API/worker/UI promotion,
hosted launch configuration and production early-access invitation.
