# Gate 3: Backend, Indexer, and API Parity

Status: implementation complete; staging redeploy certification pending.

## Objective

Make Freedom-Plus reads deterministic, confirmation-safe, recoverable, and aligned with the shared F-Freedom treasury configuration before frontend certification and tester onboarding.

## Pipeline Inventory

- Raw events: `FreedomPlusEvent`
- Checkpoints: `FreedomPlusSyncState`
- Projections: participants, level states, orbit positions, payments, and ledger entries
- Worker modes: confirmed polling and WebSocket-triggered confirmed recovery
- APIs: status, reconciliation, participants, activations, orbits, payments, events, gateway checks, and shared-page summaries

## Baseline Evidence

Live staging was inspected before this gate:

- 47 Freedom-Plus participants
- 1,791 raw Freedom-Plus events
- 16 target checkpoints at block 46,057,195
- chain head 46,058,727; confirmed head 46,058,725
- old reconciliation incorrectly passed while checkpoints were about 1,530 blocks stale
- API process correctly had indexing disabled; worker had indexing enabled

Tester `0x296238e950ef0066D2119230Bf0eb3aDEBc94882` was indexed as participant 47 with F-Freedom gateway eligibility and Freedom-Plus levels 1, 2, and 3 active. Its supplied transactions were represented. An empty personal level-1 orbit is valid when placements belong to upstream owners; the frontend must still render the unfilled orbit structure.

## Defects Fixed

1. Reconciliation compared checkpoints with the latest stored event instead of the confirmed chain head.
2. WebSocket logs were projected before confirmation, allowing reorg-corrupted projections.
3. Realtime mode had no periodic confirmed catch-up during quiet periods or missed subscriptions.
4. Startup did not verify the router's system-charge recipients against the shared vault configuration.
5. `SystemChargeSettled` can precede `LevelActivated` in a transaction, leaving ledger rows without participant wallets.

## Implementation

- Reconciliation now requires every target checkpoint to reach the confirmed head.
- WebSocket subscriptions only trigger confirmed catch-up; unconfirmed logs are never projected.
- Realtime mode also runs periodic recovery using `SYNC_POLL_INTERVAL_MS`.
- Startup requires `NFT_POOL_VAULT_ADDRESS` and `OPERATIONS_VAULT_ADDRESS` when Freedom-Plus is enabled and verifies both router getters.
- Level projection backfills matching system-charge ledger rows by activation ID.
- Every complete sync performs an idempotent historical wallet reconciliation for old blank system-charge rows.

## On-Chain Verification

Read-only verification passed on Polygon Amoy:

- router: `0x5Cc0594a2d275c9CfaC38F5Ef6E03e84f0E05B63`
- shared NFT Pool Vault: `0x1AF1e23b2820935AF9D8FD4DE0024B79E6119aaA`
- shared Operations Vault: `0x8C53D90348A4C73C73db2E21dF07DAa29144A823`

The newer Freedom NFT reward-distribution vault remains separate from the shared system-charge NFT treasury by design.

## Validation Completed

- Node syntax checks passed for all six modified backend modules.
- `git diff --check` passed; only Windows line-ending notices were emitted.
- Read-only contract startup verification passed against the staging RPC.
- The public fallback RPC was unsuitable for this verifier because its free tier rejects batches larger than three requests; this does not indicate an application defect.

## Staging Redeploy Acceptance

Redeploy both API and worker from the same commit, then verify:

1. API startup prints Freedom-Plus `systemVaults` with the two shared addresses.
2. API health shows indexing disabled.
3. Worker health shows indexing enabled and realtime connected.
4. `/api/freedom-plus/reconciliation` passes only when every checkpoint is at or above the returned confirmed head.
5. Checkpoint lag remains within the configured confirmation and polling interval.
6. The known tester still shows levels 1, 2, and 3 and all supplied transactions.
7. Participant ledger responses include system-charge rows attributed to the participant wallet.
8. Restarting the worker does not duplicate raw events, projections, or ledger entries.

## Production Rollout Requirements

- Use the canonical contract and shared-vault addresses above.
- Run exactly one active Freedom-Plus indexing worker unless lease ownership is explicitly configured and verified.
- Keep indexing disabled in API/web processes.
- Set a healthy HTTP and WebSocket RPC pair and retain periodic recovery.
- Capture pre-migration counts, deploy, allow confirmed catch-up, run reconciliation, compare counts, and archive the result.
- Do not certify frontend data accuracy until this gate's staging acceptance checks pass.
