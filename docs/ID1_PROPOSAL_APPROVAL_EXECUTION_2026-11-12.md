# ID1 repair: founder approval and execution instructions

## What is ready

All **30 proposals, 130 through 159 inclusive**, are submitted on **Polygon
mainnet, chain ID 137**. These are actual on-chain proposal numbers, not test
numbers. The package includes the preventive correction, the agreed Sofia/Sabina
repair, and the later reopening actions. Existing level-6 positions/counters are
not rearranged. No 512-USDT compensation or other token transfer is authorized
by this structural repair.

The ten new implementation/executor contracts are deployed. They are not yet
installed in the production proxies. At block **97200181**, all 30 proposals
were unexecuted, all five live proxies retained their old implementations, and
the program was not paused. No database, hosted environment variables or
suspended staging service was changed.

Governance contract: `0x785cC854ce9e13CE1140cbFD7C08620713E1711d`.
Authorized submitter: `0x884e48f9897E8633238747b608DD49dE12bF94df`.
Required approval threshold: **3 distinct current multisig owners** per proposal.
On-chain timelock: **120 seconds after submission**, not after the third approval.
An expired timelock does NOT mean the operational execution checks are complete.

## What founders can do now

1. Open the existing production founder administration page, `/admin`, from the
   official main website. Connect a current founder multisig-owner wallet on
   Polygon mainnet. Do not use the Amoy/staging site.
2. In the proposals/transactions section, review proposals **130-159** against
   the descriptions and targets below. Check the multisig address above. Stop
   if the network, target, calldata or proposal number differs from this record.
3. Each of at least three distinct owners can click **Approve** for each of the
   30 proposals and confirm the wallet transaction. Approval itself does not
   apply the repair. All 30 can be approved in advance, including reopening.
4. Report when the three approvals have confirmed. A founder must separately
   execute each proposal in the order below. Only one execution per proposal is
   needed, not execution by every owner. Owners need POL for approval/execution.

If the UI cannot decode a label, compare the complete target and calldata to
the package evidence; do not approve an unexplained wallet security warning or
substitute a different transaction. No approval here should ask for a private
key, seed phrase, USDT allowance or a payment of 512 USDT.

## Execution order and stop points

**Approval can happen now. Execution is staged. Do not execute all proposals
automatically just because their buttons are enabled.**

| Proposal IDs | Execute when | What they do |
| --- | --- | --- |
| 130-134 | After target review, sufficient approvals and timelock | Guardian allowlists exact implementation sets; does not install them |
| 135-139 | Only after backend repair projection release, fresh state verification and maintenance go-ahead | Pause registration, manager, P4, P12 and P39, in that order |
| 140-143 | Only after all five pause states are verified | Install the four manifest-bound temporary repair implementations |
| 144 | Only after the paused proxy bindings and guarded prestate are verified | Apply the exact structural repair atomically; no token transfer |
| 145-149 | Only after 144 succeeds and repair evidence is checked | Install final P4, P12, P39; restore original registration implementation; install revision-2 manager |
| 150 | After 149, while still paused | Bind the matching revision-2 settlement router |
| 151-154 | After final implementation/router verification | Revoke the four temporary repair implementation approvals |
| 155-159 | ONLY after chain, financial-invariant, backend and UI checks pass | Reopen P4, P12, P39, manager, then registration |

Execute ascending IDs within each row and wait for each receipt. If any execution
fails, STOP. Do not skip it, reorder subsequent actions, recreate the proposal,
turn off a guard or unpause the system to get past the failure. The repair is
bound to exact prestate and intentionally rejects unexpected activity/state.
Re-preparation may be necessary if that state changes before maintenance.

**155-159 are queued only because the owner requested every proposal submitted
in advance. They are NOT permission to reopen early. The multisig does not enforce
this operational order automatically; the executing founder must follow it.**

## Exact deployment destinations

Production proxy addresses remain unchanged. New code addresses are:

| Contract | New deployed address |
| --- | --- |
| P4 implementation | `0xB6E584443796d70B071B15922aEc2538fa5165bE` |
| P12 implementation | `0x6f9aBC3F882C5f3731752621A1E2712D060c937e` |
| P39 implementation | `0xD72154F2a9313F2e00865CC9d464e47E944e99e5` |
| Manager implementation | `0xCC88efa9d0f8500A5e1FAA1a04bDE8d9837B49E1` |
| Settlement router | `0xfeB6Cc065A0e77641827d692749a3108fE9D8A94` |
| Bound repair executor, proposal 144 target | `0x985f18D10112A26C256CB70Ca613207a8bE754F5` |
| Temporary P4 repair implementation | `0xD936aE3F83683F51C24dD3ae73b8280E3643d4aE` |
| Temporary P12 repair implementation | `0x792bda652d860Cf99e68DE06F1100bc91DF72c4F` |
| Temporary P39 repair implementation | `0xBEa0985b83Fc67c2333b241e4fdbF8FD5F47D98f` |
| Temporary registration repair implementation | `0xA5Ca2eb4dc34169feB378080be5438125863B445` |

Registration is restored in proposal 148 to its original implementation
`0x2F2c5E43eBBf666E00a1a2d699256B2Eae6268f5`, not replaced by a new registration
system. Existing accounts, sponsors, token balances and program addresses remain.

Guardian proposals target `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC`.
Pause/upgrade/reopen calls target the existing proxies:

| Proxy | Address |
| --- | --- |
| Registration | `0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5` |
| Manager | `0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53` |
| P4 | `0x1ED0b443c880Ba88F732c3F5915561A07B21F6B4` |
| P12 | `0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b` |
| P39 | `0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb` |

## Operator gates before reopening

- Production backend repair-event projection must be released before execution.
  Its tested branch commit is `2869262`; neither suspended staging service is
  needed or authorized to restart. Confirm the actual production deployment.
- Verify all repair journal events, exact current slots/parents and open-cycle
  archives. Compare level 6 to the captured prestate: no historical repair there.
- Verify no repair Transfer/Approval, no earnings credit, unchanged supplies,
  balances, permanent sponsors and active levels. Do not interpret hypothetical
  future activation payouts from local tests as live compensation.
- Verify all final implementation addresses, restored registration, router
  binding and BOTH manager/router settlement revisions equal 2.
- Reconcile actual chain results with the production API and orbit UI, including
  zero-value ancestry markers without invented payment receipts.
- Only after these pass, authorize execution of 155, 156, 157, 158, then 159.

## Evidence and audit record

- `evidence/id1-production-broadcasts-2026-11-12.json`: all ten deployment receipts
  and all thirty submission hashes/IDs. Agent approvals sent: 0. Executions: 0.
- `evidence/id1-production-submission-verification-2026-11-12.json`: independent
  pinned readback of every proposal target/value/calldata and current proxy state.
- `evidence/id1-production-unsigned-package-2026-11-12.json`: immutable prepared
  payload/constructor record. Its original withholding notes describe the earlier
  plan; the explicit later submission authorization is recorded in the journal.
- `ID1_LEVEL6_DEFERRAL_AND_PROPOSAL_2026-11-12.md`: scope decision, tests, funding,
  and limits of the local evidence. Production repair execution is still pending.
