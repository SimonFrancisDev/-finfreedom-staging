# Staging Cutover Source of Truth

Last updated: 2026-08-30

## Authority

Current clean staging is defined only by:

- `smart-contract/deployments-staging/deployment-1788027951360.json`
- `smart-contract/deployments-freedom-plus-staging/deployment-1788028241010.json`

Render/Vercel values are deployment copies. Ignored `.env`, `.vercel`, and
`env-files` content is operator state, never historical evidence.

## Required Blocks

| Variable | Block |
| --- | ---: |
| `START_BLOCK`, `START_BLOCK_NFT_POOL_VAULT` | 46209364 |
| `START_BLOCK_OPERATIONS_VAULT` | 46209368 |
| `START_BLOCK_FGT_TOKEN` | 46209374 |
| `START_BLOCK_FGTR_TOKEN` | 46209379 |
| `START_BLOCK_ESCROW`, `START_BLOCK_AUTO_UPGRADE_ESCROW` | 46209384 |
| `START_BLOCK_REGISTRATION` | 46209399 |
| `START_BLOCK_LEVEL_MANAGER` | 46209414 |
| `START_BLOCK_LEVEL_SETTLEMENT_ROUTER` | 46209418 |
| `START_BLOCK_P4_ORBIT` | 46209442 |
| `START_BLOCK_P12_ORBIT` | 46209450 |
| `START_BLOCK_P39_ORBIT` | 46209467 |
| `FREEDOM_PLUS_START_BLOCK` | 46209562 |

## Shared NFT Runtime

Shared NFT pool: `0x6e127653D5c2032442fa7832b70967fbc13690aE`.
Shared operations vault: `0x33D5B37Cc4Dfb1EC91dAC000ee0c412ed523b746`.
Generic runtime variables use these. F-Freedom's manifest vaults remain
historical on-chain facts, not the selected shared NFT destination.

## Process And Data Policy

API indexers are disabled. Worker WebSocket indexers are enabled and continuous
polling is disabled. A bounded startup/reconnect recovery pass is allowed.
Secrets stay in platform stores and ignored local files.

MongoDB still has Freedom-Plus projections below block 46209562. Suspend API and
worker, purge only Freedom-Plus projections, and rebuild from fresh contracts.
Do not purge F-Freedom or shared engagement data.

Run `node scripts/validateStagingCutover.js` before each deployment.

## Projection Purge Evidence (2026-08-30)

With API and worker suspended, the eight dedicated Freedom-Plus projection collections were deleted and verified at zero. F-Freedom and shared engagement collections were not targeted. Restart worker first and rebuild from block 46209562 before restarting API.

### Rebuild Verification

Worker recovery indexed 354 events with minimum block 46209562 and maximum block 46209801. All 16 sync states were restored. Database verification returned valid=true; no event from the superseded deployment remains.
