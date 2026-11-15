# Mainnet proposal 224: transaction cap and production hold

## Verified facts

At Polygon mainnet block 97361306, 2026-11-15 12:57:08 UTC:

- 224 and 225 were unexecuted and uncancelled, with three confirmations each.
- Both corresponding repair executors returned executed=false.
- No Execute(224) event appeared between blocks 97360288 and 97361306.
- Confirmed/pending founder nonces were equal at the queried RPC: 1/1, 280/280,
  315/315 and 310/310 respectively. Their balances matched the preceding check.
  One RPC cannot prove there is no pending transaction anywhere.

The new reported text is the frontend's generic mapping for "could not coalesce".
The founder wallet's underlying nested error and any transaction hash have been
requested but not received; its exact rejection is not yet captured.

## Correction to the preceding guidance

The 50-million-gas override in production commit 7c919d9 was not valid. The
160-million block gas limit is separate from the 32-million transaction cap.
The successful mainnet trace consumed 44,094,863 gas, so it could not establish
transaction admissibility. Increasing POL or gas does not solve this issue.

Primary source: [Polygon Madhugiri upgrade, EIP-7825](https://polygon.technology/blog/polygon-speeds-up-by-33-with-madhugiri-hardfork).
The current chain-137 RPC identifies its client as Bor v2.11.1-private and does
not implement the draft eth_txGasLimitCap method. No signed transaction was
broadcast to test the cap.

## Completed containment

Production frontend commit **a99a4f4** removes the high-gas override. Mainnet
governance `0x785cC854ce9e13CE1140cbFD7C08620713E1711d` has an application hold on
approving/executing **224-256**, including the reopening batch. Revocation remains
available. Other wallets/networks and unrelated proposals are unaffected.

All 14 focused governance tests passed, covering every held proposal, ordinary
execution, network/address boundaries and rejection of high-gas simulation as
authorization. Vercel's clean production build passed. Deployment
`dpl_F1EugyGRf6gevU6Wdj2KDcLLSina` is Ready and assigned to the official domains.
The served `/assets/index-DeFrPh6M.js` contains the hold, lacks the old override
message, and retains the production API binding.

This is an application hold, not an on-chain cancellation. It cannot prevent a
founder using another interface to call the contract. No additional on-chain
proposal, contract upgrade, repair, token transfer, database write, environment
change or staging-service restart was performed by this response.

## Required next action

Founders must stop at 224 and not execute later proposals. Optimize or split the
repair execution while preserving the agreed placements, original payment
history, exact state/plan bindings, one-time guards and maintenance dependencies.
Validate the full outer multisig transaction below 32 million gas with headroom,
not just direct executor eth_call or a local fork with a permissive gas limit.
Any replacement implementation/proposal must be reviewed and approved before
live execution. No replacement is yet certified or submitted by this pass.
