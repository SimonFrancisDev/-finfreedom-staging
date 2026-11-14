# Combined repair: actual POL fees and remaining budget

## Decision

Another 30 POL is not a fixed requirement. The available 11.681034136955361768
POL does not cover the complete remaining package at the audited fees. A 15 POL
top-up covers the measured lower-tip budget with headroom at this snapshot.
This supersedes the earlier 25 POL recommendation; it is not a guarantee of
future gas prices or confirmation speed. Requote immediately before broadcasting.

## Source and scope

- Polygon mainnet, chain ID 137. No Amoy data was used.
- Submitter: `0x884e48f9897E8633238747b608DD49dE12bF94df`.
- Snapshot: block **97291493**, 2026-11-14 **07:51:49 UTC**.
- Block hash: `0xb957ce016749175ca69df89b421f10158a94fe87c62c0dda38a3d6dfb0bf7cdc`.
- Read-only RPC audit: no signing, broadcasting, POL transfer or hosted change.
- [Public evidence](evidence/combined-repair-gas-audit-2026-11-14.json) includes
  all 70 historical transaction hashes, fees and the 78 remaining estimates.
  Private keys, RPC credentials and signed transaction journals are excluded.

## Where the previous funding went

| Completed activity | Transactions | Actual fee, POL |
| --- | ---: | ---: |
| Original deployments | 10 | 9.866650686028271883 |
| Original proposals 130-159 | 30 | 6.749414347365938823 |
| Cancellation proposals 160-189 | 30 | 1.891320179260472094 |
| **Total** | **70** | **18.5073852126546828** |

Balance immediately before the original deployments was
**30.188419349610044568 POL**. Subtracting the verified fees leaves exactly
**11.681034136955361768 POL**, matching the current on-chain balance.
All 70 receipts succeeded; all transaction values were zero. The expense is
gas, not a transfer of POL to another wallet. Sender nonces 283-352 are contiguous,
and the next pending nonce is 353, so no intervening outgoing nonce was omitted.

The earlier recorded balance was 0.688419349610044568 POL at block 97199033.
The subsequent net funding before block 97199811 was 29.5 POL, with no outgoing
nonce change in that interval. This records the net on-chain balance change;
it does not infer exchange fees or identify why a nominal 30 POL transfer might
differ from it.

## Remaining cost, not an arbitrary funding target

The remaining package contains **11 inert deployments and 67 proposal
submissions**. Five earlier implementations are reused. The 30 cancellation
submissions are already paid for and are not included again.

Fresh estimates total **66,044,201 gas**. Adding 20% to each gas limit, rounding
up, gives **79,253,072 gas**. All deployment creation hashes match the prepared
package; governance runtime, queue count and submitter nonce match the audited
preparation. Estimation does not execute the repair.

| Fee scenario | Total POL | Extra POL above current balance |
| --- | ---: | ---: |
| Current base fee + 25-gwei tip, estimated gas | 18.532893357579643657 | 6.851859220624281889 |
| Current base fee + observed 78-gwei median tip, estimated gas | 22.033236010579643657 | 10.352201873624281889 |
| 25-gwei tip, 20% base-fee and gas-limit headroom | 26.291111446436616848 | 14.61007730948125508 |

The base fee was **255.613484257 gwei**. The current balance would cover the
raw gas estimate only at an average effective price no greater than
**176.866915794 gwei**, below that base fee alone. Lowering the tip cannot make
11.681 POL sufficient at this snapshot. It could suffice if network fees fall.

The headroom row is a reserve, not an amount that must be spent. Unspent POL
remains in the submitter wallet. The 25-gwei scenario can confirm more slowly
than the observed median-tip transactions. The separate 450-gwei ceiling stays
in place; this is not permission to use that ceiling unnecessarily.

Proposal submissions themselves cost gas because governance stores their
calldata. In particular, the two repair payloads are 76,452 and 7,428 bytes.
Their storage cost must not be omitted from the deployment budget.

**Founders' later confirmation and execution fees are separate and excluded.**
Cancellation submissions are mined, not thereby executed. The 15 POL top-up
does not fund every founder's wallet or finish the maintenance automatically.

## Preparation changes and validation

`repairFeeBudget.js` now distinguishes estimated expenditure from capped reserve.
The read-only preparation script defaults to the reviewed 25-gwei tip, gives the
current base fee 20% headroom, and retains the 450-gwei ceiling. Its quote uses a
fresh block after gas estimation, not the older preflight block.

Nine focused tests passed: five fee-budget tests and four combined-package
tests. They cover the audited arithmetic, lower fees, fee increases, a cap below
the required fee, invalid inputs, immutable repair payloads and governance
ordering. No Solidity code, placement, payment, NFT rule or hosted variable was
changed by this audit.

## What is already ready and what remains

The [production integration release](COMBINED_REPAIR_PRODUCTION_READINESS_2026-11-13.md)
records the deployed backend/worker handlers, synchronized ABIs and founder UI.
The combined governance fork rehearsal and guarded repair preflight passed as
documented there. These results do not mean the live repair is executed.

Before replacement submission:

1. Refresh fees, pending nonce, governance permissions and guarded repair state;
   prepare the final unsigned package against current state and adequate funds.
2. Deploy the 11 inert contracts, verify runtime/constructor bindings and retain
   a resumable transaction journal. Do not change live proxies at this stage.
3. Populate and publish the frontend's currently empty verified-deployment
   manifest using the actual deployments, not only predicted addresses.
4. Submit all 67 replacement proposals, then publish their real IDs and the
   required cancellation, approval, maintenance and reopening execution order.

The earlier unsigned package's November 13 budget remains a historical quote;
it must be regenerated by the updated preparation script before use. Do not
broadcast the withdrawn original package. Do not begin partial deployments
merely because the wallet can afford a subset of the remaining work.

No production reset, compensation transfer, historical level-6 rearrangement,
permanent-sponsor change or staging-service restart is included.
