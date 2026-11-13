# ID1 alternative repair: preserve Sabina's positions

## Scope and authorization

User approved implementation of the alternative after the financial consequences
were explained. This is a one-time remedial arrangement, not a reconstruction of
the original chronological placement. No additional payment or compensation is
authorized. Sofia and the founders must understand the changed branch rights;
technical validation does not establish agreement on their behalf.

Production network: Polygon mainnet, chain 137. ID1:
`0xCE38722a72c9099D9237897E18B0cfb6D51c4470`.
The source repository is named staging-environment; this does NOT select Amoy.
No suspended staging service may be restarted. No production reset is permitted.

## Required result

| Orbit | Sabina | Sofia |
| --- | --- | --- |
| ID1 F-Freedom level 8 / P12 | Keep position 3 | Add position 6, beneath Sabina |
| Sabina F-Freedom level 8 / P12 | Owner unchanged | Add position 1 as a zero-money ancestry link |
| ID1 F-Freedom level 9 / P39 | Keep position 2 | Add position 3 |

Sofia's level-8 matrix parent becomes Sabina, level-9 matrix parent becomes ID1.
Sabina's matrix parents stay ID1. Permanent referral relationships do not change.
The unrelated original level-8 parent orbit is not edited. Existing ID1 counter
normalization for levels 1, 3 and 7 is retained. Historical level 6 stays deferred.
NFT and Freedom Plus contracts are outside this repair.

Historical USDT payments, earnings, balances, supplies and activations must remain
unchanged. The historical 90% ID1 receipts stay recorded as actual payments, not
rewritten into hypothetical 40/50 splits. Repair events identify the later
structural change. The zero-money ancestry link is not an income receipt.

The future skip rule is unchanged: late upline activation does not move an
existing downline mid-cycle. This specific authorized repair is an exception.
Sofia's level-8 branch is not economically equivalent to the chronological plan.

## Governance constraint and hold

At block 97251006 (2026-11-13 14:59:25 UTC), proposals 130-159 had zero approvals,
none executed and none cancelled. All five old implementations remained active
and unpaused. Refresh this evidence before any live action.

The deployed SimpleMultiSig exposes one target call per proposal and has no
multicall/delegatecall/batch-execution function. `cancelTransaction` is onlySelf:
an external helper cannot cancel proposals or exercise the multisig's ownership.
Do not lower the threshold, add a privileged signer or transfer ownership merely
to reduce the number of proposals. Three UI stages are NOT three on-chain proposals.

Obsolete proposals cannot be erased. They must be withdrawn from the active
signing UI, preserved in an audit/archive view, and formally cancelled through
governance before replacement repair submissions. UI withdrawal alone does not
prevent execution using another interface. Founder execution is still required.
The original package, journal and rehearsal must never be overwritten.

## Delivery gates

- [x] Read-only mainnet inventory and proposal status reviewed.
- [x] Separate alternative plan builder and conflict-rejection regressions added.
- [x] New-plan unit tests and existing regressions passed.
- [x] Fresh pinned mainnet-fork repair, storage and governance rehearsal passed.
- [x] Three post-repair activation/payment probes and the deferred level-6 orbit completion probe passed.
- [x] Production queue withdrawal deployed, with audit history and honest pending-cancellation status.
- [x] Separate unsigned replacement package passed pinned live-state checks.
- [ ] Obsolete proposals cancelled on chain by founders.
- [ ] Replacement contracts deployed and proposals submitted after governance-route confirmation and cancellation.
- [ ] Backend repair-event projection deployed and checked before execution.
- [ ] Maintenance pause, repair, paired upgrades, reconciliation and reopening completed.

No deployment, cancellation, approval, pause or repair execution is implied by a
checked local development item. Record transaction hashes and verification blocks
separately for live actions.

## Validation recorded on November 13

The fork used Polygon mainnet block **97251930**, hash
`0xf3aae2a73e4ca78a41b5cb53f05d1054eaac3162d72d70f83384d609e3d07fd9`,
timestamp **2026-11-13 15:22:31 UTC**. Execution occurred only on the disposable
Hardhat fork (31337), not Amoy and not live mainnet. Local proposal number 160
and all hashes in the rehearsal are simulation records, not live submissions.

All five original proxy implementations were bytecode/storage checked. The
actual multisig on the fork enforced its three confirmations and 120-second
timelock. Repair execution used **24,149,903 gas**, with no token transfers or
approvals. Watched balances, historical earnings, supplies, permanent sponsors,
activation state and completed-cycle archives were unchanged. Wrong callers,
wrong chain/proxy, altered plans, unpaused execution, stale state and repeated
execution were rejected. The alternative positions and matrix parents matched.

