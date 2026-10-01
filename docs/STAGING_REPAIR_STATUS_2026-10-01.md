# Staging repair status - October 1, 2026

Scope: Polygon Amoy (80002), existing staging contracts only. No production
changes, reset, historical reimbursement or ID1 fund redistribution.

## Completed

- Validated router storage compatibility against the live staging proxy.
- Focused equal-eight-founder contract regression: 1 passing.
- NFT reward worker/schedule tests: 11 passing. These are local tests, not proof
  that the hosted worker is configured or that a monthly payout occurred.
- Prepared implementation `0x24beB4798483CEcb1c70ACA4b4aC2BCAcb30a2fe`.
- Recovered existing guardian proposal 22 after an RPC receipt error. No duplicate
  guardian proposal was submitted. Executed approval transaction:
  `0x7e5792a5304e3d0be13fd9e1859defec23e2a219489521066e3a226532e4f7ca`.
- Executed router upgrade and atomic founder configuration through proposal 23:
  `0x8c2f5a45c07380ae6e1748fd0ee4d8f3c5beae3b363efe20a6c83aa88dac73bf`.
- Verified active implementation and all eight payout addresses against staging
  F-Freedom's founder list (equal 1250 basis points each). The three genesis
  representatives are a separate configuration and were not changed.
- Added broadcast-hash journaling and bounded receipt polling to the executor.
  Explicit proposal recovery checks target, value, calldata and execution state.

## Live activation result

Canonical wallet `0x15C21633a9231f6DACc0eBFf6a790Bf0c20ad171` successfully
activated Plus Level 1 for 50 mock USDT, without additional funding:
`0x8b4717fd4c2d934e72193394d37999f32140ddd163463b5c68aa6513708ebb6e`.

Receipt transfers from the router:

| Recipient | Mock USDT |
| --- | ---: |
| 0x1aBcE5B912B4452D9FB09DBA4175275Aa8Fb3558 | 10 |
| 0x998be76968Fe24fFf8f59D93EeE3fE49653781BB | 10 |
| 0x3B7651dF08915f740a7eB079690327c4E8cCD3F0 | 25 |
| 0xF8a4F62fd253Aa2A036209F948Eec53810576fE7 | 4 |
| 0xB41B0C9593fbAcbBCb1Cb525c20F5A2332D02f12 | 1 |

This activation did NOT route an earning component to ID1. The initial smoke
assertion requiring founder events therefore failed, although the transaction
succeeded. Do not rerun registration or describe this as live founder-split proof.
The actual result is preserved in founder-split-live-smoke.json.

## Anthony's reported 10 USDT

The payment from Lady Sabina's activation is present in the successful receipt,
the FreedomPlusPayment record, and the hosted staging payments API for
`0x3a596f67585F27cfD7F449FeC0a92b7bf34B1df5`.
Transaction: `0x5f17ee1aaabdb19b39a83439634b02cbdee4c045bffef075854cf16035bae700`.
Amount: 10 USDT (10000000 base units). The API returned five payments totalling
75 USDT at inspection. A missing-payment or compensation claim is not supported
for this transaction. A different disputed transaction or UI view needs identifying.

## NFT findings and remaining work

- Current membershipOf for Lady Sabina's wallet
  `0xF0152a2490a854712fAe8FD32FFCD9729082A09d` returned all zero fields and
  false on the current staging membership proxy. This does not disprove a
  membership held before the staging reset, nor resolve the earlier unlock report.
- Current distributor rewardOperator() reverted without data. Operator-based
  monthly automation is NOT verified on the deployed contract. Compare its live
  implementation with the tested source before any separate upgrade/configuration.
- Demonstrate an actual post-upgrade ID1-routed component split to all eight
  founders, with receipt-level amounts and token transfers.
- Historical ID1 receipts remain unchanged; reconcile outflows before proposing
  any corrective payment. No historical money was moved by this upgrade.
- Verify hosted NFT operator/schedule, shared NFT funding and empty-tier retention.
- Remaining audit limits (index freshness, historical eligibility and UI cases)
  are tracked in STAGING_ACTIVITY_AUDIT_2026-10-01.md.

This is a verified staging repair with explicit outstanding checks, not a
production-readiness certificate. Do not blindly rerun the upgrade executor:
inspect the implementation and transaction journal first.

## Evidence

See smart-contract/test-reports/freedom-plus/: founder-split-prepared.json,
router-upgrade-1790872661707.json, founder-upgrade-transactions.jsonl,
founder-smoke-transactions.jsonl, founder-split-live-smoke.json and
nft-current-check.json. No signing keys are included.
