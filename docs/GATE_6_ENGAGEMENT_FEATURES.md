# Gate 6 - Engagement Features

Date: 2026-08-28
Status: implementation in progress

## Scope

1. WalletConnect QR login for laptop users.
2. Authorized administrator-to-user in-app notifications.
3. Configurable official YouTube video.
4. Registered-user tasks with proof and review workflows.

No staging database, index checkpoint, contract state, or mock-USDT state may be reset until all four features are implemented and live-certified.

## WalletConnect QR login

The existing wallet foundation already supported injected wallets and a WalletConnect Ethereum provider, but WalletConnect was selected only when `window.ethereum` was absent. Laptop users with MetaMask installed therefore could not choose QR login.

The Gate 6 implementation:

- routes the disconnected navbar wallet action through the existing wallet panel;
- presents separate Browser Wallet and Scan with WalletConnect actions;
- keeps the established connected-wallet panel intact;
- sends network-switch requests through the provider selected by the user;
- listens for WalletConnect account and disconnect events;
- keeps WalletConnect disabled with a clear tooltip when the deployment project ID is absent;
- adds no browser RPC polling and changes no backend/indexer behavior.

Deployment requires `VITE_WALLETCONNECT_PROJECT_ID`. Because every `VITE_` variable is embedded into the public frontend bundle, Render must configure it with `visibility: config`, never `visibility: secret`. The value is a public WalletConnect/Reown project identifier, not a private key.

### WalletConnect live checks

1. Laptop with an injected wallet installed can choose either Browser Wallet or WalletConnect QR.
2. QR code opens and can be scanned by a supported mobile wallet.
3. The connected address and provider label update correctly.
4. Polygon Amoy switching targets the scanned provider, not an injected provider.
5. Account changes and disconnects update the application state.
6. Existing injected-wallet connection remains unchanged.
7. Desktop/mobile and light/dark wallet panels remain usable.

## Remaining feature contracts

Notification authoring, official video configuration, and task workflows will be expanded in this document as each feature enters implementation. Each feature requires its own backend/frontend tests, live staging evidence, production-port file list, and environment contract.

## Reset boundary

The later fresh-test reset must be a separate reviewed operation. It must preserve the mock USDT contract and approved deployment contracts, define database collections and index checkpoints explicitly, and produce before/after evidence. No reset command belongs in this feature implementation gate.
