# Staging Cutover Source of Truth

Last updated: 2026-09-29
Environment: Polygon Amoy staging only (chain ID 80002)
Production: excluded

## Authority

The clean staging deployment is defined only by:

- `smart-contract/deployments-staging/deployment-1790702999333.json`
- `smart-contract/deployments-freedom-plus-staging/deployment-1790706637561.json`

Retained mock USDT: `0x7b7E39f3D177B3356368431C5C285bca58b43A60`.
Render and Vercel values must exactly copy this record. Secrets remain in platform
stores and ignored local files.

## F-Freedom Addresses

| Variable | Address |
| --- | --- |
| `ESCROW_ADDRESS` | `0x5B4f8Ffd24de4401DDf060C78d3B254605b15086` |
| `FGT_TOKEN_ADDRESS` | `0xF3CA84c5eC97E2dd9ee102240fA566514504C28A` |
| `FGTR_TOKEN_ADDRESS` | `0x33dDF1Bd7123A9bB6D147C0DC7829a0e62c1225d` |
| `FREEDOM_TOKEN_CONTROLLER_ADDRESS` | `0x59390801b7CCc55139F906e1e20D6434E374446C` |
| `REGISTRATION_ADDRESS` | `0xbF8F79a11a5A8BF48571C69B5C8b7a92B875970A` |
| `LEVEL_MANAGER_ADDRESS` | `0xb49130f8a48E358c867c8aBee5381f6138f7B6b2` |
| `LEVEL_SETTLEMENT_ROUTER_ADDRESS` | `0xF36C0014821c58AC0eab4e8e1963e2a00533F525` |
| `P4_ORBIT_ADDRESS` | `0x34f28e8c010298B71Dfd10B84dC3C90F91a57676` |
| `P12_ORBIT_ADDRESS` | `0x5Fbf65eFa87a90E2443368f0b9e440BD335971CA` |
| `P39_ORBIT_ADDRESS` | `0xb4391Ca5FB2C248D85Ad0Ba88516AA25035AbE21` |
| `NFT_POOL_VAULT_ADDRESS` | `0x42819C37a22E5d9432B33fc8378e1B489D246cC2` |
| `OPERATIONS_VAULT_ADDRESS` | `0xB5810C98c8077Cc587c9248f709ecAfF531EbD22` |

## Freedom-Plus Addresses

| Variable | Address |
| --- | --- |
| `FREEDOM_PLUS_REGISTRATION_ADDRESS` | `0x30067cE1974bBD92B4Ae29cBF5827eF5Ee7A4cd4` |
| `FREEDOM_PLUS_LEVEL_MANAGER_ADDRESS` | `0x0838506bc137D3a408866DEC5c0AfD3D1f6a2c10` |
| `FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS` | `0xcA20D9F04bbF8a99c6f332ebD05829F95B50C9cb` |
| `FREEDOM_PLUS_P39_ORBIT_ADDRESS` | `0xF8D13086327BB762E30689BA9036185EB1D15bfb` |
| `FREEDOM_PLUS_P14_ORBIT_ADDRESS` | `0xe6E4C69F9fBE5aF32923661B1cD8F04FDb00f78e` |
| `FREEDOM_PLUS_P12_ORBIT_ADDRESS` | `0xb0079d0c6F02f2Ed75dAAd98e31F0ce2Ab1EF660` |
| `FREEDOM_PLUS_P6_ORBIT_ADDRESS` | `0xC5B48B2fC56D256fEa5B66Da7d54d470a4d3eD3A` |
| `FREEDOM_PLUS_P4_ORBIT_ADDRESS` | `0xcBFD83647b23ce44b268A11054b677DcA6c7C27a` |
| `FREEDOM_PLUS_P3_ORBIT_ADDRESS` | `0x21541a7693a943C7eFC6ECB28CF2485efD0d0544` |
| `FREEDOM_PLUS_FPT_ADDRESS` | `0x10007328ff5033bee3FbB053a731D09B0b979714` |
| `FREEDOM_PLUS_FPTR_ADDRESS` | `0x1bd21D699D1F38Db05B70D49524aeC17600e7114` |
| `FREEDOM_PLUS_TOKEN_CONTROLLER_ADDRESS` | `0x8397cb6cD279650333cbFb22C09557F5ad96CE06` |
| `FREEDOM_NFT_MEMBERSHIP_ADDRESS` | `0xf505282ced9df36F68705b6E5C17760d34E74FF8` |
| `FREEDOM_NFT_REWARD_DISTRIBUTOR_ADDRESS` | `0x9B1e2271915e60ac9AB067cF586A0A2EF65D094d` |
| `FREEDOM_NFT_POOL_VAULT_ADDRESS` | `0xF8a4F62fd253Aa2A036209F948Eec53810576fE7` |
| `FREEDOM_PLUS_OPERATIONS_VAULT_ADDRESS` | `0xB41B0C9593fbAcbBCb1Cb525c20F5A2332D02f12` |

