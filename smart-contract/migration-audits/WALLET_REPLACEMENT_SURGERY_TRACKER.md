# Production Wallet Replacement Surgery Tracker

## Control Record

- Status: READ-ONLY DISCOVERY
- Production writes performed: NONE
- Frozen audit block: `91313968`
- Network: Polygon mainnet (`137`)
- Old WP98HB: `0xc0545331e20587208d4b27b2a3e4920cc481133a`
- New WP98HB: `0x1EA5513e017b4e25847e91aBc84aC8686331f80B`
- Old RYMQK4: `0x2f1e28756a42a3680b5ad42c58a0c3887c9e60ba`
- New RYMQK4: `0xFb8D46674f51882baaA2c9606122484434FF2DC2`
- Canonical rule: no implementation, proposal, or production write proceeds while a required fact or policy remains unresolved.

## Objective

Replace two inaccessible participant wallets while preserving legitimate protocol identity, sponsor topology, active levels, current orbit state, completed cycles, escrow, token accounting, payment history, and future routing. Invalid legacy state must be isolated without orphaning another participant or rewriting immutable transaction history.

## Non-Negotiable Invariants

- Both replacements happen atomically because RYMQK4 is directly sponsored by WP98HB.
- Old wallets cannot register, activate, earn, receive escrow, recycle, or become future routing candidates after migration.
- Replacement wallets cannot already be registered or contain conflicting protocol state.
- Sponsor ancestry and descendant membership are preserved, except old addresses are replaced by their canonical new addresses.
- Every direct child of either old wallet points to the corresponding replacement after migration.
- Every current matrix-parent reference to either old wallet is rewritten or explicitly proven historical-only.
- Legitimate active levels remain exactly the same before and after migration.
- No inactive level becomes active through migration.
- Current positions, line counters, cycle counters, activation IDs, placement types, rule snapshots, and escrow state reconcile exactly with the approved manifest.
- Historical cycles and transaction logs remain auditable.
- No receipt, token record, or historical earning is silently deleted.
- No already-paid USDT is counted or paid a second time.
- Personally held POL and transferable token balances are not represented as protocol-controlled recovery unless the token contract explicitly authorizes it.
- Global registration counts, escrow totals, token supplies, activation counters, and system accounting remain conserved.
- No unrelated wallet changes state.
- A successful transaction is not a PASS. State, events, balances, topology, accounting, and negative invariants must all pass.

## Confirmed Facts

- [x] Frozen production block established at `91313968`.
- [x] Both old identities resolved from referral IDs.
- [x] Both replacement wallets are unregistered and have no discovered protocol state.
- [x] RYMQK4 old is a direct child of WP98HB old.
- [x] WP98HB has 9 direct and 184 indirect descendants: 193 total over 9 generations.
- [x] RYMQK4 has 2 direct and 7 indirect descendants: 9 total over 4 generations.
- [x] WP98HB legitimate active levels at the frozen block: 1, 2, 3, 4.
- [x] RYMQK4 legitimate active levels at the frozen block: 1, 2, 3.
- [x] WP98HB escrow contract balance toward Level 5: `88 USDT`.
- [x] RYMQK4 escrow contract balance toward Level 4: `8 USDT`.
- [x] WP98HB's `88 USDT` custody is composed of actual locks `16 + 72`; a separate receipt claiming another `72` locked it for `0xD39d...`, not WP98HB.
- [x] WP98HB has three completed P4 Level 1 historical cycles.
- [x] WP98HB received two liquid Level 6 payments while Level 6 was inactive.
- [x] Invalid Level 6 payment 1: `64 USDT`, tx `0x7e00b766b89e80621f917378e4d83c52c57ab35e56c4e576c878a75448354cb4`, block `90065956`.
- [x] Invalid Level 6 payment 2: `160 USDT`, tx `0x03ffc96ad0d200bf5d2d4fe57325cdef76a030ea7650f946bd94c63d19c40975`, block `90069107`.
- [x] The invalid payments created Level 6 P39 position/counter state despite Level 6 remaining inactive.
- [x] Eligibility protection prevents the same class of new inactive-level routed payment.
- [ ] Prove all current and historical occurrences against chain, not database alone.
- [x] Prove all 11 direct-child sponsor edges against live chain at block `91316237`.
- [x] Prove all 193 descendant sponsor edges against live chain; zero mismatches at block `91316566`.
- [x] Prove the 19 known affected P12/P39 ledger records against live chain; zero parent mismatches at block `91316149`.
- [x] Identify 10 live canonical matrix-parent records that directly reference an old wallet.

## Level 6 Exception Gate

Current evidence identifies two participants inside WP98HB's invalid Level 6 orbit:

