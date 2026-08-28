# Gate 5 - Shared Program and Profile Parity

Date: 2026-08-28
Status: staging implementation

## Shared route inventory

The program switch is authoritative on Dashboard, Account, and Activity. The selected program is stored in `ffn_active_program` and mirrored in the `program` URL parameter without discarding other query parameters or navigation state.

## Required parity contract

- F-Freedom and Freedom-Plus use the same shared-page shell, spacing system, typography hierarchy, responsive breakpoints, loading/error/empty conventions, and light/dark design tokens.
- Program-specific values and labels may differ; structural hierarchy and interaction behavior must not collapse into an unrelated mini-card.
- The program selector is a premium segmented control with semantic icons, restrained metallic accenting, keyboard tab semantics, reduced-motion support, and full light/dark coverage.
- All shared read views use indexed backend APIs. Program switching must not introduce direct frontend chain polling.

## Profile context contract

- `SpaceContext.subjectAddress` is the source of truth for read-only Dashboard, Account, and Activity views.
- The connected wallet remains the signer and transaction authority; viewing another profile never grants transaction capability.
- Freedom-Plus participant reads carry the same profile privacy authorization headers used by F-Freedom.
- Public profiles can be viewed by wallet or referral identity through the existing Account switcher.
- Locked visitor profiles are rejected by backend privacy enforcement. Locked self-profiles may request owner authorization.
- Returning to self restores the connected wallet without changing the active program.

## Freedom NFT Membership and Rewards hero

- Overview artwork is unchanged.
- Membership and Rewards use the established dark/light desktop/mobile NFT card assets.
- Each subpage uses the same image as a cover backdrop and a proportionally reduced contained foreground visual.
- The main visual remains complete, including its top edge, while the backdrop fills the hero from edge to edge.
- No replacement or ring artwork is permitted.

## Production port checklist

1. Port `ProgramViewSwitcher` markup and CSS together.
2. Port `SpaceContext.subjectAddress` consumption on shared Freedom-Plus views.
3. Port privacy-aware Freedom-Plus API request options and headers.
4. Port the NFT subpage two-layer framing rules and all four existing NFT card assets.
5. Verify Dashboard, Account, and Activity with self, public visitor, locked visitor, and locked owner profiles.
6. Verify both programs in light/dark themes at desktop and mobile widths.
7. Confirm browser network traffic remains API/index driven and does not create periodic JSON-RPC reads.