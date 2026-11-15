# Combined repair: founder execution checkpoints

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
