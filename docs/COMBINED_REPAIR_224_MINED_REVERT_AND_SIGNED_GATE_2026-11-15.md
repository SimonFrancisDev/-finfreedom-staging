# Mainnet 224: mined reverts and signed-output verification

## Confirmed incident

Both founder attempts were mined on Polygon mainnet and reverted. The signed
transactions contained no access-list entries despite a 31,800,000 gas limit.
The P39 repair delegatecall exhausted gas and the multisig reverted `Tx failed`.
Neither attempt applied a partial repair; gas fees were charged.

- Block 97363460, nonce 280:
  `0x4b9f88e54015bb0d554dfb2ebfc1fbfc0526c7342e8ce1807992009f4d526d9b`.
  Gas used 31,232,414; fee 10.178866755173551254 POL.
- Block 97363485, nonce 281:
  `0xf1d1b76c72e68802a2e4877a2e23295c2390d8b23a3930afc6efb640d845b4ed`.
  Gas used 31,232,414; fee 9.499842973981711436 POL.
- Sender: `0x67E138a2f46AEF2a0031CfCb5Ae843b41c973f41`.
- Governance: `0x785cC854ce9e13CE1140cbFD7C08620713E1711d`.
- Both exact outer calls were `executeTransaction(224)`, type 2, zero POL value.

The previous simulation proved the prepared request, not its preservation by the
external wallet. An intercepted complete ethers Contract/BrowserProvider call
retains 3,900 keys before the wallet boundary. The precise external app/version
that dropped them is not yet established. Do not attribute that to a specific
wallet product without evidence. No keys are requested or exposed.

Full public transaction/receipt/call traces are retained in workspace
`tmp/repair224-failed-submissions-2026-11-15.json`. A compact evidence report
accompanies this document. No new live transaction was sent by the investigation.

## Containment and correction

Production frontend commit `770d056` restored the 224-256 execution hold and
removed the unsafe retry path. Vercel completed that build successfully.

The replacement uses sign-only `eth_signTransaction`, verifies recovered sender
and the entire unsigned hash, then rechecks size, network, nonce, balance and
latest-state execution before broadcasting the exact raw signed bytes. A dropped
access list or any other changed field is rejected BEFORE network submission.
There is no `eth_sendTransaction`, `eth_sign`, blind-signing or private-key-export
fallback. An unsupported sign-only wallet stops without this app broadcasting.
Ambiguous broadcasts expose the locally computed hash and are never auto-retried.

The site will permit only this guarded path for 224. Proposals 225-256 stay held.
No contract, ABI, approved proposal, historical payment or repair plan changes.
Existing approvals remain valid. Backend and staging services are untouched.

## Verification and remaining gate

60 focused frontend tests passed, including wrong/missing access lists, every
bound transaction field, invalid signed output, changed account/network/nonce,
pending transactions, unsupported signing, rejected signature, changed balance,
post-signature revert and ambiguous broadcast. The actual ethers sign-only
boundary is exercised without a real owner key or network broadcast.

Read-only mainnet preflight passed at block 97364209, 2026-11-15 14:09:43 UTC,
with nonce 282 and 3,900 keys. A VoidSigner deliberately stopped before signing.
224 remained unexecuted, uncancelled, and approved by three owners.

Founder wallet sign-only support is still unverified. Do not label the repair
complete or promise a particular wallet will accept it. First identify the wallet
app/device; then obtain verified signed output through the guarded path. After
successful execution, verify receipt, executor flag, approved positions and all
pause/payment invariants before progressing to 225 or later stages.

## Production release

Frontend commit `ab26936` is pushed to `ffn-frontend/main`. Vercel deployment
`dpl_7j98dBpabHoTZzXKo2brqQjvsLkt` is Ready and assigned to the official domains.
At 2026-11-15 14:14:59 UTC the official admin page served
`/assets/index-Cl0usbCY.js`, containing the signed-output verification, blocked
direct submission, unsupported-wallet stop and dependent-proposal hold. The
production API binding is preserved. Unrelated local edits were not deployed.

This is a submission-path release, not a claim that a founder's wallet supports
it or that the historical repair has executed. No signed live transaction was
created or broadcast by this pass.
