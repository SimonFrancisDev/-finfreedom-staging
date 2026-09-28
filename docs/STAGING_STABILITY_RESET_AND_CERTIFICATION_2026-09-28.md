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

The current genesis initializer is one-time and has no representative-removal operation. These are upgradeable contracts, but an upgrade does not erase historical placements, balances, or payouts. The wallet 0xeE192BE4884B064281Fa426F3d855fb339445B83 must not be hidden or deleted from existing indexed history.

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
4. Resolve the reset scope for both programs, FGT operators, NFT membership, and shared vaults before deploying the three-representative graph. A Freedom-Plus-only replacement is not sufficient if existing FGT operator locks or vault-distributor locks prevent the new NFT contracts from operating. Do not execute a partial reset until this dependency preflight passes.
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

- Frontend build at bbc9f98: passed on clean GitHub Actions Linux. Local node_modules remains incomplete; local build is not a verified result.
- Three-representative contract/scripts: implemented locally.
- Contract dependency graph: Toolbox and unused Ignition sample removed; required plugins are explicit and pinned against Hardhat 2.26.3.
- First clean contract run at bbc9f98: 155 passing, 1 failing. The descendant fixture retained the old representative B branch after changing the first paid position to representative A. The fixture is corrected; rerun required.
- Paid RPC HTTPS: verified on Polygon Amoy chain ID 80002 at block 48,785,231.
- Paid RPC WSS: verified on Polygon Amoy chain ID 80002 at block 48,793,638.
- Paid RPC still requires request-budget measurement before deployment and replay.
- Clean Linux CI: added for frontend regression tests/build, backend tests/syntax, and the complete local Hardhat suite. No staging credentials or live RPC are required.
- Reset: not started.

## Continuation findings and verification

- Initial CI evidence: https://github.com/SimonFrancisDev/-finfreedom-staging/actions/runs/36460093966 (commit bbc9f98).
- Initial backend result: 12 tests passed; the task-service test could not import configuration without MONGODB_URI. Added an explicit test-only preload with loopback endpoints and dummy addresses, rather than supplying staging secrets.
- Activation dialog had undefined InlineAlert, Info, securityAccepted, and setSecurityAccepted references. Imported the warning component and removed the already-requested obsolete confirmation explanation/checkbox. This is a reproducible source defect; attribution to a specific tester still requires browser verification.
- Skipped token reads previously fabricated successful zero results; skipped membership reads fabricated a no-NFT result. Skipped and failed reads now retain only same-wallet previously loaded values, otherwise null.
- Wallet changes remount account-local state. Request generations reject late refresh/tab responses; orbit requests clear the previous selection and reject stale responses.
- NFT actions are disabled while membership is unknown, refreshing, disconnected, or on an unverified/wrong network. Token parsing now happens within the transaction error handler.
- NFT membership shows available FGT and FPT independently. Unverified membership does not show a false zero commitment, owned NFT, or active tier.
- Unlock preview uses six-decimal integer arithmetic, including invalid, excessive, negative, and micro-unit tests. Sabina's 5100 FGT + 600 FPT example leaves 100 FGT + 600 FPT after a 5000 FGT unlock and loses eligibility. This arithmetic test does not certify her live transaction.
- Reward-period failure is distinct from an empty reward history. Proof/claim reads run on the rewards view, not every NFT view. Audit/reconciliation endpoints are requested only on the activity view.
- Preserved legacy four-representative genesis decoding separately from the generated three-representative ABI; tests decode both event signatures.
- RPC reduction is not quantified. No 98-99% savings claim is supported yet.
- Remaining release gates: passing rerun, browser/mobile scenarios, live receipt/index/API reconciliation for reported wallets, measured RPC budget, backup verification, and the complete reset dependency preflight.
- Rerun cb1aee8: all 15 frontend regression tests and backend tests passed. The production build exposed an incorrect InlineAlert import added in this batch; corrected to the existing components/ui export before certification.
- Added a post-genesis test activating all seven paid levels, checking exact USDT spend, custody conservation, FPT issuance, and ID1 P4 recycle rewards/reserve consumption.
- The additional test initially expected full-price FPTr. That test expectation was wrong: Gate 1 section on utility tokens and FreedomPlusConfig define half-price FPTr. Corrected expected P4 Level 5/6 total to 2025 + 6075 = 8100 FPTr; no payout or contract rule was changed.
- Added server-render tests of the actual NFT components for unknown/empty membership, mixed commitments, independent balance failures, disabled unlock/restore, and unavailable reward history. These complement unit tests; they are not interactive browser tests.

### Read-only Amoy reset dependency check

At 2026-09-28T18:25:22.850Z, three sequential requests to the supplied build-plan endpoint confirmed:

- Chain ID: 80002 (Polygon Amoy).
- Reported FGT contract 0x53a11f9c333Cf8f94E3A9Bd642dcf5168E7280E0: operatorConfigLocked() = false.
- Reported NFT pool 0x6e127653D5c2032442fa7832b70967fbc13690aE: distributor() = 0x437a7bb9f05a19f6b095cd0038ebc77cfbf983df.

No signer, transaction, database connection, reset, or environment update was used. This is a narrow read-only check, not the full deployment preflight, a live environment parity check, or an RPC consumption benchmark.
