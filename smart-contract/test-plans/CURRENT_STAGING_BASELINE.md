# Current Staging Baseline Before Fresh Reset

Captured on 2026-07-12 before any fresh-reset write operation.

## Service State

- Staging API: healthy, MongoDB connected, indexer disabled.
- Staging worker: healthy, MongoDB connected, indexer enabled.
- Community read layer: live.

## Existing Dataset

- Chain registered count: 58.
- Chain total participants: 59.
- API total participants: 59.
- Paid activations: 169.
- Generated volume: 3518.00 USDT.
- Wallet-credited liquid: 2954.00 USDT.
- Current escrow locked: 344.00 USDT.
- Lifetime escrow locked: 576.00 USDT.
- Auto-upgrade used: 220.00 USDT.
- Recycle allocated: 235.00 USDT.
- Recycle liquid paid: 161.00 USDT.
- Recycle escrow locked: 46.00 USDT.

## Current Deployment

- Multisig and ID1: `0xCE8695048F81Feb7ea4C29b0Be63416c6132f8D7`
- Guardian: `0x847c54572A54c15D6F24E20dc17586Ff7ea01afE`
- Preserved MockUSDT: `0x7b7E39f3D177B3356368431C5C285bca58b43A60`
- Registration: `0x911A04Eaf3E37831103C430437168EF211dbc678`
- LevelManager: `0xcc2021a2A957281275A5A32Fd27c4092ab031B30`
- Settlement router: `0xD8c8EA4f601f8bc6a29aAb3591089c264265cC0a`
- Escrow: `0x74f9D8856cE17d0A609d1ED5Aa995EB059aAD067`
- P4: `0xF47EDD752dd48f00eB0Add8178de1d175911341a`
- P12: `0x69E7694591aBB6D860E8b05693F8DA179e28A0e7`
- P39: `0x2Af7F855C35c7122daED8D96c148ca8e319725df`
- FGT: `0x61883353e157fCF7F51e7198E58A30C421BDA7b1`
- FGTr: `0xD58a79598C9f99208aBF1D331c980e5De76B621B`
- Token controller: `0x6Fc24469d59D921f1E3E2e3F67d8EE04e981E73E`
- NFT pool vault: `0x22523f28de1ba281144709eF1735a5C951679350`
- Operations vault: `0x11c91E4f6Add453035DA8300B33AEfd7405BDafe`

The live graph validator passed code, ownership, ID1, LevelManager, registration,
escrow, settlement-router, and orbit-link checks.

## Controlled Wallet Inventory

- Wallets: 74 (`Account 8` through `Account 81`).
- Valid private-key/address pairs: 74.
- Invalid or missing keys: 0.
- Address/key mismatches: 0.
- Duplicate addresses: 0.
- Duplicate private keys: 0.
- Registered in the current deployment: 0.
- Unregistered: 74.
- Wallets with at least 0.05 POL: 74.
- Minimum POL balance: approximately 0.1728 POL.
- Wallets with at least 100 MockUSDT: 31.
- Minimum MockUSDT balance: 24 USDT.

MockUSDT funding will be normalized only after the fresh contract graph is validated.

## Blocking Configuration Finding

The local `smart-contract/.env` contains obsolete staging addresses, including an
obsolete USDT address. It must not be used to deploy or test the fresh candidate.
After deployment, it must be replaced from the generated deployment record and
validated against the worker, API, and frontend environments.
