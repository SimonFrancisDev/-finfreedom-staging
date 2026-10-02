# Freedom-Plus Inactive-Orbit Incident

## Decision

This is a confirmed smart-contract defect, not a display-only issue.

Before this correction, a paid Freedom-Plus activation resolved inactive
recipients when distributing USDT, but recorded the participant in the direct
sponsor's orbit first. Therefore a sponsor could accumulate positions at a
level the sponsor had not activated. Activating that level later exposed those
old positions and could make the sponsor earn or recycle before a new eligible
downline entered that level.

Production Freedom-Plus remains paused. It must not be opened until its router
proxy uses the corrected implementation.

## Staging evidence

The post-reset Amoy history contains three violations of the intended rule:

| Level / orbit | Placement block | Transaction | Inactive orbit owner | Participant | Later activation |
| --- | ---: | --- | --- | --- | --- |
| Level 4 / P6 | 49067955 | `0x1bfd96...3729` | `0xafa5B8b830051A8b7E60765312D8BB7c5c8927Ad` | `0xdCB1...04af4` | Block 49068847 |
| Level 5 / P4 | 49068222 | `0x9d4f99...b59f` | `0xafa5B8b830051A8b7E60765312D8BB7c5c8927Ad` | `0xdCB1...04af4` | Block 49068908 |
| Level 6 / P4 | 49074075 | `0x6eb21...9d4f` | `0xafa5B8b830051A8b7E60765312D8BB7c5c8927Ad` | `0xdCB1...04af4` | Never activated in the inspected range |

The abbreviated transaction and participant values above identify the audited
records without turning this incident note into a replacement for the complete
machine-readable activity evidence under `smart-contract/test-reports`.

## Root cause and correction

`FreedomPlusSettlementRouter._recordSource` previously used the raw sponsor as
the source orbit owner. `_resolveRecipient` was called only later for payment
components. Eligibility therefore affected payment routing but not placement.

The corrected router resolves the first exact-level eligible recipient before
calling `recordPosition`. That resolved address is now used consistently for:

- source orbit ownership;
- source placement;
- structural parent input; and
- payout component construction.

The required invariant is now:

> An address with an inactive Freedom-Plus level receives neither money nor an
> orbit position at that level. Later activation starts that level with zero
> historical positions.

## Temporal skip and recycle invariant

Skipping is a placement decision for the current activation event. It does not
replace the participant's permanent sponsor.

For a permanent chain `A -> B -> C`, where `A` is active and `B` is
inactive at level `L`:

1. `C` activating level `L` places `C` under `A`.
2. `B` receives no position or payment from that activation.
3. `B` activating level `L` later does not move `C`, recover the old
   payment, or populate `B`'s orbit retroactively.
4. When `C` later recycles at level `L`, sponsor resolution starts again
   from `C`'s permanent sponsor.
5. If `B` is then active, the recycle places `C` under `B`. If `B`
   remains inactive, resolution continues to the next eligible permanent
   upline.

This behavior is now covered by executable chronology tests in both programs:

- F-Freedom P4: permanent sponsor retained, initial placement skipped, later
  activation caused no historical movement, and recycle re-entered under the
  now-eligible sponsor.
- Freedom-Plus P4: the same sequence passed using the corrected settlement
  router.

These tests prove the logical implication of permanent sponsorship,
event-time exact-level eligibility, and recycle-as-a-new-placement. They also
prevent a matrix parent from silently replacing the permanent sponsor chain.

## Validation completed

- Freedom-Plus inactive exact-level skip and later activation: pass.
- Freedom-Plus all seven levels never prefill an inactive sponsor: pass.
- Freedom-Plus routed final-two-arrival reserve and recycle: pass.
- Freedom-Plus mixed final-two-arrival reserve and recycle: pass.
- F-Freedom inactive sponsor skipping at every configured level: pass.
- F-Freedom inactive P12/P39 matrix-recipient normalization: pass.
- F-Freedom inactive connected P12 and P39 parent skipping: pass.
- F-Freedom deep inactive-chain bound: pass.
- F-Freedom skipped-participant return on recycle chronology: pass.
- Freedom-Plus skipped-participant return on recycle chronology: pass.
- Frontend/backend ABI reconciliation: pass.
- Proxy migration storage-preservation checks: pass.
- NFT mint, lock/unlock, tier change, 50/30/20 monthly allocation, empty-tier
  retention, retry, cutoff and duplicate-period checks: pass.
- Canonical behavior trace regenerated on 2026-10-02.

## Deployment requirements

1. Validate the corrected build against the current Amoy and Polygon router
   proxies with OpenZeppelin's UUPS storage-layout validator.
2. Deploy one corrected implementation per network.
3. Have governance approve the proxy and implementation in each network's
   Guardian, then execute `upgradeToAndCall` through the multisig.
4. Keep production registration paused throughout the upgrade and verification.
5. Staging's existing invalid positions cannot be repaired by this code upgrade.
   Reset/redeploy staging after the upgrade or explicitly migrate every affected
   orbit from a fully reconciled chain report. A fresh reset is the safer test
   environment choice.
6. Run the canonical wallet journey after the clean staging reset before opening
   mainnet early access.

## Current blocker

On 2026-10-02 the configured Amoy RPC terminated both read-only live-proxy
validation attempts with an OpenSSL TLS internal error. No live upgrade was
submitted and no failed RPC attempt is counted as validation evidence.

Polygon storage-layout validation passed against router proxy
`0x8C88262595cbEAA5FffB60a0689b3EAbe22B0498`. The corrected implementation was
deployed, but not activated, at `0x668536AE74B229a3f33A2f46fbFc91BbC67aC799`
in transaction
`0xa714747d54558f9d189f1fce7939171f3c74ab97f80de6766e5db99f254a675f`.

The configured deployment signer `0x296238e950ef0066D2119230Bf0eb3aDEBc94882`
is neither an owner nor an authorized proposal submitter. Governance submission
must use authorized submitter `0x884e48f9897E8633238747b608DD49dE12bF94df`,
then owners must approve and execute the Guardian implementation approval and
router proxy upgrade. The production proxy remains on its old implementation
and the program must remain paused until those actions are verified.
