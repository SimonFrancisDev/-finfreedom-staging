# Current Clean-State Candidate (2026-08-29)

The authoritative current manifests are
`smart-contract/deployments-staging/deployment-1788027951360.json` and
`smart-contract/deployments-freedom-plus-staging/deployment-1788028241010.json`.
Public addresses, start blocks, runtime policy, and the known projection-data
blocker are recorded in `operations/staging/CUTOVER_SOURCE_OF_TRUTH.md`.

Contract deployment and startup verification passed. Final clean-state
certification is **not yet granted** because MongoDB contains Freedom-Plus rows
from the superseded deployment. The remaining sequence is: suspend API/worker,
purge only Freedom-Plus projections, rebuild from block 46209562, reconcile,
then execute and record the clean end-to-end test matrix.

Everything below the archived certification heading is historical evidence and
must not be used to configure the current deployment.

# Archived Certification: Superseded Deployment
> **Superseded staging deployment:** This certification records the previous Freedom-Plus deployment and is retained as historical evidence. For the 2026-08-29 clean-state candidate, use `deployment-1788028241010.json`, `docs/STAGING_FULL_CLEAN_RESET.md`, and the current backend/frontend environment guides.

# Freedom-Plus Staging Certification

## Certified deployment

- Network: Polygon Amoy (`80002`)
- Manifest: `smart-contract/deployments-freedom-plus-staging/deployment-1787395200929.json`
- Earliest deployment block: `45576549`
- ID1 and owner: `0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A`
- Registration: `0x56Dc8f775e4Bf7e31777080eB8AFb9cAA42c300A`
- Level manager: `0xEC87E48946344a8d4a03aa1da1262b467682AE5C`
- Settlement router: `0x5Cc0594a2d275c9CfaC38F5Ef6E03e84f0E05B63`
- P39: `0x447bC08847Dd951D3cDFA3ea4fB2A138FCD79dE4`
- P14: `0x33be14637300eD1365e691897fcbDEA27a52A5Be`
- P12: `0xCf2e7E5b43c3c49790529893e8EF5bA606BbD015`
- P6: `0x91e9ee298D82bED26cdCcbc6dB28dE81886BD766`
- P4: `0xE5A6557cb646EE9F2AF01b8829d727Fd9932aF34`
- P3: `0x8C565C06Fd2A94d5437dCE22b3d1b3C0323AC3c4`

All remaining proxy addresses are recorded in the manifest and the environment documents beside this file. Addresses from earlier Freedom-Plus manifests must not be mixed with this deployment.

## Evidence

- Full repository contract suite: `155 passing`
- Focused Freedom-Plus regression suite: `43 passing`
- Backend Merkle proof suite: `2 passing`
- Frontend production build: passed
- Live core report: `smart-contract/test-reports/freedom-plus/core-1787396105610.json`
- Live NFT lifecycle report: `smart-contract/test-reports/freedom-plus/nft-membership-1787396349703.json`
- Live reward claim report: `smart-contract/test-reports/freedom-plus/nft-rewards-1787397111341.json`

The live certification completed P39, P14, P12, P6, P4 Levels 5 and 6, and P3. It verified deterministic placement, exact component percentages, independent payout roles, reserve accumulation, one recycle per completed cycle, immutable history, FPT, FPTr, manual sequential activation, ID1 fallback, and all three NFT membership tiers.

## Projection reconciliation

The obsolete Freedom-Plus projection was removed without touching F-Freedom collections. The final deployment was replayed from block `45576549` and reconciled at Amoy head `45581833`:

- Chain participants: `45`
- Database participants: `45`
- Raw position events: `253`
- Projected positions: `253`
- Raw payment events: `221`
- Projected payments: `221`
- All 16 contract checkpoints: healthy
- Reconciliation verdict: `PASS`

## Service rollout

1. Apply `BACKEND_ENV.md` to both staging API and staging worker.
2. Keep `FREEDOM_PLUS_REALTIME_ENABLED=true` and `FREEDOM_PLUS_POLLING_ENABLED=false`.
3. Deploy the API. It must verify the final addresses and must not start an indexer.
4. Deploy the worker. It must connect the Freedom-Plus WebSocket indexer with 16 listeners.
5. Confirm `/api/freedom-plus/reconciliation` returns `passed: true`.
6. Apply `FRONTEND_ENV.md` to Vercel and deploy the staging frontend.
7. Verify desktop and mobile navigation, shared FFN identity, registration plus Level 1, manual Levels 2-7, all six orbit views, payment receipts, NFT controls and monthly rewards.

