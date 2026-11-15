# Proposal 224 restricted helper: deployed, awaiting founder authorization

## Scope and status

The user explicitly approved deployment of the restricted helper and submission
of two additional founder proposals. This pass deployed the helper and submitted
257 and 258 on Polygon mainnet, chain ID 137. No proposal was approved or executed
by the operator. No owner was added, no repair was applied and no program was
reopened. The four existing owners and three-confirmation threshold were unchanged
at completion. The two suspended staging services were not touched.

Governance: `0x785cC854ce9e13CE1140cbFD7C08620713E1711d`.
Helper: `0x16F9ac40B06e2a17bc0CC145b211A176E8654906`.
Runtime hash: `0x391bdf63a93a9ec64929f8ab3dacb79371054365a6ae6f336a22b3af80aa96f4`.
Operator: `0x884e48f9897E8633238747b608DD49dE12bF94df`.

The helper is non-upgradeable, non-payable and restricted to that operator calling
proposal 224 once, through the existing multisig. It cannot approve, submit,
cancel, change owners, or execute a different proposal. The multisig still enforces
the original approvals, timelock, cancellation and executed status. A revert rolls
back both the repair and the helper completion flag. Deployment alone grants no
governance authority.

## Confirmed transactions

| Action | Block | Transaction |
| --- | --- | --- |
| Deploy helper | 97367245 | `0x68b7345b487be9ac68ffee0a75ff6866f0644e87c33804c0c61d1478f4ce017d` |
| Submit 257: addOwner(helper) | 97367251 | `0x1244b955b3483ec1b9d77fe89797e529bbfc08af85e6c39934227ddc1bfd9cda` |
| Submit 258: removeOwner(helper) | 97367259 | `0xdd6edaaa0b57688666e02d7e06933f6f9bd4ea9808648311839232579d9e82fb` |

Total fees: 4.010540969938688643 POL. Remaining operator balance at completion:
14.837348800636870601 POL. These are deployment/submission costs, not the future
cost of executing the repair or founder transactions. Both new proposals have
zero native value and target the existing governance contract. Their exact
calldata and receipts are in the accompanying public deployment evidence.

## Validation completed

- Read-only mainnet rehearsal at block 97367088, 2026-11-15 15:21:41 UTC, using
  the exact address later deployed. No persistent changes occurred in rehearsal.
- The constructor bound the existing proposal target, zero value, payload and
  governance runtime. The actual mined runtime and exposed bindings matched.
- The simulated repair used 30,637,888 gas with a 32,800,000 ceiling, 3,900 access
  list keys and a conservative packet size of 129,073 bytes. Its 46 application
  events and storage changes matched the original reviewed repair.
- Ten rejection cases covered wrong operator, missing owner authorization, reuse,
  arbitrary selector, attached native value, changed governance code, insufficient
  founder approvals, active timelock, cancelled proposal and completed proposal.
- Actual add/remove-owner logic was rehearsed through simulated multisig
  proposals. It preserved the original owners and threshold. Removal disabled the
  helper. Estimated rehearsal execution gas: add 165,476; remove 1,919,029.
- Before deployment, all 12 affected contracts remained paused, proposals 225-256
  unexecuted, and the original 224 payload and three approvals were unchanged.
- Signed deployment/submission bytes were checked against their complete prepared
  requests before broadcasting. Only public hashes and receipts were persisted;
  neither signing keys nor raw signed transactions are in these records.

Independent post-submission check at block 97367440 (2026-11-15 15:30:29 UTC)
verified the helper runtime, both proposal payloads, four original owners and
threshold three. Proposals 224/225 remained unexecuted with three confirmations
each; 257/258 were unexecuted with zero confirmations. The helper was not an
owner and its completion flag was false. All 64 focused frontend tests passed,
including exact proposal decoding and premature-removal rejection.

## Mandatory execution order

1. Founders refresh https://www.finfreedomnetwork.io/admin on Polygon mainnet.
   Three founders approve 257; one founder executes it after its timelock.
   Then STOP and report completion. This grants a contract limited authority;
   it does not itself apply the repair. Do not retry 224 through a founder wallet.
2. Operator verifies the actual 257 receipt, helper runtime/bindings, owner set,
   unchanged threshold, 224 quorum/timelock, exact payload, all required pauses
   and current repair prestate. Re-simulate the actual call and access list, check
   gas/fees/size/nonce/balance and signed bytes, then execute through the helper.
   Do not use the ordinary founder wallet broadcast path that discarded the list.
3. Verify the actual 224 receipt, all expected application storage and events,
   absence of replayed payments, and retained pauses. Only after this verification
   release 258 in the frontend and notify founders.
4. Founders approve and execute 258. Verify removal, original four owners,
   threshold three and disabled helper before proceeding with proposal 225.
5. Original later repair, operating-code, permission-removal and reopening gates
   remain mandatory. This helper does not execute 225 or complete the whole repair.

Proposal 258 and original 224-256 remain held in the production UI. This UI hold
does not remove the founders' on-chain powers; they must not bypass it elsewhere.
No production database or historical payment records were edited.

## Founder message

Dear Lady Sabina, Mr. Harry and founders,

The restricted helper has been deployed and verified on Polygon mainnet. I have
submitted two proposals: 257 temporarily authorizes this contract to execute only
the already-approved proposal 224; 258 removes that authorization afterward.
It cannot approve proposals, manage owners or execute another repair proposal.
The existing requirement for three founder confirmations remains unchanged.

Please refresh the founder panel, approve and execute **257 only**, then stop and
tell me it is completed. Please do not retry 224 or proceed to 258 or the later
repair proposals yet. I will verify the authorization, execute 224 through the
restricted helper with the required transaction data, and verify the actual repair.
I will then tell you when to approve and execute 258 to remove the helper.

This does not change the agreed repair instructions or repeat historical payments.
If a wallet reports a warning or an error, stop and send the proposal number and
message rather than changing security settings or retrying repeatedly.

## Evidence and reproducibility

Source: `smart-contract/contracts/governance/Repair224ExecutionRelay.sol`.
Read-only rehearsal: `smart-contract/scripts/simulateRepair224Relay.js`.
Deployment/submission: `smart-contract/scripts/deployRepair224Relay.js`.
The latter exposes no repair execution mode and journals each public hash before
broadcast, stopping rather than sending duplicate ambiguous transactions.

Evidence:
- `evidence/repair224-relay-authorization-rehearsal-2026-11-15.json`
- `evidence/repair224-relay-deployment-2026-11-15.json`

Earlier candidate-only notes are historical and superseded by this deployment
record. This record is not a certificate that proposal 224 has executed.
