# FFN Master Production Readiness Guide

## 1. Purpose

This is the canonical checklist for changing production across the complete Fin Freedom Network stack:

- F-Freedom
- Freedom-Plus
- Freedom NFT
- Smart contracts and multisig governance
- Backend API, event indexers, database projections, and reconciliation
- Frontend interfaces and wallet transactions
- Deployment, verification, monitoring, and recovery

No production change is approved from memory, chat history, an old environment file, or a successful transaction alone. Every release must satisfy the evidence gates in this guide.

## 2. Source-Of-Truth Order

When two sources disagree, use this order:

1. Founder-approved written rules and signed decisions.
2. Canonical protocol rule documents in this repository.
3. Smart-contract source at the exact release commit.
4. Automated tests compiled from that same commit.
5. Staging chain state from the certified deployment.
6. Production chain state at a pinned block.
7. Backend database projections reconciled against chain state.
8. Frontend presentation.

The blockchain is the financial and structural execution truth. The database and frontend are read models and must never redefine contract behavior.

## 3. Canonical Evidence Register

### F-Freedom

- `smart-contract/test-plans/EXPECTED_PROTOCOL_BEHAVIOR.md`
- `smart-contract/test-plans/PROTOCOL_INVARIANT_MATRIX.md`
- `smart-contract/test-plans/CANONICAL_STRUCTURAL_PROTOCOL_AUDIT.md`
- `smart-contract/test-plans/PRODUCTION_MIGRATION_TRANSITION_AUDIT.md`
- `smart-contract/test-plans/PRODUCTION_STATE_CLASSIFICATION.md`
- `smart-contract/test-plans/FRESH_PRIORITY_TEST_CHARTER.md`

### Freedom-Plus And Freedom NFT

- `docs/freedom-plus/MASTER_IMPLEMENTATION_PLAN.md`
- `docs/freedom-plus/STAGING_CERTIFICATION.md`
- `docs/freedom-plus/BACKEND_ENV.md`
- `docs/freedom-plus/FRONTEND_ENV.md`

### Deployment And Migration Evidence

- `smart-contract/deployments-staging/`
- `smart-contract/deployments-freedom-plus-staging/`
- `smart-contract/deployments-production-migration/`
- `smart-contract/migration-packages/`
- `smart-contract/migration-audits/`
- `smart-contract/test-reports/`

Each production release must create a release-specific manifest. “Latest” files are conveniences, not sufficient historical evidence.

## 4. Rule Freeze Gate

Before implementation or deployment, freeze a versioned rule matrix containing:

| Domain | Required decisions |
| --- | --- |
| Identity | registration gateway, shared referral ID, permanent sponsor, wallet replacement policy |
| Placement | orbit topology, line and position order, canonical structural parent, repeated occurrences |
| Eligibility | exact-level requirement, skipped-upline hierarchy, ID1 terminal fallback |
| Payments | every component, percentage, system charge, owner role, routed role, fallback role |
| Recycle | qualifying arrivals, reserve accumulation, cycle closure, sponsor-based re-entry, self-payment fallback |
| Upgrade | sequential activation, F-Freedom auto-upgrade, Freedom-Plus manual-only progression |
| Tokens | FGT, FGTr, FPT, FPTr issuance, locking, burning, and permissions |
| NFT | qualification, mint, upgrade, immediate freeze, restore, downgrade, monthly reward execution |
| Genesis | ID1 and representative placement, activated levels, token grants, and zero-income initialization |

Every row must be marked `APPROVED`, linked to evidence, and translated into tests. An unresolved row blocks deployment.

## 5. Program Invariants

### F-Freedom

- Registration activates Level 1 and permanently records the sponsor.
- Levels are sequential and use the configured P4, P12, and P39 engines.
- Canonical structural placement cannot be replaced by a payment-record placement.
- Exact-level eligibility is checked for every routed recipient.
- An inactive candidate is skipped through the approved permanent sponsor chain until an eligible recipient is found.
- ID1 is used only when the approved route truly terminates; terminal fallback does not create a participant orbit position.
- P12 keeps 40% and 50% roles distinct. P39 keeps both 20% roles and the 50% role distinct.
- Recycle closes exactly one cycle, preserves history, and starts a new sponsor-based cycle.
- Auto-upgrade escrow is accumulated, released, and consumed exactly once.

### Freedom-Plus

