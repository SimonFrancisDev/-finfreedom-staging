# Canonical Contract-Derived Behavior Trace

Generated: 2026-11-12T14:48:49.363Z

All amounts below are read from transaction events or token balance changes. This file is generated, not manually transcribed.

## Final Cycle State

Bob P12 completed cycles: 3
Bob P39 completed cycles: 1

## 1. ALICE_SPONSOR registers under ID1

Transaction: `0xbc783b20af431aa6639dd89693deca2002ce4d4cd7ea9bd56de47a65741310ca`
Block: 4164

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- FOUNDER_1: +1.125 USDT
- FOUNDER_2: +1.125 USDT
- FOUNDER_3: +1.125 USDT
- FOUNDER_4: +1.125 USDT
- FOUNDER_5: +1.125 USDT
- FOUNDER_6: +1.125 USDT
- FOUNDER_7: +1.125 USDT
- FOUNDER_8: +1.125 USDT
- ALICE_SPONSOR: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), referrer=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266)
- 3. p4.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, position=1, cycleNumber=1, activationId=1, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, line=1, position=1, linePaymentNumber=1
- 5. p4.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, amount=10000000, timestamp=1794498791
- 25. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, receiptType=2, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 26. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=1, level=1, receiptType=2, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 30. levelManager.SystemChargeDistributedDetailed: activationId=1, user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 31. levelManager.ActivationFinancialSummaryRecorded: activationId=1, user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 32. levelManager.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, amount=10000000
- 33. levelManager.LevelActivatedInOrbit: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 34. registration.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, price=10000000

## 2. ALICE_SPONSOR activates Level 2

Transaction: `0xfa297623a517de9333d323dc68fe664cf24135bb52173b2470e12dc826377eaf`
Block: 4165

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- FOUNDER_1: +2.25 USDT
- FOUNDER_2: +2.25 USDT
- FOUNDER_3: +2.25 USDT
- FOUNDER_4: +2.25 USDT
- FOUNDER_5: +2.25 USDT
- FOUNDER_6: +2.25 USDT
- FOUNDER_7: +2.25 USDT
- FOUNDER_8: +2.25 USDT
- ALICE_SPONSOR: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=1, cycleNumber=1, activationId=2, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=1, position=1, linePaymentNumber=1
- 4. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=1, amount=20000000, timestamp=1794498792
- 6. p12.SpilloverPaid: from=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 25. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=2, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 26. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=2, level=2, receiptType=2, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 44. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=3, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 45. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=2, level=2, receiptType=3, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 49. levelManager.SystemChargeDistributedDetailed: activationId=2, user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 50. levelManager.ActivationFinancialSummaryRecorded: activationId=2, user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 51. levelManager.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=20000000
- 52. levelManager.LevelActivatedInOrbit: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 53. registration.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, price=20000000

## 3. ALICE_SPONSOR activates Level 3

Transaction: `0x136cdb9ce0d16841575074ba0acee98101e20574420a119e2237209e4bdb0bbf`
Block: 4166

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- FOUNDER_1: +4.5 USDT
- FOUNDER_2: +4.5 USDT
- FOUNDER_3: +4.5 USDT
- FOUNDER_4: +4.5 USDT
- FOUNDER_5: +4.5 USDT
- FOUNDER_6: +4.5 USDT
- FOUNDER_7: +4.5 USDT
- FOUNDER_8: +4.5 USDT
- ALICE_SPONSOR: -40.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=1, cycleNumber=1, activationId=3, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=1, position=1, linePaymentNumber=1
- 4. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=1, amount=40000000, timestamp=1794498793
- 6. p39.SpilloverPaid: from=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 26. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=2, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=3, level=3, receiptType=2, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 62. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 63. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=3, level=3, receiptType=3, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 64. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 65. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=3, level=3, receiptType=3, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 69. levelManager.SystemChargeDistributedDetailed: activationId=3, user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 70. levelManager.ActivationFinancialSummaryRecorded: activationId=3, user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 71. levelManager.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=40000000
- 72. levelManager.LevelActivatedInOrbit: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 73. registration.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, price=40000000

## 4. BOB_ORBIT_OWNER registers under ALICE_SPONSOR

Transaction: `0xabe5eec8aa80698a13310bcd688721fd5de470cdb48879d4fde14b92c027930a`
Block: 4169

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- ALICE_SPONSOR: +9.0 USDT
- BOB_ORBIT_OWNER: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), referrer=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79)
- 3. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, cycleNumber=1, activationId=4, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=1, linePaymentNumber=1
- 5. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, amount=10000000, timestamp=1794498796
- 9. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=4, level=1, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=4, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=4, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, price=10000000

## 5. BOB_ORBIT_OWNER activates Level 2

Transaction: `0x820d227475f6c45aa9ec3f02ba92c8944f31ceffddab1d4009f7d0fc92f4dbe3`
Block: 4170

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- FOUNDER_1: +1.25 USDT
- FOUNDER_2: +1.25 USDT
- FOUNDER_3: +1.25 USDT
- FOUNDER_4: +1.25 USDT
- FOUNDER_5: +1.25 USDT
- FOUNDER_6: +1.25 USDT
- FOUNDER_7: +1.25 USDT
- FOUNDER_8: +1.25 USDT
- ALICE_SPONSOR: +8.0 USDT
- BOB_ORBIT_OWNER: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=1, cycleNumber=1, activationId=5, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=1, position=1, linePaymentNumber=1
- 4. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=1, amount=20000000, timestamp=1794498797
- 6. p12.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=5, level=2, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=4, cycleNumber=1, activationId=5, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=2, position=4, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=4, amount=10000000, timestamp=1794498797
- 14. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=4, line=2, linePaymentNumber=1, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 32. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 33. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=5, level=2, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 37. levelManager.SystemChargeDistributedDetailed: activationId=5, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 38. levelManager.ActivationFinancialSummaryRecorded: activationId=5, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 39. levelManager.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, amount=20000000
- 40. levelManager.LevelActivatedInOrbit: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 41. registration.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, price=20000000

## 6. BOB_ORBIT_OWNER activates Level 3

Transaction: `0xe2d7f63f276145964cfd0d871d3dbed46219f658ca39525007e3abbc0fd4913f`
Block: 4171

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- FOUNDER_1: +3.5 USDT
- FOUNDER_2: +3.5 USDT
- FOUNDER_3: +3.5 USDT
- FOUNDER_4: +3.5 USDT
- FOUNDER_5: +3.5 USDT
- FOUNDER_6: +3.5 USDT
- FOUNDER_7: +3.5 USDT
- FOUNDER_8: +3.5 USDT
- ALICE_SPONSOR: +8.0 USDT
- BOB_ORBIT_OWNER: -40.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=1, cycleNumber=1, activationId=6, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=1, position=1, linePaymentNumber=1
- 4. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=1, amount=40000000, timestamp=1794498798
- 6. p39.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=6, level=3, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=4, cycleNumber=1, activationId=6, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=2, position=4, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=4, amount=8000000, timestamp=1794498798
- 15. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=4, line=2, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 50. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 51. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=6, level=3, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 52. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 53. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=6, level=3, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 57. levelManager.SystemChargeDistributedDetailed: activationId=6, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 58. levelManager.ActivationFinancialSummaryRecorded: activationId=6, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 59. levelManager.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, amount=40000000
- 60. levelManager.LevelActivatedInOrbit: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 61. registration.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, price=40000000

## 7. MEMBER_01 registers under BOB_ORBIT_OWNER

Transaction: `0x8bdea8b07c23bd29f08a1a5930c0a8a65d54651b9414a1689a9b3c56270de0c5`
Block: 4174

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_01: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, cycleNumber=1, activationId=7, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=1, linePaymentNumber=1
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, position=1, amount=10000000, timestamp=1794498801
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=7, level=1, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=7, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=7, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, price=10000000

## 8. MEMBER_01 activates Level 2

Transaction: `0xca16d8708dbd3961c524f3469059c334326112e830bf5d7451992c405e2525dd`
Block: 4175

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- ALICE_SPONSOR: +10.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_01: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=1, cycleNumber=1, activationId=8, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=1, linePaymentNumber=1
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=1, amount=20000000, timestamp=1794498802
- 6. p12.SpilloverPaid: from=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=8, level=2, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=4, cycleNumber=1, activationId=8, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=4, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=4, amount=10000000, timestamp=1794498802
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=4, line=2, linePaymentNumber=1, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=8, level=2, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=8, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=8, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, price=20000000

## 9. MEMBER_01 activates Level 3

Transaction: `0x63a4cd9375af61f876427ad5046fec1fb9fb459767fd44ee7c6d58e35003b15f`
Block: 4176

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- FOUNDER_1: +2.5 USDT
- FOUNDER_2: +2.5 USDT
- FOUNDER_3: +2.5 USDT
- FOUNDER_4: +2.5 USDT
- FOUNDER_5: +2.5 USDT
- FOUNDER_6: +2.5 USDT
- FOUNDER_7: +2.5 USDT
- FOUNDER_8: +2.5 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_01: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=1, cycleNumber=1, activationId=9, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=1, position=1, linePaymentNumber=1
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=1, amount=40000000, timestamp=1794498803
- 6. p39.SpilloverPaid: from=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=9, level=3, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=4, cycleNumber=1, activationId=9, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=2, position=4, linePaymentNumber=1
- 15. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=4, amount=8000000, timestamp=1794498803
- 16. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=4, line=2, linePaymentNumber=1, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=8000000
- 21. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=13, cycleNumber=1, activationId=9, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=3, position=13, linePaymentNumber=1
- 23. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=13, amount=20000000, timestamp=1794498803
- 24. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=13, line=3, linePaymentNumber=1, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 42. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 43. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=9, level=3, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 44. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 45. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=9, level=3, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=13, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 49. levelManager.SystemChargeDistributedDetailed: activationId=9, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 50. levelManager.ActivationFinancialSummaryRecorded: activationId=9, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 51. levelManager.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=40000000
- 52. levelManager.LevelActivatedInOrbit: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 53. registration.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, price=40000000

## 10. MEMBER_02 registers under BOB_ORBIT_OWNER

Transaction: `0x196f5ea61b26c37aed14792dd878d30ec6ae7f80b94717e552fdde27269f42e4`
Block: 4179

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_02: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, cycleNumber=1, activationId=10, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=2, linePaymentNumber=2
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, position=2, amount=10000000, timestamp=1794498806
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=10, level=1, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=10, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=10, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, price=10000000

## 11. MEMBER_02 activates Level 2

Transaction: `0xf23e3ad5c4b0885f6b83ac47fc61a493ca49b9bf2ed678711bbac67858f4d4e1`
Block: 4180

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- ALICE_SPONSOR: +10.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_02: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=2, cycleNumber=1, activationId=11, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=2, linePaymentNumber=2
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=2, amount=20000000, timestamp=1794498807
- 6. p12.SpilloverPaid: from=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=11, level=2, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=7, cycleNumber=1, activationId=11, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=7, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=7, amount=10000000, timestamp=1794498807
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=7, line=2, linePaymentNumber=2, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=11, level=2, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=11, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=11, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, price=20000000

## 12. MEMBER_02 activates Level 3

Transaction: `0xe041a66ddd6bad357c86ee103482911489196985a66733e750874beeb611cffa`
Block: 4181

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- FOUNDER_1: +2.5 USDT
- FOUNDER_2: +2.5 USDT
- FOUNDER_3: +2.5 USDT
- FOUNDER_4: +2.5 USDT
- FOUNDER_5: +2.5 USDT
- FOUNDER_6: +2.5 USDT
- FOUNDER_7: +2.5 USDT
- FOUNDER_8: +2.5 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_02: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=2, cycleNumber=1, activationId=12, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=1, position=2, linePaymentNumber=2
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=2, amount=40000000, timestamp=1794498808
- 6. p39.SpilloverPaid: from=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=12, level=3, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=7, cycleNumber=1, activationId=12, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=2, position=7, linePaymentNumber=2
- 15. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=7, amount=8000000, timestamp=1794498808
- 16. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=7, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=16000000, currentEscrowLockedGlobal=16000000
- 21. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=22, cycleNumber=1, activationId=12, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=3, position=22, linePaymentNumber=2
- 23. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=22, amount=20000000, timestamp=1794498808
- 24. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=22, line=3, linePaymentNumber=2, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 42. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 43. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=12, level=3, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 44. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 45. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=12, level=3, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=22, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 49. levelManager.SystemChargeDistributedDetailed: activationId=12, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 50. levelManager.ActivationFinancialSummaryRecorded: activationId=12, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 51. levelManager.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=40000000
- 52. levelManager.LevelActivatedInOrbit: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 53. registration.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, price=40000000

## 13. MEMBER_03 registers under BOB_ORBIT_OWNER

Transaction: `0x9838d69642272cfa5c5d9b5a907a7afa11be602815ec3c21cf4073fe11cee6f9`
Block: 4184

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_03: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, cycleNumber=1, activationId=13, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=3, linePaymentNumber=3
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, position=3, amount=10000000, timestamp=1794498811
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=13, level=1, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=13, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=13, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, price=10000000

## 14. MEMBER_03 activates Level 2

Transaction: `0xeea60ce27688fb48783c9f94e625dccaa9e43aaef7b655c940dcae5e98c61a06`
Block: 4185

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- ALICE_SPONSOR: +10.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_03: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=3, cycleNumber=1, activationId=14, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=3, linePaymentNumber=3
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=3, amount=20000000, timestamp=1794498812
- 6. p12.SpilloverPaid: from=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=14, level=2, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=10, cycleNumber=1, activationId=14, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=10, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=10, amount=10000000, timestamp=1794498812
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=10, line=2, linePaymentNumber=3, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=14, level=2, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=14, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=14, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, price=20000000

## 15. MEMBER_03 activates Level 3

