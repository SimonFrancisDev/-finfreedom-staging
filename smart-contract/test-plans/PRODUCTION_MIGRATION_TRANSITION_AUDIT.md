# Production Migration Transition Audit

Status: transition implementation proven locally; production execution is not yet approved.

## Implemented transition mechanism

- P12 and P39 permanent engine bytecode remains unchanged by the migration layer.
- A temporary `OrbitMatrixParentSeeder` implementation closes participant entry points while the latest proven matrix-parent values are seeded, then the proxy is restored to the corrected engine implementation.
- A temporary `LevelManagerMigrationConfigurator` records the exact `(orbit type, owner, level, source cycle)` legacy-boundary exceptions and permanently locks configuration against a second batch.
- The permanent LevelManager consumes an exception only when that exact cycle produces a recycle component. The transaction then applies legacy 90% immediate recycle semantics and bypasses the corrected two-fill reserve once.
- Consumption is transactional and emits `LegacyRecycleTransitionConsumed`. A revert restores the exception; a successful transaction deletes it.
- P4 has no legacy structured-reserve exception. Its partial state is preserved through the LevelManager migration round trip and continues under its unchanged four-position rule.

## Local transition proof

The final complete Hardhat suite records 58 passing tests in one run. Proven cases include:

- P12 proxy -> temporary parent seeder -> unchanged P12, with dependency and seeded-parent preservation.
- P39 proxy -> temporary parent seeder -> unchanged P39, with dependency and seeded-parent preservation.
- LevelManager proxy -> temporary configurator -> permanent LevelManager, with configuration persistence and one-time configuration lock.
- Exact P12 old-boundary reproduction: no corrected reserve existed, the final arrival consumed the configured exception, no reserve event was emitted, and recycle gross was 18 USDT.
- Exact P39 old-boundary reproduction: no corrected reserve existed, the final arrival consumed the configured exception, no reserve event was emitted, and recycle gross was 36 USDT.
- Corrected ordinary P12 behavior remains 40% routed + 50% reserved + 10% charge, releasing after two qualifying boundary arrivals.
- Corrected ordinary P39 behavior remains 20% + 20% routed + 50% reserved + 10% charge, releasing after two qualifying boundary arrivals.
- An in-progress P4 cycle preserved its pre-migration occupants, continued after the LevelManager round trip, completed exactly once, and archived the preserved positions.
- Permanent deployed bytecode sizes remain below the 24,576-byte EVM limit: LevelManager 24,133 bytes, P12 24,567 bytes, P39 24,385 bytes.

## Safety boundary

- Production remains read-only during this audit.
- No proxy upgrade, database mutation, funding, or corrective transfer is authorized by this document.
- Deployed production behavior, production working-tree edits, and corrected staging behavior must remain distinct.
- A transition rule is acceptable only when it is deterministic, storage-safe, tested across an upgrade boundary, and approved by the founders.

## Refreshed production evidence

Read-only inventory refreshed on 2026-07-15:

- Chain: Polygon mainnet, chain ID 137.
- Live head inspected: block 90263184.
- Last indexed core-contract event: block 90238863.
- Exact scan from block 90238864 through 90263184 found zero unindexed logs across the seven core contracts.
- Registered participants: 191 including ID1.
- Level activations: 454.
- Payout receipts: 696.
- Financial events: 1,895.
- Escrow events: 63.
- Partial escrow states: 18.
- Wallet-level orbit states with at least one completed cycle: 17.
- Active levels: L1=190, L2=114, L3=64, L4=39, L5=26, L6=12, L7=6, L8=2, L9=1, L10=0.

The polling SyncState cursors are stale because polling is disabled. This does not imply a missing event tail: event collections are current through block 90238863 and the direct chain scan found no later core-contract logs.

## Confirmed behavior differences

