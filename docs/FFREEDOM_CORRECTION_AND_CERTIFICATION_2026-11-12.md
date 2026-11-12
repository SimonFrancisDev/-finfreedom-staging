# F-Freedom correction and certification ledger

## Authority and boundary

The approved business rule is Lady Sabina's placement specification, together
with the confirmed normal escrow/recycle rules. A participant receives a valid
primary position even when skipped uplines lead to ID1. Additional terminal
payment portions to ID1 do not create additional positions in the same event.
No-referrer participants have the same structural rights as ID1 downlines.
Payment allocations follow actual matrix relationships; liquid payments,
upgrade escrow and recycle reserves must remain distinct.

Work is in `staging-environment` on the correction branch. This directory name
does not select a network. Production evidence is Polygon chain 137. Automated
development tests use disposable Hardhat chain 31337, not Amoy or production.
Both hosted staging services remain suspended. No production write, governance
submission, historical relocation or compensation is authorized by this ledger.

## Verified baseline

Read-only audit checkpoint: Polygon mainnet block 97182036.

| Component | Proxy / address | Implementation |
| --- | --- | --- |
| Registration | 0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5 | 0x2F2c5E43eBBf666E00a1a2d699256B2Eae6268f5 |
| LevelManager | 0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53 | 0x36017dd046653654dCF2CE52C2a44A1914b3998A |
| P4 | 0x1ED0b443c880Ba88F732c3F5915561A07B21F6B4 | 0xDCDF3e86B417eFfA411B75373F6596863f9B7bd8 |
| P12 | 0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b | 0xCD673bc614Ad2C1d6Bc4F888df7b31A7a468d078 |
| P39 | 0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb | 0x9255eD0c56371039Dd2fA70acA23421b1A530455 |
| Settlement router | 0xC1F7d1E68A624B896DA2881AFfC7De5B18a75B44 | Non-proxy |

These six runtimes matched compiler artifacts, normalizing constructor immutable
values where applicable. The escrow and token-controller artifacts checked did
not match their live implementations: identity verification for those dependencies
is OPEN, not passed. Founder ratios were eight equal shares of 1250/10000.
Reverify the complete bindings, runtime hashes, dependency pointers, owners,
guardian permissions and storage layouts before any upgrade proposal.

## Defects, reasons and acceptance criteria

| ID | Cause / risk | Required correction and proof | Status |
| --- | --- | --- | --- |
| F01 | Activation fallback bypassed primary placement | One proper ID1 occurrence for exhausted sponsorship | Candidate f861453; not live |
| F02 | Terminal payment components independently created ID1 mirrors | One ID1 occurrence per activation/re-entry, distinct financial receipts | Local correction; focused regression passed |
| F03 | Zero-referrer flags bypassed normal counters and recycle placement | Equal ID1-downline rights without rewriting permanent sponsor history | Local correction; levels 1/2/3 recycle regressions passed |
| F04 | Nested recycle bypassed two-contribution reserve collector | Every nested P12/P39 recycle waits for its complete reserve | Local correction; focused P12 and P39 reserve/release passed; wider certification open |
| F05 | Recycle mirrors used zero rule base and paid fragments liquid | Destination escrow/reserve window applies to the exact incoming fragment | Local correction; focused reserve regression passed; wider certification open |
| F06 | Cascade returned aggregate escrow with only outer beneficiary | Lock each amount for its own beneficiary; queue their upgrade checks | Local correction; synthetic and registration-driven P4 cascades passed |
| F07 | ID1 and nested re-entries omitted canonical-parent updates | Every primary re-entry records its actual parent; mirrors do not overwrite it | Local correction; focused parent regressions passed |
| F08 | Recycle owner earnings added twice; routed reserves counted as earnings | Earnings count liquid plus own upgrade escrow exactly once, exclude own recycle | Local correction; focused 18-vs-26 counter regression passed |
| F09 | Historical omitted/extra positions and inconsistent counters persist | Dependency-aware, funded and separately journaled historical repair | Open; paused manifest is not final |
| F10 | Tests/documentation encode conflicting old behavior | Correct the oracle, preserve negative cases, reconcile receipts and transfers | Old liquid/extra-position assertions corrected and rerun; wider certification open |
| F11 | P4 cascade input aliased the outer memory object before copying its source user | Separate nested input; prove the receipt identifies the preceding recycler | Local correction; source-user/receiver regression passed |