Do not enable public testing if any service reports an address from the superseded deployment or if reconciliation is not passing.

## Active staging gate ledger

### Gate 0 defects discovered after orbit-interface rollout

| Defect | Root cause | Required correction | Status |
|---|---|---|---|
| Activation card `View Orbit` gives no visible response | Link navigation remained unreliable in the deployed activation card | Active cards invoke one explicit action that selects the level, switches the view, and navigates to `/freedom-plus/orbits` with route state | Reopened after failed staging validation; corrected build pending deployment |
| Permanent F-Freedom sponsor is blocked until joining Freedom-Plus | Registration contract incorrectly required the inherited sponsor to be registered in Freedom-Plus | Preserve the exact permanent F-Freedom sponsor for structure; settlement eligibility continues to resolve independently with ID1 fallback | Contract correction implemented locally; proxy upgrade and staging validation pending |
| Users inherited from system ID1 are shown as having an unregistered sponsor | Frontend preflight treated every sponsor as an ordinary participant | Compare the sponsor with `FreedomPlusRegistration.id1Wallet()` before requiring ordinary registration | Implemented; staging validation pending |

Production port inventory for this gate: `frontend/src/Pages/FreedomPlus/FreedomPlusActivationCenter.jsx`, `frontend/src/Pages/FreedomPlus/FreedomPlusPage.jsx`, `smart-contract/contracts/freedom-plus/FreedomPlusRegistration.sol`, its regression tests, and the FreedomPlusRegistration proxy-upgrade procedure. No database schema, indexer model, API environment, or worker environment change is required.


## 2026-08-27 Gateway and Orbit Closure

Validated staging commits:
- f7bfe72 - index-first Freedom-Plus gateway fallback and indexed orbit relationship classification.
- 46e8ae0 - zero-address hardening, ID1-root sponsor fallback, and structural relationship connectors.

Production-port requirements:
1. Preserve the gateway lookup order: indexed F-Freedom registration, bounded chain getReferrer, then LevelManager.id1Wallet only for zero-referrer ID1-rooted users.
2. Reject zero-address and self-sponsor values. Never require the inherited F-Freedom sponsor to join Freedom-Plus.
3. Keep normal reads index-first. Chain reads are conditional recovery reads only when indexed gateway data is incomplete.
4. Return occupantReferrer and relationship (owner, direct, or indirect) from the Freedom-Plus orbit API.
5. Render owner, direct, indirect, next-to-fill, and available node states. Draw structural connectors only for occupied positions and the next-to-fill path.
6. Port API, frontend ABI/address configuration, frontend logic, styles, and deployment environment together; do not copy staging addresses or secrets to production.

Verification evidence: backend syntax passed; focused frontend ESLint passed; production Vite build passed. Staging user confirmed View Orbit, permanent sponsor resolution, and the registration preflight are working after redeployment.


## 2026-08-27 Orbit Visual Parity Follow-Up

Implementation commits:
- `17cdad3` - introduced Freedom-Plus structural relationship lines and node-state styling.
- `7f926b6` - retained equal distribution on every ring, corrected P39/P14 circular child ordering, and trimmed connectors at node boundaries.
- Current follow-up - restores F-Freedom-equivalent visible ring hierarchy: solid Ring 1, dashed Ring 2, dotted Ring 3, explicit stacking, and theme-aware contrast.

Production-port files for the focused orbit:
- `frontend/src/Pages/FreedomPlus/FreedomPlusOrbit.jsx`
- `frontend/src/Pages/FreedomPlus/FreedomPlusPage.css`

Required production behavior:
1. Keep every position evenly distributed on its own ring.
2. Preserve the canonical contract parent for every connector.
3. Order equally spaced child positions around the ring so parent relationships do not create avoidable crossings.
4. Trim connectors at owner and node boundaries.
5. Render ordinary structural links as restrained solid gray and the next-to-fill link as animated dashed gold.
6. Render filled positions green, vacant positions red outlined, and next-to-fill gold.
7. Keep all orbit rings clearly visible in light and dark themes.
8. Port the implementation and CSS together; neither file is sufficient alone.

