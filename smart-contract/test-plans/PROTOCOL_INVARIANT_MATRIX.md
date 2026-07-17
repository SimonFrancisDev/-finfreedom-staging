# Protocol Invariant Matrix

This document defines rules that must hold after every activation, mirror,
escrow release, and recycle. A mined transaction is not proof of correctness.

## Global Eligibility

- ID1 is eligible at every configured level.
- Every other owner or routed recipient must have the payment level active.
- A structurally selected inactive wallet receives no transfer, escrow, receipt,
  external earning, or mirror placement.
- Resolution walks that candidate's permanent referrer chain and selects the
  first wallet active at the payment level; exhaustion terminates at ID1.
- Eligibility is evaluated for the exact payment level, not highest historical
  earnings, lower-level activation, registration, or matrix visibility.
- The same rules apply to manual activation, auto-upgrade, recycle, and nested
  recycle.

## Approved Relationship Decision Table

| Situation | Structural placement starts from | Eligibility search follows | Required result |
|---|---|---|---|
| Registration / Level 1 | Permanent sponsor | Sponsor/upline chain | Sponsor remains permanently recorded; P4 placement follows the configured matrix rules. |
| Normal P12/P39 activation | The selected matrix parent for that orbit and cycle | The selected recipient's permanent sponsor/upline chain | First wallet active at the exact level receives; inactive wallets receive nothing. |
| Matrix parent and sponsor differ | Matrix parent still determines the structural role | Inactive matrix parent's permanent sponsor/upline chain | Do not switch to the activating user's sponsor chain or continue through matrix parents. |
| Several consecutive inactive uplines | Existing structural role | Permanent sponsor/upline chain | Skip every inactive wallet and select the first exact-level eligible wallet. |
| No eligible upline | Existing structural role | Permanent sponsor/upline chain exhausted | Route to ID1; no participant mirror is manufactured solely for terminal fallback. |
| P12/P39 recycle | Recycle owner's permanent sponsor route; a new cycle begins | Permanent sponsor/upline chain, then normal orbit percentages | Previous cycle remains immutable; fresh re-entry gets its own placement and receipts. |
| Nested recycle | Each recycle is a separate new-cycle re-entry | Permanent sponsor/upline chain independently for each recycle | No duplicate settlement, partial mutation, or reuse of the closed cycle. |

The approved normal-payment rule is therefore: matrix structure identifies the
candidate role; exact-level eligibility is resolved through that candidate's
permanent sponsor chain. Recycle is sponsor-based re-entry and does not continue
the closed cycle's matrix-parent chain.

## Configured Levels

| Level | Price (USDT) | Engine | Next-level escrow requirement |
|---:|---:|---|---:|
| 1 | 10 | P4 | 20 |
| 2 | 20 | P12 | 40 |
| 3 | 40 | P39 | 80 |
| 4 | 80 | P4 | 160 |
| 5 | 160 | P12 | 320 |
| 6 | 320 | P39 | 640 |
| 7 | 640 | P4 | 1,280 |
| 8 | 1,280 | P12 | 2,560 |
| 9 | 2,560 | P39 | 5,120 |
| 10 | 5,120 | P4 | no next level |

## P4

- Positions are 1-4 on one line.
- With auto-upgrade enabled: position 1 is 70% owner + 20% escrow;
  positions 2-3 are 90% escrow; position 4 is 90% recycle.
- With auto-upgrade disabled: positions 1-3 are 90% owner; position 4 is
  90% recycle.
- Every activation has a separate 10% system charge.
- Recycle walks to the first active upline at that level and creates the
  required fresh re-entry unless the route terminates at ID1.

## P12

- Line 1 is positions 1-3. Line 2 is positions 4-12.
- Parent columns are 1 -> 4/7/10, 2 -> 5/8/11, 3 -> 6/9/12.
- Every paid arrival accounts for 40% + 50% + 10% charge, but the wallet
  receiving the 40% or 50% role is position-dependent.
- On line 1, the orbit owner receives the 40% role and the 50% role routes to
  the eligible structural recipient.
