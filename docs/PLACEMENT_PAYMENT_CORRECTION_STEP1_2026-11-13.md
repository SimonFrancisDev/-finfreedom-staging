# Placement/Payment Correction: Step 1

## Completed Work

The requested first step is complete: map each proposed position to its original activation, actual payment recipients, proposed parent and future structural effect. No further engineering or release step was executed.

Read-only Polygon mainnet checkpoint: **97257828**, **13 November 2026, 17:49:58 UTC**. Chain ID **137** was verified. The relevant F-Freedom and Freedom Plus implementation addresses still match the saved mainnet baselines. The RPC work used 69 read methods, with no polling service, key, signer or broadcast.

All 19 proposed destination positions remain empty. Sabina remains in ID1's F-Freedom level-8 slot 3 and level-9 slot 2. No new Freedom Plus core events occurred between the previous audit block 97254886 and this checkpoint.

## Findings

| Proposed change | Payment mapping | Decision at this step |
| --- | --- | --- |
| 16 Freedom Plus positions in ID1 levels 1-3 | Existing receipts support both the ID1 components paid to the eight founders and the payments to the corresponding parents. Each parent already has the participant in its own orbit. | Payment mapping passes. No new ordinary-user orbit entry or repeat payment is required by these rows. This is not yet repair/deployment approval. |
| Sofia, F-Freedom level 9: ID1 slot 3 | The original 2,304-USDT founder payout matches the payment destinations for an ID1 first-ring placement. | Payment mapping matches, but slot 3 is the selected alternative branch rather than her original chronological slot 2. Its future branch rights must remain explicit. |
| Sofia, F-Freedom level 8: ID1 slot 6 under Sabina, plus Sabina's own slot 1 | The original activation paid 1,152 USDT to founders and 0 to Sabina. The proposed relationship would ordinarily imply a 40% component to Sabina and 50% to founders. | One relationship exception, represented by two positions. It does not satisfy the requirement that every ordinary-looking paid placement be backed by the matching historical payment. Hold this part for decision. |

The level-8 comparison is **not a newly discovered unpaid debt**. Sabina was inactive when Sofia activated on 1 November. The proposed new relationship did not exist then. The previously authorized alternative deliberately created a zero-money ancestry link; local tests proved that behavior, not that Sabina had received a historical payment.

The hypothetical 40% amount is 512 USDT. It is not authority to pay Sabina, to pay another person, to recover money from founders, or to alter earnings. The two level-8 positions do not imply two 512-USDT amounts. **No compensation is authorized or included.**

This identifies a conflict between the existing alternative repair policy and the newly emphasized requirement to avoid positions that imply unmatched payments. It must not be concealed by relabeling the entry or claiming an original transfer that did not happen.

## Preserved Boundaries

- No production writes, deployments, proposals, approvals, transfers, resets or hosted service changes.
- No business contract, frontend or backend implementation was changed in this step.
- Historical payments and permanent sponsors remain unchanged.
- Historical level-6 duplicates remain deferred.
- The earlier package's level-1/3/7 counter-only adjustments are not new user placements and are outside this position/payment mapping exercise.
- Empty-slot checks are not a replacement for guarded full-state validation before any execution.

## Evidence

- [Full correction table with all wallets, original dates, transactions and payment recipients](evidence/placement-payment-correction-table-2026-11-13.md).
- [Machine-readable 19-position table](evidence/placement-payment-correction-table-2026-11-13.json).
- [Read-only mainnet proof, original F-Freedom receipts and slot checks](evidence/placement-payment-read-only-proof-2026-11-13.json).
- Generator: `smart-contract/scripts/buildPlacementPaymentCorrectionTable.js`.

Reproduction from `staging-environment/smart-contract`:

```powershell
node scripts/buildPlacementPaymentCorrectionTable.js --offline
```

The offline run uses cached evidence and sends no RPC requests. A negative control removed the original USDT transfer evidence; the table correctly refused to validate. Receipt sums, founder components, existing parent payments and original transaction hashes are checked by assertions.

## Next Decision

Keep the payment-backed Freedom Plus rows separate from the exceptional F-Freedom level-8 arrangement. Resolve how that one relationship should be handled under the user's payment/placement requirement before resuming engineering. Do not present all 19 positions as the same kind of historical restoration. No next-stage execution has occurred.

## Subsequent User Decision

After this read-only checkpoint, the user explicitly confirmed Sabina accepts
the one-time level-8 exception and authorized engineering to resume. The hold
described above records the earlier decision point; it is not an outstanding
request to reconfirm that exception. No compensation is authorized. The normal
skip/frozen-ancestry rule remains unchanged outside the specified repair.

The subsequent founders' clarification distinguishes genuine structural
placements from additional exhausted-ancestry payments to ID1. Preserve the
required positions; do not manufacture duplicate ID1 slots for those extra
payments. Implementation validation is recorded separately from this historical
mapping and from any eventual mainnet execution.