Transaction: `0x16514efe6423c432ff1da39759613c253c1a5a556840f2dac7faa4258c0eacc4`
Block: 4186

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- FOUNDER_1: +2.5 USDT
- FOUNDER_2: +2.5 USDT
- FOUNDER_3: +2.5 USDT
- FOUNDER_4: +2.5 USDT
- FOUNDER_5: +2.5 USDT
- FOUNDER_6: +2.5 USDT
- FOUNDER_7: +2.5 USDT
- FOUNDER_8: +2.5 USDT
- MEMBER_03: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +16.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=3, cycleNumber=1, activationId=15, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=1, position=3, linePaymentNumber=3
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=8000000, toSpillover2=20000000, toEscrow=8000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=3, amount=40000000, timestamp=1794498813
- 7. p39.SpilloverPaid: from=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=15, level=3, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, orbitType=39, sourcePosition=3, sourceCycle=1, expectedAmount=8000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=15
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=24000000
- 17. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=10, cycleNumber=1, activationId=15, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=2, position=10, linePaymentNumber=3
- 20. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=10, amount=8000000, timestamp=1794498813
- 21. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=10, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 25. escrow.EscrowLocked: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=24000000, currentEscrowLockedGlobal=32000000
- 26. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=31, cycleNumber=1, activationId=15, isMirror=true
- 27. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=3, position=31, linePaymentNumber=3
- 28. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=31, amount=20000000, timestamp=1794498813
- 29. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=31, line=3, linePaymentNumber=3, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 47. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 48. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=15, level=3, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 49. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 50. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=15, level=3, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=31, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 54. levelManager.SystemChargeDistributedDetailed: activationId=15, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 55. levelManager.ActivationFinancialSummaryRecorded: activationId=15, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=20000000, totalEscrowLocked=16000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 56. levelManager.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=40000000
- 57. levelManager.LevelActivatedInOrbit: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 58. registration.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, price=40000000

## 16. MEMBER_04 registers under BOB_ORBIT_OWNER

Transaction: `0xa3a02be1a88ad1600c1a3205f1a386fbe7c847a710ac502b1946575476382a86`
Block: 4189

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- ALICE_SPONSOR: +9.0 USDT
- MEMBER_04: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, cycleNumber=1, activationId=16, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=4, linePaymentNumber=4
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, line=1, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=9000000
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, position=4, amount=10000000, timestamp=1794498816
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=1
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, orbitType=4, sourcePosition=4, sourceCycle=1, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=16
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, cycleNumber=1, activationId=16, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=2, linePaymentNumber=2
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, amount=9000000, timestamp=1794498816
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 17. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=16, level=1, receiptType=4, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 19. levelManager.RecycleCompletedDetailed: activationId=16, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), sourcePosition=4, sourceCycle=1, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=1, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=16, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=16, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, price=10000000

## 17. MEMBER_04 activates Level 2

Transaction: `0xe4b66eae30f14081a7affb4be0fbef96ec7cd194fb032ed500d200810ed2eab5`
Block: 4190

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_04: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=4, cycleNumber=1, activationId=17, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=4, linePaymentNumber=1
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=4, line=2, linePaymentNumber=1, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, position=4, amount=20000000, timestamp=1794498817
- 6. p12.SpilloverPaid: from=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=17, level=2, receiptType=2, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=1, cycleNumber=1, activationId=17, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, position=1, amount=8000000, timestamp=1794498817
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=17, level=2, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=17, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=17, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, price=20000000

## 18. MEMBER_04 activates Level 3

Transaction: `0x6bfaa9afde39f8535e421e380070f1402b398da5f32ed52c408684ddc14c93fe`
Block: 4191

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_04: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +28.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=4, cycleNumber=1, activationId=18, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=4, linePaymentNumber=1
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=4, line=2, linePaymentNumber=1, toOwner=0, toSpillover1=8000000, toSpillover2=20000000, toEscrow=8000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=4, amount=40000000, timestamp=1794498818
- 7. p39.SpilloverPaid: from=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=18, level=3, receiptType=2, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, orbitType=39, sourcePosition=4, sourceCycle=1, expectedAmount=8000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=18
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=16000000, currentEscrowLockedGlobal=40000000
- 17. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=1, cycleNumber=1, activationId=18, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=1, position=1, linePaymentNumber=1
- 19. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=1, amount=8000000, timestamp=1794498818
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=13, cycleNumber=1, activationId=18, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=13, linePaymentNumber=1
- 24. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=13, amount=20000000, timestamp=1794498818
- 25. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=13, line=3, linePaymentNumber=1, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=20000000, toRecycle=0
- 29. escrow.EscrowLocked: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), fromLevel=3, toLevel=4, amount=20000000, newLockedTotal=44000000, currentEscrowLockedGlobal=60000000
- 31. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 32. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=18, level=3, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 34. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=18, level=3, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=13, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 38. levelManager.SystemChargeDistributedDetailed: activationId=18, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 39. levelManager.ActivationFinancialSummaryRecorded: activationId=18, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=8000000, totalEscrowLocked=28000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 40. levelManager.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, amount=40000000
- 41. levelManager.LevelActivatedInOrbit: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 42. registration.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, price=40000000

## 19. MEMBER_05 registers under BOB_ORBIT_OWNER

Transaction: `0xd55919ac5d4b72a163b306d4d7880139825c42e5ca5efcf42faa126c4d4b6c8e`
Block: 4194

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_05: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, cycleNumber=2, activationId=19, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=1, linePaymentNumber=1
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, position=1, amount=10000000, timestamp=1794498821
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=19, level=1, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=19, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=19, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, price=10000000

## 20. MEMBER_05 activates Level 2

Transaction: `0x3a534839b2b7662adef1c13b694b21a145cf472a88936ae45037b54a59611023`
Block: 4195

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_05: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=5, cycleNumber=1, activationId=20, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=5, linePaymentNumber=2
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=5, line=2, linePaymentNumber=2, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, position=5, amount=20000000, timestamp=1794498822
- 6. p12.SpilloverPaid: from=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=20, level=2, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=1, cycleNumber=1, activationId=20, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, position=1, amount=8000000, timestamp=1794498822
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=20, level=2, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=20, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=20, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, price=20000000

## 21. MEMBER_05 activates Level 3

Transaction: `0x535dec8fc56d28d03736eac59610baceec5428abd0580ee726575910ac43d482`
Block: 4196

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_05: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +28.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=5, cycleNumber=1, activationId=21, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=5, linePaymentNumber=2
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=5, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=8000000, toSpillover2=20000000, toEscrow=8000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=5, amount=40000000, timestamp=1794498823
- 7. p39.SpilloverPaid: from=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=21, level=3, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, orbitType=39, sourcePosition=5, sourceCycle=1, expectedAmount=8000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=21
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=24000000, currentEscrowLockedGlobal=68000000
- 17. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=1, cycleNumber=1, activationId=21, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=1, position=1, linePaymentNumber=1
- 19. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=1, amount=8000000, timestamp=1794498823
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=16, cycleNumber=1, activationId=21, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=16, linePaymentNumber=2
- 24. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=16, amount=20000000, timestamp=1794498823
- 25. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=16, line=3, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=20000000, toRecycle=0
- 29. escrow.EscrowLocked: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), fromLevel=3, toLevel=4, amount=20000000, newLockedTotal=64000000, currentEscrowLockedGlobal=88000000
- 31. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 32. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=21, level=3, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 34. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=21, level=3, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=1, mirroredPosition=16, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 38. levelManager.SystemChargeDistributedDetailed: activationId=21, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 39. levelManager.ActivationFinancialSummaryRecorded: activationId=21, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=8000000, totalEscrowLocked=28000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 40. levelManager.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, amount=40000000
- 41. levelManager.LevelActivatedInOrbit: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 42. registration.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, price=40000000

## 22. MEMBER_06 registers under BOB_ORBIT_OWNER

Transaction: `0xfcdaaede6c46f3d91f1c871dacaac8aa6060058f8a0a99432f810fde5aa118d3`
Block: 4199

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_06: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, cycleNumber=2, activationId=22, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=2, linePaymentNumber=2
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, position=2, amount=10000000, timestamp=1794498826
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=22, level=1, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=22, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=22, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, price=10000000

## 23. MEMBER_06 activates Level 2

Transaction: `0xae7aa074c52d32dd4d984b9b3e3c34f69381584538677f165dbf8b2bdd781b61`
Block: 4200

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_06: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=6, cycleNumber=1, activationId=23, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=6, linePaymentNumber=3
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=6, line=2, linePaymentNumber=3, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, position=6, amount=20000000, timestamp=1794498827
- 6. p12.SpilloverPaid: from=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=23, level=2, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=1, cycleNumber=1, activationId=23, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, position=1, amount=8000000, timestamp=1794498827
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=23, level=2, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=23, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=23, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, price=20000000

## 24. MEMBER_06 activates Level 3

Transaction: `0xef4fe4ad93451be84901ce98b771f3a7ed78eac8b7d0acdf6a7c193d57957e17`
Block: 4201

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_06: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=6, cycleNumber=1, activationId=24, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=6, linePaymentNumber=3
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=6, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=8000000, toSpillover2=20000000, toEscrow=8000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=6, amount=40000000, timestamp=1794498828
- 7. p39.SpilloverPaid: from=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=24, level=3, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, orbitType=39, sourcePosition=6, sourceCycle=1, expectedAmount=8000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=24
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=32000000, currentEscrowLockedGlobal=96000000
- 17. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=1, cycleNumber=1, activationId=24, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=1, position=1, linePaymentNumber=1
- 19. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=1, amount=8000000, timestamp=1794498828
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=19, cycleNumber=1, activationId=24, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=19, linePaymentNumber=3
- 23. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=19, amount=20000000, timestamp=1794498828
- 24. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=19, line=3, linePaymentNumber=3, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 27. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=24, level=3, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 30. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=24, level=3, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=1, mirroredPosition=19, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 34. levelManager.SystemChargeDistributedDetailed: activationId=24, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 35. levelManager.ActivationFinancialSummaryRecorded: activationId=24, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 36. levelManager.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, amount=40000000
- 37. levelManager.LevelActivatedInOrbit: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 38. registration.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, price=40000000

## 25. MEMBER_07 registers under BOB_ORBIT_OWNER

Transaction: `0x77a1d2c8a09b1d2620a187354cacbf579f74a7268e1245c3219cb6da4798e6fd`
Block: 4204

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_07: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, cycleNumber=2, activationId=25, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=3, linePaymentNumber=3
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, position=3, amount=10000000, timestamp=1794498831
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=25, level=1, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=25, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=25, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, price=10000000

## 26. MEMBER_07 activates Level 2

Transaction: `0xc1a2e081540b17d9cc55f490be0e697bc339794403f6cc39f6a14ab135971864`
Block: 4205

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_07: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=7, cycleNumber=1, activationId=26, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=7, linePaymentNumber=4
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=7, line=2, linePaymentNumber=4, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, position=7, amount=20000000, timestamp=1794498832
- 6. p12.SpilloverPaid: from=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=26, level=2, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=2, cycleNumber=1, activationId=26, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, position=2, amount=8000000, timestamp=1794498832
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=26, level=2, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=26, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=26, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, price=20000000

## 27. MEMBER_07 activates Level 3

Transaction: `0x47febfe3ba65b335631961d9640bdaccbb90d0288f008cdaf3b2a6aaa6cfc290`
Block: 4206

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_07: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=7, cycleNumber=1, activationId=27, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=7, linePaymentNumber=4
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=7, line=2, linePaymentNumber=4, toOwner=0, toSpillover1=8000000, toSpillover2=20000000, toEscrow=8000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=7, amount=40000000, timestamp=1794498833
- 7. p39.SpilloverPaid: from=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=27, level=3, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, orbitType=39, sourcePosition=7, sourceCycle=1, expectedAmount=8000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=27
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=40000000, currentEscrowLockedGlobal=104000000
- 17. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=2, cycleNumber=1, activationId=27, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=1, position=2, linePaymentNumber=2
- 19. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=2, amount=8000000, timestamp=1794498833
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=22, cycleNumber=1, activationId=27, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=22, linePaymentNumber=4
- 23. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=22, amount=20000000, timestamp=1794498833
- 24. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=22, line=3, linePaymentNumber=4, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 27. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=27, level=3, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 30. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=27, level=3, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=1, mirroredPosition=22, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 34. levelManager.SystemChargeDistributedDetailed: activationId=27, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 35. levelManager.ActivationFinancialSummaryRecorded: activationId=27, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 36. levelManager.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, amount=40000000
- 37. levelManager.LevelActivatedInOrbit: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 38. registration.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, price=40000000

## 28. MEMBER_08 registers under BOB_ORBIT_OWNER

Transaction: `0x9483b11b31e2f4cd0183828b903ecd97493fc95ffd46d3735c674a17c171f0ab`
Block: 4209

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- ALICE_SPONSOR: +9.0 USDT
- MEMBER_08: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, cycleNumber=2, activationId=28, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=4, linePaymentNumber=4
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, line=1, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=9000000
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, position=4, amount=10000000, timestamp=1794498836
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=2
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, orbitType=4, sourcePosition=4, sourceCycle=2, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=28
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=3, cycleNumber=1, activationId=28, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=3, linePaymentNumber=3
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, amount=9000000, timestamp=1794498836
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 17. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=28, level=1, receiptType=4, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 19. levelManager.RecycleCompletedDetailed: activationId=28, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), sourcePosition=4, sourceCycle=2, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=3, mirrorCycle=1, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=28, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=28, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, price=10000000

## 29. MEMBER_08 activates Level 2

Transaction: `0xde6567e6ea62ace4dfb31087cd76fb42c4ea48b7004ffd5184275138c504d23c`
Block: 4210

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_08: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=8, cycleNumber=1, activationId=29, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=8, linePaymentNumber=5
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=8, line=2, linePaymentNumber=5, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, position=8, amount=20000000, timestamp=1794498837
- 6. p12.SpilloverPaid: from=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=29, level=2, receiptType=2, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=2, cycleNumber=1, activationId=29, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, position=2, amount=8000000, timestamp=1794498837
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=29, level=2, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=29, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=29, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, price=20000000

## 30. MEMBER_08 activates Level 3

Transaction: `0x6ffb690d9d8f0f6552a46f47a47c6f56d25a206befa6a6869fc11a2e4c603b17`
Block: 4211

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_08: -40.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=8, cycleNumber=1, activationId=30, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=8, linePaymentNumber=5
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=8, line=2, linePaymentNumber=5, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=8, amount=40000000, timestamp=1794498838
- 6. p39.SpilloverPaid: from=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=30, level=3, receiptType=2, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=2, cycleNumber=1, activationId=30, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=2, amount=8000000, timestamp=1794498838
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=25, cycleNumber=1, activationId=30, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=25, linePaymentNumber=5
- 18. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=25, amount=20000000, timestamp=1794498838
- 19. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=25, line=3, linePaymentNumber=5, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=30, level=3, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=30, level=3, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=1, mirroredPosition=25, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=30, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=30, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, price=40000000

## 31. MEMBER_09 registers under BOB_ORBIT_OWNER

