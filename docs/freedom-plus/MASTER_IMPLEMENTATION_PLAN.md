# Freedom-Plus and Freedom NFT Master Implementation Plan

Status: Requirements baseline for founder review

Scope: New staging-first program. This document does not authorize production changes.

## 1. Purpose

This document converts the approved Freedom-Plus and Freedom NFT descriptions into one implementation baseline. Contract code, backend projections, frontend displays, tests, and deployment records must all follow this document. If a later instruction conflicts with it, the conflict must be recorded and approved before code changes.

Freedom-Plus is separate from F-Freedom. It inherits proven structural rules but does not share level state, cycle state, token balances, receipts, or upgrade escrow.

Freedom-Plus does share the participant's established F-Freedom identity. A wallet keeps one public FFN referral ID across both programs; Freedom-Plus must not issue a second public referral ID.

## 2. Confirmed Program Rules

1. Freedom-Plus has seven sequential levels.
2. Progression is manual only.
3. A participant cannot activate level N until level N-1 is active.
4. There is no auto-upgrade and no next-level escrow.
5. Every paid activation settles atomically on-chain.
6. Every orbit uses deterministic structural placement.
7. First activation mints FPT equal to the level price.
8. Funded recycle mints FPTr equal to half the level price.
9. FGT and FPT count toward Freedom NFT qualification.
10. FGTr and FPTr do not count toward Freedom NFT qualification.
11. NFT qualification tokens are locked, not burned.
12. Withdrawing required locked tokens freezes reward eligibility immediately.
13. Replenishing the required locked balance restores eligibility.
14. Tokens consumed by non-NFT utilities are burned and cannot be counted again.
15. The P14 structure is binary: 2 positions, then 4, then 8.
16. ID1 and four Founder Representatives receive all seven levels without USDT at genesis.
17. Genesis participants receive the normal FPT entitlement for those levels.
18. Genesis placement is structurally normal but produces no USDT distribution or system charge.
19. After genesis, ID1 and Founder Representatives have the same participation rights as other eligible users.

## 3. Level Configuration

| Level | Orbit | Price USDT | First activation FPT | Recycle FPTr |
| --- | --- | ---: | ---: | ---: |
| 1 | P39 | 50 | 50 | 25 |
| 2 | P14 | 150 | 150 | 75 |
| 3 | P12 | 450 | 450 | 225 |
| 4 | P6 | 1,350 | 1,350 | 675 |
| 5 | P4 | 4,050 | 4,050 | 2,025 |
| 6 | P4 | 12,150 | 12,150 | 6,075 |
| 7 | P3 | 36,450 | 36,450 | 18,225 |

All monetary and utility-token values use six decimals. A fully activated participant receives 54,650 FPT. The five genesis participants receive 273,250 FPT in total.

## 4. Identity and Relationship Model

Each participant has separate relationships that must never overwrite one another.

### 4.1 Permanent sponsor

The sponsor is recorded once during registration and remains permanent. It is used for referral display, sponsor-based eligibility traversal, and recycle re-entry.

### 4.2 Shared public identity

The existing F-Freedom referral ID is the participant's only public FFN identity. Freedom-Plus resolves that ID through the existing registration source of truth and binds the same wallet to its Freedom-Plus state. Internal contract participant numbers may exist for storage and indexing, but they are never presented as a second referral ID.

A Freedom-Plus sponsor may be supplied as an existing FFN referral ID or its resolved wallet. The resolved sponsor wallet must already be registered in Freedom-Plus. The configured protocol ID1 wallet (`FIN-FREEDOM`) is the system sponsor and is valid by construction even when an ordinary participant lookup or projection is unavailable. Resolution must reject an unknown ID, an ID whose wallet does not match chain truth, and any attempt to bind one FFN identity to a different wallet.

### 4.3 Structural matrix parent

The matrix parent is determined by the participant's real position in a particular orbit, level, and cycle. It is used to represent the actual orbit topology.

### 4.4 Payment-record placement

A routed payment may create a visible payment-linked position. Such a record proves entitlement but cannot replace the participant's real structural parent.

