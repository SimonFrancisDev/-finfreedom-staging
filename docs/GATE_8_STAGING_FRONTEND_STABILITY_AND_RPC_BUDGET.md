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

## Mobile Orbit Implementation (2026-09-26)

- Removed the fixed 620px mobile orbit width. The focused orbit now fits the
  available phone container at its natural square aspect ratio.
- The canvas clips transformed content and contains overscroll so zooming does
  not widen or displace the page.
- Pan is enabled only above 100 percent zoom and is bounded to the visible
  canvas.
- Level and cycle changes restore the fitted 100 percent view.
- Resize and orientation changes recalculate pan limits.
- Pointer cancellation, lost pointer capture, and browser focus loss clear the
  panning state so controls cannot remain stuck.
- Live-device interaction and screenshot evidence at the required viewport
  sizes remains a deployment verification step.

## Verification Record (2026-09-26)

- `git diff --check` passed before the first stabilization commit.
- The repository had no installed frontend toolchain in this checkout.
- Two bounded `npm install` attempts stalled without registry output and were
  terminated cleanly. No dependency or lockfile change is part of this gate.
- Vercel remains the production-build verification source for the pushed
  staging commits until local dependency installation is restored.

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
## 2026-09-27 tester incident batch

### Verified state

- Wallet 0x0de1B6F15Fe8E5Cf7fbBA2cD4C576357Ececa962 is registered in F-Freedom and has F-Freedom Level 1 active. Its permanent sponsor is 0xF0152a2490a854712fAe8FD32FFCD9729082A09d.
- The same wallet has no Freedom-Plus participant record and no Freedom-Plus level activation. Freedom-Plus Level 2 must remain locked until the separate Freedom-Plus enrollment and Level 1 transaction succeeds.
- Wallet 0xF0152a2490a854712fAe8FD32FFCD9729082A09d is correctly indexed in Freedom-Plus with Levels 1, 2, and 3 active. Any screen showing fewer levels is a read/display failure, not lost blockchain state.
- Its indexed Foundational NFT mint records 5,100 FGT and 600 FPT locked. FPTr is not part of NFT qualification.

### Frontend corrections

- Added a clipboard fallback for mobile and wallet browsers that reject navigator.clipboard.
- Added a dedicated Copy ID action in the Activation Center and Account referral views.
- Referral links now use the same fallback copy path.
- Direct visits without a referral URL continue to accept an FFN ID, referral link, or wallet address in the registration modal. Empty input explicitly uses system ID.
- Removed the duplicate Freedom-Plus acknowledgment checkbox and How confirmation works block. Network, balance, sponsor, sequential-level, and allowance checks remain enforced.
- Updated Freedom-Plus stage names to Ignition, Acceleration, Ascension, Prestige, Dominance, Eminence, and Pinnacle.
- Removed the separate recurring F-Freedom security notice from onboarding; eligible unregistered wallets now proceed directly to the registration form.

### Production rollout controls

- Preserve permanent sponsor resolution and sequential activation checks when porting these UI changes.
- Verify both indexed state and direct on-chain state before treating a missing level as a failed transaction.
- Test clipboard behavior in MetaMask mobile, an in-app wallet browser, Android Chrome, and desktop Chrome.
- Test direct entry, referral-ID entry, full referral-link entry, and wallet-address entry before production release.
- A local production build could not be completed on this workstation because frontend dependencies were absent and npm install did not produce node_modules. Vercel deployment build must be green before testers are told the patch is live.
