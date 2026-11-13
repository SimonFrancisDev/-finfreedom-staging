# Combined placement repair rollout

## Status

Unsigned preparation and local governance rehearsal only. No live deployment,
proposal, approval, cancellation, transfer, pause, database change, environment
edit or service restart is authorized by this document alone or implied by a
simulation result. The two suspended staging services remain suspended.

The source is Polygon mainnet 137, pinned block 97257828,
`0xa29f6d1b28e9cfe2fcf3ff563aa0303c01d4b2e11f1c435c742018ab62e36bb5`.
Execution is disposable Hardhat 31337. The `staging-environment` source-folder
name does not select Amoy. **The combined multisig rehearsal passed.** This is
not a live release approval or evidence that proposals were submitted on mainnet.

## Unchanged repair decisions

F-Freedom: keep Sabina in ID1 level-8 slot 3 and level-9 slot 2; restore Sofia
in ID1 level-8 slot 6 beneath Sabina and level-9 slot 3; add the explicitly
zero-money ancestry link in Sabina's level-8 orbit. Keep the already-reviewed
ID1 counter corrections for levels 1, 3 and 7. Leave historical level 6 alone.
This is the approved one-time exception, not a new general late-sponsor rule.

Freedom Plus: restore 16 payment-backed ID1 ancestor appearances and two
zero-money representative genesis links. Preserve every existing paid slot,
permanent sponsorship and skipped-sponsor branch. Install the preventive
router correction. Original orbit implementations return after the temporary
repair; existing live genesis is never initialized again.

No historical payment is repeated, clawed back or relabeled as compensation.
There is no 512-USDT payment in this package. No NFT contract or rule changes.
The original evidence and earlier proposals remain available for audit.

## Exact governance workload

The current non-upgradeable multisig supports one target call per proposal.
Its three-confirmation threshold and 120-second timelock remain unchanged.
No ownership transfer, new signer, delegatecall shortcut or governance migration
is introduced to reduce proposal count.

| Stage | Target calls/proposals | Purpose |
| --- | ---: | --- |
| Retire obsolete proposals | 30 | Cancel old IDs 130-159; verify their exact original payloads first |
| Preapprove implementations/proxies | 15 | Guardian approval of the exact bound temporary/final implementations |
| Pause affected program contracts | 12 | Stop activations during both repairs and final installations |
| Install temporary repair implementations | 8 | Four F-Freedom and four Freedom Plus bound migrators |
| Apply repairs | 2 | One atomic four-target repair per program, with zero token transfers |
| Install final implementations/router binding | 11 | Restore final engines/registration, update routers and manager pairing |
| Revoke temporary implementations | 8 | Remove Guardian approval for all temporary migrators |
| Reopen after verification | 12 | Resume only after chain and backend reconciliation |
| **Total if none already cancelled** | **98** | **30 cancellations plus 68 replacement maintenance actions** |

These are proposal counts, not the number of founder approval transactions.
Each proposal separately needs the existing quorum and execution. Eleven new
inert contracts are required; five already-deployed F-Freedom preventive
implementations/router are reused only after artifact and binding validation.

Each of the two repair calls is atomic. The complete multi-proposal sequence
is not atomic. A failure requires leaving affected activity paused and
investigating the exact failure, not skipping to reopening or forcing stale plans.

## Order and release gates

1. Keep old proposals withdrawn from the active UI. Verify none has executed.
   Match all 30 target/value/calldata payloads and formally cancel any still
   uncancelled. A UI archive is not an on-chain cancellation.
2. Refresh the mainnet block, guarded states, proxy implementations, code hashes,
   Guardian permissions and deployer nonce. Rebuild address-bound constructors
   and calldata when needed. Never submit fork-predicted addresses or local IDs
   as if they were verified live deployments/proposals.
3. Validate and release both backend repair-event projectors before executing
   maintenance. Verify original event provenance is available. No polling or
   database reset is required; neither repair event creates new earnings.
4. Deploy and verify the bound inert contracts, then submit the reviewed package.
   Record real deployment hashes and proposal IDs separately from simulations.
   Reopening proposals may be prepared in advance but must not execute before
   reconciliation. The current multisig itself does not enforce phase order.
5. During the agreed maintenance window, execute preapprovals, all pauses,
   temporary installs, both repairs, final installs/router binding and temporary
   permission revocations in the manifest order.
6. Confirm all affected positions/counters, unchanged historical payments and
   watched balances, router pairing, canonical sponsors, deferred level-6 state,
   indexed repair events and rendered user orbits. Resolve any conflict before
   reopening. Provide founders the actual IDs with the exact next allowed action.
7. Reopen only after these checks. Confirm normal event-driven indexing and
   first subsequent activity without manufacturing an activation or payment.

## Validation boundaries

The complete combined run cancelled all 30 obsolete proposals locally, deployed
11 locally bound contracts, reused five existing implementations/router, and
executed all 68 maintenance actions through the deployed multisig code. Negative
checks rejected missing approvals, approval by the submitter acting without an
owner role, and execution before the timelock expired. All eight temporary
migrator approvals were revoked before simulated reopening. The owner set,
three-confirmation threshold and 120-second timelock were unchanged.

