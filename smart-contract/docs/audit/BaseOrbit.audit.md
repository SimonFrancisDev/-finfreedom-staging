# BaseOrbit Audit Notes

## Contract Role

`BaseOrbit` is the shared abstract base contract for P4, P12, and P39 orbit contracts.

It controls:

- orbit initialization
- position placement
- mirror placement
- recycle re-entry placement
- line tracking
- auto-upgrade window detection
- payout rule snapshot storage
- historical cycle snapshots
- current and historical orbit views
- escrow state marking
- LevelManager-only fill/mirror operations

---

## Access Control

Critical state-changing functions are restricted to `LevelManager`:

- `fillPosition`
- `mirrorPosition`
- `fillPositionDetailed`
- `mirrorPositionDetailed`
- `setFounderRepActivated`
- `settleEscrowState`
- `recordExternalEarning`

Administrative update functions are owner-only:

- `updateLevelManager`
- `updateEscrow`
- `updateRegistration`
- `updateGuardian`
- `pause`
- `unpause`

---

## Upgradeability

`BaseOrbit` uses UUPS upgradeability.

Upgrade authorization requires:

- owner authorization
- guardian validation

New implementations must be deployed contracts.

Storage layout must not be reordered.

---

## Placement Model

`BaseOrbit` supports:

- direct placement
- structural placement
- mirror placement
- recycle re-entry placement

Normal mirror placement may reuse an existing position if the user is already present.

Recycle re-entry intentionally uses a fresh slot and does not reuse an old position.

---

## Rule Snapshot Model

Each position can store a `StoredRuleSnapshot`.

The snapshot records the exact payout rule used at the time of placement:

- line
- line payment number
- auto-upgrade enabled
- founder no-referrer path
- owner amount
- spillover amounts
- escrow amount
- recycle amount
- spillover recipients

This prevents frontend/backend from recomputing old rules incorrectly.

---

## Historical Cycle Model

When an orbit fills, `_handleOrbitFull`:

1. increments total cycle count
2. stores live positions into historical cycle storage
3. stores line arrival numbers
4. stores activation metadata
5. stores mirror metadata
6. stores rule snapshots
7. clears live orbit positions
8. resets line counts and current position
9. notifies LevelManager about recycle completion

Historical data should be treated as immutable once stored.

---

## Auto-upgrade Detection

`_isAutoUpgradeEnabled` returns true only when:

- level is below 10
- orbit auto-upgrade is not completed
- orbit owner has activated the current level
- orbit owner has not activated the next level

This prevents showing or applying auto-upgrade logic after the next level is already active.

---

## Financial Truth

`BaseOrbit` calculates routing amounts, but it does not transfer USDT directly.

Final USDT movement is handled by `LevelManager`.

For account-level financial truth, backend should primarily index:

- `DetailedPayoutReceiptRecorded` from LevelManager
- escrow lifecycle events from AutoUpgradeEscrow

Orbit events are structural/routing truth.

---

## Important Events

Important indexer events include:

- `PositionFilled`
- `PaymentRuleApplied`
- `LinePaymentTracked`
- `EscrowUpdated`
- `AutoUpgradeTriggered`
- `OrbitReset`
- `SpilloverPaid`
- `PositionActivationLinked`

---

## Trust Assumptions

The system assumes:

- LevelManager is trusted to call fill/mirror functions correctly.
- Registration contract returns correct referrer and activation state.
- Guardian validates upgrades correctly.
- Derived orbit contracts implement payout percentages correctly.
- Derived orbit contracts resolve recipients correctly.

---

## Audit Focus Areas

Auditors should review:

- placement logic
- mirror/recycle re-entry logic
- historical cycle snapshot correctness
- rule snapshot correctness
- auto-upgrade window logic
- LevelManager-only access control
- owner-controlled dependency updates
- storage layout safety