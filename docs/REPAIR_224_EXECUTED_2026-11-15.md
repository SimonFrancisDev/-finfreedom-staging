# Proposal 224 executed and verified on Polygon mainnet

## Confirmed milestone

The founders executed authorization proposal 257 in block 97368079, transaction
`0xa956e67469bef653b730348977dbdb06612594ba6c109515749449ee07c387da`.
At block 97368156 the four original founder owners plus the restricted helper
were present, the threshold remained three, and 224 still had three approvals.
Proposal 258 was unexecuted with zero approvals. The helper runtime matched the
reviewed deployment exactly.

The operator then executed **224 only** through helper
`0x16F9ac40B06e2a17bc0CC145b211A176E8654906`.

- Network: Polygon mainnet, chain ID 137.
- Governance: `0x785cC854ce9e13CE1140cbFD7C08620713E1711d`.
- Repair transaction: `0xf60d906cc61369abb59881abf3ebb98cf37dbf1b999e8812347ad7af5d0ceff4`.
- Receipt: SUCCESS, block 97368395.
- Block hash: `0x2a86e06dd3a160b2b14830679b8dc40ffe7c8e205c4f04d1fb0737e58853fc52`.
- Gas used: 30,637,888; limit: 32,800,000; signed access-list keys: 3,900.
- Actual transaction fee: 8.400209192666047232 POL.
- Operator balance after verification: 6.437139607970823369 POL.
- Verification completed: 2026-11-15 15:54:46 UTC.

This is an actual mined repair, not a fork simulation or an approval-only step.
It does not complete the whole combined repair package or reopen the programs.

## What was verified

The final preflight used the actual deployed and authorized contracts, without
any state override. It checked the approved payload, owner set, threshold,
timelock, helper/executor/migrator runtime hashes, proxy implementations, all 12
pauses, the six repair prestates and absence of out-of-order later executions.
The signed transaction was checked for sender, network, target, payload, nonce,
fees, gas and complete access list before one raw broadcast. No founder key was
requested, no wallet protection was disabled and no retry was sent.

After mining, debug_traceTransaction proved that all 46 application repair event
payloads and all application storage changes matched the reviewed baseline.
The only excluded differences were the helper completion flag/event and native
POL gas accounting. No token Transfer events occurred. No activation payments
were repeated and no new compensation payment was made.

The current contract getters independently matched the entire approved slot
vectors for these six orbit records, 110 slots in total:

| Orbit owner | Orbit | Slots verified |
| --- | --- | --- |
| ID1 `0xCE38722a72c9099D9237897E18B0cfb6D51c4470` | P4, level 1 | 4 |
| ID1 | P4, level 7 | 4 |
| ID1 | P12, level 8 | 12 |
| Lady Sabina `0xb673c9D14Da920f187d25Cc793f1955a43284622` | P12, level 8 | 12 |
| ID1 | P39, level 3 | 39 |
| ID1 | P39, level 9 | 39 |

In the agreed Sofia/Lady Sabina arrangement, Lady Sabina retains ID1 level-8
position 3 and level-9 position 2. Sofia
`0xEA2bCf620d164Af63fba2F832C5F37E9eABdC528` occupies ID1 level-8 position 6
under Lady Sabina, and ID1 level-9 position 3. Registration matrix-parent reads
confirm Sofia's level-8 parent is Lady Sabina and level-9 parent is ID1. This is
the approved historical exception, not a change to the ordinary late-upline rule.

The deferred ID1 level-6 state hash remained
`0xbaad5e41a605c667d37e5b20e7e1790e132d6547219a3aa5f9b78af8233b221d`.
All 12 affected contracts remained paused. Proposals 225-256 were still
unexecuted at the verified repair block. Freedom Plus historical repair 225,
final operating implementations, temporary-permission removal, backend/UI
reconciliation and reopening therefore remain separate later steps.

## Immediate founder instruction

Refresh https://www.finfreedomnetwork.io/admin on Polygon mainnet. Three founders
approve **258**, then one executes it. It removes only the restricted helper
contract from the owner list; it does not remove a founder. Then STOP and report
completion. Do not retry 224 or execute 225-256 yet.

The frontend release for 258 is tied to the verified 224 transaction and block.
Execution also checks live that 224 is executed, not cancelled, and that the
helper is still an owner. The next gate is verifying removal, the original four
owners and threshold three before progressing with 225. No production database
or suspended staging service was touched in this pass.

## Evidence

- `evidence/repair224-helper-authorization-status-2026-11-15.json`
- `evidence/repair224-authorized-execution-preflight-2026-11-15.json`
- `evidence/repair224-mined-execution-2026-11-15.json`
- Runner: `smart-contract/scripts/executeRepair224Relay.js`.
- Focused runner assertions: `smart-contract/test/repair224RelayRunner.node.test.js`.

The execution journal includes public request/access-list data and the transaction
hash, never the signing key or raw signed bytes. A recorded hash prevents the
runner from sending a duplicate; a resumed run only verifies that transaction.
