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
## Certified fresh deployment candidate

Deployment date: 2026-08-29
Source commit recorded by manifests: `8964ed41180bb20c51c5dc40d788c6dbcf13901a`
Retained mock USDT: `0x7b7E39f3D177B3356368431C5C285bca58b43A60`

### F-Freedom

Manifest: `smart-contract/deployments-staging/deployment-1788027951360.json`
Earliest deployment block: `46209364`
Final deployment block: `46209511`

- Registration: `0x83029F37Ac4BAA2CB29d4f0195149B6575bd403B`
- LevelManager: `0xa7c22d68C7187d05769e1a2FE61874940e0efD2a`
- SettlementRouter: `0x9e9cbbAD963FAC89489a1c39af658667DAbcA6ea`
- Escrow: `0x3E5D970eA8B660f0501bE655AC5190EA57db4605`
- P4/P12/P39: `0x7CcF2e0a2007E3586409EB64dEaF42139650acE0`, `0x2F4445740bA54515377659059Ba23406aB8d5AeE`, `0xCc798Be34E2A04f19F348E40588Ce5310380dd61`
- FGT/FGTr: `0x53a11f9c333Cf8f94E3A9Bd642dcf5168E7280E0`, `0x70bF7a6669BDB53304B29C0A96DACEce02107eA5`
- TokenController: `0xd08c1E893136f25B8a1d70E5CB2820935e1ca8C4`
- NFTPoolVault/OperationsVault: `0xc904eF570314e7Ef1A63690F241914E012A1Ad11`, `0x196b2a9279A2415BA5273fDDC92E96b493B95E7B`

The fresh-deployment validator passed contract code, owners, ID1, core links, vaults, and all orbit links. Fresh F-Freedom has zero ordinary registrations and only the configured ID1 participant baseline.

### Freedom-Plus and Freedom NFT

Manifest: `smart-contract/deployments-freedom-plus-staging/deployment-1788028241010.json`
Earliest deployment block: `46209562`
Final deployment block: `46209801`

- Registration: `0xB23B64dB6c3Be53B532d611d0f66DC63e2A68655`
- LevelManager: `0x9dF6E3b6F37e67e6A0215683303a5cfFe9b1f177`
- SettlementRouter: `0x3adaF66Fbc5CC5349969172241Fa6Fe4156d2aCA`
- P39/P14/P12/P6/P4/P3: `0x02AB9B7193F650c4D907dE3D7ff414b6c3b010B6`, `0xAC3E6EA4Afbf38b68d84d21E20502d411b78e29f`, `0xcbf655ecF02e8c33653703977ff475419c4F408A`, `0x05230009744Ac8503E677Fb5b597e90132d84036`, `0x0a415f92d1b39677Bddf8CF39201A0b92cEF5e0A`, `0x43E94991f420c59768656d83678A994dd939a9Ae`
- FPT/FPTr: `0x46aBAa6a3888C95E73Be457cF69f6Ef834D8d08F`, `0xb7FA7909e62Db676BD83189d5b932683060444A5`
- TokenController: `0x904adac4E8190eE8c1740750791aF494bA94797b`
- NFT Membership/Reward Distributor: `0x55186FF9369a5D6245e41276d4C892ED06a6e43d`, `0x437A7BB9f05A19F6b095CD0038ebC77cFbF983df`
- NFTPoolVault/OperationsVault: `0x6e127653D5c2032442fa7832b70967fbc13690aE`, `0x33D5B37Cc4Dfb1EC91dAC000ee0c412ed523b746`

The Freedom-Plus validator passed all proxy implementations, multisig ownership, gateway links, locked configuration, token operators, vault/distributor links, orbit topology, and five genesis identities with all seven levels active.

### Required governance action before cutover

The new FGT is multisig-owned, so the deployer correctly could not authorize NFT Membership. Before environment cutover, multisig `0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A` must execute exactly:

- Target: `0x53a11f9c333Cf8f94E3A9Bd642dcf5168E7280E0`
- Function: `setAuthorizedOperator(address,bool)`
- Arguments: `0x55186FF9369a5D6245e41276d4C892ED06a6e43d`, `true`
- Purpose: allow Freedom NFT Membership to lock and unlock qualifying FGT.

Cutover remains blocked until `authorizedOperators(0x55186FF9369a5D6245e41276d4C892ED06a6e43d)` returns `true` on the new FGT.