| Area | Current production behavior | Corrected staging behavior | Migration risk |
| --- | --- | --- | --- |
| Normal structural routing | Several P12/P39 paths derive recipients from permanent sponsor lookups. | Structural candidate comes from the stored matrix-parent hierarchy; an ineligible candidate is then skipped through its permanent sponsor chain under approved Rule A. | Existing orbit topology may not contain the matrix-parent storage expected by corrected code. |
| Exact-level eligibility | Historical production allowed some routed receipts to wallets without the payment level active. | Candidate must have the exact level active; otherwise it receives no liquid payment, escrow, receipt, or mirror. Search continues through the candidate's sponsor chain and finally ID1. | Historical receipts must not be silently clawed back or converted into placements. |
| P12 recycle boundary | Line-2 paid arrivals 8 and 9 each route 90% immediately as recycle. | Each boundary arrival routes 40% normally and contributes 50% to a two-fill recycle reserve. Recycle settles only after both 50% components exist. | A partially completed old cycle has no stored corrected reserve. Blind upgrade can carry the final old-cycle fill into the next cycle. |
| P39 recycle boundary | Line-3 paid arrivals 26 and 27 each route 90% immediately as recycle. | Each boundary arrival routes 20% + 20% normally and contributes 50% to a two-fill recycle reserve. Recycle settles after both components exist. | Same empty-reserve problem if an old cycle has already reached its first boundary arrival. |
| Recycle receiver | Old router immediately resolves and pays one recycle receiver for each non-zero recycle amount. | Structured P12/P39 recycle releases the combined reserve and applies the full orbit routing through eligible recipients; P4 remains its own four-position behavior. | Previously paid recycle value cannot be treated as if it were retained. |
| Matrix parent persistence | Production does not consistently persist the corrected P12/P39 parent relation after every placement. | P12/P39 store the structural parent when a position is placed and use it for subsequent routing. | Existing positions require a deterministic parent derivation or migration seed, not an arbitrary default. |
| Repeated structural occurrence | Older lookup can resolve the first matching occurrence of a wallet. | Corrected placement logic is designed to associate descendants with the relevant/latest structural occurrence. | Cycled or mirrored wallets with repeated appearances require explicit verification. |
| ID1 terminal fallback | ID1 may receive founder-routed fallback and older paths may still create accounting/placement side effects. | Terminal fallback is separated from a normal structural entitlement and must not manufacture a participant placement or advance a cycle. | Existing ID1 state must not be retroactively rewritten. |
| Historical cycle truth | Existing historical records reflect rules executed at that time. | New cycles record corrected snapshots and immutable history. | Old history must remain unchanged; corrected rules apply prospectively after the approved boundary. |

## Known affected production classes

### Class A: completed historical transactions

Preserve as immutable history. This includes payments, placements, escrow movements, auto-upgrades, and recycle events already finalized on-chain. Corrections are prospective unless governance separately approves an off-chain reconciliation.

### Class B: partial auto-upgrade escrow

There are 18 wallet-level states with funds already locked toward the next level. Their existing escrow balance must be preserved exactly and consumed at most once. Each state needs a pre-upgrade snapshot and a post-upgrade continuation test using the same amount and threshold.

### Class C: ordinary partial orbit cycles

Most incomplete P4/P12/P39 cycles have not crossed a changed recycle boundary. Their occupied positions, arrival counters, cycle number, historical snapshots, and next deterministic placement must remain unchanged across upgrade.

### Class D: old P12 first recycle boundary already reached

Exactly two live P12 Level 2 cycles are in this class:

1. `0xC0545331e20587208d4b27b2A3e4920Cc481133a`
   - Current position: 12; completed cycles: 0.
   - Paid line-2 arrivals: 8.
   - Old recycle payment already executed: 18 USDT liquid.
   - Receiver: `0x3f02d99d7398acdb29b2f6dca50a0e35908629c1`.
   - Source position: 10; activation ID: 341.
   - Transaction: `0x1991f5b1d6cb4052dfc2347be7eb0ba2ff7e4ad92b23701582119c81999419e7`.
   - Corrected recycle reserve on production: nonexistent/zero.

2. `0x863447369632ea4aac724683c1d448c68e2f1ade`
   - Current position: 12; completed cycles: 0.
   - Paid line-2 arrivals: 8.
   - The first boundary state was reached through an 18 USDT mirror placement originating from another old recycle settlement.
   - No independent `RecycleCompletedDetailed` event exists for this orbit.
   - Corrected recycle reserve on production: nonexistent/zero.

These two states must not enter corrected reserve logic without an explicit one-cycle treatment. Seeding a reserve blindly is unsafe because no corresponding 50% component was retained by the old contract.

### Class E: old P39 first recycle boundary already reached

No current production P39 cycle is in this class as of block 90263184. The migration test must still reproduce this class because it can arise between audit and execution.

### Class F: historical inactive-level receipts

Three confirmed Level 6 receipts, totaling 288 USDT, were credited to two ordinary wallets while Level 6 was inactive:

- `0x5b511a2b0e4db2ca73b276969f3a52661aef12f1`: 64 USDT.
- `0xC0545331e20587208d4b27b2A3e4920Cc481133a`: 64 USDT and 160 USDT.

These transactions remain historical facts. The protocol upgrade must prevent recurrence. Any financial reconciliation is a separate governance decision and must not be hidden inside placement migration.