### 4.5 Cycle identity

Every position belongs to exactly one orbit owner, level, and cycle. Closing a cycle makes it immutable. A later recycle opens a new cycle and cannot mutate the previous cycle.

## 5. Deterministic Orbit Topologies

Position numbering is fixed. Filling is breadth-first in the listed order. A position has one parent and cannot migrate after insertion.

### 5.1 P39

Ring 1: positions 1-3 under the orbit owner.

Ring 2:

- Position 1 parents positions 4, 7, 10.
- Position 2 parents positions 5, 8, 11.
- Position 3 parents positions 6, 9, 12.

Ring 3:

- Position 4 parents positions 13, 22, 31.
- Position 5 parents positions 14, 23, 32.
- Position 6 parents positions 15, 24, 33.
- Position 7 parents positions 16, 25, 34.
- Position 8 parents positions 17, 26, 35.
- Position 9 parents positions 18, 27, 36.
- Position 10 parents positions 19, 28, 37.
- Position 11 parents positions 20, 29, 38.
- Position 12 parents positions 21, 30, 39.

### 5.2 P14

Ring 1: positions 1-2 under the orbit owner.

Ring 2:

- Position 1 parents positions 3 and 5.
- Position 2 parents positions 4 and 6.

Ring 3:

- Position 3 parents positions 7 and 11.
- Position 4 parents positions 8 and 12.
- Position 5 parents positions 9 and 13.
- Position 6 parents positions 10 and 14.

### 5.3 P12

Ring 1: positions 1-3 under the orbit owner.

Ring 2:

- Position 1 parents positions 4, 7, 10.
- Position 2 parents positions 5, 8, 11.
- Position 3 parents positions 6, 9, 12.

### 5.4 P6

Ring 1: positions 1-2 under the orbit owner.

Ring 2:

- Position 1 parents positions 3 and 5.
- Position 2 parents positions 4 and 6.

### 5.5 P4

Positions 1-4 are direct Ring 1 positions under the orbit owner. Positions 1-3 are payable. Position 4 supplies the complete recycle amount.

### 5.6 P3

Positions 1-3 are direct Ring 1 positions under the orbit owner. Positions 1-2 are payable. Position 3 supplies the complete recycle amount.

## 6. Registration and Activation Flow

### 6.1 Registration

1. Validate chain and wallet.
2. Reject an already registered wallet.
3. Resolve and validate the sponsor using the existing F-Freedom referral ID or its chain-verified wallet.
4. Record the permanent sponsor.
5. Bind the wallet to its existing FFN referral ID; do not create a Freedom-Plus referral ID.
6. Execute the mandatory paid Level 1 activation in the same transaction.
7. Collect exactly 50 USDT and settle the Level 1 P39 activation.
8. Mark Level 1 active and mint exactly 50 FPT.
9. Do not silently activate Level 2 or any higher level.
10. Emit indexed registration, activation, placement, payment, charge, and token events.

Registration is not a profile-only state. A non-genesis participant is registered if and only if the same atomic transaction successfully activates Level 1. If payment, placement, settlement, or FPT minting fails, the registration record also reverts.

### 6.2 Paid activation

1. Verify registration. Level 1 uses the registration flow; this manual activation entry point handles Levels 2-7.
2. Verify the requested level is 1-7.
3. Verify the level is not active.
4. For levels 2-7, verify the preceding level is active.
5. Verify USDT balance and allowance.
6. Create a unique activation ID.
7. Collect the exact level price.
8. Determine every structural and routed placement.
9. Settle all participant components.
10. Split the system charge.
11. Mark the level active.
12. Mint FPT equal to the level price exactly once.
13. Emit activation, placement, receipt, charge, and token events.

The transaction is atomic. Any failed transfer, invalid placement, invalid recipient, or token failure reverts all state changes.

## 7. Payment Distribution

### 7.1 P39 Level 1

- Ring 1 role: 20%, or 10 USDT.
- Ring 2 role: 20%, or 10 USDT.
- Ring 3 role: 50%, or 25 USDT.
- System charge: 10%, or 5 USDT.

