# Canonical Structural Protocol Audit

## Purpose

This document is the behavioral source of truth for the next contract, backend,
frontend, and migration changes. It distinguishes four states:

- `CONFIRMED`: explicitly approved by the founders or clarified by the product owner.
- `IMPLEMENTED`: current code matches the confirmed rule.
- `CONFLICT`: current code does not match the confirmed rule.
- `UNRESOLVED`: a product decision is still required. No implementation may assume it.

Production proposals 39 through 45 remain frozen and must not be executed while any
`CONFLICT` or `UNRESOLVED` item in this document affects their payloads.

## Universal Rules

| Rule | Status | Current implementation |
| --- | --- | --- |
| Sponsor is the permanent registration referrer. | CONFIRMED | IMPLEMENTED in `RegistrationFixed.referrerOf`. |
| Matrix parent is the structural parent of a specific occurrence in an orbit and cycle. | CONFIRMED | PARTIAL: one mutable `matrixPlacementParent[user][level]` cannot represent multiple occurrences or historical cycles. |
| Structure selects the position, the position selects the line, and the line selects the fixed component percentage. | CONFIRMED | CONFLICT: mirror settlement can preserve an incoming fragment even when it does not equal the destination line entitlement. |
| Direct and mirror identify how an occurrence arrived; they do not change the line percentage. | CONFIRMED | CONFLICT: routed fragments are treated as the mirror's complete entitlement. |
| Every non-terminal participant payment has one corresponding structural occurrence. | CONFIRMED | CONFLICT: same-recipient routed roles are merged; sponsor-equals-recipient bypasses mirror placement; normal mirrors reuse an existing occurrence. |
| Separate components paid to the same wallet remain separate components and separate placements. | CONFIRMED | CONFLICT: `LevelManager._settleRoutedSpillovers` merges them. |
| An inactive exact-level candidate receives no liquid payment, escrow, receipt, or placement. | CONFIRMED | PARTIAL: eligibility lookup follows the permanent sponsor chain, but structural placement after substitution is not consistently represented. |
| Eligibility search follows the inactive candidate's permanent sponsor chain and ultimately falls back to ID1. | CONFIRMED (founder choice A) | IMPLEMENTED for several paths, but every source, routed, recycle, and nested path must be tested independently. |
| Terminal ID1 fallback is distributed to founder wallets and creates no artificial orbit placement. | CONFIRMED | PARTIAL: source fallback has this behavior; routed and recycle paths require path-by-path proof. |
| ID1 acting as a normal structural recipient is not the same as terminal fallback. | CONFIRMED | PARTIAL: reason codes exist, but aggregation and placement bypasses can blur the distinction. |
| A recycle closes one cycle, archives it immutably, and starts a fresh chapter. | CONFIRMED | PARTIAL: cycle archive/reset exists; re-entry settlement and structural placement contain conflicts listed below. |
| A recycle owner cannot receive any component of their own repurchase. That component falls back to ID1 without an ID1 placement. | CONFIRMED | IMPLEMENTED in the latest router code for direct self-receiver normalization; nested and duplicate-role cases still require proof. |

## Level And Engine Map

| Levels | Engine | Price progression | Upgrade requirement |
| --- | --- | --- | --- |
| 1, 4, 7, 10 | P4 | 10, 80, 640, 5120 USDT | 20, 160, 1280, 10240 USDT |
| 2, 5, 8 | P12 | 20, 160, 1280 USDT | 40, 320, 2560 USDT |
| 3, 6, 9 | P39 | 40, 320, 2560 USDT | 80, 640, 5120 USDT |

The rules must be independently validated at every level. Testing one level per
engine is useful but is not certification for all ten levels.

## P4

Current code defines one sequential line with positions 1 through 4 and a 10%
system charge.

With automatic upgrade enabled:

| Position | Owner | Escrow | Recycle | System |
| --- | ---: | ---: | ---: | ---: |
| 1 | 70% | 20% | 0% | 10% |
| 2 | 0% | 90% | 0% | 10% |
| 3 | 0% | 90% | 0% | 10% |
| 4 | 0% | 0% | 90% | 10% |

With automatic upgrade disabled, positions 1 through 3 pay 90% to the owner and
position 4 reserves 90% for recycle.

Confirmed: P4 intentionally has no connected structural spillover views. One
person earns the participant portion: the orbit owner. The table above is the
approved P4 rule for levels 1, 4, 7, and 10.

## P12

### Topology

- Line 1: positions 1, 2, 3.
- Line 2 under position 1: positions 4, 7, 10.
- Line 2 under position 2: positions 5, 8, 11.
- Line 2 under position 3: positions 6, 9, 12.

