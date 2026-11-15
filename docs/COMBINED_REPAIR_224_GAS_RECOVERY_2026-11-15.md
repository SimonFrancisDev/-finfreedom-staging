# Proposal 224 gas-estimation recovery

> SUPERSEDED: the retry instruction and 50-million-gas workaround in this record
> were incorrect. Polygon has a separate 32-million per-transaction cap; the
> successful ~44.1-million eth_call was not an admissible signed transaction.
> Do not retry 224 or proceed to dependent proposals. See
> `COMBINED_REPAIR_224_TRANSACTION_CAP_HOLD_2026-11-15.md` for the production hold
> and correction. This record is retained as an audit trail, not execution advice.

## Verified production release

The official production frontend received commit `7c919d9` in
`SimonFrancisDev/ffn-frontend`, branch `main`. Vercel production deployment
`dpl_BGNZbPM6NL1iZYv84shySBSA5Jig` is Ready and assigned to
`www.finfreedomnetwork.io` and `finfreedomnetwork.io`.

The official `/admin` page returned HTTP 200 and served
`/assets/index-D4BXX5hI.js`. The served bundle contains the proposal-224-only
simulation and mainnet safeguards, the exact reviewed calldata hash, and the
production API endpoint. No environment variables or service settings changed.
Unrelated local Community/overlay edits were excluded from the commit/release.

## Diagnosis and validation

The reported wallet-safety wording is also the site's generic preflight error.
Polygon mainnet simulations at block 97359275 succeeded for the exact outer
`executeTransaction(224)` call with a 50,000,000 gas ceiling; calls at 30, 35 and
40 million reverted. Estimation failed even with an explicit 50-million ceiling.
The successful trace used 44,094,863 gas and had no failed nested call. This
does not establish the provider's internal estimation failure cause.

The frontend exception is restricted to proposal 224 on governance
`0x785cC854ce9e13CE1140cbFD7C08620713E1711d`, chain 137, exact verified payload
and live runtime code. It checks owner, current quorum/timelock, current fees,
block gas capacity, signer balance and a successful full simulation as the
actual signer. It does not disable wallet warnings or any contract guard.

The exact new helper passed a live read-only call using a VoidSigner (incapable
of signing), with a fee reservation of 19.8306070057 POL at that check. This is
not a fixed charge or a current guaranteed quote. A founder needs enough POL
for the wallet's maximum fee reservation; actual fees depend on gas consumed.
All 33 focused governance tests passed. The local production build and Vercel's
clean Git-based production build passed. No transaction was signed or broadcast
by this diagnostic/frontend work.

## Final chain checkpoint

Polygon mainnet block **97360288**, **2026-11-15 12:31:41 UTC**.
Block hash:
`0xcb757dac5c807eb968fcee0ef5fd3cdc811a156f91df75724e62cb273150166d`.

- Proposal 224: three confirmations, unexecuted, not cancelled.
- Proposal 225: three confirmations, unexecuted, not cancelled.
- All twelve affected maintenance targets remain paused.
- This frontend release has not executed the historical repairs.

## Immediate next step

Refresh `https://www.finfreedomnetwork.io/admin`. A funded existing founder
wallet on Polygon should select **224**, review the fee, and execute it once.
Existing approvals remain valid; no replacement proposal is needed.

Report the transaction hash and **stop for the 224 result check before 225**.
Keep later proposals, especially reopening 245-256, on hold until their recorded
verification gates pass. If simulation still fails or a separate wallet-security
warning appears, stop and provide its exact wording and the public signer
address. Never disable security warnings or share private keys.

This work did not restart either suspended staging service or change contracts,
proposal contents, placements, payments, production secrets, RPCs or databases.
