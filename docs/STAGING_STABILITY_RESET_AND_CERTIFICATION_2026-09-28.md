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

- Frontend build and 21 regression/render tests at 1ff05fc: passed on clean GitHub Actions Linux. Local node_modules remains incomplete; no local preview or local full build was verified.
- Three-representative contract/scripts: committed and pushed; not deployed. Existing on-chain representatives remain unchanged.
- Contract dependency graph: Toolbox and unused Ignition sample removed; required plugins are explicit and pinned against Hardhat 2.26.3.
- Full contract suite at 1ff05fc: 157 passing, including three-representative genesis, descendant routing and all seven first paid levels with exact token/custody checks.
- Backend suite at 1ff05fc: 16 passing; syntax checks passed.
- Paid RPC HTTPS: verified on Polygon Amoy chain ID 80002 at block 48,785,231.
- Paid RPC WSS: verified on Polygon Amoy chain ID 80002 at block 48,793,638.
- Paid RPC still requires request-budget measurement before deployment and replay.
- Clean Linux CI: added for frontend regression tests/build, backend tests/syntax, and the complete local Hardhat suite. No staging credentials or live RPC are required.
- Reset: not started.

### Verified code checkpoint

- Code commit: 1ff05fc34701491a4cc9596d325443f2988fb06f, pushed to staging main.
- Passing CI: https://github.com/SimonFrancisDev/-finfreedom-staging/actions/runs/36465932813.
- Frontend job 109075889785: 21 tests, zero failures; build passed.
- Backend job 109075890226: 16 tests, zero failures; syntax passed.
- Contract job 109075890360: 157 passing, including the added post-genesis accounting case.
- This evidence covers clean installs, local simulated contracts, regression logic, and server-rendered NFT states. It does not cover interactive mobile wallets, production, or live indexing completeness.
- Dependency audit findings have not been remediated by this batch. The initial CI backend install reported 9 vulnerabilities; passing tests do not clear that security gate.

### Next checks, in order

1. Verify Render API/worker and Vercel are actually serving the intended staging commit, chain, addresses, and RPC configuration.
2. Exercise tester-wallet activation, NFT unlock/restore, balance failures, wallet switching, and mobile orbit controls; retain screenshots and transaction receipts.
3. Compare reported missing placements and balances through receipt, contract state, indexer, API, and UI; repair only proven gaps.
4. Measure connected, disconnected, idle, refresh, transaction and reconnect RPC usage. Set a budget from measurements, not a promised percentage.
5. Verify backups and the full reset manifest, shared vault/token dependencies, ownership and deployer permissions before resetting anything.

Production files, production deployment, live database contents and on-chain state were not changed by this continuation. Git pushes may trigger existing staging deployment integrations; their live outcome remains to be checked.

## Continuation findings and verification

- Initial CI evidence: https://github.com/SimonFrancisDev/-finfreedom-staging/actions/runs/36460093966 (commit bbc9f98).
- Initial contract run: 155 passing and one failing descendant fixture that retained the old representative B branch. Corrected the expected branch to representative A after verifying the new first paid position.
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

### 2026-09-29 three-wallet balance investigation

See [the three-wallet evidence report](STAGING_THREE_WALLET_BALANCE_CHECK_2026-09-29.md)
for pinned-block reads, successful activation receipts, public API comparison,
deployed frontend RPC checks and remaining UI reproduction limits.

- Wallet `0x296238e950ef0066d2119230bf0eb3adebc94882`: Level 1 active in both
  programs; 10 available FGT, 50 available FPT, neither locked. Freedom-Plus
  activation and FPT issuance are present in the public participant API.
- Wallets `0x884e48f9897e8633238747b608dd49de12bf94df` and
  `0x21f9edb0ce6b79afa98de14b03678cb29bc4859c`: unregistered in both current
  staging registration contracts; zero balances in the current FGT/FPT tokens.
- Supplied worker logs now show the new build-plan WebSocket host. The deployed
  frontend still contains the old RPC host, which nevertheless returned the
  correct first-wallet balances during direct tests.
