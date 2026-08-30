# Founder Staging Test Invitation

**Date:** 30 August 2026

**To:** Anthony Eghosa and H Verma  
**Subject:** Invitation to test the refreshed FIN-FREEDOM staging platform

Dear Founders,

The refreshed FIN-FREEDOM staging environment is ready for structured testing. We have reset the test environment, deployed fresh F-Freedom and Freedom-Plus contracts on Polygon Amoy, rebuilt the indexed data, and completed the first certified Level 1 activation in each program.

Your staging wallets have been funded with mock USDT for testing:

- Anthony Eghosa: `0x3a596f67585F27cfD7F449FeC0a92b7bf34B1df5`
  - Funded with 10,000 mock USDT
  - Funding transaction: `0xa8c6c839429b5d772754e9837263679cf0a99422610af145a28129acbe6fd346`
- H Verma: `0xDd78425335C0c698615845d94f9FeE7492266396`
  - Added 10,000 mock USDT; confirmed balance is 30,297 mock USDT
  - Funding transaction: `0xf459e5950f877624e5cada6a4018449fd4f725747aac5d1b057208fa8e975a25`

The staging mock USDT contract is:

`0x7b7E39f3D177B3356368431C5C285bca58b43A60`

Mock USDT has no real monetary value and must only be used on Polygon Amoy.

## Work completed

1. Fresh F-Freedom contracts, registration, level progression, P4/P12/P39 orbit behavior, settlement, escrow, FGT and FGTr integration, and indexed transaction history.
2. Fresh Freedom-Plus contracts, inherited sponsor handling, Level 1 onward progression, P3/P4/P6/P12/P14/P39 structures, settlement roles and fallbacks, FPT and FPTr issuance, founder-representative initialization, and indexed account data.
3. One shared NFT Pool Vault and one shared Operations Vault for future system charges from both programs. The migration, approvals, execution, and historical-vault handling are documented.
4. WebSocket-first event indexing for both programs, with polling disabled, projection rebuilding, event recovery, and API read models designed to reduce repeated RPC usage.
5. Correct cross-program community metrics for generated volume, user distributions, system charges, NFT allocations, operations allocations, activation counts, and current/historical vault reporting.
6. Freedom-Plus registration checks, readable transaction errors, approval and activation transaction states, next-level unlocking, orbit viewing, node details, relationship lines, rings, placement colors, and zoom controls.
7. Shared dashboard, account, activity, profile-view, and program-switch behavior. F-Freedom and Freedom-Plus retain the same page structure and visual behavior while displaying program-specific values.
8. Premium Freedom NFT overview, membership, and rewards pages, including responsive visuals, membership tiers, navigation, light theme, dark theme, and mobile presentation.
9. WalletConnect support for desktop users who want to connect by scanning a QR code with a mobile wallet.
10. Website notifications, including admin-created messages, optional images, delivery reporting, notification-page destinations, and complete user viewing.
11. Official YouTube video management and website display.
12. User task and engagement features, including task creation, action links, submissions, live task viewing, comments, replies, applause and interaction support, notifications, and reward-related workflow foundations.
13. Telegram notification integration and administrative notification controls for the staging environment.
14. Temporary staging administrator access for the founders so all administrative workflows can be tested. This is test-only and will be restored to strict multisig-owner authorization before production.
15. Comprehensive staging-to-production documentation covering contracts, addresses, deployment blocks, environment variables, backend APIs, WebSocket indexers, frontend behavior, engagement features, transaction audits, governance actions, reset procedures, and production verification gates.

## Certified staging transactions

The first clean-state Level 1 activations were audited financially, structurally, and against their indexed records:

- F-Freedom: `0xa8d0b4a8a9533d4a83327b60bb337caf619b54c39c079790b02ac588ed5399f7`
- Freedom-Plus: `0x6d6757a82ee026f74fa8f1cfc3650e4163a62780bbf7d01293b4ed276c61c04e`

The combined certified value is 60 USDT: 54 USDT in participant distributions and 6 USDT in system charges, split into 4.8 USDT for NFT and 1.2 USDT for operations.

## What we need you to test

Please test registration, sponsor inheritance, every available level activation, approvals, wallet confirmations, next-level unlocking, orbit positions, direct and indirect relationships, payments received, token rewards, account and activity records, program switching, profile switching, NFT pages, WalletConnect, notifications, official video, tasks, comments, replies, applause, mobile layout, desktop layout, and both visual themes.

For every issue, please provide:

- The connected wallet address
- The selected program and page
- The action performed
- The expected result
- The actual result
- Transaction hash, when applicable
- Screenshot or screen recording
- Browser, device, and wallet application

Please do not use real USDT or Polygon mainnet. This environment remains staging and is intended for verification before the final production package is approved.

Sincerely,

**Simon Francis**  
Development and Integration