- On line 2, the 40% role routes to the eligible occupant of the corresponding
  line-1 parent position; the 50% role is assigned to the owner, escrow, or
  recycle reserve according to the stored rule for that position.
- Positions 11 and 12 each reserve the 50% role. Position 11 creates the first
  half of the recycle requirement; position 12 adds the second half and
  triggers reactivation.
- Inactive structural candidates are skipped before snapshots and settlement.

## P39

- Line 1 is positions 1-3; line 2 is 4-12; line 3 is 13-39.
- Line-2 parent columns repeat under positions 1-3.
- Line-3 parent columns repeat under positions 4-12.
- Every paid arrival is 20% + 20% + 50% + 10% charge.
- The owner role is position-dependent: the owner can receive the first 20%,
  second 20%, or 50% component. The remaining participant components route
  through the structural recipients selected for that position.
- Line 1 routes through the eligible matrix parent and eligible matrix
  grandparent.
- Line 2 routes through the eligible line-1 parent and eligible owner matrix
  parent.
- Line 3 routes through the eligible line-2 parent and eligible line-1
  grandparent.
- Each routed role is eligibility-normalized independently.
- Positions 38 and 39 each reserve the 50% role. Position 38 creates the first
  half of the recycle requirement; position 39 adds the second half and
  triggers reactivation.

## Production Continuity Rules

- A proxy upgrade must preserve every existing level flag, sponsor, matrix
  position, matrix parent, current-cycle cursor, historical cycle, escrow
  balance, recycle reserve, and accounting total.
- Existing positions and completed cycles are never rebuilt, renumbered, or
  reassigned. Corrected routing applies only to settlements created after the
  upgrade transaction.
- A partially filled current cycle continues from its stored next position.
  It does not restart merely because recipient resolution changed.
- Partial escrow and recycle reserves remain credited to their existing owner
  and transition. A future qualifying arrival adds to that preserved amount;
  the exact requirement releases once and cannot be consumed twice.
- Historical payments to a wallet whose exact level was inactive are retained
  as immutable historical transactions and handled through a separate
  reconciliation decision. The upgrade does not claw back funds or fabricate
  retroactive positions.
- Terminal ID1 fallback remains founder distribution and does not create a
  participant mirror solely to represent the fallback.
- Migration is acceptable only if storage validation passes for Registration,
  LevelManager, P4, P12, and P39 and representative continuation tests pass for
  every production boundary-state class.

## Placement And Accounting

- Every non-terminal participant entitlement has matching position, activation
  ID, cycle, line, parent, receipt, and balance effect.
- An inactive wallet can have historical structure but cannot receive a new
  entitlement at that inactive level.
- System charge and terminal ID1 fallback do not manufacture participant
  placements.
- Historical snapshots are immutable and must show the recipients actually
  used by execution.
- Gross equals liquid + escrow + recycle for every receipt component.
- All participant components plus system charge equal activation price.

## Escrow And Upgrade

- `before + locked - released = after` for each level transition.
- Upgrade occurs once, only at or above the exact requirement, and only after
  the previous level is active.
- A routed or nested payment cannot consume the same escrow twice.
- Deferred nested checks must complete after the enclosing activation.

## Recycle

- P4, P12, and P39 complete at exactly 4, 12, and 39 positions.
- A cycle increments and resets exactly once.
- P12/P39 recycle settlement applies the engine's normal percentage rule to
  the fresh re-entry amount.
- Recycle owner, spillover recipients, and nested recycle recipients are all
  independently level-eligible.
- A full or inactive branch cannot cause arbitrary placement, infinite search,
  duplicate settlement, or partial state mutation.

## Release Gate

- Unit and state-machine tests pass twice from clean local deployments.
- Every configured level is covered for sponsor and routed-recipient skipping.
- The mainnet Level-6 regression proves a Level-5-only candidate receives zero
  Level-6 payment and zero new Level-6 placement.
- Fresh staging certification, indexer reconciliation, and independent founder
  acceptance all pass before any production proposal is prepared.
