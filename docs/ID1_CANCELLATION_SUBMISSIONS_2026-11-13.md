# Retiring the withdrawn placement-repair proposals

## Scope

Polygon mainnet, chain ID **137**. This is not an Amoy operation, regardless of
the source repository's `staging-environment` directory name.

Governance: `0x785cC854ce9e13CE1140cbFD7C08620713E1711d`.
Authorized submitter: `0x884e48f9897E8633238747b608DD49dE12bF94df`.

The previous repair proposals **130-159** are withdrawn. The replacement plan
preserves Sabina's agreed positions and includes the reviewed Freedom Plus
repair. Before that replacement proceeds, the withdrawn proposals must become
unexecutable on chain. Hiding or archiving them in the website does not do this.

This pass submits only `submitTransaction(governance, 0, cancelTransaction(oldId))`
for those 30 specific old IDs. It does not approve or execute proposals, deploy
contracts, upgrade proxies, repair positions, pause programs, send USDT, update
NFT rules, modify a database, or restart services. The only spent asset is the
submitter's POL for transaction fees. No founder key is used.

## Submission status

**All 30 cancellation proposals were submitted and verified on mainnet.** New
IDs **160-189** cancel old IDs **130-159**, respectively. At verification every
new proposal had zero founder approvals and was unexecuted; every old proposal
was still unexecuted and uncancelled. Founders must still approve and execute
the new cancellation proposals. The placement repair is NOT live from this pass.

Verified block **97265476**, November 13, 2026 at **21:01:10 UTC**:
`0xd2e2411f9643ec7f232e6ce1312ed9ff8da41cdb2ccfe7e5d6b73ff5aec501e7`.
All original payloads and new cancellation payloads were checked at that block.
Actual total submission gas cost: **1.891320179260472094 POL**.

The [public evidence](evidence/id1-cancellation-submissions-2026-11-13.json)
contains all 30 real submission transaction hashes, receipts' gas costs, exact
calldata, preflight and final verification anchors. No local simulation IDs are
used in the following mapping:

| Approve/execute new ID | Cancels old ID | Approve/execute new ID | Cancels old ID | Approve/execute new ID | Cancels old ID |
| --- | --- | --- | --- | --- | --- |
| 160 | 130 | 170 | 140 | 180 | 150 |
| 161 | 131 | 171 | 141 | 181 | 151 |
| 162 | 132 | 172 | 142 | 182 | 152 |
| 163 | 133 | 173 | 143 | 183 | 153 |
| 164 | 134 | 174 | 144 | 184 | 154 |
| 165 | 135 | 175 | 145 | 185 | 155 |
| 166 | 136 | 176 | 146 | 186 | 156 |
| 167 | 137 | 177 | 147 | 187 | 157 |
| 168 | 138 | 178 | 148 | 188 | 158 |
| 169 | 139 | 179 | 149 | 189 | 159 |

First submission: `0x1a75c8a5781e088cca9b5ed1b690fcce9acc81cc847a6c67faa815feab6091a9`.
Last submission: `0x7dbb7a17ad3f771270da59c509dbb4abdadfafc1f2fe39d734592eb6be071239`.

## Founder procedure

Use the existing production founder panel at
`https://www.finfreedomnetwork.io/admin`, connected to Polygon mainnet with an
existing authorized founder wallet. The source already labels these actions
`Cancel proposal #<oldId>` and archives withdrawn original IDs 130-159.

1. Use only the verified new cancellation IDs **160-189** above, not 130-159.
2. For each new proposal, check that the target is the governance address above,
   the native value is zero, and the action cancels the corresponding old ID.
3. Three distinct existing owners approve each new proposal. The configured
   two-minute timelock and three-confirmation quorum remain unchanged.
4. Once each proposal meets its quorum and displayed execution time, an existing
   owner executes that **new cancellation proposal**. Approving it alone does
   not cancel the old one.
5. Report completion so the old proposals' `cancelled` flags can be verified on
   chain before proceeding with replacement deployment/submission.

There is no need to pause participant activity merely to cancel obsolete
proposals. Do not execute any old repair, pause or reopening proposal. If any
payload, target, status or ID differs from this record, stop that action and
report the discrepancy. Do not disable wallet security warnings blindly.

On-chain history remains auditable. Cancellation prevents future execution;
it does not delete the original submission or undo any transaction.

## Controls and verification

- Original package SHA-256:
  `c8e36fa60e65b33cb50ac3d04e8dfabbcbccb169800050a79685eb4b6e11cf5c`.
- Exact original target/value/calldata authenticated for all 30 proposals.
- Live governance runtime, four-owner set, quorum and timelock matched the
  previously rehearsed mainnet contract. The local governance artifact is not
  substituted for that deployed code.
- Existing cancellation proposals are checked before submission. Duplicate
  active cancellations cause a stop, not another submission.
- Chain, signer, zero value and allowed old-ID range are enforced. No approval
  or execution command is exposed by the submission script.
- Signed transaction hashes are journaled before broadcasting. Restarting uses
  the same signed transaction; it does not silently submit a replacement.
- Three block confirmations and on-chain proposal payload verification are
  required for each new submission. Final verification uses a pinned block.
- Per-gas ceiling: 450 gwei. Current base fee plus tip must fit within that
  ceiling; excessive suggested headroom does not raise the ceiling.

Four isolated cancellation-plan tests passed, covering exact nesting and zero
value for all 30 calls, prohibited IDs, altered/executed originals, duplicate
detection and fee limits. Three local governance tests passed for owner authority,
quorum/timelock enforcement, preservation of unrelated proposals and absence of
a batch/delegation bypass. These are targeted tests, not a new universal program
certification; the prior combined repair rehearsal remains separately recorded.

## Files and next gate

`smart-contract/scripts/submitId1CancellationProposals.js` defaults to no action
unless explicit `ID1_CANCELLATION_ACTION=CHECK` or `SUBMIT` is supplied, and needs
an explicit mainnet RPC. `CHECK` never loads a signer or broadcasts.

Local journal: `tmp/id1-cancellation-submissions.json` in the workspace root.
It contains signed submission transactions, not private keys, and is not for
Git publication. The public evidence export excludes signed transaction bytes
and RPC credentials. Original package and original broadcast journal are not
overwritten. A retained process lock after a crash requires inspection before
another run; never remove a lock while the original process is still active.

After all 30 originals are confirmed cancelled, follow
[the combined repair rollout](COMBINED_PLACEMENT_REPAIR_ROLLOUT_2026-11-13.md).
New address-bound deployments and the 68 replacement maintenance proposals are
not performed by this cancellation script. Their maintenance execution and
backend/browser reconciliation remain separate gates. Suspended staging
services stay suspended throughout this work.
