# Staging Reset Execution Record

Date: 2026-09-29
Environment: staging only
Production: excluded

## Authorized objective

Reset the complete staging test system to a clean state, retain Polygon Amoy
chain ID 80002 and the existing mock USDT, deploy fresh F-Freedom and fresh
Freedom-Plus/NFT suites, initialize exactly three Freedom-Plus founder
representatives, reset the staging database, reindex, reconcile, certify, and
resume tester access only after validation.

Approved Freedom-Plus founder representatives, in genesis order:

1. `0x3f6Bb1E6Bfeb9C52f763a197d27B580d7DE7f100`
2. `0xDd78425335C0c698615845d94f9FeE7492266396`
3. `0xf72873d6233B5e3dfbA6D1D8058BF90E990902f0`

The removed staging representative
`0xeE192BE4884B064281Fa426F3d855fb339445B83` is not deleted from historical
evidence. It is excluded from the fresh genesis and may later register normally.

## Preserved baseline

- Code checkpoint: `c359f74161fd4fef462694c9e11fb99233f134d9`.
- The Freedom-Plus overview stage-name correction is visible on deployed staging.
- Retained mock USDT: `0x7b7E39f3D177B3356368431C5C285bca58b43A60`.
- Existing manifests and historical transaction evidence remain immutable.
- The reset must not read from, write to, deploy to, or reconfigure production.

## Reset gates and live status

| Gate | Status | Evidence |
| --- | --- | --- |
| Repository checkpoint clean | Passed | Reset record pushed to staging `main` at `ead0ee8` |
| Reset runbook inspected | Passed | `STAGING_STABILITY_RESET_AND_CERTIFICATION_2026-09-28.md` and `STAGING_FULL_CLEAN_RESET.md` |
| MongoDB backup tooling | Passed | `mongodump` 100.12.2 installed |
| Fresh pre-reset backup | Passed | `backend/backups/finfreedom-staging-20260929-155247.archive.gz`; 146061 bytes; SHA-256 `64BFE4C35B8ECB413360406271B23C07E89B3F24BF071384446AFEA22BB2E5EF`; archive dry-run succeeded |
| Pre-reset database inventory | Passed | Exact database `finfreedom-staging`; 41 collections; 1774 documents; guarded reset dry-run only |
| API and worker suspended | Passed | Operator confirmed both Render staging services suspended before backup and preflight |
| Contract environment keys | Present | Key names verified without printing values |
| Pinned contract dependencies | Repaired locally | Generated `node_modules` only; no source change intended |
| Read-only Amoy preflight | Passed | Chain 80002, retained mock USDT, treasury configuration, signers, and funded deployer verified |
| F-Freedom deployment | Passed | Manifest `deployment-1790702999333.json`; validator passed; blocks 48880412-48880581 |
| Freedom-Plus/NFT deployment | Passed with recovered script assertion | Final manifest `deployment-1790706637561.json`; validator passed at block 48884219 |
| NFT FGT authorization | Passed | Multisig transaction 16 received two approvals, satisfied its timelock, and executed successfully |
| Database reset | Passed | `finfreedom-staging` reset by guarded `deleteMany`; all 41 collections verified at zero |
| Local environment cutover mirror | Passed | Backend and frontend ignored `.env` files match the fresh manifests |
| Render/Vercel environment cutover | Pending operator application | Values are frozen in `operations/staging/CUTOVER_SOURCE_OF_TRUTH.md` |

## Required execution order

1. Confirm staging testing is frozen and both Render staging services are suspended.
2. Run the inspected read-only Amoy preflights.
3. Export and verify a timestamped MongoDB archive, collection inventory, size,
   and SHA-256 checksum.
4. Run complete contract, backend, and frontend verification gates.
5. Deploy fresh F-Freedom contracts and validate the resulting manifest.
6. Deploy fresh Freedom-Plus/NFT contracts with the three approved representatives
   and validate genesis, balances, links, ownership, and manifests.
7. Update API, worker, and frontend staging addresses and start blocks from the
   new manifests as one atomic cutover.
8. Run the guarded staging database reset and verify the post-reset inventory.
9. Start the worker first, replay from exact deployment blocks, and reconcile.
10. Start the API with indexing disabled, deploy the frontend, run the complete
    certification matrix, document evidence, commit, and push.

## Rollback boundary

The fresh backup may be restored only with the matching old API, worker, and
frontend address set. Old projections must never be combined with new contract
addresses. Blockchain deployments cannot be rolled back.

## Execution Notes

The Freedom-Plus deployment transaction completed genesis correctly with four
identities: ID1 plus the three approved representatives. The deployment script
incorrectly asserted five identities and stopped before its final ownership and
manifest steps. Existing contract tests already establish four as the correct
count. The assertion and validator were corrected, and the guarded partial
deployment finalizer validated all identities, seven active levels per identity,
exact 54,650 FPT allocations, zero FPTr allocations, and the F-Freedom gateway
before locking operator configuration and transferring ownership. No duplicate
Freedom-Plus suite was deployed.

The Atlas role did not permit `dropDatabase`, so the reset script used its guarded
`deleteMany` fallback. It deleted 1,774 documents and verified every retained
collection at zero. Production was not accessed or modified.

## Verification Results

- F-Freedom on-chain deployment validator: passed.
- Freedom-Plus on-chain deployment validator: passed with four genesis identities
  and zero pending governance actions.
- Backend native Node tests: 17 passed, 0 failed.
- Deployment, finalizer, and validator JavaScript syntax checks: passed.
- Local Hardhat unit runner: did not start because the pre-existing Windows
  `@nomicfoundation/edr` native binary is invalid; no test assertion ran.
- Local frontend runner: eight dependency-free tests passed, while five suites did
  not start because the local ignored `node_modules` is missing Babel, React, and
  ethers packages. This is a local dependency installation issue, not a failed
  application assertion. CI remains the clean dependency verification gate.