- `0x41b65562ccdb4baf1f9ab67a1e01c160fcfcddc3`
- `0x3fd47bc432b2c0681d7687adfe77ac0307f1f8f4`

Required before policy approval:

- [ ] Resolve each participant's permanent sponsor at both transaction blocks and the frozen block.
- [ ] Resolve each participant's canonical Level 6 matrix parent before and after the invalid placement.
- [ ] Enumerate every downstream Level 6 relationship derived from either placement.
- [x] Both invalid positions are chain-marked `isMirror=true`; they are payment-record positions, not canonical source placements.
- [x] No later WP98HB Level 6 event, escrow change, cycle, auto-upgrade, or recycle was indexed through frozen block `91313968`.
- [x] Both affected participants have live Level 6 canonical parents outside WP98HB, so quarantine does not require rewriting their canonical parent records.
- [ ] Prove on a production fork that an empty replacement Level 6 orbit does not alter either participant's subsequent routing or accounting.
- [ ] Compare preserve-state and normalize-state outcomes on a production fork.
- [ ] Obtain explicit founder approval for the lower-risk outcome.

No Level 6 normalization decision is final yet.

Current live structural evidence:

- `0x41b65562ccdb4baf1f9ab67a1e01c160fcfcddc3` has Level 6 active and canonical Level 6 parent `0xD39dB4B1535bcC980915Bb5e92C601783213F06A`.
- `0x3fd47bc432b2c0681d7687adfe77ac0307f1f8f4` has Level 6 active and canonical Level 6 parent `0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3`.
- Neither participant currently uses WP98HB as its canonical Level 6 parent. This reduces orphaning risk but does not yet prove the invalid owner-orbit positions had no later accounting effects.

## Address-Keyed State Inventory

### Registration

- [ ] `isRegistered`
- [ ] `referrerOf`
- [ ] `levelActivated` for Levels 1-10
- [ ] no-referrer status
- [ ] `currentMatrixParentOf` for Levels 1-10
- [ ] registered-count conservation
- [ ] direct-child sponsor rewrites
- [ ] rejection/alias status for old wallets

### LevelManager

- [ ] `userLevelActivated` for Levels 1-10
- [ ] ID1-downline status
- [ ] founder-representative flags, if any
- [ ] activation-counter conservation
- [ ] future recipient eligibility uses replacement identity

### P4, P12, and P39

- [ ] Owned current orbit summaries for every level
- [ ] Every current position and occupant
- [ ] Every historical cycle and position
- [ ] Position-above or structural-parent linkage
- [ ] Line-arrival counters
- [ ] Position arrival numbers
- [ ] Activation IDs
- [ ] Source versus payment-record placement flags
- [ ] Stored payout-rule snapshots
- [ ] Historical payout-rule snapshots
- [ ] Archive masks
- [ ] P12/P39 matrix-placement parents
- [ ] External earning totals
- [ ] Founder representative flags

### Escrow

- [ ] Every from-level/to-level locked amount
- [ ] Wallet-level locked totals
- [ ] Global locked-total conservation
- [ ] No release, refund, or auto-upgrade during migration
- [ ] Exactly-once future consumption by replacement wallet

### FGT and FGTr

- [ ] Wallet balances
- [ ] Locked balances
- [ ] Controller lifetime minted/burned/locked/unlocked totals
- [ ] Per-level totals
- [ ] Per-reason totals
- [ ] Token-record history
- [ ] Supply conservation
- [ ] Define whether balances are transferable protocol state or inaccessible personal assets

### USDT and POL

- [x] Record old/new balances at frozen block.
- [ ] Confirm no migration authority exists over personally held balances.
- [ ] Exclude personal balances from protocol-state conservation where authority is absent.

### Backend and Frontend

- [ ] Referral identity becomes unique on replacement wallet.
- [ ] Old referral codes resolve to the replacement identity without duplicate users.
- [ ] Direct and indirect downline lists contain no duplicate or missing participant.
- [ ] Historical receipts retain original chain addresses plus canonical replacement display metadata.
- [ ] Current snapshots use replacement addresses.
- [ ] Indexer replay cannot recreate the old wallet as a second active participant.
- [ ] API participant count matches chain before and after.
- [ ] Frontend levels, escrow, orbits, receipts, and referral links match post-migration chain truth.

## State Classification Gate

Every discovered item must receive exactly one classification:

- `MOVE`: authoritative current state transferred old to new.
- `REWRITE_REFERENCE`: another wallet currently points to old and must point to new.
- `PRESERVE_HISTORY`: immutable or completed historical evidence remains tied to original events.
- `ALIAS_FOR_READS`: history retains old address but resolves to the canonical participant in APIs/UI.
- `QUARANTINE_INVALID`: legacy invalid state remains auditable but cannot affect future protocol behavior.
- `EXTERNAL_ASSET`: personally held asset outside migration authority.
- `PROHIBITED`: state that must not be copied, activated, recreated, or paid.

