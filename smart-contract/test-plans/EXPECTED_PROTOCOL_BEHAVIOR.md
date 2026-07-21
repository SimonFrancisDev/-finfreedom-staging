# Expected Protocol Behavior

## 1. Vocabulary

### Sponsor

The sponsor is the permanent wallet recorded when a participant registers. It
does not change when the participant later appears in other orbit positions.

### Orbit owner

The orbit owner is the wallet whose P4, P12, or P39 view is being filled.

### Structural occurrence

A wallet can appear in more than one orbit or cycle. Each appearance is a
separate structural occurrence with its own orbit owner, cycle, position, line,
parent, activation component, and direct/mirror classification.

### Matrix parent

The matrix parent is the parent of one particular structural occurrence. It is
not necessarily the participant's permanent sponsor.

### Source placement

The source placement is the occurrence created by the participant's activation
inside the eligible sponsor's local orbit.

### Connected placement

P12 and P39 split one activation across connected structural views. A connected
placement records one of those other line components. It is a real placement,
not an accounting-only label.

### Mirror

Mirror means that the occurrence represents a connected component rather than a
new direct referral. Mirror status never changes the percentage fixed for its
line.

### Terminal ID1 fallback

Terminal fallback occurs only when a required payment role has no eligible
wallet after walking its approved permanent sponsor chain. The component is
distributed through ID1's founder route and creates no artificial ID1 position.

ID1 can also be a legitimate normal structural recipient. That is not fallback
and must retain the normal structural occurrence.

## 2. Registration

Suppose A is already registered and B registers with A.

1. B approves the LevelManager for 10 USDT.
2. Registration verifies that B is new, B is not referring themself, and A is
   registered or is ID1.
3. The permanent sponsor relationship `B -> A` is stored.
4. B becomes registered.
5. Registration immediately activates B's Level 1.
6. Level 1 uses P4 and costs 10 USDT.
7. All payment, placement, escrow, system charge, and receipt changes happen
   atomically. If any required operation fails, the complete transaction reverts.

B cannot activate Level N unless Level N-1 is active. Manual activation and
automatic upgrade both record the same final level-active truth.

## 3. Levels 1 Through 10

| Level | Price | Engine | Next-level escrow target |
| ---: | ---: | --- | ---: |
| 1 | 10 USDT | P4 | 20 USDT for Level 2 |
| 2 | 20 USDT | P12 | 40 USDT for Level 3 |
| 3 | 40 USDT | P39 | 80 USDT for Level 4 |
| 4 | 80 USDT | P4 | 160 USDT for Level 5 |
| 5 | 160 USDT | P12 | 320 USDT for Level 6 |
| 6 | 320 USDT | P39 | 640 USDT for Level 7 |
| 7 | 640 USDT | P4 | 1280 USDT for Level 8 |
| 8 | 1280 USDT | P12 | 2560 USDT for Level 9 |
| 9 | 2560 USDT | P39 | 5120 USDT for Level 10 |
| 10 | 5120 USDT | P4 | No Level 11 |

The percentage rules repeat by engine, but every level must be tested
independently because prices, escrow keys, active-level checks, and transitions
are level-specific.

## 4. P4 Story

P4 applies to Levels 1, 4, 7, and 10. It has one orbit owner, one line, four
sequential arrivals, and no spillover recipient.

For a Level 1 example, B owns the P4 orbit:

### Arrival 1

- C activates Level 1 and enters B's P4 position 1.
- System charge: 1 USDT.
- If automatic upgrade is available, B receives 7 USDT liquid and 2 USDT is
  locked for B's Level 1 to Level 2 transition.
- If automatic upgrade is unavailable, B receives the complete 9 USDT
  participant portion.
- No connected spillover placement is created.

### Arrival 2

- D enters B's position 2.
- System charge: 1 USDT.
- With automatic upgrade available, 9 USDT is locked for B.
- Otherwise B receives 9 USDT liquid.

### Arrival 3

