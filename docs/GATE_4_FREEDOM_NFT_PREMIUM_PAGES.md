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

All generated assets live under frontend/public/images/freedom-nft/.

| Asset | Use |
| --- | --- |
| overview-hero-desktop.png | Overview desktop hero; full scene retained |
| overview-hero-mobile.png | Dedicated portrait Overview hero |
| tier-foundational.png | Foundational tier cards and allocation |
| tier-intermediate.png | Intermediate tier cards and allocation |
| tier-advanced.png | Advanced tier cards and allocation |
| membership-hero.png | Membership hero |
| rewards-hero.png | Rewards hero |
| success-achievement.png | Confirmed NFT action modal |

The images were generated with the built-in image generation tool in premium fintech product-render mode. The shared language is graphite and platinum material, emerald/cyan system light, restrained gold achievement accents, no embedded text or logos, and safe copy space in hero compositions.

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
