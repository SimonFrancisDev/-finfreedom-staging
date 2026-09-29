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
| Repository checkpoint clean | Passed before tooling repair | `main` matched `origin/main` at `c359f74` |
| Reset runbook inspected | Passed | `STAGING_STABILITY_RESET_AND_CERTIFICATION_2026-09-28.md` and `STAGING_FULL_CLEAN_RESET.md` |
| MongoDB backup tooling | Passed | `mongodump` 100.12.2 installed |
| Fresh pre-reset backup | Pending | Must be captured after API and worker suspension |
| API and worker suspended | Pending operator confirmation | Both must be suspended, not merely restarted |
| Contract environment keys | Present | Key names verified without printing values |
| Pinned contract dependencies | Repaired locally | Generated `node_modules` only; no source change intended |
| Read-only Amoy preflight | Awaiting explicit execution approval | Script inspected; automated execution gate stopped launch before it ran |
| Contract deployments | Not started | No transaction broadcast |
| Database reset | Not started | No data deleted |
| Environment cutover | Not started | No Render or Vercel variables changed |

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