## Execution checklist

- [x] Identify production core implementation baseline without signing.
- [x] Record settled rules, known defects and unresolved certification gates.
- [x] Demonstrate new defects with failing regression tests before fixes.
- [x] Implement local settlement corrections; existing proxy storage layouts pass comparison.
- [x] Run focused regressions and the existing suite; investigate both failing old assertions and rerun them.
- [x] Validate artifact ABI changes, runtime size and old-to-new storage layouts; paired upgrade required.
- [ ] Complete escrow/controller identity and dependency verification.
- [ ] Reconcile legacy reserves, counter gaps, duplicate branches and descendants.
- [ ] Rebuild and complete the current-state historical repair rehearsal.
- [ ] Verify source and derived event accounting in backend/UI projections.
- [ ] Run independent adversarial certification described below.
- [ ] Review exact mainnet governance payload, funding and rollback boundaries.
- [ ] Obtain authorization for the exact live upgrade/repair package.
- [ ] Execute authorized package and verify chain/API/UI at one pinned checkpoint.

## Adversarial certification, after corrections

This is not a second run of only the happy-path tests. Keep an independent
expected ledger and deterministic seeds; report each failing seed and smallest
reproducible sequence. Do not derive the expected answer from contract output.

1. Cover all ten levels, all P4/P12/P39 positions, every escrow boundary and both
   final reserve arrivals, with next level active/inactive and first/later cycles.
2. Cross explicit-ID1, zero-referrer and skipped-sponsor paths; test skip depths
   1, 5, 6, 63, 64 and overflow; verify atomic rollback at the configured bound.
3. Activate skipped sponsors before, during and after downstream growth. No
   mid-cycle capture; correct sponsor selection on genuine recycle only.
4. Exercise repeated wallet occurrences, full branches, free first-ring slots,
   distinct roles reaching the same wallet and terminal ID1 deduplication.
5. Cascade multiple P4/P12/P39 recycles into escrow windows, first/second reserve
   windows and full orbits. Check per-beneficiary escrow, fresh parent, reserve
   conservation, once-only reset and unchanged unrelated branches after each step.
6. Mix manual upgrades, automatic upgrades, surplus escrow, rejected transfers,
   paused dependencies, unauthorized callers and failed token rewards. Failure
   must not leave partial placement, payment, reserve or counter changes.
7. Reconcile USDT balance deltas, system charges, founder shares, escrow, reserves,
   earnings, detailed receipts, cycle archives and token rewards per transaction.
   Additional positions or receipts are not evidence of additional transfers.
8. Run deterministic randomized sequences repeatedly with multiple seeds and
   invariants checked after EVERY action, not only at the end.
9. Replay audited historical cases on a pinned mainnet fork. Verify source chain
   137 and local execution chain 31337; label synthetic balances explicitly.
10. Use the saved canonical test-wallet identities only in a controlled local
    fork/test environment. Their possession does not authorize mainnet signing.
11. Verify historical repair rejection for changed state, insufficient funding,
    replayed execution, wrong chain/proxy, unauthorized executor and collisions.
12. Validate actual desktop/mobile orbit visuals against chain snapshots and API
    responses, including history, earnings, copyable identities and reserve state.

Certification requires recorded outcomes for every gate. Existing green tests,
a successful compile or a local repair simulation are not production approval.

## Regression evidence and integration boundary

The first focused run against the pre-correction candidate reported **0 passing,
9 failing**. These were synthetic Hardhat fixtures, not newly established losses
on Polygon mainnet. The cases were:

- Missing no-referrer recycle positions at levels 1, 2 and 3.
- A second ID1 position for the same P12 recycle's terminal payment.
- An earnings-counter increase of 26 USDT instead of 18 USDT. This assertion did
  not establish a duplicate token transfer.
- A stale structural parent after primary re-entry into ID1.
- A nested P12 reserve contribution bypassing the two-contribution collector.
- A recycle spillover paid liquid despite arriving in a reserve window.
- Cascaded P4 escrow credited to the outer receiver instead of its beneficiary:
  the upper wallet's expected balance was 2 + 9 = 11 USDT, but remained 2 USDT.

