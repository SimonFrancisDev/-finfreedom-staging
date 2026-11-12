# Sofia/Sabina historical repair rehearsal

## Boundary

This is preparation and local validation, not an executed production repair.
Production, databases, hosted environment variables, and both suspended staging
services are unchanged. No private signing key is used. Mainnet is read-only;
the repair and synthetic funding execute exclusively on Hardhat chain 31337.

The related future-behavior correction is recorded in
`ID1_PRIMARY_PLACEMENT_CORRECTION_2026-11-12.md` and commit `f861453`.

**This is not a final production manifest.** The level-6 extra-position finding
below must be dispositioned before a live repair is approved. Passing a bounded
level-8/9 rehearsal does not close that separate historical case.

## Reviewed snapshot and correction

The read-only inventory is pinned to Polygon mainnet block **97175651**, at
**2026-11-12 07:35:33 UTC**. The rehearsal verifies its block hash against the
explicit mainnet RPC and rejects any source chain other than 137.

| Orbit | Before | Proposed current positions |
| --- | --- | --- |
| ID1 level 8 | Sabina at 3; Sofia missing | Sofia at 3; Sabina at 4 |
| ID1 level 9 | Sabina at 2; Sofia missing | Sofia at 2; Sabina at 3 |
| Level-8 slot-1 parent's own orbit | Empty | Sabina at 1, ancestry mirror |

Wallets:

- ID1: `0xCE38722a72c9099D9237897E18B0cfb6D51c4470`
- Sofia: `0xEA2bCf620d164Af63fba2F832C5F37E9eABdC528`
- Sabina: `0xb673c9D14Da920f187d25Cc793f1955a43284622`
- Level-8 parent/adjustment recipient: `0xE8b1ac47231651cCc38326a59645a8D976D0Eabf`

Permanent sponsors are NOT rewritten. Sofia's permanent sponsor remains Sabina.
Only the per-level placement parent changes: Sofia 8/9 to ID1, Sabina 8 to the
slot-1 parent; Sabina 9 remains under ID1.

## Money and historical truth

The proposed correction pays **512 USDT** to the level-8 parent, representing
the 40% component of Sabina's 1,280-USDT activation under the clarified rule.
The live funding source has not been selected or approved. The rehearsal funds
a disposable local signer with synthetic USDT and labels this explicitly.

- No second charge to Sofia/Sabina, no NFT/OPS withdrawal, no founder clawback.
- No FGT/FGTr mint, no new activation, no registration or referral changes.
- The parent's level-8 cumulative earnings increase by the funded adjustment.
- ID1's actual historical cumulative earnings are not reduced: those original
  transfers happened. The adjustment is separately journaled, not disguised as
  a reversal or an original activation payment.
- Existing payment snapshots remain evidence of their original payouts, even
  when a position moves. They must not be presented as new transfers.
- Original receipts and completed-cycle archives are unchanged. The open-cycle
  archive is corrected alongside current positions, with old/new slot state and
  previous archive bytes emitted in dedicated repair events.

## Guarded execution design

Temporary UUPS implementations reuse the existing storage layout. Each is bound
to one proxy, one executor, one chain and one exact encoded plan hash. A separate
unstructured flag prevents replay without consuming or shifting application
storage fields.

Each orbit plan fingerprints its owner/configuration, summary, counters,
current slots and current-cycle archive. It aborts when any fingerprint changes.
Registration edits separately require the reviewed sponsor, old placement parent,
active level and eligible replacement parent. All repair targets must be paused.

One governance-only executor applies all four target plans and transfers the
512 USDT in a single transaction. An unfunded transfer, changed state, changed
manifest or other failed step reverts all changes. It checks the exact sender
debit and beneficiary credit. It cannot silently complete an orbit during repair.

Actual mainnet implementation bytecode must match the saved compiler baseline.
Old-to-temporary and temporary-to-corrected storage layouts must pass comparison.
The fork exercises the guardian allowlist and UUPS calls, not just direct slot
replacement. Temporary slot replacement is limited to read-only inspection on
the disposable local fork.

## Arrival counters and limits of this inventory

