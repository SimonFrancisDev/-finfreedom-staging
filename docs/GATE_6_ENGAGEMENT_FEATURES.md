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

Status: staging live-certified on 2026-08-28.

The existing wallet foundation already supported injected wallets and a WalletConnect Ethereum provider, but WalletConnect was selected only when `window.ethereum` was absent. Laptop users with MetaMask installed therefore could not choose QR login.

The Gate 6 implementation:

- routes the disconnected navbar wallet action through the existing wallet panel;
- presents separate Browser Wallet and Scan with WalletConnect actions;
- keeps the established connected-wallet panel intact;
- sends network-switch requests through the provider selected by the user;
- normalizes string, numeric, and provider-object chain IDs returned by mobile WalletConnect wallets before comparing Polygon Amoy;
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

### Staging certification evidence

- The disconnected wallet panel displayed separate Browser Wallet and Scan with WalletConnect actions.
- The Reown project ID was configured as the public frontend variable VITE_WALLETCONNECT_PROJECT_ID.
- The WalletConnect QR modal rendered a valid pairing code.
- Pairing through a mobile wallet's in-app WalletConnect scanner succeeded.
- A mobile provider returning a non-string chain ID initially exposed an account-normalization error; commit d5ac6b4 normalized string, numeric, and provider-object chain ID responses.
- The user confirmed successful WalletConnect login after frontend redeployment.
- No API, worker, indexer, contract, database, or RPC-polling change was required for this feature.

## Administrator-to-user notifications

Status: implemented locally; staging live certification pending.

The existing notification feed, bell dropdown, notification center, preferences, read state, and dismiss behavior remain the user-facing foundation. Gate 6 adds an administrator composer without introducing blockchain reads or RPC polling.

### Delivery contract

- An authorized administrator can send to one valid wallet address or broadcast to all indexed registered wallets.
- Broadcast recipients are the deduplicated union of indexed F-Freedom registration events and registered Freedom-Plus participants for the configured chain.
- Recipient discovery uses MongoDB only. It makes no HTTP RPC, WebSocket RPC, contract, or explorer request.
- Each message supports a title, primary message, optional details, severity, destination route, and optional image.
- Literal administrator text is stored separately from translation keys so existing event notifications retain localization while administrator messages render exactly as authored.
- Delivery returns requested, delivered, and failed counts. A broadcast is capped at 10,000 unique indexed recipients per request.

### Image contract

- The admin API accepts JPEG, PNG, and WebP images up to 5 MB.
- The backend verifies both the declared MIME type and the file signature.
- Images are stored in the existing MongoDB database using the `notificationMedia` GridFS bucket. No third-party media account or new environment variable is required.
- A notification can reference only an uploaded image that still exists in GridFS.
- User clients load images from the immutable public media endpoint and render them in both the bell-details modal and the full notification center.
- Media responses set an explicit content type, immutable caching, `nosniff`, and a restrictive sandbox content-security policy.

### Security and administration

- Message creation and image upload remain behind the existing `ADMIN_API_KEY` middleware and configured admin header.
- The admin frontend retains the key only through the existing runtime/session mechanism.
- Raw image uploads preserve the admin authentication header, image content type, and sanitized filename metadata. The API CORS contract explicitly permits the X-File-Name upload header.
- Broadcast requires an explicit browser confirmation before submission.
- Uploaded files are data only; SVG, HTML, scripts, arbitrary URLs, and arbitrary MIME types are rejected.

### API surface

- `POST /api/admin/notifications/media` uploads one protected image.
- `POST /api/admin/notifications/messages` sends one direct or broadcast campaign.
- `GET /api/notifications/media/:id` streams a stored notification image.
- Existing notification feed/read/dismiss/preference endpoints are unchanged.

### Deployment and certification

This feature requires redeploying the staging API and frontend. The API service must set `NOTIFICATIONS_ENABLED=true`; disabled notification storage is reported as HTTP 503 and never as a successful campaign. The worker does not require redeployment for functionality because recipient selection and delivery are database-backed and no indexer code changed.

Live certification sequence:

1. Send a direct text-only notice to a registered staging wallet.
2. Confirm the exact title/message/details in the bell dropdown and notification center.
3. Confirm read, open-route, dismiss, and persistence after refresh.
4. Send a direct JPEG/PNG/WebP notice and confirm the complete image renders in both views on desktop/mobile and light/dark themes.
5. Attempt an invalid file type and an oversized image; confirm rejection.
6. Only after direct delivery passes, send one controlled broadcast and reconcile requested/delivered/failed counts with indexed recipients.
7. Confirm API/worker logs show no new RPC polling or contract reads from notification delivery.

Production port requires the backend notification model, admin and public routes/controllers, notification delivery/media services, admin composer, both user notification views, styles, and this environment/deployment contract. MongoDB must support GridFS; no migration or contract deployment is required.
## Remaining feature contracts

Notification authoring, official video configuration, and task workflows will be expanded in this document as each feature enters implementation. Each feature requires its own backend/frontend tests, live staging evidence, production-port file list, and environment contract.

## Reset boundary

The later fresh-test reset must be a separate reviewed operation. It must preserve the mock USDT contract and approved deployment contracts, define database collections and index checkpoints explicitly, and produce before/after evidence. No reset command belongs in this feature implementation gate.