Transaction: `0xcfbaa5375d808076830695e28917fd7c5f811ce4cff4da911c1e4a3f51fea80b`
Block: 4214

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_09: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, cycleNumber=3, activationId=31, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=1, linePaymentNumber=1
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, position=1, amount=10000000, timestamp=1794498841
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=31, level=1, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=31, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=31, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, price=10000000

## 32. MEMBER_09 activates Level 2

Transaction: `0x7b6983043bb08f49c592d29a3af43924dc7edfc37e938082be3abfca809dd873`
Block: 4215

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_09: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=9, cycleNumber=1, activationId=32, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=9, linePaymentNumber=6
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=9, line=2, linePaymentNumber=6, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, position=9, amount=20000000, timestamp=1794498842
- 6. p12.SpilloverPaid: from=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=32, level=2, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=2, cycleNumber=1, activationId=32, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, position=2, amount=8000000, timestamp=1794498842
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=32, level=2, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=32, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=32, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, price=20000000

## 33. MEMBER_09 activates Level 3

Transaction: `0x6c9a2ef79ec342d56335d565df3f09c81fe6d6b9ab96c445b4b919ad560fc381`
Block: 4216

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_09: -40.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=9, cycleNumber=1, activationId=33, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=9, linePaymentNumber=6
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=9, line=2, linePaymentNumber=6, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=9, amount=40000000, timestamp=1794498843
- 6. p39.SpilloverPaid: from=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=33, level=3, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=2, cycleNumber=1, activationId=33, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=2, amount=8000000, timestamp=1794498843
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=28, cycleNumber=1, activationId=33, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=28, linePaymentNumber=6
- 18. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=28, amount=20000000, timestamp=1794498843
- 19. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=28, line=3, linePaymentNumber=6, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=33, level=3, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=33, level=3, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=1, mirroredPosition=28, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=33, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=33, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, price=40000000

## 34. MEMBER_10 registers under BOB_ORBIT_OWNER

Transaction: `0x3486482dfd478a95095ef714b3020865662402182316303623c0e96322a9a883`
Block: 4219

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_10: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, cycleNumber=3, activationId=34, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=2, linePaymentNumber=2
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, position=2, amount=10000000, timestamp=1794498846
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=34, level=1, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=34, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=34, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, price=10000000

## 35. MEMBER_10 activates Level 2

Transaction: `0xc06fe53aee2813224c9ea30550e5ef4fd0fc9bebaeb31546f06fe075239e9930`
Block: 4220

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_10: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=10, cycleNumber=1, activationId=35, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=10, linePaymentNumber=7
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=10, line=2, linePaymentNumber=7, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, position=10, amount=20000000, timestamp=1794498847
- 6. p12.SpilloverPaid: from=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=35, level=2, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=3, cycleNumber=1, activationId=35, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, position=3, amount=8000000, timestamp=1794498847
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=35, level=2, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=35, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=35, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, price=20000000

## 36. MEMBER_10 activates Level 3

Transaction: `0xe7a6f451cd55a2a23247120ccb5b3ea33bffdfbbe54bc95a0513426b7fbb3e89`
Block: 4221

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_10: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=10, cycleNumber=1, activationId=36, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=10, linePaymentNumber=7
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=10, line=2, linePaymentNumber=7, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=10, amount=40000000, timestamp=1794498848
- 6. p39.SpilloverPaid: from=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=36, level=3, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=3, cycleNumber=1, activationId=36, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=3, amount=8000000, timestamp=1794498848
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=112000000
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=31, cycleNumber=1, activationId=36, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=31, linePaymentNumber=7
- 23. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=31, amount=20000000, timestamp=1794498848
- 24. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=31, line=3, linePaymentNumber=7, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=36, level=3, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=36, level=3, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=1, mirroredPosition=31, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=36, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=36, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, price=40000000

## 37. MEMBER_11 registers under BOB_ORBIT_OWNER

Transaction: `0x6026045c7f7345bb09b27b89d1c1a6b4bc98709664d8424b6da14e7dd95ee151`
Block: 4224

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_11: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, cycleNumber=3, activationId=37, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=3, linePaymentNumber=3
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, position=3, amount=10000000, timestamp=1794498851
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=37, level=1, receiptType=2, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=37, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=37, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, price=10000000

## 38. MEMBER_11 activates Level 2

Transaction: `0x5935f226d58b1feb5cd8c116114ba7a4bcf9ada9b4db02084bc95f869bf016c7`
Block: 4225

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_11: -20.0 USDT
- 0xA7B13d8B87c3e917A9BfB5D7fcec3A49Afaf6523: +10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, cycleNumber=1, activationId=38, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=11, linePaymentNumber=8
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, line=2, linePaymentNumber=8, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, position=11, amount=20000000, timestamp=1794498852
- 6. p12.SpilloverPaid: from=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, amount=8000000
- 8. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, orbitType=12, sourcePosition=11, sourceCycle=1, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=38
- 10. p12.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=3, cycleNumber=1, activationId=38, isMirror=true
- 11. p12.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, line=1, position=3, linePaymentNumber=3
- 12. p12.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, position=3, amount=8000000, timestamp=1794498852
- 13. p12.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 15. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 16. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=38, level=2, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=38, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=38, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=8000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, price=20000000

## 39. MEMBER_11 activates Level 3

Transaction: `0x26150d8291c7758096b19c0ebd254458bd731a856c94b16565d7f29e0bfe44cd`
Block: 4226

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_11: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=11, cycleNumber=1, activationId=39, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=11, linePaymentNumber=8
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=11, line=2, linePaymentNumber=8, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=11, amount=40000000, timestamp=1794498853
- 6. p39.SpilloverPaid: from=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=39, level=3, receiptType=2, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=3, cycleNumber=1, activationId=39, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=3, amount=8000000, timestamp=1794498853
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=120000000
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=34, cycleNumber=1, activationId=39, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=34, linePaymentNumber=8
- 23. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=34, amount=20000000, timestamp=1794498853
- 24. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=34, line=3, linePaymentNumber=8, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=39, level=3, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=39, level=3, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=1, mirroredPosition=34, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=39, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=39, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, price=40000000

## 40. MEMBER_12 registers under BOB_ORBIT_OWNER

Transaction: `0x717abff464f9387cdcc01eaa7068a671f53e546992f1a649ea31fcd5aaacf257`
Block: 4229

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- FOUNDER_1: +1.125 USDT
- FOUNDER_2: +1.125 USDT
- FOUNDER_3: +1.125 USDT
- FOUNDER_4: +1.125 USDT
- FOUNDER_5: +1.125 USDT
- FOUNDER_6: +1.125 USDT
- FOUNDER_7: +1.125 USDT
- FOUNDER_8: +1.125 USDT
- MEMBER_12: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, cycleNumber=3, activationId=40, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=4, linePaymentNumber=4
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, line=1, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=9000000
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, position=4, amount=10000000, timestamp=1794498856
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=3
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, orbitType=4, sourcePosition=4, sourceCycle=3, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=40
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=4, cycleNumber=1, activationId=40, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=4, linePaymentNumber=4
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, amount=9000000, timestamp=1794498856
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=4, line=1, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=9000000
- 15. p4.OrbitReset: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, cycleNumber=1
- 17. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=0
- 18. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=40, level=1, receiptType=4, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=3, mirroredPosition=4, mirroredCycle=1, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=0
- 19. levelManager.RecycleCompletedDetailed: activationId=40, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), sourcePosition=4, sourceCycle=3, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=0, recycleEscrowLocked=0, mirrorPosition=4, mirrorCycle=1, triggeredOrbitReset=false
- 20. p4.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, position=2, cycleNumber=1, activationId=40, isMirror=true
- 21. p4.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, line=1, position=2, linePaymentNumber=2
- 22. p4.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, amount=9000000, timestamp=1794498856
- 23. p4.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 42. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 43. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=40, level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=4, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 44. levelManager.RecycleCompletedDetailed: activationId=40, orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, sourceUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, recycleReceiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=1, triggeredOrbitReset=false
- 48. levelManager.SystemChargeDistributedDetailed: activationId=40, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 49. levelManager.ActivationFinancialSummaryRecorded: activationId=40, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 50. levelManager.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, amount=10000000
- 51. levelManager.LevelActivatedInOrbit: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 52. registration.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, price=10000000

## 41. MEMBER_12 activates Level 2

Transaction: `0x89836664cea70cfa1a1efcdb5785447adcac8505fb146ac0fed540ab5f8d2c28`
Block: 4230

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- FOUNDER_1: +1.25 USDT
- FOUNDER_2: +1.25 USDT
- FOUNDER_3: +1.25 USDT
- FOUNDER_4: +1.25 USDT
- FOUNDER_5: +1.25 USDT
- FOUNDER_6: +1.25 USDT
- FOUNDER_7: +1.25 USDT
- FOUNDER_8: +1.25 USDT
- ALICE_SPONSOR: +8.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_12: -20.0 USDT
- 0xA7B13d8B87c3e917A9BfB5D7fcec3A49Afaf6523: -10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, cycleNumber=1, activationId=41, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=12, linePaymentNumber=9
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, line=2, linePaymentNumber=9, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, position=12, amount=20000000, timestamp=1794498857
- 6. p12.SpilloverPaid: from=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, amount=8000000
- 7. p12.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, cycleNumber=1
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, orbitType=12, sourcePosition=12, sourceCycle=1, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=41
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=3, cycleNumber=1, activationId=41, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, position=3, amount=8000000, timestamp=1794498857
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=41, level=2, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=41, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=2, cycleNumber=1, activationId=41, isMirror=true
- 23. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=1, position=2, linePaymentNumber=2
- 24. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 25. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=2, amount=20000000, timestamp=1794498857
- 26. p12.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 29. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 30. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=41, level=2, receiptType=4, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 31. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=7, cycleNumber=1, activationId=41, isMirror=true
- 32. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=2, position=7, linePaymentNumber=2
- 33. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=7, amount=10000000, timestamp=1794498857
- 34. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=7, line=2, linePaymentNumber=2, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 52. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 53. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=41, level=2, receiptType=4, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=4, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 54. levelManager.RecycleCompletedDetailed: activationId=41, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), sourcePosition=12, sourceCycle=1, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=20000000, recycleLiquidPaid=18000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=1, triggeredOrbitReset=false
- 58. levelManager.SystemChargeDistributedDetailed: activationId=41, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 59. levelManager.ActivationFinancialSummaryRecorded: activationId=41, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=26000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 60. levelManager.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, amount=20000000
- 61. levelManager.LevelActivatedInOrbit: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 62. registration.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, price=20000000

## 42. MEMBER_12 activates Level 3

Transaction: `0x0284060e853d4d81b05f196e24af0baa889be07df26e975f0167e37eafb54609`
Block: 4231

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_12: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=12, cycleNumber=1, activationId=42, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=12, linePaymentNumber=9
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=12, line=2, linePaymentNumber=9, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=12, amount=40000000, timestamp=1794498858
- 6. p39.SpilloverPaid: from=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=42, level=3, receiptType=2, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=3, cycleNumber=1, activationId=42, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=3, amount=8000000, timestamp=1794498858
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=128000000
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=37, cycleNumber=1, activationId=42, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=37, linePaymentNumber=9
- 23. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=37, amount=20000000, timestamp=1794498858
- 24. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=37, line=3, linePaymentNumber=9, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=42, level=3, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=42, level=3, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=37, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=42, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=42, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, price=40000000

## 43. MEMBER_13 registers under BOB_ORBIT_OWNER

Transaction: `0xa5491d7235a6db57e59a3492434d4ea99282a0a2b2ab86adb4850e5236397e15`
Block: 4234

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_13: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, cycleNumber=4, activationId=43, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=1, linePaymentNumber=1
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, position=1, amount=10000000, timestamp=1794498861
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=43, level=1, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=43, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=43, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, price=10000000

## 44. MEMBER_13 activates Level 2

Transaction: `0xc895c5e39a9684de23fe1bcdce8020d3acb2360375a816b1d9887a907d364d9e`
Block: 4235

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- ALICE_SPONSOR: +10.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_13: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=1, cycleNumber=2, activationId=44, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=1, linePaymentNumber=1
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=1, amount=20000000, timestamp=1794498862
- 6. p12.SpilloverPaid: from=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=44, level=2, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=5, cycleNumber=1, activationId=44, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=5, linePaymentNumber=4
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=5, amount=10000000, timestamp=1794498862
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=5, line=2, linePaymentNumber=4, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=44, level=2, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=2, mirroredPosition=5, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=44, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=44, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, price=20000000

## 45. MEMBER_13 activates Level 3

Transaction: `0xc68f2742880a38249022696f2808dfad84a835bb6778bc786bfb649b4cae7093`
Block: 4236

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- MEMBER_04: +8.0 USDT
- MEMBER_13: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +28.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=13, cycleNumber=1, activationId=45, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=13, linePaymentNumber=1
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=13, line=3, linePaymentNumber=1, toOwner=0, toSpillover1=8000000, toSpillover2=8000000, toEscrow=20000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, position=13, amount=40000000, timestamp=1794498863
- 7. p39.SpilloverPaid: from=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), to=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=45, level=3, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=13, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, orbitType=39, sourcePosition=13, sourceCycle=1, expectedAmount=20000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=45
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=20000000, newLockedTotal=60000000, currentEscrowLockedGlobal=148000000
- 17. p39.PositionActivationLinked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=1, cycleNumber=1, activationId=45, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, line=1, position=1, linePaymentNumber=1
- 19. p39.PositionFilled: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, position=1, amount=8000000, timestamp=1794498863
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=4, cycleNumber=1, activationId=45, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=4, linePaymentNumber=1
- 24. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, position=4, amount=8000000, timestamp=1794498863
- 25. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=4, line=2, linePaymentNumber=1, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 29. escrow.EscrowLocked: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=16000000, currentEscrowLockedGlobal=156000000
- 31. levelManager.PayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 32. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), activationId=45, level=3, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=13, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 34. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=45, level=3, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=13, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 38. levelManager.SystemChargeDistributedDetailed: activationId=45, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 39. levelManager.ActivationFinancialSummaryRecorded: activationId=45, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=8000000, totalEscrowLocked=28000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 40. levelManager.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, amount=40000000
- 41. levelManager.LevelActivatedInOrbit: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 42. registration.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, price=40000000

## 46. MEMBER_14 registers under BOB_ORBIT_OWNER