- E enters B's position 3.
- System charge: 1 USDT.
- With automatic upgrade available, another 9 USDT is locked for B.
- B's Level 1 escrow has now reached `2 + 9 + 9 = 20 USDT` and Level 2
  activates automatically exactly once.

### Arrival 4

- F enters B's position 4.
- System charge: 1 USDT.
- The 9 USDT participant portion is the P4 recycle component.
- B's completed four-position cycle is archived and a new P4 chapter begins.

The same percentages apply at Levels 4, 7, and 10 using their respective prices.
Level 10 cannot trigger another automatic upgrade.

## 5. P12 Story

P12 applies to Levels 2, 5, and 8.

### Topology

```text
                         Orbit owner A

               B              C              D
          position 1     position 2     position 3

        4, 7, 10       5, 8, 11       6, 9, 12
         under B         under C         under D
```

For Level 2, every activation contains:

- 8 USDT line-1 component, 40%.
- 10 USDT line-2 component, 50%.
- 2 USDT system charge, 10%.

### B enters A's line 1

- B's source placement is A's position 1, line 1.
- A processes the 8 USDT line-1 component.
- B's connected structural view is represented in the appropriate upper line-2
  branch, where the structural orbit owner processes the 10 USDT component.
- The system receives 2 USDT.

### B receives three line-1 arrivals

Assume E, F, and G register under B and activate Level 2.

E:

- Source: B's P12 position 1, line 1.
- B processes 8 USDT.
- Connected occurrence: E appears beneath B's occurrence in A's line 2,
  position 4.
- A processes the 10 USDT line-2 component.
- System receives 2 USDT.

F:

- Source: B's position 2, line 1.
- B processes 8 USDT.
- Connected occurrence: F appears beneath B in A's position 7.
- A processes 10 USDT.
- System receives 2 USDT.

G:

- Source: B's position 3, line 1.
- B processes 8 USDT.
- Connected occurrence: G appears beneath B in A's position 10.
- A processes 10 USDT.
- System receives 2 USDT.

B's branch beneath A is now complete. This does not create a placement problem.

### B receives a fourth arrival

H is B's next arrival:

- B's line 1 is full, so H enters B's own line 2.
- If H lands at B's position 4, H is structurally beneath E.
- B processes the 10 USDT line-2 component.
- E processes the connected 8 USDT line-1 component.
- System receives 2 USDT.
- H does not get forced into C's or D's branch inside A's orbit.
- This activation does not need to reach A.

The same local progression continues through B's positions 5 through 12.

### P12 automatic upgrade window

For the first cycle while B's next level is inactive:

- Qualifying line-2 arrivals 1 through 4 lock the 50% line-2 component for B.
- At Level 2 this locks `4 x 10 = 40 USDT`.
- Only after the exact 40 USDT requirement exists does Level 3 activate.
- The Level 3 activation then runs the complete P39 Level 3 process.
- Once Level 3 is active, later Level 2 owner components are not locked for the
  same transition again.

### P12 recycle window

- Qualifying line-2 arrivals 5, 6, and 7 process their 50% owner component
  normally.
- Qualifying arrivals 8 and 9 each reserve the 50% component.
- At Level 2, each reserve is 10 USDT.
- The first reserve does not recycle by itself.
- The second reserve brings the repurchase fund to 20 USDT and closes the cycle.
- The completed twelve-position cycle remains immutable history.
- B receives the configured FGTr recycle reward.
- B's 20 USDT repurchase starts from B's permanent sponsor route.
- B cannot receive any component of B's own repurchase.
- If a structural component resolves back to B, only that component falls back
  to ID1, without creating an ID1 fallback position.

For a fresh-cycle repurchase, the 20 USDT is processed as a Level 2 activation:
8 USDT line 1, 10 USDT line 2, and 2 USDT system charge. A legacy transition
that already supplied a net amount after the old charge must not be charged a
second time.

## 6. P39 Story

P39 applies to Levels 3, 6, and 9.

