# Release work record: 2026-10-01

Target launch: 2026-10-01 20:00 UTC. Production readiness remains unconfirmed.

## Confirmed recycle defect

Freedom-Plus routed payments recorded financial orbit arrivals but skipped the
recipient orbit's final-ring recycle reserve. Direct arrivals used the reserve
path correctly. The live certification assertion was valid, not outdated.

Amoy evidence for Account 8 (`0x8844a10391801d5b1a4273588F8c6bF1DFE06E36`):
- P39 `0xF8D13086327BB762E30689BA9036185EB1D15bfb`, Level 1, cycle 0.
- Filled positions: 38/39. Final-ring arrivals: 26. Closed: false.
- Reserve: 0. Consumed: false. Required first contribution: 25 mock USDT.

The corrected router retains the 50% routed component on the qualifying final
arrivals and executes funded recycling when the full level price is accumulated.
Its accounting excludes reserved components from liquid participant payments.

## Verification completed

- F-Freedom live priority certification P0-P16 passed in the existing reports.
- F-Freedom targeted tests: 3 passed (P12 mirrored reserve, P12/P39 two-fill release).
- Freedom-Plus routed-final-arrival regressions: 4 passed (P39/P14/P12/P6).
- Freedom-Plus settlement suite after the fix: 24 passed.
- Mixed routed/direct final-arrival tests: 4 passed.
- Funded staging repair test: 1 passed, including access control, insufficient
  allowance, repeat rejection and successful recycling after recovery.
- F-Freedom's shared mirror path already routes recycle contributions correctly.

## Staging recovery

An implementation upgrade cannot recover the 25 mock USDT already paid out.
The temporary `FreedomPlusStagingReserveRepair` implementation restricts recovery
to the audited Account 8 Level 1 cycle 0 at exactly 38 positions and 26 final-ring
arrivals. It requires owner authorization, checks the routed financial position,
pulls exactly 25 mock USDT from Account 8 with allowance, verifies the transfer,
and rejects a second repair. It supports Amoy and local tests only.

Recovery validation and deployment completed through multisig transaction 21.
Implementation: `0x25ce7d3328Db65aaBf7D80B2e05C72f20E58415A`.
Upgrade and atomic repair transaction:
`0x6b62c565baaa39a6b082f2b84f411c2390977ed836f1a0cb3d13201129e6420e`.
Evidence: `smart-contract/test-reports/freedom-plus/router-upgrade-1790825166784.json`.
The repair implementation must
not be selected for Polygon mainnet. Production uses the base corrected router.

## Additional completed live certification

- Freedom-Plus Levels 1-7 passed on Amoy. Evidence:
  `smart-contract/test-reports/freedom-plus/core-1790825242931.json`.
- NFT membership certification passed for FPT-only, FGT-only and mixed backing,
  including unlocking 5,000 FGT, restoring eligibility, upgrading and downgrading.
  Evidence: `smart-contract/test-reports/freedom-plus/nft-membership-1790825960241.json`.
  This does not certify reward-period creation or reward claims.
- Account 8 earned prerequisite FGT through F-Freedom Levels 5-10. Evidence:
  `smart-contract/test-reports/freedom-plus/nft-fgt-prerequisites.json`.
- A hosted staging API health check passed. The observed Freedom-Plus
  reconciliation passed with 45 chain/database participants, 273 raw position
  events/projected positions and 251 raw payment events/projected payments.
  This is a point-in-time observation, not an independent full-chain audit.
- Fix and staging recovery committed and pushed as `abfb554`.

## Remaining release checklist

- [x] Validate and execute the funded staging recovery through existing governance.
- [x] Finish live Freedom-Plus Levels 1-7 certification and preserve receipts.
- [x] Finish live NFT membership certification for FGT, FPT and mixed balances.
- [ ] Certify NFT reward-period eligibility, proofs and claims.
- [ ] Verify reported referral, wallet, activation, orbit and mobile UI issues.
- [ ] Reconcile hosted indexed data and confirm RPC usage under actual workflows.
- [ ] Confirm the three-representative configuration and final rehearsal scope.
- [ ] Complete end-to-end staging rehearsal and tester acceptance.
- [ ] Commit and push the reviewed release, with secrets and generated caches excluded.
- [ ] Prepare production backup, upgrade compatibility and recovery instructions.
- [ ] Deploy the approved production release and verify before opening broadly.

No production deployment or production reset is recorded by this document.
