# ID1 primary placement correction and historical repair

## Scope and deployment status

This work implements the clarified F-Freedom rule supplied by Lady Sabina and
confirmed by the project owner. It is not a production deployment or database
repair. Production contracts, balances, referrals, hosted services, and the two
suspended staging services remain untouched.

- Code target: this repository's `smart-contract` directory.
- Evidence source: Polygon mainnet, chain ID 137.
- Execution target for tests/rehearsals: disposable local Hardhat, chain ID 31337.
- No Amoy transactions, production transactions, or private keys are needed.
- Existing unrelated NFT documentation and proposal-script changes are excluded.

## Rule being changed

The July 13 decision, recorded by commit `c2de52d` and the archived conversation,
deliberately routed exhausted-upline activations to ID1 without matrix positions.
The later clarification supersedes that exception. This is not merely a missing
frontend node or an indexing defect.

1. A real activation reaching ID1 creates exactly one primary position.
2. Payments follow that position's normal P4/P12/P39 rules, including the case
   where the activating participant originally registered without a referrer.
3. Additional terminal payment components to ID1 do not consume extra positions.
4. Legitimate ancestry mirrors remain: a P39 descendant can appear in its
   sponsor's first ring, the parent's second ring, and ID1's third ring.
5. Permanent referral links do not change. A skipped sponsor activating later
   does not take over an already established branch midway through its cycle.
6. The existing recycle reserve, self-payment fallback, founder sharing, and
   auto-upgrade rules remain in force. The fourth P4 position is archived when
   its orbit completes; it must not appear as an occupied slot in the new cycle.

## Source changes

- `LevelManager.sol`: always creates the primary position; uses the normal
  position-based settlement path instead of the old full-net founder exception.
- `LevelManager.sol`: an additional P39 terminal component to ID1 is liquid
  payment-only after the first ID1 ancestry component; it creates no second slot.
- `LevelManager.sol`: fallback diagnostics identify the skipped sponsor, actual
  primary slot/cycle and owner-component payment, not the full activation price.
- `BaseOrbit.sol`: new no-referrer paid positions count as arrivals and use normal
  rules. Historical rule snapshots and their legacy flag remain readable.
- No storage fields were added, removed, reordered, or repurposed.
- No registration, Freedom Plus, NFT, frontend, or backend source was changed.

## Evidence and validation

- Five new rule regressions failed against the pre-change compiled contracts.
- After the core correction, the F-Freedom audit suite passed 65 tests, including
  existing reserve, chained recycle, skip, auto-upgrade and migration tests.
- Follow-up coverage adds late sponsor activation, ID1 P4 cycle archival, and
  traversal through more than five inactive sponsors.
- Final full contract suite: **180 passing**, zero failures (11 minutes).
- Two subsequently added focused regressions: **2 passing**, zero failures:
  no-referrer ID1 P4 archival/recycle and more than five inactive sponsors.
- Final local mainnet-copy replay: **4 successful activations**, with the expected
  primary positions, the required level-8 mirror, and 512-USDT recipient delta.
- `git diff --check` passed for the changed contract/test sources.
- Candidate runtime templates and source hashes are in
  `evidence/id1-candidate-2026-11-12.json`; replay results are in
  `evidence/id1-counterfactual-2026-11-12.json`.
- Test-generated canonical trace files were preserved under the workspace's
  `tmp/id1-canonical-trace` and removed from this change's working diff.

The final replay explicitly supplied synthetic local USDT where later deposits
were absent from the November 1 fork: Sofia level 9 received 2,009.336578 local
USDT; Sabina level 8 received 739.032798, and level 9 received 1,856. These are
test-only balance adjustments, not mainnet funds or historical deposit claims.
The script logs them separately. No production signing keys or real funds were used.

The replay script is `smart-contract/scripts/rehearseId1PrimaryPlacement.js`.
It refuses non-Hardhat execution, requires an explicitly supplied mainnet RPC,
checks source chain ID 137, pins its fork to block 96536530, matches old runtime
bytecode to saved compiler output, and validates storage layouts before installing
candidate implementations on the local copy. Governance is bypassed only on
that disposable copy; this is not proof that a live proposal was executed.

All four baseline implementations matched compiler output and passed storage
comparison during the first rehearsal attempt:

| Contract | Original mainnet implementation |
| --- | --- |
| LevelManager | `0x36017dd046653654dCF2CE52C2a44A1914b3998A` |
| P4 | `0xDCDF3e86B417eFfA411B75373F6596863f9B7bd8` |
| P12 | `0xCD673bc614Ad2C1d6Bc4F888df7b31A7a468d078` |
| P39 | `0x9255eD0c56371039Dd2fA70acA23421b1A530455` |

That attempt stopped before replay because local implementation installation had
advanced the fork clock beyond the first historical timestamp. The script now
records both the historical timestamp and the simulated timestamp, advancing only
the local clock as necessary. A stopped attempt is not counted as a passing replay.

## Sofia and Lady Sabina: established evidence

