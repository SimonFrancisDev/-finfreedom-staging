# Fresh Staging Priority Test Charter

## Purpose

This charter is the release gate for fresh staging. A successful transaction is not
enough. Every test must prove placement, parentage, payment, escrow, recycle,
auto-upgrade, indexing, API truth, and UI truth.

## Evidence Required For Every Transaction

- Test ID and phase.
- Actor, permanent sponsor, level, and gross price.
- Transaction hash, block, activation ID, and cycle.
- Expected and actual orbit owner, position, line, matrix parent, and grandparent.
- Expected and actual liquid, escrow, recycle, and system-charge amounts.
- Full expected and actual receiver addresses for every routed component.
- Before/after USDT, escrow, recycle reserve, active-level, and orbit state.
- Matching chain events, database documents, API response, and UI state.

The runner stops at the first mismatch and writes a failure report. It never marks a
phase passed merely because transactions were mined.

## Release Gates

### P0 - Deployment Integrity

- Chain ID is 80002.
- Existing MockUSDT is preserved.
- Fresh multisig, guardian, ID1, proxies, and implementations match the deployment record.
- Registration, LevelManager, settlement router, escrow, token controller, and all orbits are linked correctly.
- Worker, API, and frontend environments contain only the fresh addresses and start blocks.

### P1 - Clean State

- Chain participant count is one: ID1.
- Database participant count is one: ID1.
- Paid activations, generated volume, escrow, recycle reserve, and cycle counts are zero.
- Every P4, P12, and P39 position is empty.
- No document from an earlier deployment remains in staging MongoDB.

### P2 - Registration

- Valid sponsor is stored permanently.
- Wallet and generated ID are unique.
- Duplicate registration is rejected without changing balances or state.
- Registration activates Level 1 and creates the expected P4 placement.
- USDT, system charge, receipts, database, and UI all reconcile.

### P3 - P4 Normal And Chained Recycle

- Position 1 with auto-upgrade: 70% liquid, 20% escrow, 10% system.
- Positions 2 and 3 with auto-upgrade: 90% escrow, 10% system.
- Position 4: 90% recycle, 10% system.
- The 20-USDT threshold activates Level 2 exactly once.
- Every nested recycle hop creates a fresh placement and receipt.
- A recycling wallet receives its FGTr consequence while recycle USDT continues to the next eligible upline when required.
- ID1/founder termination is explicit and financially reconciled.

### P4 - P12 Structure And Payments

- Line 1 is positions 1, 2, 3.
- Parent 1 owns positions 4, 7, 10.
- Parent 2 owns positions 5, 8, 11.
- Parent 3 owns positions 6, 9, 12.
- Every 20-USDT activation reconciles to 8 + 10 + 2.
- Line-2 arrivals 1-4 escrow the 10-USDT owner component.
- Arrivals 5-7 pay the 10-USDT owner component liquid.
- Arrivals 8-9 reserve the 10-USDT recycle component.
- Two recycle fills release 20 USDT through a fresh 40% + 50% + 10% settlement.
- Historical positions 1-12 remain readable after reset.

### P5 - P39 Structure And Payments

- Line 1 is positions 1-3; line 2 is 4-12; line 3 is 13-39.
- Line-2 parent mapping is 1->4,7,10; 2->5,8,11; 3->6,9,12.
- Line-3 parent mapping is fixed by the wallet-role manifest.
- Every 40-USDT activation reconciles to 8 + 8 + 20 + 4.
- Line 1 pays owner, matrix parent, and matrix grandparent.
- Line 2 pays owner/escrow, direct line-1 parent, and owner matrix parent.
- Line 3 pays direct line-2 parent, line-1 grandparent, and owner/escrow/recycle.
- Line-3 arrivals 26 and 27 reserve 20 USDT each and release 40 USDT.
- The released recycle applies a fresh 20% + 20% + 50% + 10% settlement.
- Position 39 completes below the enforced gas ceiling.
- Historical positions 1-39 remain readable after reset.

### P6 - Parent Occurrence And Branch Preservation

- A repeated wallet may occupy multiple positions through valid recycle/mirror events.
- New descendants attach to the latest occurrence.
- A position-3 occurrence receives children at 6, 9, and 12.
- A full branch never redirects a child into another parent's column.
- Position, cycle, activation ID, and mirror flag identify the occurrence unambiguously.

### P7 - Eligibility And Upline Skipping

- Inactive uplines are skipped at the tested level.
- The first eligible upline receives the placement and payment.
- Skipped wallets receive zero.
- Once activated, the formerly skipped wallet receives future eligible payments only.
- Search depth is bounded and cannot loop indefinitely.

### P8 - Auto-Upgrade

- Level 1->2 requires exactly 20 USDT escrow.
- Level 2->3 requires exactly 40 USDT escrow.
- Level 3->4 requires exactly 80 USDT escrow.
- Representative higher-level transitions are tested through Level 10.
- No early, duplicate, or missing activation is accepted.
- Escrow used, remaining escrow, new placement, and new-level payouts reconcile.

### P9 - ID1 And Founder Route

- ID1 is used only when no eligible upline exists or the explicit terminal rule applies.
- Founder ratios total 100% and balance deltas match receipts.
- Rounding dust follows the defined final-founder rule.
- Founder payments never claim a nonexistent matrix position.

### P10 - Failure And Security

- Insufficient USDT, POL, allowance, previous level, wrong chain, duplicate activation, and duplicate registration fail cleanly.
- Paused and unauthorized calls fail without partial state changes.
- Wallet rejection and wallet-provider gas-estimation failure are recoverable and visible.
- Repeated requests do not duplicate placements, payments, IDs, or database records.

### P11 - Chain To UI Reconciliation

- Worker captures each event without polling dependency.
- Database stores each event exactly once.
- API values equal indexed receipts and live contract state.
- Account, Activation Center, Orbit, Community, and receipt views agree.
- Participant totals, volume, liquid, escrow, recycle, positions, cycles, and IDs are exact.

## Pass Policy

- P0-P11 are mandatory.
- A phase passes only when every assertion passes.
- Any financial or placement mismatch blocks later phases.
- Local clean-deployment execution must pass twice deterministically.
- Fresh staging execution must pass before founder testing begins.
- Production remains blocked until automated and independent founder tests both pass.