- The exact reported screen is needed to distinguish a false zero wallet
  balance from correctly zero locked-token metrics. No UI root cause is yet
  proven. No reset, chain write, database repair or production change was made.

### 2026-09-29 direct tester checks and focused corrections

The supplied screenshot resolves the first wallet's zero report: the metric
was **NFT qualification locked**, not its available wallet balance. Its 10 FGT
and 50 FPT are available and neither is locked. The NFT header now separates
available FGT, available FPT, and the NFT-locked split. It no longer presents
only Freedom-Plus progression in that NFT summary.

Direct read-only checks completed at 2026-09-29T09:00:02.221Z against the
authorized build-plan Amoy endpoint. Chain ID 80002 and block 48,849,960 were
fixed before reading the wallets or simulating an action.

| Wallet | F-Freedom checked levels | Freedom-Plus | Mock USDT | POL |
| --- | --- | --- | --- | --- |
| 0xf0152a2490a854712fae8fd32ffcd9729082a09d | 1 and 10 active | Registered; 1 and 2 active | 244653 | 0.770130158257022665 |
| 0x0de1b6f15fe8e5cf7fbba2cd4c576357ececa962 | 1 and 10 active | Registered; 1 active, 2 inactive | 59800 | 9.948492808657828555 |
| 0x31f9a0b00e75456571f77f2fd806479433494e9b | 1 active, 10 inactive | Not registered | 199990 | 9.93297262907717408 |

Sabina's first wallet:

- Membership token 9, Foundational tier, reward eligible.
- Membership locks are 5100 FGT and 600 FPT, matching both token contracts.
- FGT total 10230, locked 5100, hence available 5130.
- FPT total 650, locked 600, hence available 50.
- An eth_call from her wallet to the current NFT contract for
  unlockQualification(5000000000, 0) succeeded with result 0x.
- This proves the current contract allows the reported 5000 FGT unlock.
  It does not identify the cause of her earlier failed wallet transaction;
  that transaction hash and receipt are still needed.
- The unlock would leave 100 FGT + 600 FPT and deactivate reward eligibility,
  without deleting the NFT. No real unlock was sent.

Sabina's second wallet:

- Activation simulation for Freedom-Plus Level 2 reverts with "no allowance".
- The first diagnostic checked allowance to registration, which is not the
  spender. A separate correction checked the actual level manager
  0x9dF6E3b6F37e67e6A0215683303a5cfFe9b1f177 and confirmed zero allowance.
- Simone's allowance to that same level manager is also zero.
- The frontend already approves the level manager before activation. Zero
  allowance is a normal two-step flow, not a reason to disable Continue.

Confirmed frontend defect and correction:

- The activation modal parsed a locale-formatted USDT balance using Number()
  after removing commas. Italian 59800 is displayed as 59.800 and was compared
  as 59.8, incorrectly blocking a 150 USDT action. The same approach could
  round a just-insufficient balance up before comparing.
- Eligibility now uses the raw bigint balance and exact required token units.
  Failed/skipped balance reads cannot authorize a transaction using cached
  display text. Wallet, network, busy state, registration and previous-level
  prerequisites are checked by the same predicate in the button and handler.
- This reproduces a concrete locale-dependent defect consistent with the
  Italian testers' report; their browser locale/session was not inspected.
- NFT mint, tier changes, unlock and restoration now use the existing buffered
  transaction helper instead of discarding an explicit gas estimate and asking
  the wallet to estimate again. This is hardening, not proof of the historical
  unlock failure's cause.
- NFT transaction status is also visible for an F-Freedom-only participant.
- Membership no longer requests unused FPT total and locked reads. Its header
  uses available balances plus the authoritative membership lock split.

Verification for this patch:

- Local wallet-read/activation regression suite: 8 passed, zero failures.
- Includes Italian/English/French/German display formats, unknown balances,
  exact threshold, one-micro-unit insufficiency, partial reads and wallet races.
