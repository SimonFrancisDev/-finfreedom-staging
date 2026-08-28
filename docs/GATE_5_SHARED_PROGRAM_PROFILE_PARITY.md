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

## Activity page parity

`ActivityPage` is one complete renderer for both programs. The external shared program selector is authoritative; the page does not maintain a second program filter or combine records from both programs.

The retained surface includes the identity hero, update/error state, summary chips, type/time filters, timeline, receipts table, payout and activation summary, level-status grid, pagination, explorer links, and JSON/CSV exports. Switching programs changes only the labels, values, level count, and exported dataset.

Freedom-Plus mapping:

- Timeline payouts come from indexed recipient payment rows.
- Receipt rows use the same indexed payments and preserve transaction, level, position, cycle, and timestamp context.
- Token and cycle records come from the indexed non-NFT ledger. FPT/FPTr quantities are never mislabeled as USDT.
- Activation events and the seven-level grid come from indexed Freedom-Plus level projections.
- Summary counts and received-USDT totals are computed from the selected Freedom-Plus dataset.
- `SpaceContext.subjectAddress` is authoritative for public-profile reads; the connected wallet remains the authentication/signing identity.
- Program/profile changes reset pagination and refresh through the API every 60 seconds.
- JSON/CSV exports contain only the currently selected program and include that program in the filename.

The Activity browser performs no contract reads and starts no JSON-RPC polling. F-Freedom activity uses the existing backend receipts, summary, and orbit-level read APIs; Freedom-Plus uses the indexed participant API. The F-Freedom backend orbit-level service retains its documented indexed/contract fallback semantics, so this statement is specifically about browser traffic rather than a claim that every backend recovery path is RPC-free.

### Activity live-certification checklist

1. Verify F-Freedom and Freedom-Plus preserve identical layout, filters, receipts, timeline, summary, and theme behavior.
2. Verify switching programs never mixes records and changes the grid from ten to seven levels.
3. Verify self, public visitor, locked visitor, and return-to-self states.
4. Verify payments, activations, ledger records, timestamps, explorer links, and totals against indexed records.
5. Verify token quantities do not render as USDT.
6. Verify retry, empty, loading, pagination, JSON export, and CSV export states.
7. Confirm browser network traffic remains API-driven with no periodic JSON-RPC calls.
8. Verify desktop/mobile and light/dark rendering before production certification.