Transaction: `0xbc5707dfb4c16d08c0ff9b7dcae9e4ab0fa89098b38d2d83fbce2a6dab484cf6`
Block: 4239

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_14: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, cycleNumber=4, activationId=46, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=2, linePaymentNumber=2
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, position=2, amount=10000000, timestamp=1794498866
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=46, level=1, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=46, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=46, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, price=10000000

## 47. MEMBER_14 activates Level 2

Transaction: `0x66bf0e5ca634070f5b7ce585307594e15512c23b345b9284354ba45d55491d2d`
Block: 4240

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- ALICE_SPONSOR: +10.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_14: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=2, cycleNumber=2, activationId=47, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=2, linePaymentNumber=2
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=2, amount=20000000, timestamp=1794498867
- 6. p12.SpilloverPaid: from=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=47, level=2, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=8, cycleNumber=1, activationId=47, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=8, linePaymentNumber=5
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=8, amount=10000000, timestamp=1794498867
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=8, line=2, linePaymentNumber=5, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=47, level=2, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=2, mirroredPosition=8, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=47, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=47, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, price=20000000

## 48. MEMBER_14 activates Level 3

Transaction: `0xb3fccbfab2fa6031c133f5ff965f6a8b4ae8a39fb1668e1431c154e821be1303`
Block: 4241

USDT balance changes:

- NFT_POOL: +9.6 USDT
- OPERATIONS: +2.4 USDT
- FOUNDER_1: +9.0 USDT
- FOUNDER_2: +9.0 USDT
- FOUNDER_3: +9.0 USDT
- FOUNDER_4: +9.0 USDT
- FOUNDER_5: +9.0 USDT
- FOUNDER_6: +9.0 USDT
- FOUNDER_7: +9.0 USDT
- FOUNDER_8: +9.0 USDT
- MEMBER_05: +8.0 USDT
- MEMBER_14: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: -52.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=14, cycleNumber=1, activationId=48, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=14, linePaymentNumber=2
- 5. p39.AutoUpgradeTriggered: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=80000000
- 6. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=14, line=3, linePaymentNumber=2, toOwner=0, toSpillover1=8000000, toSpillover2=8000000, toEscrow=20000000, toRecycle=0
- 7. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, position=14, amount=40000000, timestamp=1794498868
- 8. p39.SpilloverPaid: from=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), to=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, amount=8000000
- 9. p39.SpilloverPaid: from=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 11. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 12. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=48, level=3, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=14, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 13. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, orbitType=39, sourcePosition=14, sourceCycle=1, expectedAmount=20000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=48
- 17. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=20000000, newLockedTotal=80000000, currentEscrowLockedGlobal=176000000
- 18. p39.PositionActivationLinked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=1, cycleNumber=1, activationId=48, isMirror=true
- 19. p39.LinePaymentTracked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, line=1, position=1, linePaymentNumber=1
- 20. p39.PositionFilled: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, position=1, amount=8000000, timestamp=1794498868
- 21. p39.PaymentRuleApplied: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=4, cycleNumber=1, activationId=48, isMirror=true
- 23. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=4, linePaymentNumber=1
- 25. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, position=4, amount=8000000, timestamp=1794498868
- 26. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=4, line=2, linePaymentNumber=1, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 30. escrow.EscrowLocked: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=16000000, currentEscrowLockedGlobal=184000000
- 32. levelManager.PayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), activationId=48, level=3, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=14, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 34. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 35. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=48, level=3, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=14, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 39. levelManager.SystemChargeDistributedDetailed: activationId=48, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 40. levelManager.ActivationFinancialSummaryRecorded: activationId=48, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=8000000, totalEscrowLocked=28000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 41. levelManager.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, amount=40000000
- 42. levelManager.LevelActivatedInOrbit: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 45. escrow.EscrowUsedForUpgrade: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=80000000, recipient=0xA7B13d8B87c3e917A9BfB5D7fcec3A49Afaf6523, currentEscrowLockedGlobal=104000000
- 47. p4.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=4, position=1, cycleNumber=1, activationId=49, isMirror=false
- 48. p4.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=4, line=1, position=1, linePaymentNumber=1
- 49. p4.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=4, position=1, line=1, linePaymentNumber=1, toOwner=72000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 50. p4.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, position=1, amount=80000000, timestamp=1794498868
- 52. levelManager.PayoutNotDelivered: affectedUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourceUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, orbitType=4, sourcePosition=1, sourceCycle=1, expectedAmount=72000000, actualReceiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), actualAmount=72000000, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x4944315f46414c4c4241434b0000000000000000000000000000000000000000, actionCode=0x41435449564154455f4c4556454c000000000000000000000000000000000000, activationId=49
- 70. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=4, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), grossAmount=72000000, escrowLocked=0, liquidPaid=72000000
- 71. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=49, level=4, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=72000000, escrowLocked=0, liquidPaid=72000000
- 75. levelManager.SystemChargeDistributedDetailed: activationId=49, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, systemChargeTotal=8000000, nftPoolAmount=6400000, operationsAmount=1600000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 76. levelManager.ActivationFinancialSummaryRecorded: activationId=49, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, activationAmount=80000000, systemCharge=8000000, nftPoolAmount=6400000, operationsAmount=1600000, totalLiquidPaid=72000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=true, isFounderRepFreeActivation=false
- 77. levelManager.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, amount=80000000
- 78. levelManager.LevelActivatedInOrbit: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=80000000
- 79. registration.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, price=80000000
- 80. registration.AutoUpgradeTriggered: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4
- 81. levelManager.AutoUpgradeTriggered: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4
- 82. levelManager.AutoUpgradeCompleted: activationId=49, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, requiredAmount=80000000, usedAmount=80000000, escrowBefore=80000000, escrowAfter=0
- 83. registration.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, price=40000000

## 49. MEMBER_15 registers under BOB_ORBIT_OWNER

Transaction: `0x68a5dbf5d082c95eab0f2ae682b2f979012ae8e5dc6af5beba3d0fa7b053de44`
Block: 4244

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_15: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, cycleNumber=4, activationId=50, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=3, linePaymentNumber=3
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, position=3, amount=10000000, timestamp=1794498871
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=50, level=1, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=50, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=50, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, price=10000000

## 50. MEMBER_15 activates Level 2

Transaction: `0x6bd6c86ae66c84e2ea56668310fe541c714305bdb2021d3cd510b49e75eff19a`
Block: 4245

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- ALICE_SPONSOR: +10.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_15: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=3, cycleNumber=2, activationId=51, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=3, linePaymentNumber=3
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=3, amount=20000000, timestamp=1794498872
- 6. p12.SpilloverPaid: from=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=51, level=2, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=11, cycleNumber=1, activationId=51, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=11, linePaymentNumber=6
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=11, amount=10000000, timestamp=1794498872
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=11, line=2, linePaymentNumber=6, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=51, level=2, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=2, mirroredPosition=11, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=51, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=51, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, price=20000000

## 51. MEMBER_15 activates Level 3

Transaction: `0x57aad106939584cb6f213391fcf89d5d7f1b1d599f871cc59c93938acb58bfeb`
Block: 4246

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_06: +8.0 USDT
- MEMBER_15: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=15, cycleNumber=1, activationId=52, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=15, linePaymentNumber=3
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=15, line=3, linePaymentNumber=3, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, position=15, amount=40000000, timestamp=1794498873
- 6. p39.SpilloverPaid: from=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), to=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=52, level=3, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=15, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=1, cycleNumber=1, activationId=52, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, position=1, amount=8000000, timestamp=1794498873
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=4, cycleNumber=1, activationId=52, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=4, linePaymentNumber=1
- 19. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, position=4, amount=8000000, timestamp=1794498873
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=4, line=2, linePaymentNumber=1, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=16000000, currentEscrowLockedGlobal=112000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), activationId=52, level=3, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=15, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=52, level=3, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=15, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=52, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=52, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, price=40000000

## 52. MEMBER_16 registers under BOB_ORBIT_OWNER

Transaction: `0x089ee7161f5f69554c254b7ea9f0a892be927a192e05d8a777b13e2a57c2805e`
Block: 4249

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- ALICE_SPONSOR: +9.0 USDT
- MEMBER_16: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, cycleNumber=4, activationId=53, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=4, linePaymentNumber=4
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, line=1, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=9000000
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, position=4, amount=10000000, timestamp=1794498876
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=4
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, orbitType=4, sourcePosition=4, sourceCycle=4, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=53
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, cycleNumber=2, activationId=53, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=1, linePaymentNumber=1
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, amount=9000000, timestamp=1794498876
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 17. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=53, level=1, receiptType=4, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=4, mirroredPosition=1, mirroredCycle=2, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 19. levelManager.RecycleCompletedDetailed: activationId=53, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), sourcePosition=4, sourceCycle=4, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=1, mirrorCycle=2, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=53, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=53, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, price=10000000

## 53. MEMBER_16 activates Level 2

Transaction: `0xa35da24ea101a2bd1130e28f75c210bdf302737cfb8eee9432017c2435d88fec`
Block: 4250

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_13: +8.0 USDT
- MEMBER_16: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=4, cycleNumber=2, activationId=54, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=4, linePaymentNumber=1
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=4, line=2, linePaymentNumber=1, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, position=4, amount=20000000, timestamp=1794498877
- 6. p12.SpilloverPaid: from=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), to=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=54, level=2, receiptType=2, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=1, cycleNumber=1, activationId=54, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, position=1, amount=8000000, timestamp=1794498877
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), activationId=54, level=2, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=2, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=54, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=54, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, price=20000000

## 54. MEMBER_16 activates Level 3

Transaction: `0x7a8bf1de11fb5d3e083fa735469c2b5dc8c943a3ac3129c0c2235bc6ae12ef9f`
Block: 4251

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_07: +8.0 USDT
- MEMBER_16: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=16, cycleNumber=1, activationId=55, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=16, linePaymentNumber=4
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=16, line=3, linePaymentNumber=4, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, position=16, amount=40000000, timestamp=1794498878
- 6. p39.SpilloverPaid: from=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), to=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=55, level=3, receiptType=2, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=16, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=1, cycleNumber=1, activationId=55, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, position=1, amount=8000000, timestamp=1794498878
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=5, cycleNumber=1, activationId=55, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=5, linePaymentNumber=2
- 19. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, position=5, amount=8000000, timestamp=1794498878
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=5, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=24000000, currentEscrowLockedGlobal=120000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), activationId=55, level=3, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=16, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=55, level=3, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=16, sourceCycle=1, mirroredPosition=5, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=55, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=55, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, price=40000000

## 55. MEMBER_17 registers under BOB_ORBIT_OWNER

Transaction: `0x3447208aadd71d8a506fd632ff75894f696e9356d8e2aa5ae5371b995440acf3`
Block: 4254

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_17: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, cycleNumber=5, activationId=56, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=1, linePaymentNumber=1
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, position=1, amount=10000000, timestamp=1794498881
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=56, level=1, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=5, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=56, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=56, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, price=10000000

## 56. MEMBER_17 activates Level 2

Transaction: `0xd8d1f82b7eecc2267fcdc6b8c66004ea08a3eabf975d5e027e626a866b7e7f7c`
Block: 4255

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_14: +8.0 USDT
- MEMBER_17: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=5, cycleNumber=2, activationId=57, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=5, linePaymentNumber=2
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=5, line=2, linePaymentNumber=2, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, position=5, amount=20000000, timestamp=1794498882
- 6. p12.SpilloverPaid: from=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), to=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=57, level=2, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=1, cycleNumber=1, activationId=57, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, position=1, amount=8000000, timestamp=1794498882
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), activationId=57, level=2, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=2, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=57, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=57, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, price=20000000

## 57. MEMBER_17 activates Level 3

Transaction: `0xf468e7a1b223848a518afd6cc7c90da68c98d67cb8f43f8d8de9f2d65c4a36a1`
Block: 4256

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_08: +8.0 USDT
- MEMBER_17: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=17, cycleNumber=1, activationId=58, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=17, linePaymentNumber=5
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=17, line=3, linePaymentNumber=5, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, position=17, amount=40000000, timestamp=1794498883
- 6. p39.SpilloverPaid: from=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), to=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=58, level=3, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=17, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=1, cycleNumber=1, activationId=58, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, position=1, amount=8000000, timestamp=1794498883
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=5, cycleNumber=1, activationId=58, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=5, linePaymentNumber=2
- 19. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, position=5, amount=8000000, timestamp=1794498883
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=5, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=24000000, currentEscrowLockedGlobal=128000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), activationId=58, level=3, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=17, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=58, level=3, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=17, sourceCycle=1, mirroredPosition=5, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=58, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=58, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, price=40000000

## 58. MEMBER_18 registers under BOB_ORBIT_OWNER

Transaction: `0xf061314570679e516a7f2d1aff61aae51e66cf0f6c5c2f6212532a793b8d5903`
Block: 4259

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_18: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, cycleNumber=5, activationId=59, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=2, linePaymentNumber=2
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, position=2, amount=10000000, timestamp=1794498886
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=59, level=1, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=5, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=59, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=59, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, price=10000000

## 59. MEMBER_18 activates Level 2

Transaction: `0x2f433178d53b640c426fc99b167ca868e04e7e0231f492215c5a6b270983485c`
Block: 4260

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_15: +8.0 USDT
- MEMBER_18: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=6, cycleNumber=2, activationId=60, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=6, linePaymentNumber=3
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=6, line=2, linePaymentNumber=3, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, position=6, amount=20000000, timestamp=1794498887
- 6. p12.SpilloverPaid: from=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), to=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=60, level=2, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=1, cycleNumber=1, activationId=60, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, position=1, amount=8000000, timestamp=1794498887
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), activationId=60, level=2, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=2, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=60, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=60, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, price=20000000

## 60. MEMBER_18 activates Level 3

Transaction: `0xb76fb11cfc4dd0df341368ed969b6ae6687c9c0b9a026cb415293283afb518d1`
Block: 4261

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_09: +8.0 USDT
- MEMBER_18: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=18, cycleNumber=1, activationId=61, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=18, linePaymentNumber=6
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=18, line=3, linePaymentNumber=6, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, position=18, amount=40000000, timestamp=1794498888
- 6. p39.SpilloverPaid: from=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), to=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=61, level=3, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=18, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=1, cycleNumber=1, activationId=61, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, position=1, amount=8000000, timestamp=1794498888
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=5, cycleNumber=1, activationId=61, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=5, linePaymentNumber=2
- 19. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, position=5, amount=8000000, timestamp=1794498888
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=5, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=24000000, currentEscrowLockedGlobal=136000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), activationId=61, level=3, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=18, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=61, level=3, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=18, sourceCycle=1, mirroredPosition=5, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=61, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=61, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, price=40000000