## Start Blocks

| Variable | Block |
| --- | ---: |
| `START_BLOCK`, `START_BLOCK_NFT_POOL_VAULT` | 48880412 |
| `START_BLOCK_OPERATIONS_VAULT` | 48880417 |
| `START_BLOCK_FGT_TOKEN` | 48880471 |
| `START_BLOCK_FGTR_TOKEN` | 48880476 |
| `START_BLOCK_ESCROW`, `START_BLOCK_AUTO_UPGRADE_ESCROW` | 48880482 |
| `START_BLOCK_REGISTRATION` | 48880487 |
| `START_BLOCK_LEVEL_MANAGER` | 48880499 |
| `START_BLOCK_LEVEL_SETTLEMENT_ROUTER` | 48880503 |
| `START_BLOCK_P4_ORBIT` | 48880521 |
| `START_BLOCK_P12_ORBIT` | 48880527 |
| `START_BLOCK_P39_ORBIT` | 48880534 |
| `FREEDOM_PLUS_START_BLOCK` | 48880990 |

## Genesis And Reset Evidence

- F-Freedom validator passed with zero registered users and ID1 reserved.
- Freedom-Plus validator passed with exactly ID1 plus three approved representatives.
- The removed fourth representative is absent from fresh genesis.
- NFT membership is authorized on fresh FGT by multisig transaction 16.
- FPT and FPTr operator configuration is locked; all suite ownership is multisig.
- The verified pre-reset MongoDB backup is recorded in
  `docs/STAGING_RESET_EXECUTION_2026-09-29.md`.
- The guarded reset cleared all 41 `finfreedom-staging` collections to zero.

## Restart Order

1. Update both Render services with every backend variable above and the approved
   HTTP/WSS RPC endpoints.
2. Keep API indexing disabled and worker indexing enabled.
3. Resume the worker first and wait for both F-Freedom and Freedom-Plus replay
   completion from the exact start blocks.
4. Resume the API, deploy Vercel with the matching `VITE_` addresses, and run the
   staging certification matrix before reopening tester access.
## Runtime Verifier Mapping

The F-Freedom vault variables (`NFT_POOL_VAULT_ADDRESS` and
`OPERATIONS_VAULT_ADDRESS`) and the Freedom-Plus vault variables
(`FREEDOM_NFT_POOL_VAULT_ADDRESS` and
`FREEDOM_PLUS_OPERATIONS_VAULT_ADDRESS`) belong to separate deployed suites.
The Freedom-Plus startup verifier must compare its settlement router only with
the Freedom-Plus variables. This mapping was corrected after the first hosted
restart exposed the distinction between the fresh vault addresses.
## Hosted Replay Control

The first clean hosted worker restart exposed a staging default of five blocks per
`eth_getLogs` request. That made startup catch-up scan thousands of empty ranges.
Historical Freedom-Plus startup replay is disabled on the reset staging services
with `FREEDOM_PLUS_STARTUP_REPLAY_ENABLED=false`; the shared WebSocket connection
continues to attach all 16 Freedom-Plus listeners for new tester transactions.
Production was not changed.
