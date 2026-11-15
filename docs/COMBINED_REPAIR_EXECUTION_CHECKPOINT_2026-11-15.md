# Combined repair: founder execution checkpoints

Latest checkpoint: proposals **216-223 are executed**, the eight temporary
repair implementations are verified, and the starting records still match.
Next: **224 then 225**, followed by verification of the repair results before
final operating installations. Keep the programs paused. See the installation
checkpoint below. Earlier next-action sections are historical, not instructions
to repeat completed proposals.

## Temporary implementation checkpoint

Verified at block **97357977**, 15 November 2026, **11:33:55 UTC**.
Block hash: `0x80a2136e7c90761b8b278432958b56aa68ccbba8bae9eec82b3a4d34f5dc3f41`.

- Mainnet chain ID and governance runtime matched the recorded bindings.
- Governance logs since block 97355944 show 216-223 executed in ascending order.
- All proposal targets, zero values and calldata hashes for 216-256 match the
  submitted package. Governance proposal count remains 257.
- Proposals 224-256 remain unexecuted, uncancelled and without confirmations.
- All twelve affected program contracts remain paused.
- All eight installed temporary implementation addresses and runtime hashes
  match the recorded deployed package.
- Each temporary implementation's proxy, executor, plan hash and chain binding
  matches its deployment arguments; each reports repairExecuted = false.
- Both repair executors report executed = false.
- Direct reads through the installed implementations confirm all six F-Freedom
  and five Freedom Plus guarded orbit hashes still match the required prestate.
- F-Freedom permanent sponsors, previous matrix parents, registrations and
  required level activations still match the registration repair prerequisites.
- This pass only read chain state. It did not sign or broadcast transactions.

| Proposal | Block | Installation execution transaction |
| ---: | ---: | --- |
| 216 | 97356787 | `0x46fa66cbea156cdd6a20b9d8998d006d5283186e2e51d83e29f0a01cdd84ea9a` |
| 217 | 97356804 | `0x246c859a71e2611c7274850f61a35130e280c96a31da9371b783897e1c91bd84` |
| 218 | 97356832 | `0x4da9487b16ba9a9e6e0cd8adbace06c79592ea4dec09881c87646ab3a04d48bf` |
| 219 | 97356849 | `0xbe650adecf645ba9b1719044cccfcec9fe404a5de862c32fe8e4c497ede824c1` |
| 220 | 97356879 | `0xe80d04a5d70c5f1d71a5bd4fa94a793516a85d060235d851b8e216cd23dd80da` |
| 221 | 97356896 | `0xbee984ede1cf7a2b2b33b94ee3f4b80a1baf1dfe48e472db8b4039cf133931f6` |
| 222 | 97356933 | `0x92b392adcdf6d8495e53a79c2b21055640d630e2591e11510b1217a97e95205a` |
| 223 | 97356965 | `0x1e57a9c9f3b1e0764e2929e3d6e9c284808a9aa00c2d3c55f85b6e89ab445404` |

Founders can next approve and execute **224 (F-Freedom repair), then 225
(Freedom Plus repair)**. Report the results for read-only receipt, position and
accounting verification before proceeding to final operating installations.
Do not skip to reopening; 245-256 remain on hold. This checkpoint is not proof
that either historical repair has already run.

## Earlier pause checkpoint

The post-pause guarded-record check passed at block 97355943, 15 November 2026,
10:43:04 UTC. Proposal 212 was executed before 204; no later-phase proposal was
executed then. See the [execution-order incident record](COMBINED_REPAIR_PAUSE_ORDER_CHECK_2026-11-15.md).

## Scope

Read-only verification on Polygon mainnet, chain ID 137. No signing key was
loaded and no transaction, deployment, application change, environment edit,
database write or service restart was performed by these checks.

Governance: `0x785cC854ce9e13CE1140cbFD7C08620713E1711d`.

## Cancellation checkpoint

Verified at block **97344295**, 15 November 2026, **05:51:52 UTC**.
Block hash: `0x6b594f27231fa9cabfade226bbf6af733fa3319761ec120af81303d4cefd2dfb`.

- Withdrawn originals 130-159: all cancelled, none executed.
- Cancellation proposals 160-189: all executed, each with three confirmations.
- Replacement proposals 190-256: none executed or approved at this checkpoint.
- All twelve affected contracts remained unpaused.
- F-Freedom bindings, guarded repair states and relevant parent records matched
  the submitted package. All five affected Freedom Plus orbit-state hashes
  matched, including the planned empty destinations.
- This was a pre-maintenance comparison, not the mandatory post-pause check.

## Implementation-permission checkpoint

Verified at block **97353534**, 15 November 2026, **09:42:50 UTC**.
Block hash: `0x131d790b6e963fbdefb0ad5c80967ea05ee63fb3a0a46322c60af84e4768bef9`.

- Governance runtime hash matched the recorded mainnet multisig.
- All 67 replacement proposal targets, zero native values and calldata hashes
  matched the submitted package; governance proposal count remained 257.
- Proposals **190-203: all executed**, none cancelled.
- Proposals **204-256: none executed, none cancelled, zero confirmations**.
- All 22 permission entries authorized by proposals 190-203 were read back from
  the Guardian and were true: four proxy permissions and eighteen implementation
  permissions.
- F-Freedom registration, manager, P4, P12 and P39: all unpaused.
- Freedom Plus registration, manager, router, P39, P14, P12 and P6: all unpaused.
- F-Freedom repair executor
  `0xd952d21B114F54C1259470b1693893F4D0Dd50Ed`: executed = false.
- Freedom Plus repair executor
  `0x9bb75E6F09B94428547555d900a66bf21B246e34`: executed = false.

The permission batch succeeded. It has not applied the historical repair or
installed the preventive implementations into the operating proxies.

## Exact next action

During the agreed maintenance window, founders may approve and execute
**204-215 in order**, pausing the affected contracts. **Stop after 215.**

Before authorizing 216, verify every required pause and refresh the actual
guarded repair states, bindings and destination positions. The earlier matching
state must not substitute for this post-pause verification.

Keep 216-256 on hold until the relevant execution gates are released. In
particular, 245-256 must not be approved or executed before final post-repair
chain, financial-record, backend and displayed-position reconciliation.

See [the complete founder execution guide](FOUNDERS_COMBINED_REPAIR_EXECUTION_2026-11-14.md)
and [the submitted proposal evidence](evidence/combined-repair-live-proposals-2026-11-14.json).
The submission evidence describes the earlier submission checkpoint, not these
subsequent founder executions.
