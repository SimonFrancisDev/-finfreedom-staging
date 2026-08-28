# Gate 3: Backend, Indexer, and API Parity

Status: implementation complete; staging redeploy certification pending.

## Objective

Make Freedom-Plus reads deterministic, confirmation-safe, recoverable, and aligned with the shared F-Freedom treasury configuration before frontend certification and tester onboarding.

## Pipeline Inventory

- Raw events: `FreedomPlusEvent`
- Checkpoints: `FreedomPlusSyncState`
- Projections: participants, level states, orbit positions, payments, and ledger entries
- Worker modes: explicit confirmed polling or event-driven WebSocket indexing with startup, confirmation, and reconnect recovery
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
3. Realtime mode incorrectly used a periodic HTTP recovery scan, defeating the WebSocket RPC-conservation design.
4. Startup did not verify the router's system-charge recipients against the shared vault configuration.
5. `SystemChargeSettled` can precede `LevelActivated` in a transaction, leaving ledger rows without participant wallets.

## Implementation

- Polling reconciliation requires every expected checkpoint to remain within the explicit `FREEDOM_PLUS_MAX_CHECKPOINT_LAG_BLOCKS` budget. Realtime reconciliation instead requires every healthy checkpoint to cover the latest indexed event, because quiet chains must not trigger HTTP scans merely to advance empty checkpoints.
- WebSocket subscriptions trigger confirmation-delayed catch-up; unconfirmed logs are never projected.
- Realtime mode performs one startup catch-up, confirmation-delayed event recovery, and reconnect catch-up. It does not create a periodic HTTP scan. `SYNC_POLL_INTERVAL_MS` applies only to explicit polling mode.
- Startup requires `NFT_POOL_VAULT_ADDRESS` and `OPERATIONS_VAULT_ADDRESS` when Freedom-Plus is enabled and verifies both router getters.
- Level projection backfills matching system-charge ledger rows by activation ID.
- Every complete sync performs an idempotent historical wallet reconciliation for old blank system-charge rows.
- Confirmed scans use the shared RPC limiter, concurrency queue, retry/cooldown policy, and provider rotation.
- HTTP JSON-RPC requests have a bounded RPC_REQUEST_TIMEOUT_MS (default 30 seconds), preventing a hung request from permanently holding the indexer pass lock.

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

## Pre-Fix Staging Evidence (2026-08-28)

- API process: indexing disabled.
- Worker process: indexing enabled; 48 F-Freedom listeners and 16 Freedom-Plus listeners connected.
- Reconciliation matched 47/47 participants, 271/271 positions, and 242/242 payments.
- All 16 checkpoints advanced from block 46,062,689 to 46,063,246.
- The repeated advancement proved recovery correctness but also exposed the unwanted interval scan removed by this revision.
## Staging Redeploy Acceptance

Redeploy both API and worker from the same commit, then verify:

1. API startup prints Freedom-Plus `systemVaults` with the two shared addresses.
2. API health shows indexing disabled.
3. Worker health shows indexing enabled and realtime connected.
4. `/api/freedom-plus/reconciliation` reports `checkpointMode: event-driven` and passes when all expected checkpoints are healthy and cover the latest indexed event.
5. A new confirmed Freedom-Plus event advances checkpoints after the confirmation delay; a quiet chain causes no recurring HTTP scans.
6. The known tester still shows levels 1, 2, and 3 and all supplied transactions.
7. Participant ledger responses include system-charge rows attributed to the participant wallet.
8. Restarting the worker does not duplicate raw events, projections, or ledger entries.

## Production Rollout Requirements

- Use the canonical contract and shared-vault addresses above.
- Run exactly one active Freedom-Plus indexing worker unless lease ownership is explicitly configured and verified.
- Keep indexing disabled in API/web processes.
- Set a healthy WebSocket RPC for live indexing and an HTTP RPC only for startup, event-confirmation, reconnect recovery, reconciliation, and exceptional replay.
- Capture pre-migration counts, deploy, allow confirmed catch-up, run reconciliation, compare counts, and archive the result.
- Do not certify frontend data accuracy until this gate's staging acceptance checks pass.