Subsequent local activations used synthetic test funds only:

| Probe | Position and payment assertions |
| --- | --- |
| New child under Sofia at L8 | Sofia first-ring slot 1; Sabina second-ring slot 4; Sofia receives 512 USDT and Sabina 640 USDT; no additional ID1 position. |
| New child under Sabina at L8 | Sabina first-ring slot 2; ID1 second-ring slot 9; Sabina receives 512 USDT; Sofia remains ID1 slot 6. |
| New child under Sofia at L9 | Sofia first-ring slot 1; ID1 second-ring slot 6; Sofia receives 512 USDT. |

Each activation's liquid payouts, escrow, recycle allocations and system charge
reconciled to its price. These are future test payments, **not compensation**.
The level-6 orbit-only probe filled 26 remaining positions and calculated two
160-USDT reserve contributions. It was not a wallet-level settlement test and
does not certify historical duplicate ancestry or retrospectively fix payments.

Separate passing suites: six alternative-plan cases, three alternative-package
cases, two storage-cache cases, eight original-plan cases, five original-package
cases, three governance cancellation cases, eight canonical behavior/model
cases and three frontend policy cases. The frontend build also passed. The
canonical model includes general P12/P39 cycle ledgers; this is not a claim that
every possible future cycle of this specific repaired mainnet state was tested.

The unsigned replacement package was checked against live mainnet block
**97253894**, hash
`0x362fe905e44289b978a68d7bd8c6a77907c71e448e573abe2fa46830f84955a2`,
timestamp **2026-11-13 16:11:37 UTC**. All old payloads matched, none were executed,
and all thirty remained uncancelled. Its status is
`validated-unsigned-blocked-by-old-proposals`. Predictions are not deployments.
The existing five preventive implementations can be reused; the new plan needs
a new executor and four newly bound migrators. Refresh nonce, code bindings,
guarded state, gas budget and cancellations before any future live broadcast.

Generated evidence, kept separate from the untouched November 12 package:

- `evidence/id1-alternative-repair-prestate-2026-11-13.json`
- `evidence/id1-alternative-repair-rehearsal-2026-11-13.json`
- `evidence/id1-alternative-proposal-retirement-2026-11-13.json`
- `evidence/id1-alternative-production-package-2026-11-13.json`

## Production frontend release

Production frontend commit **794aacd** was pushed to `SimonFrancisDev/ffn-frontend`
main. Vercel deployment **dpl_GYtifzrLhNzavsUktYeU6Wqp24NV** is Ready and assigned to
`https://www.finfreedomnetwork.io` and the bare production domain. Its deployment
URL is `https://ffnfrontendv1-bqz1ovkup-chukwuemeka-francis-s-projects.vercel.app`.
The public `/assets/index-CC4sk1cq.js` bundle was read after deployment: it
contains the withdrawal policy, mainnet multisig and registration, chain
`0x89` / Polygon Mainnet, and the production API
`https://fin-freedom-backend-3.onrender.com`. It does not reference the staging
API URL. This bundle check is not a founder-wallet browser signing test.

The exact mainnet multisig and IDs 130-159 are withdrawn by default across
browsers. Approve/execute is blocked even for a directly loaded old ID; existing
approvals can still be revoked. An audit view preserves the records. Cancelled
proposals have their actual status and are no longer counted as pending.
This release changes no contract address, environment variable, NFT summary or
money value. Unrelated unfinished community/profile work was excluded.

## Immediate decision and execution order

The current non-upgradeable multisig requires individual governance actions:
30 old cancellations and 30 replacement actions in the prepared design. A
three-stage checklist does not reduce those on-chain proposal counts. No new
live proposals or contract deployments were sent in this pass. Confirm whether
to keep this governance path or separately design a governance migration; the
latter is additional security-sensitive work, not a small repair shortcut.

1. Keep old 130-159 withdrawn. Prepare/review and approve/execute their formal
   cancellation proposals; verify every cancellation on chain. No old ID may execute.
2. Revalidate and deploy the five new inert repair contracts, then prepare and
   submit the exact replacement package. Preserve original records and bindings.
3. Before executing maintenance, release and validate backend repair projection,
   agree a maintenance window, and refresh the complete guarded state.
4. Execute preapprovals, pauses, migrator installs, atomic repair, final installs,
   paired router setup and migrator revocations in the manifest's exact order.
5. Reconcile chain, projections and rendered orbits/payments before reopening.

Do not instruct founders to sign new IDs until their actual IDs, target/calldata,
quorum, timing and execution order have been verified and recorded.