The two 20% roles and the 50% role are separate entitlements even when two roles resolve to the same wallet.

### 7.2 P14 Level 2

- Ring 1 role: 15%, or 22.50 USDT.
- Ring 2 role: 25%, or 37.50 USDT.
- Ring 3 role: 50%, or 75 USDT.
- System charge: 10%, or 15 USDT.

### 7.3 P12 Level 3

- Ring 1 role: 40%, or 180 USDT.
- Ring 2 role: 50%, or 225 USDT.
- System charge: 10%, or 45 USDT.

### 7.4 P6 Level 4

- Ring 1 role: 40%, or 540 USDT.
- Ring 2 role: 50%, or 675 USDT.
- System charge: 10%, or 135 USDT.

### 7.5 P4 Level 5

- Positions 1-3: 90%, or 3,645 USDT to the eligible recipient.
- Positions 1-3: 10%, or 405 USDT system charge.
- Position 4: 4,050 USDT reserved for recycle; no additional charge is deducted from this recycle-only arrival.

### 7.6 P4 Level 6

- Positions 1-3: 90%, or 10,935 USDT to the eligible recipient.
- Positions 1-3: 10%, or 1,215 USDT system charge.
- Position 4: 12,150 USDT reserved for recycle; no additional charge is deducted from this recycle-only arrival.

### 7.7 P3 Level 7

- Positions 1-2: 90%, or 32,805 USDT to the eligible recipient.
- Positions 1-2: 10%, or 3,645 USDT system charge.
- Position 3: 36,450 USDT reserved for recycle; no additional charge is deducted from this recycle-only arrival.

## 8. Recipient Eligibility and Routing

1. A wallet can receive a component only if that exact Freedom-Plus level is active.
2. Structural placement identifies the candidate payment role.
3. If the candidate is inactive, it receives no liquid payment, reserve credit, receipt, or payment-linked placement.
4. The search continues through the inactive candidate's permanent sponsor chain, following the approved F-Freedom rule.
5. The first eligible wallet receives the component.
6. There is no traversal-depth shortcut. Implementation must be bounded safely without changing the economic result.
7. A skipped wallet is not permanently excluded. It becomes eligible for future transactions immediately after activating that level.
8. Past skipped payments are not retroactive.
9. If no eligible recipient exists, the component terminates at ID1.
10. Terminal ID1 fallback is recorded but creates no artificial orbit position.
11. A participant cannot receive a component from its own activation or recycle repurchase. That component terminates at ID1.
12. Distinct payout roles remain distinct in events and receipts even when they share a recipient.

## 9. System Charge

For each applicable 10% system charge:

- 80% goes to the Freedom NFT Pool Vault.
- 20% goes to the Freedom-Plus Operations Vault.

The split happens on-chain during settlement. The backend must not calculate or move these amounts. Vault addresses are governed by multisig, validated as contracts, and visible in the frontend.

## 10. Recycle and Cycle Closure

### 10.1 P39, P14, P12, and P6

The final two qualifying payment arrivals in the last ring fund recycle. Each contributes the orbit's 50% component. A physical position alone does not qualify unless its corresponding payment component was validly settled.

1. The first qualifying final-ring reserve stores 50% of the level price.
2. The second stores the remaining 50%.
3. The owner does not receive these two components as liquid income.
4. At 100%, the current cycle closes once.
5. The historical cycle becomes immutable.
6. The reserve is consumed once as the repurchase price.
7. FPTr equal to half the level price is minted once.
8. Re-entry begins through the recycle owner's permanent sponsor.
9. The repurchase receives a new activation ID and real structural placement.
10. The normal orbit percentages apply to the repurchase.
11. The owner cannot earn from its own repurchase.
12. The new cycle starts with only valid post-recycle placements.

### 10.2 P4 and P3

The designated final position supplies 100% of the level price. It closes the cycle, funds one repurchase, mints FPTr once, and begins sponsor-based re-entry. No additional recycle charge is imposed.

