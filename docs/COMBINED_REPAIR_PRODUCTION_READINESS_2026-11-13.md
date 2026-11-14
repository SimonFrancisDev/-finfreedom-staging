# Combined placement repair: production integration release

## Status

The backend and founder-panel readiness releases are deployed to production.
The historical repair itself is NOT deployed or executed. Existing program
proxies, placements, payments, permanent sponsors and balances were not modified
by this pass. Both suspended staging services must remain suspended.

## Production releases

- Backend commit `978f5143c41fd097b723e7f8d5378712f7b5e9fc` was pushed to main
  and the repair branch. API deployment `dep-dbrpbhl6e07s73fp8leg` and worker
  deployment `dep-dbrpbi0n74is73fq6tig` are live on that exact commit.
- API/worker health checks at 2026-11-13 23:09 UTC returned `ok: true`, production,
  MongoDB readyState 1, and the expected separate indexer roles.
- API retained all 114 environment keys; worker retained all 115 keys. SHA256
  fingerprints before and after deployment match exactly. No Render variables,
  database names, credentials or connection strings were changed.
- Recurring HTTP polling remains disabled. Only the production worker enables
  indexing and NFT auto-distribution. No NFT payout rule was changed.
- Frontend commit `3612a0c` was pushed to `ffn-frontend/main`. Vercel deployment
  `dpl_5KZmANrBBrEXs2QAndMJj5dj7nja` is Ready and aliased to
  `https://www.finfreedomnetwork.io` and `https://finfreedomnetwork.io`.
- The newly served bundle was checked at 23:08 UTC: mainnet chain 137,
  production API and program addresses remain correct, including the newly
  added Freedom Plus router identity. The main bundle is `index-BavC32Je.js`.
- Only one new public Vercel production variable was added:
  `VITE_FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS`, set to the verified existing
  mainnet router proxy. No other Vercel variables were replaced.

## Why these changes were necessary

1. Hosted backends lacked the previously tested structural-repair event readers.
   The release installs them before any repair can emit those events. Historical
   appearances retain the original payment provenance; restoration is not a new
   activation, receipt, payment or earning.
2. P4/P12/P39 client ABIs lacked the tested candidate's fifth detailed mirror
   return field, `mirrorRecycleAmount`. That field is synchronized in both client
   repositories; application code does not call this internal function directly.
3. Shared function selectors previously mislabeled different proxies as
   LevelManager. Founder descriptions now match the actual configured target.
   Historical executor actions require exact verified live deployment manifests;
   fork-predicted executor addresses are deliberately not treated as deployed.
4. Browser testing exposed an owner-list identity refresh loop. Repeated identical
   reads now preserve state identity. Full selected-proposal details wrap within
   mobile width. Existing unrelated Community and overlay edits were excluded.

## Validation evidence

- 35 backend tests passed: both repairs, genesis, idempotence, original receipts,
  conflicting positions, realtime wiring without polling, and NFT startup.
- Seven frontend decoder/policy tests passed; real AdminPanel browser fixtures
  passed at 1440px and 390px, with external requests/signing prohibited.
- Production Vite build passed, with only the existing large-chunk warning.
- Twelve package tests passed, covering immutable payloads, chain checks,
  approvals, restoration/revocation and submission of all phases together.
- Offline integration checks passed 22 ABI comparisons, served mainnet address
  checks, and all 45 maintenance descriptions against a test-only manifest.
- Read-only mainnet preflight at block **97270414**, hash
  `0x649ef6a5f7048216a179740d010014fbafa6a396b46a479683480fbca05f9e2b`,
  passed both programs' guarded repair prestates and current proxy bindings.
  All 11 new deployment bytecode hashes match the completed fork rehearsal.
  No secret, transaction signature, or mainnet write was used for the preflight.

## Proposal count and execution

The earlier fork rehearsal contains **68** replacement calls. Current mainnet
Guardian state proves that Freedom Plus router proxy approval is already set.
Removing only this redundant call gives **67** replacement proposals; calldata
and execution ordering of every retained action are unchanged. Recheck the
existing approval before execution. This is not a two/three-proposal package:
the deployed governance accepts one target per proposal and cannot safely grant
its ownership powers to a generic batching helper.

All 67 proposals, including reopening, may be submitted together after verified
live inert deployments and manifest publication. **Submission is not execution.**
Founders must first execute cancellation proposals **160-189**, cancelling old
**130-159**, before starting the ordered maintenance phases. All old proposals
were still unexecuted and uncancelled at the preflight block. The new UI continues
to archive/block the withdrawn package. Blockchain history is not deleted.

## Funding blocker

**Superseded funding estimate:** the November 14
[receipt reconciliation and fresh fee audit](COMBINED_REPAIR_GAS_RECONCILIATION_2026-11-14.md)
accounts for all 70 earlier transactions and revises the snapshot top-up to
**15 POL**, using a lower-tip quote with measured headroom. The numbers below
are the historical November 13 ceiling, not a current spending requirement.

Submitter: `0x884e48f9897E8633238747b608DD49dE12bF94df`.

At preflight it held **11.681034136955361768 POL**. The remaining 11 deployments
and 67 proposal submissions have a conservative capped budget of
**33.097465519925027034 POL**, including 20% gas-limit headroom, at a
417.617835983-gwei fee cap. This is a maximum budget, not a forecast of fees.
The separate reviewed ceiling remains 450 gwei. **25 additional POL** covers
the current shortfall with headroom up to that ceiling. Founders' later approval
and execution fees are separate and are NOT included in this submitter budget.

No partial deployment was started with an insufficient full-package budget.
The unsigned package is saved locally at `tmp/combined-placement-live-package.json`.

## Next steps, in order

1. Fund the submitter; refresh fees, nonce and guarded state immediately before
   broadcasting. Do not reuse stale predicted addresses or alter the repair plan.
2. Deploy the 11 inert contracts, verify runtime and immutable constructor
   bindings, and record every transaction. This does not upgrade live proxies.
3. Populate and publish the exact verified frontend manifest; confirm all
   replacement proposals are decoded correctly against the deployed targets.
4. Submit all 67 replacement proposals and publish real proposal IDs and ordered
   instructions. No approval or execution is performed by the submitter script.
5. Founders execute cancellations first, then preapprovals, pauses, bound
   migrators, two atomic repairs, final installations and temporary revocations.
6. Reconcile chain state, historical payment provenance, backend projections and
   rendered positions before executing the already-submitted reopening proposals.

The agreed scope is unchanged: preserve Sabina's positions, restore Sofia in the
accepted locations, no compensation transfer, no historical level-6 edits, no
permanent sponsor changes, no database reset, no staging restart.