- [ ] No discovered state remains unclassified.
- [ ] No state receives conflicting classifications.

### Preliminary classification

| State | Classification | Required treatment |
| --- | --- | --- |
| Registration status | `MOVE` | New becomes registered; old becomes unusable; global count unchanged |
| Permanent sponsor of WP98HB | `MOVE` | Preserve existing sponsor on replacement |
| Permanent sponsor of RYMQK4 | `MOVE` + `REWRITE_REFERENCE` | Replacement RYMQK4 points to replacement WP98HB |
| Eleven direct-child sponsor edges | `REWRITE_REFERENCE` | Replace old sponsor with corresponding new sponsor |
| Indirect descendants | `PRESERVE_HISTORY` / verify | Their immediate sponsors remain unchanged unless directly old |
| Legitimate active levels | `MOVE` | WP98HB Levels 1-4; RYMQK4 Levels 1-3 only |
| Current matrix parents owned by old identities | `MOVE` | Preserve parent unless parent is also being replaced |
| Ten canonical parent records pointing to old | `REWRITE_REFERENCE` | Point to corresponding replacement |
| Current owned P4/P12/P39 orbit state | `MOVE` | Deep-copy fields and current nested mappings according to manifest |
| Current positions containing an old occupant | `REWRITE_REFERENCE` | Replace occupant only in current state, preserving position metadata |
| Completed historical cycles | `PRESERVE_HISTORY` + `ALIAS_FOR_READS` | Do not rewrite immutable historical evidence |
| Historical receipts/events | `PRESERVE_HISTORY` + `ALIAS_FOR_READS` | Keep chain address; display canonical identity metadata separately |
| Escrow contract locks | `MOVE` | Transfer exact tagged locks; global total unchanged |
| Orbit-internal escrow/accounting | `MOVE` only when legitimate | Reconcile against escrow contract; unexplained differences require exception classification |
| WP98HB Level 4 internal escrow flag | `QUARANTINE_INVALID` + normalize | Tx `0x1c4568...` increased WP98HB's orbit counter by `72 USDT`, but custody was actually locked for `0xD39d...`; replacement state must be `88/160, completed=false`, subject to fork proof |
| WP98HB inactive Level 6 positions/counters/earnings | `QUARANTINE_INVALID` candidate | Do not activate or copy until dependency/fork proof completes |
| Already-paid invalid Level 6 USDT | `PRESERVE_HISTORY` | Never repay or subtract through migration |
| Personally held POL/USDT | `EXTERNAL_ASSET` | Not movable by protocol migration |
| FGT/FGTr current balances | `MOVE` | Storage-level move: WP98HB `150 FGT/15 FGTr`, RYMQK4 `70 FGT/0 FGTr`; no locked balances; total supplies unchanged |
| FGT/FGTr controller history | `PRESERVE_HISTORY` + canonical read alias | Do not manufacture a second mint history |
| Old-wallet future protocol authority | `PROHIBITED` | All future protocol entry and recipient paths reject/resolve away from old |

## Migration Manifest Gate

The manifest must specify exact before and after values for:

- [ ] Old/new registration state
- [ ] Sponsors and every rewritten child edge
- [ ] Active levels
- [ ] Current matrix parents
- [ ] Current orbit summaries
- [ ] Current positions
- [ ] Historical-cycle handling
- [ ] Escrow balances
- [ ] Token/controller records
- [ ] Invalid Level 6 handling
- [ ] Old-wallet disablement
- [ ] Global conservation totals
- [ ] Expected events and event count

The manifest hash must be frozen before deployment or proposal generation.

## Implementation Safety Gate

- [ ] Storage-layout compatibility validated for every upgraded proxy.
- [ ] Migration is owner/multisig-only.
- [ ] Migration can run only once for the exact four addresses.
- [ ] Zero addresses, identical addresses, registered replacements, and duplicate migrations revert.
- [ ] Parent-before-child ordering is enforced internally.
- [ ] Entire operation is atomic or uses a proven paused sequence with no public transaction between dependent stages.
- [ ] Replay is impossible.
- [ ] Old wallets are permanently rejected by protocol entry points.
- [ ] No generic arbitrary-wallet mutation remains callable after surgery.
- [ ] Temporary migration implementation is replaced by the certified runtime implementation.

## Brutal Validation Matrix

### Exact fork rehearsal

