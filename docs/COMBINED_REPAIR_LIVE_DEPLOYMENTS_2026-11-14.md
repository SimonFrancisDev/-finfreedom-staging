# Combined placement repair: inert mainnet deployment completed

**Later November 14 update:** all 67 replacement proposals are now submitted as
**190-256**. See the [submission record](COMBINED_REPAIR_SUBMISSIONS_2026-11-14.md)
and [founder instructions](FOUNDERS_COMBINED_REPAIR_EXECUTION_2026-11-14.md).
The figures and pending-submission notes below preserve the earlier deployment
record. The repair itself still requires founder execution and verification.

## Outcome

All **11** remaining inert contracts were deployed to **Polygon mainnet (137)**
and their runtime code and constructor bindings were verified. Five existing
implementations were reused without redeployment. No live proxy was upgraded,
no proposal was submitted/approved/executed in this pass, and no user payment,
placement, NFT rule, permanent sponsor or database record was changed.

The user's November 14 instruction authorized starting with the available POL,
superseding the earlier recommendation to fund the entire package first. The
runner checks affordability and the fee cap before each new transaction. It
does not require funding the later proposal submissions to deploy inert code.

## Exact fees

- Starting balance: **11.681034136955361768 POL**.
- Total deployment fees: **7.428325578177567834 POL**.
- Remaining balance: **4.252708558777793934 POL**.
- All 11 transactions succeeded, using nonces **353-363**.
- Confirmed deployment blocks: **97293096-97293303**.
- No failed, duplicated or automatic fee-replacement transaction was sent.
- An RPC read timeout interrupted the run after nine confirmations. The runner
  resumed from its saved journal, verified mined receipts and deployed only the
  remaining two contracts. It did not repeat any confirmed deployment.

See the [public receipt and binding evidence](evidence/combined-repair-live-deployments-2026-11-14.json)
for every full address, transaction hash, block hash, runtime hash and exact fee.
Private keys and signed transaction bytes are not included in repository evidence.

## Verified deployment addresses

| Contract role | Mainnet address |
| --- | --- |
| F-Freedom repair executor | `0xd952d21B114F54C1259470b1693893F4D0Dd50Ed` |
| F-Freedom P4 bound repair | `0x17eF38bffdA3F4FCa04ECc1e7111c5176Ef9507E` |
| F-Freedom P12 bound repair | `0xE62Bf2473606D465AA03601505E5A873F47AfDf5` |
| F-Freedom P39 bound repair | `0x1F4B8f4749F9d06ad052C0C2859EFb14183ED27F` |
| F-Freedom registration bound repair | `0x695740BBb37064D3c9DCF988439F8155013c58B8` |
| Freedom Plus preventive router implementation | `0x19727A58419fE2e06b5A5b3dF351f775b12abDA6` |
| Freedom Plus repair executor | `0x9bb75E6F09B94428547555d900a66bf21B246e34` |
| Freedom Plus P39 bound repair | `0x99526FBDD558Ba63931F9b99E5B2Eb2E4bD8b664` |
| Freedom Plus P14 bound repair | `0x5dcAbc1d354f5497164Fe27CdBB3F344a71d59C3` |
| Freedom Plus P12 bound repair | `0xeC83e9D46e1AD95bE1C6591f968EB5A24841E145` |
| Freedom Plus P6 bound repair | `0x37810FB89f71A675a35864A801e4eF5e91E41De0` |

These implementation/executor addresses are NOT replacements for the public
program proxy addresses in Render or Vercel environment variables. Those
existing proxy bindings remain unchanged.

## Founder-panel integration

The previously empty `repairProposalManifest.json` was generated from the exact
prepared package after deployment verification. It identifies all 67
replacement calls and both executor payloads. It does not approve or execute
them. Frontend commit **32046c4** was pushed to production `main`. Vercel
deployment **dpl_3BMrWUQAECMhsMztJquSYGLMpYvD** is Ready on the official domain.

At **2026-11-14 08:53:42 UTC**, the served bundle `index-v2pGx5DM.js` matched all
**67 exact targets and calldata payloads**. See the
[served-manifest evidence](evidence/combined-repair-served-manifest-2026-11-14.json).
The build can remove unused metadata such as receipt hashes; the verification
therefore checks the executable target/payload data, not unused display fields.
Application JavaScript was disabled for this inspection, with no API, RPC or
wallet activity. Unrelated Community and overlay work was not committed or
included in this release.

The existing production backend repair handlers and synchronized ABIs remain
deployed. The manifest update does not require restarting a backend or changing
any hosted environment variable. Both staging services remain suspended.

## Remaining submission budget

At block **97293578**, the 25-gwei-tip estimate for the **67 proposal submissions
alone** is **10.40611328962606414 POL**. The capped reserve with 20% gas and
base-fee headroom is **14.754832878323252103 POL**, leaving a capped shortfall
of **10.502124319545458169 POL** against the remaining wallet balance.

An additional **11 POL** covers that snapshot's reserve, not an unconditional
future price or confirmation guarantee. Requote immediately before submitting.
Founders' later approval and execution fees are separate. No cancellation
submission needs to be paid for again; proposals 160-189 already exist.

## Validation and remaining work

- Eleven local deployment/package/fee tests passed. The deployment runner rejects
  changed calldata, wrong network, wrong constructor chain, wrong sender/nonce,
  nonzero native value and fees above the reviewed ceiling.
- Every deployment receipt succeeded; every runtime and immutable repair binding
  matches the rehearsed package. The exported manifest rechecks receipts and code
  hashes without signing or changing chain state.
- Eight frontend governance tests passed, including both exact deployed executor
  payloads, wrong-chain rejection and withdrawal/cancellation guards. The manifest
  is published and its served target/payload data has been verified.
- Submit the 67 replacement proposals after adequate funding and a fresh state
  check; give founders the actual IDs and ordered execution instructions.
- Founders execute old-proposal cancellations before ordered maintenance.
  Reopening remains conditional on post-repair chain/backend/UI reconciliation.

No compensation, historical level-6 rearrangement, NFT-rule change, permanent
sponsor change, production reset or staging-service restart was authorized or
performed in this pass.
