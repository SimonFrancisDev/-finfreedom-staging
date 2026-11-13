# ID1 repair: level-6 deferral and proposal preparation

## Withdrawn on November 13: do not approve or execute 130-159

The Sofia/Sabina arrangement below has been superseded. Proposals 130-159 are
withdrawn from the production signing queue, but still require on-chain
cancellation. The previous submission record remains here for audit purposes.
Follow `ID1_ALTERNATIVE_REPAIR_2026-11-13.md`, not the historical instructions below.

## Historical status on November 12: all proposals submitted

Funding arrived and the authorized deployment/submission completed on Polygon
mainnet. All ten inert contracts were deployed and verified. All **30 proposals,
130-159**, are submitted, with exact target/value/calldata verified against the
prepared package. At verification block **97200181**, none had executed; the five
production proxies still used their original implementations and were unpaused.
The submitter retained **13.572354316215833862 POL**. No USDT compensation was sent.

The owner explicitly requested submission of ALL proposals, including reopening,
before execution readiness. That instruction supersedes the original withholding
policy described in the preparation history below. Only submission timing changed:
the five original reopening payloads are unchanged, and their EXECUTION remains
conditional on successful post-upgrade verification. The package/journal binding
was preserved; the original unsigned package was not edited or replaced.

**The November 12 approval instructions are withdrawn. Do not approve or execute
130-159. No replacement proposal IDs have been submitted in this repair pass.**

Full instructions: `ID1_PROPOSAL_APPROVAL_EXECUTION_2026-11-12.md`.
Live records: `evidence/id1-production-broadcasts-2026-11-12.json` and
`evidence/id1-production-submission-verification-2026-11-12.json`.
The additional all-submissions policy regression passed; five package tests now
pass alongside eight historical-plan tests. No contract code changed in this pass.

## Owner decision

The owner instructed us to leave the existing level-6 duplicate positions alone
and advance the preventive correction and Sofia/Sabina structural repair. This
supersedes the earlier release gate requiring historical level-6 relocation.

- No level-6 slot, counter, archive, earnings or reserve repair is included.
- No compensation, 512-USDT adjustment, clawback or synthetic historical payment.
- Permanent sponsors and completed-cycle archives remain unchanged.
- NFT and Freedom Plus contracts are not upgraded by this package.
- No production reset, environment-variable change or hosted-service restart.
- Both suspended staging services remain suspended.

The shared P39 implementation is still upgraded for future behavior, including
level 6. Excluding historical edits does not mean retaining old code at level 6.
Historical duplicates and their ancestry remain effective during the current
cycle. Completing it does not undo old payments or compensate anybody.

## Evidence completed in this pass

Source chain: Polygon mainnet 137. All transaction rehearsals: disposable local
Hardhat fork 31337, not live transactions. Source block 97175651, hash
`0x3baa97701b08dab847fc8acc2ef14eae17e279c9590df979fc6228a1adcd802b`.

1. The reduced plan removes ID1 level 6 altogether. The builder now rejects even
   counter-only level-6 edits and unrelated account/level edits.
2. Actual production multisig runtime/state on the local fork successfully
   submitted the reduced payload, enforced confirmations and timelock, and
   executed the repair. The local proposal number 130 is NOT a live proposal ID.
3. Payload: 76,452 bytes, down from 102,884. Execution used 24,202,303 gas;
   estimated 24,836,426; 10% execution limit 27,320,069, below the local
   30,000,000 block limit. This is execution gas, not submission-storage gas.
4. All guarded rejection cases passed, including changed prestate, wrong proxy,
   wrong chain, unauthorized caller, changed plan, replay and unpaused rollback.
5. No token Transfer/Approval occurred during repair. Watched balances, recorded
   earnings, token supplies, active levels, permanent sponsors and activation
   counters remained unchanged. Current/archive repair consistency passed.
6. Level-6 prestate hash was identical before and after the repair. A separate
   snapshot-isolated test filled its remaining 26 positions using manager-only
   orbit calls. It completed the cycle, with two 160-USDT reserve calculations
   totaling 320 USDT. These were synthetic local arrivals, not real users, and
   this probe does NOT independently certify a full wallet-settlement cascade.
7. All three subsequent real contract activation paths passed in isolated local
   fixtures: Sofia L8, Sabina L8, Sofia L9. Synthetic USDT was explicitly local.
   Ordinary future activation payouts in these probes are not compensation.
8. Twelve offline plan/package tests passed. The current builder reproduces the
   rehearsed bytes exactly, including after the added scope-rejection guard.
9. Backend projection reconciliation of the new fork logs passed: 110 slots,
   33 journaled slot/archive updates, 40 repair events, zero database writes.
   Those update counts do not mean 33 users were relocated.
10. Current mainnet comparison at block 97199114 matched all six affected orbit
    fingerprints. Subsequent package preparation also checks owners, guardians,
    proxy implementations, router, ID1, USDT, registration and parent preconditions.

