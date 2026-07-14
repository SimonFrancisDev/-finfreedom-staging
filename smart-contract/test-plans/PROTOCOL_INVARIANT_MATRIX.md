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
- Every paid arrival is 40% routed + 50% owner/escrow/recycle + 10% charge.
- Line-1 routed recipient is the eligible matrix parent of the orbit owner.
- Line-2 routed recipient is the eligible occupant of the corresponding
  line-1 parent position.
- Inactive structural candidates are skipped before snapshots and settlement.

## P39

- Line 1 is positions 1-3; line 2 is 4-12; line 3 is 13-39.
- Line-2 parent columns repeat under positions 1-3.
- Line-3 parent columns repeat under positions 4-12.
- Every paid arrival is 20% + 20% + 50% + 10% charge.
- Line 1 routes through the eligible matrix parent and eligible matrix
  grandparent.
- Line 2 routes through the eligible line-1 parent and eligible owner matrix
  parent.
- Line 3 routes through the eligible line-2 parent and eligible line-1
  grandparent.
- Each routed role is eligibility-normalized independently.

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