- Direct check budget: 41 RPC requests (38 initial, 2 corrected spender reads,
  1 decoded activation revert); no history scan or broadcast.
- Full CI/build and live-browser confirmation are tracked below when complete.
- No database reset, fresh deployment or representative removal has occurred.
  The reset remains staging-only and conditional on completing the reported
  issue checks and preserving a verified backup. A database-only wipe cannot
  reset old contract balances, placements, or genesis representatives.

### Verification of ceb8462

- Code commit: ceb846225748b582968004767c2e7ff727aa10a6, pushed to staging main.
- CI: https://github.com/SimonFrancisDev/-finfreedom-staging/actions/runs/36551316801.
- Frontend production build/tests: passed (job 109349903265).
- Backend tests/syntax: passed (job 109349903304).
- Smart-contract suite: passed (job 109349903070).
- Local interactive browser/mobile verification has not been performed.

The orbit comparison initially failed locally on the build-plan endpoint
(fetch failure, then timeout). The repository's public Amoy fallback failed
DNS resolution. The previously authorized old QuickNode endpoint then worked.
No deployed RPC settings were changed, and these failures alone do not prove
a provider-wide outage or exhausted credits.

At block 48,854,289 on chain 80002, completed 2026-09-29T10:12:23.159Z,
the following current-cycle comparisons all passed:

| Orbit owner | Level | Cycle | On-chain occupied | Indexed occupied |
| --- | --- | --- | --- | --- |
| 0x3a596f67585f27cfd7f449fec0a92b7bf34b1df5 | 1 | 0 | 3 | 3 |
| 0x3a596f67585f27cfd7f449fec0a92b7bf34b1df5 | 2 | 0 | 2 | 2 |
| 0xf0152a2490a854712fae8fd32ffcd9729082a09d | 1 | 0 | 1 | 1 |
| 0xf0152a2490a854712fae8fd32ffcd9729082a09d | 2 | 0 | 0 | 0 |
| 0xf0152a2490a854712fae8fd32ffcd9729082a09d | 3 | 0 | 0 | 0 |

For each occupied indexed slot, positionAt matched participant, structural
parent, activation ID, placement ID, amount, kind and financial flag. Slot
numbers were unique and the count matched cycleState.filledPositions.

- Anthony Level 1: slot 1 Sabina (0xf0152a2490a854712fae8fd32ffcd9729082a09d);
  slot 2 0x4a0295d7d9c007a7ab6688a8be54be52a9ab1e8a;
  slot 4 0x0de1b6f15fe8e5cf7fbba2cd4c576357ececa962.
- Anthony Level 2: slots 1 and 2 contain the same first two wallets.
- Sabina Level 1: slot 1 contains 0x0de1b6f15fe8e5cf7fbba2cd4c576357ececa962.
- Successful comparison used 18 RPC requests and five indexed orbit API reads.
  API-internal RPC usage was not measured. There was no full-history scan.
- These five current Freedom-Plus orbits are reconciled, not every historical
  cycle, F-Freedom orbit, or browser-rendered diagram.

Reset remains pending. Local staging configuration identifies chain 80002 and
database finfreedom-staging; the fresh-vault/output-directory settings are
prepared. The only existing backup found is dated August 29, so it is not a
verified pre-reset backup of current testing data. Both staging services must
be suspended for the final backup and coordinated transition. Production has
not been modified; no old balances, placements or representatives were erased.

The final Vercel HTML/bundle check timed out locally. Therefore the pushed code
and passing CI are verified, but this continuation does not certify that the
live frontend is serving ceb8462. No interactive phone-wallet signing test was
performed. The user was asked to confirm suspension of both staging services
before the final reset backup; no suspension is assumed.

### Activation feedback follow-up

See [the September 29 activation report](STAGING_ACTIVATION_FEEDBACK_2026-09-29.md)
for the direct activation flow, shared premium-stage names, regression tests,
and the full 10/3 Sabina activation check at block 48,859,339.
The immediate next step is frontend deployment verification, not a reset.
Keep staging services running until the remaining checks and reset backup are ready.