### Fixed activation components

- Line 1 structural view: 40%.
- Line 2 structural view: 50%.
- System: 10%.

For a 20 USDT Level 2 activation, these are 8 USDT, 10 USDT, and 2 USDT.
The destination line determines whether 8 or 10 is paid; direct/mirror status
does not alter it.

### Line behavior

- A line-1 landing pays the source orbit owner 40% and creates the connected
  line-2 occurrence whose structural owner receives or processes 50%.
- A line-2 landing pays or processes 50% for the source orbit owner and creates
  the connected line-1 occurrence whose structural owner receives 40%.
- The first four qualifying line-2 arrivals reserve the 50% component for
  automatic upgrade when automatic upgrade is enabled.
- Qualifying line-2 arrivals 5 through 7 pay the 50% component normally.
- The final two qualifying line-2 arrivals, numbers 8 and 9, each reserve the
  50% component for recycle.
- Recycle begins only after both final qualifying components have accumulated.

### Current conflicts

- A routed 10 USDT fragment can be stored in a P12 line-1 mirror even though
  line 1 is fixed at 8 USDT.
- A routed 8 USDT fragment can be stored in line 2 even though line 2 is fixed
  at 10 USDT.
- A normal mirror can reuse an older occurrence instead of creating the one
  occurrence required for the current component.
- When a component recipient equals the source sponsor, mirror placement is
  skipped entirely.
- When the expected branch is full, placement eventually falls back to the first
  empty slot anywhere, which can detach a descendant from the correct parent.

## P39

### Topology

- Line 1: positions 1 through 3.
- Line 2: positions 4 through 12, with three children for each line-1 position.
- Line 3: positions 13 through 39, with three children for each line-2 position.

### Fixed activation components

- Line 1 structural view: 20%.
- Line 2 structural view: 20%.
- Line 3 structural view: 50%.
- System: 10%.

For a 40 USDT Level 3 activation, these are 8 USDT, 8 USDT, 20 USDT, and
4 USDT. Every component keeps its role even if two roles select the same wallet.

### Line behavior

- A line-1 source landing processes 20% for the source owner, 20% in the
  connected line-2 view, and 50% in the connected line-3 view.
- A line-2 source landing processes 20% for the source owner, 20% in the
  connected line-1 view, and 50% in the connected line-3 view.
- A line-3 source landing processes 50% for the source owner, 20% in the
  connected line-1 view, and 20% in the connected line-2 view.
- With automatic upgrade enabled, qualifying line-1 arrival 3 reserves its 20%
  owner component, qualifying line-2 arrivals 1 through 4 reserve their 20%
  owner component, and qualifying line-3 arrivals 1 and 2 reserve their 50%
  owner component.
- The final two qualifying line-3 arrivals, numbers 26 and 27, reserve their
  50% components for recycle.

### Current conflicts

- Same-recipient 20% and 50% roles are merged into one amount and one path.
- Both routed roles can be given the same placement parent even though they
  represent different structural views.
- A larger entitlement inferred from one mirror can be subtracted from the
  second routed component, coupling two independent roles.
- Normal mirrors can reuse occurrences, and sponsor-equals-recipient bypasses
  placement.
- Arbitrary first-empty fallback can break parent/child topology.

## Recycle

- P4 closes after four qualifying positions.
- P12 closes after the ninth qualifying line-2 arrival, after the eighth and
  ninth qualifying 50% reserves have accumulated.
- P39 closes after the twenty-seventh qualifying line-3 arrival, after the
  twenty-sixth and twenty-seventh qualifying 50% reserves have accumulated.
- Re-entry starts from the recycle owner's permanent sponsor route.
- Re-entry is a fresh occurrence even when the wallet appeared in the same
  receiving orbit before.
- The repurchase is processed through the same structural line rules as a new
  purchase at that level.
- The recycle owner receives FGTr for completion but cannot receive USDT from
  their own repurchase.
- A self-directed component falls back to ID1, is distributed to founders, and
  creates no fallback placement.

Current code recursively settles a recycle component when the re-entry itself
lands in another recycle-qualified position. This is valid only if each nested
chapter independently preserves the fixed structural components, exact-level
eligibility, self-payment prohibition, and one-component/one-occurrence rule.

## Placement Decisions Still Required

Confirmed continuation rule: a participant's later referrals advance through
that participant's own orbit. For example, after B's three line-1 arrivals have
created the three connected line-2 occurrences beneath B in A's orbit, B's next
arrival enters B's own line 2. It does not search for an unrelated empty branch
inside A's orbit. "First empty anywhere" in A's orbit is therefore not a valid
continuation rule.