Certification status: production build passed. Live desktop/mobile and light/dark staging confirmation is still required after frontend redeployment. This section must not be marked certified until screenshots and interaction checks confirm visible rings, correct topology, and working position modals.


### Deployed ring-visibility root cause

The first visible-ring pass used `--ffn-primary` and `--ffn-accent`, but those aliases are not defined by `frontend/src/styles/foundation.css`. Browsers therefore discarded the complete ring border declarations even though the ring elements and CSS bundle were deployed. The corrected focused-orbit rings use explicit theme-tested RGBA colors with light-theme overrides. Production must either port these explicit ring colors or define and certify the missing semantic aliases before using them.

## 2026-08-27 Activation Lifecycle Parity Candidate

This candidate closes the remaining Freedom-Plus activation-state gap against F-Freedom:

1. Normal account reads remain index-first. When the indexed participant or level projection is absent, registration and all seven level states are recovered from chain and merged without discarding indexed details.
2. Registration and activation use explicit preflight, wallet-signing, pending, indexing, complete, and error stages.
3. USDT approval is labeled Step 1 of 2 and is never reported as registration or activation. The program call is requested only after a successful approval receipt.
4. Writes estimate gas, add the same 25 percent safety buffer used by F-Freedom, and use shared fee options.
5. A mined receipt is not treated as success until the expected registration or level state is confirmed on-chain. The UI then polls the indexed projection for a bounded period and clearly reports any remaining synchronization.
6. Contract custom errors and RPC failures are normalized into actionable user messages while preserving transaction hashes.
7. Higher levels are unlocked from merged chain/index state, preventing index lag from leaving the next valid level locked.
8. Focused orbit views provide 75-170 percent zoom, reset, and bounded pan above 100 percent while retaining node selection and position details.

Production-port files:

- frontend/src/Pages/FreedomPlus/FreedomPlusPage.jsx
- frontend/src/Pages/FreedomPlus/FreedomPlusFocusedOrbit.jsx
- frontend/src/Pages/FreedomPlus/FreedomPlusPage.css
- frontend/src/Services/freedomPlus.js
- frontend/src/components/feedback/TransactionStatus.jsx
- frontend/src/utils/errorMap.js
- frontend/src/utils/txOptions.js (shared dependency; do not fork it)

Verification evidence for the candidate: focused ESLint passed and the production Vite build passed (3330 modules). Live staging certification still requires one fresh registration plus Levels 2 and 3, checking wallet prompts, decoded failures, immediate unlock, index convergence, orbit zoom/pan, position selection, both themes, and desktop/mobile layouts.
## 2026-08-27 ID1-Root Registration Contract Closure

A staging registration from 0x296238e950ef0066D2119230Bf0eb3aDEBc94882 reverted with selector 0xfdcdaae8. A direct eth_call decoded it as PermanentSponsorMismatch(address,address) with expected sponsor zero and supplied sponsor configured ID1. The wallet was F-Freedom registered with Level 1 active, and its indexed gateway correctly classified it as ID1-rooted.

Correction:
- FreedomPlusRegistration now preserves every nonzero permanent F-Freedom referrer unchanged.
- Only an eligible participant whose gateway referrer is zero inherits the contract's configured id1Wallet.
- A focused regression test reproduces this exact case.
- UUPS storage validation passed against the live proxy.
- Focused registration/token tests: 10 passing.
- Complete smart-contract suite: 155 passing.