### 10.3 Prohibited recycle states

- No premature recycle.
- No recycle without complete funding.
- No duplicate cycle increment.
- No double reserve consumption.
- No FPTr for an unfunded or genesis-only cycle closure.
- No mutation of a historical cycle.
- No partial placement after a failed recycle.

## 11. Genesis Initialization

### 11.1 Genesis participants

1. ID1.
2. `0x3f6Bb1E6Bfeb9C52f763a197d27B580d7DE7f100`.
3. `0xDd78425335C0c698615845d94f9FeE7492266396`.
4. `0xf72873d6233B5e3dfbA6D1D8058BF90E990902f0`.
5. `0xeE192BE4884B064281Fa426F3d855fb339445B83`.

The four listed addresses are staging/test identities. Production addresses require a separate deployment manifest and founder confirmation.

### 11.2 Genesis sequence

1. Initialize ID1 as the root.
2. Activate all seven ID1 levels without USDT.
3. Mint ID1's 54,650 FPT once.
4. Register the four representatives under ID1 in the listed order.
5. Activate each representative's seven levels without USDT.
6. Place each activation through the ordinary deterministic orbit algorithm.
7. Mint 54,650 FPT to each representative once.
8. Mark all records with genesis provenance.

### 11.3 Genesis financial exception

Genesis creates no USDT participant payout, system charge, or funded recycle reserve. Structural positions and parentage remain real and visible.

If genesis fills an orbit boundary, the structural genesis cycle closes without FPTr or financial settlement and the next structural cycle opens normally. This specifically means:

- The first three representatives close ID1's genesis P3 cycle; the fourth enters the next P3 cycle.
- Four representatives close ID1's genesis P4 cycle; the next P4 cycle begins empty.
- P6, P12, P14, and P39 retain their resulting partial structural state.

All later paid activity uses that state and follows ordinary financial rules.

## 12. FPT and FPTr

1. Both tokens use six decimals.
2. Both are non-transferable utility tokens unless governance later approves otherwise.
3. FPT is minted once per first level activation.
4. Genesis free activation is eligible for FPT.
5. FPTr is minted once per funded recycle.
6. FPT amount equals the level price.
7. FPTr amount equals half the level price.
8. FGT and FPT are qualifying NFT assets.
9. FGTr and FPTr are non-qualifying NFT assets.
10. Utility consumption burns tokens except when tokens are committed to NFT membership.
11. Every mint, lock, unlock, and burn has an indexed reason and immutable history record.

## 13. Freedom NFT Membership

### 13.1 Tiers

| Tier | Required combined locked FGT/FPT | Monthly pool allocation |
| --- | ---: | ---: |
| Foundational | 5,700 | 50% |
| Intermediate | 18,700 | 30% |
| Advanced | 62,000 | 20% |

### 13.2 Mint

1. Calculate available qualifying FGT plus FPT.
2. Exclude burned, already locked, FGTr, and FPTr balances.
3. Lock the exact threshold required for the selected tier.
4. Mint one non-transferable membership NFT.
5. Mark reward eligibility active.
6. Record the FGT/FPT composition of the lock.

### 13.3 Upgrade

1. Verify enough additional available FGT/FPT to reach the higher threshold.
2. Lock only the required additional amount.
3. Burn the lower-tier NFT.
4. Mint the higher-tier NFT atomically.
5. Preserve membership history.
6. The member participates only in the higher tier.

### 13.4 Unlock and immediate freeze

1. A member may request release of locked qualifying tokens.
2. Release updates the locked FGT/FPT composition atomically.
3. If the remaining locked amount is below the active tier threshold, reward eligibility freezes immediately.
4. A frozen NFT receives no new pool share.
5. The NFT remains as membership history unless upgraded, downgraded, or otherwise burned under an approved rule.

### 13.5 Restore

1. The member locks enough available FGT/FPT to restore the active tier threshold.
2. Eligibility becomes active immediately after successful locking.
3. Restoration does not retroactively claim distributions missed while frozen.

