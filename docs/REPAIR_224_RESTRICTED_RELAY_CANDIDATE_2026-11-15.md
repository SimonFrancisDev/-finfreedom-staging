# Proposal 224 restricted execution relay: approval required

Historical candidate record. The user subsequently approved deployment and two
proposal submissions. See [the deployment record](REPAIR_224_RELAY_DEPLOYMENT_2026-11-15.md)
for completed authorization tests, the real helper and proposals 257/258.

## Current status

The founder reported that sign-only output could not be returned. The message
alone does not distinguish wallet incompatibility from another signing-stage
error, but it occurs before the application's broadcast call. At Polygon block
97365396 (2026-11-15 14:39:23 UTC), the founder nonce remained 282 and the POL
balance remained 91.591760909664564467. Proposal 224 was still unexecuted with
three confirmations. No new paid attempt was mined at that checkpoint.

The direct/sign-only UI path is held. No further wallet retries are requested.
No keys should be exported, and no wallet protections should be disabled.

## Candidate and authority change

`Repair224ExecutionRelay.sol` is a candidate ONLY: not deployed, not an owner,
not authorized, and no associated governance proposals have been submitted.
The synthetic simulation address is NOT a live contract address.

The candidate is fixed to Polygon 137, governance
`0x785cC854ce9e13CE1140cbFD7C08620713E1711d`, proposal 224, and operator
`0x884e48f9897E8633238747b608DD49dE12bF94df`. Its constructor binds the exact
existing target, zero native value, calldata hash, unexecuted status and verified
governance runtime. That governance code cannot edit an existing proposal's
target/value/calldata. Runtime execution rechecks the governance code, chain,
operator and one-use flag; the multisig still enforces quorum, cancellation,
execution status and timelock. Any failure reverts the relay flag and repair.

It exposes no approval, submission, cancellation, owner-management, arbitrary
call, upgrade or withdrawal function. It cannot execute 225 or any other proposal.

This route nevertheless changes governance ownership temporarily and therefore
requires EXPLICIT USER APPROVAL before deployment/submission, plus three founder
confirmations and execution of the actual authorization proposal. The existing
threshold remains three. No new unrestricted EOA owner is added.

## Proposed two-proposal sequence

1. Deploy and verify the exact reviewed helper only after user approval. Submit
   two proposals together: add this contract as a temporary owner, then remove it.
2. Founders approve/execute the add-owner proposal using their ordinary wallet
   flow. Verify its receipt, unchanged threshold and helper runtime/bindings.
3. The existing operator signs the exact gas-bounded/access-list transaction
   locally; verify signed bytes before raw submission. The helper calls the
   already-approved, unchanged proposal 224. Founders do not retry 224 themselves.
4. Verify the successful receipt, original repair state/events/payment invariants
   and pauses. Founders then approve/execute removal of the helper. Verify the
   original owner set and threshold are restored before progressing to 225.

The original repair instructions, placements, historical payments, implementations
and original approval records are not replaced by this candidate. Later repair,
final-code, temporary-permission removal and reopening gates remain mandatory.

## Read-only mainnet evidence

At block 97365869 (2026-11-15 14:51:13 UTC), an eth_call ran the constructor and
returned the expected runtime without deployment. debug_traceCall state overrides
then simulated the helper code and the temporary owner entry/array element; none
of these changes persisted on chain.

- Gas used: 30,637,888; tested limit: 32,800,000.
- Bor protocol maximum: 33,554,432 (`1 << 25`). This is not the conservative
  32-million threshold used in the earlier containment. The additional relay call
  needs call-frame gas headroom; 31.8 million was rejected during simulation.
- Access list: 3,900 keys. Packet size including conservative allowance: 129,073
  bytes, below 131,072 bytes. A complete access-list discovery is required;
  prestateTracer output alone is not an access-list certification.
- Same 46 application repair events and identical repair storage changes as the
  reviewed original; only the relay's own completion flag/event is additional.
- Wrong caller, missing owner authorization, repeat execution, arbitrary selector,
  attached native value and changed governance code all reverted in simulation.
- Runtime hash: `0x391bdf63a93a9ec64929f8ab3dacb79371054365a6ae6f336a22b3af80aa96f4`.
- Compiler: Solidity 0.8.24, optimizer runs 1, viaIR.

Script: `smart-contract/scripts/simulateRepair224Relay.js`.
Evidence: workspace `tmp/repair224-relay-candidate-simulation.json` and candidate
artifact. There is no live deployment/receipt. Gas/packet/authority checks must
be repeated for the real deployed address before any live submission.

Before release, extend the authorization rehearsal to explicitly cover missing
quorum, active timelock, cancellation, completed proposal, and owner removal, and
verify the ordinary add/remove-owner proposals. Do not label this a finished or
authorized live recovery package from the candidate simulation alone.

Reference: [Bor gas constants](https://github.com/0xPolygon/bor/blob/v2.11.0/params/protocol_params.go).
