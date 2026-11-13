# Freedom Plus Mainnet Transaction Audit

Network: Polygon mainnet (137). Blocks 94791559-97254886; ending 2026-11-13T16:36:25.000Z.

**Verdict:** Historical paid-transfer checks pass; structural correctness fails. Not a whole-program release certification.

Method: Independent offline matrix and eligibility replay, then expected component recipients/percentages reconciled to actual mainnet USDT receipts. Second replay inserts legitimate missing ID1 ancestry positions chronologically and checks all subsequent payouts and existing positions again.

## Summary

```json
{
  "counts": {
    "paidActivations": 50,
    "paidWallets": 32,
    "byLevel": {
      "1": 32,
      "2": 13,
      "3": 5,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0
    },
    "financiallyPassed": 50,
    "structurallyFailed": 16,
    "structurallyPassed": 34,
    "missingPositions": 16,
    "affectedWallets": 8,
    "genesisPositions": 21,
    "sourceSkips": 10,
    "maxSkippedDepth": 1,
    "lateActivations": 2,
    "fundedRecycles": 0
  },
  "totalsUSDT": {
    "gross": "5800.0",
    "participantPayouts": "3967.5",
    "founders": "1252.5",
    "nftPool": "464.0",
    "operations": "116.0",
    "recycleReserve": "0",
    "unexplainedDifference": "0"
  }
}
```

## Scope Limits

- Successful activations only: reverted transactions emit no surviving events and were not enumerated.
- No paid activations at levels 4-7; no funded recycle or reserve-window arrival observed. These cannot be certified from this live history.
- Deep skip beyond the observed depth is not certified by these transactions.
- No frontend/database audit, NFT payout audit, utility-token issuance audit, or other-program audit in this report.
- The extra-position model demonstrates this finite history only; it is not a deployment-ready historical repair plan.

## Assumptions

- One additional position per real ancestor orbit; no extra position for exhausted-ancestry fallback money to ID1.
- Existing genesis representatives are retained exactly as deployed. This report does not certify hypothetical future descendants of unexercised genesis branches.
- No historical compensation, current state repair, or live contract mutation is executed.

## Actual Recipient Totals

- 0x0a1c5bacff52599ab88d0883da5f363201b1b042: 20.0 USDT
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 156.5625 USDT
- 0x1d5031e2cb02ae58d566b9259eefe66747491ef0: 10.0 USDT
- 0x1ea5513e017b4e25847e91abc84ac8686331f80b: 80.0 USDT
- 0x3320467c8e996e5f5a1f71611cd618dba18b7d4d: 20.0 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 116.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 702.5 USDT
- 0x3fd47bc432b2c0681d7687adfe77ac0307f1f8f4: 70.0 USDT
- 0x3ff8375454e356de9ffb32082c7546006d9a086f: 10.0 USDT
- 0x41b65562ccdb4baf1f9ab67a1e01c160fcfcddc3: 150.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 156.5625 USDT
- 0x5b511a2b0e4db2ca73b276969f3a52661aef12f1: 70.0 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 156.5625 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 1012.5 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 156.5625 USDT
- 0xa1b5a30faf2032471fbac7d5a89842c0d80b2372: 45.0 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 156.5625 USDT
- 0xaa254e8e177de104d9f87211b0f4a6b7ec71306a: 667.5 USDT
- 0xb673c9d14da920f187d25cc793f1955a43284622: 302.5 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 156.5625 USDT
- 0xba14da48b3111dfb40a65e272833a2b1838b062d: 10.0 USDT
- 0xbafafb77a090d7f989aa64d4f867b1b942a50591: 32.5 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 464.0 USDT
- 0xcc7f84f64abc9e5861e9f27d20811af42f189e45: 437.5 USDT
- 0xd15a932b6ebdafc9347ae567523e4bdc70de3c3b: 10.0 USDT
- 0xd39db4b1535bcc980915bb5e92c601783213f06a: 127.5 USDT
- 0xe8b1ac47231651ccc38326a59645a8d976d0eabf: 137.5 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 156.5625 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 156.5625 USDT
- 0xf93ab102473de4886e5e82ed48f6dfe21f82afd0: 52.5 USDT

## Transactions

### 1. Level 1: 0x863447369632EA4AaC724683c1D448C68e2f1ADE