## 61. MEMBER_19 registers under BOB_ORBIT_OWNER

Transaction: `0xf0d2063389bf79b39cee67d3035e8b29753d5b465d8c9f2cdb87c1bf3c8139bb`
Block: 4264

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_19: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, cycleNumber=5, activationId=62, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=3, linePaymentNumber=3
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, position=3, amount=10000000, timestamp=1794498891
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=62, level=1, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=5, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=62, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=62, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, price=10000000

## 62. MEMBER_19 activates Level 2

Transaction: `0x8f6631d7d6a86e1ce1d66241934def4a8c8c945da92d09da861d3d8c797c57c7`
Block: 4265

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_13: +8.0 USDT
- MEMBER_19: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=7, cycleNumber=2, activationId=63, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=7, linePaymentNumber=4
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=7, line=2, linePaymentNumber=4, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, position=7, amount=20000000, timestamp=1794498892
- 6. p12.SpilloverPaid: from=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), to=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=63, level=2, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=2, cycleNumber=1, activationId=63, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, position=2, amount=8000000, timestamp=1794498892
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), activationId=63, level=2, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=2, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=63, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=63, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, price=20000000

## 63. MEMBER_19 activates Level 3

Transaction: `0xb0c6ca29493266a6e3db4d0832dcc3a2d3c6868abc4ad9dfbea21ac3fdfe0d0d`
Block: 4266

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_10: +8.0 USDT
- MEMBER_19: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=19, cycleNumber=1, activationId=64, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=19, linePaymentNumber=7
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=19, line=3, linePaymentNumber=7, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, position=19, amount=40000000, timestamp=1794498893
- 6. p39.SpilloverPaid: from=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), to=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=64, level=3, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=19, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=1, cycleNumber=1, activationId=64, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, position=1, amount=8000000, timestamp=1794498893
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=6, cycleNumber=1, activationId=64, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=6, linePaymentNumber=3
- 19. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, position=6, amount=8000000, timestamp=1794498893
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=6, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=32000000, currentEscrowLockedGlobal=144000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), activationId=64, level=3, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=19, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=64, level=3, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=19, sourceCycle=1, mirroredPosition=6, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=64, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=64, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, price=40000000

## 64. MEMBER_20 registers under BOB_ORBIT_OWNER

Transaction: `0xbd6d87c7c2f13b837aceca33e8a4fd2ea978df6c015c1f265f7b9039bc11010c`
Block: 4269

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- ALICE_SPONSOR: +9.0 USDT
- MEMBER_20: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, cycleNumber=5, activationId=65, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=4, linePaymentNumber=4
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, line=1, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=9000000
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, position=4, amount=10000000, timestamp=1794498896
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=5
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, orbitType=4, sourcePosition=4, sourceCycle=5, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=65
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, cycleNumber=2, activationId=65, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=2, linePaymentNumber=2
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, amount=9000000, timestamp=1794498896
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 17. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=65, level=1, receiptType=4, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=5, mirroredPosition=2, mirroredCycle=2, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 19. levelManager.RecycleCompletedDetailed: activationId=65, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), sourcePosition=4, sourceCycle=5, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=2, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=65, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=65, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, price=10000000

## 65. MEMBER_20 activates Level 2

Transaction: `0x5cec995917414a20f0b1b67052148670e42472b58f557ce323616bc7749b21e7`
Block: 4270

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_14: +8.0 USDT
- MEMBER_20: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=8, cycleNumber=2, activationId=66, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=8, linePaymentNumber=5
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=8, line=2, linePaymentNumber=5, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, position=8, amount=20000000, timestamp=1794498897
- 6. p12.SpilloverPaid: from=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), to=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=66, level=2, receiptType=2, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=2, cycleNumber=1, activationId=66, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, position=2, amount=8000000, timestamp=1794498897
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), activationId=66, level=2, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=2, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=66, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=66, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, price=20000000

## 66. MEMBER_20 activates Level 3

Transaction: `0xe76db035218d91691d3275f31bd5c68a9965b2a9e341b6515c30843a908d0e86`
Block: 4271

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_11: +8.0 USDT
- MEMBER_20: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=20, cycleNumber=1, activationId=67, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=20, linePaymentNumber=8
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=20, line=3, linePaymentNumber=8, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, position=20, amount=40000000, timestamp=1794498898
- 6. p39.SpilloverPaid: from=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), to=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=67, level=3, receiptType=2, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=20, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=1, cycleNumber=1, activationId=67, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, position=1, amount=8000000, timestamp=1794498898
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=6, cycleNumber=1, activationId=67, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=6, linePaymentNumber=3
- 19. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, position=6, amount=8000000, timestamp=1794498898
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=6, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=32000000, currentEscrowLockedGlobal=152000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), activationId=67, level=3, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=20, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=67, level=3, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=20, sourceCycle=1, mirroredPosition=6, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=67, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=67, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, price=40000000

## 67. MEMBER_21 registers under BOB_ORBIT_OWNER

Transaction: `0x5e4b28e035d636743f3f0213f68f41c81e4103ed05535e2cf41db46e71ebde33`
Block: 4274

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_21: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, cycleNumber=6, activationId=68, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=1, linePaymentNumber=1
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, position=1, amount=10000000, timestamp=1794498901
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=68, level=1, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=6, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=68, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=68, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, price=10000000

## 68. MEMBER_21 activates Level 2

Transaction: `0xd978277209cc52c1e7f07465a8b2bd33577e6db2c9fa73d9bf95ce3ec7550bac`
Block: 4275

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_15: +8.0 USDT
- MEMBER_21: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=9, cycleNumber=2, activationId=69, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=9, linePaymentNumber=6
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=9, line=2, linePaymentNumber=6, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, position=9, amount=20000000, timestamp=1794498902
- 6. p12.SpilloverPaid: from=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), to=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=69, level=2, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=2, cycleNumber=1, activationId=69, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, position=2, amount=8000000, timestamp=1794498902
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), activationId=69, level=2, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=2, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=69, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=69, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, price=20000000

## 69. MEMBER_21 activates Level 3

Transaction: `0xbef46c3c7bef5028cb0fa88102f97f7686fe73d4b5bed735af4854d30c66cd54`
Block: 4276

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_12: +8.0 USDT
- MEMBER_21: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=21, cycleNumber=1, activationId=70, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=21, linePaymentNumber=9
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=21, line=3, linePaymentNumber=9, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, position=21, amount=40000000, timestamp=1794498903
- 6. p39.SpilloverPaid: from=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), to=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=70, level=3, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=21, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=1, cycleNumber=1, activationId=70, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, position=1, amount=8000000, timestamp=1794498903
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=6, cycleNumber=1, activationId=70, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=6, linePaymentNumber=3
- 19. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, position=6, amount=8000000, timestamp=1794498903
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=6, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=32000000, currentEscrowLockedGlobal=160000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), activationId=70, level=3, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=21, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=70, level=3, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=21, sourceCycle=1, mirroredPosition=6, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=70, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=70, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, price=40000000

## 70. MEMBER_22 registers under BOB_ORBIT_OWNER

Transaction: `0xed36db2f20a032b565f9af901515445b478cfe96db0e8a35f1f990c020476999`
Block: 4279

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_22: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, cycleNumber=6, activationId=71, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=2, linePaymentNumber=2
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, position=2, amount=10000000, timestamp=1794498906
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=71, level=1, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=6, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=71, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=71, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, price=10000000

## 71. MEMBER_22 activates Level 2

Transaction: `0x19dbe6ed9f8735b12667e5503ed646f9a5e49e6d4c188f48f567085fcef18a18`
Block: 4280

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_13: +8.0 USDT
- MEMBER_22: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=10, cycleNumber=2, activationId=72, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=10, linePaymentNumber=7
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=10, line=2, linePaymentNumber=7, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, position=10, amount=20000000, timestamp=1794498907
- 6. p12.SpilloverPaid: from=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), to=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=72, level=2, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=3, cycleNumber=1, activationId=72, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, position=3, amount=8000000, timestamp=1794498907
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), activationId=72, level=2, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=72, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=72, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, price=20000000

## 72. MEMBER_22 activates Level 3

Transaction: `0x93bf29fffd10dc6329d5837394df95dfc736cc53c8b83f6f60980b34e5787534`
Block: 4281

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_04: +8.0 USDT
- MEMBER_22: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=22, cycleNumber=1, activationId=73, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=22, linePaymentNumber=10
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=22, line=3, linePaymentNumber=10, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, position=22, amount=40000000, timestamp=1794498908
- 6. p39.SpilloverPaid: from=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), to=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=73, level=3, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=22, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=2, cycleNumber=1, activationId=73, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, position=2, amount=8000000, timestamp=1794498908
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=7, cycleNumber=1, activationId=73, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=7, linePaymentNumber=4
- 19. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, position=7, amount=8000000, timestamp=1794498908
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=7, line=2, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=40000000, currentEscrowLockedGlobal=168000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), activationId=73, level=3, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=22, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=73, level=3, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=22, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=73, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=73, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, price=40000000

## 73. MEMBER_23 registers under BOB_ORBIT_OWNER

Transaction: `0x8fec6e966b8c13ea493e446eaa4ce2829e16a9338cb1c4fd3d28d8dd8c1d2a9c`
Block: 4284

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_23: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, cycleNumber=6, activationId=74, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=3, linePaymentNumber=3
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, position=3, amount=10000000, timestamp=1794498911
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=74, level=1, receiptType=2, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=6, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=74, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=74, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, price=10000000

## 74. MEMBER_23 activates Level 2

Transaction: `0xd99491360e8fcd5dee96a15960ce567f0fed8c429d2c34bf62259889f7b7ad12`
Block: 4285

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- MEMBER_14: +8.0 USDT
- MEMBER_23: -20.0 USDT
- 0xA7B13d8B87c3e917A9BfB5D7fcec3A49Afaf6523: +10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, cycleNumber=2, activationId=75, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=11, linePaymentNumber=8
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, line=2, linePaymentNumber=8, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, position=11, amount=20000000, timestamp=1794498912
- 6. p12.SpilloverPaid: from=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), to=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, amount=8000000
- 8. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, orbitType=12, sourcePosition=11, sourceCycle=2, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=75
- 10. p12.PositionActivationLinked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=3, cycleNumber=1, activationId=75, isMirror=true
- 11. p12.LinePaymentTracked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, line=1, position=3, linePaymentNumber=3
- 12. p12.PositionFilled: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, position=3, amount=8000000, timestamp=1794498912
- 13. p12.PaymentRuleApplied: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 15. levelManager.PayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 16. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), activationId=75, level=2, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=75, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=75, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=8000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, price=20000000

## 75. MEMBER_23 activates Level 3

Transaction: `0xe9530509c5f47291f1e8ce51a2f366bdd1fc279d7f080d259117783d03d15c3c`
Block: 4286

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_05: +8.0 USDT
- MEMBER_23: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=23, cycleNumber=1, activationId=76, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=23, linePaymentNumber=11
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=23, line=3, linePaymentNumber=11, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, position=23, amount=40000000, timestamp=1794498913
- 6. p39.SpilloverPaid: from=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), to=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=76, level=3, receiptType=2, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=23, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=2, cycleNumber=1, activationId=76, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, position=2, amount=8000000, timestamp=1794498913
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=7, cycleNumber=1, activationId=76, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=7, linePaymentNumber=4
- 19. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, position=7, amount=8000000, timestamp=1794498913
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=7, line=2, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=40000000, currentEscrowLockedGlobal=176000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), activationId=76, level=3, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=23, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=76, level=3, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=23, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=76, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=76, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, price=40000000

## 76. MEMBER_24 registers under BOB_ORBIT_OWNER

Transaction: `0x39d8e730f6100e4ba72b7b023dc2f363e8842d796ab694b0cd10f606472c5eed`
Block: 4289

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- ALICE_SPONSOR: +9.0 USDT
- MEMBER_24: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, cycleNumber=6, activationId=77, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=4, linePaymentNumber=4
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, line=1, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=9000000
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, position=4, amount=10000000, timestamp=1794498916
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=6
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, orbitType=4, sourcePosition=4, sourceCycle=6, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=77
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=3, cycleNumber=2, activationId=77, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=3, linePaymentNumber=3
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, amount=9000000, timestamp=1794498916
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 17. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=77, level=1, receiptType=4, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=6, mirroredPosition=3, mirroredCycle=2, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 19. levelManager.RecycleCompletedDetailed: activationId=77, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), sourcePosition=4, sourceCycle=6, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=3, mirrorCycle=2, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=77, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=77, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, price=10000000

## 77. MEMBER_24 activates Level 2

Transaction: `0xe1b4f2374f1980d0ae9e98cdb7f952b5814a6f52d3850df9cd43d34936056d7e`
Block: 4290

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- FOUNDER_1: +1.25 USDT
- FOUNDER_2: +1.25 USDT
- FOUNDER_3: +1.25 USDT
- FOUNDER_4: +1.25 USDT
- FOUNDER_5: +1.25 USDT
- FOUNDER_6: +1.25 USDT
- FOUNDER_7: +1.25 USDT
- FOUNDER_8: +1.25 USDT
- ALICE_SPONSOR: +8.0 USDT
- MEMBER_15: +8.0 USDT
- MEMBER_24: -20.0 USDT
- 0xA7B13d8B87c3e917A9BfB5D7fcec3A49Afaf6523: -10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, cycleNumber=2, activationId=78, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=12, linePaymentNumber=9
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, line=2, linePaymentNumber=9, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, position=12, amount=20000000, timestamp=1794498917
- 6. p12.SpilloverPaid: from=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), to=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, amount=8000000
- 7. p12.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, cycleNumber=2
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, orbitType=12, sourcePosition=12, sourceCycle=2, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=78
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=3, cycleNumber=1, activationId=78, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, position=3, amount=8000000, timestamp=1794498917
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), activationId=78, level=2, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=78, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=3, cycleNumber=1, activationId=78, isMirror=true
- 23. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=1, position=3, linePaymentNumber=3
- 24. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 25. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=3, amount=20000000, timestamp=1794498917
- 26. p12.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 29. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 30. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=78, level=2, receiptType=4, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 31. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=10, cycleNumber=1, activationId=78, isMirror=true
- 32. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=2, position=10, linePaymentNumber=3
- 33. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=10, amount=10000000, timestamp=1794498917
- 34. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=10, line=2, linePaymentNumber=3, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 52. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 53. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=78, level=2, receiptType=4, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=2, mirroredPosition=10, mirroredCycle=1, routedRole=4, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 54. levelManager.RecycleCompletedDetailed: activationId=78, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), sourcePosition=12, sourceCycle=2, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=20000000, recycleLiquidPaid=18000000, recycleEscrowLocked=0, mirrorPosition=3, mirrorCycle=1, triggeredOrbitReset=false
- 58. levelManager.SystemChargeDistributedDetailed: activationId=78, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 59. levelManager.ActivationFinancialSummaryRecorded: activationId=78, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=26000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 60. levelManager.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, amount=20000000
- 61. levelManager.LevelActivatedInOrbit: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 62. registration.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, price=20000000