Prior 195-test contract and 73-test backend results remain evidence for unchanged
code. They have not been relabeled as newly executed suites or live verification.

Evidence files:

- `evidence/id1-level6-deferred-multisig-rehearsal-2026-11-12.json`
- `evidence/id1-level6-deferred-current-prestate-2026-11-12.json`
- `evidence/id1-level6-deferred-backend-projection-2026-11-12.json`
- `evidence/id1-production-unsigned-package-2026-11-12.json`

## Why the rehearsal was slow, and what changed

Storing a large proposal caused thousands of uncached reads of new multisig
storage. Reading these locations in oversized batches hit the provider's
50-request/second limit. The final rehearsal uses bounded, throttled reads of
the exact pinned mainnet storage, verifies every value is zero, then primes only
those verified locations in the local fork. It does not replace the multisig's
runtime, owners, approvals or earlier proposals, nor alter live storage.

The current local SimpleMultiSig artifact did not bytecode-match the deployed
runtime. It was NOT substituted or declared identical. Execution used the
actual forked runtime. Its ABI/storage layout located the next proposal; every
location primed locally was independently checked against the source RPC.

## Production preparation history and funding

At preparation the package was unsigned and undeployed. Its addresses were predicted from the
authorized submitter's nonce, NOT proof of deployed contracts. Scripts reject
nonce drift, changed artifact bytes, changed guarded state or a different chain.

Authorized submitter: `0x884e48f9897E8633238747b608DD49dE12bF94df`.
Governance: `0x785cC854ce9e13CE1140cbFD7C08620713E1711d`.
Three confirmations and a 120-second timelock were read from mainnet.

At preparation, submitter balance was **0.688419349610044568 POL**. Estimated
deployment gas was 36,267,480 before safety margin. The full deployment plus
proposal-submission capped budget was **28.288048403190236339 POL**. The owner
was asked to top up **30 POL on Polygon mainnet**. This supersedes the earlier
25-POL preliminary request, which did not include the full storage cost.
Unused gas is not spent; actual fees vary. Founder approvals/execution require
their own POL and are excluded from this submitter budget.

Ten inert contracts are required: four corrected implementations, paired router,
one bound executor, and four temporary bound repair implementations. The existing
multisig has no general batch function; this package therefore prepares 30
separate governed actions rather than introducing an unreviewed ownership/batch
mechanism just to reduce the displayed proposal count.

| Action indices | Purpose |
| --- | --- |
| 0-4 | Guardian approves exact implementation sets |
| 5-9 | Pause registration, manager and three orbit engines |
| 10-13 | Install exact manifest-bound temporary repair implementations |
| 14 | Apply structural repair atomically, without token operations |
| 15-19 | Install corrected orbit/manager implementations; restore registration |
| 20 | Bind the matching revision-2 router while still paused |
| 21-24 | Revoke temporary implementation approvals |
| 25-29 | Reopen only after chain/backend/UI verification; submission withheld |

The submitter script never approves or executes founder proposals. Its default
SUBMIT mode submits only actions 0-24; the later explicitly authorized SUBMIT_ALL
mode also submits unchanged actions 25-29. Do not reopen with mismatched manager/router revisions or
with temporary implementations installed. Do not claim the repair is live until
founder execution and post-execution checks are complete.

## Preparation workflow (completed through submission)

1. Confirm funding and refresh capped fees/current guarded prestate. Do not
   overwrite a package already bound to a deployment/submission journal.
2. Commit/push this prepared scope and evidence. Validate compiled artifacts;
   deploy inert contracts with the authorized mainnet submitter and verify code
   plus immutable bindings. Journal each transaction before waiting for it.
3. Submit actions 0-24 and record actual on-chain proposal IDs/hashes. Do not
   substitute local-fork proposal IDs or predicted addresses for live evidence.
4. Release the tested repair-event backend projection before founder execution.
   Execute the paused sequence in order; stale state must revert, not be ignored.
5. Reconcile chain, API and real orbit displays before EXECUTING reopening actions.
   Deployment/submission are complete; actual upgrade execution and its live
   chain/API/UI verification remain pending.

Commands run from `staging-environment/smart-contract` after explicitly setting
`ID1_MAINNET_REPLAY_RPC` to the verified production RPC:

```powershell
node scripts/prepareId1ProductionPackage.js
# Following budget/state review, these are two SEPARATE authorized write steps:
$env:ID1_PRODUCTION_ACTION = 'DEPLOY'
node scripts/submitId1ProductionPackage.js
$env:ID1_PRODUCTION_ACTION = 'SUBMIT'
node scripts/submitId1ProductionPackage.js
```

Do not run the write steps until the account is funded and the current package
has been reviewed. Signing material is loaded privately, never committed or
printed. The runnable package and resumable broadcast journal live in the
workspace `tmp` directory. The funding blocker was subsequently resolved; see
the latest status above. Do not rerun preparation over the existing broadcast
journal or submit duplicate proposals.