Deployment evidence:
- Proxy: 0x56Dc8f775e4Bf7e31777080eB8AFb9cAA42c300A
- New implementation: 0xad82E89856BA8A301DeB78b81F3eBbEc87f77566
- Implementation deployment: 0x05fa9e9d862d8e32476467bfc0e75154317229c16fd53c7ad04d0808c80b42b5
- Guardian proposal submit: 0xf23550776084d70002a97969ea818c2d8930e7ecfb6b7775d5178c28b9dc1adb
- Guardian proposal confirmations: 0x8e9ef97f410eafb1170a95f803f503660563cbedd9413bedd5b8feb76c55320a and 0x296afe83a5a1d2cfc652efa1c83971d6bf79261999cd2b70029dd864f051c301
- Guardian proposal execution: 0xd7a144f52fd622ad62e3e7bd6cf60482b25d961b207e581b794625a4dd755130
- Upgrade proposal submit: 0x6fe7de6fb212e9b4d25a532a2b23668d21e383ba3b8dd621e7280e7331f72d65
- Upgrade confirmations: 0xc5113fc3d34753bb792ad9abd7cdb64b46e22caa2568f5a570feb04e967bffea and 0x10f07fc0ff9e098bf4ce9be662a5cc767ef24cbe42f39ef08b8f7ce8d49c1f67
- Upgrade execution: 0xef2e45eeccaaf27eda0900a6de107eb340c855854991d29c04ac6c400b647b75

Post-upgrade verification read the ERC-1967 implementation slot as 0xad82E89856BA8A301DeB78b81F3eBbEc87f77566. The exact formerly failing register(ID1) eth_call from the tester wallet returned 0x successfully. A real wallet transaction remains the final user-facing confirmation.

## 2026-08-27 Real Wallet Levels 1-3 Structural Certification

Tester wallet: `0x296238e950ef0066D2119230Bf0eb3aDEBc94882`

| Action | Transaction | Block | Price / FPT | Canonical placement | Settlement |
|---|---|---:|---:|---|---|
| Register + Level 1 | `0xfafa93188ab2a6b2849c409bd291fb467a906cc394062690deb1c4771239b694` | 46031026 | 50 USDT / 50 FPT | P39, ID1 orbit cycle 0 position 8, ring 2, parent `0xDd78425335C0c698615845d94f9FeE7492266396` | 45 USDT participant components + 5 USDT system charge |
| Level 2 | `0x76f973761c3ef77437c6e0fb6dfad76ba32d9a0c1ddb978ba898614cdf3d92ee` | 46032050 | 150 USDT / 150 FPT | P14, ID1 orbit cycle 0 position 8, ring 3, parent `0xeE192BE4884B064281Fa426F3d855fb339445B83` | 135 USDT participant components + 15 USDT system charge |
| Level 3 | `0x4f5c3d9928e5afdaf52f72d1207eca0d4fd858a8dfc140a1d77c2e3d5a1d721a` | 46032201 | 450 USDT / 450 FPT | P12, ID1 orbit cycle 0 position 8, ring 2, parent `0xDd78425335C0c698615845d94f9FeE7492266396` | 405 USDT participant components + 45 USDT system charge |

Certification findings:
1. All three receipts succeeded and the participant was assigned Freedom-Plus participant number 47.
2. The permanent F-Freedom sponsor remained ID1 on registration and on all paid activation events.
3. Levels activated sequentially as 1, 2, and 3 with unique activation IDs.
4. Prices follow the approved 50 x 3^(level-1) schedule and first activations minted equal FPT amounts.
5. Orbit engines, cycles, positions, rings, and structural parents match `FreedomPlusConfig` and the occupied parent slots.
6. Every settlement conserved the full price: 90 percent participant components plus the required 10 percent system charge.
7. Routed-payment position records remained separate from each canonical placement and retained their own placement IDs and kinds.
8. The worker indexed participant, level, position, token-ledger, settlement, and latest-wallet-event projections without sync errors.

Read-model rule confirmed by this audit: a participant's placement inside an upline orbit is not a filled position in the participant's own orbit. Activation summaries must always return the canonical orbit type for each level, while `filledPositions` counts only positions whose `orbitOwner` is the requested wallet.

Frontend production-port additions from this pass:
- Full-page Freedom-Plus Dashboard and Account views must activate the shared page treatment, seven-level progression, gateway identity, permanent sponsor, indexed placement, token, receipt, and latest-block facts.
- Activity program changes must immediately update the selected program filter while preserving the established timeline and receipt structure.
- Freedom NFT mobile hero content must use semantic theme surfaces, text, muted text, and borders rather than a fixed dark background.

## Freedom NFT UI Closure (2026-08-28)

