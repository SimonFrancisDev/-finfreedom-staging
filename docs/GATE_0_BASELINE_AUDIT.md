# Gate 0 Baseline Audit

Status: Approved with follow-up items
Audit date: 2026-08-27
Repository: `SimonFrancisDev/-finfreedom-staging`
Branch: `main`
Baseline commit: `243d050ed9311e3fbf7cca83d3394b7018e532bc`

## Purpose

This gate freezes the observed staging baseline before further contract, backend, indexing, or frontend changes. It records what exists, what is known to work, what conflicts, and what Gate 1 must decide. It does not certify the current implementation as production-ready.

## Program Boundaries

1. F-Freedom is the established reference implementation.
2. Freedom-Plus is a seven-level program with six orbit engines and FPT/FPTr.
3. Freedom NFT is one ecosystem-wide membership and rewards program.
4. Dashboard, Account, Activity, profile/privacy, wallet connection, notifications, referrals, navigation, themes, and transaction feedback are shared foundations.

## Repository Inventory

| Area | Location | Role |
|---|---|---|
| Contracts | `smart-contract/contracts` | F-Freedom, Freedom-Plus, NFT, governance, vaults, migrations |
| Contract tests/scripts | `smart-contract/test`, `smart-contract/scripts` | Tests, deployment, governance, migration, certification |
| Backend | `backend/src` | Indexed APIs, community, profile, notifications, health |
| Indexers | `backend/src/services` | F-Freedom and Freedom-Plus projections |
| Frontend | `frontend/src` | Program pages, shared pages, wallet transactions |
| Runtime snapshots | `env-files` | Staging API, worker, and frontend configuration snapshots |
| Manifests | `operations` | Staging and production baselines |
| Guidance | `docs`, `RUNBOOK.md` | Migration, readiness, and certification material |

The worktree was clean at audit start. Recent baseline commits are `243d050`, `4224777`, `a778e5b`, `afee7f2`, and `9b95d9a`.

## Staging Services

| Service | URL | Intended responsibility |
|---|---|---|
| Frontend | `https://finfreedom-staging.vercel.app` | Interface and wallet transactions |
| API | `https://finfreedom-staging-api.onrender.com` | HTTP API with indexers disabled |
| Worker | `https://finfreedom-staging-worker.onrender.com` | Realtime indexing |
| Database | `finfreedom-staging` | Shared indexed projections |
| Network | Polygon Amoy, chain ID `80002` | Staging chain |

The supplied startup logs correctly separate API and worker responsibilities. Platform commit verification remains a manual certification item.

## F-Freedom Staging Baseline

The existing staging manifest records:

| Component | Address |
|---|---|
| USDT | `0x7b7E39f3D177B3356368431C5C285bca58b43A60` |
| Registration | `0x462DDc6C3Ba984b8BFd343948eADf321f8607792` |
| Level Manager | `0x83dA1D3fF64411b1D2e73f236C8525bF08483fEb` |
| Settlement Router | `0xb7Fc5B65122149D17759de894ea3d90ceaD87CC2` |
| NFT Pool Vault | `0x1AF1e23b2820935AF9D8FD4DE0024B79E6119aaA` |
| Operations Vault | `0x8C53D90348A4C73C73db2E21dF07DAa29144A823` |
| Multisig | `0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A` |
| Guardian | `0x52F22c1e396dF20c2078B4a86b4A0ac3b51a9911` |

The manifest is stale because its recorded Git head predates this baseline.

## Freedom-Plus Deployment Conflict

The staging deployment baseline has no complete Freedom-Plus section. Current evidence contains incompatible deployments:

1. Checked-in runtime snapshots use the `0xf875...` registration set.
2. Earlier supplied configuration and startup records use the `0x56Dc...` registration set.
3. Other historical documentation contains still another Freedom-Plus vault/token set.

No Freedom-Plus set is certified as canonical by Gate 0. Gates 1-3 must select the intended architecture, verify live proxy state, and publish one authoritative manifest.

## System Charge And Vault Finding

Both programs implement a 10% system charge:

- 8% of gross activation price goes to an NFT pool vault.
- 2% goes to an operations vault.
- 90% goes through participant/orbit settlement.

The Freedom-Plus router stores and pays separate `nftPoolVault` and `operationsVault` recipients. The approved business architecture is that F-Freedom and Freedom-Plus share both recipients: one NFT Pool Vault and one Operations Vault across the ecosystem.

This is an on-chain issue. Environment or frontend changes alone cannot alter stored router recipients.

## Backend And Indexing Inventory

F-Freedom models cover registration, activation, financial, escrow, receipt, token, orbit-event, orbit-level, orbit-position, and cycle data. Polling, replay, live-tail, leases, gaps, and realtime infrastructure exist.

Freedom-Plus models cover participants, levels, positions, payments, ledger entries, events, reward snapshots, and sync state. APIs expose status, reconciliation, participant, activation summary, orbit, payments, events, reward periods, and reward proofs.

Risks:

- Browser code still performs direct RPC reads for balances, membership, gateway recovery, and stale indexed state.
- Separate indexing implementations require field-by-field reconciliation.
- A connected indexer does not prove historical completeness.
- NFT event coverage and shared-page API contracts are not documented as complete.

