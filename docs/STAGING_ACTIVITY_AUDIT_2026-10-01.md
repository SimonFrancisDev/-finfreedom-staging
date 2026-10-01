# Staging activity audit - October 1, 2026

## Scope and limitations

Read-only Amoy audit. No transactions, upgrades, replay, database changes or
production changes were executed. Evidence was exported from finfreedom-staging.
Recent means October 1 at 00:00 UTC through the latest indexed event at 14:59:28
UTC, block 49044343. This includes automated certification wallets and testers;
all USDT amounts below are mock USDT, not mainnet funds.

All 180 distinct indexed transaction hashes selected from today's Plus events
and F-Freedom activation summaries were fetched from Amoy. All receipts succeeded.
This selection cannot detect failed transactions, unsubmitted wallet attempts,
missing index events, or every UI issue. It is not an exhaustive security audit.

## Confirmed findings

1. HIGH: Freedom-Plus ID1 payments are not split in the audited receipts.
   42 router-to-ID1 transfers total 145,822.50 mock USDT. No outgoing ID1 USDT
   transfers occur in these receipts. This is incoming volume, NOT a current
   balance or a claim that no later separate payout exists. Reconcile all affected
   transfers and separately executed payouts before any financial correction.
   Future routing requires the founder-split implementation and eight correct
   payout wallets; already received money requires separately authorized handling.
2. CONFIGURATION GAP: F-Freedom NFT charges go to
   0x42819C37a22E5d9432B33fc8378e1B489D246cC2, whereas Plus charges go to
   0xF8a4F62fd253Aa2A036209F948Eec53810576fE7. They are not a shared destination
   in these receipts. Verify intended integration and vault ownership before
   changing configuration or moving funds. No conclusion about fund loss.
3. VERIFICATION GAP: All 16 Plus checkpoints remained at block 49044354, last
   synced 14:59:46 UTC, including a second read at 15:30:33 UTC. Live chain head
   at 15:27:07 UTC was 49046003, 1,649 blocks ahead. This does not itself prove
   missing events or a stopped worker; checkpoint semantics must be considered.
   Attempts to read that bounded log tail returned HTTP 400. Newer activity is
   NOT certified. Do not interpret the failed tail response as zero events.
4. VERIFICATION GAP: No payout/period events were found for the reward distributor
   in the captured index, and the reward snapshot collection is empty. Automatic
   monthly distribution, cutoff completeness and restart recovery are not proven.
   No claim that a payment was due or failed follows from this absence alone.

## Checks completed

- 50 F-Freedom activation summaries, including two auto-upgrades: all matched
  receipt arguments; system-charge arithmetic passed for all 50.
- 113 Plus paid activation prices and 113 FPT issuance amounts match the source
  level schedule (50 USDT, multiplied by three per successive level).
- 283 Plus payment components match both percentage arithmetic and actual USDT
  transfers. Correct arithmetic does not excuse the ID1 recipient policy defect.
- 118 Plus system-charge events match 10% total: 8% NFT and 2% operations.
- 1,655 recent Plus indexed events matched receipt identity/block evidence.
  Decodable named arguments matched. Generic Transfer signatures were ambiguous
  in the combined ABI and are not certified by that generic argument comparison;
  mock-USDT transfers were decoded independently for payment checks.
- All 297 captured Plus positions (including genesis) have the expected ring and
  structural parent for their slot. No duplicate slot keys, missing corresponding
  indexed PositionRecorded entries, or participant/amount mismatches were found.
  Sponsor selection, eligibility at each historical block and UI rendering still
  require separate checks; topology consistency alone does not prove those rules.
- 11 Plus completed recycles each have a matching full-price reserve record.
  This does not certify every partial reserve or every missing-event scenario.
- Three NFT mints and six tier changes meet exact combined FGT+FPT thresholds:
  5,700 foundational, 18,700 intermediate, 62,000 advanced.
- Four indexed qualification unlocks were observed, including a 5,000 FGT unlock
  for certification wallet 0x8844a10391801d5b1a4273588F8c6bF1DFE06E36.
  This is not evidence of a successful unlock by Sabina's different wallet.

## Accounting exception review

Four F-Freedom summaries initially failed a simplistic charge+liquid+escrow
equals activation-price check. Receipts explain them with reserves held and later
released: 20 USDT at activation 280, 10 at 282, and funded recycle payouts at 283
and 285. Do not add totalRecycleAllocated to every summary: it can overlap with
recycleLiquidPaid. These are NOT confirmed missing-money findings.

## Concrete latest payment

Transaction 0xfee7da77f2990fa8d91be10d4f1d9ed5e0af134056ebf003687397ed19637450
at block 49044343 charged wallet 0xdCB1dd031BdcBD18d55b8Da513015CC94dD04af4
50 mock USDT for Plus Level 1. Transfers: 10 to 0x3a596f67585F27cfD7F449FeC0a92b7bf34B1df5,
10 to representative 0xf72873d6233B5e3dfbA6D1D8058BF90E990902f0,
25 to ID1 0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A,
4 to the Plus NFT vault and 1 to operations. 50 FPT was minted.
The 25 USDT founder component was not divided among eight wallets in that receipt.

## Next actions, in order

1. Restore/prove index freshness and compare the bounded missing tail, without a
   blind full replay. Reconcile any additional transactions discovered.
2. Deploy/configure and test the founder split in staging. Inventory historical
   receipts and separate ID1 outflows before proposing any reimbursement.
3. Resolve shared NFT funding configuration and demonstrate scheduled rewards,
   including empty-tier retention and idempotent payment recovery.
4. Validate historical eligibility/spillover choice, partial reserve balances,
   and both programs' UI projections. Reproduce failed-wallet/UI reports with
   exact addresses and transaction hashes; do not infer failures from success logs.

## Evidence files

Generated JSON in smart-contract/test-reports/: staging-activity-evidence,
staging-activity-receipts, staging-activity-analysis, staging-topology-analysis,
staging-receipt-reconciliation and staging-final-checks, each suffixed
-2026-10-01.json. Intermediate topology ffBalanceErrors are investigated exceptions,
not final confirmed defects; use the accounting explanation above.

No production readiness certification, fix, commit or push is implied by this audit.
