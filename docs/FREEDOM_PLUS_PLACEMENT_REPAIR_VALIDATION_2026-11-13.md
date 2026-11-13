# Freedom Plus placement repair: validation record

## Status and network boundary

This is a local candidate and rehearsal record, not proof of a live repair.
Source state: Polygon mainnet **137**, block **97257828**, hash
`0xa29f6d1b28e9cfe2fcf3ff563aa0303c01d4b2e11f1c435c742018ab62e36bb5`,
13 November 2026, 17:49:58 UTC. Execution: disposable Hardhat **31337**.
No mainnet transactions, proposals, approvals, transfers, environment edits,
database writes, resets or service restarts were performed in this pass.
Both suspended staging services remain untouched.

The source folder is named `staging-environment`; it does not select Amoy.
The source network, block hash, orbit implementations and router implementation
were checked against the saved mainnet bindings before the fork repair.

## Agreed behavior

Create the placements required by actual orbit relationships. Additional
exhausted-ancestry payment components to ID1 do not create duplicate positions.
Keep permanent sponsorship separate from cycle-specific structural ancestry.
A skipped sponsor cannot reclaim an established branch just by activating later.
The separately authorized Sofia/Sabina F-Freedom level-8 arrangement remains a
one-time exception, without compensation. It is not an exception for Freedom Plus.

## Findings and changes

1. The old router excluded ID1 from all routed appearances. This omitted 16
   genuine ancestor appearances even though their associated payments occurred.
   The candidate records a genuine ID1 ancestor once, but still omits artificial
   positions for additional fallback components.
2. Genesis seeded the third representative into ID1's second ring at binary
   levels 2/P14 and 4/P6, beneath the first representative, without the matching
   first-ring appearance in that representative's own orbit. A local paid level-2
   child failed with `MatrixAnchorNotFound`. The candidate seeds the corresponding
   non-financial genesis appearance. New level-2 and level-4 child tests check
   exact recipients, amounts, fees and positions, not merely transaction success.
3. Existing mainnet genesis cannot be initialized again. A temporary append-only
   repair restores the two missing setup links separately from the 16 paid
   appearances. It does not mint or transfer tokens or rewrite primary parents.

The second finding is a separate structural omission within the same ancestry
path. The 50 audited successful activations did not exercise that representative
branch. It is not evidence that those 50 transactions lost additional funds.

## Exact structural scope

ID1 is `0xCE38722a72c9099D9237897E18B0cfb6D51c4470`.
The full paid-position mapping, original transfers and transaction hashes remain
in [the Step 1 table](evidence/placement-payment-correction-table-2026-11-13.md).

| Engine/level | Account being amended | Empty slots appended | Meaning |
| --- | --- | --- | --- |
| P39 / 1 | ID1 | 4, 5, 13, 22, 31, 14, 8, 11 | Eight payment-backed ancestor appearances |
| P14 / 2 | ID1 | 5, 9, 13, 4, 8, 6 | Six payment-backed ancestor appearances |
| P12 / 3 | ID1 | 4, 5 | Two payment-backed ancestor appearances |
| P14 / 2 | First representative | 2 | Third representative's zero-money genesis link |
| P6 / 4 | First representative | 1 | Third representative's zero-money genesis link |

First representative: `0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A`.
Third representative: `0x117C9258a95775Ecf448fd086D00cA22506Ea79d`.
The third representative already occupies ID1 slot 3 at both binary levels,
with the first representative as structural parent. Its permanent sponsor
remains ID1. The paid user already occupying the first representative's level-2
slot 1 is preserved; the missing setup link uses empty slot 2 instead.

For the 16 paid appearances, 14 parents match permanent sponsors. Two concern
`0xAE0c7305860351a270f4c756e03071e4c18ed086` at levels 1 and 2. Its inactive
sponsor `0x834b9535468aDCEbA7d36E225837FC66e749ba9c` was correctly skipped.
The paid structural parent `0xBafaFb77a090D7F989aa64D4f867b1B942A50591` stays
its parent; do not reinsert it beneath the skipped sponsor.

## Repair safeguards

The repair is bound to proxy, execution chain, governance executor and plan hash.
Registration, manager, router and the engine must be paused. Full affected-orbit
prestate hashes reject changed slots, counters, parents or bindings. The repair
rejects occupied destinations, duplicate activation/participant entries, missing
parent appearances, invalid component amounts/identifiers, unmatched original
timestamps, active reserves, completed cycles, and edits that would reach the
recycle-reserve window or close a cycle. Execution is atomic and non-repeatable.

