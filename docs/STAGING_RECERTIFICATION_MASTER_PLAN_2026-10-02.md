# Staging Recertification Master Plan

## Objective

Rebuild staging from fresh contracts and empty indexed application state, prove
the complete F-Freedom, Freedom-Plus, and Freedom NFT behavior with controlled
wallet transactions, and promote only the exact certified source and
configuration package to production. Production remains paused throughout
staging recertification.

## Canonical topology

- One ID1 wallet is shared by F-Freedom and Freedom-Plus.
- The same three founder representatives are initialized in both programs.
- Founder representatives are not the eight founder-distribution wallets.
- Income routed to ID1 is divided among the eight configured founder wallets.
- One NFT pool vault accumulates the configured charges from both programs.
- One operations vault accumulates the configured charges from both programs.
- F-Freedom is the identity and permanent-sponsor source for Freedom-Plus.
- Canonical test-wallet private keys remain outside Git and application logs.

## Protocol invariants

1. Permanent sponsorship is immutable.
2. Exact-level eligibility is evaluated independently for each placement event.
3. An inactive sponsor receives neither payment nor a position at that level.
4. A skip changes the current placement, not permanent sponsorship.
5. Later sponsor activation does not move an old position or create retroactive
   income.
6. Recycle is a new placement event and re-evaluates the permanent sponsor
   chain.
7. A recycling participant returns to the nearest currently eligible permanent
   sponsor.
8. If that sponsor remains inactive, recycle skips upward again.
9. Matrix placement cannot silently replace the permanent sponsor chain during
   recycle resolution.
10. ID1 is the terminal fallback and founder distribution occurs whenever an
    eligible payment is routed to ID1.
11. Orbit reserve, escrow, liquid payout, system charge, and token issuance must
    reconcile exactly to the activation amount.
12. NFT qualification uses total FGT and FPT holdings, including locked tokens;
    FPTr does not qualify.
13. Empty NFT tier allocations remain in the NFT pool.
14. Monthly NFT payout execution is retry-safe and cannot pay a period twice.

## Evidence gates

### Gate 1: source and unit-contract proof

- [x] Correct Freedom-Plus placement before payment routing.
- [x] Prove Freedom-Plus skip, no prefill, later activation, and recycle return.
- [x] Prove F-Freedom skip, matrix normalization, deep search, and recycle return.
- [x] Prove P12 and P39 recycle use eligible permanent uplines, not matrix parents.
- [x] Prove Freedom-Plus P4 reserve, recycle re-entry, and FPTr issuance.
- [x] Prove NFT membership, lock/unlock, tier replacement, monthly 50/30/20,
      empty-tier retention, retry, and duplicate-period protection.
- [x] Compile current contract source.

### Gate 2: frontend semantics

- [x] Remove the lock/key icon from filled Freedom-Plus orbit nodes.
- [x] Preserve established node colors for state communication.
- [x] Display accumulated FGT and FPT totals, including locked balances.
- [x] Build the production frontend successfully.
- [ ] Capture desktop and mobile screenshots from fresh deployed staging state.

### Gate 3: fresh staging deployment

- [ ] Suspend staging API and worker.
- [ ] Export current deployment and database audit records.
- [ ] Deploy the shared NFT and operations vaults once.
- [ ] Deploy fresh F-Freedom against those shared vault addresses.
- [ ] Have each of the three representative wallets sign its free F-Freedom
      registration and Levels 2-10 activation.
- [ ] Deploy Freedom-Plus/NFT against the same ID1, representatives, and vaults.
- [ ] Run the unified-topology verifier before changing hosted variables.
- [ ] Configure shared ID1, representatives, founder wallets, NFT vault, and
      operations vault.
- [ ] Verify every owner, guardian, router, manager, token operator, and vault.
- [ ] Update Render and Vercel staging variables.
- [ ] Reset staging MongoDB/indexer state only.
- [ ] Start the worker from the new deployment block, then start the API.

### Gate 4: canonical-wallet chain test

- [ ] Fund the controlled wallets with only the required mock USDT and POL.
- [ ] Register the permanent sponsor chains.
- [ ] Activate every F-Freedom and Freedom-Plus level.
- [ ] Execute inactive-sponsor skip timelines.
- [ ] Fill every orbit, ring, and recycle boundary.
- [ ] Verify spillovers, escrow, reserves, auto-upgrades, ID1 routing, and founder
      distributions.
- [ ] Mint, upgrade, unlock, restore, and distribute Freedom NFT rewards.
- [ ] Restart the worker during controlled activity and prove recovery.

### Gate 5: financial and visual reconciliation

- [ ] Reconcile every input amount to liquid payouts, escrow, reserve, founder
      distribution, NFT charge, and operations charge.
- [ ] Reconcile chain events to MongoDB records and API responses.
- [ ] Reconcile token supply to issuance events.
- [ ] Reconcile orbit nodes to exact on-chain positions and cycles.
- [ ] Capture transaction hashes, full wallet addresses, before/after balances,
      API evidence, and desktop/mobile screenshots.
- [ ] Confirm no filled node uses a lock/key icon.

### Gate 6: release

- [ ] Record all staging deployment addresses and source hashes.
- [ ] Commit and push a clean staging repository.
- [ ] Publish the certification evidence index.
- [ ] Prepare the production deployment and rollback package from the same
      certified commit.
- [ ] Keep production paused until governance and final verification complete.

## Current evidence

- Freedom-Plus focused implication group: 5 passing.
- F-Freedom focused implication group: 8 passing.
- Freedom NFT membership and rewards: 8 passing.
- Frontend production build: passing, 3,347 modules transformed.
- Combined F-Freedom, Freedom-Plus, and NFT regression run: 104 passing.
- Read-only Amoy deployment preflight: passing on chain 80002 with three
  representatives, eight founder wallets, ratios totaling 10000, shared-vault
  mode, retained 6-decimal mock USDT, and sufficient deployer POL.
- Historical staging Freedom-Plus positions remain contaminated by the prior
  inactive-sponsor placement defect; fresh staging deployment and index reset
  are therefore mandatory.

## Stop conditions

Do not open staging or production when any of the following is unexplained:

- a position under an inactive exact-level owner;
- a payment to an ineligible recipient;
- a recycle resolved from a matrix parent instead of the permanent sponsor;
- an accounting difference;
- a missing or duplicate indexed event;
- a token total that differs from issuance records;
- a UI node that differs from on-chain position data;
- an NFT payout that is missing, redirected, or duplicated.
