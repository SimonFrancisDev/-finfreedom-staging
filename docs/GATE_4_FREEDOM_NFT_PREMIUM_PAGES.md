# Freedom NFT Premium Pages

## Scope

Freedom NFT has exactly three user-facing pages:

| Page | Route | Responsibility |
| --- | --- | --- |
| Overview | /freedom-nft | Program explanation, membership stages, safeguards, and journey |
| Membership | /freedom-nft/membership | Tier selection, mint/update, locked balances, unlock, and eligibility restoration |
| Rewards | /freedom-nft/rewards | Tier allocations, published periods, eligibility, and claims |

Desktop and mobile navigation must expose only these three destinations. Foundation, Intermediate, Advanced, Utility Role, and NFT Program Dashboard are not pages and must not appear as navigation links.

## Component Mapping

- FreedomNftOverview.jsx: public overview and responsive hero.
- FreedomNftPages.jsx: FreedomNftMembership, FreedomNftRewards, and FreedomNftSuccessModal.
- FreedomPlusPage.jsx: data/controller layer. Existing contract calls, indexed data loading, error handling, and transaction status remain authoritative.
- FreedomNftPages.css: isolated NFT presentation using shared --ffn-* semantic theme tokens.

Membership must not duplicate the Rewards period list. Reward history and claims belong only to Rewards.

## Asset Manifest

Freedom NFT reuses the official theme-aware assets already maintained by the landing program:

| Asset family | Use |
| --- | --- |
| landing/hero-03-dark.png and hero-03-light.png | Overview desktop hero |
| landing/cards/nft-card-mobile-dark.png and nft-card-mobile-light.png | Overview mobile hero |
| landing/cards/nft-card-dark.png and nft-card-light.png | Membership and Rewards desktop media |
| landing/cards/nft-card-mobile-dark.png and nft-card-mobile-light.png | Membership and Rewards mobile media |

Tier presentation follows the official landing program structure: Foundation uses a blue gem, Intermediate uses a green star, and Advance uses a purple crown. No separate generated tier bitmap is required.

## Confirmed Action Behavior

The image-led success modal may open only after tx.wait() returns a successful receipt. It applies to membership mint/update, qualification unlock, eligibility restoration, and reward claims. It never replaces signing, pending, failed, or reverted transaction feedback.

## Theme And Responsive Rules

- Content surfaces use shared semantic --ffn-* variables.
- Hero copy keeps explicit contrast over media in both themes.
- Desktop Overview uses the landscape image; viewports at 680px or below use the portrait image.
- Membership and Rewards reposition media and copy at narrow widths.
- Tier and allocation grids collapse without changing hierarchy.
- Card radius is 8px or less.
- Text, controls, and transaction state must not overlap.

## Production Port Checklist

1. Copy the eight assets without renaming unless references change together.
2. Port the components and controller imports/state hook.
3. Preserve production contract addresses and environment configuration.
4. Keep success triggering after a confirmed receipt only.
5. Apply the same three-link desktop/mobile navigation.
6. Build the production frontend.
7. Verify all three pages in light/dark themes at desktop/mobile widths.
8. Test mint/update, unlock/restore, and claim success/failure paths.
9. Confirm Membership contains no duplicated rewards list.
10. Confirm removed labels do not remain in active fallback menus.

## Acceptance Record

- Three real routes retained.
- Misleading NFT navigation entries removed.
- Overview receives separate desktop/mobile media.
- Tier cards use tier-specific artwork.
- Membership and Rewards receive image-led heroes and structured cards.
- Confirmed NFT actions receive an image-led success modal.
- Contract and indexed-data behavior remains in the parent controller.
- Staging production build passes.

## Navigation and Media Closure (2026-08-28)

- Removed the duplicate top-level Freedom Plus navbar item on desktop and mobile. Freedom-Plus remains available through Services.
- Standardized Services > Freedom NFT Program order to Overview, Rewards, Membership.
- All NFT hero and card artwork uses full-image containment. Cropping is prohibited on desktop and mobile.
- Added theme-specific Foundation, Intermediate, and Advance tier artwork and reused it across Overview, Membership, and Rewards.
- Asset pairs are tier-foundation-dark/light.png, tier-intermediate-dark/light.png, and tier-advance-dark/light.png under frontend/public/images/freedom-nft.
- Tier art contains no embedded copy. Accessible tier names remain live interface text.
- Production port requirement: copy all six assets and preserve the theme switch, object-fit containment, submenu order, and single Services-based Freedom-Plus entry.
## Final Hero and Tier Artwork Closure (2026-08-28)

- Overview, Rewards, and Membership heroes break out of the padded content column and render edge-to-edge across the available page width.
- Hero media uses cover-based fill to eliminate the centered/unused right-side area on desktop and mobile.
- Tier card artwork remains containment-based so each complete NFT card and its inscription stay visible.
- Foundation, Intermediate, and Advance light/dark assets include their exact uppercase membership labels as part of the artwork.
- Production must port these CSS breakout rules and the six labeled assets together.
## Final Frame Refinement (2026-08-28)

- Overview hero dimensions remain unchanged.
- Membership and Rewards use the existing hero assets in a reduced 420px desktop and 500px mobile frame to limit cover cropping.
- Existing tier artwork is retained and receives a controlled 1.12 visual scale inside its fixed image frame to reduce intrinsic top/bottom whitespace.
- Hero and tier media frames include a theme-aware bottom divider using the shared border token, preventing a floating visual appearance.
- Production port requirement: preserve these selectors after the earlier full-width hero rules so this refinement wins in the cascade.
## Screenshot-Verified Media Geometry (2026-08-28)

This section supersedes the earlier fixed-height frame refinement.

- Membership and Rewards desktop heroes use the source asset ratio 1448:1086 (4:3), remain edge-to-edge, and use containment so the complete image is visible without zoom or crop.
- Membership and Rewards mobile heroes use the dedicated source ratio 864:1821.
- Overview hero remains unchanged.
- Overview and Membership tier-art frames use a 1.45:1 ratio matching the visible membership-card body.
- Tier art uses cover only inside that 1.45:1 frame. This removes the square source canvas above and below while preserving the complete physical card from left to right.
- Existing generated and labeled assets remain unchanged.