Block 94853254; [transaction](https://polygonscan.com/tx/0xd84b0858a2185eb0d486a9ecd2ed5061c87072feedef9f66ba7f638944ae6e44).
Paid 50.0 USDT. Permanent sponsor: 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A.
Selected orbit: 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.
- Role 3, 50%: 25.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. No eligible structural ancestor; fallback to ID1, split among eight founders.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 4.375 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 4.375 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 4.375 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 4.375 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 4.375 USDT
- 0xaa254e8e177de104d9f87211b0f4a6b7ec71306a: 10.0 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 4.375 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 4.375 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 4.375 USDT

Recorded positions:
- Orbit 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A, level 1, cycle 0, ring 1, slot 1, parent 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 1, cycle 0, ring 2, slot 4, parent 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A. Historical expected position, not an instruction to overwrite live state.

### 2. Level 2: 0x863447369632EA4AaC724683c1D448C68e2f1ADE

Block 94853283; [transaction](https://polygonscan.com/tx/0x86c6ec2ac88b64507217a06066fd4f5b0289a6185a2a83515cca99a5d0d81208).
Paid 150.0 USDT. Permanent sponsor: 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A.
Selected orbit: 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 15%: 22.5 USDT to 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A. Eligible structural recipient for this ring component.
- Role 2, 25%: 37.5 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.
- Role 3, 50%: 75.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. No eligible structural ancestor; fallback to ID1, split among eight founders.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 14.0625 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 3.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 14.0625 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 14.0625 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 14.0625 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 14.0625 USDT
- 0xaa254e8e177de104d9f87211b0f4a6b7ec71306a: 22.5 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 14.0625 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 12.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 14.0625 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 14.0625 USDT

Recorded positions:
- Orbit 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A, level 2, cycle 0, ring 1, slot 1, parent 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 2, cycle 0, ring 2, slot 5, parent 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A. Historical expected position, not an instruction to overwrite live state.

### 3. Level 3: 0x863447369632EA4AaC724683c1D448C68e2f1ADE

Block 94853311; [transaction](https://polygonscan.com/tx/0x1f28b1a54eb307c47493eb7ee93d62b99f1cb65b28e929048fd2e2693fa46ddb).
Paid 450.0 USDT. Permanent sponsor: 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A.
Selected orbit: 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 40%: 180.0 USDT to 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A. Eligible structural recipient for this ring component.
- Role 2, 50%: 225.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 28.125 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 9.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 28.125 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 28.125 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 28.125 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 28.125 USDT
- 0xaa254e8e177de104d9f87211b0f4a6b7ec71306a: 180.0 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 28.125 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 36.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 28.125 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 28.125 USDT

Recorded positions:
- Orbit 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A, level 3, cycle 0, ring 1, slot 1, parent 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 3, cycle 0, ring 2, slot 4, parent 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A. Historical expected position, not an instruction to overwrite live state.

### 4. Level 1: 0xBafaFb77a090D7F989aa64D4f867b1B942A50591

Block 94853403; [transaction](https://polygonscan.com/tx/0x310e50b3e10ca5909a34d3984c9ea284d9d4a0c27de5547e84def110e640af97).
Paid 50.0 USDT. Permanent sponsor: 0xb673c9D14Da920f187d25Cc793f1955a43284622.
Selected orbit: 0xb673c9D14Da920f187d25Cc793f1955a43284622, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0xb673c9D14Da920f187d25Cc793f1955a43284622. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.
- Role 3, 50%: 25.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. No eligible structural ancestor; fallback to ID1, split among eight founders.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 4.375 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 4.375 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 4.375 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 4.375 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 4.375 USDT
- 0xb673c9d14da920f187d25cc793f1955a43284622: 10.0 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 4.375 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 4.375 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 4.375 USDT

Recorded positions:
- Orbit 0xb673c9D14Da920f187d25Cc793f1955a43284622, level 1, cycle 0, ring 1, slot 1, parent 0xb673c9D14Da920f187d25Cc793f1955a43284622.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 1, cycle 0, ring 2, slot 5, parent 0xb673c9D14Da920f187d25Cc793f1955a43284622. Historical expected position, not an instruction to overwrite live state.

### 5. Level 1: 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45

Block 94853512; [transaction](https://polygonscan.com/tx/0x958bb0d3a101047b83e197fcba443c101ccf945c5e085814ce4af76e6f357f79).
Paid 50.0 USDT. Permanent sponsor: 0x863447369632EA4AaC724683c1D448C68e2f1ADE.
Selected orbit: 0x863447369632EA4AaC724683c1D448C68e2f1ADE, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 3.125 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 3.125 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 3.125 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 10.0 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 3.125 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 3.125 USDT
- 0xaa254e8e177de104d9f87211b0f4a6b7ec71306a: 10.0 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 3.125 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 3.125 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 3.125 USDT

Recorded positions:
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 1, cycle 0, ring 1, slot 1, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE.
- Orbit 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A, level 1, cycle 0, ring 2, slot 4, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 1, cycle 0, ring 3, slot 13, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Historical expected position, not an instruction to overwrite live state.

### 6. Level 2: 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45

Block 94853823; [transaction](https://polygonscan.com/tx/0xfe159f482ecc69f6ac369d7dad7be3176864082fff9f086abb7a44f6a4d97e0a).
Paid 150.0 USDT. Permanent sponsor: 0x863447369632EA4AaC724683c1D448C68e2f1ADE.
Selected orbit: 0x863447369632EA4AaC724683c1D448C68e2f1ADE, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 15%: 22.5 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.
- Role 2, 25%: 37.5 USDT to 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A. Eligible structural recipient for this ring component.
- Role 3, 50%: 75.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 9.375 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 3.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 9.375 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 9.375 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 22.5 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 9.375 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 9.375 USDT
- 0xaa254e8e177de104d9f87211b0f4a6b7ec71306a: 37.5 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 9.375 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 12.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 9.375 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 9.375 USDT

Recorded positions:
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 2, cycle 0, ring 1, slot 1, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE.
- Orbit 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A, level 2, cycle 0, ring 2, slot 3, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 2, cycle 0, ring 3, slot 9, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Historical expected position, not an instruction to overwrite live state.

### 7. Level 1: 0xa1B5a30fAF2032471fBAc7d5A89842c0d80b2372

Block 94854101; [transaction](https://polygonscan.com/tx/0x07b2064953cb68deb95eefaa32a8463459890013fa9576b208d07b0c61008a5b).
Paid 50.0 USDT. Permanent sponsor: 0x863447369632EA4AaC724683c1D448C68e2f1ADE.
Selected orbit: 0x863447369632EA4AaC724683c1D448C68e2f1ADE, cycle 0, ring 1, position 2.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 3.125 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 3.125 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 3.125 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 10.0 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 3.125 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 3.125 USDT
- 0xaa254e8e177de104d9f87211b0f4a6b7ec71306a: 10.0 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 3.125 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 3.125 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 3.125 USDT

Recorded positions:
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 1, cycle 0, ring 1, slot 2, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE.
- Orbit 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A, level 1, cycle 0, ring 2, slot 7, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 1, cycle 0, ring 3, slot 22, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Historical expected position, not an instruction to overwrite live state.

### 8. Level 2: 0xa1B5a30fAF2032471fBAc7d5A89842c0d80b2372

Block 94854130; [transaction](https://polygonscan.com/tx/0xa5050033f86f7284a74eca918cf3464d4c11bbd00827fae0c7c9fdc2c8f294e6).
Paid 150.0 USDT. Permanent sponsor: 0x863447369632EA4AaC724683c1D448C68e2f1ADE.
Selected orbit: 0x863447369632EA4AaC724683c1D448C68e2f1ADE, cycle 0, ring 1, position 2.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 15%: 22.5 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.
- Role 2, 25%: 37.5 USDT to 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A. Eligible structural recipient for this ring component.
- Role 3, 50%: 75.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 9.375 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 3.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 9.375 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 9.375 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 22.5 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 9.375 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 9.375 USDT
- 0xaa254e8e177de104d9f87211b0f4a6b7ec71306a: 37.5 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 9.375 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 12.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 9.375 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 9.375 USDT

Recorded positions:
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 2, cycle 0, ring 1, slot 2, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE.
- Orbit 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A, level 2, cycle 0, ring 2, slot 5, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 2, cycle 0, ring 3, slot 13, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Historical expected position, not an instruction to overwrite live state.

### 9. Level 1: 0xEA51893495D285D737db5062500C4F003E2b3A4D

Block 94854624; [transaction](https://polygonscan.com/tx/0x4e12e4a4519e665e8a563c5d80d18b34f556e71f37acd3709bfc99ced9613106).
Paid 50.0 USDT. Permanent sponsor: 0x863447369632EA4AaC724683c1D448C68e2f1ADE.
Selected orbit: 0x863447369632EA4AaC724683c1D448C68e2f1ADE, cycle 0, ring 1, position 3.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 3.125 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 3.125 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 3.125 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 10.0 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 3.125 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 3.125 USDT
- 0xaa254e8e177de104d9f87211b0f4a6b7ec71306a: 10.0 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 3.125 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 3.125 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 3.125 USDT

Recorded positions:
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 1, cycle 0, ring 1, slot 3, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE.
- Orbit 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A, level 1, cycle 0, ring 2, slot 10, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 1, cycle 0, ring 3, slot 31, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Historical expected position, not an instruction to overwrite live state.

### 10. Level 1: 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1

Block 94854780; [transaction](https://polygonscan.com/tx/0x1568f441aca2213d4cfbcd32c4b9d4d761097001055f5f1cb4c86548eb404526).
Paid 50.0 USDT. Permanent sponsor: 0x863447369632EA4AaC724683c1D448C68e2f1ADE.
Selected orbit: 0x863447369632EA4AaC724683c1D448C68e2f1ADE, cycle 0, ring 2, position 4.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 10.0 USDT
- 0xaa254e8e177de104d9f87211b0f4a6b7ec71306a: 25.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xcc7f84f64abc9e5861e9f27d20811af42f189e45: 10.0 USDT

Recorded positions:
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 1, cycle 0, ring 2, slot 4, parent 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45.
- Orbit 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45, level 1, cycle 0, ring 1, slot 1, parent 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45.
- Orbit 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A, level 1, cycle 0, ring 3, slot 13, parent 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45.

Required but missing positions:
- None.

### 11. Level 2: 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1

Block 94854833; [transaction](https://polygonscan.com/tx/0xba26688518ce3427362c8c9e8894b19fc6d07e58dd7ed116a2460119a3ff01a3).
Paid 150.0 USDT. Permanent sponsor: 0x863447369632EA4AaC724683c1D448C68e2f1ADE.
Selected orbit: 0x863447369632EA4AaC724683c1D448C68e2f1ADE, cycle 0, ring 2, position 3.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 15%: 22.5 USDT to 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45. Eligible structural recipient for this ring component.
- Role 2, 25%: 37.5 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.
- Role 3, 50%: 75.0 USDT to 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 3.0 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 37.5 USDT
- 0xaa254e8e177de104d9f87211b0f4a6b7ec71306a: 75.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 12.0 USDT
- 0xcc7f84f64abc9e5861e9f27d20811af42f189e45: 22.5 USDT

Recorded positions:
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 2, cycle 0, ring 2, slot 3, parent 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45.
- Orbit 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45, level 2, cycle 0, ring 1, slot 1, parent 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45.
- Orbit 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A, level 2, cycle 0, ring 3, slot 7, parent 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45.

Required but missing positions:
- None.

### 12. Level 3: 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1

Block 94854869; [transaction](https://polygonscan.com/tx/0xcee65d3c4d8d6824cb602e91949485ce1b0c8a057d32f3791549870babc24476).
Paid 450.0 USDT. Permanent sponsor: 0x863447369632EA4AaC724683c1D448C68e2f1ADE.
Selected orbit: 0x863447369632EA4AaC724683c1D448C68e2f1ADE, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 40%: 180.0 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.
- Role 2, 50%: 225.0 USDT to 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 9.0 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 180.0 USDT
- 0xaa254e8e177de104d9f87211b0f4a6b7ec71306a: 225.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 36.0 USDT

Recorded positions:
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 3, cycle 0, ring 1, slot 1, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE.
- Orbit 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A, level 3, cycle 0, ring 2, slot 4, parent 0x863447369632EA4AaC724683c1D448C68e2f1ADE.

Required but missing positions:
- None.

### 13. Level 1: 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1

Block 94855152; [transaction](https://polygonscan.com/tx/0x1ad746bb142ede2b47922852b12d1c65bbb4792dbb1c923e00b84a97d8b3c7f8).
Paid 50.0 USDT. Permanent sponsor: 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
Selected orbit: 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 10.0 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 25.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xcc7f84f64abc9e5861e9f27d20811af42f189e45: 10.0 USDT

Recorded positions:
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 1, cycle 0, ring 1, slot 1, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
- Orbit 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45, level 1, cycle 0, ring 2, slot 4, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 1, cycle 0, ring 3, slot 13, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.

Required but missing positions:
- None.

### 14. Level 1: 0x3320467c8E996e5f5a1f71611cD618DBa18B7D4d

Block 94855741; [transaction](https://polygonscan.com/tx/0x6e7d6c7ba5dcbab8729aa2371a3d13cd1eca06e4185bec525542af9b73c431dd).
Paid 50.0 USDT. Permanent sponsor: 0xa1B5a30fAF2032471fBAc7d5A89842c0d80b2372.
Selected orbit: 0xa1B5a30fAF2032471fBAc7d5A89842c0d80b2372, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0xa1B5a30fAF2032471fBAc7d5A89842c0d80b2372. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 10.0 USDT
- 0xa1b5a30faf2032471fbac7d5a89842c0d80b2372: 10.0 USDT
- 0xaa254e8e177de104d9f87211b0f4a6b7ec71306a: 25.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT

Recorded positions:
- Orbit 0xa1B5a30fAF2032471fBAc7d5A89842c0d80b2372, level 1, cycle 0, ring 1, slot 1, parent 0xa1B5a30fAF2032471fBAc7d5A89842c0d80b2372.
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 1, cycle 0, ring 2, slot 5, parent 0xa1B5a30fAF2032471fBAc7d5A89842c0d80b2372.
- Orbit 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A, level 1, cycle 0, ring 3, slot 16, parent 0xa1B5a30fAF2032471fBAc7d5A89842c0d80b2372.

Required but missing positions:
- None.

### 15. Level 1: 0x1EA5513e017b4e25847e91aBc84aC8686331f80B

Block 94855791; [transaction](https://polygonscan.com/tx/0xa5ed830e20ef1e751d13e2d0a8e7241801e76aac6e1683c868a87f6b8fbba872).
Paid 50.0 USDT. Permanent sponsor: 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
Selected orbit: 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, cycle 0, ring 1, position 2.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 10.0 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 25.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xcc7f84f64abc9e5861e9f27d20811af42f189e45: 10.0 USDT

Recorded positions:
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 1, cycle 0, ring 1, slot 2, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
- Orbit 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45, level 1, cycle 0, ring 2, slot 7, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 1, cycle 0, ring 3, slot 22, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.

Required but missing positions:
- None.

### 16. Level 1: 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf

Block 94855973; [transaction](https://polygonscan.com/tx/0x086d3b507d843d8f489672bab2da4639b5fddff7a91cad42110c95c37cca034e).
Paid 50.0 USDT. Permanent sponsor: 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1.
Selected orbit: 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 10.0 USDT
- 0x5b511a2b0e4db2ca73b276969f3a52661aef12f1: 10.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xcc7f84f64abc9e5861e9f27d20811af42f189e45: 25.0 USDT

Recorded positions:
- Orbit 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1, level 1, cycle 0, ring 1, slot 1, parent 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1.
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 1, cycle 0, ring 2, slot 4, parent 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1.
- Orbit 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45, level 1, cycle 0, ring 3, slot 13, parent 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1.

Required but missing positions:
- None.

### 17. Level 2: 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf

Block 94856026; [transaction](https://polygonscan.com/tx/0xb829c060c9aa55f151d53d1c469a12a9c85b41ec0a3a3644a338634366b1386e).
Paid 150.0 USDT. Permanent sponsor: 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1.
Selected orbit: 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 15%: 22.5 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.
- Role 2, 25%: 37.5 USDT to 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45. Eligible structural recipient for this ring component.
- Role 3, 50%: 75.0 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 3.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 22.5 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 75.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 12.0 USDT
- 0xcc7f84f64abc9e5861e9f27d20811af42f189e45: 37.5 USDT

Recorded positions:
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 2, cycle 0, ring 1, slot 1, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
- Orbit 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45, level 2, cycle 0, ring 2, slot 3, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 2, cycle 0, ring 3, slot 7, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.

Required but missing positions:
- None.

### 18. Level 3: 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf

Block 94856076; [transaction](https://polygonscan.com/tx/0x4187be6a5f0c6f14b74f73adf4b6b910b48d49377fd0c27ce8070baa8f97d90e).
Paid 450.0 USDT. Permanent sponsor: 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1.
Selected orbit: 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 40%: 180.0 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.
- Role 2, 50%: 225.0 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 9.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 180.0 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 225.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 36.0 USDT

Recorded positions:
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 3, cycle 0, ring 1, slot 1, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 3, cycle 0, ring 2, slot 4, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.

Required but missing positions:
- None.

### 19. Level 1: 0xBb030B134070Caed7B61986A589eF058c41fCd43

Block 94856268; [transaction](https://polygonscan.com/tx/0x009ab34a934112f82d9c4b28fe1690aa139bd95c271101e140a90357ecd59fa1).
Paid 50.0 USDT. Permanent sponsor: 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
Selected orbit: 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, cycle 0, ring 1, position 3.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 10.0 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 25.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xcc7f84f64abc9e5861e9f27d20811af42f189e45: 10.0 USDT

Recorded positions:
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 1, cycle 0, ring 1, slot 3, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
- Orbit 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45, level 1, cycle 0, ring 2, slot 10, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 1, cycle 0, ring 3, slot 31, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.

Required but missing positions:
- None.

### 20. Level 1: 0xD39dB4B1535bcC980915Bb5e92C601783213F06A

Block 94856627; [transaction](https://polygonscan.com/tx/0x3c73f4a8b23de8fa49acad55bfe366da35da68fb6a6ced4bc753ad5a2c0946a3).
Paid 50.0 USDT. Permanent sponsor: 0x1EA5513e017b4e25847e91aBc84aC8686331f80B.
Selected orbit: 0x1EA5513e017b4e25847e91aBc84aC8686331f80B, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x1EA5513e017b4e25847e91aBc84aC8686331f80B. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x1ea5513e017b4e25847e91abc84ac8686331f80b: 10.0 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 10.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xcc7f84f64abc9e5861e9f27d20811af42f189e45: 25.0 USDT

Recorded positions:
- Orbit 0x1EA5513e017b4e25847e91aBc84aC8686331f80B, level 1, cycle 0, ring 1, slot 1, parent 0x1EA5513e017b4e25847e91aBc84aC8686331f80B.
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 1, cycle 0, ring 2, slot 5, parent 0x1EA5513e017b4e25847e91aBc84aC8686331f80B.
- Orbit 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45, level 1, cycle 0, ring 3, slot 16, parent 0x1EA5513e017b4e25847e91aBc84aC8686331f80B.

Required but missing positions:
- None.

### 21. Level 2: 0xD39dB4B1535bcC980915Bb5e92C601783213F06A

Block 94856999; [transaction](https://polygonscan.com/tx/0x5ea0223fda4c2a18cdbeb719950ecd4ecd2c45510f4c002d44d1d1a0969701d0).
Paid 150.0 USDT. Permanent sponsor: 0x1EA5513e017b4e25847e91aBc84aC8686331f80B.
Selected orbit: 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, cycle 0, ring 1, position 2.
Inactive/non-joined sponsors skipped: 0x1EA5513e017b4e25847e91aBc84aC8686331f80B.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 15%: 22.5 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.
- Role 2, 25%: 37.5 USDT to 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45. Eligible structural recipient for this ring component.
- Role 3, 50%: 75.0 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 3.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 22.5 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 75.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 12.0 USDT
- 0xcc7f84f64abc9e5861e9f27d20811af42f189e45: 37.5 USDT

Recorded positions:
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 2, cycle 0, ring 1, slot 2, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
- Orbit 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45, level 2, cycle 0, ring 2, slot 5, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 2, cycle 0, ring 3, slot 11, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.

Required but missing positions:
- None.

### 22. Level 1: 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0

Block 94857243; [transaction](https://polygonscan.com/tx/0x7ff283916b3abcb65833ea4f330d227774374a8bd8baf2de8986219fb8979536).
Paid 50.0 USDT. Permanent sponsor: 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf.
Selected orbit: 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 25.0 USDT
- 0x5b511a2b0e4db2ca73b276969f3a52661aef12f1: 10.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xe8b1ac47231651ccc38326a59645a8d976d0eabf: 10.0 USDT

Recorded positions:
- Orbit 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf, level 1, cycle 0, ring 1, slot 1, parent 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf.
- Orbit 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1, level 1, cycle 0, ring 2, slot 4, parent 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf.
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 1, cycle 0, ring 3, slot 13, parent 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf.

Required but missing positions:
- None.

### 23. Level 2: 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0

Block 94857342; [transaction](https://polygonscan.com/tx/0x10dbe8cc15962fd88c97ad003ea030101e5bc6828807597e290aef8c361bb33d).
Paid 150.0 USDT. Permanent sponsor: 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf.
Selected orbit: 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 15%: 22.5 USDT to 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf. Eligible structural recipient for this ring component.
- Role 2, 25%: 37.5 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.
- Role 3, 50%: 75.0 USDT to 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 3.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 37.5 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 12.0 USDT
- 0xcc7f84f64abc9e5861e9f27d20811af42f189e45: 75.0 USDT
- 0xe8b1ac47231651ccc38326a59645a8d976d0eabf: 22.5 USDT

Recorded positions:
- Orbit 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf, level 2, cycle 0, ring 1, slot 1, parent 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf.
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 2, cycle 0, ring 2, slot 3, parent 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf.
- Orbit 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45, level 2, cycle 0, ring 3, slot 7, parent 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf.

Required but missing positions:
- None.

### 24. Level 1: 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3

Block 94857921; [transaction](https://polygonscan.com/tx/0xaa82d6285e15c507024e042fc88b758efc979dacb70eb11216dc037e8c5a572e).
Paid 50.0 USDT. Permanent sponsor: 0xD39dB4B1535bcC980915Bb5e92C601783213F06A.
Selected orbit: 0xD39dB4B1535bcC980915Bb5e92C601783213F06A, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0xD39dB4B1535bcC980915Bb5e92C601783213F06A. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0x1EA5513e017b4e25847e91aBc84aC8686331f80B. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x1ea5513e017b4e25847e91abc84ac8686331f80b: 10.0 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 25.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xd39db4b1535bcc980915bb5e92c601783213f06a: 10.0 USDT

Recorded positions:
- Orbit 0xD39dB4B1535bcC980915Bb5e92C601783213F06A, level 1, cycle 0, ring 1, slot 1, parent 0xD39dB4B1535bcC980915Bb5e92C601783213F06A.
- Orbit 0x1EA5513e017b4e25847e91aBc84aC8686331f80B, level 1, cycle 0, ring 2, slot 4, parent 0xD39dB4B1535bcC980915Bb5e92C601783213F06A.
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 1, cycle 0, ring 3, slot 14, parent 0xD39dB4B1535bcC980915Bb5e92C601783213F06A.

Required but missing positions:
- None.

### 25. Level 1: 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4

Block 94858361; [transaction](https://polygonscan.com/tx/0xe859a755e2d0707e9041f23bee6f7029cad00d58656471ed4cade39d8c44e946).
Paid 50.0 USDT. Permanent sponsor: 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3.
Selected orbit: 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xD39dB4B1535bcC980915Bb5e92C601783213F06A. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0x1EA5513e017b4e25847e91aBc84aC8686331f80B. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x1ea5513e017b4e25847e91abc84ac8686331f80b: 25.0 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x41b65562ccdb4baf1f9ab67a1e01c160fcfcddc3: 10.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xd39db4b1535bcc980915bb5e92c601783213f06a: 10.0 USDT

Recorded positions:
- Orbit 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3, level 1, cycle 0, ring 1, slot 1, parent 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3.
- Orbit 0xD39dB4B1535bcC980915Bb5e92C601783213F06A, level 1, cycle 0, ring 2, slot 4, parent 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3.
- Orbit 0x1EA5513e017b4e25847e91aBc84aC8686331f80B, level 1, cycle 0, ring 3, slot 13, parent 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3.

Required but missing positions:
- None.

### 26. Level 1: 0x0a1c5BAcFF52599Ab88D0883Da5F363201b1b042

Block 94858507; [transaction](https://polygonscan.com/tx/0x35bccb0d2f05b07e5d0a1be895589140eba8c9a044afecd0e6900878e748a91f).
Paid 50.0 USDT. Permanent sponsor: 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4.
Selected orbit: 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0xD39dB4B1535bcC980915Bb5e92C601783213F06A. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3fd47bc432b2c0681d7687adfe77ac0307f1f8f4: 10.0 USDT
- 0x41b65562ccdb4baf1f9ab67a1e01c160fcfcddc3: 10.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xd39db4b1535bcc980915bb5e92c601783213f06a: 25.0 USDT

Recorded positions:
- Orbit 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4, level 1, cycle 0, ring 1, slot 1, parent 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4.
- Orbit 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3, level 1, cycle 0, ring 2, slot 4, parent 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4.
- Orbit 0xD39dB4B1535bcC980915Bb5e92C601783213F06A, level 1, cycle 0, ring 3, slot 13, parent 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4.

Required but missing positions:
- None.

### 27. Level 1: 0x1d5031e2CB02ae58d566b9259EEfE66747491EF0

Block 94858628; [transaction](https://polygonscan.com/tx/0x22753e2f5ce52392d818030960ddf17f104a168aae60fcf6222db738fc93563e).
Paid 50.0 USDT. Permanent sponsor: 0x9AD34825FfEc7FDd0fb57Eb237a79a08F5a147A2.
Selected orbit: 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4, cycle 0, ring 1, position 2.
Inactive/non-joined sponsors skipped: 0x9AD34825FfEc7FDd0fb57Eb237a79a08F5a147A2.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0xD39dB4B1535bcC980915Bb5e92C601783213F06A. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3fd47bc432b2c0681d7687adfe77ac0307f1f8f4: 10.0 USDT
- 0x41b65562ccdb4baf1f9ab67a1e01c160fcfcddc3: 10.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xd39db4b1535bcc980915bb5e92c601783213f06a: 25.0 USDT

Recorded positions:
- Orbit 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4, level 1, cycle 0, ring 1, slot 2, parent 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4.
- Orbit 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3, level 1, cycle 0, ring 2, slot 7, parent 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4.
- Orbit 0xD39dB4B1535bcC980915Bb5e92C601783213F06A, level 1, cycle 0, ring 3, slot 22, parent 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4.

Required but missing positions:
- None.

### 28. Level 1: 0xD27F31E90C877B0C9F815f1068eBd704ce9F11b0

Block 94858672; [transaction](https://polygonscan.com/tx/0xaadbb53fd6ed3bc8c079d897d8b994b9564021125f4097f7df03e0e216c204ad).
Paid 50.0 USDT. Permanent sponsor: 0x1d5031e2CB02ae58d566b9259EEfE66747491EF0.
Selected orbit: 0x1d5031e2CB02ae58d566b9259EEfE66747491EF0, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x1d5031e2CB02ae58d566b9259EEfE66747491EF0. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x1d5031e2cb02ae58d566b9259eefe66747491ef0: 10.0 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3fd47bc432b2c0681d7687adfe77ac0307f1f8f4: 10.0 USDT
- 0x41b65562ccdb4baf1f9ab67a1e01c160fcfcddc3: 25.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT

Recorded positions:
- Orbit 0x1d5031e2CB02ae58d566b9259EEfE66747491EF0, level 1, cycle 0, ring 1, slot 1, parent 0x1d5031e2CB02ae58d566b9259EEfE66747491EF0.
- Orbit 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4, level 1, cycle 0, ring 2, slot 5, parent 0x1d5031e2CB02ae58d566b9259EEfE66747491EF0.
- Orbit 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3, level 1, cycle 0, ring 3, slot 16, parent 0x1d5031e2CB02ae58d566b9259EEfE66747491EF0.

Required but missing positions:
- None.

### 29. Level 1: 0xd15A932B6eBdAfc9347aE567523e4bDc70De3C3B

Block 94858740; [transaction](https://polygonscan.com/tx/0xb6681befab39c511115603484a41214f4d24f33f169058e9095ca24e7b9a7190).
Paid 50.0 USDT. Permanent sponsor: 0x9AD34825FfEc7FDd0fb57Eb237a79a08F5a147A2.
Selected orbit: 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4, cycle 0, ring 1, position 3.
Inactive/non-joined sponsors skipped: 0x9AD34825FfEc7FDd0fb57Eb237a79a08F5a147A2.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0xD39dB4B1535bcC980915Bb5e92C601783213F06A. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3fd47bc432b2c0681d7687adfe77ac0307f1f8f4: 10.0 USDT
- 0x41b65562ccdb4baf1f9ab67a1e01c160fcfcddc3: 10.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xd39db4b1535bcc980915bb5e92c601783213f06a: 25.0 USDT

Recorded positions:
- Orbit 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4, level 1, cycle 0, ring 1, slot 3, parent 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4.
- Orbit 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3, level 1, cycle 0, ring 2, slot 10, parent 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4.
- Orbit 0xD39dB4B1535bcC980915Bb5e92C601783213F06A, level 1, cycle 0, ring 3, slot 31, parent 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4.

Required but missing positions:
- None.

### 30. Level 2: 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4

Block 94858917; [transaction](https://polygonscan.com/tx/0x724f37d05d0cc43739c40f1b4cce278dcdbd5420470c0b3383b00f72d6b69e5e).
Paid 150.0 USDT. Permanent sponsor: 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3.
Selected orbit: 0xD39dB4B1535bcC980915Bb5e92C601783213F06A, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 15%: 22.5 USDT to 0xD39dB4B1535bcC980915Bb5e92C601783213F06A. Eligible structural recipient for this ring component.
- Role 2, 25%: 37.5 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.
- Role 3, 50%: 75.0 USDT to 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 3.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 37.5 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 12.0 USDT
- 0xcc7f84f64abc9e5861e9f27d20811af42f189e45: 75.0 USDT
- 0xd39db4b1535bcc980915bb5e92c601783213f06a: 22.5 USDT

Recorded positions:
- Orbit 0xD39dB4B1535bcC980915Bb5e92C601783213F06A, level 2, cycle 0, ring 1, slot 1, parent 0xD39dB4B1535bcC980915Bb5e92C601783213F06A.
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 2, cycle 0, ring 2, slot 4, parent 0xD39dB4B1535bcC980915Bb5e92C601783213F06A.
- Orbit 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45, level 2, cycle 0, ring 3, slot 9, parent 0xD39dB4B1535bcC980915Bb5e92C601783213F06A.

Required but missing positions:
- None.

### 31. Level 1: 0x9AD34825FfEc7FDd0fb57Eb237a79a08F5a147A2

Block 94859183; [transaction](https://polygonscan.com/tx/0x7e541e960a8c0a3429e03deb1475cd894bf18a7c05ee1c0a166a257b8c5ecb77).
Paid 50.0 USDT. Permanent sponsor: 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4.
Selected orbit: 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4, cycle 0, ring 2, position 4.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x0a1c5BAcFF52599Ab88D0883Da5F363201b1b042. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x0a1c5bacff52599ab88d0883da5f363201b1b042: 10.0 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3fd47bc432b2c0681d7687adfe77ac0307f1f8f4: 10.0 USDT
- 0x41b65562ccdb4baf1f9ab67a1e01c160fcfcddc3: 25.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT

Recorded positions:
- Orbit 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4, level 1, cycle 0, ring 2, slot 4, parent 0x0a1c5BAcFF52599Ab88D0883Da5F363201b1b042.
- Orbit 0x0a1c5BAcFF52599Ab88D0883Da5F363201b1b042, level 1, cycle 0, ring 1, slot 1, parent 0x0a1c5BAcFF52599Ab88D0883Da5F363201b1b042.
- Orbit 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3, level 1, cycle 0, ring 3, slot 13, parent 0x0a1c5BAcFF52599Ab88D0883Da5F363201b1b042.

Required but missing positions:
- None.

### 32. Level 1: 0x8665044C9e7aD8997872a1dA7Cd128041A28571f

Block 94859264; [transaction](https://polygonscan.com/tx/0x03cec91581f0cf3c07b70d2ba9bd22c49effa1ed95ccfee369442ebab40fe7b2).
Paid 50.0 USDT. Permanent sponsor: 0xEDAE164e094E11bE2Af695F15964e94EDB8d6478.
Selected orbit: 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4, cycle 0, ring 2, position 6.
Inactive/non-joined sponsors skipped: 0xEDAE164e094E11bE2Af695F15964e94EDB8d6478.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0xd15A932B6eBdAfc9347aE567523e4bDc70De3C3B. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3fd47bc432b2c0681d7687adfe77ac0307f1f8f4: 10.0 USDT
- 0x41b65562ccdb4baf1f9ab67a1e01c160fcfcddc3: 25.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xd15a932b6ebdafc9347ae567523e4bdc70de3c3b: 10.0 USDT

Recorded positions:
- Orbit 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4, level 1, cycle 0, ring 2, slot 6, parent 0xd15A932B6eBdAfc9347aE567523e4bDc70De3C3B.
- Orbit 0xd15A932B6eBdAfc9347aE567523e4bDc70De3C3B, level 1, cycle 0, ring 1, slot 1, parent 0xd15A932B6eBdAfc9347aE567523e4bDc70De3C3B.
- Orbit 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3, level 1, cycle 0, ring 3, slot 19, parent 0xd15A932B6eBdAfc9347aE567523e4bDc70De3C3B.

Required but missing positions:
- None.

### 33. Level 1: 0xcC0aF2Eacf2937A1526F23F137644D4F94821899

Block 94871497; [transaction](https://polygonscan.com/tx/0xe5c25beedb756bc47091a607710833aa587edf7b690296f4b962d4e7546ada0d).
Paid 50.0 USDT. Permanent sponsor: 0x1EA5513e017b4e25847e91aBc84aC8686331f80B.
Selected orbit: 0x1EA5513e017b4e25847e91aBc84aC8686331f80B, cycle 0, ring 1, position 2.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x1EA5513e017b4e25847e91aBc84aC8686331f80B. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x1ea5513e017b4e25847e91abc84ac8686331f80b: 10.0 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 10.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xcc7f84f64abc9e5861e9f27d20811af42f189e45: 25.0 USDT

Recorded positions:
- Orbit 0x1EA5513e017b4e25847e91aBc84aC8686331f80B, level 1, cycle 0, ring 1, slot 2, parent 0x1EA5513e017b4e25847e91aBc84aC8686331f80B.
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 1, cycle 0, ring 2, slot 8, parent 0x1EA5513e017b4e25847e91aBc84aC8686331f80B.
- Orbit 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45, level 1, cycle 0, ring 3, slot 25, parent 0x1EA5513e017b4e25847e91aBc84aC8686331f80B.

Required but missing positions:
- None.

### 34. Level 1: 0xbA14da48b3111DFb40A65E272833A2B1838b062D

Block 94874884; [transaction](https://polygonscan.com/tx/0x97d487fc84f0ab623b9d41d21e683d28339c64c03793cbb0f6f9569caacd9cae).
Paid 50.0 USDT. Permanent sponsor: 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0.
Selected orbit: 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x5b511a2b0e4db2ca73b276969f3a52661aef12f1: 25.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xe8b1ac47231651ccc38326a59645a8d976d0eabf: 10.0 USDT
- 0xf93ab102473de4886e5e82ed48f6dfe21f82afd0: 10.0 USDT

Recorded positions:
- Orbit 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0, level 1, cycle 0, ring 1, slot 1, parent 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0.
- Orbit 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf, level 1, cycle 0, ring 2, slot 4, parent 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0.
- Orbit 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1, level 1, cycle 0, ring 3, slot 13, parent 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0.

Required but missing positions:
- None.

### 35. Level 2: 0xbA14da48b3111DFb40A65E272833A2B1838b062D

Block 94874926; [transaction](https://polygonscan.com/tx/0xb8690639ca397967100c64396f84314a56c9c692146463cee2f8f719f4a7db11).
Paid 150.0 USDT. Permanent sponsor: 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0.
Selected orbit: 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 15%: 22.5 USDT to 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0. Eligible structural recipient for this ring component.
- Role 2, 25%: 37.5 USDT to 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf. Eligible structural recipient for this ring component.
- Role 3, 50%: 75.0 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 3.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 75.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 12.0 USDT
- 0xe8b1ac47231651ccc38326a59645a8d976d0eabf: 37.5 USDT
- 0xf93ab102473de4886e5e82ed48f6dfe21f82afd0: 22.5 USDT

Recorded positions:
- Orbit 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0, level 2, cycle 0, ring 1, slot 1, parent 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0.
- Orbit 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf, level 2, cycle 0, ring 2, slot 3, parent 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0.
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 2, cycle 0, ring 3, slot 7, parent 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0.

Required but missing positions:
- None.

### 36. Level 1: 0x52253B7e997205ce00fE2A2148a8a849D0143A74

Block 94875291; [transaction](https://polygonscan.com/tx/0xc6f714a63177d0fa567a9923110dbdc3870134e7dd27c30e234259fcbf460379).
Paid 50.0 USDT. Permanent sponsor: 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0.
Selected orbit: 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0, cycle 0, ring 1, position 2.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x5b511a2b0e4db2ca73b276969f3a52661aef12f1: 25.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xe8b1ac47231651ccc38326a59645a8d976d0eabf: 10.0 USDT
- 0xf93ab102473de4886e5e82ed48f6dfe21f82afd0: 10.0 USDT

Recorded positions:
- Orbit 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0, level 1, cycle 0, ring 1, slot 2, parent 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0.
- Orbit 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf, level 1, cycle 0, ring 2, slot 7, parent 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0.
- Orbit 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1, level 1, cycle 0, ring 3, slot 22, parent 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0.

Required but missing positions:
- None.

### 37. Level 1: 0x31fc72c65d7c180290CBFc2694c11c3918f013d8

Block 94877353; [transaction](https://polygonscan.com/tx/0xb2f8af39e50017546df9a0dd1c5d9aec4d3a219b83dcf630990ad99bdc587a9a).
Paid 50.0 USDT. Permanent sponsor: 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3.
Selected orbit: 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3, cycle 0, ring 1, position 2.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xD39dB4B1535bcC980915Bb5e92C601783213F06A. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0x1EA5513e017b4e25847e91aBc84aC8686331f80B. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x1ea5513e017b4e25847e91abc84ac8686331f80b: 25.0 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x41b65562ccdb4baf1f9ab67a1e01c160fcfcddc3: 10.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xd39db4b1535bcc980915bb5e92c601783213f06a: 10.0 USDT

Recorded positions:
- Orbit 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3, level 1, cycle 0, ring 1, slot 2, parent 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3.
- Orbit 0xD39dB4B1535bcC980915Bb5e92C601783213F06A, level 1, cycle 0, ring 2, slot 7, parent 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3.
- Orbit 0x1EA5513e017b4e25847e91aBc84aC8686331f80B, level 1, cycle 0, ring 3, slot 22, parent 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3.

Required but missing positions:
- None.

### 38. Level 1: 0xAE0c7305860351a270f4c756e03071e4c18ed086

Block 94887243; [transaction](https://polygonscan.com/tx/0xf6b6f5b35bed0c2689b18e548acf14e6a8337eee58f585d581e1e8aae376dc74).
Paid 50.0 USDT. Permanent sponsor: 0x834b9535468aDCEbA7d36E225837FC66e749ba9c.
Selected orbit: 0xBafaFb77a090D7F989aa64D4f867b1B942A50591, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: 0x834b9535468aDCEbA7d36E225837FC66e749ba9c.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0xBafaFb77a090D7F989aa64D4f867b1B942A50591. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xb673c9D14Da920f187d25Cc793f1955a43284622. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 3.125 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 3.125 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 3.125 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 3.125 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 3.125 USDT
- 0xb673c9d14da920f187d25cc793f1955a43284622: 10.0 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 3.125 USDT
- 0xbafafb77a090d7f989aa64d4f867b1b942a50591: 10.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 3.125 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 3.125 USDT

Recorded positions:
- Orbit 0xBafaFb77a090D7F989aa64D4f867b1B942A50591, level 1, cycle 0, ring 1, slot 1, parent 0xBafaFb77a090D7F989aa64D4f867b1B942A50591.
- Orbit 0xb673c9D14Da920f187d25Cc793f1955a43284622, level 1, cycle 0, ring 2, slot 4, parent 0xBafaFb77a090D7F989aa64D4f867b1B942A50591.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 1, cycle 0, ring 3, slot 14, parent 0xBafaFb77a090D7F989aa64D4f867b1B942A50591. Historical expected position, not an instruction to overwrite live state.

### 39. Level 2: 0xBafaFb77a090D7F989aa64D4f867b1B942A50591

Block 94889049; [transaction](https://polygonscan.com/tx/0xa5df8c1bf3333e4d080fcb6505026577f9195620a2360a502465903f14507f48).
Paid 150.0 USDT. Permanent sponsor: 0xb673c9D14Da920f187d25Cc793f1955a43284622.
Selected orbit: 0xb673c9D14Da920f187d25Cc793f1955a43284622, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 15%: 22.5 USDT to 0xb673c9D14Da920f187d25Cc793f1955a43284622. Eligible structural recipient for this ring component.
- Role 2, 25%: 37.5 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.
- Role 3, 50%: 75.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. No eligible structural ancestor; fallback to ID1, split among eight founders.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 14.0625 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 3.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 14.0625 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 14.0625 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 14.0625 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 14.0625 USDT
- 0xb673c9d14da920f187d25cc793f1955a43284622: 22.5 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 14.0625 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 12.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 14.0625 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 14.0625 USDT

Recorded positions:
- Orbit 0xb673c9D14Da920f187d25Cc793f1955a43284622, level 2, cycle 0, ring 1, slot 1, parent 0xb673c9D14Da920f187d25Cc793f1955a43284622.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 2, cycle 0, ring 2, slot 4, parent 0xb673c9D14Da920f187d25Cc793f1955a43284622. Historical expected position, not an instruction to overwrite live state.

### 40. Level 2: 0x5b511a2b0e4db2CA73B276969f3A52661aEf12f1

Block 94889189; [transaction](https://polygonscan.com/tx/0xd74104f08c56cfbd6f16a16debd82b3b92b150af784528624399725e7bf9c0cd).
Paid 150.0 USDT. Permanent sponsor: 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
Selected orbit: 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, cycle 0, ring 2, position 5.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 15%: 22.5 USDT to 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf. Eligible structural recipient for this ring component.
- Role 2, 25%: 37.5 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.
- Role 3, 50%: 75.0 USDT to 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 3.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 37.5 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 12.0 USDT
- 0xcc7f84f64abc9e5861e9f27d20811af42f189e45: 75.0 USDT
- 0xe8b1ac47231651ccc38326a59645a8d976d0eabf: 22.5 USDT

Recorded positions:
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 2, cycle 0, ring 2, slot 5, parent 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf.
- Orbit 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf, level 2, cycle 0, ring 1, slot 2, parent 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf.
- Orbit 0xCC7f84F64ABc9E5861E9f27d20811Af42f189E45, level 2, cycle 0, ring 3, slot 11, parent 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf.

Required but missing positions:
- None.

### 41. Level 3: 0xD39dB4B1535bcC980915Bb5e92C601783213F06A

Block 94892039; [transaction](https://polygonscan.com/tx/0x09f57f98fb6bd5d18c90eb767dde5461d4b736a19ce5e119a8581d7a727aeacb).
Paid 450.0 USDT. Permanent sponsor: 0x1EA5513e017b4e25847e91aBc84aC8686331f80B.
Selected orbit: 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, cycle 0, ring 1, position 2.
Inactive/non-joined sponsors skipped: 0x1EA5513e017b4e25847e91aBc84aC8686331f80B.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 40%: 180.0 USDT to 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1. Eligible structural recipient for this ring component.
- Role 2, 50%: 225.0 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 9.0 USDT
- 0x3f02d99d7398acdb29b2f6dca50a0e35908629c1: 180.0 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 225.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 36.0 USDT

Recorded positions:
- Orbit 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1, level 3, cycle 0, ring 1, slot 2, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 3, cycle 0, ring 2, slot 7, parent 0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1.

Required but missing positions:
- None.

### 42. Level 2: 0xAE0c7305860351a270f4c756e03071e4c18ed086

Block 94896233; [transaction](https://polygonscan.com/tx/0x6a5cdf2796c03b86a36b8580a666d3cc298b2b0ca930bba0c104243e3be6c455).
Paid 150.0 USDT. Permanent sponsor: 0x834b9535468aDCEbA7d36E225837FC66e749ba9c.
Selected orbit: 0xBafaFb77a090D7F989aa64D4f867b1B942A50591, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: 0x834b9535468aDCEbA7d36E225837FC66e749ba9c.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 15%: 22.5 USDT to 0xBafaFb77a090D7F989aa64D4f867b1B942A50591. Eligible structural recipient for this ring component.
- Role 2, 25%: 37.5 USDT to 0xb673c9D14Da920f187d25Cc793f1955a43284622. Eligible structural recipient for this ring component.
- Role 3, 50%: 75.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 9.375 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 3.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 9.375 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 9.375 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 9.375 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 9.375 USDT
- 0xb673c9d14da920f187d25cc793f1955a43284622: 37.5 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 9.375 USDT
- 0xbafafb77a090d7f989aa64d4f867b1b942a50591: 22.5 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 12.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 9.375 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 9.375 USDT

Recorded positions:
- Orbit 0xBafaFb77a090D7F989aa64D4f867b1B942A50591, level 2, cycle 0, ring 1, slot 1, parent 0xBafaFb77a090D7F989aa64D4f867b1B942A50591.
- Orbit 0xb673c9D14Da920f187d25Cc793f1955a43284622, level 2, cycle 0, ring 2, slot 3, parent 0xBafaFb77a090D7F989aa64D4f867b1B942A50591.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 2, cycle 0, ring 3, slot 8, parent 0xBafaFb77a090D7F989aa64D4f867b1B942A50591. Historical expected position, not an instruction to overwrite live state.

### 43. Level 1: 0x46585b7D12017B666F43FB049a720039ADc4A606

Block 94903306; [transaction](https://polygonscan.com/tx/0x2f67570aa79e5a5fefbd0d00bc206cac0481005a5930ca81bf8f7b5d23601282).
Paid 50.0 USDT. Permanent sponsor: 0xbA14da48b3111DFb40A65E272833A2B1838b062D.
Selected orbit: 0xbA14da48b3111DFb40A65E272833A2B1838b062D, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0xbA14da48b3111DFb40A65E272833A2B1838b062D. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0xba14da48b3111dfb40a65e272833a2b1838b062d: 10.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xe8b1ac47231651ccc38326a59645a8d976d0eabf: 25.0 USDT
- 0xf93ab102473de4886e5e82ed48f6dfe21f82afd0: 10.0 USDT

Recorded positions:
- Orbit 0xbA14da48b3111DFb40A65E272833A2B1838b062D, level 1, cycle 0, ring 1, slot 1, parent 0xbA14da48b3111DFb40A65E272833A2B1838b062D.
- Orbit 0xF93AB102473De4886e5E82ED48f6dfe21f82afD0, level 1, cycle 0, ring 2, slot 4, parent 0xbA14da48b3111DFb40A65E272833A2B1838b062D.
- Orbit 0xE8b1ac47231651cCc38326a59645a8D976D0Eabf, level 1, cycle 0, ring 3, slot 13, parent 0xbA14da48b3111DFb40A65E272833A2B1838b062D.

Required but missing positions:
- None.

### 44. Level 1: 0x97d97Fd0cc2df231f44aeAe39A12e5e9944AcD18

Block 95053960; [transaction](https://polygonscan.com/tx/0xccafc16e6d127626a315fb1d083927ad569435b5e72bb81e3f6e54bd601639c7).
Paid 50.0 USDT. Permanent sponsor: 0x0a1c5BAcFF52599Ab88D0883Da5F363201b1b042.
Selected orbit: 0x0a1c5BAcFF52599Ab88D0883Da5F363201b1b042, cycle 0, ring 1, position 2.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x0a1c5BAcFF52599Ab88D0883Da5F363201b1b042. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x0a1c5bacff52599ab88d0883da5f363201b1b042: 10.0 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3fd47bc432b2c0681d7687adfe77ac0307f1f8f4: 10.0 USDT
- 0x41b65562ccdb4baf1f9ab67a1e01c160fcfcddc3: 25.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT

Recorded positions:
- Orbit 0x0a1c5BAcFF52599Ab88D0883Da5F363201b1b042, level 1, cycle 0, ring 1, slot 2, parent 0x0a1c5BAcFF52599Ab88D0883Da5F363201b1b042.
- Orbit 0x3Fd47bC432B2c0681d7687AdfE77Ac0307F1f8f4, level 1, cycle 0, ring 2, slot 7, parent 0x0a1c5BAcFF52599Ab88D0883Da5F363201b1b042.
- Orbit 0x41b65562CCDb4BaF1f9aB67A1E01c160fcFCDDc3, level 1, cycle 0, ring 3, slot 22, parent 0x0a1c5BAcFF52599Ab88D0883Da5F363201b1b042.

Required but missing positions:
- None.

### 45. Level 1: 0x31f9a0B00E75456571f77f2fD806479433494e9B

Block 95163199; [transaction](https://polygonscan.com/tx/0xfb124e7d6c87c3ee732dc00d62b7476568f706283e516253c64578ca0e5efae7).
Paid 50.0 USDT. Permanent sponsor: 0xb673c9D14Da920f187d25Cc793f1955a43284622.
Selected orbit: 0xb673c9D14Da920f187d25Cc793f1955a43284622, cycle 0, ring 1, position 2.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0xb673c9D14Da920f187d25Cc793f1955a43284622. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.
- Role 3, 50%: 25.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. No eligible structural ancestor; fallback to ID1, split among eight founders.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 4.375 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 4.375 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 4.375 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 4.375 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 4.375 USDT
- 0xb673c9d14da920f187d25cc793f1955a43284622: 10.0 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 4.375 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 4.375 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 4.375 USDT

Recorded positions:
- Orbit 0xb673c9D14Da920f187d25Cc793f1955a43284622, level 1, cycle 0, ring 1, slot 2, parent 0xb673c9D14Da920f187d25Cc793f1955a43284622.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 1, cycle 0, ring 2, slot 8, parent 0xb673c9D14Da920f187d25Cc793f1955a43284622. Historical expected position, not an instruction to overwrite live state.

### 46. Level 1: 0xEA2bCf620d164Af63fba2F832C5F37E9eABdC528

Block 96535563; [transaction](https://polygonscan.com/tx/0xc252c30bac39632e83f852368c99321f77ad4f8f3fa988a6d23a87f7afd29771).
Paid 50.0 USDT. Permanent sponsor: 0xb673c9D14Da920f187d25Cc793f1955a43284622.
Selected orbit: 0xb673c9D14Da920f187d25Cc793f1955a43284622, cycle 0, ring 1, position 3.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0xb673c9D14Da920f187d25Cc793f1955a43284622. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.
- Role 3, 50%: 25.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. No eligible structural ancestor; fallback to ID1, split among eight founders.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 4.375 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 4.375 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 4.375 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 4.375 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 4.375 USDT
- 0xb673c9d14da920f187d25cc793f1955a43284622: 10.0 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 4.375 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 4.375 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 4.375 USDT

Recorded positions:
- Orbit 0xb673c9D14Da920f187d25Cc793f1955a43284622, level 1, cycle 0, ring 1, slot 3, parent 0xb673c9D14Da920f187d25Cc793f1955a43284622.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 1, cycle 0, ring 2, slot 11, parent 0xb673c9D14Da920f187d25Cc793f1955a43284622. Historical expected position, not an instruction to overwrite live state.

### 47. Level 2: 0xEA2bCf620d164Af63fba2F832C5F37E9eABdC528

Block 96535583; [transaction](https://polygonscan.com/tx/0x100d9168bc50af7f27d5fae550ac6f2444f0fb4c817467d67510f3c51aec4129).
Paid 150.0 USDT. Permanent sponsor: 0xb673c9D14Da920f187d25Cc793f1955a43284622.
Selected orbit: 0xb673c9D14Da920f187d25Cc793f1955a43284622, cycle 0, ring 1, position 2.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 15%: 22.5 USDT to 0xb673c9D14Da920f187d25Cc793f1955a43284622. Eligible structural recipient for this ring component.
- Role 2, 25%: 37.5 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.
- Role 3, 50%: 75.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. No eligible structural ancestor; fallback to ID1, split among eight founders.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 14.0625 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 3.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 14.0625 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 14.0625 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 14.0625 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 14.0625 USDT
- 0xb673c9d14da920f187d25cc793f1955a43284622: 22.5 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 14.0625 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 12.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 14.0625 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 14.0625 USDT

Recorded positions:
- Orbit 0xb673c9D14Da920f187d25Cc793f1955a43284622, level 2, cycle 0, ring 1, slot 2, parent 0xb673c9D14Da920f187d25Cc793f1955a43284622.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 2, cycle 0, ring 2, slot 6, parent 0xb673c9D14Da920f187d25Cc793f1955a43284622. Historical expected position, not an instruction to overwrite live state.

### 48. Level 3: 0xEA2bCf620d164Af63fba2F832C5F37E9eABdC528

Block 96535653; [transaction](https://polygonscan.com/tx/0x92a746e4b3d8b137b521eaed117a25aa1cad2b6a19107607ad917733f6652a49).
Paid 450.0 USDT. Permanent sponsor: 0xb673c9D14Da920f187d25Cc793f1955a43284622.
Selected orbit: 0xb673c9D14Da920f187d25Cc793f1955a43284622, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: FAIL: required additional ID1 position absent.

Expected ring payments, verified against receipt:
- Role 1, 40%: 180.0 USDT to 0xb673c9D14Da920f187d25Cc793f1955a43284622. Eligible structural recipient for this ring component.
- Role 2, 50%: 225.0 USDT to 0xCE38722a72c9099D9237897E18B0cfb6D51c4470. ID1 is the structural ancestor; eight founders share its component.

Actual USDT recipients:
- 0x120fbeeeb36c003caee1f4b37ac9297c88d51d42: 28.125 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 9.0 USDT
- 0x435363dad972a7abb2a739525c461f06a45ce294: 28.125 USDT
- 0x5fd791b457ad32a8e2a2e81fc211238639824127: 28.125 USDT
- 0x88d350bd016751b08baf6508e1bdf186a1b1305b: 28.125 USDT
- 0xa2033515f0f35a5fa4803edde306c293a81c2da9: 28.125 USDT
- 0xb673c9d14da920f187d25cc793f1955a43284622: 180.0 USDT
- 0xb850f836d0e3cfed4a7dbdcaa7a4c78afac0d911: 28.125 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 36.0 USDT
- 0xf4f83f8181cd9a8c96a33f4d9af487b444353a15: 28.125 USDT
- 0xf73d4ae3a9efebab76ab9053cd055b4503929231: 28.125 USDT

Recorded positions:
- Orbit 0xb673c9D14Da920f187d25Cc793f1955a43284622, level 3, cycle 0, ring 1, slot 1, parent 0xb673c9D14Da920f187d25Cc793f1955a43284622.

Required but missing positions:
- Orbit 0xCE38722a72c9099D9237897E18B0cfb6D51c4470, level 3, cycle 0, ring 2, slot 5, parent 0xb673c9D14Da920f187d25Cc793f1955a43284622. Historical expected position, not an instruction to overwrite live state.

### 49. Level 1: 0x3FF8375454e356de9fFB32082C7546006D9a086F

Block 97136601; [transaction](https://polygonscan.com/tx/0x845a8fe93d7311878a97097a25a284dbb8a53704a153ace6e5a0acd9f08a037e).
Paid 50.0 USDT. Permanent sponsor: 0x3320467c8E996e5f5a1f71611cD618DBa18B7D4d.
Selected orbit: 0x3320467c8E996e5f5a1f71611cD618DBa18B7D4d, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x3320467c8E996e5f5a1f71611cD618DBa18B7D4d. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0xa1B5a30fAF2032471fBAc7d5A89842c0d80b2372. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0x863447369632EA4AaC724683c1D448C68e2f1ADE. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3320467c8e996e5f5a1f71611cd618dba18b7d4d: 10.0 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x863447369632ea4aac724683c1d448c68e2f1ade: 25.0 USDT
- 0xa1b5a30faf2032471fbac7d5a89842c0d80b2372: 10.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT

Recorded positions:
- Orbit 0x3320467c8E996e5f5a1f71611cD618DBa18B7D4d, level 1, cycle 0, ring 1, slot 1, parent 0x3320467c8E996e5f5a1f71611cD618DBa18B7D4d.
- Orbit 0xa1B5a30fAF2032471fBAc7d5A89842c0d80b2372, level 1, cycle 0, ring 2, slot 4, parent 0x3320467c8E996e5f5a1f71611cD618DBa18B7D4d.
- Orbit 0x863447369632EA4AaC724683c1D448C68e2f1ADE, level 1, cycle 0, ring 3, slot 14, parent 0x3320467c8E996e5f5a1f71611cD618DBa18B7D4d.

Required but missing positions:
- None.

### 50. Level 1: 0xD077BdB30591dA4Bb620C57753726E34746064ff

Block 97140382; [transaction](https://polygonscan.com/tx/0x7477895aa5dade009b2a8dfa963efd6885075ac87694b2bb07249e1c44b68735).
Paid 50.0 USDT. Permanent sponsor: 0x3FF8375454e356de9fFB32082C7546006D9a086F.
Selected orbit: 0x3FF8375454e356de9fFB32082C7546006D9a086F, cycle 0, ring 1, position 1.
Inactive/non-joined sponsors skipped: none.

Financial: PASS for these historical activations, including intended recipients and actual token transfers. Structural: PASS for this activation.

Expected ring payments, verified against receipt:
- Role 1, 20%: 10.0 USDT to 0x3FF8375454e356de9fFB32082C7546006D9a086F. Eligible structural recipient for this ring component.
- Role 2, 20%: 10.0 USDT to 0x3320467c8E996e5f5a1f71611cD618DBa18B7D4d. Eligible structural recipient for this ring component.
- Role 3, 50%: 25.0 USDT to 0xa1B5a30fAF2032471fBAc7d5A89842c0d80b2372. Eligible structural recipient for this ring component.

Actual USDT recipients:
- 0x3320467c8e996e5f5a1f71611cd618dba18b7d4d: 10.0 USDT
- 0x3ee9b4913e175c15b2ef76ac352b6737210248fb: 1.0 USDT
- 0x3ff8375454e356de9ffb32082c7546006d9a086f: 10.0 USDT
- 0xa1b5a30faf2032471fbac7d5a89842c0d80b2372: 25.0 USDT
- 0xbb2cf7ef867f46a93ae1f9ded564927874b79b52: 4.0 USDT

Recorded positions:
- Orbit 0x3FF8375454e356de9fFB32082C7546006D9a086F, level 1, cycle 0, ring 1, slot 1, parent 0x3FF8375454e356de9fFB32082C7546006D9a086F.
- Orbit 0x3320467c8E996e5f5a1f71611cD618DBa18B7D4d, level 1, cycle 0, ring 2, slot 4, parent 0x3FF8375454e356de9fFB32082C7546006D9a086F.
- Orbit 0xa1B5a30fAF2032471fBAc7d5A89842c0d80b2372, level 1, cycle 0, ring 3, slot 13, parent 0x3FF8375454e356de9fFB32082C7546006D9a086F.

Required but missing positions:
- None.
