# LevelManager Audit Notes

## Contract Role

`LevelManager` controls the F-Freedom Program activation flow.

It handles:

- manual level activation
- auto-upgrade activation
- founder representative free activation
- USDT payment intake
- system charge distribution
- NFT pool allocation
- operations wallet allocation
- orbit insertion
- owner/spillover/recycle routing
- auto-upgrade escrow locking
- payout receipt recording
- token controller hooks
- UUPS upgrade authorization

---

## Upgradeability

The contract uses UUPS upgradeability.

Upgrade authorization requires:

1. owner authorization
2. guardian validation through `IGuardian.validateUpgrade`
3. the new implementation must be a deployed contract

New storage variables must be added before `__gap` and must reduce the gap accordingly.

Existing storage variables must not be reordered.

---

## Founder Representative Rule

Founder representatives are privileged wallets configured by the owner.

Rules:

- Maximum founder representatives: 4 wallets total.
- Founder representatives may be added gradually until the total reaches 4.
- Founder representatives cannot be removed once added.
- Duplicate founder representatives revert.
- Each founder representative can activate Level 1 through Level 10 for free once.
- Founder representatives must still activate levels sequentially.
- Founder representative activation amount is `0`.
- Founder representative activation does not create payout receipts because no USDT is routed.
- Founder representative activation emits:
  - `FounderRepActivated`
  - `ActivationFinancialSummaryRecorded`
  - `LevelActivated(user, level, 0)`

---

## Payment Flow

Normal activation pulls USDT from the activating user into `LevelManager`.

The activation amount is processed through:

- system charge
- orbit owner payout
- routed spillover payout
- escrow lock
- recycle allocation
- NFT pool share
- operations share

The contract uses `SafeERC20` for token transfers.

---

## System Charge

For each normal activation:

- 10% of the activation amount is treated as system charge.
- 80% of system charge is sent to the NFT pool.
- 20% of system charge is sent to operations.

The event `SystemChargeDistributed` records the NFT pool and operations split.

---

## Receipt Model

The contract records two receipt types:

1. `PayoutReceipt`
2. `DetailedPayoutReceipt`

`DetailedPayoutReceiptRecorded` is the preferred event for backend/indexer financial truth.

Important fields:

- `grossAmount`: value generated for the receiver
- `escrowLocked`: value routed into auto-upgrade escrow
- `liquidPaid`: value actually credited to the wallet

Frontend and backend should not assume:

```txt
wallet credited = gross amount