The correction adds beneficiary-specific escrow locking through a self-only
manager callback, delays resulting upgrade checks until settlement is complete,
records each primary recycle's parent, and uses ordinary destination placement
rules for recycle spillovers. Extra terminal ID1 portions remain financial only.
Each cascade input must be a separate memory object: aliasing a parent input can
mislabel the source user and outer receipt even when token transfers are correct.

Compilation exposed Solidity IR stack limits while integrating these paths.
Temporary input/result structures address that constraint without changing
compiler optimizer settings. Compilation, baseline layout comparison and
runtime-size checks subsequently passed. This does not establish live upgrade
authorization or resolve the outstanding dependency-identity checks.

The router's `settleRecycle` input ABI changes to a tuple. The manager and router
declare settlement revision 2 and reject mismatched revisions. They therefore
form one upgrade unit: do not upgrade only one component and resume traffic.
A reviewed atomic governance batch, or a paused upgrade with both pointers
verified before reopening, is required. The router is not a proxy; a matching new
router would be deployed and configured only after authorization. Existing
historical-repair rehearsal now keeps all affected contracts paused until both
revisions and the new router binding are verified. That revised rehearsal has
not yet been executed end to end.

Focused reproduction command, from `staging-environment/smart-contract`:

```text
node node_modules/hardhat/internal/cli/cli.js test --network hardhat --no-compile test/audit-readiness.test.js --grep ID1.settlement.adversarial
```

Additional tests cover whole-fixture USDT supply conservation, a fully funded
registration-driven cascade, unauthorized escrow credit and old-router rejection.
The boundary fixtures deliberately seed orbit state; they are not substitutes
for the end-to-end and pinned-history certification gates above.

Test sequence:

1. First post-correction focused run: **12 passing**, exit code 0.
2. Complete existing Mocha suite: **192 passing, 2 failing**. The six separate
   historical-plan Node test cases also passed. Both Mocha failures expected
   liquid recycle spillovers despite destination escrow windows.
3. Strengthened focused rerun: **14 passing**, exit code 0. P12's 10 USDT and
   P39's 8 USDT were proved to increase the correct beneficiary's upgrade escrow,
   not liquid balance. Stored position rules matched. The tests still assert
   sponsor/founder payouts and valid mirror placement; no contract was changed
   to silence those two failures.
4. Expanded rerun: **15 passing, 0 failing**, exit code 0, including direct P39
   nested-reserve coverage, exact eight-founder/system-charge balance deltas,
   cascade source identity, unauthorized callback rejection and old-router
   rejection. Machine-readable evidence is
   `docs/evidence/id1-settlement-regressions-2026-11-12.json`.

The final combined suite was not rerun in a single invocation after the test-only
strengthening. Report the outcomes above, not a fabricated full-suite green run.
The full run regenerated the canonical trace under `smart-contract/test-reports`;
those named wallets and receipts belong to disposable local tests, not mainnet.

Offline artifact validation passed for RegistrationFixed, LevelManager, P4Orbit,
P12Orbit, P39Orbit and LevelSettlementRouter against the saved baseline. Evidence:
`docs/evidence/id1-candidate-artifacts-2026-11-12.json`. The validator checks each
artifact's actual source dependency closure, storage compatibility, function/event
signature removals, router unstructured reserve slots/structs and the 24,576-byte
runtime limit. LevelManager is 24,043 bytes
(533 bytes of headroom); the router is 18,738 bytes. The only removed signature is
the explicitly reviewed internal router `settleRecycle` signature. No existing
application-facing function or event signature was removed.

```text
node scripts/validateId1CandidateArtifacts.js ../../tmp/id1-pre-change-build-info ../docs/evidence/id1-candidate-artifacts-2026-11-12.json
```

Legacy reserve amounts/cycles and the compatibility of live escrow/controller
implementations remain open. Do not infer live reserve solvency from mock-token
supply conservation, or a complete backend accounting audit from ABI tests.

## Immediate continuation

1. Finish identifying the exact live escrow/controller implementations and
   reconcile legacy reserves/counter gaps and descendants of duplicate entries.
2. Refresh and run the pinned mainnet-fork historical-repair rehearsal with the
   compatible manager/router pair. No historical move or 512-USDT adjustment is
   executed on mainnet by this local work.
3. Complete the adversarial certification and backend/UI projection checks,
   then review a separately authorized, funded governance package. Production
   and the two suspended staging services remain unchanged in this pass.