## 78. MEMBER_24 activates Level 3

Transaction: `0xad5544d0278b9e5f894d91b1504649a39b82085417e781b2f3008cd1230d61c2`
Block: 4291

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_06: +8.0 USDT
- MEMBER_24: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=24, cycleNumber=1, activationId=79, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=24, linePaymentNumber=12
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=24, line=3, linePaymentNumber=12, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, position=24, amount=40000000, timestamp=1794498918
- 6. p39.SpilloverPaid: from=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), to=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=79, level=3, receiptType=2, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=24, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=2, cycleNumber=1, activationId=79, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, position=2, amount=8000000, timestamp=1794498918
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=7, cycleNumber=1, activationId=79, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=7, linePaymentNumber=4
- 19. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, position=7, amount=8000000, timestamp=1794498918
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=7, line=2, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=40000000, currentEscrowLockedGlobal=184000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), activationId=79, level=3, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=24, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=79, level=3, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=24, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=79, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=79, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, price=40000000

## 79. MEMBER_25 registers under BOB_ORBIT_OWNER

Transaction: `0x1a772132ae2b52e1d83fd6f38d7267333379c21444e469c856c8c5bc0e34ed0d`
Block: 4294

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_25: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, cycleNumber=7, activationId=80, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=1, linePaymentNumber=1
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, position=1, amount=10000000, timestamp=1794498921
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=80, level=1, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=7, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=80, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=80, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, price=10000000

## 80. MEMBER_25 activates Level 2

Transaction: `0x4399549d053a7cb1d9d7d9d115d66a9f719c8a0495cb40ca84c364d36ca79f5c`
Block: 4295

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- ALICE_SPONSOR: +10.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_25: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=1, cycleNumber=3, activationId=81, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=1, linePaymentNumber=1
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=1, amount=20000000, timestamp=1794498922
- 6. p12.SpilloverPaid: from=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=81, level=2, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=6, cycleNumber=1, activationId=81, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=6, linePaymentNumber=7
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=6, amount=10000000, timestamp=1794498922
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=6, line=2, linePaymentNumber=7, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=81, level=2, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=3, mirroredPosition=6, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=81, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=81, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, price=20000000

## 81. MEMBER_25 activates Level 3

Transaction: `0x02ad1d44df49017c72fe7a95ed237f4c2f40fd2fc9ada3d3393feb615e81f34a`
Block: 4296

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_07: +8.0 USDT
- MEMBER_25: -40.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=25, cycleNumber=1, activationId=82, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=25, linePaymentNumber=13
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=25, line=3, linePaymentNumber=13, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, position=25, amount=40000000, timestamp=1794498923
- 6. p39.SpilloverPaid: from=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), to=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=82, level=3, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=25, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=2, cycleNumber=1, activationId=82, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, position=2, amount=8000000, timestamp=1794498923
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=8, cycleNumber=1, activationId=82, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=8, linePaymentNumber=5
- 18. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, position=8, amount=8000000, timestamp=1794498923
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=8, line=2, linePaymentNumber=5, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), activationId=82, level=3, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=25, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=82, level=3, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=25, sourceCycle=1, mirroredPosition=8, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=82, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=82, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, price=40000000

## 82. MEMBER_26 registers under BOB_ORBIT_OWNER

Transaction: `0xd10be58fd683f3e0c9186d3d719140b6e24cf5626a8ffc94d0316e85b0fc1e90`
Block: 4299

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_26: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, cycleNumber=7, activationId=83, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=2, linePaymentNumber=2
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, position=2, amount=10000000, timestamp=1794498926
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=83, level=1, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=7, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=83, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=83, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, price=10000000

## 83. MEMBER_26 activates Level 2

Transaction: `0x8a373a2e9941e510d6597fa8723b823f9fd08d0acb74968256574a67c384d347`
Block: 4300

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_26: -20.0 USDT
- 0xA7B13d8B87c3e917A9BfB5D7fcec3A49Afaf6523: +10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=2, cycleNumber=3, activationId=84, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=2, linePaymentNumber=2
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=2, amount=20000000, timestamp=1794498927
- 6. p12.SpilloverPaid: from=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=84, level=2, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=9, cycleNumber=1, activationId=84, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=9, linePaymentNumber=8
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=9, amount=10000000, timestamp=1794498927
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=9, line=2, linePaymentNumber=8, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=0
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=84, level=2, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=3, mirroredPosition=9, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=0
- 21. levelManager.SystemChargeDistributedDetailed: activationId=84, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=84, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=8000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, price=20000000

## 84. MEMBER_26 activates Level 3

Transaction: `0xd86e6133877b0a8fd510937662876efad64112fe589211ad97285bf896adb6d5`
Block: 4301

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_08: +8.0 USDT
- MEMBER_26: -40.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=26, cycleNumber=1, activationId=85, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=26, linePaymentNumber=14
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=26, line=3, linePaymentNumber=14, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, position=26, amount=40000000, timestamp=1794498928
- 6. p39.SpilloverPaid: from=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), to=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=85, level=3, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=26, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=2, cycleNumber=1, activationId=85, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, position=2, amount=8000000, timestamp=1794498928
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=8, cycleNumber=1, activationId=85, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=8, linePaymentNumber=5
- 18. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, position=8, amount=8000000, timestamp=1794498928
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=8, line=2, linePaymentNumber=5, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), activationId=85, level=3, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=26, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=85, level=3, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=26, sourceCycle=1, mirroredPosition=8, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=85, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=85, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, price=40000000

## 85. MEMBER_27 registers under BOB_ORBIT_OWNER

Transaction: `0xe3be11e6e3da5af8569ffb548e7c60a5269a3b7ae0587916dbfcc562300b8d2a`
Block: 4304

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_27: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, cycleNumber=7, activationId=86, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=3, linePaymentNumber=3
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, position=3, amount=10000000, timestamp=1794498931
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=86, level=1, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=7, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=86, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=86, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, price=10000000

## 86. MEMBER_27 activates Level 2

Transaction: `0x817eee405a70da968d1777bce2e6b771f4e9e308dfef11c38d0a6a3006938efd`
Block: 4305

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- FOUNDER_1: +2.25 USDT
- FOUNDER_2: +2.25 USDT
- FOUNDER_3: +2.25 USDT
- FOUNDER_4: +2.25 USDT
- FOUNDER_5: +2.25 USDT
- FOUNDER_6: +2.25 USDT
- FOUNDER_7: +2.25 USDT
- FOUNDER_8: +2.25 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_27: -20.0 USDT
- 0xA7B13d8B87c3e917A9BfB5D7fcec3A49Afaf6523: -10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=3, cycleNumber=3, activationId=87, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=3, linePaymentNumber=3
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=3, amount=20000000, timestamp=1794498932
- 6. p12.SpilloverPaid: from=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=87, level=2, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=12, cycleNumber=1, activationId=87, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=12, linePaymentNumber=9
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=12, amount=10000000, timestamp=1794498932
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=12, line=2, linePaymentNumber=9, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 15. p12.OrbitReset: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, cycleNumber=1
- 19. levelManager.SystemChargeDistributedDetailed: activationId=87, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 20. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=2, cycleNumber=1, activationId=87, isMirror=true
- 21. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=1, position=2, linePaymentNumber=2
- 22. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 23. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=2, amount=20000000, timestamp=1794498932
- 24. p12.SpilloverPaid: from=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 43. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 44. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=87, level=2, receiptType=4, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=12, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 62. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 63. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=87, level=2, receiptType=4, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=12, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=4, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 64. levelManager.RecycleCompletedDetailed: activationId=87, orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, sourceUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), sourcePosition=12, sourceCycle=1, recycleReceiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), recycleGross=20000000, recycleLiquidPaid=18000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=1, triggeredOrbitReset=false
- 65. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=0
- 66. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=87, level=2, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=3, mirroredPosition=12, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=0
- 70. levelManager.SystemChargeDistributedDetailed: activationId=87, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 71. levelManager.ActivationFinancialSummaryRecorded: activationId=87, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=8000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 72. levelManager.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, amount=20000000
- 73. levelManager.LevelActivatedInOrbit: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 74. registration.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, price=20000000

## 87. MEMBER_27 activates Level 3

Transaction: `0xefe4fe616eced7410c7d384f53de9de601ded0967e75424febd32c249d18a986`
Block: 4306

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_09: +8.0 USDT
- MEMBER_27: -40.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=27, cycleNumber=1, activationId=88, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=27, linePaymentNumber=15
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=27, line=3, linePaymentNumber=15, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, position=27, amount=40000000, timestamp=1794498933
- 6. p39.SpilloverPaid: from=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), to=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=88, level=3, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=27, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=2, cycleNumber=1, activationId=88, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, position=2, amount=8000000, timestamp=1794498933
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=8, cycleNumber=1, activationId=88, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=8, linePaymentNumber=5
- 18. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, position=8, amount=8000000, timestamp=1794498933
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=8, line=2, linePaymentNumber=5, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), activationId=88, level=3, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=27, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=88, level=3, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=27, sourceCycle=1, mirroredPosition=8, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=88, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=88, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, price=40000000

## 88. MEMBER_28 registers under BOB_ORBIT_OWNER

Transaction: `0x79fcbdd2efdab6da6cbd0ebfc219f1e6dbc9f0e01edece11590fad59ed0e04cb`
Block: 4309

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- FOUNDER_1: +1.125 USDT
- FOUNDER_2: +1.125 USDT
- FOUNDER_3: +1.125 USDT
- FOUNDER_4: +1.125 USDT
- FOUNDER_5: +1.125 USDT
- FOUNDER_6: +1.125 USDT
- FOUNDER_7: +1.125 USDT
- FOUNDER_8: +1.125 USDT
- MEMBER_28: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, cycleNumber=7, activationId=89, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=4, linePaymentNumber=4
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, line=1, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=9000000
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, position=4, amount=10000000, timestamp=1794498936
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=7
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, orbitType=4, sourcePosition=4, sourceCycle=7, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=89
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=4, cycleNumber=2, activationId=89, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=4, linePaymentNumber=4
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, amount=9000000, timestamp=1794498936
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=4, line=1, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=9000000
- 15. p4.OrbitReset: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, cycleNumber=2
- 17. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=0
- 18. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=89, level=1, receiptType=4, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=7, mirroredPosition=4, mirroredCycle=2, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=0
- 19. levelManager.RecycleCompletedDetailed: activationId=89, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), sourcePosition=4, sourceCycle=7, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=0, recycleEscrowLocked=0, mirrorPosition=4, mirrorCycle=2, triggeredOrbitReset=false
- 20. p4.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, position=3, cycleNumber=1, activationId=89, isMirror=true
- 21. p4.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, line=1, position=3, linePaymentNumber=3
- 22. p4.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=3, amount=9000000, timestamp=1794498936
- 23. p4.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 42. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 43. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=89, level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=4, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 44. levelManager.RecycleCompletedDetailed: activationId=89, orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, sourceUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=2, recycleReceiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=3, mirrorCycle=1, triggeredOrbitReset=false
- 48. levelManager.SystemChargeDistributedDetailed: activationId=89, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 49. levelManager.ActivationFinancialSummaryRecorded: activationId=89, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 50. levelManager.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, amount=10000000
- 51. levelManager.LevelActivatedInOrbit: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 52. registration.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, price=10000000

## 89. MEMBER_28 activates Level 2

Transaction: `0xd643a5072a32d5e819ef6fdfce4990e44fbb64b557daddd071a5d19c9b123c76`
Block: 4310

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_25: +8.0 USDT
- MEMBER_28: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=4, cycleNumber=3, activationId=90, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=4, linePaymentNumber=1
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=4, line=2, linePaymentNumber=1, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, position=4, amount=20000000, timestamp=1794498937
- 6. p12.SpilloverPaid: from=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), to=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=90, level=2, receiptType=2, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=1, cycleNumber=1, activationId=90, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, position=1, amount=8000000, timestamp=1794498937
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), activationId=90, level=2, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=3, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=90, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=90, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, price=20000000

## 90. MEMBER_28 activates Level 3

Transaction: `0xc682b99a1654a292d5d66abd452d24c18a5793fa9e20d16f143498bfa4e587f9`
Block: 4311

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_10: +8.0 USDT
- MEMBER_28: -40.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=28, cycleNumber=1, activationId=91, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=28, linePaymentNumber=16
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=28, line=3, linePaymentNumber=16, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, position=28, amount=40000000, timestamp=1794498938
- 6. p39.SpilloverPaid: from=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), to=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=91, level=3, receiptType=2, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=28, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=2, cycleNumber=1, activationId=91, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, position=2, amount=8000000, timestamp=1794498938
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=9, cycleNumber=1, activationId=91, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=9, linePaymentNumber=6
- 18. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, position=9, amount=8000000, timestamp=1794498938
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=9, line=2, linePaymentNumber=6, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), activationId=91, level=3, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=28, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=91, level=3, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=28, sourceCycle=1, mirroredPosition=9, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=91, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=91, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, price=40000000

## 91. MEMBER_29 registers under BOB_ORBIT_OWNER

Transaction: `0x9bfed43f05dff74a08c272fcc2a3a03853bbd210a22da1fd643b14ccd3d034fa`
Block: 4314

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_29: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, cycleNumber=8, activationId=92, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=1, linePaymentNumber=1
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, position=1, amount=10000000, timestamp=1794498941
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=92, level=1, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=8, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=92, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=92, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, price=10000000

## 92. MEMBER_29 activates Level 2

Transaction: `0xddee76aef9458f27662ecb85e58546e03a321c72efa01b9b62910da4ea37556d`
Block: 4315

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_26: +8.0 USDT
- MEMBER_29: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=5, cycleNumber=3, activationId=93, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=5, linePaymentNumber=2
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=5, line=2, linePaymentNumber=2, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, position=5, amount=20000000, timestamp=1794498942
- 6. p12.SpilloverPaid: from=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), to=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=93, level=2, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=1, cycleNumber=1, activationId=93, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, position=1, amount=8000000, timestamp=1794498942
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), activationId=93, level=2, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=3, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=93, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=93, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, price=20000000