### Class G: repeated/cycled structural occupants

Seventeen wallet-level orbit states have prior cycles. Every repeated wallet occurrence must be checked so that future descendants attach to the correct cycle and structural parent. Historical positions must remain immutable.

The read-only matrix-parent reconstruction produced:

- 409 distinct structural occurrences across current and indexed historical P12/P39 cycles.
- 216 wallet/orbit/level parent values that must be seeded: 139 P12 and 77 P39.
- Zero unresolved latest parents.
- 153 wallet/orbit/level keys with more than one structural occurrence.
- 19 keys whose structural parent changed between occurrences.

The 19 changed-parent cases prove that seeding from permanent sponsor, first occurrence, or an arbitrary orbit is incorrect. The corrected contracts intentionally use the latest structural occurrence for future descendants. The migration seed must therefore be generated by a deterministic ordering of position timestamp, activation ID, cycle, position, and orbit owner, then independently checked against on-chain position data before execution.

## Proposed transition treatments

These are engineering recommendations pending upgrade-boundary tests and founder approval.

| Class | Proposed treatment |
| --- | --- |
| Completed historical transactions | Preserve unchanged. Do not rewrite receipts, balances, positions, escrow history, or completed cycles. |
| Partial auto-upgrade escrow | Preserve the exact existing escrow mapping and `autoUpgradeCompleted` flag. Test each threshold class so only the missing amount can trigger one upgrade. |
| Ordinary partial cycles | Continue from the existing position, line-arrival counters, and cycle number. The first post-upgrade fill must use the next existing empty slot. |
| Existing P12/P39 matrix parents | Seed all 216 latest proven parents atomically with the proxy upgrade. Prevent normal activation between implementation upgrade and seed finalization. |
| Repeated structural occurrences | Seed the latest proven occurrence only. Preserve every older occurrence in historical/current orbit storage. Future placements update the parent normally. |
| Two P12 old-boundary cycles | Grandfather only the exact current owner/level/cycle so its final boundary arrival completes under legacy 90% semantics. From the next cycle onward, corrected two-fill reserve behavior is mandatory. |
| P39 old-boundary cycle appearing before execution | Re-run the classifier at the execution block. If one exists, apply the same exact owner/level/cycle grandfathering; otherwise configure none. |
| Historical inactive-level receipts | Preserve as history and block recurrence. Handle compensation or reconciliation separately through governance, never by fabricating orbit placements. |
| ID1 historical state | Preserve. Apply corrected no-placement behavior only to future terminal fallbacks. |

The grandfather exception must be bounded by orbit address, owner, level, and exact cycle; it must self-expire when that cycle resets, emit a dedicated event, and be impossible to reuse in any later cycle.

## Rules still requiring explicit approval or proof

1. Recycle boundaries are coded by qualifying paid-arrival number, while founder descriptions sometimes use physical positions 11/12 for P12 and 38/39 for P39. These are equivalent only when every physical fill is a qualifying paid arrival. The canonical rule must be stated explicitly.
2. The one-cycle treatment for the two Class D P12 states must be approved. The leading safe candidate is a tightly scoped grandfather rule that completes the current cycle under legacy boundary semantics, emits a transition event, and enables corrected two-fill reserve behavior only from the next cycle.
3. Existing P12/P39 matrix parents must be derived deterministically from stored positions and historical cycle data or explicitly seeded. Defaulting all missing parents to ID1 would be unsafe.
4. Historical inactive-level receipts require a separate governance decision: preserve only, compensate, or another documented action. No automatic clawback is recommended.

## Required proof before production approval

1. Snapshot every production proxy implementation, storage layout, dependency, balance, owner, and live wallet-level state.
2. Reproduce each transition class on a production-state staging fork or equivalent deterministic fixture.
3. Execute the proxy upgrade across the reproduced old state, not only on a fresh deployment.
4. Prove the next activation for every class: recipient, eligibility, amount, line, position, parent, escrow delta, cycle delta, and event set.
5. Prove no historical position, receipt, cycle, or balance is rewritten.
6. Prove the two Class D cycles cannot double-pay and cannot contaminate their next cycle.
7. Re-run all fresh Levels 1-10 protocol invariants after transition tests pass.
8. Reconcile participant allocations, system charges, escrow balances, recycle reserves, contract balances, and indexed API totals.
9. Prepare bounded multisig operations, preflight simulation, rollback/stop conditions, and post-upgrade monitoring.
10. Obtain founder approval of the transition ledger and exact calldata before execution.