### 13.6 Voluntary downgrade

1. Verify the member can satisfy the lower tier threshold.
2. Burn the higher NFT.
3. Mint the lower NFT.
4. Release any qualifying tokens above the lower threshold as requested.
5. Eligibility resumes only in the lower tier.

### 13.7 Monthly distribution

1. The monthly eligibility cutoff is the first day of every month at 00:00 UTC.
2. Use the UTC year and month as the deterministic on-chain period identifier.
3. Count only wallets active and sufficiently locked for their highest tier at that cutoff.
4. Allocate the available pool 50/30/20.
5. Prevent a wallet from participating in more than one tier.
6. Finalized monthly entitlements do not expire.
7. A later freeze, unlock, upgrade, or downgrade cannot remove an entitlement already earned at a previous cutoff.
8. On claim, transfer the entitlement directly from the NFT Pool Vault to the eligible wallet.
9. Prevent duplicate claims for one period.
10. Keep zero-member tier allocations unreserved in the vault.
11. Keep integer rounding dust unreserved in the vault.
12. Reserved unclaimed entitlements cannot be withdrawn or allocated to a later period.
13. Use a scalable Merkle-claim model rather than an unbounded push loop.
14. The multisig-published eligibility root must be generated from chain state at the exact cutoff and remain independently reproducible by the indexer and audit tooling.

## 14. Contract Architecture

The recommended modules are:

- FreedomPlusRegistration.
- FreedomPlusLevelManager.
- FreedomPlusSettlementRouter.
- Shared FreedomPlusBaseOrbit.
- P39PlusOrbit.
- P14PlusOrbit.
- P12PlusOrbit.
- P6PlusOrbit.
- P4PlusOrbit.
- P3PlusOrbit.
- FPTToken.
- FPTrToken.
- FreedomPlusTokenController.
- FreedomNFTMembership.
- FreedomNFTPoolVault.
- FreedomPlusOperationsVault.
- FreedomPlusGuardian or explicitly approved shared guardian.
- Multisig governance integration.

Contracts use upgrade-safe storage, explicit roles, reentrancy protection, pause controls, exact-value accounting, and custom errors. No Freedom-Plus module may write F-Freedom level or orbit storage.

## 15. Backend and Indexing

The blockchain remains the financial and structural source of truth.

The backend must index:

- Registration and sponsor relationships.
- Level activation status.
- Structural and payment-linked placements.
- Matrix parents.
- Activation IDs and payment components.
- System-charge splits.
- Cycle counters and historical cycles.
- Recycle reserve and completion.
- FPT/FPTr mint, lock, unlock, and burn records.
- NFT tier, eligibility, freeze, restore, and claims.

Indexer requirements:

- Separate Freedom-Plus collections and checkpoints.
- Idempotent event processing.
- Unique chain-event keys.
- Replay from deployment blocks.
- API process does not run the production indexer.
- One worker owns indexing.
- Chain/database reconciliation reports are mandatory.
- Database projections never override chain truth.
- WebSocket subscriptions are the primary live-ingestion path for Freedom-Plus.
- Recurring block polling and recurring live-tail scans are disabled for Freedom-Plus.
- On worker startup, replay only the confirmed range after each durable checkpoint.
- After a WebSocket reconnect, recover only the bounded confirmed gap after each durable checkpoint before resuming live ingestion.
- Live events and recovered logs use the same idempotent event key and projection path.
- A checkpoint advances only through a confirmed, hash-verified block range; an unconfirmed live event cannot falsely advance it.
- A checkpoint hash mismatch stops that target and requires explicit replay instead of silently accepting a reorganization.

## 16. Frontend Integration

Freedom-Plus will use the existing production frontend framework, wallet connection, design system, routing, transaction helpers, and API client patterns.

Required user surfaces:

