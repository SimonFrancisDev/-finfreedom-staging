# Gate 6 - Engagement Features

Date: 2026-08-29
Status: complete; all four engagement features staging-certified

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

Status: staging live-certified on 2026-08-29.

The existing notification feed, bell dropdown, notification center, preferences, read state, and dismiss behavior remain the user-facing foundation. Gate 6 adds an administrator composer without introducing blockchain reads or RPC polling.

### Delivery contract

- An authorized administrator can send to one valid wallet address or broadcast to all indexed registered wallets.
- Broadcast recipients are the deduplicated union of indexed F-Freedom registration events and registered Freedom-Plus participants for the configured chain.
- Recipient discovery uses MongoDB only. It makes no HTTP RPC, WebSocket RPC, contract, or explorer request.
- Each message supports a title, primary message, optional details, severity, destination route, and optional image.
- New administrator messages default to the protected /notifications destination. Clicking them opens the full notification center; administrators can still select another supported destination when needed.
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

### Staging evidence

- Direct delivery initially exposed a disabled `NOTIFICATIONS_ENABLED` deployment flag; the API now rejects this state explicitly instead of returning ambiguous zero-delivery accounting.
- After setting `NOTIFICATIONS_ENABLED=true` and redeploying the API, a direct administrator message reported 1 of 1 delivered and 0 failed.
- The user confirmed that the delivered notification rendered correctly.
- The user confirmed the protected `/notifications` destination opens and renders the complete delivered message correctly.
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
## Configurable official YouTube video

Status: staging live-certified on 2026-08-29.

The Community domain owns one official featured video. Configuration is stored as a MongoDB singleton and managed from the existing protected Admin Panel Community view. The published video appears directly below the public Community hero.

### Content and presentation contract

- The administrator supplies an official YouTube URL, title, optional description, and published state.
- Supported links are HTTPS `youtube.com` watch, embed, Shorts, and live URLs plus HTTPS `youtu.be` share URLs.
- The backend extracts and stores one validated 11-character YouTube video ID and a canonical watch URL.
- The public page renders nothing when no published video exists.
- A published video uses its YouTube thumbnail first; the privacy-enhanced `youtube-nocookie.com` iframe is created only after the user presses Play.
- The section is responsive and uses shared theme tokens for light and dark themes.
- The administrator can save an unpublished draft and preview its current title, description, and thumbnail.

### Security and architecture

- `GET /api/admin/community/official-video` and `PUT /api/admin/community/official-video` remain behind the existing `ADMIN_API_KEY` middleware.
- `GET /api/community/official-video` exposes only the currently published record and permits short public caching.
- HTTP URLs, non-YouTube hosts, lookalike domains, malformed video IDs, arbitrary iframe markup, and arbitrary embed URLs are rejected.
- Title and description lengths are validated in both the interface and Mongoose schema.
- The feature uses MongoDB and normal HTTPS page requests only. It adds no contract call, RPC read, WebSocket listener, polling indexer, worker task, or blockchain state.

### Implementation and production port

Backend files:

- `backend/src/models/OfficialVideo.js`
- `backend/src/services/community/officialVideoService.js`
- `backend/src/controllers/officialVideoController.js`
- `backend/src/routes/adminCommunityRoutes.js`
- `backend/src/routes/communityRoutes.js`
- `backend/test/officialVideoService.test.js`

Frontend files:

- `frontend/src/components/admin/AdminOfficialVideo.jsx`
- `frontend/src/components/admin/AdminOfficialVideo.css`
- `frontend/src/components/community/OfficialVideoSection.jsx`
- `frontend/src/components/community/OfficialVideoSection.css`
- `frontend/src/Pages/AdminPanel.jsx`
- `frontend/src/Pages/Community/CommunityPage.jsx`

No new environment variable, database migration, worker deployment, index checkpoint, contract deployment, or contract permission is required. Staging requires API and frontend redeployment.

### Live certification

1. Open Admin Panel > Community and save a valid official YouTube URL as unpublished.
2. Confirm the draft preview resolves the correct thumbnail and no public section appears.
3. Publish it and confirm the Community section appears directly below the hero.
4. Press Play and confirm the selected video loads through `youtube-nocookie.com`.
5. Confirm Watch on YouTube opens the canonical video URL.
6. Verify desktop/mobile and light/dark presentation.
7. Attempt HTTP, malformed, and lookalike-domain URLs and confirm rejection.
8. Unpublish and confirm the public section disappears after the short cache window or a cache-bypassing refresh.
9. Confirm worker/indexer logs are unchanged and no RPC activity is introduced.
### Staging certification evidence

