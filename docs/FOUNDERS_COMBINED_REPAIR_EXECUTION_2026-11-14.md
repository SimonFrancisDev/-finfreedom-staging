# Founder instructions: combined mainnet placement repair

Verified at 2026-11-14T14:58:02.970Z, Polygon mainnet block 97308501.

Dear Lady Sabina, Mr. Harry, Mr. Anthony and the founders,

I have submitted all 67 replacement proposals, IDs **190-256**. The contracts are deployed and the website recognizes the exact package. Submission alone does not activate the repair or change anyone's placement or payment.

## Before signing

- Open the existing founder panel on https://www.finfreedomnetwork.io/admin.
- Use Polygon mainnet, chain ID 137, not Amoy.
- Confirm the multisig is `0x785cC854ce9e13CE1140cbFD7C08620713E1711d`.
- The wallet requires 3 founder approvals. Its timelock is 120 seconds; follow the panel's on-chain eligibility time before execution.
- Each signing/executing founder needs POL for their own gas. These proposals attach zero POL and do not authorize compensation or token transfers.
- Match the proposal ID, target and meaning against this record. Stop if the wallet or panel shows a mismatch or an unexplained warning; do not sign blindly.

## Retire the withdrawn package first

The existing cancellation proposals **160-189** cancel the withdrawn proposals **130-159**, one for one. Do not approve or execute the withdrawn originals. Cancellation records preserve blockchain history; they do not delete it.

At this check, 0 of the 30 originals are cancelled. Approve and execute only the still-needed cancellations, then confirm every withdrawn original is marked cancelled before starting the replacement maintenance.

## Replacement execution order

All replacement proposals are already submitted. Non-reopening approvals may be collected in advance, but execution must follow the phases and ID order below. Schedule the maintenance window before executing the pause phase. Do not skip ahead.

### 190-203: Authorize only the reviewed implementations

These grant the Guardian permission for this specific maintenance package. They do not yet replace live code.

| Proposal | Program | Meaning | Target |
| --- | --- | --- | --- |
| 190 | F-Freedom | Approve p4 implementation set | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 191 | F-Freedom | Approve p12 implementation set | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 192 | F-Freedom | Approve p39 implementation set | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 193 | F-Freedom | Approve registration implementation set | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 194 | F-Freedom | Approve manager implementation set | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 195 | Freedom Plus | Approve Freedom Plus p39 proxy | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 196 | Freedom Plus | Approve Freedom Plus p39 implementations | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 197 | Freedom Plus | Approve Freedom Plus p14 proxy | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 198 | Freedom Plus | Approve Freedom Plus p14 implementations | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 199 | Freedom Plus | Approve Freedom Plus p12 proxy | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 200 | Freedom Plus | Approve Freedom Plus p12 implementations | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 201 | Freedom Plus | Approve Freedom Plus p6 proxy | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 202 | Freedom Plus | Approve Freedom Plus p6 implementations | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 203 | Freedom Plus | Approve Freedom Plus router implementations | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |

### 204-215: Pause the affected F-Freedom and Freedom Plus contracts

This starts the maintenance window. Confirm all twelve affected contracts are paused before installing a temporary repair implementation.

| Proposal | Program | Meaning | Target |
| --- | --- | --- | --- |
| 204 | F-Freedom | Pause registration | `0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5` |
| 205 | F-Freedom | Pause manager | `0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53` |
| 206 | F-Freedom | Pause p4 | `0x1ED0b443c880Ba88F732c3F5915561A07B21F6B4` |
| 207 | F-Freedom | Pause p12 | `0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b` |
| 208 | F-Freedom | Pause p39 | `0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb` |
| 209 | Freedom Plus | Pause Freedom Plus registration | `0x7eC9D69fD82B1e62E01d497d495fEdfFfC34a0B6` |
| 210 | Freedom Plus | Pause Freedom Plus manager | `0x6E59b6580826DCcC4c1c9E5497F6bE3BE9C77384` |
| 211 | Freedom Plus | Pause Freedom Plus router | `0x8C88262595cbEAA5FffB60a0689b3EAbe22B0498` |
| 212 | Freedom Plus | Pause Freedom Plus p39 | `0x1DFC59c915163D56998b764E6536CF869550B233` |
| 213 | Freedom Plus | Pause Freedom Plus p14 | `0x81e21a812181404325818dc042676e93293e0751` |
| 214 | Freedom Plus | Pause Freedom Plus p12 | `0xf1C9A1AFa0534cEb1075726Fab6Ac364224BD45d` |
| 215 | Freedom Plus | Pause Freedom Plus p6 | `0x4C2A8058f87E194e277BADB853C87E1a9f44BC0d` |