Read-only checkpoint: mainnet block **97172146**, November 12, 2026 at
**06:07:55 UTC**. A bounded level-8/9 activation scan from block 96536531 to that
checkpoint found these four activations. This does not establish that there were
no earlier affected participants at other levels or before that interval.

| Participant | Wallet | Level | Time UTC | Activation ID |
| --- | --- | --- | --- | --- |
| Sofia, FFN-RYY84K | `0xEA2bCf620d164Af63fba2F832C5F37E9eABdC528` | 8 | Nov 1, 05:17:33 | 1126 |
| Sofia, FFN-RYY84K | `0xEA2bCf620d164Af63fba2F832C5F37E9eABdC528` | 9 | Nov 1, 05:18:54 | 1127 |
| Lady Sabina, FFN-DLJA7A | `0xb673c9D14Da920f187d25Cc793f1955a43284622` | 8 | Nov 3, 11:26:10 | 1132 |
| Lady Sabina, FFN-DLJA7A | `0xb673c9D14Da920f187d25Cc793f1955a43284622` | 9 | Nov 11, 08:15:55 | 1171 |

Transaction hashes, in the same order:

- `0xfcc07130e2dfe7eff8e4475220d4f120cbcb70c61324c03492bca07eb45c88d1`
- `0x2b6956b22f6f67b731285554f835263e05a583e48f02fed2791ec92ca1982e7c`
- `0xbd1fbc49599ec5564bbe378953ed06257f4c48debc0e2fe420b9c1af023a467f`
- `0x97587c5dbb628ec049794ba6b68503a4bfad08d5e501e503621fb282aa171b14`

On-chain registration identifies Lady Sabina as Sofia's permanent sponsor, not
the reverse. The correction must not rewrite that relationship to fit wording in
the group conversation.

Actual payment per activation:

- Level 8: 1,280 USDT paid; 1,152 to eight founders, 102.40 to NFT, 25.60 to OPS.
- Level 9: 2,560 USDT paid; 2,304 to eight founders, 204.80 to NFT, 51.20 to OPS.
- Sabina's level-8 transaction also returned 704 USDT from her earlier upgrade
  escrow. That was her own manual-override release, not a Sofia payment or repair.

## Candidate historical correction, not yet executed

Preserving earlier occupied positions, the expected correction is:

| Orbit | Sofia | Lady Sabina |
| --- | --- | --- |
| ID1 level 8 / P12 | Slot 3 | Slot 4, below the slot-1 occupant |
| ID1 level 9 / P39 | Slot 2 | Slot 3 |

The level-8 slot-1 occupant is
`0xE8b1ac47231651cCc38326a59645a8D976D0Eabf`.
Under the clarified rule, Sabina's level-8 activation would send 512 USDT (40%)
to that recipient and 640 USDT (50%) to the founder route, with the same 8% NFT
and 2% OPS charges. A corresponding first-ring mirror belongs in that recipient's
level-8 orbit. The recipient's next level was already active at the checked block,
so the isolated component simulation indicated liquid payment, not escrow.

The proposed 512-USDT adjustment is not already paid, is not automatically owed
by an arbitrary founder wallet, and is not authority to debit the NFT/OPS pools.
A funding source and exact correction ledger require explicit approval. Existing
transaction history must remain visible; a later adjustment needs its own record.

## Required gates before a live correction

- [x] Finish and record the final regression and isolated mainnet-copy results.
- [ ] Inventory affected live ID1 cycles, missing primary placements, and legacy
      no-referrer arrival counters. Existing positions excluded from counters
      cannot simply be ignored after adopting the new rule.
- [ ] Build a state-guarded, one-time repair manifest and rehearse it on a current
      mainnet copy. Abort if cycle, occupant, counter, balance, or parent differs.
- [ ] Verify reserves and future cycle completion after repair; do not manufacture
      reserves for payments that were already distributed under the old rule.
- [ ] Approve the exact historical monetary adjustment and its funding source.
- [ ] Prepare/review governance transactions for the bytecode-matched candidate
      manager and orbit implementations, with rollback/contingency instructions.
- [ ] Update backend projections from explicit correction events without erasing
      original receipts, charging users again, reminting rewards, or changing IDs.
- [ ] Compare backend/UI positions and values to chain, including mobile orbit
      displays, before announcing the historical case resolved.

## Reproduction

From this repository's `smart-contract` directory, local regression command:

```text
node node_modules/hardhat/internal/cli/cli.js test --network hardhat
```

For the explicitly configured local mainnet-copy replay, supply
`ID1_MAINNET_REPLAY_RPC` and `ID1_BASELINE_BUILD_INFO` (a directory containing the
preserved, bytecode-matched pre-change compiler build-info). Set
`ID1_ALLOW_SYNTHETIC_FUNDING=1` only for this counterfactual replay when missing
later deposits require explicitly reported local-only balance topups, then run:

```text
node node_modules/hardhat/internal/cli/cli.js run --network hardhat --no-compile scripts/rehearseId1PrimaryPlacement.js
```

The replay executes only the four selected counterfactual activations. It does
not replay every intervening transaction, repair today's live state, pay a real
recipient, or prove that all older affected accounts have been found.