- Freedom-Plus dashboard.
- Shared Dashboard, Account, and Activity routes expose an explicit F-Freedom / Freedom-Plus program selector.
- The selected shared-page program is preserved in the URL so refreshes and direct program links retain context.
- Shared pages replace the complete dataset when switching programs; F-Freedom and Freedom-Plus metrics, balances, placements, and activity records are never merged.
- Sponsor-aware registration.
- Existing FFN referral-ID lookup; no second Freedom-Plus referral identity.
- Seven-level activation center.
- Orbit diagrams for all six engines.
- Structural versus payment-linked placement labels.
- Current and historical cycles.
- Earnings, reserves, charges, and receipts.
- FPT and FPTr balances and histories.
- NFT qualification progress.
- NFT mint, upgrade, unlock, restore, and downgrade controls.
- Monthly reward eligibility and claims.
- Explorer links for every financial operation.

Frontend safety:

- Enforce the configured chain.
- Disable non-sequential levels.
- Never imply activation before confirmation.
- Show approval and activation as separate transactions.
- Refresh chain truth after confirmation.
- Clearly distinguish genesis, paid activation, routed payment, ID1 fallback, reserve, recycle, and NFT events.
- Never infer earnings solely from filled-position count.
- Handle rejected, replaced, failed, and pending wallet transactions.

## 17. Governance and Security

1. Production ownership belongs to multisig, never a personal deployer.
2. Deployment and configuration occur in strict phases.
3. Guardian approval protects upgrades.
4. Critical configuration is validated before locking.
5. Vault withdrawal rules are multisig-controlled and evented.
6. No private keys, RPC credentials, database credentials, or platform tokens enter Git.
7. Contracts have emergency pause paths that do not permit fund seizure.
8. Upgrade storage layouts are compared before every proposal.
9. Runtime bytecode is compared with certified artifacts.
10. Deployment manifests record commits, compiler settings, addresses, blocks, and transaction hashes.

## 18. Required Test Program

### 18.1 Unit tests

- Every level price and orbit mapping.
- Every parent-position formula.
- Every percentage and decimal case.
- Sequential activation rejection.
- Duplicate activation rejection.
- FPT and FPTr mint limits.
- NFT threshold, lock, unlock, and freeze transitions.

### 18.2 Full-cycle tests

- Complete P39 cycle and recycle.
- Complete P14 cycle and recycle.
- Complete P12 cycle and recycle.
- Complete P6 cycle and recycle.
- Complete both P4 level cycles and recycles.
- Complete P3 cycle and recycle.
- Verify every position, parent, ring, recipient, amount, charge, reserve, token mint, and historical cycle.

### 18.3 Routing tests

- Eligible direct candidate.
- One inactive candidate.
- Multiple consecutive inactive candidates.
- Previously skipped candidate becoming eligible.
- Exhausted chain terminating at ID1.
- Self-payment terminating at ID1.
- Two roles resolving to one wallet without role merging.
- Terminal ID1 fallback without artificial placement.

### 18.4 Genesis tests

- Correct initialization order.
- All seven levels active for five wallets.
- Correct FPT totals.
- Zero USDT movement.
- Zero system charge.
- Correct structural visibility.
- Correct P3 and P4 genesis cycle boundaries.
- No genesis FPTr.
- First paid post-genesis placement and distribution.

### 18.5 NFT tests

- Mixed FGT/FPT qualification.
- FGTr/FPTr exclusion.
- Exact-threshold mint.
- Insufficient-balance rejection.
- Immediate freeze after unlock.
- Restore after replenishment.
- Upgrade and downgrade.
- Single highest-tier participation.
- Zero-member tier.
- Rounding dust.
- Duplicate claim prevention.
- Tokens burned elsewhere cannot be reused.

### 18.6 Adversarial tests

- Reentrancy attempts.
- Malicious or fee-on-transfer token rejection unless explicitly supported.
- Unauthorized mint, lock, configuration, upgrade, and withdrawal.
- Unbounded hierarchy and gas exhaustion scenarios.
- Duplicate events and indexer replay.
- WebSocket disconnect during an activation followed by exact gap recovery on reconnect.
- Duplicate delivery of the same log through live subscription and recovery replay.
- Worker restart from durable checkpoints without a full historical rescan.
- Transaction revert after intermediate calculations.
- Storage collision and implementation incompatibility.
- Front-running around NFT snapshots and unlocks.

