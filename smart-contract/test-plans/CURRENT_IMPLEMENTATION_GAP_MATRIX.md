# Current Implementation Gap Matrix

## Contract Paths

| Area | Expected rule | Current path | Verdict | Required proof |
| --- | --- | --- | --- | --- |
| Registration | Store one permanent sponsor and activate Level 1 atomically. | `RegistrationFixed.register` stores `referrerOf`, calls LevelManager, then marks Level 1. | CORRECT BASELINE | Revert atomicity, duplicate registration, invalid/self sponsor, zero-referrer and ID1 cases. |
| Sequential activation | Level N requires Level N-1. | Enforced by Registration and LevelManager. | CORRECT BASELINE | Independently execute Levels 1-10 manually and through auto-upgrade. |
| Level map | P4: 1/4/7/10; P12: 2/5/8; P39: 3/6/9. | `_orbitCodeForLevel` matches. | CORRECT BASELINE | Test every level, not one representative per engine. |
| Prices | Start at 10 USDT and double through Level 10. | `levelPrices` uses bit shift. | CORRECT BASELINE | Exact six-decimal token values at every level. |
| P4 source | One owner, no spillover, 10% system. | P4 rule has no spill recipients. | CORRECT BASELINE | Positions 1-4 with and without auto-upgrade at all four P4 levels. |
| P12 fixed components | Every activation has distinct 40%, 50%, 10% components. | Direct rules calculate correctly against full price. | PARTIAL | Source and connected occurrences must each preserve their fixed line component. |
| P39 fixed components | Every activation has distinct 20%, 20%, 50%, 10% components. | Direct rules calculate correctly against full price. | PARTIAL | Three component identities and placements must remain separate even for one receiver. |
| Connected amount | Destination line fixes amount; mirror status does not. | `mirrorPositionDetailed` replaces calculated entitlement with incoming routed fragment on mismatch. | CONFLICT | P12 line1 always 40%, line2 always 50%; P39 lines always 20/20/50. |
| Component identity | Each component remains independent. | `_settleRoutedSpillovers` merges roles when recipients match. | CONFLICT | Same-wallet dual-role tests must produce two receipts and two occurrences. |
| Sponsor-equals-recipient | A valid connected component still creates its occurrence. | `_applyMirrorEscrowSplit` returns liquid without mirror when recipient equals sponsor. | CONFLICT | Payment and placement both exist unless terminal ID1 fallback. |
| Repeated connected occurrence | One non-fallback component creates one occurrence. | Normal mirror path reuses a wallet's existing occurrence. | CONFLICT | Repeated wallet appears once per new component; line counters advance once. |
| Recycle occurrence | Re-entry is fresh and becomes current chapter. | Recycle path forces a fresh occurrence and placement search uses latest occurrence. | PARTIAL | In-flight old occurrence remains stable; subsequent activity uses fresh occurrence. |
| Local continuation | Later activity proceeds through the participant's own orbit. | Placement walks sponsor chain and can search an upper orbit for a child. | CONFLICT RISK | B's fourth P12 arrival stays in B line2 and does not fill C/D branches in A. |
| Branch fallback | Never use an unrelated empty branch. | `_findPlacementPosition` falls back to first empty line1, then first empty anywhere. | CONFLICT | Parent identity must match topology for every position and cycle. |
| Matrix parent storage | Parent belongs to a specific occurrence. | One `matrixPlacementParent[user][level]` value is overwritten by later occurrences. | CONFLICT | Parent key must include orbit, level, cycle and position/occurrence. |
| Recipient eligibility | Exact-level inactive candidate gets nothing; walk its permanent sponsor chain. | `resolveEligibleRecipient` implements chain lookup. | PARTIAL | Owner, each P12/P39 role, recycle, nested recycle and later eligibility recovery. |
| Substitute placement | Eligible substitute receives the component in a deterministic structural occurrence. | Recipient address is normalized, but placement parent/coordinates can still derive from old candidate/source sponsor. | UNRESOLVED MIGRATION EDGE | Define and test fresh-state impossibility plus legacy-state substitute behavior. |
| Terminal ID1 fallback | Founder distribution, receipt, no position/cycle advance. | Source fallback explicitly bypasses fill; other routes vary. | PARTIAL | Every owner/routed/recycle role, same-wallet dual role and nested path. |
| Normal ID1 role | Founder distribution plus legitimate structural occurrence. | Direct-ID1 and recycle-ID1 branches differ. | PARTIAL | Distinguish by reason and verify position/cycle behavior. |
| P12 auto-upgrade | First four qualifying line2 50% components reach next-level price. | Arrival counter and escrow window match. | CORRECT RULE, INTEGRATION UNPROVEN | Levels 2, 5, 8 including nested upgrade and manual override. |
| P39 auto-upgrade | L1#3 + L2#1-4 + L3#1-2 owner components reach next-level price. | Rule matches. | CORRECT RULE, INTEGRATION UNPROVEN | Levels 3, 6, 9 and next P4 activation. |
| P4 auto-upgrade | P1 20% + P2/P3 90% reaches next-level price. | Rule matches for Levels 1/4/7. | CORRECT RULE, INTEGRATION UNPROVEN | All three transitions and Level 10 terminal behavior. |
| Escrow custody | Exact adjacent transition; consume once; preserve surplus. | Escrow contract keys correctly and supports partial exact release. | CORRECT BASELINE | Token conservation, fee-on-transfer rejection, manual activation refund and nested queue. |
| P12 recycle reserve | Final two qualifying line2 50% components create one full-price repurchase. | Two-fill reserve exists. | CORRECT RULE, INTEGRATION UNPROVEN | First reserve no release; second exact release; reset once; fresh re-entry. |
| P39 recycle reserve | Final two qualifying line3 50% components create one full-price repurchase. | Two-fill reserve exists. | CORRECT RULE, INTEGRATION UNPROVEN | Same boundaries at Levels 3/6/9 and nested completion. |
| Legacy final fill | Existing one-fill-away cycle gets one bounded transition without double charge. | Legacy bypass keys and transition code exist. | PARTIAL | Fork proof for every configured legacy key and no reuse afterward. |
| Recycle self-payment | Self component goes to ID1 without fallback placement. | Router normalizes direct self receiver. | CORRECT RULE, INTEGRATION UNPROVEN | P12/P39 every line role, repeated occurrence and nested recycle. |
| Cycle archive | Archive completed cycle before reset; preserve history. | `_handleOrbitFull` archives then clears current storage. | CORRECT BASELINE | Exactly-once reset and immutable history for P4/P12/P39. |
| Accounting | Participant components plus system equal price. | Summaries and receipts exist; coupled routed adjustments can alter component roles. | CONFLICT RISK | Per-component and per-activation conservation, token balance reconciliation. |