## Frontend Route Inventory

F-Freedom reference routes:

- `/f-freedom-program`
- `/activation`
- `/orbits`
- `/my-tokens`
- `/dashboard`
- `/account`
- `/activity`

Freedom-Plus routes:

- `/freedom-plus`
- `/freedom-plus/activation`
- `/freedom-plus/orbits`
- `/freedom-plus/tokens`
- Redirected shared routes for Dashboard, Account, and Activity

Freedom NFT routes:

- `/freedom-nft`
- `/freedom-nft/membership`
- `/freedom-nft/rewards`

Shared foundations include navbar, mobile drawer, wallet/account dropdowns, Preferences, themes, languages, privacy, notifications, Telegram, profile/referrals, Community, Support, Security, and Admin.

## Frontend Architecture Findings

1. `ProgramViewSwitcher` clones the F-Freedom page and passes a program string; it is not a complete program-view architecture.
2. Dashboard, Account, and Activity contain early Freedom-Plus branches/summaries, not proven section-for-section parity.
3. Freedom-Plus overview, activation, orbits, tokens, NFT membership, and rewards share one large stateful controller.
4. NFT membership markup is embedded in the Freedom-Plus controller rather than implemented as a fully audited page.
5. Program navigation exists, but profile/account switching and program context are not unified or persistent.
6. F-Freedom has richer orbit, zoom, detail, modal, theme, responsive, and transaction behavior that has not been certified page by page.
7. Hardcoded visual values and one-off target styles remain.
8. WalletConnect code exists but QR login is not end-to-end certified.

## Page-Parity Matrix

| Surface | Current condition | Gate |
|---|---|---|
| Navbar/program navigation | Links exist; active/context parity unverified | 5, 6A |
| Profile/account switch | Not unified with program context | 5, 6A, 6K |
| Freedom-Plus overview | Improved; full foundation parity unverified | 6B |
| Registration/activation | Functional progress; complete modal/state parity unverified | 6C, 6D |
| Orbit overview/details | Improved; complete visual/data parity unverified | 6E, 6F |
| Tokens | Partial dedicated page; full parity unverified | 6G |
| Dashboard | Summary branch, not full Freedom-Plus data parity | 6H |
| Account | Summary branch, not full profile/network parity | 6I |
| Activity | Program filter exists; accounting/event parity unverified | 6J |
| NFT overview | Dedicated component; full theme/style audit pending | 6L |
| NFT membership | Embedded implementation; modal/state parity pending | 6M, 6O |
| NFT rewards | Partial implementation; theme/data/history parity pending | 6N |

## Consolidated Issue Register

| ID | Severity | Issue | Gate | Status |
|---|---|---|---|---|
| G0-001 | Critical | No canonical Freedom-Plus staging manifest | 1-3 | Open |
| G0-002 | Critical | Freedom-Plus deployment conflicts with the approved shared NFT Pool Vault | 2-3 | Decision resolved; implementation open |
| G0-003 | High | Operations-vault sharing rule | 1 | Resolved: shared |
| G0-004 | Critical | Runtime snapshots, docs, and startup evidence contain incompatible addresses | 2-3 | Open |
| G0-005 | High | Dashboard/Account/Activity lack proven feature-equivalent views | 5-7 | Open |
| G0-006 | High | Profile/program switch is not a unified persistent context | 5, 6A, 6K | Open |
| G0-007 | High | Freedom-Plus/NFT are not certified against the global foundation | 5-6 | Open |
| G0-008 | High | NFT membership/rewards lack complete theme/modal/behavior parity | 5-7 | Open |
| G0-009 | High | Indexed source coverage is incomplete; browser RPC remains significant | 4 | Open |
| G0-010 | High | Error decoding and stale-index recovery are not certified everywhere | 4-7 | Open |
| G0-011 | Medium | Existing staging baseline is stale and omits Freedom-Plus/NFT | 3 | Open |
| G0-012 | Medium | WalletConnect exists but is not certified | 7, 12 | Open |
| G0-013 | Medium | Runtime snapshots require reconciliation and credential-rotation review | 3, 8 | Open |
| G0-014 | Medium | Production manifests predate current staging program work | 10 | Open |

## Verified Evidence

- Supplied API and worker logs connected to MongoDB and Polygon Amoy.
- F-Freedom contracts were verified at startup.
- One Freedom-Plus deployment was verified at startup.
- Worker realtime indexing connected with 48 listeners.
- Three supplied Freedom-Plus registration/Level 1-3 transactions succeeded and indexed.
- Focused backend tests, frontend lint, and production frontend build passed at `243d050`.

This evidence does not resolve canonical deployment or page-parity issues.

## Gate 0 Exit Assessment

Gate 0 is approved. The following decisions are now frozen:

1. Freedom NFT is one ecosystem-wide program.
2. F-Freedom and Freedom-Plus share one NFT Pool Vault.
3. F-Freedom and Freedom-Plus share one Operations Vault.

The canonical Freedom-Plus deployment, on-chain recipient correction, remaining business-rule approval, and page-by-page delivery order continue through Gates 1-3.
