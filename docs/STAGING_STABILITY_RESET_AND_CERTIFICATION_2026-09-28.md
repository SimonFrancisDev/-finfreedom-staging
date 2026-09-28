# Staging Stability, Reset, and Certification

Date: 2026-09-28

## Objective

Create a clean staging system that reconciles blockchain, indexer, API, and UI state; uses three Freedom-Plus founder representatives; has predictable RPC usage; and can be promoted to production from recorded evidence.

## Confirmed problems and corrections

### Partial NFT/token state

The Freedom-Plus page coupled USDT, FGT, FPT, FPTr, membership, and reward reads. One rejected RPC call could abort the page or leave a mixture of stale and zero-looking values.

Implemented correction:

- Token and membership reads fail independently.
- Failed reads display Temporarily unavailable, never a false zero.
- Last verified values may remain visible with a verification warning.
- NFT writes are blocked until membership state is verified.
- One failed reward read cannot break the full NFT page.
- Freedom-Plus and NFT routes have a recovery screen instead of a black page.

### Missing orbit users

Every report must be compared at five layers: successful receipt and decoded event; contract position/cycle; indexed placement/checkpoint; API wallet-level-cycle response; UI owner/level/cycle filters. The first differing layer is the defect. Never fabricate a database row or hide a participant.

### Three founder representatives

The current four-wallet genesis is immutable. The wallet 0xeE192BE4884B064281Fa426F3d855fb339445B83 cannot be safely deleted from the existing deployment.

The fresh deployment uses exactly:

1. 0x3f6Bb1E6Bfeb9C52f763a197d27B580d7DE7f100
2. 0xDd78425335C0c698615845d94f9FeE7492266396
3. 0xf72873d6233B5e3dfbA6D1D8058BF90E990902f0

The removed wallet can later join normally. Historical manifests remain unchanged as evidence.

## Mandatory pre-reset gates

- Frontend install from committed lockfile and production build pass.
- Full Freedom-Plus contract tests pass.
- Three-representative genesis and first paid placement tests pass.
- Backend tests pass.
- Paid Amoy RPC deployment preflight passes.
- MongoDB, current manifests, addresses, and start blocks are backed up.
- ID1 and the three wallets receive written approval.
- No credential is committed.
- API and worker are suspended during reset and address transition.

## RPC policy

Use a paid/build-plan RPC for deployment, replay, and certification. Store credentials only in provider settings or ignored local files.

- Indexed API data is the normal source for history, orbit, activity, and aggregates.
- Browser RPC is limited to live wallet balances, transaction preflight/write, and post-write confirmation.
- API runs no indexer; one worker owns one shared WebSocket.
- Replay uses bounded chunks and rate limiting.
- Startup verification is rate-limited and cannot block health startup.
- Reconnect uses backoff and cannot crash the worker.
- Idle browser pages perform no continuous polling.

Record request counts for disconnected load, connected load, refresh, every activation, orbit, tokens, NFT mint/unlock/restore/change, and rewards. Unexplained repeated calls block release.

## Controlled reset

1. Freeze testing; suspend API and worker.
2. Export MongoDB and archive current manifests/state.
3. Pass tests and paid-RPC preflight.
4. Deploy the three-representative Freedom-Plus graph.
5. Validate owner, guardian, gateway, token operators, vaults, NFT links, engines, prices, payout rates, and genesis.
6. Record proxies, implementations, transactions, and deployment blocks.
7. Clear only projections for the replaced Freedom-Plus deployment.
8. Update API, worker, and frontend from one reviewed manifest.
9. Start worker alone; replay from the exact deployment block.
10. Require reconciliation to pass.
11. Start API with all indexers disabled; deploy frontend.
12. Run the certification matrix; resume testing only after it passes.

## Certification matrix

- Identity: direct sponsor input, referral URL, copy FFN ID/link, permanent sponsor.
- F-Freedom: levels 1-10, USDT, payouts, FGT available/locked, every placement.
- Freedom-Plus: atomic registration/Level 1, levels 2-7, USDT routes, FPT, FPTr, cycles, parents.
- Orbit: every level/cycle/owner, mobile zoom/pan/reset, inspector/table, chain-index-UI counts.
- NFT: no NFT; FGT-only, FPT-only, and mixed mint; upgrade; downgrade; safe unlock; eligibility-losing unlock; restore; invalid/excess unlock; insufficient FGT/FPT; independent FGT/FPT/membership RPC failures; proof failure; successful/already-claimed reward.

Each case must compare contract state, token balances, indexed events, API response, and UI text.

## Required evidence

Record commit SHA, deployment manifest, environment key names without values, test outputs, transaction hashes, before/after balances, decoded payouts/placements, reconciliation totals, desktop/mobile screenshots, RPC counts, limitations, and rollback point.

## Production transfer

Production receives only certified changes and uses separate wallets, RPC credentials, database, addresses, blocks, and approvals. This runbook plus the final manifest and evidence report are the production rollout inputs.

## Current status

- Frontend resilience: implemented locally; build blocked by incomplete local node_modules (missing picomatch).
- Three-representative contract/scripts: implemented locally.
- Contract dependency graph: Toolbox and unused Ignition sample removed; required plugins are explicit and pinned against Hardhat 2.26.3.
- Contract tests: not certified; Windows package extraction repeatedly left node_modules incomplete before Hardhat could run.
- Paid RPC HTTPS: verified on Polygon Amoy chain ID 80002 at block 48,785,231.
- Paid RPC WSS: verified on Polygon Amoy chain ID 80002 at block 48,793,638.
- Paid RPC still requires request-budget measurement before deployment and replay.
- Reset: not started.
