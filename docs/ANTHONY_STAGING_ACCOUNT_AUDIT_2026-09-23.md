# Anthony staging account audit - 2026-09-23

## Accounts

- FFN-2PKGGJ: `0x3a596f67585f27cfd7f449fec0a92b7bf34b1df5`
- FFN-6VKAID: `0x3f6bb1e6bfeb9c52f763a197d27b580d7de7f100`

## Freedom-Plus founder state and 600 mock USDT

FFN-6VKAID was approved as the first Freedom-Plus founder representative during the 2026-08-29 staging genesis. Genesis transaction `0x543a28b6454872ae778b6b7a2ebb25db52cae82b94a3af5c5e025561005ce738` activated all seven Freedom-Plus levels, issued 54,650 FPT, and placed the wallet at position 1 under ID 1. Genesis did not pay it USDT.

The 600 USDT is three successful routed payments from two participant wallets. Receipt events and mock-USDT transfers agree with the deployed percentages:

1. `0xd2de31242823199ecafe04fa07e94354a2d6fc47f707ae73db512ea08a67b9db`: FFN-2PKGGJ Level 2, 150 USDT. It occupied ID 1 P14 position 5 beneath founder position 1. The structural-parent role paid 15%, or 22.50 USDT, to FFN-6VKAID.
2. `0xe36297c33f890a988b24d74c6bf4708b753cf29007be8c7278d9df2315b9a0cb`: FFN-2PKGGJ Level 4, 1,350 USDT. The same structural relationship paid 40%, or 540 USDT, to FFN-6VKAID. Another 675 USDT entered the Level 4 recycle reserve and 135 USDT was the system charge.
3. `0x1480b34c610869ca4e7b7c284ddcefefc5c69425f47c27db91267680fa0e696c`: `0xf0152a2490a854712fae8fd32ffcd9729082a09d`, sponsored by FFN-2PKGGJ, activated Level 2 for 150 USDT. FFN-2PKGGJ received 22.50 USDT and its structural parent, FFN-6VKAID, received the 25% second-ring role, or 37.50 USDT.

Therefore 22.50 + 540 + 37.50 = 600 USDT. These are structural orbit earnings and do not imply that FFN-6VKAID directly sponsored a participant.

## F-Freedom indexing diagnosis and recovery

The chain contained all ten successful activations and 10,230 FGT, while MongoDB originally contained only Level 1 and its 10-FGT mint. The supplied authenticated Amoy RPC proved and recovered Levels 2-10 from these blocks:

| Level | Block | FGT | Transaction |
| --- | ---: | ---: | --- |
| 2 | 48141118 | 20 | `0x36057f577b4b4256b4fef684e657ef736b9dc2d85cc0564b5b204ceaaf07cdc6` |
| 3 | 48141150 | 40 | `0xe99a015c37fc9ee9e5d0a7d3014d860bab66d1c7c83cc704472b42546bf966a5` |
| 4 | 48141243 | 80 | `0xd0e1162232e5daaeb5c1920d43bfe9db0ba76fe32aceace65115380b16cfb186` |
| 5 | 48141284 | 160 | `0x0499a8b2ab530dbc1435802f7d5aa73db4abf23cb3dc589894d665fcc90418d7` |
| 6 | 48141314 | 320 | `0x223b11c58642dc67e188dc6d93346508ca536d50a3b8dc3125d8669eaa50e642` |
| 7 | 48141352 | 640 | `0x6cdcdb08079da86d61867376a05e3dcf8b14821ec7017b2b60859eb5dc112531` |
| 8 | 48141385 | 1,280 | `0x839531260297611ed6898ee40c289f7b40ed8b552af266875cd10c448fb71298` |
| 9 | 48141424 | 2,560 | `0x9d7549d233b7d06c1582634b6acb90761596bf3416d3fa6e296756def105ec42` |
| 10 | 48141458 | 5,120 | `0x600a89dcd0d686843e92ff5648f5c839a8515efa45b25c55267c6297daa4e3e3` |

A targeted idempotent replay was run only on these proven blocks for the F-Freedom registration, level manager, escrow, orbit, FGT, FGTr, and token-controller targets. Post-replay verification found exactly ten activation summaries, exactly ten FGT mint events, total 10,230 FGT, and no unresolved replay gap.

## NFT lock defect and fix

Three NFT transactions established the current FGT breakdown:

- Block 48141664: locked 7,350 FGT, transaction `0x8a391af4996c6e5dacad385f8fac735488cf5b5258641ddd6930676b9b66475b`.
- Block 48141827: unlocked 7,350 FGT, transaction `0x6984800269ddbabddc574200f4ec0ea51561b6da61afed134dc49e69958060cf`.
- Block 48142124: locked 5,700 FGT, transaction `0x915eaab0349a932cc3816f77ccff24715708d25553d30a4700f5703e0d99f679`.

The backend listened for `UtilityLocked` but not `UtilityUnlocked`, and calculated current locked tokens as the sum of all historical locks. The fix adds unlock events to polling/replay and WebSocket listeners, subtracts unlocks from current locks, subtracts burns from total balance, and labels unlock history correctly. The three NFT blocks were replayed after the fix.

Local service verification against staging data now matches the contract:

- Total FGT: 10,230
- Locked FGT: 5,700
- Available FGT: 4,530
- Burned FGT: 0

The backend changes must be committed, pushed, and both staging API and staging worker redeployed before the public staging API uses the corrected calculation and subscribes to future unlock events. No smart-contract or frontend deployment is required for this fix.

The authenticated RPC URL/token is intentionally not stored in this document or committed files. Because it was shared in chat, rotate the token after the recovery and deployment checks are complete.