## 93. MEMBER_29 activates Level 3

Transaction: `0x7ef67cb95ec1a1192b0ccb516e4464ba25b8d01dfaf3b64d4895358d1a9006c2`
Block: 4316

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_11: +8.0 USDT
- MEMBER_29: -40.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=29, cycleNumber=1, activationId=94, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=29, linePaymentNumber=17
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=29, line=3, linePaymentNumber=17, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, position=29, amount=40000000, timestamp=1794498943
- 6. p39.SpilloverPaid: from=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), to=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=94, level=3, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=29, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=2, cycleNumber=1, activationId=94, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, position=2, amount=8000000, timestamp=1794498943
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=9, cycleNumber=1, activationId=94, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=9, linePaymentNumber=6
- 18. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, position=9, amount=8000000, timestamp=1794498943
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=9, line=2, linePaymentNumber=6, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), activationId=94, level=3, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=29, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=94, level=3, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=29, sourceCycle=1, mirroredPosition=9, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=94, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=94, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, price=40000000

## 94. MEMBER_30 registers under BOB_ORBIT_OWNER

Transaction: `0x3a0dd62ff07b9b842eba4c15168589f5abc7d7333b3cd59262db0152cc2f8c0f`
Block: 4319

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_30: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, cycleNumber=8, activationId=95, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=2, linePaymentNumber=2
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, position=2, amount=10000000, timestamp=1794498946
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=95, level=1, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=8, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=95, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=95, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, price=10000000

## 95. MEMBER_30 activates Level 2

Transaction: `0x6463345e37ec3d309ed59f17e774de4b625cb45706f042a97f9e4e6d85c342e6`
Block: 4320

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_27: +8.0 USDT
- MEMBER_30: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=6, cycleNumber=3, activationId=96, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=6, linePaymentNumber=3
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=6, line=2, linePaymentNumber=3, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, position=6, amount=20000000, timestamp=1794498947
- 6. p12.SpilloverPaid: from=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), to=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=96, level=2, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=1, cycleNumber=1, activationId=96, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, position=1, amount=8000000, timestamp=1794498947
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), activationId=96, level=2, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=3, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=96, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=96, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, price=20000000

## 96. MEMBER_30 activates Level 3

Transaction: `0xde481dc996f0a5d011211592a46d884b2097dbf1f52c75c67671b3496842f58f`
Block: 4321

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_12: +8.0 USDT
- MEMBER_30: -40.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=30, cycleNumber=1, activationId=97, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=30, linePaymentNumber=18
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=30, line=3, linePaymentNumber=18, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, position=30, amount=40000000, timestamp=1794498948
- 6. p39.SpilloverPaid: from=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), to=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=97, level=3, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=30, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=2, cycleNumber=1, activationId=97, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, position=2, amount=8000000, timestamp=1794498948
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=9, cycleNumber=1, activationId=97, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=9, linePaymentNumber=6
- 18. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, position=9, amount=8000000, timestamp=1794498948
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=9, line=2, linePaymentNumber=6, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), activationId=97, level=3, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=30, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=97, level=3, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=30, sourceCycle=1, mirroredPosition=9, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=97, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=97, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, price=40000000

## 97. MEMBER_31 registers under BOB_ORBIT_OWNER

Transaction: `0xd64b52df7a9464337828d9e68f17ecc44a20d0e3f521d54db005d89093e2a73b`
Block: 4324

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_31: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, cycleNumber=8, activationId=98, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=3, linePaymentNumber=3
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, position=3, amount=10000000, timestamp=1794498951
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=98, level=1, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=8, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=98, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=98, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, price=10000000

## 98. MEMBER_31 activates Level 2

Transaction: `0x7e4b91e100d0499f53fbd5cbf5c2622bd8babae62bad285cb129b531778d9663`
Block: 4325

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_25: +8.0 USDT
- MEMBER_31: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=7, cycleNumber=3, activationId=99, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=7, linePaymentNumber=4
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=7, line=2, linePaymentNumber=4, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, position=7, amount=20000000, timestamp=1794498952
- 6. p12.SpilloverPaid: from=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), to=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=99, level=2, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=2, cycleNumber=1, activationId=99, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, position=2, amount=8000000, timestamp=1794498952
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), activationId=99, level=2, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=3, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=99, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=99, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, price=20000000

## 99. MEMBER_31 activates Level 3

Transaction: `0x28447e5db96a4c1a64db6700b9c39f259a89e5501f6b5665d843544bca24ffc5`
Block: 4326

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_31: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=31, cycleNumber=1, activationId=100, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=31, linePaymentNumber=19
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=31, line=3, linePaymentNumber=19, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, position=31, amount=40000000, timestamp=1794498953
- 6. p39.SpilloverPaid: from=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), to=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=100, level=3, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=31, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=3, cycleNumber=1, activationId=100, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, position=3, amount=8000000, timestamp=1794498953
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=192000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=10, cycleNumber=1, activationId=100, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=10, linePaymentNumber=7
- 23. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, position=10, amount=8000000, timestamp=1794498953
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=10, line=2, linePaymentNumber=7, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), activationId=100, level=3, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=31, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=100, level=3, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=31, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=100, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=100, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, price=40000000

## 100. MEMBER_32 registers under BOB_ORBIT_OWNER

Transaction: `0x25ab41373e8e12b18f636626760660279f1f96b7f390a2b0e565de815f30b822`
Block: 4329

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- ALICE_SPONSOR: +9.0 USDT
- MEMBER_32: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, cycleNumber=8, activationId=101, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=4, linePaymentNumber=4
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, line=1, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=9000000
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, position=4, amount=10000000, timestamp=1794498956
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=8
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, orbitType=4, sourcePosition=4, sourceCycle=8, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=101
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, cycleNumber=3, activationId=101, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=1, linePaymentNumber=1
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, amount=9000000, timestamp=1794498956
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 17. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=101, level=1, receiptType=4, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=8, mirroredPosition=1, mirroredCycle=3, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 19. levelManager.RecycleCompletedDetailed: activationId=101, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), sourcePosition=4, sourceCycle=8, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=1, mirrorCycle=3, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=101, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=101, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, price=10000000

## 101. MEMBER_32 activates Level 2

Transaction: `0x8d9914c0c7ffef259094f061a3a300ed44a9b739e07bb850c5ccc9e5b0356318`
Block: 4330

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_26: +8.0 USDT
- MEMBER_32: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=8, cycleNumber=3, activationId=102, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=8, linePaymentNumber=5
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=8, line=2, linePaymentNumber=5, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, position=8, amount=20000000, timestamp=1794498957
- 6. p12.SpilloverPaid: from=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), to=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=102, level=2, receiptType=2, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=2, cycleNumber=1, activationId=102, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, position=2, amount=8000000, timestamp=1794498957
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), activationId=102, level=2, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=3, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=102, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=102, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, price=20000000

## 102. MEMBER_32 activates Level 3

Transaction: `0x7aa998d51e9173f5cd427f395aa2ad75a83c86fac99ac638b3c6b631875c5cf3`
Block: 4331

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_32: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=32, cycleNumber=1, activationId=103, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=32, linePaymentNumber=20
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=32, line=3, linePaymentNumber=20, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, position=32, amount=40000000, timestamp=1794498958
- 6. p39.SpilloverPaid: from=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), to=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=103, level=3, receiptType=2, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=32, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=3, cycleNumber=1, activationId=103, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, position=3, amount=8000000, timestamp=1794498958
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=200000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=10, cycleNumber=1, activationId=103, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=10, linePaymentNumber=7
- 23. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, position=10, amount=8000000, timestamp=1794498958
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=10, line=2, linePaymentNumber=7, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), activationId=103, level=3, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=32, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=103, level=3, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=32, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=103, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=103, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, price=40000000

## 103. MEMBER_33 registers under BOB_ORBIT_OWNER

Transaction: `0xbfeffc68f0df341421377dcb944fd1aa19380f9cb8e1d37f8a2eb02c897b7330`
Block: 4334

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_33: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, cycleNumber=9, activationId=104, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=1, linePaymentNumber=1
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, position=1, amount=10000000, timestamp=1794498961
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=104, level=1, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=9, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=104, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=104, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, price=10000000

## 104. MEMBER_33 activates Level 2

Transaction: `0xe3863fa6c80c2bd5455093b6affa2e5b08bdd7e4f9f0a4f5e28831a59da164c4`
Block: 4335

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_27: +8.0 USDT
- MEMBER_33: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=9, cycleNumber=3, activationId=105, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=9, linePaymentNumber=6
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=9, line=2, linePaymentNumber=6, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, position=9, amount=20000000, timestamp=1794498962
- 6. p12.SpilloverPaid: from=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), to=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=105, level=2, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=2, cycleNumber=1, activationId=105, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, position=2, amount=8000000, timestamp=1794498962
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), activationId=105, level=2, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=3, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=105, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=105, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, price=20000000

## 105. MEMBER_33 activates Level 3

Transaction: `0x22d36924c5f265063fba80a69b6c5626be606c1e23d1d0e0fb28833056cf75c3`
Block: 4336

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_33: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=33, cycleNumber=1, activationId=106, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=33, linePaymentNumber=21
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=33, line=3, linePaymentNumber=21, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, position=33, amount=40000000, timestamp=1794498963
- 6. p39.SpilloverPaid: from=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), to=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=106, level=3, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=33, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=3, cycleNumber=1, activationId=106, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, position=3, amount=8000000, timestamp=1794498963
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=208000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=10, cycleNumber=1, activationId=106, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=10, linePaymentNumber=7
- 23. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, position=10, amount=8000000, timestamp=1794498963
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=10, line=2, linePaymentNumber=7, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), activationId=106, level=3, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=33, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=106, level=3, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=33, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=106, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=106, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, price=40000000

## 106. MEMBER_34 registers under BOB_ORBIT_OWNER

Transaction: `0x871c2f1f20039ac6b1bee609630f37f4b2f689e3d785a6b9db16ceb784a84215`
Block: 4339

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_34: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, cycleNumber=9, activationId=107, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=2, linePaymentNumber=2
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, position=2, amount=10000000, timestamp=1794498966
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=107, level=1, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=9, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=107, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=107, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, price=10000000

## 107. MEMBER_34 activates Level 2

Transaction: `0xe0046b9ce99da58f271a7c0d9e5f8acfee55af959e61b1bd8d2616af9fcb872d`
Block: 4340

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +10.0 USDT
- MEMBER_25: +8.0 USDT
- MEMBER_34: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=10, cycleNumber=3, activationId=108, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=10, linePaymentNumber=7
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=10, line=2, linePaymentNumber=7, toOwner=10000000, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, position=10, amount=20000000, timestamp=1794498967
- 6. p12.SpilloverPaid: from=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), to=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=108, level=2, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=3, cycleNumber=1, activationId=108, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, position=3, amount=8000000, timestamp=1794498967
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), activationId=108, level=2, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=3, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=108, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=108, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, price=20000000

## 108. MEMBER_34 activates Level 3

Transaction: `0x1fd4a8f234a9a04db88be6565ae42a0716cbae2a6b66ebe8a8ad63aa66c59b0f`
Block: 4341

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_34: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=34, cycleNumber=1, activationId=109, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=34, linePaymentNumber=22
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=34, line=3, linePaymentNumber=22, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, position=34, amount=40000000, timestamp=1794498968
- 6. p39.SpilloverPaid: from=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), to=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=109, level=3, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=34, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=3, cycleNumber=1, activationId=109, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, position=3, amount=8000000, timestamp=1794498968
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=216000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=11, cycleNumber=1, activationId=109, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=11, linePaymentNumber=8
- 23. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, position=11, amount=8000000, timestamp=1794498968
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=11, line=2, linePaymentNumber=8, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), activationId=109, level=3, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=34, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=109, level=3, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=34, sourceCycle=1, mirroredPosition=11, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=109, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=109, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, price=40000000

## 109. MEMBER_35 registers under BOB_ORBIT_OWNER

Transaction: `0xc3458b79d366a9285ec592102fff9cd79c8219e34baa970a4f18b72a792a11fa`
Block: 4344

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_35: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, cycleNumber=9, activationId=110, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=3, linePaymentNumber=3
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, position=3, amount=10000000, timestamp=1794498971
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=110, level=1, receiptType=2, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=9, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=110, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=110, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, price=10000000

## 110. MEMBER_35 activates Level 2

Transaction: `0x394b7ac811630a7caf6dabc098bddf8cbf8cc5ed7932918897b695b4df32b169`
Block: 4345

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- MEMBER_26: +8.0 USDT
- MEMBER_35: -20.0 USDT
- 0xA7B13d8B87c3e917A9BfB5D7fcec3A49Afaf6523: +10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, cycleNumber=3, activationId=111, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=11, linePaymentNumber=8
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, line=2, linePaymentNumber=8, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, position=11, amount=20000000, timestamp=1794498972
- 6. p12.SpilloverPaid: from=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), to=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, amount=8000000
- 8. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, orbitType=12, sourcePosition=11, sourceCycle=3, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=111
- 10. p12.PositionActivationLinked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=3, cycleNumber=1, activationId=111, isMirror=true
- 11. p12.LinePaymentTracked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, line=1, position=3, linePaymentNumber=3
- 12. p12.PositionFilled: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, position=3, amount=8000000, timestamp=1794498972
- 13. p12.PaymentRuleApplied: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 15. levelManager.PayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 16. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), activationId=111, level=2, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=3, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=111, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=111, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=8000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, price=20000000

## 111. MEMBER_35 activates Level 3

Transaction: `0x1c13c3dec24203767eb9180404779f052484ae1c18a596a8964e54477922e8b0`
Block: 4346

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_35: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=35, cycleNumber=1, activationId=112, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=35, linePaymentNumber=23
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=35, line=3, linePaymentNumber=23, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, position=35, amount=40000000, timestamp=1794498973
- 6. p39.SpilloverPaid: from=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), to=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=112, level=3, receiptType=2, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=35, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=3, cycleNumber=1, activationId=112, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, position=3, amount=8000000, timestamp=1794498973
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=224000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=11, cycleNumber=1, activationId=112, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=11, linePaymentNumber=8
- 23. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, position=11, amount=8000000, timestamp=1794498973
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=11, line=2, linePaymentNumber=8, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), activationId=112, level=3, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=35, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=112, level=3, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=35, sourceCycle=1, mirroredPosition=11, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=112, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=112, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, price=40000000