Confirmed repeated-occurrence rule: a recycle re-entry creates a fresh occurrence
and that occurrence becomes the wallet's current structural chapter for future
activity. Older occurrences and their existing descendants remain immutable.
Every in-flight component retains the exact occurrence that generated it, so a
recycle cannot move a placement already created by the enclosing activation.
If the fresh re-entry falls beneath the recycle owner's older occurrence, the
placement remains valid but the self-directed payment component falls back to
ID1 without an ID1 placement.

`UNRESOLVED-ELIGIBILITY-1`: When an inactive candidate is replaced through its
permanent sponsor chain, define the exact receiving orbit and parent occurrence
for the substitute's mirror. Eligibility selection is confirmed; the structural
location of the substituted occurrence must also be deterministic.

## Automatic Upgrade Invariants

- Escrow is keyed by user and adjacent level transition.
- A level cannot activate before the exact requirement is available.
- Only the exact requirement is consumed; remaining escrow, if any, stays locked.
- Activation is sequential and occurs once.
- The auto-upgraded activation is a full activation at the next level and must
  obey that next level's engine topology and payout rules.
- Nested upgrade checks are queued until the enclosing activation completes.
- ID1 is never auto-upgraded.

The escrow contract implements the custody mechanics. Full certification still
requires proving every engine-to-engine transition from levels 1 through 10.

## Backend And Frontend Truth Rules

- Chain events and contract state are authoritative.
- Every participant component must have a unique component identity, receipt,
  source occurrence, destination occurrence, line, percentage, amount, and reason.
- Legacy positions with activation ID zero must not silently disappear from UI
  totals; they must be labelled as legacy/unlinked and reconciled from chain data.
- Current-cycle totals, historical-cycle totals, liquid earnings, escrow,
  recycle reserve, and system charge must be separate fields.
- The UI must render the stored structural parent and occurrence, not infer a
  parent from position number alone when legacy data is malformed.
- A mirror is displayed as a real structural occurrence with mirror styling; it
  is not omitted merely because it is not a direct downline.
- Terminal ID1 fallback is displayed as fallback income without a position.

### Current cross-layer conflicts

- `IndexedOrbitEvent` does not promote activation ID or mirror status to indexed
  fields. `PositionActivationLinked` keeps those values only in its raw event
  payload and does not retain the occupant address.
- Current and historical snapshot builders primarily associate receipts with
  `sourcePosition/sourceCycle`. A connected placement belongs to
  `mirroredPosition/mirroredCycle`; using the source coordinates can attach its
  receipt to the wrong orbit position or leave the real mirror as `NO_RECEIPT`.
- Rebuilt cycle snapshots currently set `isMirrorActivation: false` instead of
  joining the matching `PositionActivationLinked` event.
- Position snapshots can recover an activation ID from any source-position
  receipt while failing to distinguish the direct source occurrence from one or
  more connected occurrences created by the same activation.
- The frontend repeats source-position matching when deciding which receipts
  belong to a selected position. It can therefore show the source payout inside
  a mirror modal or omit the mirror payout.
- Frontend structural connector lines are calculated from static position
  topology. That is valid for a healthy cycle, but legacy malformed positions
  require the stored parent occurrence and a visible legacy warning rather than
  silently presenting the inferred parent as historical truth.
- Existing legacy positions with activation ID zero cannot be reconciled by an
  activation-ID-only join. They require transaction/log ordering and explicit
  legacy truth status while preserving the on-chain occupant and amount.

## Certification Gates

No upgrade is certifiable until all of the following pass:

1. All unresolved rules are approved.
2. Unit tests cover every position, qualifying-arrival boundary, and percentage.
3. Property tests prove conservation, no self-payment, no inactive-level payment,
   no duplicate/missing occurrence, no arbitrary parent, and no cycle mutation.
4. Levels 1 through 10 are each executed independently.
5. P4, P12, and P39 each complete and recycle, including nested recycle cases.
6. Every adjacent automatic upgrade from 1 to 10 is executed.
7. Multi-inactive-upline skip, later eligibility recovery, and terminal ID1
   fallback are executed for owner and every routed role.
8. Production legacy states are replayed on a fork, including malformed and
   one-fill-away cycles.
9. Backend reconstruction reconciles exactly with on-chain receipts and balances.
10. Frontend views are visually checked against the same audited transactions.
11. A fresh staging deployment repeats the complete suite before new production
    proposals are created.
