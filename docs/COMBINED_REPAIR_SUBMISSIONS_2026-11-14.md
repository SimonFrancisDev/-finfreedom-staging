# Combined repair: all replacement proposals submitted

## Current status

All **67 replacement proposals, IDs 190-256**, were submitted successfully to
the existing Polygon mainnet multisig. No approval or execution was performed.
The live placement repair is therefore **not active yet**.

- Chain: **Polygon mainnet, 137**.
- Governance: `0x785cC854ce9e13CE1140cbFD7C08620713E1711d`.
- Submitter: `0x884e48f9897E8633238747b608DD49dE12bF94df`.
- Funded starting balance: **29.252708558777793934 POL**.
- Actual submission fees: **10.40481878820223469 POL**.
- Remaining balance: **18.847889770575559244 POL**.
- Sender nonces: **364-430**, one successful transaction per proposal.
- Additional deployments: **zero**. No failed or duplicate submission was sent.
- Native value attached to each proposal and submission: **zero**.

Funding is no longer blocking submission. Founders' separate approval and
execution transactions still require gas in their own signing wallets.

## Verification before submission

The guarded F-Freedom and Freedom Plus repair states, proxy bindings, owners,
Guardian and implementation hashes matched the approved package at block
**97307761**, hash
`0xda012bab15b6bd10fbb827f4672c31c5dda21a9ee8d197406f4cc320fe5891a0`,
2026-11-14 **14:38:31 UTC**. The previously deployed executors were unexecuted.
The multisig's owners, three-approval requirement and 120-second timelock matched
the reviewed configuration. The queue contained 190 proposals and the submitter's
next nonce was 364 before this run.

Fresh gas estimates forecast 10.55134062445007692 POL, with a capped reserve of
14.963960363238949968 POL. The runner used a 25-gwei priority fee and refreshed
base-fee headroom before each transaction, always retaining the 450-gwei ceiling.
Actual fees were below that estimate; unused POL remains in the wallet.

At **14:38:08 UTC**, direct HTTPS reads of the official page and its referenced
bundle confirmed all 67 exact proposal targets and payloads were still served.
A local browser DNS lookup had failed; the direct HTTPS check succeeded, so this
was not treated as evidence that the production site was down. No application
JavaScript, wallet connection, private API or RPC was invoked by that page check.

## Submission safeguards

`submitCombinedPlacementRepair.js` validates the existing package against the
rehearsed input records. It cannot rebuild the deployed addresses around a new
nonce or silently change a target or repair payload. Each signed transaction is
journaled locally before broadcast; the receipt and on-chain proposal are then
matched to the expected target, zero value and exact calldata before continuing.

The runner only calls the multisig's `submitTransaction`. It sends no deployment,
approval, execution, token transfer, pause, upgrade or reopening call directly.
Nine focused deployment, submission and fee tests passed, covering wrong chains,
wrong senders/nonces, substituted calldata, direct execute/approve calls, value
transfers, gas limits and fee ceilings. No Solidity source was changed.

The sensitive local journal is not committed. The public record contains only
proposal IDs, targets, calldata hashes, transaction hashes, receipt fees and state.

## Founder execution order

See [the full founder instructions](FOUNDERS_COMBINED_REPAIR_EXECUTION_2026-11-14.md)
for each proposal's meaning, target, execution order and stop conditions.

| IDs | Phase | Execution condition |
| --- | --- | --- |
| 160-189 | Existing cancellations of withdrawn 130-159 | Complete before replacement maintenance; do not resubmit them |
| 190-203 | Approve reviewed implementation permissions | After withdrawn originals are cancelled |
| 204-215 | Pause affected program contracts | Start the agreed maintenance window |
| 216-223 | Install bound temporary repair implementations | All twelve affected contracts paused and current repair prestate checked |
| 224-225 | Execute the two historical repairs | Temporary implementations correctly installed |
| 226-236 | Install final code / restore normal engines | Both historical repairs verified |
| 237-244 | Revoke temporary implementation permissions | Final implementations installed |
| 245-256 | Reopen | **Hold approval and execution until post-repair chain/backend/UI reconciliation passes** |

Submitting every phase together does not mean executing every phase immediately.
The repair's own state hashes are a final fail-closed guard, not permission to
ignore state changes while users remain active. Recheck the prestate during the
maintenance pause before installing the temporary implementations.

## Evidence and unchanged scope

- [Fresh submission preflight](evidence/combined-repair-submission-preflight-2026-11-14.json).
- [Official served package verification](evidence/combined-repair-served-manifest-2026-11-14.json).
- [All live proposal IDs and transaction evidence](evidence/combined-repair-live-proposals-2026-11-14.json).
- [Previously completed deployment record](COMBINED_REPAIR_LIVE_DEPLOYMENTS_2026-11-14.md).

Backend repair handlers, synchronized ABIs and the production founder manifest
were already deployed. No Render/Vercel environment changes or additional
application deployments were made in this pass. Neither suspended staging
service was started. Unrelated local changes were left untouched.

The agreed repair remains: preserve Lady Sabina's positions; restore Sofia at
the accepted level-8/9 locations; restore the reviewed Freedom Plus appearances;
install the preventive fixes; do not pay compensation, modify permanent
sponsors, change NFT rules, reset production or rearrange the deferred level-6
history. Post-execution certification remains outstanding until founders execute
the maintenance and the recorded verification gates pass.
