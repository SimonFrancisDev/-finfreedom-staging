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

- Full repository contract suite: `153 passing`
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