## 112. MEMBER_36 registers under BOB_ORBIT_OWNER

Transaction: `0xf87be4b0d886c665ca2ab03cbdfc64b22ab630df7a66a028c578f2475d661577`
Block: 4349

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- ALICE_SPONSOR: +9.0 USDT
- MEMBER_36: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, cycleNumber=9, activationId=113, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=4, linePaymentNumber=4
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, line=1, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=9000000
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, position=4, amount=10000000, timestamp=1794498976
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=9
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, orbitType=4, sourcePosition=4, sourceCycle=9, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=113
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, cycleNumber=3, activationId=113, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=2, linePaymentNumber=2
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, amount=9000000, timestamp=1794498976
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 17. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=113, level=1, receiptType=4, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=9, mirroredPosition=2, mirroredCycle=3, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 19. levelManager.RecycleCompletedDetailed: activationId=113, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), sourcePosition=4, sourceCycle=9, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=3, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=113, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=113, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, price=10000000

## 113. MEMBER_36 activates Level 2

Transaction: `0x9c7ecc5e2d76b8e52cf3f78f783e441e1ca73ea45105b39a804d7ef0bf7a3c94`
Block: 4350

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- FOUNDER_1: +1.25 USDT
- FOUNDER_2: +1.25 USDT
- FOUNDER_3: +1.25 USDT
- FOUNDER_4: +1.25 USDT
- FOUNDER_5: +1.25 USDT
- FOUNDER_6: +1.25 USDT
- FOUNDER_7: +1.25 USDT
- FOUNDER_8: +1.25 USDT
- ALICE_SPONSOR: +8.0 USDT
- MEMBER_27: +8.0 USDT
- MEMBER_36: -20.0 USDT
- 0xA7B13d8B87c3e917A9BfB5D7fcec3A49Afaf6523: -10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, cycleNumber=3, activationId=114, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=12, linePaymentNumber=9
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, line=2, linePaymentNumber=9, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, position=12, amount=20000000, timestamp=1794498977
- 6. p12.SpilloverPaid: from=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), to=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, amount=8000000
- 7. p12.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, cycleNumber=3
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, orbitType=12, sourcePosition=12, sourceCycle=3, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=114
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=3, cycleNumber=1, activationId=114, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, position=3, amount=8000000, timestamp=1794498977
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), activationId=114, level=2, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=3, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=114, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=1, cycleNumber=2, activationId=114, isMirror=true
- 23. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=1, position=1, linePaymentNumber=1
- 24. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 25. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=1, amount=20000000, timestamp=1794498977
- 26. p12.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 29. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 30. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=114, level=2, receiptType=4, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=3, mirroredPosition=1, mirroredCycle=2, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 31. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=5, cycleNumber=1, activationId=114, isMirror=true
- 32. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=2, position=5, linePaymentNumber=4
- 33. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=5, amount=10000000, timestamp=1794498977
- 34. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=5, line=2, linePaymentNumber=4, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 52. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 53. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=114, level=2, receiptType=4, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=3, mirroredPosition=5, mirroredCycle=1, routedRole=4, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 54. levelManager.RecycleCompletedDetailed: activationId=114, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), sourcePosition=12, sourceCycle=3, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=20000000, recycleLiquidPaid=18000000, recycleEscrowLocked=0, mirrorPosition=1, mirrorCycle=2, triggeredOrbitReset=false
- 58. levelManager.SystemChargeDistributedDetailed: activationId=114, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 59. levelManager.ActivationFinancialSummaryRecorded: activationId=114, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=26000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 60. levelManager.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, amount=20000000
- 61. levelManager.LevelActivatedInOrbit: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 62. registration.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, price=20000000

## 114. MEMBER_36 activates Level 3

Transaction: `0xbcbb544fd7b016a2d0384e9847e0e65824bacb00c27a1e7bf7737e1174ba0be8`
Block: 4351

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_36: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=36, cycleNumber=1, activationId=115, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=36, linePaymentNumber=24
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=36, line=3, linePaymentNumber=24, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, position=36, amount=40000000, timestamp=1794498978
- 6. p39.SpilloverPaid: from=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), to=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=115, level=3, receiptType=2, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=36, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=3, cycleNumber=1, activationId=115, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, position=3, amount=8000000, timestamp=1794498978
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=232000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=11, cycleNumber=1, activationId=115, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=11, linePaymentNumber=8
- 23. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, position=11, amount=8000000, timestamp=1794498978
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=11, line=2, linePaymentNumber=8, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), activationId=115, level=3, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=36, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=115, level=3, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=36, sourceCycle=1, mirroredPosition=11, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=115, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=115, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, price=40000000

## 115. MEMBER_37 registers under BOB_ORBIT_OWNER

Transaction: `0x66fd74a212e2a9241f93970cc1c2f7dd8e8d272e8a091e5b69ab2e3ce3a20160`
Block: 4354

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_37: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, cycleNumber=10, activationId=116, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=1, linePaymentNumber=1
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, position=1, amount=10000000, timestamp=1794498981
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=116, level=1, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=10, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=116, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=116, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, price=10000000

## 116. MEMBER_37 activates Level 2

Transaction: `0x1d7cac269a1fc23a92637d3f90b1887cfb544f43eedb67316dca39ea62fad85c`
Block: 4355

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- ALICE_SPONSOR: +10.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_37: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=1, cycleNumber=4, activationId=117, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=1, linePaymentNumber=1
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, position=1, amount=20000000, timestamp=1794498982
- 6. p12.SpilloverPaid: from=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=117, level=2, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=4, cycleNumber=2, activationId=117, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=4, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, position=4, amount=10000000, timestamp=1794498982
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=4, line=2, linePaymentNumber=1, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=117, level=2, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=4, mirroredPosition=4, mirroredCycle=2, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=117, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=117, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, price=20000000

## 117. MEMBER_37 activates Level 3

Transaction: `0xc57be9ce1f51533106c3d96fa37254600de5fd4453657228b04c2c9bf66c5def`
Block: 4356

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_37: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=37, cycleNumber=1, activationId=118, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=37, linePaymentNumber=25
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=37, line=3, linePaymentNumber=25, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, position=37, amount=40000000, timestamp=1794498983
- 6. p39.SpilloverPaid: from=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), to=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=118, level=3, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=37, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=3, cycleNumber=1, activationId=118, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, position=3, amount=8000000, timestamp=1794498983
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=240000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=12, cycleNumber=1, activationId=118, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=12, linePaymentNumber=9
- 23. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, position=12, amount=8000000, timestamp=1794498983
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=12, line=2, linePaymentNumber=9, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), activationId=118, level=3, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=37, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=118, level=3, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=37, sourceCycle=1, mirroredPosition=12, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=118, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=118, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, price=40000000

## 118. MEMBER_38 registers under BOB_ORBIT_OWNER

Transaction: `0xf545632ca7a8a661e915d7b4f05d751cde3ed34b439a3734ebe5e98550c4726a`
Block: 4359

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_38: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, cycleNumber=10, activationId=119, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=2, linePaymentNumber=2
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, position=2, amount=10000000, timestamp=1794498986
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=119, level=1, receiptType=2, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=10, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=119, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=119, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, price=10000000

## 119. MEMBER_38 activates Level 2

Transaction: `0x28fb39647afaa1ccc99cc42ea9604cff26b0de9709d00774f87b91f8a6dbbceb`
Block: 4360

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- ALICE_SPONSOR: +10.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_38: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=2, cycleNumber=4, activationId=120, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=2, linePaymentNumber=2
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, position=2, amount=20000000, timestamp=1794498987
- 6. p12.SpilloverPaid: from=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=120, level=2, receiptType=2, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=7, cycleNumber=2, activationId=120, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=7, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, position=7, amount=10000000, timestamp=1794498987
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=7, line=2, linePaymentNumber=2, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=120, level=2, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=4, mirroredPosition=7, mirroredCycle=2, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=120, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=120, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, price=20000000

## 120. MEMBER_38 activates Level 3

Transaction: `0x3c7da607e4d612c6936657d93abb9cf80dc3a6df24277993ff0f3ccb3fdb9147`
Block: 4361

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_38: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT
- 0xA7B13d8B87c3e917A9BfB5D7fcec3A49Afaf6523: +20.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=38, cycleNumber=1, activationId=121, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=38, linePaymentNumber=26
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=38, line=3, linePaymentNumber=26, toOwner=0, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=20000000
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, position=38, amount=40000000, timestamp=1794498988
- 6. p39.SpilloverPaid: from=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), to=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, orbitType=39, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, orbitType=39, sourcePosition=38, sourceCycle=1, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=121
- 11. p39.PositionActivationLinked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=3, cycleNumber=1, activationId=121, isMirror=true
- 12. p39.LinePaymentTracked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, line=1, position=3, linePaymentNumber=3
- 14. p39.PositionFilled: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, position=3, amount=8000000, timestamp=1794498988
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 19. escrow.EscrowLocked: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=248000000
- 20. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=12, cycleNumber=1, activationId=121, isMirror=true
- 21. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=12, linePaymentNumber=9
- 22. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, position=12, amount=8000000, timestamp=1794498988
- 23. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=12, line=2, linePaymentNumber=9, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 25. levelManager.PayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 26. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), activationId=121, level=3, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=38, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=121, level=3, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=38, sourceCycle=1, mirroredPosition=12, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=121, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=121, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=8000000, totalEscrowLocked=8000000, totalRecycleAllocated=20000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, price=40000000

## 121. MEMBER_39 registers under BOB_ORBIT_OWNER

Transaction: `0xb56b08a76346d736b4fd4fd824a283347672460c0008a37c6fd14d194d85f1d8`
Block: 4364

USDT balance changes:

- NFT_POOL: +0.8 USDT
- OPERATIONS: +0.2 USDT
- BOB_ORBIT_OWNER: +9.0 USDT
- MEMBER_39: -10.0 USDT

Ordered contract evidence:

- 0. registration.Registered: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), referrer=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0)
- 3. p4.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, cycleNumber=10, activationId=122, isMirror=false
- 4. p4.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, line=1, position=3, linePaymentNumber=3
- 5. p4.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, position=3, amount=10000000, timestamp=1794498991
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=122, level=1, receiptType=2, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=10, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=122, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=122, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, orbit=0x5402aA9F736804901aa4996FDed53dCEccE6A5A5, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, price=10000000

## 122. MEMBER_39 activates Level 2

Transaction: `0x41f0425eff010fa98a53ec5cb156722a259a436a438446b8e01836561ff56a61`
Block: 4365

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- ALICE_SPONSOR: +10.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_39: -20.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=3, cycleNumber=4, activationId=123, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=3, linePaymentNumber=3
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, position=3, amount=20000000, timestamp=1794498992
- 6. p12.SpilloverPaid: from=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=123, level=2, receiptType=2, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=10, cycleNumber=2, activationId=123, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=10, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, position=10, amount=10000000, timestamp=1794498992
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=10, line=2, linePaymentNumber=3, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=123, level=2, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=4, mirroredPosition=10, mirroredCycle=2, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=123, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=123, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, orbit=0xe2c212651ce178A0fd29CD7C4fF7E6698B53891D, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, price=20000000

## 123. MEMBER_39 activates Level 3

Transaction: `0xb7133920fdef86ed58c7ebc7dd429ce060b41e6eb4c2c31d1414f64450841890`
Block: 4366

USDT balance changes:

- NFT_POOL: +6.4 USDT
- OPERATIONS: +1.6 USDT
- FOUNDER_1: +3.5 USDT
- FOUNDER_2: +3.5 USDT
- FOUNDER_3: +3.5 USDT
- FOUNDER_4: +3.5 USDT
- FOUNDER_5: +3.5 USDT
- FOUNDER_6: +3.5 USDT
- FOUNDER_7: +3.5 USDT
- FOUNDER_8: +3.5 USDT
- ALICE_SPONSOR: +8.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_39: -40.0 USDT
- 0x8B8d13a7f678FA8f6793290Ee9e46302Be427453: +8.0 USDT
- 0xA7B13d8B87c3e917A9BfB5D7fcec3A49Afaf6523: -20.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=39, cycleNumber=1, activationId=124, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=39, linePaymentNumber=27
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=39, line=3, linePaymentNumber=27, toOwner=0, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=20000000
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, position=39, amount=40000000, timestamp=1794498993
- 6. p39.SpilloverPaid: from=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), to=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 8. p39.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, cycleNumber=1
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, orbitType=39, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 11. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, orbitType=39, sourcePosition=39, sourceCycle=1, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=124
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=3, cycleNumber=1, activationId=124, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, position=3, amount=8000000, timestamp=1794498993
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=256000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=12, cycleNumber=1, activationId=124, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=12, linePaymentNumber=9
- 23. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, position=12, amount=8000000, timestamp=1794498993
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=12, line=2, linePaymentNumber=9, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), activationId=124, level=3, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=39, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=124, level=3, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=39, sourceCycle=1, mirroredPosition=12, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=124, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=2, cycleNumber=1, activationId=124, isMirror=true
- 35. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=1, position=2, linePaymentNumber=2
- 36. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 37. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=2, amount=40000000, timestamp=1794498993
- 38. p39.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=8000000
- 39. p39.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 42. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 43. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=124, level=3, receiptType=4, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=39, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 44. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=7, cycleNumber=1, activationId=124, isMirror=true
- 45. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=2, position=7, linePaymentNumber=2
- 46. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=7, amount=8000000, timestamp=1794498993
- 47. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=7, line=2, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 65. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 66. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=124, level=3, receiptType=4, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=39, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 84. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 85. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=124, level=3, receiptType=4, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=39, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=4, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 86. levelManager.RecycleCompletedDetailed: activationId=124, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, sourceUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), sourcePosition=39, sourceCycle=1, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=40000000, recycleLiquidPaid=36000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=1, triggeredOrbitReset=false
- 90. levelManager.SystemChargeDistributedDetailed: activationId=124, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 91. levelManager.ActivationFinancialSummaryRecorded: activationId=124, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=44000000, totalEscrowLocked=8000000, totalRecycleAllocated=20000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 92. levelManager.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, amount=40000000
- 93. levelManager.LevelActivatedInOrbit: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, orbit=0x0A0c764A0d9D3fa043aCF15a6036a9999CAC4b20, netAmount=40000000
- 94. registration.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, price=40000000
