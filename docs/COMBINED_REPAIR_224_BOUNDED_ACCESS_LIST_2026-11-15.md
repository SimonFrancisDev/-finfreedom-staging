# Mainnet 224 bounded access-list validation

This record supersedes the 224 gas-cap hold, but not the hold on 225-256.
Network: Polygon mainnet, chain 137. No staging service is restarted. No new
contract, implementation, proposal or historical payment is created.

## Exact unchanged action

- Governance: `0x785cC854ce9e13CE1140cbFD7C08620713E1711d`.
- Executor: `0xd952d21B114F54C1259470b1693893F4D0Dd50Ed`.
- Proposal: 224; native value: zero.
- Payload keccak256: `0x9d90c584451bdbc4214260b02891790175ec2e2a64e26fb08f86278b2abd0b9b`.
- Governance runtime keccak256: `0x39381be5a244f93beb7d4f297de0f4cd7a211cb0676d67f5e4decefba4fcc0fa`.

## Cause and recovery

The live Bor trace charged 5,460 per cold SLOAD (PIP-88), whereas the earlier
Hardhat rehearsal used 2,100. The unchanged outer multisig call took 44,094,863
gas. Its 50-million diagnostic simulation was not an admissible signing limit.

A full 5,940-storage-key access list lowered gas to 23,543,963 but produced an
approximately 196,366-byte unsigned transaction, over Bor's 128 KiB txpool limit.
It was rejected. A 3,900-key subset fits both constraints: 30,602,763 gas used,
31,800,000 signing limit, 129,080 bytes with conservative signature/nonce margin.
The protocol MaxTxGas constant is 33,554,432; this solution stays below even the
more conservative 32-million threshold used in the initial containment.

At mainnet block 97361857, baseline and bounded traces produced identical
application storage changes and 46 application events, with zero token transfers.
Only native POL fee accounting/fee events differ. The actual frontend helper
passed with two funded founder VoidSigners at checkpoint 97362487, without any
signature or broadcast. All 46 focused frontend tests passed.

## Reproduction and evidence

`smart-contract/scripts/traceCombinedRepairExecutionGas.js` performs read-only
outer-call diagnostics. `smart-contract/scripts/verifyRepairAccessListEquivalence.js`
compares callTracer events and prestateTracer storage diffs, permits only native
gas-fee differences, and rejects token transfers/code changes/non-fee native flows.
Both require an explicitly supplied `REPAIR_MAINNET_RPC` and verify chain 137.

The workspace `tmp` directory retains the diagnostic trace, opcode profile,
rejected full-list candidate, accepted bounded request and traces, equivalence
report, and two-owner frontend-helper check. The accompanying committed evidence
summary records their SHA-256 hashes. These are simulated transactions, not live
execution receipts. No credentialed RPC URL or signed transaction is included.

## Release and gate

Production frontend changes are confined to governance execution preparation,
held-proposal policy and clearer nested RPC errors. Only 224 receives the bounded
access list, after exact-payload/runtime/status/owner/quorum/timelock/network,
balance, packet-size, estimate and latest-state simulation checks. Discovery at
50 million gas is read-only, never a submitted transaction setting.

Founders refresh the official mainnet admin page and execute **224 only**, from
a sufficiently funded governance owner. Existing approvals remain valid. They
must report the hash and stop; 225-256 remain held. No instruction to bypass
wallet warnings or blindly retry an ambiguous response is given.

After a successful receipt, verify both executed flags, agreed positions and
relationships, absence of new payment transfers, and continued pauses. Only then
release the next dependent step. Final operating-code installation, temporary
permission removal, backend/site reconciliation and reopening remain separate
verification gates. Do not declare the repair complete from these simulations.

## Production release verification

Production frontend commit `f39731e` was pushed to `ffn-frontend/main`. Vercel
deployment `dpl_AeAGBRK1cSeHosXZXGp6hvW4QP8B` is Ready, built from the clean Git
commit and assigned to the official domains. The official admin page serves
`/assets/index-geigVjBO.js`, containing the bounded access-list preparation,
exact payload guard and dependent-proposal hold. The obsolete 224 hold is absent.
Production API binding is unchanged. The served read RPC matches the same
approved mainnet endpoint used for the validation. Unrelated local frontend
changes were excluded from the commit and deployment.

Read-only release checkpoint: Polygon block **97363004**, **2026-11-15 13:39:35 UTC**.
224 and 225 remain unexecuted and uncancelled, each with three approvals; both
executors remain unexecuted. Proposals 226-256 remain unexecuted with no approvals.
All 12 affected contracts remain paused. The two validated founder owners each
have over 111 POL at that checkpoint. No deployment transaction, repair execution,
environment change, database write or staging-service restart was performed.
The complete status read is retained in `tmp/repair224-release-status-2026-11-15.json`.

## Primary references

- [Bor PIP-88 and gas limits](https://github.com/0xPolygon/bor/blob/v2.11.0/params/protocol_params.go)
- [Bor txpool packet limit](https://github.com/0xPolygon/bor/blob/v2.11.0/core/txpool/legacypool/legacypool.go)