Both repair receipts contained no watched token events. Watched USDT balances,
token supplies, registration counts, activation counter, historical F-Freedom
earnings and permanent sponsors matched before and after the complete sequence.
All occupied Freedom Plus slots in the affected boards were preserved and the
18 additions matched the reviewed payloads. The complete F-Freedom repaired slot
vectors matched the reviewed plan; the deferred level-6 state hash was unchanged.
Final implementation addresses/router pairing and all twelve unpaused states
were checked after the local reopening stage.

Measured multisig execution gas: F-Freedom repair **24,149,903**; Freedom Plus
repair **6,044,213**. These are simulation measurements, not a live fee quote.

An earlier run reached both successful repair calls but stopped when its
verification script called a normal orbit getter on a temporary migrator. The
script now reads the migrator's full `repairState` before final installation and
uses the normal getters afterwards. The full sequence was rerun and passed;
no Solidity repair change was made to address that test-harness issue. The failed
run was preserved locally as `tmp/combined-placement-repair-verification-getter-failure.json`.

The standalone candidate passed 56 Freedom Plus contract tests, 22 backend
projection tests and the separate mainnet-fork repair. The combined builder and
existing package suites passed 11 tests. The combined governance rehearsal uses
the actual mainnet multisig code on a local fork, locally impersonated founders,
and local time advancement; it does not use or request their private keys.

Production constructors bind chain 137. Local rehearsal constructors substitute
31337 only for that chain guard; target addresses, plan bytes and execution order
are otherwise reproduced. The rehearsal's block gas-limit check does not replace
a current live transaction gas/fee and deployment-budget review.

The fork does not connect to the production database or browser. A passed fork
is not evidence that the backend release or frontend reconciliation is complete.

### Governance artifact boundary

The deployed multisig runtime hash at the pinned block is
`0x39381be5a244f93beb7d4f297de0f4cd7a211cb0676d67f5e4decefba4fcc0fa`.
The current local artifact hash is
`0x97945ae4b66a2d5dc23a9ebd7965d4400a41f6cd7831198884953a16a92c79aa`.
Executable bytes differ, not just compiler metadata. The local artifact is NOT
certified as the deployed governance source and must not be deployed as a
replacement under this repair package.

The rehearsal preserves and executes the actual deployed multisig bytecode.
Its owner set, quorum, timelock and cancellation/approval behavior are checked
through that code. A local layout is used solely as a read-ahead hint to select
storage addresses for the fork cache. Every cached word is fetched unchanged
from the pinned source; no zero value is assumed and no governance field is
patched to force approval. A wrong read-ahead hint can reduce cache efficiency,
but cannot invent the required state. No governance implementation override,
ownership transfer or threshold change is part of the rehearsal or live plan.

## Files

- `smart-contract/scripts/lib/combinedPlacementRepairPackage.js`: pure unsigned builder.
- `smart-contract/scripts/rehearseCombinedPlacementRepair.js`: local-only governance rehearsal.
- `smart-contract/scripts/buildCombinedPlacementRepairInputs.js`: public offline inputs export.
- `smart-contract/test/combined-placement-repair-package.node.cjs`: bounded builder regressions.
- `docs/evidence/combined-placement-package-inputs-2026-11-13.json`: public input subset and source hashes.
- `docs/evidence/combined-placement-repair-rehearsal-2026-11-13.json`: passing local sequence, payloads, gas, invariants and provenance.
- `docs/FREEDOM_PLUS_PLACEMENT_REPAIR_VALIDATION_2026-11-13.md`: exact Freedom Plus repair and limitations.
- `docs/ID1_ALTERNATIVE_REPAIR_2026-11-13.md`: approved F-Freedom alternative and earlier tests.

Rehearsal command (explicit approved source RPC, no live key):

```powershell
node node_modules/hardhat/internal/cli/cli.js run --network hardhat --no-compile scripts/rehearseCombinedPlacementRepair.js
```

Set `COMBINED_REPAIR_MAINNET_RPC` in the process environment first. The script
rejects a non-Hardhat execution network or a non-mainnet source RPC.
The saved compiler baselines and the prior Freedom Plus pinned storage cache
are also required by the fork script; the offline builder tests use only the
committed evidence inputs. Rehearsal caches contain exact pinned source words,
with hashes recorded in the report, and are reused to avoid repeated RPC reads.

## Still not performed

- Live cancellation of old proposals, new deployments or replacement submissions.
- Fresh execution-time state/nonce/code binding and live gas-budget verification.
- Production backend release, database projection and browser/orbit reconciliation.
- Founder execution, production maintenance pause or reopening.

The immediate live prerequisite remains formal cancellation of obsolete proposals
130-159 through the existing multisig. Do not sign local simulation proposal IDs
from the evidence file, and do not execute any withdrawn proposal as a shortcut.