- [ ] Fork production at the final pre-migration block.
- [ ] Execute the exact bytecode, calldata, targets, and order intended for multisig.
- [ ] Compare every manifest field before and after.
- [ ] Compare all unrelated global totals.
- [ ] Run the rehearsal twice and prove the second attempt reverts without mutation.

### Future behavior

- [ ] Registration under each replacement wallet.
- [ ] Direct and indirect downline visibility.
- [ ] Manual activation for every remaining Level 1-10 transition.
- [ ] Auto-upgrade below threshold, at threshold, and above threshold.
- [ ] P4 source placements and recycle.
- [ ] P12 line 1, line 2, spillover, escrow, final two arrivals, and recycle.
- [ ] P39 lines 1-3, all three distinct payout roles, final two arrivals, and recycle.
- [ ] Eligible recipient found immediately.
- [ ] One inactive upline skipped.
- [ ] Multiple inactive uplines skipped.
- [ ] Previously skipped wallet becomes eligible and receives later payment.
- [ ] Terminal ID1 fallback only when no eligible recipient exists.
- [ ] Self-payment fallback on recycle without participant placement.
- [ ] Same recipient selected for distinct legitimate roles without role merging.
- [ ] No inactive-level earnings or placements.
- [ ] No premature ID1 fallback.
- [ ] No duplicate payment-record placement.
- [ ] No orphaned current matrix parent.
- [ ] No cycle or escrow double consumption.

### Adversarial and unknown-case coverage

- [ ] Deep sponsor chain at and beyond search bound.
- [ ] Replacement wallet attempts registration before migration.
- [ ] Old wallet attempts every public action after migration.
- [ ] Concurrent activation attempted while paused migration is incomplete.
- [ ] Child replacement attempted before parent replacement.
- [ ] Duplicate direct child and cyclic sponsor input.
- [ ] Occupant appears in multiple current/historical orbits.
- [ ] Invalid Level 6 participants transact after both policy alternatives.
- [ ] RPC/indexer interruption and deterministic replay.
- [ ] Backend rebuild from deployment block and from genesis event range produces same current state.

## PASS Conditions

The verdict may be `PASS` only when:

- [ ] All required facts are chain-verified.
- [ ] All policy decisions are explicitly approved.
- [ ] All state is classified.
- [ ] Manifest is complete and frozen.
- [ ] Storage validation passes.
- [ ] Unit, integration, invariant, adversarial, and exact-fork tests pass.
- [ ] Exact multisig package rehearsal passes.
- [ ] No unresolved mismatch, orphan, duplicate, or unexplained balance remains.
- [ ] Independent post-rehearsal audit reproduces the result.

Any unchecked mandatory item means `NOT CERTIFIED`.

## Execution and Multisig Gate

- [ ] Suspend production worker/indexer only when required by the approved sequence.
- [ ] Pause protocol mutation entry points.
- [ ] Record final production block and rerun delta audit from `91313968`.
- [ ] Abort if affected state changed without rebuilding the manifest and fork rehearsal.
- [ ] Submit only proposals whose calldata hashes match the certified package.
- [ ] Founders approve and execute in strict documented order.
- [ ] Verify each executed transaction on-chain before proceeding.
- [ ] Run complete post-migration invariant audit while still paused.
- [ ] Restore runtime implementations and remove temporary authority.
- [ ] Reconcile/rebuild backend current-state projections.
- [ ] Verify frontend against direct chain reads.
- [ ] Unpause only after final PASS.
- [ ] Monitor first registrations, activations, upgrades, spillovers, and recycles involving both replacements.

## Current Progress

- Gate 1 - Identity and frozen block: PASS
- Gate 2 - Comprehensive inventory: PASS
- Gate 3 - State classification: IN PROGRESS
- Gate 4 - Policy approval: BLOCKED ON LEVEL 6 DEPENDENCY TRACE
- Gate 5 - Manifest: NOT STARTED
- Gate 6 - Implementation: NOT STARTED
- Gate 7 - Brutal validation: NOT STARTED
- Gate 8 - Multisig package: NOT STARTED
- Gate 9 - Production execution: NOT STARTED
- Overall status: NOT CERTIFIED

## Evidence Files

- `backend/migration-audits/wallet-migration-inventory-91313968.json`
- `staging-environment/smart-contract/migration-audits/wallet-migration-chain-state-91313968.json`
- `staging-environment/smart-contract/migration-audits/wallet-replacement-live-references.json`
- `backend/migration-audits/wallet-replacement-descendant-edges-91313968.json`
- `staging-environment/smart-contract/migration-audits/wallet-replacement-descendant-chain-check.json`
- `staging-environment/smart-contract/migration-audits/wallet-replacement-manifest-draft.json`
- `staging-environment/smart-contract/migration-audits/wp98hb-missing-escrow-transaction.json`
