# Gate 4: Shared Frontend Foundation

## Objective

Make program selection, profile viewing, theme behavior, navigation, and shared feedback foundations consistent across F-Freedom, Freedom-Plus, Freedom NFT, Dashboard, Account, and Activity.

## Audit Findings

| Foundation | F-Freedom | Freedom-Plus | Freedom NFT | Gate 4 requirement |
| --- | --- | --- | --- | --- |
| Program identity | Default shared-page view | Query-string-only shared-page view | Implicitly hosted by Freedom-Plus controller | Persist the selected program and synchronize it with shared-page URLs |
| Shared-page rendering | Page element receives a program prop | Same element is cloned with a different prop | Not represented in the shared switch | Replace element cloning with an explicit render contract |
| Profile viewing | Account exposes self/visitor profile controls | Full-page summary bypasses those controls | Uses connected wallet only | Keep the Account profile selector outside program-specific content |
| Theme | Global `data-theme` root | Mostly consumes global tokens | Has local styling inside Freedom-Plus bundle | Certify both themes from the same root; no independent theme state |
| Navigation | Generic Dashboard/Account/Activity routes default to F-Freedom | Program-specific routes redirect with `program=freedom-plus` | Dedicated routes | Generic shared routes must restore the last selected program when no explicit query is present |
| Feedback | Established page access/loading/error states and global toast/overlay providers | Mixed controller-local states | Mixed controller-local states | All programs remain under the global overlay/toast/theme providers; transaction workflow parity remains Gate 5 |

## Implementation Scope

1. Persist `f-freedom` or `freedom-plus` when the shared program switch changes.
2. Treat an explicit `program` query parameter as authoritative and synchronize persistence from it.
3. Restore the persisted selection when Dashboard, Account, or Activity opens without an explicit program query.
4. Render shared pages through a function contract instead of cloning a React element.
5. Keep Account self/visitor profile controls visible for both program views and pass the resolved profile wallet into each program implementation.
6. Confirm Freedom NFT remains under the same `SessionProvider`, `SpaceProvider`, `NotificationProvider`, `OverlayProvider`, `ToastProvider`, and global `data-theme` root.

## Out Of Scope

- Registration and activation transaction parity: Gate 5.
- Orbit rendering, ring layout, lines, and zoom: Gate 6.
- WalletConnect, notifications authoring, video, and tasks: later product gates.
- Production deployment and production contract wiring: final integration gates.

## Acceptance Criteria

- Switching to Freedom-Plus on one shared page and opening another generic shared page retains Freedom-Plus.
- Explicit `?program=f-freedom` or `?program=freedom-plus` always wins and updates persistence.
- Browser refresh and direct shared-route entry retain the last valid program selection.
- Account profile switching is available and resolves the same viewed wallet in both program views.
- Invalid persisted/query values safely resolve to F-Freedom.
- Frontend production build passes.
- Desktop and mobile checks pass in both light and dark themes before Gate 4 certification.

## Status

Implementation complete locally.

- Frontend production build: passed on 2026-08-28 (npm run build, 3,330 modules transformed).
- Remaining: deploy staging and visually certify Dashboard, Account, Activity, and Freedom NFT on desktop/mobile in light/dark themes.