### Topology

- Line 1: positions 1, 2, 3.
- Line 2: positions 4 through 12.
- Line 3: positions 13 through 39.
- Every line-1 occurrence has three line-2 children.
- Every line-2 occurrence has three line-3 children.

For Level 3, every activation contains:

- 8 USDT line-1 component, 20%.
- 8 USDT line-2 component, 20%.
- 20 USDT line-3 component, 50%.
- 4 USDT system charge, 10%.

### Activation lands in B's line 1

Suppose H lands in B's line 1:

- H receives a source occurrence in B's line 1.
- B processes the line-1 8 USDT component.
- The connected line-2 structural owner processes 8 USDT and receives the
  matching connected occurrence.
- The connected line-3 structural owner processes 20 USDT and receives the
  matching connected occurrence.
- System receives 4 USDT.

### Activation lands in B's line 2

Suppose H lands at B's position 4 beneath E:

- B processes the line-2 8 USDT component.
- E, the line-1 structural parent, processes the connected line-1 8 USDT.
- The correct connected line-3 structural owner processes 20 USDT.
- System receives 4 USDT.
- The connected occurrences do not continue into unrelated upper branches.

### Activation lands in B's line 3

Suppose H lands beneath line-2 parent X, whose line-1 parent is E:

- B processes the line-3 20 USDT component.
- X processes the connected line-1 8 USDT component.
- E processes the connected line-2 8 USDT component.
- System receives 4 USDT.

Every 8, 8, and 20 component remains independently identifiable even when two
components select the same wallet. They must not be merged into one placement.

### P39 automatic upgrade window

While B's next level is inactive and automatic upgrade remains available:

- Qualifying line-1 arrival 3 locks its 20% owner component.
- Qualifying line-2 arrivals 1 through 4 lock their 20% owner components.
- Qualifying line-3 arrivals 1 and 2 lock their 50% owner components.
- At Level 3 this is `8 + (4 x 8) + (2 x 20) = 80 USDT`.
- Level 4 activates only after the exact requirement is available.
- The resulting Level 4 activation runs the full P4 process.

### P39 recycle window

- Qualifying line-3 arrivals 26 and 27 each reserve the 50% component.
- At Level 3, each reserve is 20 USDT.
- The combined 40 USDT starts B's Level 3 repurchase through B's permanent
  sponsor route.
- The repurchase is split into 8 USDT line 1, 8 USDT line 2, 20 USDT line 3,
  and 4 USDT system charge.
- B cannot receive any USDT component from B's own repurchase.
- Only a component that resolves back to B falls back to ID1; the other valid
  recipients and placements remain unchanged.
- Nested recycle is allowed only when the new re-entry legitimately completes
  another orbit's final reserve. Each nested cycle must close once and create
  its own fresh re-entry.

## 7. Exact-Level Eligibility

Suppose a structural component selects C at Level 5, but C has only Levels 1
through 4 active.

1. C receives no Level 5 USDT.
2. C receives no Level 5 escrow.
3. C receives no Level 5 earning receipt.
4. C receives no connected placement for that component.
5. The contract follows C's permanent sponsor chain.
6. The first sponsor with Level 5 active receives the component.
7. If no eligible sponsor exists, the component terminates at ID1.
8. When C later activates Level 5, C becomes eligible for subsequent Level 5
   components. Earlier skipped payments are not retroactively reassigned.

The substitute recipient's exact structural occurrence still requires a
deterministic implementation rule. It cannot be inserted into an unrelated
empty position.

## 8. ID1 Cases

### Direct sponsor is ID1

If B directly registered under ID1 and ID1 is the legitimate structural owner:

- B receives the normal structural placement.
- The component due to ID1 is distributed among the configured founder wallets.
- The occurrence remains visible in ID1's orbit.
- This can advance ID1's normal orbit and cycle.

### Exhausted eligibility fallback

If a component reaches ID1 only because every candidate was inactive or absent:

- The component is distributed among founders.
- A fallback receipt records the source, level, amount, role, and reason.
- No artificial participant occurrence is created in ID1's orbit.
- ID1's cycle does not advance from the fallback.

### Recycle self-payment fallback

If a recycle owner's own repurchase component resolves back to that owner:

- The owner does not receive it.
- That component alone is redirected to ID1 and distributed among founders.
- No fallback placement is created.
- Other P12 or P39 components continue to their legitimate recipients.

## 9. Escrow And Automatic Upgrade Safety

- Escrow belongs to one wallet and one adjacent transition, such as Level 5 to 6.
- Locked funds cannot activate another wallet or another transition.
- A manual next-level activation releases obsolete locked funds back to the user
  before processing the manual purchase.
- Automatic upgrade consumes only the exact requirement.
- Surplus remains locked and cannot be silently consumed.
- The same requirement cannot be consumed twice.
- Nested auto-upgrade checks wait until the enclosing activation finishes.
- Registration and LevelManager must agree on the final active-level state.
- Frontend activation state comes from chain truth, not an optimistic local flag.

## 10. Cycle And History Safety

- A full cycle is archived before current positions are cleared.
- Historical occupants, amounts, parents, line-arrival numbers, activation IDs,
  mirror flags, and payout snapshots remain immutable.
- Current-cycle counters reset exactly once.
- A recycle re-entry is a fresh occurrence and cannot reuse the closed position.
- Normal connected components also require one occurrence per component; reusing
  an old occurrence would hide a payment and corrupt line-arrival counters.

## 11. Accounting Conservation

For every activation:

```text
activation price
= participant liquid
+ participant escrow
+ recycle reserve
+ system charge
```

For every receipt:

```text
gross entitlement = liquid + escrow + recycle reserve
```

Token transfers, escrow balances, recycle reserves, orbit earnings, receipts,
and API totals must reconcile to the same activation IDs. Founder distributions
must reconcile to the ID1 component that caused them.

## 12. Backend And Frontend Behavior

- The worker indexes every source placement, connected placement, escrow change,
  recycle reserve, recycle completion, automatic upgrade, system charge, and
  founder distribution.
- Replaying the same block range is idempotent.
- Legacy activation-ID-zero positions remain visible and are labelled as legacy,
  not dropped from totals.
- Direct and mirror occurrences have different styling but equal structural
  importance.
- A position displays its actual line percentage, not the amount of an incoming
  routed fragment.
- Fallback income is displayed without a fabricated position.
- API totals expose current-cycle and historical-cycle earnings separately.
- Frontend level state is confirmed from current chain state after transactions.

## 13. Current Implementation Conflicts To Correct

1. Routed roles selecting the same wallet can be merged.
2. A connected placement can be skipped when its recipient equals the source
   sponsor.
3. A normal mirror can reuse an old occurrence instead of creating the current
   component's occurrence.
4. A routed fragment can override the fixed amount dictated by its destination
   line.
5. Two independent P39 components can influence each other's amounts.
6. Placement can fall back to the first empty slot in an unrelated branch.
7. One mutable wallet-level matrix parent cannot describe multiple occurrences
   and historical cycles.
8. Backend/UI reconciliation can omit legacy unlinked positions and display a
   smaller earning total than chain truth.

These must be corrected as one structural model, not as independent patches.

## 14. Repeated Occurrences

Recycle closes the previous chapter and creates a fresh occurrence through the
recycle owner's permanent sponsor route. The fresh occurrence becomes the
wallet's current structural occurrence for future activity. Older occurrences,
their children, and their receipts remain immutable.

Every in-flight activation component carries the exact occurrence that generated
it. If a recycle happens during nested settlement, it cannot retroactively move
another component from the old occurrence to the new occurrence.

If the fresh recycle occurrence lands beneath the recycle owner's older
occurrence, the placement is valid. The component that would pay the recycle
owner from their own repurchase falls back to ID1 without creating an ID1
placement. All other valid components continue normally.
