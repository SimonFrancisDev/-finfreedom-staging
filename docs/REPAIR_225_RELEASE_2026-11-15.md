# Mainnet: helper removed, Freedom Plus repair 225 released

## Verified checkpoint

- Network: Polygon mainnet, chain ID 137. No Amoy operation.
- Governance: `0x785cC854ce9e13CE1140cbFD7C08620713E1711d`.
- Read-only checkpoint: block `97378141`.
- Proposal 258 executed successfully at block `97377124` in transaction
  `0x36762ab1aa374d949b25170b0a54e1ae8d6f544a2446fbed7a7ae3952ba6e0a4`.
- The temporary helper `0x16F9ac40B06e2a17bc0CC145b211A176E8654906`
  is no longer an owner. The original four founder owners and threshold of
  three confirmations are restored. The timelock remains 120 seconds.
- Repair 224 remains executed and verified. Do not retry it.
- Repair 225 has three confirmations, its timelock has elapsed, and it is
  not executed or cancelled at this checkpoint.
- All 12 affected contracts remain paused. Proposals 226-256 remain unexecuted.

## What 225 will do

The existing proposal calls executor
`0x9bb75E6F09B94428547555d900a66bf21B246e34` with zero native value.
Its calldata hash is
`0x52511954b0232bd7d719a22aaa1277192a6b53e03f06514892ce44c3d51da1e4`.
This matches the submitted, reviewed manifest exactly.

It restores 16 historical paid ancestor appearances and two zero-money
founder-representative structural links in Freedom Plus. It does not replay
activation payments, mint tokens, or pay compensation. Restoring occupancy
does affect future placement behavior; this is not a claim of no consequences.
The approved existing-position and original-payment constraints remain binding.

## Read-only validation

The deployed governance and repair implementation runtime hashes matched the
deployment record. The four orbit proxies still point to the expected temporary
repair implementations. All five affected orbit state hashes match the approved
pre-repair hashes, and all 18 destination slots are empty.

A normal founder `executeTransaction(225)` call was simulated on actual mainnet
state without state overrides or an access list:

- Estimate: `9,547,289` gas.
- Tested limit: `11,456,746` gas, including 20% estimation headroom.
- Trace gas used: `9,395,813`.
- Exactly 18 expected position-restoration events and five orbit-restoration
  events, matching account, participant, level, cycle, slot, encoded position
  and original transaction evidence.
- No reverted call frames, token Transfer events or native-value calls.
- No live transaction signed or broadcast by this check.

This is a successful simulation, not proof of mined execution. Verification
must be repeated against the actual 225 receipt before later steps are released.

Evidence: [read-only preflight](evidence/repair225-release-preflight-2026-11-15.json).
Reproducible reader: `smart-contract/scripts/checkRepair225Release.js`, requiring
an explicitly supplied `REPAIR_MAINNET_RPC`. It has no signer or broadcast path.

## Founder instruction

1. Refresh `https://www.finfreedomnetwork.io/admin` on Polygon mainnet.
2. Load existing proposal **225**, the Freedom Plus historical repair. Do not
   create a new proposal or use the Guardian proxy-address form.
3. One original founder owner executes 225. Three confirmations already exist
   at this checkpoint; the panel rechecks current approvals and execution state.
4. Stop after its successful receipt and send the transaction hash. Do not
   execute 226-256 or reopen user activity yet.

If the wallet warns, simulation fails, or the transaction status is uncertain,
do not disable protections or retry blindly. Check the transaction hash first.

The production frontend releases only 225 and rechecks prerequisite execution,
helper removal, the original owner set/threshold, exact payload, executor code,
timelock and a bounded ordinary-wallet simulation before requesting execution.
The removed helper and operator cannot execute 225 on behalf of the founders.

## Remaining sequence

After the mined 225 repair is verified: final operating implementations 226-236,
temporary implementation revocation 237-244, post-repair backend/UI and financial
reconciliation, then explicitly authorized reopening 245-256. None is released
automatically by this checkpoint. No Render service, database, environment
variable, NFT setting or unrelated frontend change is included in this release.
