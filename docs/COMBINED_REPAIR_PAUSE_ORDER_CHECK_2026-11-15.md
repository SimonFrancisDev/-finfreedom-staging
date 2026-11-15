# Mainnet repair: out-of-order pause investigation

## Verdict

The reported out-of-order execution was proposal **212**, which paused Freedom
Plus P39 before proposal 204. All twelve pause proposals 204-215 subsequently
completed. No temporary installation, historical repair, final upgrade,
permission revocation or reopening proposal had executed at the checked block.

This was a deviation within the pause phase, not execution of a later repair
phase. The post-pause guarded-state checks passed. No rollback or replacement
pause proposal is indicated by this finding. Do not repeat proposal 212.

## Read-only chain boundary

- Polygon mainnet: chain ID 137.
- Governance: `0x785cC854ce9e13CE1140cbFD7C08620713E1711d`.
- Checked block: **97355943**, **2026-11-15 10:43:04 UTC**.
- Block hash: `0xdaf24b2fcd9e9faa72a7555ff7635b66d6657e9d5af426f26afa146c4006b041`.
- Governance execution/cancellation logs checked from 97353535 through 97355943,
  covering activity after the last verified permission checkpoint.
- Mainnet governance runtime and all 67 replacement proposal targets, zero
  values and calldata hashes matched the recorded package.
- No key loading, signing, live transactions, deployments or hosted changes.

## Actual execution order

| Order | Proposal | Block | Successful execution transaction |
| ---: | ---: | ---: | --- |
| 1 | 212 | 97355334 | `0xe3444bba5ce12d37fc7e724b7b63c748ab254cc900c5e6241f6010d2fece5467` |
| 2 | 204 | 97355467 | `0x9880ba48411535189052c6792b7da67e2ef9eda7e92be95362a84bbf67157e5a` |
| 3 | 205 | 97355480 | `0x40808464454955f3f5d211c6184554ca3cc6f7106371eb34b396ce673a69b6c7` |
| 4 | 206 | 97355492 | `0xfae49e41fccfb42bc5103ee59a3f128b71b184a0efb08430eaf8a55a8912166a` |
| 5 | 207 | 97355504 | `0x7c1419d13e0736ba20518f9c04fb920624140c882d59c08b55b2580979655784` |
| 6 | 208 | 97355515 | `0x7742ba1b2cf39b7cea2fc82eb1b469505a4d111c52e22c7fd06a814027d87200` |
| 7 | 209 | 97355527 | `0xb3ab39f7b2c779b90193218e455663b2a21a268369664d2020e507b8994939dc` |
| 8 | 210 | 97355545 | `0x770a42e91d8e7114669dc6d39be5fc7fa381ebea4d5a8c01c7e53fcb79116220` |
| 9 | 211 | 97355564 | `0xa7d17fc6dc468cd012d79f0e3c9c7fea40a1225fb007895612ff086bb731bd66` |
| 10 | 213 | 97355581 | `0xbe97a9ce46d1be2ef231620ec6425315827483dc59007b4f1357b1d91fab5615` |
| 11 | 214 | 97355598 | `0xd59cfeb031304a0e682a3c9a43efdf633966400aa2c2b50b2b4821a7fad5de19` |
| 12 | 215 | 97355610 | `0x068df4bbe6855f9caaf61080b31e1b2d1f062ee9ba4ff4e44b9a9747a71c274e` |

Proposal 212 executed at **10:27:50 UTC**. Proposal 204 followed at **10:31:10 UTC**.
The final pause, 215, executed at **10:34:44 UTC**. Each receipt has status 1,
one Paused event at its exact intended target, and no ERC20 Transfer events.
Transaction gas fees are separate from program payments.

## Current state and verification

- Proposals 190-215 are executed. Proposals 216-256 remain unexecuted,
  uncancelled and without confirmations. Governance count is still 257.
- All five affected F-Freedom contracts and seven affected Freedom Plus
  contracts report paused = true.
- All twelve proxy implementation addresses still match the pre-maintenance
  operating implementations. No temporary implementation was installed early.
- Both bound repair executors report executed = false.
- All six F-Freedom guarded orbit records match the submitted prestate:
  ID1 levels 1, 7, 8, 3 and 9, and Sabina level 8.
- Relevant F-Freedom permanent sponsors, current matrix parents, registrations
  and activation prerequisites match the plan. Manager/router, ID1 and USDT
  bindings match the expected pre-upgrade configuration.
- All five Freedom Plus guarded orbit records match: ID1 levels 1, 2 and 3,
  plus the first representative's levels 2 and 4.
- The guarded comparisons include destination occupancy, existing positions
  and counters. The planned empty destinations remain as rehearsed.

The early pause made P39 unavailable before the other pauses. Calls that require
its unpaused placement function would revert rather than partially commit that
activation. This check did not enumerate failed user attempts or their gas fees,
and does not certify unrelated user activity. It establishes that the successful
pause calls did not transfer program tokens, execute the repair, or change the
guarded placement records.

## Next permitted phase

The mandatory post-pause record check has passed. The next phase is proposals
**216-223 in order**, installing the bound temporary repair implementations.
Continue only through the documented sequence and its verification conditions:
the two repair results must be checked before final operating installations.
Keep the programs paused and **do not approve or execute 245-256** before the
post-repair chain, financial-record, backend and website reconciliation passes.

This incident check is not evidence that either historical repair is complete.
