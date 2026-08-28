# Gate 5 - Shared Program and Profile Parity

Date: 2026-08-28
Status: staging implementation complete; live visual certification pending

## Shared route inventory

The program switch is authoritative on Dashboard, Account, and Activity. The selected program is stored in `ffn_active_program` and mirrored in the `program` URL parameter without discarding other query parameters or navigation state.

## Required parity contract

- F-Freedom and Freedom-Plus use the same shared-page shell, section order, cards, spacing, typography, responsive behavior, loading/error/empty conventions, and light/dark tokens.
- Switching programs changes program labels, routes, level counts, and indexed values. It must not replace a full page with a reduced summary component.
- The connected wallet remains the signer. `SpaceContext.subjectAddress` remains the read-only profile being viewed.
- The program selector remains visible and preserves profile context across shared pages.
- Shared read views use backend/indexed data. Program switching must not add browser JSON-RPC polling.

## Account page parity

`AccountPage` is the single renderer for both programs. Freedom-Plus no longer returns a separate summary-only view.

The retained section order is:

1. Account identity hero and activation action.
2. Profile switcher and locked-profile state.
3. Referral identity and invitation controls.
4. Direct downlines and total team.
5. Rewards and token balances.
6. Financial position.
7. Wallet snapshot.
8. Per-level breakdown.
9. Indexed-data update footer.

Freedom-Plus value mapping:

- Registration and active levels: indexed Freedom-Plus participant and level-state projections.
- Direct participants and total team: the indexed `FreedomPlusParticipant.sponsor` graph in MongoDB.
- Referral ID/link: the shared permanent F-Freedom identity inherited by Freedom-Plus.
- FPT and FPTr: indexed Freedom-Plus token ledger entries.
- USDT received and receipts: indexed recipient payment rows.
- Manual activation value: sum of active Freedom-Plus level prices.
- Upgrade escrow and auto-upgrade: zero with explicit manual-progression copy.
- Next-level price: the next sequential Freedom-Plus level price.
- Level breakdown: canonical seven-level configuration plus indexed receipts and activation state.
- POL balance: connected-wallet data, labeled as such while a visitor profile is open.

The Freedom-Plus network projection is database-only. It performs no provider calls and introduces no polling indexer.

## Profile context contract

- Public profiles can be viewed by wallet or referral identity through the existing Account switcher.
- Freedom-Plus reads use the selected subject address and carry privacy authorization headers.
- Locked visitor profiles retain the established blocked-page behavior.
- Returning to self restores the connected wallet without changing the selected program.
- Viewing another profile never grants transaction capability.

## Error and refresh behavior

- Both program views retain the same page-level loading behavior.
- Freedom-Plus indexed reads refresh every 60 seconds through the API, not the chain.
- A failed Freedom-Plus read displays a visible retry state and retains the page context.
- The footer reports the last successful indexed-data refresh.

## Production port checklist

1. Port `AccountPage.jsx`, `AccountPage.css`, and `ProgramViewSwitcher` together.
2. Port the Freedom-Plus participant API network projection and `ReferralCode` model dependency.
3. Preserve the exact Account section order and responsive/theme styles.
4. Preserve the distinction between permanent shared referral identity and Freedom-Plus sponsor/team participation.
5. Verify self, public visitor, locked visitor, and return-to-self behavior in both programs.
6. Verify unregistered, partially activated, and all-levels-active Freedom-Plus accounts.
7. Verify FPT, FPTr, received USDT, receipt totals, next-level price, and seven level rows against indexed records.
8. Confirm browser traffic is API-driven and no periodic JSON-RPC requests appear.
9. Verify desktop/mobile and light/dark rendering before production certification.

## NFT cross-reference

Freedom NFT visual requirements remain authoritative in `docs/GATE_4_FREEDOM_NFT_PREMIUM_PAGES.md`. Gate 5 does not redefine NFT assets or hero geometry.
