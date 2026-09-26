# Gate 8: Staging Frontend Stability and RPC Budget

Date opened: 2026-09-26

## Purpose

This gate converts founder-testing incidents into explicit frontend rules,
measurable RPC budgets, regression tests, and a production-port checklist.
Contract state and successful transaction receipts remain authoritative.
Partial or failed browser reads must never replace the last verified state.

## Founder-Test Incidents

### Sabina NFT qualification and unlock

- Wallet: `0xF0152a2490a854712fAe8FD32FFCD9729082A09d`.
- Foundational NFT token ID 9 was minted in transaction
  `0x3158f88eb528b250482c268c431da531bd06f4730e78ff4f4f7cc208f1af633e`.
- Verified locked qualification is 5,100 FGT plus 600 FPT, totaling the
  5,700 Foundational threshold.
- No later `QualificationUnlocked` event or submitted unlock transaction was
  found. The attempted 5,000 FGT unlock did not change contract state.
- Unlocking 5,000 FGT would leave 100 FGT plus 600 FPT. The NFT would remain
  owned, but reward eligibility would become inactive until restored.
- The previous `FGT / FPT / FPTr` metric mixed wallet balances with NFT
  qualification. FPTr is not accepted for NFT qualification.

### RPC instability

- Browser pages performed unrelated token reads on routes that did not display
  those values.
- The free RPC can reject bursts at 15 requests per second and can fail during
  preflight or gas estimation.
- API and worker indexing use one shared WebSocket connection. The API process
  does not run indexers.

## Implemented Safeguards

- NFT pages label Freedom-Plus levels explicitly instead of implying combined
  F-Freedom and Freedom-Plus progression.
- NFT qualification displays only locked FGT plus locked FPT and explicitly
  states that FPTr is ineligible.
- Active NFT status has a dedicated visual mark and distinguishes NFT ownership
  from current reward eligibility.
- Unlock review calculates remaining FGT, remaining FPT, threshold, and
  resulting reward status before wallet submission.
- Unlock submission requires an explicit consequence acknowledgement.
- Token balance reads are route-scoped. Screens no longer request USDT, FGT,
  FPT, and FPTr values they do not display.

## Required Transaction State Model

Every NFT write must expose these states independently:

1. Local validation.
2. RPC preflight and gas estimation.
3. Wallet confirmation requested.
4. Transaction broadcast with hash.
5. Receipt confirmed or reverted.
6. Confirmed state refreshed.

No success artwork or optimistic balance change may appear before a successful
receipt. If the final refresh fails, retain the last verified state and label it
stale.

## RPC Budget

The 98-99 percent reduction is a target, not a certification until measured.

- Idle connected session: zero recurring direct RPC calls.
- Overview/activity navigation: no token balance RPC calls.
- NFT overview/rewards: membership reads only, plus reward-period calls needed
  by the visible screen.
- Membership: only qualification and balances required for membership actions.
- Activation: USDT and sequential-level preflight only when required.
- No duplicate in-flight calls for the same wallet, chain, and method.
- Ten concurrent testers must remain below the provider's 15 RPS limit without
  rate-limit errors or state corruption.

## Mobile Orbit Acceptance

- Test 360x800, 390x844, 412x915, tablet, and desktop.
- Orbit geometry must derive from its container and fit on first render.
- Zoom must have bounded minimum/maximum values and reliable reset/fit actions.
- Pointer cancel, route change, and orientation change must clear drag/zoom
  state.
- Controls must remain outside the transformed canvas and stay tappable.
- Dense P39 labels must not overlap or force the viewport wider than the page.

## Testing Restriction

Registration and level activation testing may continue. NFT unlock, upgrade,
and downgrade should remain paused until the transaction-state tests and a real
wallet confirmation pass.

## Production Port Checklist

1. Port behavior, tests, and semantic labels, not staging addresses or secrets.
2. Apply the production RPC/API environment independently.
3. Capture before/after RPC counts by screen and transaction.
4. Run NFT mint, unlock, restore, upgrade, downgrade, rejection, revert, and
   refresh-failure tests.
5. Run the mobile orbit viewport and interaction matrix.
6. Confirm API/worker ownership and shared WebSocket behavior.
7. Record deployment commit, environment diff, evidence, and rollback point.