- A participant must already be registered in F-Freedom with Level 1 active.
- The Freedom-Plus sponsor must equal the permanent F-Freedom sponsor.
- Freedom-Plus registration must not require that inherited sponsor to be registered in Freedom-Plus; sponsor structure and payout eligibility are separate concerns.
- Gateway recovery must remain index-first, with bounded getReferrer and ID1-root fallback reads only when indexed identity data is incomplete.
- Registration includes Freedom-Plus Level 1 activation.
- Levels 1 through 7 are sequential and manually activated; there is no auto-upgrade.
- Orbit engines are P39, P14, P12, P6, P4, P4, and P3 for Levels 1 through 7.
- Placement is deterministic and preserves exact matrix parentage.
- Each payable arrival applies the approved ring percentage and 10% system charge.
- Recycle uses the approved final qualifying arrivals and reopens the same level.
- First activation issues FPT; recycle issues FPTr at 50% of that level's FPT amount.
- Genesis ID1 and four approved representatives receive structural positions and activated levels without generating income; they retain normal future rights.

### Freedom NFT

- Only available FGT and FPT count toward qualification.
- FGTr and FPTr do not count unless governance later changes the rule.
- Tokens committed to NFT membership are locked, not burned.
- Membership freezes immediately when qualifying locked value falls below its tier threshold.
- Restoration requires replenishing the qualifying amount.
- Upgrade burns the lower NFT and mints the higher NFT.
- Voluntary downgrade burns the higher NFT and mints the qualified lower NFT.
- A wallet earns from only its highest active tier.
- Monthly rewards use a UTC cutoff, immutable snapshot evidence, and direct distribution according to the approved pool ratios.

## 6. Current Work-State Gate

Before continuing any release:

1. Record branch, commit, remote, and `git status --short`.
2. Classify every changed file as source, test, generated evidence, secret, temporary diagnostic, or unrelated user work.
3. Never deploy with unexplained tracked modifications.
4. Never commit secrets, private wallet files, `.env` files, or temporary private-key scripts.
5. Restore generated reports only after confirming they were generated by the current test run and are not required evidence.
6. Tag the exact candidate commit after all tests pass.

Current gateway work must remain a separate reviewable change until its tests, proxy-storage validation, staging deployment, and live certification pass.

## 7. Smart-Contract Delivery Gate

For every affected contract:

1. Map the approved rule to exact functions and storage.
2. Identify callers, callees, roles, token approvals, and reentrancy boundaries.
3. Confirm proxy type, initializer state, ownership, and upgrade authorization.
4. Validate storage layout against the currently deployed implementation.
5. Compile from a clean dependency state.
6. Run unit, integration, full-cycle, invariant, adversarial, and regression suites.
7. Test all orbit engines independently, even when implementations share a base contract.
8. Test boundary positions, repeated recipients, inactive chains, ID1 fallback, recycle, and nested settlement.
9. Verify accounting conservation for every transaction.
10. Deploy to fresh staging from the candidate commit.
11. Verify source, proxy implementation, owner, linked addresses, and configuration on-chain.

No multisig proposal is submitted until the exact calldata has been decoded, simulated, and included in the release manifest.

## 8. Backend And Indexing Gate

The backend must support both programs without mixing their records.

1. Verify all contract addresses, start blocks, chain ID, HTTP RPC, and WSS RPC.
2. Keep API indexing disabled and run one designated worker.
3. Use WSS realtime indexing when configured; polling and live-tail recovery settings must be explicit.
4. Prove reconnect and missed-event recovery without duplicates.
5. Enforce idempotent event keys using chain ID, transaction hash, log index, and contract.
6. Project participants, levels, cycles, positions, payments, escrow, tokens, NFT status, and rewards.
7. Preserve canonical placement separately from payment-record placement.
8. Reconcile database totals and per-wallet state against chain truth at a pinned block.
9. Prove database rebuild from deployment start blocks produces the same result.
10. Confirm API endpoints return complete, correctly scoped data for F-Freedom, Freedom-Plus, and Freedom NFT.

The release fails if indexed totals, recipients, positions, cycles, or balances disagree with chain truth.

## 9. Frontend Gate

The frontend is verified page by page against the existing F-Freedom interaction quality.

Frontend completion is a blocking prerequisite for interactive staging certification. Founders and testers must not begin until the Freedom-Plus and Freedom NFT interfaces are complete, responsive, theme-aware, connected to the final staging contracts and APIs, and verified against the corresponding F-Freedom patterns.

1. Navigation exposes the correct program pages.
2. A shared F-Freedom identity and referral ID are used for Freedom-Plus.
3. Registration gateway errors are clear and no transaction is silently abandoned.
4. Wallet chain, USDT balance, allowance, registration, and sequential-level prerequisites are checked.
5. Transaction modals show review, wallet confirmation, pending, success, and decoded failure states.
6. Level cards reflect chain truth and do not use misleading balance colors.
7. Orbit views show exact line, position, parent, occupant, cycle, source/payment-record distinction, and payment reason.
8. Account and activity totals use the same backend accounting definitions. Shared Dashboard, Account, and Activity program switches must preserve the same information architecture, visual hierarchy, theme tokens, and interaction states while changing only the program-scoped data.
   - Freedom-Plus activation placement and owned-orbit occupancy are separate read models: activation placement describes where the participant entered an upline matrix; owned-orbit filled positions count only records whose orbit owner is that participant.