Only missing entries and their occupancy counters are appended. Existing paid
positions, primary parents and token accounting are not edited. Dedicated repair
events reference the original transaction and original position data; they do
not masquerade as a new purchase or backdate the repair event itself.

Solidity enum names/order were extracted from compiler ASTs for storage checks.
No unsafe custom-type allowance was used. Four forward/reverse storage checks
passed; deliberately reversing enum members was rejected in each case.

## Validation results

- Focused ancestry/genesis tests: 9 passed.
- Settlement suite before the additional repair/boundary cases: 43 passed.
- ID1 full-cycle/re-entry boundary regression: passed.
- Initial historical-repair cases: 3 passed, including a later paid occupant
  remaining in place while missing genesis ancestry is restored elsewhere.
- Expanded full settlement/repair suite: **56 passed**, zero failures, in about
  four minutes. This includes the nine malformed/unauthorized repair cases,
  the ID1 cycle boundary and the reserve/recycle cases across all orbit types.
- Backend projection tests: 22 passed, comprising 14 Freedom Plus cases and
  8 existing F-Freedom historical-repair cases.
- Mainnet-fork repair: passed; **5,557,415 gas**, 16 paid appearances plus two
  genesis appearances, zero token-transfer events, watched USDT balances and
  FPT/FPTr supplies unchanged, occupied slots in affected orbits unchanged.
- After restoring the original engine implementations and installing the
  candidate router locally, wallet `0x863447369632EA4AaC724683c1D448C68e2f1ADE`
  successfully activated level 4. This probe used local synthetic funding and
  is not a new mainnet activation or a complete future-cycle financial audit.

The fork used local governance impersonation with actual Guardian approvals and
UUPS upgrade calls. It did not certify the final multisig proposal sequence,
quorum or execution timing. Read-only storage values are cached by pinned block
and proxy to avoid repeated RPC reads on rehearsal reruns.

## Guardian prerequisite

All four affected Freedom Plus orbit proxies had `approvedProxies == false` at
the pinned block. The first rehearsal correctly rejected an implementation-only
approval. The passing rehearsal explicitly approved each proxy and its bound
implementation through its actual Guardian, owned by the mainnet multisig.
The production package must include these approvals; never bypass the Guardian
or assume implementation approval alone is sufficient.

## Backend and release work

The backend candidate decodes the dedicated repair events, requires the original
indexed placement, and inserts only the missing position. Original transaction,
date and block remain distinct from repair transaction/date/block. Replayed
events do not create payment, earnings or activation records. An occupied-slot
conflict fails rather than overwriting another participant. Position-count
reconciliation includes the new structural events. No polling was introduced.

Before mainnet execution:

1. Publish the validated candidate/evidence commits. The expanded regression run
   is complete; publication is not a production deployment.
2. Integrate the validated Freedom Plus append-only repair into the combined
   F-Freedom/Freedom Plus governance package. Include Guardian prerequisites,
   pauses, bound temporary implementations, atomic repair, final implementations
   and permission cleanup. Do not reuse stale bound plans or pretend the current
   multisig supports batch cancellation.
3. Rehearse that exact combined multisig sequence and review the two genesis
   setup additions explicitly alongside the already approved Sofia exception.
4. Release and verify backend event support before executing repair transactions.
5. Refresh mainnet state, old-proposal status, bindings and balances. Stale plans
   must fail and be rebuilt; do not force them through.
6. Submit the verified proposals and give founders exact IDs and execution order.
   Approval/execution must be verified on chain, then reconcile served positions,
   payments and counters before reopening affected activity.

No old level-6 history is rearranged. NFT distributions and unrelated UI are
outside this pass. There is no 512-USDT compensation transaction in the plan.

## Evidence and reproduction

- [Pinned fork rehearsal](evidence/freedom-plus-historical-repair-rehearsal-2026-11-13.json).
- `smart-contract/scripts/rehearseFreedomPlusHistoricalRepair.js`.
- `smart-contract/test/freedom-plus-settlement-router.test.js`.
- `backend/test/freedomPlusHistoricalRepair.test.js` in the backend repository.

Local tests require no live keys:

```powershell
node node_modules/hardhat/internal/cli/cli.js test --network hardhat --no-compile test/freedom-plus-settlement-router.test.js
```

For the fork script, explicitly set `FP_REPAIR_MAINNET_RPC` and
`ID1_ALLOW_SYNTHETIC_FUNDING=1`; run only with `--network hardhat`.
The RPC is read-only source data. Generated simulation transaction hashes are
not mainnet proposal or deployment hashes.