The pinned snapshot has paid ID1 slots previously excluded from arrival counters.
The candidate manifest normalizes current counters in levels 1, 3, 6, 7, 8 and 9
to their occupied positions, without inventing money in recycle reserves.
Historical payment-rule snapshots remain unchanged. Other current ID1 levels
already have matching counts at this checkpoint.

Older duplicate ID1 mirror positions were also observed at level 6: activation
1124 at slots 7/10 and activation 1036 at slots 9/12. This repair preserves those
positions and their payments. It is not authority to remove other users or claim
that all historical placement cases throughout the system are resolved. Their
transition handling must be reviewed before a broader production rollout.

### Sofia level 6: original receipt verified

The original mainnet transaction is
`0xa22e95b1b2f2413b0a7bb912762b9f13b4fe453941917e37b5ca0d382db707d8`,
block **96532390**, **2026-11-01 03:34:01 UTC**, successful status 1.
Its actual USDT Transfer events reconcile the one 320-USDT payment as follows:

| Recipient | Actual USDT |
| --- | --- |
| Sabina | 64.00 |
| Eight founders combined | 224.00 (28 each: 8 + 20) |
| NFT | 25.60 |
| Operations | 6.40 |
| Total | 320.00 |

There is no duplicate activation charge or excess payout in that receipt.
The structural discrepancy is different: the 64-USDT and 160-USDT components
reaching ID1 each created a mirror, at slots 7 and 10 respectively, both linked
to activation 1124. Under the newly clarified rule the extra terminal component
is payment-only and should not create the second ID1 position. The future code
correction addresses that path, but does not remove historical positions.

This is related to ID1 fallback handling, but is not the same operation as
restoring Sofia's missing primary positions at levels 8/9. Her level-6 primary
position exists at Sabina's slot 2. Historical descendants, occupied slots and
counter/recycle consequences must be traced before deleting or moving a mirror.

Activation 1036 was also reconciled against its mainnet USDT Transfer events:
transaction `0x4aaa0866c0eb85348d73479dc8491d7a555fc7726055f604b37e458a5bbb033c`,
block **95478606**, **2026-10-13 20:27:01 UTC**, successful status 1. The payer
`0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1` paid 320 USDT once. Its primary
owner `0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1` received 64 USDT; founders,
NFT and operations received the same 224/25.60/6.40 split as above. The two
terminal components created ID1 slots 9 and 12. This independently confirms
the extra-position pattern; it does not establish a duplicate financial debit.

The current snapshot also shows activation 1107, wallet
`0x97a9D413D35D02E84f936e1a05e7262b90BB3F82`, at ID1 level-6 slot 21. P39's
parent-position mapping places slot 21 below slot 12, one of the extra mirrors.
Deleting slot 12 alone would therefore orphan an occupied structural branch.
Its receipt is now reconciled below; possible relocation of that descendant
still requires a reviewed branch-level plan before any removal. This finding is why the local rehearsal preserves these positions
and must not be promoted unchanged as a complete live historical repair.

### Descendant activation 1107: receipt verified, relocation not approved

Polygon transaction
`0x008dc1e8647f1ca3ca69362e7395fc68e50d4f74ae2a8ceeb5e44c32ddb2436e`
was successful at block **96385270**, **2026-10-29 14:14:44 UTC**. One
320-USDT debit reconciles to these actual transfers:

| Recipient | Actual USDT |
| --- | --- |
| `0xE8b1ac47231651cCc38326a59645a8D976D0Eabf` | 64.00 |
| `0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1` | 64.00 |
| Eight founders combined | 160.00 (20.00 each) |
| NFT pool | 25.60 |
| Operations | 6.40 |
| Total | 320.00 |

The events link activation 1107 to primary position 2 in the first recipient's
orbit, mirror position 7 in the second recipient's orbit, and mirror position
21 in ID1's orbit. Its financial summary reports 288 USDT liquid, zero upgrade
escrow, zero recycle reserve and 32 USDT system charge. These amounts agree with
the token transfers. This proves transfer conservation for this receipt, not
that its historical branch placement matches the corrected placement rule.
The receipt must remain intact regardless of a later current-position repair.

Evidence: `evidence/id1-level6-descendant1107-receipt-2026-11-12.json`.

