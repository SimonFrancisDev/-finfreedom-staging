# RegistrationFixed Audit Notes

## Contract Role

`RegistrationFixed` is the registration and activation entry contract for the F-Freedom Program.

It handles:
- one-time user registration
- referrer assignment
- Level 1 activation during registration
- manual level activation after registration
- LevelManager-authorized auto-upgrade marking
- ID1/root wallet configuration
- UUPS upgrade authorization through owner + guardian validation

This contract does not custody USDT directly. Payment execution is delegated to `LevelManager`.

## Upgradeability

The contract uses UUPS upgradeability.

Upgrade authorization requires:
1. `onlyOwner`
2. a non-zero guardian
3. guardian approval through `IGuardian(guardian).validateUpgrade(address(this), newImplementation)`

The new implementation must be a deployed contract.

## Registration Flow

`register(address _referrer)` performs:
- LevelManager configured check
- ID1 wallet configured check
- duplicate registration check
- self-referral prevention
- referrer validation
- USDT balance check
- USDT allowance-to-LevelManager check
- registration state write
- referrer state write
- participant count increment
- LevelManager `markID1Downline`
- LevelManager `activateLevel(user, 1)`
- local Level 1 activation state write

## Security Controls

Current controls include:
- OwnableUpgradeable
- UUPSUpgradeable
- PausableUpgradeable
- ReentrancyGuardUpgradeable
- guardian-based upgrade validation
- contract-address validation for critical dependencies
- sequential level activation enforcement
- LevelManager-only auto-upgrade marking

## Gas Optimization Notes

Applied optimizations include:
- cached msg.sender
- cached levelManager
- cached id1Wallet
- cached usdt
- internal `_validateLevel`
- `unchecked` increments where overflow is unrealistic
- improved highest-level loop
- reduced repeated storage reads

No storage layout changes were introduced.