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
   - Latest pre-deployment run: 156 passing in 9 minutes on 2026-08-29.
   - Run `npx hardhat run scripts/preflightCleanStagingDeployment.js --network amoy` before deployment; it sends no transaction.
   - The preflight must confirm Amoy chain `80002`, retained mock USDT code/symbol/6 decimals, eight unique founders, ratios totaling `10000`, distinct deployer/multisig/ID1, fresh treasury vault mode, staging manifest output, and nonzero deployer POL.
   - Use a healthy authenticated HTTPS RPC endpoint. The WebSocket endpoint remains for worker indexing and is not a Hardhat deployment transport.
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
## Deployment attempt log

### 2026-08-29 insufficient-gas attempt

The first fresh F-Freedom deployment attempt started from commit `b39eda0` with deployer `0x884e48f9897E8633238747b608DD49dE12bF94df` funded with approximately `0.1891 POL`. It stopped before Registration deployment because the remaining balance could not cover gas. The following incomplete contracts were created and are explicitly rejected from the reset package:

- NFTPoolVault: `0x122Db158984D6d1B0Ddd7784fF40d08B7C3eC058`
- OperationsVault: `0xD9314e2dCeFc40a1ff94BC10DdE641Ab70C19476`
- FGTToken: `0x4C36EB1505D2fBB543Fc18BB85ADb376b08cb920`
- FGTrToken: `0x45CD4e204B66505027115708F922B1bD3B074692`
- AutoUpgradeEscrow: `0x9cf7C5544eAC3F27D40e342d103cD72bb57083De`

No complete manifest was written, no API/worker/frontend address was changed, and the live staging services remain on the previous certified deployment. These addresses must never be mixed into a later manifest. The next attempt must start the entire suite again and the preflight now requires at least `5 POL` so both F-Freedom and Freedom-Plus/NFT can complete without another partial deployment.
### 2026-08-29 RPC-timeout attempt

After funding and a successful preflight at `5.0481856722 POL`, a second complete restart stopped during Registration deployment because the authenticated HTTPS provider returned `UND_ERR_CONNECT_TIMEOUT`. This was a provider transport failure, not a contract revert. No complete manifest was written and no live environment was changed. These incomplete addresses are rejected and must never be used or mixed into the final deployment:

- NFTPoolVault: `0x1C95aF8becfC20871e3F5deC40f690838d305C10`
- OperationsVault: `0xB8168c6Ba11E06d651EcDae8c22a4e334f5236F6`
- FGTToken: `0x8ce83D9459071f3ee9F38db1D7e04d30c562Fa43`
- FGTrToken: `0x11691a6d6DD3D48CFA685c1222cB80722be69792`
- AutoUpgradeEscrow: `0x597Fd6f4b60E98131eEc40f19ae3869fdA5Fd222`

The failed attempt reduced deployer gas funds to approximately `4.8728 POL`, below the enforced `5 POL` restart floor. Do not bypass the floor. Restore funding and confirm stable HTTPS transport before another complete restart.