**Hold point:** I must confirm the paused contracts still match the approved repair prestate before the temporary implementations are installed. If the state changed while users were active, stop for review.

### 216-223: Install the eight tightly bound temporary repair implementations

These are restricted to the reviewed proxies, plan hashes, executors and Polygon mainnet. They are not the final live engines.

| Proposal | Program | Meaning | Target |
| --- | --- | --- | --- |
| 216 | F-Freedom | Install bound p4 repair implementation | `0x1ED0b443c880Ba88F732c3F5915561A07B21F6B4` |
| 217 | F-Freedom | Install bound p12 repair implementation | `0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b` |
| 218 | F-Freedom | Install bound p39 repair implementation | `0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb` |
| 219 | F-Freedom | Install bound registration repair implementation | `0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5` |
| 220 | Freedom Plus | Install bound Freedom Plus p39 repair | `0x1DFC59c915163D56998b764E6536CF869550B233` |
| 221 | Freedom Plus | Install bound Freedom Plus p14 repair | `0x81e21a812181404325818dc042676e93293e0751` |
| 222 | Freedom Plus | Install bound Freedom Plus p12 repair | `0xf1C9A1AFa0534cEb1075726Fab6Ac364224BD45d` |
| 223 | Freedom Plus | Install bound Freedom Plus p6 repair | `0x4C2A8058f87E194e277BADB853C87E1a9f44BC0d` |

### 224-225: Apply the two historical repairs

The first restores the agreed F-Freedom structure while keeping Lady Sabina in place. The second restores sixteen paid Freedom Plus ancestor appearances and two zero-money genesis links. These calls do not repay historical earnings.

| Proposal | Program | Meaning | Target |
| --- | --- | --- | --- |
| 224 | F-Freedom | Apply alternative repair: keep Sabina, insert Sofia; no transfers | `0xd952d21B114F54C1259470b1693893F4D0Dd50Ed` |
| 225 | Freedom Plus | Restore 16 paid ancestor appearances and 2 zero-money genesis links | `0x9bb75E6F09B94428547555d900a66bf21B246e34` |

### 226-236: Install final code and restore normal engines

This installs the tested preventive code where required and restores the original Freedom Plus orbit engines after their temporary repair implementations.

| Proposal | Program | Meaning | Target |
| --- | --- | --- | --- |
| 226 | F-Freedom | Install final p4 implementation | `0x1ED0b443c880Ba88F732c3F5915561A07B21F6B4` |
| 227 | F-Freedom | Install final p12 implementation | `0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b` |
| 228 | F-Freedom | Install final p39 implementation | `0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb` |
| 229 | F-Freedom | Install final registration implementation | `0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5` |
| 230 | F-Freedom | Install final manager implementation | `0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53` |
| 231 | F-Freedom | Bind matching revision-2 settlement router | `0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53` |
| 232 | Freedom Plus | Restore original Freedom Plus p39 engine | `0x1DFC59c915163D56998b764E6536CF869550B233` |
| 233 | Freedom Plus | Restore original Freedom Plus p14 engine | `0x81e21a812181404325818dc042676e93293e0751` |
| 234 | Freedom Plus | Restore original Freedom Plus p12 engine | `0xf1C9A1AFa0534cEb1075726Fab6Ac364224BD45d` |
| 235 | Freedom Plus | Restore original Freedom Plus p6 engine | `0x4C2A8058f87E194e277BADB853C87E1a9f44BC0d` |
| 236 | Freedom Plus | Install preventive Freedom Plus router | `0x8C88262595cbEAA5FffB60a0689b3EAbe22B0498` |

### 237-244: Remove permission for the temporary repair implementations

The one-time maintenance implementations must not remain approved for future use.