9. NFT pages support qualification, lock, mint, freeze, restore, upgrade, downgrade, and reward history.
10. Light theme, dark theme, desktop, tablet, and mobile are visually verified.
11. Every button, deep link, refresh, wallet change, rejected transaction, and stale-session path is exercised.
12. Freedom-Plus overview, registration, activation/level manager, orbit details, account integration, and activity integration match the established F-Freedom design language.
13. Freedom NFT overview, qualification, membership, token locking, minting, tier management, freeze/restore, upgrade/downgrade, and reward history are complete and interactive.
14. Typography, color tokens, spacing, section rhythm, cards, modals, transaction feedback, loading, empty, success, warning, and failure states are consistent with F-Freedom in both themes.
15. Program-specific orbit diagrams accurately render P39, P14, P12, P6, P4, and P3 structures without changing the approved topology.
16. A Playwright browser pass verifies navigation, layout, non-overlap, transaction preparation, and API-backed rendering at desktop and mobile viewports.

## 10. Test-Wallet And Funding Gate

Use `smart-contract/test-plans/fresh-priority-wallet-roles.json` as the public role manifest and the private wallet file only from the ignored secure location.

1. Audit Accounts 8 through 81 for F-Freedom registration, Level 1, sponsor, Plus state, POL, mock USDT, and allowances.
2. Fund by assigned role, not with one blanket action.
3. Preserve negative cases deliberately:
   - insufficient USDT
   - missing allowance
   - duplicate registration
   - missing previous level
   - RPC/reconnect behavior
4. Record mint transaction hashes and final balances without exposing private keys.
5. Use separate wallets for complete cycles, skipped-upline chains, repeated recipients, fallback, recycle, NFT tiers, and failure cases.

## 11. Staging Certification Sequence

1. Clean-state and deployment-address verification.
2. Genesis verification for ID1 and four representatives.
3. F-Freedom gateway and shared-identity verification.
4. Complete and visually certify all Freedom-Plus and Freedom NFT frontend pages before interactive testing begins.
5. Freedom-Plus registration with automatic Level 1 purchase.
5. Independent activation of Levels 2 through 7.
6. Full cycles for P39, P14, P12, P6, P4, and P3.
7. Exact payment, charge, token, placement, and cycle checks for every arrival.
8. Recycle and FPTr issuance at every level.
9. Eligibility, long skipped-upline chains, first-eligible stop, and terminal ID1 fallback.
10. Repeated recipient and self-payment fallback cases.
11. F-Freedom regression suite covering registration, all levels, escrow, auto-upgrade, and recycle.
12. NFT mint, immediate freeze, restore, upgrade, downgrade, and monthly reward snapshot/distribution.
13. Backend replay and chain/database reconciliation.
14. Complete frontend journey using real browser wallets.
15. Founder-visible testing from a documented clean state.

Each case records inputs, expected outcome, transaction hash, decoded events, final chain state, database state, frontend state, and `PASS` or `FAIL`.

## 12. Production Impact And Migration Gate

Before production, take a pinned-block inventory of:

- Every participant and permanent sponsor
- Every active level and cycle
- Every canonical and payment-record placement
- Every orbit near recycle
- Every escrow balance and pending upgrade
- Every prior inactive-level earning or skipped eligible recipient
- Every ID1 fallback
- Every wallet replacement and migrated identity
- Every token balance, lock, and NFT state

For each anomaly, classify it as historical-only, requires state migration, requires database rebuild, requires compensation, or requires no action. Never assume a new implementation repairs historical on-chain state automatically.

Run the exact upgrade and migration package on a production fork pinned to the inventory block. Then replay representative next transactions for every active orbit category and prove old and new state coexist correctly.

## 13. Multisig And Deployment Gate

1. Produce ordered proposal IDs and decoded human-readable actions.
2. Include target, function, parameters, value, expected state change, and rollback/recovery action.
3. Simulate the complete ordered batch.
4. Confirm deployer and executor POL without relying on fixed gas estimates.
5. Pause only the services or frontend actions required by the approved release plan.
6. Execute strictly in manifest order.
7. Verify each transaction on-chain before advancing across a dependency boundary.
8. Upgrade environment variables from the signed address manifest.
9. Deploy API, worker, and frontend from the same tagged commit.
10. Verify startup logs, owners, implementations, listeners, URLs, and health endpoints.

## 14. Post-Deployment Certification

Immediately verify:

- Proxy implementations and configuration
- Registration and activation gates
- Every program's first live transaction
- Payment recipients and exact amounts
- Placement line, position, parent, and cycle
- Escrow and recycle effects
- FGT, FGTr, FPT, and FPTr issuance
- NFT state transitions
- Worker event capture and database projection
- API and frontend agreement with chain truth

