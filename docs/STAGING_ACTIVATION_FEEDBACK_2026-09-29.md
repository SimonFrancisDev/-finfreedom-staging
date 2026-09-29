# Freedom-Plus activation feedback - 2026-09-29

Scope: staging-environment only. Requested by Anthony and reported by Sabina.
Production, contract rules, prices, databases and founder representatives are unchanged.

## Changes

- Shared level configuration now holds the approved stages:
  1. P39 IGNITION
  2. P14 ACCELERATION (lightning icon)
  3. P12 ASCENSION
  4. P6 PRESTIGE
  5. P4 DOMINANCE
  6. P4 EMINENCE (star icon)
  7. P3 PINNACLE
- The existing card names were already correct. They no longer depend on a
  separate array index, and the requested icons are present.
- Removed the automatic registration review popup, its allowance prefetch,
  the extra review modal/Continue button, and the duplicate registration panel.
- Eligible Activate clicks now enter the existing transaction handler directly.
  No activation starts simply by visiting the page.
- The requested security checkbox and How confirmation works copy were already
  absent from the inspected activation components; neither is reintroduced.
- Kept wallet/network, permanent sponsor, raw balance, sequential-level,
  already-active and F-Freedom gateway checks. Added a synchronous in-flight
  guard against repeated clicks before React updates the busy state.
- If allowance is insufficient, approve the exact amount to the existing
  Freedom-Plus level manager, wait for a successful receipt, then request the
  program transaction. A rejection or failed approval stops the flow.
  Removing website clicks does not remove required wallet signatures.
- Activation-card balance indicators use raw bigint units instead of parsing
  formatted display strings (including Italian decimal/grouping conventions).
- Failed initial API and registration RPC reads now leave account status
  unavailable instead of constructing a false unregistered account.

## Sabina account verification

Read-only check completed 2026-09-29T11:36:10.696Z on Polygon Amoy (80002),
using the authorized build-plan endpoint, at block 48,859,339.

Wallet: 0xf0152a2490a854712fae8fd32ffcd9729082a09d

- Each F-Freedom level 1 through 10: active on-chain.
- Each Freedom-Plus level 1 through 3: active on-chain.
- Each Freedom-Plus level 4 through 7: inactive on-chain.
- Staging participant API: HTTP 200, registered, levels 1/2/3 active.
- Indexed F-Freedom gateway: registered and Level 1 active.
- Permanent sponsor returned by the API:
  0x3a596f67585f27cfd7f449fec0a92b7bf34b1df5.
- Budget: 19 RPC requests plus one API request. No transaction broadcast,
  token mint/unlock, historical scan or deployment setting change.

This verifies current activation state, not the historical browser screenshot.
The five photos in the copied September 27 conversation were not attached.
The exact page/display failure and the historical failed NFT transaction
remain unproven; do not describe them as fully resolved by this patch.

## Verification

- Existing local walletReads suite: 8 passed, zero failures.
- New activationFlow and activationRendering files pass node --check.
- Added tests for all seven stage/engine/price mappings, no review flow,
  network/loading/busy gates, F-Freedom prerequisite, next-level eligibility,
  unknown initial data, locale-safe balance badges, exact approval spender
  and amount, existing allowance, rejected/reverted approval and duplicate clicks.
- Added the activation center to the existing unbound-render-identifier test.
- Full frontend dependencies are absent locally. The clean GitHub CI workflow
  passed all frontend tests (including the new render/handler tests) and the
  frontend production build. Backend tests/syntax and smart-contract tests
  passed as well.
- Verified code commit: 1fc8b40f2958a8e55f502e6e8393c8bd4112c20e, pushed to staging main.
- CI run: https://github.com/SimonFrancisDev/-finfreedom-staging/actions/runs/36563299053.
- Successful jobs: frontend 109389087922, backend 109389088005,
  smart contracts 109389087585. All completed successfully.
- The first local GitHub status request timed out; an IPv4 retry verified the
  completed run and each job. A failed status request was not treated as a
  failed build or as proof of success.
- Phone-wallet interaction and desktop/mobile visual checks are still pending.
- This is not certification of every historical event, orbit or NFT action.

## Immediate rollout step

After the code commit passes CI, confirm the staging Vercel deployment uses
that commit. No API/worker configuration change is required by this frontend patch.
Verify that opening Freedom-Plus does not automatically show a registration
popup, and that Activate opens the expected wallet flow. Rejecting a wallet
request must leave the account unchanged and allow a retry.

Keep existing staging services running for verification. Do not reset now.
A later coordinated staging-only reset requires a fresh verified backup and
the remaining issue checks; it is not a database-only wipe. Production is excluded.

## Overview stage-name correction

The user found that the overview still displayed Foundation, Positioning,
Expansion, Momentum, Elevation, Leadership and Zenith. Those labels lived in a
separate presentation list and were missed by the activation-card correction.

- The overview now derives stage names, orbit engines and prices from
  FREEDOM_PLUS_LEVELS, the same configuration used by activation.
- Its presentation metadata only contains descriptions, icons and color tones.
- Acceleration uses the lightning icon; Eminence uses the star icon.
- Overview headings now describe the seven premium levels.
- F-Freedom's ten stage names, contract rules and all stored data are unchanged.
- Added dark/light overview render checks for all seven stage/engine/price
  mappings and a regression test proving titles follow the shared configuration.
- Added overview render-binding coverage, including its browser MutationObserver.
- Full CI results for this follow-up are recorded below after verification.

The user requested the coordinated staging reset as the next phase, without
repeating the earlier Sabina investigation. This commit does not perform that
reset or silently mark the historical reports resolved. The reset must retain
a fresh backup and affect staging only, with three founder representatives.
