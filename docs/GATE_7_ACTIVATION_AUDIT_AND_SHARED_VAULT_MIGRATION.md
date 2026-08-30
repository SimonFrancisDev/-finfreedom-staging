# Gate 7: Activation Audit and Shared Vault Migration

## Certified activations

F-Freedom Level 1 transaction `0xa8d0b4a8a9533d4a83327b60bb337caf619b54c39c079790b02ac588ed5399f7` at block `46247316` activated `0x296238e950ef0066D2119230Bf0eb3aDEBc94882` for 10 USDT. It distributed 9 USDT, charged 1 USDT, allocated 0.8 USDT to NFT and 0.2 USDT to operations, created 10 FGT reward eligibility, and placed P4 position 1 in cycle 1 under system ID 1. Activation, receipt, financial, and orbit projections were present and consistent.

Freedom-Plus Level 1 transaction `0x6d6757a82ee026f74fa8f1cfc3650e4163a62780bbf7d01293b4ed276c61c04e` at block `46247672` registered the same wallet as participant 6 for 50 USDT. It distributed 45 USDT, charged 5 USDT, allocated 4 USDT to NFT and 1 USDT to operations, minted 50 FPT, placed canonical P39 position 5 under ID 1, and routed position 1 under the direct owner. Raw events, three payments, two ledger entries, and both positions were present and consistent.

## Combined indexed truth

- Generated volume: 60 USDT
- Wallet distributions: 54 USDT
- System charges: 6 USDT
- NFT allocations: 4.8 USDT
- Operations allocations: 1.2 USDT
- Paid activations: 2

The community read service combines F-Freedom activation summaries and receipts with Freedom-Plus settlement events, payments, and system-charge ledger entries. It does not double-count Freedom-Plus payments as F-Freedom receipts.

## Shared-vault migration

The fresh F-Freedom deployment initially used NFT vault `0xc904eF570314e7Ef1A63690F241914E012A1Ad11` and operations vault `0x196b2a9279A2415BA5273fDDC92E96b493B95E7B`. The approved shared pair is NFT vault `0x6e127653D5c2032442fa7832b70967fbc13690aE` and operations vault `0x33D5B37Cc4Dfb1EC91dAC000ee0c412ed523b746`.

- Multisig proposal ID: 15
- Proposal: `0x2719894bf48f29da80cf0e70ce6701a58478b259edfec54328c778434e82a5a1`
- First approval: `0xc05fb2fde15d51b36c6ed03719d85fc3c43d3b4d540da764b5122666a4e632ae`
- Second approval: `0x137646cf35ef5a2587c7f22a7f3d6732d28a9b521d966a4b81f97baab869a815`
- Execution: `0x22f05888d14622af8001e0c7b302a8190084fa92733ceeaf594f9573404f72ad`
- Target: F-Freedom LevelManager `0xa7c22d68C7187d05769e1a2FE61874940e0efD2a`
- Call: `updateChargeRecipients(sharedNftPool, sharedOperations)`

Post-execution verification returned the shared pair from `nftPool()` and `operationsWallet()`. Future system charges from both programs now use that pair.

The historical 0.8 USDT and 0.2 USDT remain in the former F-Freedom vaults. Moving them requires a separate reviewed and approved governance action. Until then, live community treasury balances must aggregate unique current and historical vault addresses.

For this staging deployment set `LEGACY_NFT_POOL_VAULT_ADDRESSES=0xc904eF570314e7Ef1A63690F241914E012A1Ad11` and `LEGACY_OPERATIONS_VAULT_ADDRESSES=0x196b2a9279A2415BA5273fDDC92E96b493B95E7B` on the API service. Use comma-separated values if production ever has more than one retired pair.

## Environment warning

The checked-in/local smart-contract `.env` can be stale relative to Render and the fresh deployment records. Verification commands must explicitly use the certified deployment addresses or first synchronize the local environment. Never accept a `valid` result that points at a previous LevelManager.

## Production requirements

1. Deploy both programs with one approved NFT Pool Vault and one approved Operations Vault.
2. Assert both programs' recipient getters against those addresses before enabling transactions.
3. Certify one activation per program across receipts, events, payments, ledgers, and orbit positions.
4. Reconcile generated volume, user distributions, system charges, and the 80/20 split.
5. Aggregate historical vault balances until a separately governed migration is completed.
6. Preserve deployment, proposal, approval, execution, activation, and verification transaction hashes.
7. Synchronize documented environments and deployment manifests before every verification run.