- The staging API and frontend were redeployed with the official-video model, protected editor, public endpoint, and Community section.
- The first Vercel frontend build exposed an unsupported `Youtube` export in the installed Lucide version.
- Commit `ecd951e` replaced that unsupported export with the verified `Play` icon and restored a successful frontend deployment.
- The administrator configuration flow and published Community video presentation were verified successfully by the user.
- The feature required no worker behavior, indexer, contract, RPC polling, environment variable, or database migration.
## Remaining feature contracts

All four Gate 6 features are implemented and staging-certified. The next operation is the separately guarded full staging reset and fresh end-to-end test cycle.

## Registered-user live Tasks

Status: staging live-certified on 2026-08-29.

Tasks is a database-backed community workspace for registered F-Freedom and Freedom-Plus wallets. It does not read contracts, poll RPC endpoints, add indexer listeners, or require the worker. Registration eligibility is checked only against the existing indexed MongoDB registration records for the configured chain.

### User contract

- A connected wallet authorizes with the existing signed profile session before any task data is returned.
- Only wallets found in indexed F-Freedom registrations or registered Freedom-Plus participants can use the workspace.
- Published tasks appear in a live feed with active, upcoming, expired, participation, submission, and review states.
- A wallet can join once and maintain one proof submission per task. Rejected proof can be revised; approved proof is immutable.
- Proof accepts text, one HTTPS URL, and an optional protected JPEG, PNG, or WebP image up to 5 MB.
- Users can applaud a task, comment, reply one level deep, and react to comments. Removed comments retain a moderation placeholder.
- Rewards are ledger records linked to an approved submission. They are not represented as paid or issued until an administrator explicitly changes the status.
- Replies, reactions, review decisions, and reward updates use the existing in-app notification system and deep-link to `/tasks`.

### Administration contract

The existing Admin Panel Tasks view supports draft creation, scheduling, image upload, publication, optional registered-user broadcast, edits, closure/archive, proof review, protected proof-image viewing, comment moderation, and reward status updates. Administrative routes remain protected by the existing `ADMIN_API_KEY` middleware.

Task images reuse the `notificationMedia` GridFS bucket. Proof images use the separate protected `taskProofMedia` bucket and can be read only by the submitting signed wallet or an authorized administrator.

### Data model

- `engagementtasks`: task content, schedule, publication state, reward label, and image reference.
- `taskparticipations`: one wallet/task participation state.
- `tasksubmissions`: one wallet/task proof and review state.
- `taskcomments`: root comments, one-level replies, and moderation state.
- `taskreactions`: one wallet/target reaction.
- `taskrewards`: appendable reward truth linked to task, wallet, and submission.
- `taskProofMedia.files` and `taskProofMedia.chunks`: protected proof images.

Unique indexes enforce one participation, submission, and reaction for their respective ownership keys. Wallet addresses are normalized to lowercase.

### API surface

User routes under `/api/tasks` require a signed wallet session:

- `GET /`, `POST /:id/join`, and `POST /:id/submissions`
- `GET /:id/comments`, `POST /:id/comments`, and `POST /:id/reactions`
- `GET /rewards` and `GET /events`
- `POST /media` and `GET /media/:id`

Admin routes under `/api/admin/tasks` provide task, submission, moderation, reward, and protected-media operations.

### Live update and RPC contract

The API exposes an authenticated Server-Sent Events stream. Mutations publish an in-process invalidation event and clients refetch the database-backed task view. This is not a durable cross-instance event bus; staging and the current single API instance are supported. A horizontally scaled production API must use a shared pub/sub adapter before relying on instant cross-instance updates.

No task endpoint calls a blockchain provider. No worker/indexer deployment is functionally required. API and frontend deployment are required.

### Production port file list

Backend:

- `backend/src/models/EngagementTask.js`
- `backend/src/models/TaskParticipation.js`
- `backend/src/models/TaskSubmission.js`
- `backend/src/models/TaskComment.js`
- `backend/src/models/TaskReaction.js`
- `backend/src/models/TaskReward.js`
- `backend/src/middleware/requireWalletSession.js`
- `backend/src/services/tasks/taskService.js`
- `backend/src/services/tasks/taskMediaService.js`
- `backend/src/services/tasks/taskLiveService.js`
- `backend/src/controllers/taskController.js`
- `backend/src/controllers/adminTaskController.js`
- `backend/src/routes/taskRoutes.js`
- `backend/src/routes/adminTaskRoutes.js`
- `backend/src/app.js`
- `backend/test/taskService.test.js`

Frontend:

- `frontend/src/Pages/Tasks/TasksPage.jsx`
- `frontend/src/Pages/Tasks/TasksPage.css`
- `frontend/src/Services/tasksApi.js`
- `frontend/src/components/admin/AdminTasksManager.jsx`
- `frontend/src/components/admin/AdminTasksManager.css`
- `frontend/src/App.jsx`
- `frontend/src/Pages/AdminPanel.jsx`

### Staging certification evidence

- Commit `11a6cee` introduced the registered-user workspace, proof review, discussion, reactions, reward ledger, protected media, notifications, and authenticated live refresh.
- The first deployment exposed a navbar renderer that filtered out the valid Tasks navigation item while notification deep links still worked.
- Commit `b959190` added Tasks to the desktop navbar allowlist between Community and Support.
- After frontend redeployment, the user confirmed that Tasks is visible and the deployed workflow is working.
- Backend tests passed all nine suites, including existing realtime indexer, Freedom-Plus reward, official-video, and Tasks tests.
- Tasks remains database-backed and introduces no contract call, RPC polling, or worker/indexer listener.
### Staging certification checklist

1. Open Tasks with an unregistered signed wallet and confirm HTTP 403 without an RPC request.
2. Open with registered F-Freedom and Freedom-Plus wallets and confirm authorization.
3. Create a draft with an image; confirm it is invisible publicly.
4. Publish with a controlled notification and confirm feed and notification deep-link behavior.
5. Join, applaud, comment, reply, and react from two wallets; confirm live refresh and one-level reply enforcement.
6. Submit text, HTTPS URL, and image proof; confirm another user cannot read the protected image.
7. Reject and resubmit proof, then approve it; confirm participation and reward ledger states.
8. Mark the reward issued with the correct transaction hash or explicit off-chain note and verify the user notification.
9. Moderate a comment and confirm the placeholder remains.
10. Verify desktop/mobile and light/dark layouts and confirm API/worker logs show no task-generated RPC or indexer activity.
## Reset boundary

The later fresh-test reset must be a separate reviewed operation. It must preserve the mock USDT contract and approved deployment contracts, define database collections and index checkpoints explicitly, and produce before/after evidence. No reset command belongs in this feature implementation gate.

## Temporary staging test-admin access

Founders and testers may exercise all off-chain Admin Panel workflows using their connected wallet and a signed profile session. This mode is deliberately limited to staging and does not disclose the operator API key.

Required deployment configuration:

- API: `NODE_ENV=staging`
- API: `STAGING_TEST_ADMIN_ENABLED=true`
- Frontend: `VITE_STAGING_TEST_ADMIN_ENABLED=true` (public framework configuration)
- Worker: no test-admin flag required

The mode covers notifications with media, official video administration, community Tasks, and other API-backed administration. Smart-contract proposals, approvals, execution, guardian actions, ownership changes, and treasury operations remain protected by the deployed multisig and require a multisig owner wallet. The backend rejects wallet-based test-admin sessions unless both the staging environment and explicit feature flag are active. Production must keep both flags unset or false.

### Mandatory post-test rollback

This access is temporary and must be removed immediately when founder testing closes. Restore the original strict multisig-owner behavior before preparing the production release:

1. Set API `STAGING_TEST_ADMIN_ENABLED=false` or remove the variable.
2. Set frontend `VITE_STAGING_TEST_ADMIN_ENABLED=false` or remove the variable.
3. Redeploy the API and frontend; the worker does not require redeployment for this rollback.
4. Verify a normal connected wallet cannot see or open the Admin Panel.
5. Verify a multisig-owner wallet can still open the Admin Panel and perform its authorized operations.
6. Confirm the backend still requires the configured operator API key for protected off-chain administration and the contracts still require multisig authorization.
7. Record the rollback deployment commit and verification evidence in the production handoff package.

Production must never enable either test-admin flag. The release gate fails if a non-multisig wallet can access the Admin Panel.