Decoded mainnet evidence is saved as
`evidence/id1-sofia-level6-mirror-receipt-2026-11-12.json`.
The second receipt and transfer reconciliation are in
`evidence/id1-level6-activation1036-receipt-2026-11-12.json`.

## Validation status

- Six plan-builder tests passed: exact position changes, untouched neighboring
  slots, preserved historical payouts, destination collision rejection, exact
  funded credit, per-ring counters and permanent-sponsor guards.
- New contracts compile; temporary orbit implementations are 11,568 bytes,
  registration repair 12,465 bytes and executor 2,988 bytes, below EIP-170 limits.
- The atomic historical repair passed on the disposable mainnet fork, including
  exact funded payment, position changes, unchanged sponsors/activations/token
  supply, preserved completed cycles and raw-storage agreement between every
  affected current slot and its open-cycle archive.
- Unauthorized caller, altered manifest, direct bypass, wrong chain, wrong
  proxy, unfunded payment, unpaused registration, stale prestate and replay
  guards passed. The unfunded case reaches the token's insufficient-balance
  error and rolls back the earlier position edits; an unrelated revert is not
  accepted as proof.
- Actual local execution used **25,507,580 gas** (estimate 25,998,938; limit with
  10% margin 28,598,832; local block limit 30,000,000). This exceeds the initial
  conservative budget of 25 million. The actual multisig/governance wrapper,
  current network limits and live cost still require separate validation.
- All three isolated post-repair activation probes passed: Sofia L8 (ID1 slot
  6, Sofia slot 1, Sofia +512 USDT), Sabina L8 (parent slot 4, Sabina slot 1,
  parent +640 USDT), and Sofia L9 (ID1 slot 5, Sofia slot 1, Sofia +512 USDT).
  Every activation summary conserved its complete activation amount. These
  are synthetic-funded local transactions, not mainnet transfers.
- Full bounded rehearsal: **passed**, exit code 0. The separate historical
  duplicate-branch issue and wider certification are not closed by this result.

The original candidate exhausted gas before reaching its funding check. Merely
avoiding unchanged writes, or separating full before/after fingerprint reads,
did not resolve that failure. The validated repair keeps every precondition
fingerprint, calculates it in a separate read frame returning only the hash,
and omits the redundant full post-write fingerprint from the summary event.
Old/new slot state and previous archive bytes remain in the detailed journal.
Independent post-execution checks verify actual current and archive storage;
no assertion was weakened to accept the original out-of-gas failure.

Reproduction from `smart-contract`, after configuring the explicit read-only RPC,
saved compiler baseline and `ID1_ALLOW_SYNTHETIC_FUNDING=1`:

```text
node --test test/id1-historical-repair-plan.node.cjs
node node_modules/hardhat/internal/cli/cli.js compile
node node_modules/hardhat/internal/cli/cli.js run --network hardhat --no-compile scripts/rehearseId1HistoricalRepair.js
```

The generated checkpoint is `tmp/id1-repair-prestate.json`; detailed rehearsal
output is `tmp/id1-historical-repair-rehearsal.json`, relative to the workspace.
The latter records explicit pass/fail status, plan hashes, original states,
synthetic funding, local logs and local future-activation probes.
The completed result is preserved in
`docs/evidence/id1-historical-repair-rehearsal-2026-11-12.json` relative to the
staging source repository, including SHA-256 hashes of the executed candidate
source, rehearsal script and plan builder.

## Before production

1. Review the completed bounded rehearsal and finish legacy reserve/cycle
   reconciliation and wider adversarial certification. Rehearse the exact live
   governance wrapper against current gas limits; the current batch is costly.
2. Decide the external compensation funding source and approve the exact ledger.
3. Resolve transition handling for other legacy ID1 positions, without silently
   expanding this case-specific correction into a system-wide rewrite.
4. Refresh state and construct the exact mainnet-bound governance package. Never
   reuse local addresses, local-chain bindings or stale snapshot fingerprints.
5. Integrate dedicated repair events into backend projections and account history;
   do not impersonate activation or ordinary payout events.
6. After authorized execution, reconcile chain, API, earnings, current/historical
   orbit displays and mobile views before announcing the case fixed.