The staging NFT surface is certified to use three real routes only: Overview, Rewards, and Membership. Navigation order, dark/light tier artwork, full-image containment, and responsive behavior are recorded in docs/GATE_4_FREEDOM_NFT_PREMIUM_PAGES.md.

This UI closure does not replace the smart-contract evidence already recorded in this certification. Production migration must preserve the certified contract addresses and roles mapping process, deployment manifests, contract test evidence, event/indexer contracts, system-vault configuration, and the NFT UI asset manifest.
### Final NFT visual acceptance

NFT visual acceptance requires edge-to-edge hero media on Overview, Rewards, and Membership, plus exact Foundation, Intermediate, and Advance labels in both light and dark tier artwork. The authoritative implementation notes and production-port requirements are in docs/GATE_4_FREEDOM_NFT_PREMIUM_PAGES.md.
### NFT frame refinement acceptance

Production parity includes the unchanged Overview hero, compact Membership/Rewards hero frames, retained labeled tier assets, controlled tier-art scaling, and theme-token divider lines. Exact selectors and dimensions are recorded in docs/GATE_4_FREEDOM_NFT_PREMIUM_PAGES.md.
### Screenshot-verified NFT geometry

The final production rule supersedes fixed NFT subpage hero heights: Membership and Rewards use their source image ratios with containment, while Overview and Membership tier cards use a 1.45:1 frame that removes only the surrounding square canvas. See docs/GATE_4_FREEDOM_NFT_PREMIUM_PAGES.md.
### Balanced NFT subpage hero acceptance

The final accepted Membership and Rewards hero height is responsive within 520-720px on desktop and 600-720px on mobile. The image remains complete and edge-to-edge; Overview and tier-card geometry are unchanged. See docs/GATE_4_FREEDOM_NFT_PREMIUM_PAGES.md.
### Restored NFT subpage hero assets

Membership and Rewards use the established landing NFT card dark/light and mobile assets. The temporary ring artwork was removed. Production must preserve this mapping together with proportional edge-to-edge cover and the accepted hero-height rules. See docs/GATE_4_FREEDOM_NFT_PREMIUM_PAGES.md.

### Gate 5 shared program/profile parity

Dashboard, Account, and Activity share one persistent premium program selector. The Account page now uses one complete renderer for both programs: switching to Freedom-Plus preserves the F-Freedom section order, cards, profile switching, privacy behavior, themes, and responsive layout while replacing labels, routes, seven-level state, FPT/FPTr, receipts, financial values, and network values with indexed Freedom-Plus data. Direct and total-team projections are computed from MongoDB sponsor records and make no provider calls. A failed Freedom-Plus read has a visible retry state. Production data semantics and test cases are recorded in docs/GATE_5_SHARED_PROGRAM_PROFILE_PARITY.md.

The Activity page now has complete selected-program parity. Its hero, filters, timeline, receipts, summaries, activation grid, pagination, explorer links, and exports remain structurally identical while selected values come only from the active program's API data. Freedom-Plus uses indexed participant payments, ledger records, and seven-level projections; viewed-profile context and privacy headers are preserved. Browser contract reads and JSON-RPC polling were removed from Activity. The F-Freedom backend read service retains its documented fallback semantics. Full production mapping and live checks are recorded in `docs/GATE_5_SHARED_PROGRAM_PROFILE_PARITY.md`.

Dashboard parity is now implemented with one complete renderer for both programs. Freedom-Plus dashboard intelligence comes from a dedicated database-only aggregate over indexed participant, payment, ledger, event, and sync projections. The selected profile, privacy authorization, program-specific links, contract directory, access states, growth, activity, treasury cards, and health indicators are preserved. Production deployment and certification requirements are recorded in `docs/GATE_5_SHARED_PROGRAM_PROFILE_PARITY.md`.

Gate 5 live staging certification completed on 2026-08-28. The user confirmed that Account, Activity, and Dashboard correctly retain their complete layouts and switch between F-Freedom and Freedom-Plus. A Dashboard refetch loop caused by an unstable toast-object dependency was corrected in commit `7d5fe3a`; focused ESLint and the frontend production build passed, and the user confirmed the redeployed Dashboard is stable. API/worker logs also confirmed the intended API-disabled/worker-WebSocket indexing split with no polling indexer started. Activation transactions and orbit journey evidence remain a separate certification gate.