## Backend Paths

| Area | Current behavior | Verdict | Required correction |
| --- | --- | --- | --- |
| Event idempotency | Unique transaction hash and log index. | CORRECT BASELINE | Preserve. |
| Orbit event identity | Activation ID and mirror flag remain in raw event data. | INCOMPLETE | Promote activation ID, mirror flag and occurrence identity to schema fields. |
| Position occupant join | `PositionFilled` contains occupant but `PositionActivationLinked` does not; builders do not deterministically combine them by chain point. | INCOMPLETE | Join orbit owner, level, cycle and position with transaction/log ordering. |
| Source receipt join | Builders use source position/cycle. | CORRECT only for source occurrence | Keep for source. |
| Mirror receipt join | Builders also use source position/cycle. | CONFLICT | Use mirrored position/cycle and component role for connected occurrence. |
| Rebuilt mirror flag | Some cycle rebuilds hardcode false. | CONFLICT | Read the matching activation-link event or live/historical getter. |
| Legacy activation zero | Can become `NO_RECEIPT` or `UNKNOWN` and disappear from receipt totals. | INCOMPLETE | Preserve chain occupant/amount and label `LEGACY_UNLINKED`; reconcile separately. |
| Cycle assignment | Derived from previously indexed reset events. | RISK | Replays must process strict chain order and cross-check explicit cycle events/getters. |
| Earnings totals | Receipt totals can omit legacy/unlinked positions. | CONFLICT | Return receipt-derived and chain-stored totals separately with reconciliation status. |

## Frontend Paths

| Area | Current behavior | Verdict | Required correction |
| --- | --- | --- | --- |
| Structural geometry | Parent position inferred from canonical position map. | CORRECT for healthy cycles | Use stored parent truth or warning for malformed legacy cycles. |
| Receipt selection | Selected-position logic accepts source-position match and does not consistently prioritize mirror coordinates. | CONFLICT | Match occurrence type: source coordinates for source, mirror coordinates for connected placement. |
| Mirror display | Depends on backend `isMirrorActivation`; rebuilt snapshots can return false. | INCOMPLETE | Render indexed/stored mirror truth and visible legacy status. |
| Earnings labels | Multiple generated/liquid/escrow fields can be populated from incomplete receipt joins. | CONFLICT RISK | One canonical component summary with provenance and reconciliation badge. |
| Fallback display | Must show income without a position. | PARTIAL | Separate terminal fallback from normal ID1 structural income. |
| Active levels | Must use confirmed chain state. | PARTIAL | Refetch after confirmation and invalidate all affected level/orbit caches. |

## Existing Test Classification

The unchanged `audit-readiness.test.js` baseline currently passes 58 tests.
Passing means the current implementation is internally consistent with those
assertions; it does not mean every assertion matches the canonical protocol.

Tests requiring replacement or reinterpretation include assertions that:

- preserve a smaller routed fragment instead of enforcing the destination line;
- reuse a non-recycle mirror occurrence;
- lock a complete routed fragment merely because it lands in an escrow window;
- treat merged same-recipient components as one settlement path;
- infer correctness from transaction success without checking all connected
  occurrence coordinates.

The independent `protocol-canonical-model.test.js` suite is the starting
expected model and currently passes seven tests.
