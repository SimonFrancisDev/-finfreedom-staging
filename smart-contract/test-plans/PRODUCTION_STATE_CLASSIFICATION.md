# Production Structural State Classification

## Evidence boundary

- Chain: Polygon mainnet (`137`)
- Contracts: the current production P4, P12, and P39 orbit proxies
- Frozen baseline block: `90,322,384`
- Direct-chain audit block: `90,573,698`
- Owner-level states inspected: `586`
- Current cycles inspected: `586`
- Historical cycles inspected: `40`
- Position records inspected: `4,292`
- Machine-readable evidence: `test-reports/production-structural-state-90573698.json`

The audit combines the frozen occurrence ledger with every `PositionFilled` event after the frozen block. It reads current and archived cycles directly from the contracts. It does not use the API or database as the source of truth.

## Structural result

No occupied P12 or P39 child position was found without its required physical matrix parent. Sparse position numbers are present, but this is expected when one valid structural branch receives activity before another branch. A sparse branch is not an orphan.

The state contains repeated occupants and conflicting wallet-level parent histories. This is expected after recycle re-entry and mirror placement, and proves that a single permanent `wallet + level -> matrix parent` value cannot represent production faithfully. Parent identity must be occurrence-specific.

## Stored amount result

Source positions store the gross activation price. Mirror positions are expected to store the routed component associated with their physical line. With that distinction applied, 40 exceptions remain:

- P4: 3 bootstrap source rows with amount `0` and activation ID `0`.
- P12: 3 bootstrap source rows with amount `0` and activation ID `0`, plus 9 legacy mirror amount exceptions.
- P39: 25 legacy mirror amount exceptions.

The legacy mirror exceptions include merged components, destination-line mismatches, and one known grandfather-recycle deduction. They are historical facts, not rules to reproduce in new settlement.

Historical rows must remain immutable. The backend and frontend must label legacy rows according to the evidence available and must not silently reinterpret an old stored amount as a canonical line entitlement.

## Cycle-boundary inventory

### P12 one fill from completion

Four level-2 P12 current cycles have 11 occupied positions:

| Orbit owner | Level | Current cycle | Filled | Escrow | Stored total earned |
| --- | ---: | ---: | ---: | ---: | ---: |
| `0xc0545331e20587208d4b27b2a3e4920cc481133a` | 2 | 1 | 11 | 0 | 94 USDT |
| `0xce38722a72c9099d9237897e18b0cfb6d51c4470` | 2 | 2 | 11 | 0 | 294 USDT |
| `0x863447369632ea4aac724683c1d448c68e2f1ade` | 2 | 1 | 11 | 0 | 112 USDT |
| `0x97d97fd0cc2df231f44aeae39a12e5e9944acd18` | 2 | 2 | 11 | 0 | 217.2 USDT |

These four cycles require an explicit grandfather boundary decision. Their last arrival must not be subjected to a new two-arrival reserve as though the current cycle had started under the corrected rules. After each old cycle closes, its new cycle must use the canonical recycle rules in full.

### P39 one fill from completion

None.

### P4 one fill from completion

Seventeen P4 owner-level states contain three of four positions. P4 has no routed spillover and no two-fill recycle reserve, so these continue under the owner-only P4 rule. Their historical cycles still remain immutable.

## Migration requirements

1. Do not rewrite or resequence any occupied production position.
2. Do not use one global wallet-level parent to overwrite occurrence-specific history.
3. Seed current occurrence identity from the frozen ledger plus post-freeze events.
4. Preserve the exact generating occurrence for every in-flight routed component.
5. Grandfather only the four identified P12 closing boundaries; do not create a broad behavioral bypass.
6. Begin canonical two-arrival recycle reserve behavior from each newly opened cycle.
7. Preserve sponsor identity permanently and use it only where the approved rule calls for sponsor-chain traversal or recycle re-entry.
8. Treat self-directed recycle components as terminal ID1 fallback with no artificial ID1 placement.
9. Keep historical amount exceptions visible as legacy evidence; new transactions must satisfy physical-line amount rules.
10. Reconcile contract events, backend records, and frontend position rendering by activation ID, orbit owner, level, cycle, and position.

## Current verdict

Production is structurally recoverable without resetting users. Existing physical parents are present, but the legacy record contains occurrence ambiguity and noncanonical mirror amounts. Migration must preserve old cycles and attach corrected behavior only to new settlement and explicitly grandfathered closing boundaries.
