# Full Staging Clean-State Reset

Date: 2026-08-29
Status: prepared; not executed

## Objective

Start the complete staging test from a genuinely clean state. This includes F-Freedom, Freedom-Plus, Freedom NFT, profiles, notifications, Tasks, community content, support data, all indexed projections, checkpoints, and uploaded media.

The Polygon Amoy mock USDT contract is retained. Existing program contracts cannot be retained because registrations, activations, placements, token balances, and rewards are permanent on-chain. Clearing MongoDB while retaining those contracts would allow the worker to index the old state again.

## Preserve

- Polygon Amoy chain ID `80002`.
- Mock USDT `0x7b7E39f3D177B3356368431C5C285bca58b43A60` and its staging funding capability.
- Approved operational wallets, source, ABIs, tests, documentation, secrets, RPC credentials, WalletConnect project ID, and admin key.
- Historical deployment manifests and transaction evidence. New manifests are added; old manifests are never overwritten.

## Replace

- The complete F-Freedom suite through `smart-contract/scripts/deployFullSystem.js`, wired to the retained mock USDT.
- The complete Freedom-Plus and Freedom NFT suite through `smart-contract/scripts/deployFreedomPlusStaging.js`, wired to the new F-Freedom gateway.
- Every API, worker, and frontend contract address.
- F-Freedom and Freedom-Plus start blocks, using the earliest block in each new manifest.

## Delete

After backup and address rewiring, drop the complete `finfreedom-staging` MongoDB database. This removes all application content, users, profiles, indexed projections, checkpoints, notifications, Tasks, rewards, support/community records, and GridFS media.

The database operation sends no transaction and cannot alter mock USDT or any contract.

## Required Order

1. Freeze public staging writes and record the maintenance window.
2. Suspend both staging API and worker; a restart is insufficient.
3. Export a timestamped MongoDB backup and collection-count manifest.
4. Record current API, worker, and frontend variables with secrets redacted.
5. Record retained mock USDT address, code, decimals, chain, and funding-wallet balance.
6. Run complete contract tests.
7. Deploy fresh F-Freedom contracts and save a new manifest.
8. Verify ownership, guardian, ID1, founders, vault recipients, USDT wiring, token operators, orbit links, and blocks.
9. Deploy fresh Freedom-Plus/NFT contracts against the new F-Freedom gateway and save a new manifest.
10. Run both deployment validators and verify code at every address.
11. Update API and worker addresses/start blocks. Keep API indexing disabled and WebSocket indexing enabled only on worker.
12. Update frontend addresses while leaving `VITE_USDT_ADDRESS` unchanged.
13. Run the reset command without confirmation and archive its inventory.
14. Reconcile inventory against the backup manifest.
15. Execute the guarded database drop.
16. Start worker first and confirm listeners use only new contracts.
17. Start API and confirm contract verification uses only new addresses and indexing is disabled.
18. Deploy frontend and reconcile its contract directory with API and worker.
19. Re-seed only explicitly approved baseline content. Never restore test users or projections.
20. Complete clean-state certification.

## Reset Command

From `backend`, dry run:

```powershell
npm run reset:staging:full
```

Execution requires every guard:

```powershell
$env:API_AND_WORKER_SUSPENDED='true'
$env:CONFIRM_FULL_STAGING_RESET='finfreedom-staging:80002:DROP'
npm run reset:staging:full
```

Do not store confirmation variables permanently in Render. Execute from a controlled operator environment only after both services are suspended.

## Clean-State Certification

1. MongoDB contains only startup-created collections and approved seeds.
2. No previous wallet is registered in either program.
3. No previous level, orbit, payment, ledger, NFT, reward, notification, profile, task, comment, or media record appears.
4. Reconciliation reports only new addresses and start blocks.
5. Worker logs show new WebSocket listeners, no recurring poller, and no superseded address.
6. API logs show indexing disabled and every new contract verified.
7. Frontend addresses match API/worker exactly; mock USDT is unchanged.
8. Only required ID1/genesis representatives exist after deployment.
9. A new wallet can start F-Freedom from registration and proceed sequentially.
10. It can then enter Freedom-Plus through its permanent sponsor and progress sequentially.
11. New events index once, UI state converges, and no old record returns after refresh.

## Rollback Boundary

Restore the database backup only together with its matching old API/worker/frontend address set. Blockchain deployments cannot be rolled back. Never combine an old projection database with new addresses, or a new empty database with old start blocks unless intentionally replaying that old deployment.