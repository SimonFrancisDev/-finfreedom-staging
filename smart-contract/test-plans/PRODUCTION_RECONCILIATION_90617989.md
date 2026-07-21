# Production Reconciliation at Block 90617989

## Scope

This is a read-only reconciliation of the live Polygon production state against the candidate protocol. No proxy, implementation, router, balance, proposal, or database value was changed.

## Live Identity

- Registration proxy: `0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5`
- LevelManager proxy: `0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53`
- Current ID1 in both contracts: `0xCE38722a72c9099D9237897E18B0cfb6D51c4470`
- Owner of both contracts: `0x785cC854ce9e13CE1140cbFD7C08620713E1711d`

The historical sponsor graph predates the current ID1 and commonly terminates at older top-level wallets. Reaching address zero after following that real graph is a legitimate terminal condition; settlement may then fall back to current ID1. Reaching an arbitrary iteration cap is not a legitimate terminal condition.

## Referral Graph

- Registration events: 249
- Known participant/root addresses: 250
- Maximum observed chain depth, including the participant: 13
- Sponsor loops: 0
- Any observed path at or above 64 hops: no

Maximum consecutive inactive candidates before an eligible recipient or terminal fallback:

| Level | Maximum skipped |
| --- | ---: |
| 1 | 0 |
| 2 | 2 |
| 3 | 3 |
| 4 | 5 |
| 5 | 6 |
| 6 | 6 |
| 7 | 10 |
| 8 | 12 |
| 9 | 13 |
| 10 | 13 |

The existing 64-hop ceiling does not currently truncate a production path. Candidate behavior must nevertheless be consistent: the first exact-level-active wallet wins; reaching zero falls back to ID1; reaching the safety ceiling while another sponsor still exists must revert and must never silently pay ID1.

## Orbit Inventory

- Owner-level records: 586
- Current cycles inspected: 586
- Historical cycles inspected: 42
- Position records inspected: 4,300
- Orphan-child topology violations: 0
- P4 orbits one fill from completion: 18
- P12 orbits one fill from completion: 4
- P39 orbits one fill from completion: 0

The 40 stored-amount differences, six zero activation IDs, and 13 repeated-occupant groups are migration-sensitive legacy records. They must remain visible and immutable. They must not be bulk-normalized or used to overwrite a participant's canonical structural parent. Each current/future payment is validated under the corrected rules independently of these historical display records.

## P12 Boundaries

### Explicit legacy final-arrival bypass

`0x863447369632EA4AaC724683c1D448C68e2f1ADE`

- First cycle
- Eight qualifying line-2 arrivals already occurred under legacy behavior
- Reserve amount: 0
- Reserve fills: 0
- Cycle-1 grandfather flag: pending
- The next qualifying arrival consumes the one-time bypass only

`0xC0545331E20587208d4b27b2A3e4920Cc481133a`

- First cycle
- Eight qualifying line-2 arrivals already occurred under legacy behavior
- Reserve amount: 0
- Reserve fills: 0
- Cycle-1 grandfather flag: pending
- The next qualifying arrival consumes the one-time bypass only

### Normal corrected two-fill behavior

`0xCE38722a72c9099D9237897E18B0cfb6D51c4470`

- Second cycle
- Seven qualifying line-2 arrivals
- Reserve amount: 0
- Reserve fills: 0
- The next qualifying arrival creates the first 10 USDT reserve; it does not recycle yet

`0x97d97Fd0cc2df231f44aeAe39A12e5e9944AcD18`

- Second cycle
- Eight qualifying line-2 arrivals
- Reserve amount: 10 USDT
- Reserve fills: 1
- The next qualifying arrival adds the second 10 USDT and completes the normal corrected recycle
- No legacy bypass applies

## Canonical Parents

The frozen production ledger contains 226 P12/P39 canonical-parent seeds. These values must be copied into Registration before candidate routing is enabled, then verified one by one and finalized against further migration writes.

The known self-parent record for `0x97d97Fd0cc2df231f44aeAe39A12e5e9944AcD18` must not be imported as canonical truth. Its parent must come from the frozen pre-error occurrence ledger. Payment-record positions remain historical evidence and cannot replace canonical placement.

## Release Gates Still Open

1. Add and test one-time batched Registration parent seeding with conflict, zero-address, self-parent, authorization, verification, and irreversible-finalization controls.
2. Make all sponsor-resolution paths use identical terminal semantics; remove silent ID1 fallback at the iteration ceiling.
3. Reconcile every amount anomaly, zero activation ID, and repeated occupant into an explicit preserved-history class.
4. Update the production-fork rehearsal to upgrade Registration, LevelManager, P12, P39, and the router as one exact candidate package.
5. Rehearse both pending legacy P12 completions and the two normal corrected P12 boundaries on the fork.
6. Validate all 226 parent seeds before and after upgrade.
7. Reconcile backend/indexer/API/frontend output against the fork's contract events and final state.
8. Build and deploy only from one clean reviewed commit with recorded bytecode hashes.