Monitor every transaction initially, then reduce monitoring only after all orbit and level categories have live evidence.

## 15. Recovery Plan

Before deployment, document:

- Previous implementation addresses
- Whether downgrade is storage-compatible and permitted
- Pause controls and responsible signers
- Database snapshot and deterministic rebuild procedure
- Failed-indexer recovery procedure
- Compensation method for financial discrepancies
- Communication owner and approved user message

Rollback must never erase completed on-chain transactions. Recovery either restores a compatible implementation or deploys a governance-approved corrective migration.

## 16. Release Evidence Package

Every production release folder must contain:

- Approved rule matrix and decision log
- Candidate commit and tag
- Compiler and dependency versions
- Contract bytecode hashes
- Proxy storage-layout validation
- Test reports and coverage
- Staging addresses and transaction hashes
- Chain/database/frontend reconciliation report
- Production pinned-block inventory
- Fork rehearsal report
- Multisig proposal manifest and execution receipts
- Environment-variable manifest with secrets redacted
- Post-deployment verification report
- Known limitations, owners, and follow-up dates

## 17. Current Execution Plan

| Phase | Work | Exit condition |
| --- | --- | --- |
| A | Preserve and classify current worktree | Every changed file explained; secrets excluded |
| B | Finish F-Freedom gateway correction for Freedom-Plus | Focused tests, full suite, and storage validation pass |
| C | Commit and deploy gateway candidate to staging | Exact commit and implementation verified on-chain |
| D | Complete Freedom-Plus and Freedom NFT frontend | F-Freedom-aligned pages, states, themes, responsiveness, and browser checks pass |
| D2 | Audit and role-fund Accounts 8–81 | Positive roles funded; negative roles preserved |
| E | Run complete contract certification | Every engine, level, boundary, and adversarial case passes |
| F | Rebuild and reconcile backend | Chain, database, and API match at one block |
| G | Complete frontend certification | All program and NFT journeys pass across themes and viewports |
| H | Founder-visible staging test | Founder cases pass with recorded evidence |
| I | Production inventory and fork rehearsal | Every legacy category has a proven transition result |
| J | Independent review and release sign-off | No unresolved critical/high finding |
| K | Multisig production rollout | Ordered proposals execute and on-chain state verifies |
| L | Live monitoring and final certification | Representative live transactions pass end to end |

## 18. Immediate Next Actions

1. Remove only test-generated report noise from the current worktree after verifying provenance.
2. Complete the two affected Freedom-Plus fixture test runs.
3. Run the entire smart-contract suite.
4. Validate the FreedomPlusRegistration proxy storage upgrade.
5. Review and commit the gateway change as one isolated commit.
6. Deploy and verify it on staging.
7. Audit Accounts 8–81, then execute role-aware mock-USDT funding.
8. Begin the staged certification sequence and update this guide with evidence links as each gate passes.

## 19. Definition Of Done

The system is ready for production only when every gate is supported by evidence from the same release candidate, all three products agree across contract/backend/frontend, production legacy state has a rehearsed transition, no critical or high issue remains, and the post-deployment verification procedure is ready before multisig execution begins.


## 20. Current Staging Delta - 2026-08-27

The canonical rollout framework above remains authoritative. The latest Freedom-Plus focused-orbit delta is tracked in `docs/freedom-plus/STAGING_CERTIFICATION.md`.

Current candidate scope:
- Gateway and permanent-sponsor corrections: implemented and user-confirmed on staging.
- Freedom-Plus orbit navigation and position modal: implemented and user-confirmed on staging.
- Indexed relationship classification and structural connectors: implemented.
- Equal ring distribution, corrected P39/P14 circular ordering, edge-trimmed connectors, and visible ring hierarchy: implemented; final staging visual certification pending.
- Production port must include the component and stylesheet together and must use production addresses/start blocks from a release-specific manifest.

This guide is a migration checklist, not proof that every gate has passed. Production remains blocked until the release evidence package contains contract test results, storage-layout validation, staging transaction evidence, chain/database reconciliation, complete frontend browser evidence, production inventory, fork rehearsal, decoded multisig proposals, and post-deployment checks.

## 21. Freedom-Plus Activation Parity Delta - 2026-08-27

The exact implementation and live-test checklist are recorded in docs/freedom-plus/STAGING_CERTIFICATION.md under "Activation Lifecycle Parity Candidate". Production rollout must port that complete file set together. Preserve index-first reads, conditional chain recovery, two-step approval/action messaging, buffered gas, receipt and state verification, bounded index convergence, custom-error decoding, immediate sequential-level unlocking, and orbit zoom/pan. Do not copy staging RPC credentials, contract addresses, or start blocks into production.