| Proposal | Program | Meaning | Target |
| --- | --- | --- | --- |
| 237 | F-Freedom | Revoke temporary p4 repair implementation | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 238 | F-Freedom | Revoke temporary p12 repair implementation | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 239 | F-Freedom | Revoke temporary p39 repair implementation | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 240 | F-Freedom | Revoke temporary registration repair implementation | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 241 | Freedom Plus | Revoke temporary Freedom Plus p39 repair | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 242 | Freedom Plus | Revoke temporary Freedom Plus p14 repair | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 243 | Freedom Plus | Revoke temporary Freedom Plus p12 repair | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |
| 244 | Freedom Plus | Revoke temporary Freedom Plus p6 repair | `0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC` |

**Hold point:** keep the affected programs paused. I must verify final implementations, temporary permission revocation, unchanged money balances, repaired parent/slot records, original-payment provenance in the backend, and the actual website displays before reopening.

### 245-256: Reopen only after written verification

HOLD both approval and execution of these proposals until I confirm the chain, money invariants, backend projections and actual displayed positions agree.

| Proposal | Program | Meaning | Target |
| --- | --- | --- | --- |
| 245 | F-Freedom | Reopen p4 ONLY after verification | `0x1ED0b443c880Ba88F732c3F5915561A07B21F6B4` |
| 246 | F-Freedom | Reopen p12 ONLY after verification | `0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b` |
| 247 | F-Freedom | Reopen p39 ONLY after verification | `0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb` |
| 248 | F-Freedom | Reopen manager ONLY after verification | `0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53` |
| 249 | F-Freedom | Reopen registration ONLY after verification | `0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5` |
| 250 | Freedom Plus | Reopen Freedom Plus p39 ONLY after verification | `0x1DFC59c915163D56998b764E6536CF869550B233` |
| 251 | Freedom Plus | Reopen Freedom Plus p14 ONLY after verification | `0x81e21a812181404325818dc042676e93293e0751` |
| 252 | Freedom Plus | Reopen Freedom Plus p12 ONLY after verification | `0xf1C9A1AFa0534cEb1075726Fab6Ac364224BD45d` |
| 253 | Freedom Plus | Reopen Freedom Plus p6 ONLY after verification | `0x4C2A8058f87E194e277BADB853C87E1a9f44BC0d` |
| 254 | Freedom Plus | Reopen Freedom Plus router ONLY after verification | `0x8C88262595cbEAA5FffB60a0689b3EAbe22B0498` |
| 255 | Freedom Plus | Reopen Freedom Plus manager ONLY after verification | `0x6E59b6580826DCcC4c1c9E5497F6bE3BE9C77384` |
| 256 | Freedom Plus | Reopen Freedom Plus registration ONLY after verification | `0x7eC9D69fD82B1e62E01d497d495fEdfFfC34a0B6` |

## What this changes, and what it does not

Lady Sabina remains in ID1 level 8 slot 3 and level 9 slot 2. Sofia is restored to the accepted level 8 slot 6 beneath Lady Sabina, and level 9 slot 3. The level 8 arrangement is the specifically accepted historical exception, not a change allowing skipped sponsors to take over an established branch midway.

Freedom Plus restoration preserves existing occupied positions and original payment provenance. A historical appearance is not a new activation, earning or repayment. The targeted preventive code distinguishes legitimate ancestor placements from extra fallback payments to ID1 that must not create duplicate positions.

This package contains no 512 USDT compensation, no permanent sponsor change, no NFT-rule change, no production reset and no rearrangement of the deferred historical level-6 orbit. Neither suspended staging service is restarted.

If any execution fails, stop and send me the proposal ID and transaction hash. Do not retry blindly, execute later phases, or reopen while temporary implementations are installed. An individual repair call is atomic; the entire multi-proposal sequence is not.

## Spending and evidence

Submission fees were **10.40481878820223469 POL**. The submitter retains **18.847889770575559244 POL** at this check. No additional deployment was performed.

Full proposal targets, transaction hashes, fees and pending status are recorded in [the verified proposal evidence](evidence/combined-repair-live-proposals-2026-11-14.json). The [deployment record](COMBINED_REPAIR_LIVE_DEPLOYMENTS_2026-11-14.md) contains the contract addresses and earlier integration proof.
