# Gate 1 Business Rules

Status: Approved
Specification date: 2026-08-27
Reference baseline: `docs/GATE_0_BASELINE_AUDIT.md`

## Purpose

This specification freezes the intended behavior of F-Freedom, Freedom-Plus, and the shared Freedom NFT program before contract remediation, deployment selection, backend reconciliation, or page-by-page frontend work. Contract behavior recorded here is descriptive until marked Approved.

## Approved Architecture Decisions

1. F-Freedom remains the mandatory gateway into Freedom-Plus.
2. Freedom NFT is one ecosystem-wide membership and rewards program.
3. F-Freedom and Freedom-Plus use the same NFT Pool Vault.
4. F-Freedom and Freedom-Plus use the same Operations Vault.
5. A participant keeps the permanent sponsor inherited from F-Freedom.
6. A Freedom-Plus sponsor is not required to join Freedom-Plus before their downline can register.
7. ID 1 is the fallback sponsor only when F-Freedom returns no permanent sponsor.
8. Shared pages must provide equivalent program-specific views without changing their established visual and behavioral foundation.

## Registration And Sponsorship

Current Freedom-Plus contract behavior:

1. The wallet must already be registered in F-Freedom.
2. F-Freedom Level 1 must be active.
3. The permanent sponsor is read from F-Freedom registration.
4. A zero sponsor falls back to ID 1.
5. Any sponsor supplied to registration must match that permanent sponsor.
6. The sponsor does not need an existing Freedom-Plus registration.
7. Freedom-Plus registration and Level 1 activation are one atomic transaction.
8. Later levels must activate sequentially.

Required interface behavior:

1. Preflight distinguishes wallet/network, F-Freedom registration, Level 1 eligibility, sponsor recovery, balance, allowance, gas, and contract readiness.
2. A missing indexed sponsor must trigger authoritative recovery before showing a blocking error.
3. Approval and registration are separate visible transaction steps.
4. Known custom errors must be decoded into precise user messages.
5. Success waits for confirmation and reconciles indexed state without forcing repeated transactions.

## Levels And Orbit Engines

| Level | Price (USDT) | Orbit | Positions | Rings |
|---|---:|---|---:|---:|
| 1 | 50 | P39 | 39 | 3 |
| 2 | 150 | P14 | 14 | 3 |
| 3 | 450 | P12 | 12 | 2 |
| 4 | 1,350 | P6 | 6 | 2 |
| 5 | 4,050 | P4 | 4 | 1 |
| 6 | 12,150 | P4 | 4 | 1 |
| 7 | 36,450 | P3 | 3 | 1 |

Current payout allocation is 90% to participant settlement and 10% to system funding. Orbit payout percentages are:

| Orbit | Ring or position allocation |
|---|---|
| P39 | 20%, 20%, 50% |
| P14 | 15%, 25%, 50% |
| P12 | 40%, 50% |
| P6 | 40%, 50% |
| P4 | 90% |
| P3 | 90% |

Orbit interfaces must preserve the F-Freedom interaction model: visible rings, evenly distributed nodes on each ring, parent relationships, direct and indirect downline states, animated next-to-fill path, solid relationship paths, filled/unfilled/next states, node details, explorer links, and zoom controls for large views.

## System Charge And Shared Vaults

Every paid activation allocates:

1. 90% to orbit participant settlement.
2. 8% to the shared NFT Pool Vault.
3. 2% to the shared Operations Vault.

This rule applies to both F-Freedom and Freedom-Plus. Freedom-Plus must not deploy or fund program-specific replacements for either shared vault.

Current deployment tooling conflicts with this rule because it deploys separate Freedom-Plus vaults. Environment variables cannot repair recipients already stored in deployed contracts. Gate 2 must determine whether a storage-compatible UUPS upgrade can safely change recipients or whether a replacement deployment is required.

## Tokens And Recycling

Current Freedom-Plus contract behavior:

1. The first activation of a level mints FPT equal to that level's activation price.
2. A funded recycle mints FPTr equal to half of that level's activation price.
3. Mint-deduplication prevents duplicate rewards for the same activation or recycle.
4. Only the Level Manager may invoke the token controller.
5. Recycle settlement re-enters the normal settlement path with bounded recursion.

Current recycle triggers:

| Orbit | Qualifying arrival or position |
|---|---:|
| P39 | 26 |
| P14 | 7 |
| P12 | 8 |
| P6 | 3 |
| P4 | 4 |
| P3 | 3 |

## Freedom NFT Membership

Current contract behavior:

1. Membership is represented by a non-transferable ERC-721 token.
2. Qualification uses the exact combined value of FGT and FPT.
3. Tokens are locked, not burned.
4. Tier changes burn the old membership NFT and mint a new one while rebalancing locks.
5. Partial unlock can suspend reward eligibility until the exact deficit is restored.

Current qualification thresholds:

| Tier | Combined FGT + FPT requirement |
|---|---:|
| Foundational | 5,700 |
| Intermediate | 18,700 |
| Advanced | 62,000 |

## Freedom NFT Rewards

Current contract behavior:

1. Reward periods are monthly.
2. The owner creates a period after its cutoff.
3. Eligibility and amounts are committed through a Merkle root.
4. Each wallet can claim once per period with a valid proof.
5. The shared NFT Pool Vault reserves and disburses the configured reward token.
6. The vault permits one configured reward distributor.

Current tier allocation is 50% Foundational, 30% Intermediate, and 20% Advanced.

## ID 1 And Genesis

Current deployment behavior initializes ID 1 with all seven levels active and creates four genesis representatives sponsored by ID 1 with all seven levels active. This must be preserved only if explicitly accepted as the canonical launch rule; it must not be silently reproduced in production.

## Data And Presentation Contract

1. Indexed APIs are the primary source for registration, levels, orbit placement, payments, rewards, activity, dashboard, and account summaries.
2. Direct RPC is reserved for transaction preparation, authoritative recovery, confirmation, and stale-index reconciliation.
3. Every indexed record must retain program, chain, contract, block, transaction, log, participant, sponsor, level, and orbit identity where applicable.
4. Dashboard, Account, and Activity must expose equivalent F-Freedom and Freedom-Plus sections through one persistent program switch.
5. Light and dark themes, typography, spacing, colors, modals, loading, empty, error, and responsive states must follow the established F-Freedom foundation.
6. NFT pages use the same shared profile and program foundations while presenting one ecosystem NFT state rather than duplicated program-specific memberships.

## Gate 1 Decision

The existing level prices, orbit mappings, payout percentages, recycle triggers, token rewards, NFT thresholds, NFT reward allocations, and genesis behavior are established program requirements. They are not reopened by this gate.

Gate 1 is approved. The unresolved work is implementation alignment: shared vault recipients, canonical deployment selection, indexed data completeness, and frontend parity.
## Exit Criteria

Gate 1 is closed. Gate 2 audits storage layouts, upgrade authority, vault recipient mutability, canonical deployment candidates, and deployment/remediation safety. No production deployment is authorized by this document.