### 18.7 Invariants

- Paid activation input equals participant settlement plus charge plus reserve.
- No inactive recipient receives a level component.
- No participant receives its own purchase component.
- No cycle recycles twice.
- No reserve is spent twice.
- No activation mints FPT twice.
- No recycle mints FPTr twice.
- One wallet has at most one active NFT tier.
- Locked plus available plus burned token accounting reconciles with minted supply.
- Historical cycles never change.
- Backend totals reconcile with chain events.

## 19. Delivery Phases

### Phase 0: Approval

- Founder approval of this rulebook.
- Confirm P14 numbering, not only ring counts.
- Confirm NFT calendar cutoff, claim window, and unclaimed-reward rule.
- Confirm staging genesis wallet order.

### Phase 1: Isolated contract development

- Create a dedicated branch.
- Implement shared primitives and tokens.
- Implement all six orbit engines.
- Implement genesis and NFT modules.
- Add unit and invariant tests continuously.

### Phase 2: Local certification

- Compile from a clean install.
- Run all tests.
- Run storage-layout and bytecode reports.
- Produce human-readable behavior traces.

### Phase 3: Fresh staging deployment

- Deploy to Polygon Amoy.
- Keep production untouched.
- Save sanitized deployment manifests and start blocks.
- Configure staging API, worker, and frontend.
- Initialize ID1 and the four staging representatives.

### Phase 4: Automated staging certification

- Use funded controlled wallets.
- Execute all seven levels and six complete orbit cycles.
- Validate every transaction financially and structurally.
- Reconcile chain, database, API, and frontend.

### Phase 5: Founder-visible testing

- Reset to an approved clean staging state if required.
- Give founders a structured test checklist.
- Monitor and audit every reported transaction.
- Do not patch isolated symptoms without updating tests and rules.

### Phase 6: Independent review

- Security review.
- Economic/accounting review.
- Frontend and indexer consistency review.
- Final bytecode provenance report.

### Phase 7: Production proposal

- Production addresses and genesis wallets approved separately.
- Exact deployment commit frozen.
- Contracts deployed but inactive.
- Multisig proposals prepared and decoded.
- Founders approve and execute in a documented order.
- Services update only after on-chain verification.
- Post-deployment monitoring remains active.

## 20. Definition of Done

Freedom-Plus is not ready for production until:

- Every founder-approved rule exists in this specification.
- Every orbit is completed and recycled in automated tests.
- Every payout is proven by amount, recipient, reason, ring, position, and transaction.
- Genesis is structurally correct and financially zero.
- FPT/FPTr and NFT accounting reconcile exactly.
- Chain, API, database, and frontend show the same truth.
- No unresolved high- or critical-severity finding remains.
- Clean-install build and complete test suite pass.
- Runtime bytecode matches the certified build.
- Deployment and rollback runbooks are approved.
- Production remains untouched until explicit multisig authorization.

## 21. Staging Gate Ledger

### Gate 0: activation and identity blockers

- [ ] Active Freedom-Plus level cards navigate to `/freedom-plus/orbits` with the selected level using one explicit navigation action.
- [ ] A participant can join Freedom-Plus with their exact permanent F-Freedom sponsor even when that sponsor has not joined Freedom-Plus.
- [ ] Orbit structure preserves that permanent sponsor; payout eligibility and ID1 fallback remain independent of sponsor registration.
- [ ] Direct orbit URLs render a visible loading, empty, success, or error state and never fail silently.
- [ ] An inherited `FIN-FREEDOM` sponsor is recognized using `FreedomPlusRegistration.id1Wallet()`.
- [ ] Normal inherited sponsors are preserved from F-Freedom without requiring prior Freedom-Plus registration.
- [ ] Frontend build, focused lint, backend checks, desktop/mobile navigation, and both themes pass.
- [ ] Staging evidence and the exact production-port file list are recorded in `STAGING_CERTIFICATION.md`.
