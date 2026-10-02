# Canonical Contract-Derived Behavior Trace

Generated: 2026-10-02T00:43:23.526Z

All amounts below are read from transaction events or token balance changes. This file is generated, not manually transcribed.

## Final Cycle State

Bob P12 completed cycles: 3
Bob P39 completed cycles: 1

## 1. ALICE_SPONSOR registers under ID1

Transaction: `0x26caec3fdbf4f3f6754a1c4bc4e8e57fc8e9877aff2dea0fea6e633b9a6231b1`
Block: 66

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
- 6. p4.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, amount=10000000, timestamp=1790901808
- 25. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, receiptType=2, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 26. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=1, level=1, receiptType=2, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 30. levelManager.SystemChargeDistributedDetailed: activationId=1, user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 31. levelManager.ActivationFinancialSummaryRecorded: activationId=1, user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 32. levelManager.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, amount=10000000
- 33. levelManager.LevelActivatedInOrbit: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 34. registration.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, price=10000000

## 2. ALICE_SPONSOR activates Level 2

Transaction: `0x70bd05cb465044a30e24f2bc53417e8f379611523a095c40aaa4059c2edf69ba`
Block: 67

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
- 5. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=1, amount=20000000, timestamp=1790901809
- 6. p12.SpilloverPaid: from=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 25. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=2, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 26. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=2, level=2, receiptType=2, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 44. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=3, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 45. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=2, level=2, receiptType=3, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 49. levelManager.SystemChargeDistributedDetailed: activationId=2, user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 50. levelManager.ActivationFinancialSummaryRecorded: activationId=2, user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 51. levelManager.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=20000000
- 52. levelManager.LevelActivatedInOrbit: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 53. registration.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, price=20000000

## 3. ALICE_SPONSOR activates Level 3

Transaction: `0x4457dc2ca8c129dbf505d16e91376be24073a922bd5343ae82fd97e35ad2a9f9`
Block: 68

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
- 5. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=1, amount=40000000, timestamp=1790901810
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
- 72. levelManager.LevelActivatedInOrbit: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 73. registration.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, price=40000000

## 4. BOB_ORBIT_OWNER registers under ALICE_SPONSOR

Transaction: `0x29250444bf44a2ce780c58882b4cd34e7a4db2231a6d38e052cea5453157069d`
Block: 71

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
- 6. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, amount=10000000, timestamp=1790901813
- 9. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=4, level=1, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=4, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=4, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, price=10000000

## 5. BOB_ORBIT_OWNER activates Level 2

Transaction: `0xb93a4f852fa0eda91a723d08d2c2d5eb7d8b914c4e17ead0f694047223325ea3`
Block: 72

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
- 5. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=1, amount=20000000, timestamp=1790901814
- 6. p12.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=5, level=2, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=4, cycleNumber=1, activationId=5, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=2, position=4, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=4, amount=10000000, timestamp=1790901814
- 14. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=4, line=2, linePaymentNumber=1, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 32. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 33. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=5, level=2, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 37. levelManager.SystemChargeDistributedDetailed: activationId=5, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 38. levelManager.ActivationFinancialSummaryRecorded: activationId=5, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 39. levelManager.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, amount=20000000
- 40. levelManager.LevelActivatedInOrbit: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 41. registration.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, price=20000000

## 6. BOB_ORBIT_OWNER activates Level 3

Transaction: `0xf6b7d1dd4db200563e61b2b9e67d89064b7da8c19e05ceb716792a95146b6867`
Block: 73

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
- 5. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=1, amount=40000000, timestamp=1790901815
- 6. p39.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=6, level=3, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=4, cycleNumber=1, activationId=6, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=2, position=4, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=4, amount=8000000, timestamp=1790901815
- 15. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=4, line=2, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=7, cycleNumber=1, activationId=6, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=2, position=7, linePaymentNumber=2
- 18. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=7, amount=20000000, timestamp=1790901815
- 19. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=7, line=2, linePaymentNumber=2, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 54. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 55. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=6, level=3, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 56. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 57. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=6, level=3, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 61. levelManager.SystemChargeDistributedDetailed: activationId=6, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 62. levelManager.ActivationFinancialSummaryRecorded: activationId=6, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 63. levelManager.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, amount=40000000
- 64. levelManager.LevelActivatedInOrbit: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 65. registration.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, price=40000000

## 7. MEMBER_01 registers under BOB_ORBIT_OWNER

Transaction: `0xcd728e5e96239e1b882214e6c527e5fcab3be27d6f74487d89e8c82114e48044`
Block: 76

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, position=1, amount=10000000, timestamp=1790901818
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=7, level=1, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=7, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=7, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, price=10000000

## 8. MEMBER_01 activates Level 2

Transaction: `0x0777c5c3638305c0073272707c9134eee28b733b537342029fde3206afe5eac3`
Block: 77

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=1, amount=20000000, timestamp=1790901819
- 6. p12.SpilloverPaid: from=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=8, level=2, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=4, cycleNumber=1, activationId=8, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=4, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=4, amount=10000000, timestamp=1790901819
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=4, line=2, linePaymentNumber=1, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=8, level=2, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=8, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=8, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, price=20000000

## 9. MEMBER_01 activates Level 3

Transaction: `0x2db66ba94cccc308a7945634262d45d3f24f303e6c096601709ce84c1e03ab39`
Block: 78

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
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=1, cycleNumber=1, activationId=9, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=1, position=1, linePaymentNumber=1
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=1, amount=40000000, timestamp=1790901820
- 6. p39.SpilloverPaid: from=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=9, level=3, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=4, cycleNumber=1, activationId=9, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=2, position=4, linePaymentNumber=1
- 15. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=4, amount=8000000, timestamp=1790901820
- 16. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=4, line=2, linePaymentNumber=1, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=8000000
- 21. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=16, cycleNumber=1, activationId=9, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=3, position=16, linePaymentNumber=1
- 23. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=16, amount=20000000, timestamp=1790901820
- 24. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=16, line=3, linePaymentNumber=1, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 42. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 43. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=9, level=3, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 44. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 45. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=9, level=3, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=16, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 49. levelManager.SystemChargeDistributedDetailed: activationId=9, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 50. levelManager.ActivationFinancialSummaryRecorded: activationId=9, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 51. levelManager.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=40000000
- 52. levelManager.LevelActivatedInOrbit: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 53. registration.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, price=40000000

## 10. MEMBER_02 registers under BOB_ORBIT_OWNER

Transaction: `0x4d9d9cebd6fdf7f2fe7292a0a4af79e00646eaad955fccc6b68487247290675a`
Block: 81

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, position=2, amount=10000000, timestamp=1790901823
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=10, level=1, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=10, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=10, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, price=10000000

## 11. MEMBER_02 activates Level 2

Transaction: `0xf88b32f27301a82a4b1b8fc704e98bf75e402a2972573c401c696d60e20e3c30`
Block: 82

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=2, amount=20000000, timestamp=1790901824
- 6. p12.SpilloverPaid: from=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=11, level=2, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=7, cycleNumber=1, activationId=11, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=7, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=7, amount=10000000, timestamp=1790901824
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=7, line=2, linePaymentNumber=2, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=11, level=2, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=11, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=11, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, price=20000000

## 12. MEMBER_02 activates Level 3

Transaction: `0xfd0558b8ac4ba2a66236bbeb4246e996da1472008de67b997cd3b7f85248cabf`
Block: 83

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
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=2, cycleNumber=1, activationId=12, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=1, position=2, linePaymentNumber=2
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=2, amount=40000000, timestamp=1790901825
- 6. p39.SpilloverPaid: from=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=12, level=3, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=7, cycleNumber=1, activationId=12, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=2, position=7, linePaymentNumber=2
- 15. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=7, amount=8000000, timestamp=1790901825
- 16. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=7, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=16000000, currentEscrowLockedGlobal=16000000
- 21. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=25, cycleNumber=1, activationId=12, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=3, position=25, linePaymentNumber=2
- 23. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=25, amount=20000000, timestamp=1790901825
- 24. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=25, line=3, linePaymentNumber=2, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 42. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 43. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=12, level=3, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 44. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 45. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=12, level=3, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=25, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 49. levelManager.SystemChargeDistributedDetailed: activationId=12, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 50. levelManager.ActivationFinancialSummaryRecorded: activationId=12, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 51. levelManager.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=40000000
- 52. levelManager.LevelActivatedInOrbit: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 53. registration.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, price=40000000

## 13. MEMBER_03 registers under BOB_ORBIT_OWNER

Transaction: `0x2cfa27419b156bac7e98bbc19a28ede6fcf4a67d7f3d08d8ea6536717fa62740`
Block: 86

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, position=3, amount=10000000, timestamp=1790901828
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=13, level=1, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=13, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=13, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, price=10000000

## 14. MEMBER_03 activates Level 2

Transaction: `0x2c2697263b8e13120038541404499dae6fdc412cfaecb4697083903a837954fa`
Block: 87

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=3, amount=20000000, timestamp=1790901829
- 6. p12.SpilloverPaid: from=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=14, level=2, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=10, cycleNumber=1, activationId=14, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=10, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=10, amount=10000000, timestamp=1790901829
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=10, line=2, linePaymentNumber=3, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=14, level=2, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=14, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=14, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, price=20000000

## 15. MEMBER_03 activates Level 3

Transaction: `0x97e94247f9c599cb090ed34f32221c2902b39630b0ca1a29b9c26caa7fcab98b`
Block: 88

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
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +16.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=3, cycleNumber=1, activationId=15, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=1, position=3, linePaymentNumber=3
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=8000000, toSpillover2=20000000, toEscrow=8000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=3, amount=40000000, timestamp=1790901830
- 7. p39.SpilloverPaid: from=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=15, level=3, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, orbitType=39, sourcePosition=3, sourceCycle=1, expectedAmount=8000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=15
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=24000000
- 17. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=10, cycleNumber=1, activationId=15, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=2, position=10, linePaymentNumber=3
- 20. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=10, amount=8000000, timestamp=1790901830
- 21. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=10, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 25. escrow.EscrowLocked: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=24000000, currentEscrowLockedGlobal=32000000
- 26. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=34, cycleNumber=1, activationId=15, isMirror=true
- 27. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=3, position=34, linePaymentNumber=3
- 28. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=34, amount=20000000, timestamp=1790901830
- 29. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=34, line=3, linePaymentNumber=3, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 47. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 48. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=15, level=3, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 49. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 50. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=15, level=3, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=34, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 54. levelManager.SystemChargeDistributedDetailed: activationId=15, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 55. levelManager.ActivationFinancialSummaryRecorded: activationId=15, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=20000000, totalEscrowLocked=16000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 56. levelManager.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=40000000
- 57. levelManager.LevelActivatedInOrbit: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 58. registration.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, price=40000000

## 16. MEMBER_04 registers under BOB_ORBIT_OWNER

Transaction: `0xde1e723c0297bbb529250e4f11208871584d6c6e7c98aa87d0592076c190dd60`
Block: 91

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, position=4, amount=10000000, timestamp=1790901833
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=1
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, orbitType=4, sourcePosition=4, sourceCycle=1, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=16
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, cycleNumber=1, activationId=16, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=2, linePaymentNumber=2
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, amount=9000000, timestamp=1790901833
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=16, level=1, receiptType=4, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.RecycleCompletedDetailed: activationId=16, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), sourcePosition=4, sourceCycle=1, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=1, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=16, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=16, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, price=10000000

## 17. MEMBER_04 activates Level 2

Transaction: `0x5085a41e41cea446aec509088a361e74b23fd98bac21f82f01ca2f7afa017525`
Block: 92

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, position=4, amount=20000000, timestamp=1790901834
- 6. p12.SpilloverPaid: from=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=17, level=2, receiptType=2, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=1, cycleNumber=1, activationId=17, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, position=1, amount=8000000, timestamp=1790901834
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=17, level=2, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=17, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=17, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, price=20000000

## 18. MEMBER_04 activates Level 3

Transaction: `0xbdef0665066b4ef2a0d13cc44df044408ff2cb161145cfaceee801c28d00df19`
Block: 93

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_04: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +28.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=4, cycleNumber=1, activationId=18, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=4, linePaymentNumber=1
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=4, line=2, linePaymentNumber=1, toOwner=0, toSpillover1=8000000, toSpillover2=20000000, toEscrow=8000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=4, amount=40000000, timestamp=1790901835
- 7. p39.SpilloverPaid: from=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=18, level=3, receiptType=2, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, orbitType=39, sourcePosition=4, sourceCycle=1, expectedAmount=8000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=18
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=16000000, currentEscrowLockedGlobal=40000000
- 17. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=1, cycleNumber=1, activationId=18, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=1, position=1, linePaymentNumber=1
- 19. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=1, amount=8000000, timestamp=1790901835
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=13, cycleNumber=1, activationId=18, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=13, linePaymentNumber=1
- 24. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=13, amount=20000000, timestamp=1790901835
- 25. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=13, line=3, linePaymentNumber=1, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=20000000, toRecycle=0
- 29. escrow.EscrowLocked: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), fromLevel=3, toLevel=4, amount=20000000, newLockedTotal=44000000, currentEscrowLockedGlobal=60000000
- 31. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 32. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=18, level=3, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 34. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=18, level=3, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=13, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 38. levelManager.SystemChargeDistributedDetailed: activationId=18, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 39. levelManager.ActivationFinancialSummaryRecorded: activationId=18, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=8000000, totalEscrowLocked=28000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 40. levelManager.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, amount=40000000
- 41. levelManager.LevelActivatedInOrbit: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 42. registration.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, price=40000000

## 19. MEMBER_05 registers under BOB_ORBIT_OWNER

Transaction: `0x1341ea538c765859c2cf5fa609fb1f7a09d3299cb2ecac7b238b86aff128f9b0`
Block: 96

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, position=1, amount=10000000, timestamp=1790901838
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=19, level=1, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=19, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=19, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, price=10000000

## 20. MEMBER_05 activates Level 2

Transaction: `0x561322a3565edeccd88dbeead99f53bcdfbb728c92baf7304ff70f8e435e945c`
Block: 97

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, position=5, amount=20000000, timestamp=1790901839
- 6. p12.SpilloverPaid: from=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=20, level=2, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=1, cycleNumber=1, activationId=20, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, position=1, amount=8000000, timestamp=1790901839
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=20, level=2, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=20, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=20, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, price=20000000

## 21. MEMBER_05 activates Level 3

Transaction: `0xc391904b8d6c93197dfc75c61b7fec9e745f142631b745f747349a81092dd6b3`
Block: 98

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_05: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +28.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=5, cycleNumber=1, activationId=21, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=5, linePaymentNumber=2
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=5, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=8000000, toSpillover2=20000000, toEscrow=8000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=5, amount=40000000, timestamp=1790901840
- 7. p39.SpilloverPaid: from=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=21, level=3, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, orbitType=39, sourcePosition=5, sourceCycle=1, expectedAmount=8000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=21
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=24000000, currentEscrowLockedGlobal=68000000
- 17. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=1, cycleNumber=1, activationId=21, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=1, position=1, linePaymentNumber=1
- 19. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=1, amount=8000000, timestamp=1790901840
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=16, cycleNumber=1, activationId=21, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=16, linePaymentNumber=2
- 24. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=16, amount=20000000, timestamp=1790901840
- 25. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=16, line=3, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=20000000, toRecycle=0
- 29. escrow.EscrowLocked: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), fromLevel=3, toLevel=4, amount=20000000, newLockedTotal=64000000, currentEscrowLockedGlobal=88000000
- 31. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 32. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=21, level=3, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 34. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=21, level=3, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=1, mirroredPosition=16, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 38. levelManager.SystemChargeDistributedDetailed: activationId=21, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 39. levelManager.ActivationFinancialSummaryRecorded: activationId=21, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=8000000, totalEscrowLocked=28000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 40. levelManager.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, amount=40000000
- 41. levelManager.LevelActivatedInOrbit: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 42. registration.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, price=40000000

## 22. MEMBER_06 registers under BOB_ORBIT_OWNER

Transaction: `0x1475a377e507f126edeebf7e24ea97443bacd061727f42a413bc2487718bf397`
Block: 101

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, position=2, amount=10000000, timestamp=1790901843
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=22, level=1, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=22, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=22, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, price=10000000

## 23. MEMBER_06 activates Level 2

Transaction: `0x9f2101673941cfd58e6f4b9229f11cc847e8bb98e5f2d619cd7c54b05cb098fa`
Block: 102

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, position=6, amount=20000000, timestamp=1790901844
- 6. p12.SpilloverPaid: from=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=23, level=2, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=1, cycleNumber=1, activationId=23, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, position=1, amount=8000000, timestamp=1790901844
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=23, level=2, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=23, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=23, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, price=20000000

## 24. MEMBER_06 activates Level 3

Transaction: `0xd3cc134a92dac0b4ce10defc0b20c6214e77a508b6cc022e2df2ddf31302b0c3`
Block: 103

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_06: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=6, cycleNumber=1, activationId=24, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=6, linePaymentNumber=3
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=6, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=8000000, toSpillover2=20000000, toEscrow=8000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=6, amount=40000000, timestamp=1790901845
- 7. p39.SpilloverPaid: from=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=24, level=3, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, orbitType=39, sourcePosition=6, sourceCycle=1, expectedAmount=8000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=24
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=32000000, currentEscrowLockedGlobal=96000000
- 17. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=1, cycleNumber=1, activationId=24, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=1, position=1, linePaymentNumber=1
- 19. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=1, amount=8000000, timestamp=1790901845
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=19, cycleNumber=1, activationId=24, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=19, linePaymentNumber=3
- 23. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=19, amount=20000000, timestamp=1790901845
- 24. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=19, line=3, linePaymentNumber=3, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 27. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=24, level=3, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 30. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=24, level=3, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=1, mirroredPosition=19, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 34. levelManager.SystemChargeDistributedDetailed: activationId=24, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 35. levelManager.ActivationFinancialSummaryRecorded: activationId=24, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 36. levelManager.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, amount=40000000
- 37. levelManager.LevelActivatedInOrbit: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 38. registration.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, price=40000000

## 25. MEMBER_07 registers under BOB_ORBIT_OWNER

Transaction: `0xf6b1151a2496c320c4ecde556c1aada4b4e41a2959a39ea326e26c25e6fe8c65`
Block: 106

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, position=3, amount=10000000, timestamp=1790901848
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=25, level=1, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=25, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=25, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, price=10000000

## 26. MEMBER_07 activates Level 2

Transaction: `0x046b35db5829a05149f479aeee53575579e39c99eac43b59f790ad15b1dc5dd9`
Block: 107

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, position=7, amount=20000000, timestamp=1790901849
- 6. p12.SpilloverPaid: from=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=26, level=2, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=2, cycleNumber=1, activationId=26, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, position=2, amount=8000000, timestamp=1790901849
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=26, level=2, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=26, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=26, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, price=20000000

## 27. MEMBER_07 activates Level 3

Transaction: `0x588e811993a53402af15933fa6986757017e17e5b009c8e5e616d1d4d349e886`
Block: 108

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_07: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=7, cycleNumber=1, activationId=27, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=7, linePaymentNumber=4
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=7, line=2, linePaymentNumber=4, toOwner=0, toSpillover1=8000000, toSpillover2=20000000, toEscrow=8000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=7, amount=40000000, timestamp=1790901850
- 7. p39.SpilloverPaid: from=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=27, level=3, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, orbitType=39, sourcePosition=7, sourceCycle=1, expectedAmount=8000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=27
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=40000000, currentEscrowLockedGlobal=104000000
- 17. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=2, cycleNumber=1, activationId=27, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=1, position=2, linePaymentNumber=2
- 19. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=2, amount=8000000, timestamp=1790901850
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=22, cycleNumber=1, activationId=27, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=22, linePaymentNumber=4
- 23. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=22, amount=20000000, timestamp=1790901850
- 24. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=22, line=3, linePaymentNumber=4, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 27. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=27, level=3, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 30. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=27, level=3, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=1, mirroredPosition=22, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 34. levelManager.SystemChargeDistributedDetailed: activationId=27, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 35. levelManager.ActivationFinancialSummaryRecorded: activationId=27, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 36. levelManager.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, amount=40000000
- 37. levelManager.LevelActivatedInOrbit: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 38. registration.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, price=40000000

## 28. MEMBER_08 registers under BOB_ORBIT_OWNER

Transaction: `0x23a78aa61fce388926cd3f07e2d76232d57ddbaded2b5dc9d63fde25e29c91d8`
Block: 111

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, position=4, amount=10000000, timestamp=1790901853
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=2
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, orbitType=4, sourcePosition=4, sourceCycle=2, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=28
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=3, cycleNumber=1, activationId=28, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=3, linePaymentNumber=3
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, amount=9000000, timestamp=1790901853
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=28, level=1, receiptType=4, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.RecycleCompletedDetailed: activationId=28, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), sourcePosition=4, sourceCycle=2, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=3, mirrorCycle=1, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=28, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=28, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, price=10000000

## 29. MEMBER_08 activates Level 2

Transaction: `0x7cbe2b14e5bc374f54d2e7c9448e0f84d76af23d0967f01874e42ea4392afc76`
Block: 112

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, position=8, amount=20000000, timestamp=1790901854
- 6. p12.SpilloverPaid: from=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=29, level=2, receiptType=2, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=2, cycleNumber=1, activationId=29, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, position=2, amount=8000000, timestamp=1790901854
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=29, level=2, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=29, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=29, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, price=20000000

## 30. MEMBER_08 activates Level 3

Transaction: `0x9b704ff2c859a7bdcfbdf4394891c11fe5f4c399caae007dc04870d28fc1131f`
Block: 113

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=8, amount=40000000, timestamp=1790901855
- 6. p39.SpilloverPaid: from=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=30, level=3, receiptType=2, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=2, cycleNumber=1, activationId=30, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=2, amount=8000000, timestamp=1790901855
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=25, cycleNumber=1, activationId=30, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=25, linePaymentNumber=5
- 18. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=25, amount=20000000, timestamp=1790901855
- 19. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=25, line=3, linePaymentNumber=5, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=30, level=3, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=30, level=3, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=1, mirroredPosition=25, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=30, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=30, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, price=40000000

## 31. MEMBER_09 registers under BOB_ORBIT_OWNER

Transaction: `0x94f6060d0a83a9c0d2c79e9dbbf866fbf48df7d4610876875169bd4d44b18ecc`
Block: 116

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, position=1, amount=10000000, timestamp=1790901858
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=31, level=1, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=31, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=31, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, price=10000000

## 32. MEMBER_09 activates Level 2

Transaction: `0xf4cfb065b34ffe155249ec7c0e5a2d9f89726f48502301aaede3ad4274e2ac3e`
Block: 117

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, position=9, amount=20000000, timestamp=1790901859
- 6. p12.SpilloverPaid: from=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=32, level=2, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=2, cycleNumber=1, activationId=32, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, position=2, amount=8000000, timestamp=1790901859
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=32, level=2, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=32, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=32, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, price=20000000

## 33. MEMBER_09 activates Level 3

Transaction: `0x1743dcd38cbd6b6c89878254bc1140fbb4571b71f991b7f696cc330d4a8d1241`
Block: 118

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=9, amount=40000000, timestamp=1790901860
- 6. p39.SpilloverPaid: from=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=33, level=3, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=2, cycleNumber=1, activationId=33, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=2, amount=8000000, timestamp=1790901860
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=28, cycleNumber=1, activationId=33, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=28, linePaymentNumber=6
- 18. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=28, amount=20000000, timestamp=1790901860
- 19. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=28, line=3, linePaymentNumber=6, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=33, level=3, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=33, level=3, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=1, mirroredPosition=28, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=33, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=33, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, price=40000000

## 34. MEMBER_10 registers under BOB_ORBIT_OWNER

Transaction: `0xb8a87d74c419a06d696776cd841fe06481f956450d24f439383a74acd356e6da`
Block: 121

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, position=2, amount=10000000, timestamp=1790901863
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=34, level=1, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=34, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=34, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, price=10000000

## 35. MEMBER_10 activates Level 2

Transaction: `0x5168d208cdca404c09e966ce96152ae45f27dc1ca9309d2e0ec97bf674b60aae`
Block: 122

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, position=10, amount=20000000, timestamp=1790901864
- 6. p12.SpilloverPaid: from=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=35, level=2, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=3, cycleNumber=1, activationId=35, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, position=3, amount=8000000, timestamp=1790901864
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=35, level=2, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=35, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=35, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, price=20000000

## 36. MEMBER_10 activates Level 3

Transaction: `0xdc30c05d1920749d41373f7b612dfda23a3f79d83b511f3ad2be56d2cab6d118`
Block: 123

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_10: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=10, cycleNumber=1, activationId=36, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=10, linePaymentNumber=7
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=10, line=2, linePaymentNumber=7, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=10, amount=40000000, timestamp=1790901865
- 6. p39.SpilloverPaid: from=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=36, level=3, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=3, cycleNumber=1, activationId=36, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=3, amount=8000000, timestamp=1790901865
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=112000000
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=31, cycleNumber=1, activationId=36, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=31, linePaymentNumber=7
- 23. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=31, amount=20000000, timestamp=1790901865
- 24. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=31, line=3, linePaymentNumber=7, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=36, level=3, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=36, level=3, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=1, mirroredPosition=31, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=36, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=36, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, price=40000000

## 37. MEMBER_11 registers under BOB_ORBIT_OWNER

Transaction: `0x07c35169375cc3ba2bea50b93e41e1a4a22105572447ed56cf91d58421716da8`
Block: 126

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, position=3, amount=10000000, timestamp=1790901868
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=37, level=1, receiptType=2, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=37, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=37, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, price=10000000

## 38. MEMBER_11 activates Level 2

Transaction: `0x4d8fc6e6d6d72c88f63e48d3cf0a5910641d480a6a233c8feca45658d06c1b84`
Block: 127

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_11: -20.0 USDT
- 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853: +10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, cycleNumber=1, activationId=38, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=11, linePaymentNumber=8
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, line=2, linePaymentNumber=8, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, position=11, amount=20000000, timestamp=1790901869
- 6. p12.SpilloverPaid: from=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, amount=8000000
- 8. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, orbitType=12, sourcePosition=11, sourceCycle=1, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=38
- 10. p12.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=3, cycleNumber=1, activationId=38, isMirror=true
- 11. p12.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, line=1, position=3, linePaymentNumber=3
- 12. p12.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, position=3, amount=8000000, timestamp=1790901869
- 13. p12.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 15. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 16. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=38, level=2, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=38, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=38, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=8000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, price=20000000

## 39. MEMBER_11 activates Level 3

Transaction: `0x006c37ba868581a4e444c6523988468c0c1664a51958cdae737f5fa5bb5d304c`
Block: 128

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_11: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=11, cycleNumber=1, activationId=39, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=11, linePaymentNumber=8
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=11, line=2, linePaymentNumber=8, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=11, amount=40000000, timestamp=1790901870
- 6. p39.SpilloverPaid: from=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=39, level=3, receiptType=2, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=3, cycleNumber=1, activationId=39, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=3, amount=8000000, timestamp=1790901870
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=120000000
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=34, cycleNumber=1, activationId=39, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=34, linePaymentNumber=8
- 23. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=34, amount=20000000, timestamp=1790901870
- 24. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=34, line=3, linePaymentNumber=8, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=39, level=3, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=39, level=3, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=1, mirroredPosition=34, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=39, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=39, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, price=40000000

## 40. MEMBER_12 registers under BOB_ORBIT_OWNER

Transaction: `0xc3061f2a49ada7afcba2d13c7abda754be01d6e7b1a1a3579138f72fa9858bce`
Block: 131

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, position=4, amount=10000000, timestamp=1790901873
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=3
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, orbitType=4, sourcePosition=4, sourceCycle=3, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=40
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=4, cycleNumber=1, activationId=40, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=4, linePaymentNumber=4
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, amount=9000000, timestamp=1790901873
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=4, line=1, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=9000000
- 15. p4.OrbitReset: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, cycleNumber=1
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=0
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=40, level=1, receiptType=4, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=3, mirroredPosition=4, mirroredCycle=1, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=0
- 18. levelManager.RecycleCompletedDetailed: activationId=40, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), sourcePosition=4, sourceCycle=3, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=0, recycleEscrowLocked=0, mirrorPosition=4, mirrorCycle=1, triggeredOrbitReset=false
- 19. p4.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, position=2, cycleNumber=1, activationId=40, isMirror=true
- 20. p4.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, line=1, position=2, linePaymentNumber=2
- 21. p4.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, amount=9000000, timestamp=1790901873
- 22. p4.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 40. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 41. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=40, level=1, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=4, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 42. levelManager.RecycleCompletedDetailed: activationId=40, orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, sourceUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=4, sourceCycle=1, recycleReceiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=1, triggeredOrbitReset=false
- 47. levelManager.SystemChargeDistributedDetailed: activationId=40, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 48. levelManager.ActivationFinancialSummaryRecorded: activationId=40, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 49. levelManager.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, amount=10000000
- 50. levelManager.LevelActivatedInOrbit: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 51. registration.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, price=10000000

## 41. MEMBER_12 activates Level 2

Transaction: `0x60efb91afd5fe424dd6a0f23fcd6ed22f900ab94ab146d9e6649877722c98450`
Block: 132

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
- 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853: -10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, cycleNumber=1, activationId=41, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=12, linePaymentNumber=9
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, line=2, linePaymentNumber=9, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, position=12, amount=20000000, timestamp=1790901874
- 6. p12.SpilloverPaid: from=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, amount=8000000
- 7. p12.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, cycleNumber=1
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, orbitType=12, sourcePosition=12, sourceCycle=1, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=41
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=3, cycleNumber=1, activationId=41, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, position=3, amount=8000000, timestamp=1790901874
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=41, level=2, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=41, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=2, cycleNumber=1, activationId=41, isMirror=true
- 23. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=1, position=2, linePaymentNumber=2
- 24. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 25. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=2, amount=20000000, timestamp=1790901874
- 26. p12.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 28. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=41, level=2, receiptType=4, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 30. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=7, cycleNumber=1, activationId=41, isMirror=true
- 31. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=2, position=7, linePaymentNumber=2
- 32. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=7, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 33. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=7, amount=10000000, timestamp=1790901874
- 51. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 52. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=41, level=2, receiptType=4, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=4, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 53. levelManager.RecycleCompletedDetailed: activationId=41, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), sourcePosition=12, sourceCycle=1, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=20000000, recycleLiquidPaid=18000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=1, triggeredOrbitReset=false
- 58. levelManager.SystemChargeDistributedDetailed: activationId=41, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 59. levelManager.ActivationFinancialSummaryRecorded: activationId=41, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=26000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 60. levelManager.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, amount=20000000
- 61. levelManager.LevelActivatedInOrbit: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 62. registration.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, price=20000000

## 42. MEMBER_12 activates Level 3

Transaction: `0xe9fa1fae1103e128b9e01baaa1cfb73d4e1e03e049e130744e2549ec3b97cab2`
Block: 133

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_12: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=12, cycleNumber=1, activationId=42, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=12, linePaymentNumber=9
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=12, line=2, linePaymentNumber=9, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=12, amount=40000000, timestamp=1790901875
- 6. p39.SpilloverPaid: from=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=42, level=3, receiptType=2, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=3, cycleNumber=1, activationId=42, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=3, amount=8000000, timestamp=1790901875
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=128000000
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=37, cycleNumber=1, activationId=42, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=37, linePaymentNumber=9
- 23. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=37, amount=20000000, timestamp=1790901875
- 24. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=37, line=3, linePaymentNumber=9, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=42, level=3, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=42, level=3, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=37, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=42, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=42, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, price=40000000

## 43. MEMBER_13 registers under BOB_ORBIT_OWNER

Transaction: `0x5f8af0169d766564d17271f14b2729e091dbdafb118073367bc673ad062c3e0b`
Block: 136

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, position=1, amount=10000000, timestamp=1790901878
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=43, level=1, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=43, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=43, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, price=10000000

## 44. MEMBER_13 activates Level 2

Transaction: `0x246f7c1dc1cb03e6996fad7105c9a108c1ba21b8289f32bffbbd326648c4ec90`
Block: 137

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=1, amount=20000000, timestamp=1790901879
- 6. p12.SpilloverPaid: from=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=44, level=2, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=5, cycleNumber=1, activationId=44, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=5, linePaymentNumber=4
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=5, amount=10000000, timestamp=1790901879
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=5, line=2, linePaymentNumber=4, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=44, level=2, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=2, mirroredPosition=5, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=44, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=44, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, price=20000000

## 45. MEMBER_13 activates Level 3

Transaction: `0x7799e84c268b3c91c7e68ae1a1f295e43b2db35eda2fb8d1c5eed69c5b7d09c7`
Block: 138

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- MEMBER_04: +8.0 USDT
- MEMBER_13: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +28.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=13, cycleNumber=1, activationId=45, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=13, linePaymentNumber=1
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=13, line=3, linePaymentNumber=1, toOwner=0, toSpillover1=8000000, toSpillover2=8000000, toEscrow=20000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, position=13, amount=40000000, timestamp=1790901880
- 7. p39.SpilloverPaid: from=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), to=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=45, level=3, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=13, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, orbitType=39, sourcePosition=13, sourceCycle=1, expectedAmount=20000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=45
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=20000000, newLockedTotal=60000000, currentEscrowLockedGlobal=148000000
- 17. p39.PositionActivationLinked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=1, cycleNumber=1, activationId=45, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, line=1, position=1, linePaymentNumber=1
- 19. p39.PositionFilled: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, position=1, amount=8000000, timestamp=1790901880
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=4, cycleNumber=1, activationId=45, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=4, linePaymentNumber=1
- 24. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, position=4, amount=8000000, timestamp=1790901880
- 25. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=4, line=2, linePaymentNumber=1, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 29. escrow.EscrowLocked: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=16000000, currentEscrowLockedGlobal=156000000
- 31. levelManager.PayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 32. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), activationId=45, level=3, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=13, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 34. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=45, level=3, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=13, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 38. levelManager.SystemChargeDistributedDetailed: activationId=45, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 39. levelManager.ActivationFinancialSummaryRecorded: activationId=45, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=8000000, totalEscrowLocked=28000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 40. levelManager.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, amount=40000000
- 41. levelManager.LevelActivatedInOrbit: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 42. registration.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, price=40000000

## 46. MEMBER_14 registers under BOB_ORBIT_OWNER

Transaction: `0x0dd6a43f5725c0802cebd93f4448f85aa3df8b0753a1a207321b6302fbb0cf66`
Block: 141

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, position=2, amount=10000000, timestamp=1790901883
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=46, level=1, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=46, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=46, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, price=10000000

## 47. MEMBER_14 activates Level 2

Transaction: `0x69ca18e04a9a0a0f0a19279cc2cb0b019b12e677cd6486cd8d3ee0378c8c5126`
Block: 142

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=2, amount=20000000, timestamp=1790901884
- 6. p12.SpilloverPaid: from=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=47, level=2, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=8, cycleNumber=1, activationId=47, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=8, linePaymentNumber=5
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=8, amount=10000000, timestamp=1790901884
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=8, line=2, linePaymentNumber=5, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=47, level=2, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=2, mirroredPosition=8, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=47, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=47, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, price=20000000

## 48. MEMBER_14 activates Level 3

Transaction: `0xb944567c86d93c8edddd7c7814c7eb87089e4b3638185c167e6329bcdf4144fc`
Block: 143

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
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: -52.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=14, cycleNumber=1, activationId=48, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=14, linePaymentNumber=2
- 5. p39.AutoUpgradeTriggered: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=80000000
- 6. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=14, line=3, linePaymentNumber=2, toOwner=0, toSpillover1=8000000, toSpillover2=8000000, toEscrow=20000000, toRecycle=0
- 7. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, position=14, amount=40000000, timestamp=1790901885
- 8. p39.SpilloverPaid: from=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), to=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, amount=8000000
- 9. p39.SpilloverPaid: from=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 11. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 12. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=48, level=3, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=14, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 13. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, orbitType=39, sourcePosition=14, sourceCycle=1, expectedAmount=20000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=48
- 17. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=20000000, newLockedTotal=80000000, currentEscrowLockedGlobal=176000000
- 18. p39.PositionActivationLinked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=1, cycleNumber=1, activationId=48, isMirror=true
- 19. p39.LinePaymentTracked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, line=1, position=1, linePaymentNumber=1
- 20. p39.PositionFilled: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, position=1, amount=8000000, timestamp=1790901885
- 21. p39.PaymentRuleApplied: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=4, cycleNumber=1, activationId=48, isMirror=true
- 23. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=4, linePaymentNumber=1
- 25. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, position=4, amount=8000000, timestamp=1790901885
- 26. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=4, line=2, linePaymentNumber=1, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 30. escrow.EscrowLocked: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=16000000, currentEscrowLockedGlobal=184000000
- 32. levelManager.PayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), activationId=48, level=3, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=14, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 34. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 35. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=48, level=3, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=14, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 39. levelManager.SystemChargeDistributedDetailed: activationId=48, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 40. levelManager.ActivationFinancialSummaryRecorded: activationId=48, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=8000000, totalEscrowLocked=28000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 41. levelManager.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, amount=40000000
- 42. levelManager.LevelActivatedInOrbit: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 45. escrow.EscrowUsedForUpgrade: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=80000000, recipient=0xa513E6E4b8f2a923D98304ec87F64353C4D5C853, currentEscrowLockedGlobal=104000000
- 47. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=80000000, actualReceiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), actualAmount=80000000, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x4944315f46414c4c4241434b0000000000000000000000000000000000000000, actionCode=0x41435449564154455f4c4556454c000000000000000000000000000000000000, activationId=49
- 65. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=4, receiptType=1, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), grossAmount=72000000, escrowLocked=0, liquidPaid=72000000
- 66. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=49, level=4, receiptType=1, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), sourcePosition=0, sourceCycle=0, mirroredPosition=0, mirroredCycle=0, routedRole=5, grossAmount=72000000, escrowLocked=0, liquidPaid=72000000
- 70. levelManager.SystemChargeDistributedDetailed: activationId=49, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, systemChargeTotal=8000000, nftPoolAmount=6400000, operationsAmount=1600000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 71. levelManager.ActivationFinancialSummaryRecorded: activationId=49, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, activationAmount=80000000, systemCharge=8000000, nftPoolAmount=6400000, operationsAmount=1600000, totalLiquidPaid=72000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=true, isFounderRepFreeActivation=false
- 72. levelManager.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, amount=80000000
- 73. levelManager.LevelActivatedInOrbit: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=80000000
- 74. registration.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, price=80000000
- 75. registration.AutoUpgradeTriggered: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4
- 76. levelManager.AutoUpgradeTriggered: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4
- 77. levelManager.AutoUpgradeCompleted: activationId=49, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, requiredAmount=80000000, usedAmount=80000000, escrowBefore=80000000, escrowAfter=0
- 78. registration.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, price=40000000

## 49. MEMBER_15 registers under BOB_ORBIT_OWNER

Transaction: `0x7b8eb2d3cabfffae633ababf61f9266963465ae197f05b47095c7fac235d3b3f`
Block: 146

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, position=3, amount=10000000, timestamp=1790901888
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=50, level=1, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=50, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=50, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, price=10000000

## 50. MEMBER_15 activates Level 2

Transaction: `0x5a7e54cca3a7e6675e8ed4c2aa1c8d59e76dc0497a6ba052b87d217bddc6bcce`
Block: 147

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=3, amount=20000000, timestamp=1790901889
- 6. p12.SpilloverPaid: from=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=51, level=2, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=11, cycleNumber=1, activationId=51, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=11, linePaymentNumber=6
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=11, amount=10000000, timestamp=1790901889
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=11, line=2, linePaymentNumber=6, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=51, level=2, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=2, mirroredPosition=11, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=51, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=51, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, price=20000000

## 51. MEMBER_15 activates Level 3

Transaction: `0xd64ade7071a173d9e72d33084a83efa0274b76fa8e84defaef862e992da67ad3`
Block: 148

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_06: +8.0 USDT
- MEMBER_15: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=15, cycleNumber=1, activationId=52, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=15, linePaymentNumber=3
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=15, line=3, linePaymentNumber=3, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, position=15, amount=40000000, timestamp=1790901890
- 6. p39.SpilloverPaid: from=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), to=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=52, level=3, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=15, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=1, cycleNumber=1, activationId=52, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, position=1, amount=8000000, timestamp=1790901890
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=4, cycleNumber=1, activationId=52, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=4, linePaymentNumber=1
- 19. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, position=4, amount=8000000, timestamp=1790901890
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=4, line=2, linePaymentNumber=1, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=16000000, currentEscrowLockedGlobal=112000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), activationId=52, level=3, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=15, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=52, level=3, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=15, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=52, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=52, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, price=40000000

## 52. MEMBER_16 registers under BOB_ORBIT_OWNER

Transaction: `0x120b66510a36a61641b8ae3d99354f3f4c704cadd7dc6f685c92e9a8fb7c050d`
Block: 151

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, position=4, amount=10000000, timestamp=1790901893
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=4
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, orbitType=4, sourcePosition=4, sourceCycle=4, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=53
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, cycleNumber=2, activationId=53, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=1, linePaymentNumber=1
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, amount=9000000, timestamp=1790901893
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=53, level=1, receiptType=4, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=4, mirroredPosition=1, mirroredCycle=2, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.RecycleCompletedDetailed: activationId=53, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), sourcePosition=4, sourceCycle=4, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=1, mirrorCycle=2, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=53, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=53, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, price=10000000

## 53. MEMBER_16 activates Level 2

Transaction: `0xd05db5eaef14f4f376f09422249f9f2c6f51331ae5a7ae7d9cd791c59dba0926`
Block: 152

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, position=4, amount=20000000, timestamp=1790901894
- 6. p12.SpilloverPaid: from=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), to=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=54, level=2, receiptType=2, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=1, cycleNumber=1, activationId=54, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, position=1, amount=8000000, timestamp=1790901894
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), activationId=54, level=2, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=2, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=54, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=54, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, price=20000000

## 54. MEMBER_16 activates Level 3

Transaction: `0xe9b3603248c09bb74cf708bed551533462f41c28a5f99eb9b83cabc9120d6e0a`
Block: 153

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_07: +8.0 USDT
- MEMBER_16: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=16, cycleNumber=1, activationId=55, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=16, linePaymentNumber=4
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=16, line=3, linePaymentNumber=4, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, position=16, amount=40000000, timestamp=1790901895
- 6. p39.SpilloverPaid: from=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), to=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=55, level=3, receiptType=2, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=16, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=1, cycleNumber=1, activationId=55, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, position=1, amount=8000000, timestamp=1790901895
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=5, cycleNumber=1, activationId=55, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=5, linePaymentNumber=2
- 19. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, position=5, amount=8000000, timestamp=1790901895
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=5, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=24000000, currentEscrowLockedGlobal=120000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), activationId=55, level=3, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=16, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=55, level=3, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=16, sourceCycle=1, mirroredPosition=5, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=55, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=55, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, price=40000000

## 55. MEMBER_17 registers under BOB_ORBIT_OWNER

Transaction: `0xd967a2c3c04e52c4dfdde0256c457c6207eae0b60b7f3e1a62ec2f9deeec9de3`
Block: 156

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, position=1, amount=10000000, timestamp=1790901898
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=56, level=1, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=5, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=56, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=56, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, price=10000000

## 56. MEMBER_17 activates Level 2

Transaction: `0xb473e1a9da5e227b974a29f3f5124b06a0e4d25db5ace79d3010948143dd66ee`
Block: 157

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, position=5, amount=20000000, timestamp=1790901899
- 6. p12.SpilloverPaid: from=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), to=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=57, level=2, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=1, cycleNumber=1, activationId=57, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, position=1, amount=8000000, timestamp=1790901899
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), activationId=57, level=2, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=2, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=57, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=57, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, price=20000000

## 57. MEMBER_17 activates Level 3

Transaction: `0x6dc8a2b751d2a801e47271793a4796a39344aa1277caf6e81e34446eb28fa63d`
Block: 158

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_08: +8.0 USDT
- MEMBER_17: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=17, cycleNumber=1, activationId=58, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=17, linePaymentNumber=5
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=17, line=3, linePaymentNumber=5, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, position=17, amount=40000000, timestamp=1790901900
- 6. p39.SpilloverPaid: from=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), to=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=58, level=3, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=17, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=1, cycleNumber=1, activationId=58, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, position=1, amount=8000000, timestamp=1790901900
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=5, cycleNumber=1, activationId=58, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=5, linePaymentNumber=2
- 19. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, position=5, amount=8000000, timestamp=1790901900
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=5, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=24000000, currentEscrowLockedGlobal=128000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), activationId=58, level=3, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=17, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=58, level=3, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=17, sourceCycle=1, mirroredPosition=5, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=58, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=58, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, price=40000000

## 58. MEMBER_18 registers under BOB_ORBIT_OWNER

Transaction: `0x182dcac5f80297bef385c2d89929a052e3fee3672320ab7628e90e7d56488af4`
Block: 161

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, position=2, amount=10000000, timestamp=1790901903
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=59, level=1, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=5, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=59, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=59, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, price=10000000

## 59. MEMBER_18 activates Level 2

Transaction: `0xcf17bba3ab60eb6badf71960d4d982ee74ad684742a27e7f8f722f7bfd8aa534`
Block: 162

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, position=6, amount=20000000, timestamp=1790901904
- 6. p12.SpilloverPaid: from=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), to=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=60, level=2, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=1, cycleNumber=1, activationId=60, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, position=1, amount=8000000, timestamp=1790901904
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), activationId=60, level=2, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=2, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=60, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=60, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, price=20000000

## 60. MEMBER_18 activates Level 3

Transaction: `0x3607b5581ca0c0c83d6e51597b56434353a35a61c74cfb5f8641497056862ce0`
Block: 163

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_09: +8.0 USDT
- MEMBER_18: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=18, cycleNumber=1, activationId=61, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=18, linePaymentNumber=6
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=18, line=3, linePaymentNumber=6, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, position=18, amount=40000000, timestamp=1790901905
- 6. p39.SpilloverPaid: from=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), to=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=61, level=3, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=18, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=1, cycleNumber=1, activationId=61, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, position=1, amount=8000000, timestamp=1790901905
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=5, cycleNumber=1, activationId=61, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=5, linePaymentNumber=2
- 19. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, position=5, amount=8000000, timestamp=1790901905
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=5, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=24000000, currentEscrowLockedGlobal=136000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), activationId=61, level=3, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=18, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=61, level=3, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=18, sourceCycle=1, mirroredPosition=5, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=61, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=61, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, price=40000000

## 61. MEMBER_19 registers under BOB_ORBIT_OWNER

Transaction: `0xadb84818c18444e1d1d70896e6f019ef623e7239547a22ab2b651c301e950368`
Block: 166

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, position=3, amount=10000000, timestamp=1790901908
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=62, level=1, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=5, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=62, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=62, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, price=10000000

## 62. MEMBER_19 activates Level 2

Transaction: `0x578c37fa8edbca2f704d752fe0a3f834d9ea5100ec6d0c120e25bf2dd73381b2`
Block: 167

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, position=7, amount=20000000, timestamp=1790901909
- 6. p12.SpilloverPaid: from=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), to=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=63, level=2, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=2, cycleNumber=1, activationId=63, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, position=2, amount=8000000, timestamp=1790901909
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), activationId=63, level=2, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=2, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=63, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=63, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, price=20000000

## 63. MEMBER_19 activates Level 3

Transaction: `0xbe8bbf30d32cc5c837f9ab7fca876ae2f3c3ca4f46739afe05f463a69bd3b4b0`
Block: 168

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_10: +8.0 USDT
- MEMBER_19: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=19, cycleNumber=1, activationId=64, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=19, linePaymentNumber=7
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=19, line=3, linePaymentNumber=7, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, position=19, amount=40000000, timestamp=1790901910
- 6. p39.SpilloverPaid: from=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), to=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=64, level=3, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=19, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=1, cycleNumber=1, activationId=64, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, position=1, amount=8000000, timestamp=1790901910
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=6, cycleNumber=1, activationId=64, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=6, linePaymentNumber=3
- 19. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, position=6, amount=8000000, timestamp=1790901910
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=6, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=32000000, currentEscrowLockedGlobal=144000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), activationId=64, level=3, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=19, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=64, level=3, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=19, sourceCycle=1, mirroredPosition=6, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=64, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=64, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, price=40000000

## 64. MEMBER_20 registers under BOB_ORBIT_OWNER

Transaction: `0x01c69afacd73ebe34f21ea6a4411835db959ad93d1ffc4c32bf2c774d22036b7`
Block: 171

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, position=4, amount=10000000, timestamp=1790901913
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=5
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, orbitType=4, sourcePosition=4, sourceCycle=5, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=65
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, cycleNumber=2, activationId=65, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=2, linePaymentNumber=2
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, amount=9000000, timestamp=1790901913
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=65, level=1, receiptType=4, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=5, mirroredPosition=2, mirroredCycle=2, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.RecycleCompletedDetailed: activationId=65, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), sourcePosition=4, sourceCycle=5, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=2, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=65, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=65, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, price=10000000

## 65. MEMBER_20 activates Level 2

Transaction: `0x4fde06401c906a00d6d7c6ade0bdac3dd5c9850d9f26c7c129b1bf2fe193b23d`
Block: 172

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, position=8, amount=20000000, timestamp=1790901914
- 6. p12.SpilloverPaid: from=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), to=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=66, level=2, receiptType=2, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=2, cycleNumber=1, activationId=66, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, position=2, amount=8000000, timestamp=1790901914
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), activationId=66, level=2, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=2, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=66, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=66, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, price=20000000

## 66. MEMBER_20 activates Level 3

Transaction: `0x192a53a80ef7bf78432c1beb80bc48133687adce3388efd82716772910a04ae6`
Block: 173

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_11: +8.0 USDT
- MEMBER_20: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=20, cycleNumber=1, activationId=67, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=20, linePaymentNumber=8
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=20, line=3, linePaymentNumber=8, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, position=20, amount=40000000, timestamp=1790901915
- 6. p39.SpilloverPaid: from=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), to=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=67, level=3, receiptType=2, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=20, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=1, cycleNumber=1, activationId=67, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, position=1, amount=8000000, timestamp=1790901915
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=6, cycleNumber=1, activationId=67, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=6, linePaymentNumber=3
- 19. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, position=6, amount=8000000, timestamp=1790901915
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=6, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=32000000, currentEscrowLockedGlobal=152000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), activationId=67, level=3, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=20, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=67, level=3, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=20, sourceCycle=1, mirroredPosition=6, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=67, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=67, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, price=40000000

## 67. MEMBER_21 registers under BOB_ORBIT_OWNER

Transaction: `0xe7cfde12d67a92d5a87d0e3f1a100a1b2517d00552ebf77ebd8fff542d91c3ad`
Block: 176

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, position=1, amount=10000000, timestamp=1790901918
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=68, level=1, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=6, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=68, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=68, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, price=10000000

## 68. MEMBER_21 activates Level 2

Transaction: `0xb870c9f0f348cb7bb8645cc93d3625573e62d11073237c8d31e020f1d25ad0de`
Block: 177

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, position=9, amount=20000000, timestamp=1790901919
- 6. p12.SpilloverPaid: from=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), to=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=69, level=2, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=2, cycleNumber=1, activationId=69, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, position=2, amount=8000000, timestamp=1790901919
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), activationId=69, level=2, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=2, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=69, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=69, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, price=20000000

## 69. MEMBER_21 activates Level 3

Transaction: `0xa3391c8d4b9c6960931826f06566b8501469f45ae4828715575a5034781e5ea3`
Block: 178

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_12: +8.0 USDT
- MEMBER_21: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=21, cycleNumber=1, activationId=70, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=21, linePaymentNumber=9
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=21, line=3, linePaymentNumber=9, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, position=21, amount=40000000, timestamp=1790901920
- 6. p39.SpilloverPaid: from=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), to=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=70, level=3, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=21, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=1, cycleNumber=1, activationId=70, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, position=1, amount=8000000, timestamp=1790901920
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=6, cycleNumber=1, activationId=70, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=6, linePaymentNumber=3
- 19. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, position=6, amount=8000000, timestamp=1790901920
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=6, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=32000000, currentEscrowLockedGlobal=160000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), activationId=70, level=3, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=21, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=70, level=3, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=21, sourceCycle=1, mirroredPosition=6, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=70, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=70, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, price=40000000

## 70. MEMBER_22 registers under BOB_ORBIT_OWNER

Transaction: `0x2d77e425199a04109dab1ad5d1d31a4f923530a95907255a478f6e4d2c3502f7`
Block: 181

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, position=2, amount=10000000, timestamp=1790901923
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=71, level=1, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=6, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=71, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=71, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, price=10000000

## 71. MEMBER_22 activates Level 2

Transaction: `0xf965891c085e32e687c70b00355355e3a3de33491475e09780c458ff31a18808`
Block: 182

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, position=10, amount=20000000, timestamp=1790901924
- 6. p12.SpilloverPaid: from=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), to=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=72, level=2, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=3, cycleNumber=1, activationId=72, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, position=3, amount=8000000, timestamp=1790901924
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), activationId=72, level=2, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=72, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=72, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, price=20000000

## 72. MEMBER_22 activates Level 3

Transaction: `0xcf3a10615ec11217d73ba64c0643e27994fe1b46b7a3cd2fe68e006ff4480d93`
Block: 183

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_04: +8.0 USDT
- MEMBER_22: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=22, cycleNumber=1, activationId=73, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=22, linePaymentNumber=10
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=22, line=3, linePaymentNumber=10, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, position=22, amount=40000000, timestamp=1790901925
- 6. p39.SpilloverPaid: from=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), to=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=73, level=3, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=22, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=2, cycleNumber=1, activationId=73, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, position=2, amount=8000000, timestamp=1790901925
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=7, cycleNumber=1, activationId=73, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=7, linePaymentNumber=4
- 19. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, position=7, amount=8000000, timestamp=1790901925
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=7, line=2, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=40000000, currentEscrowLockedGlobal=168000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), activationId=73, level=3, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=22, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=73, level=3, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=22, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=73, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=73, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, price=40000000

## 73. MEMBER_23 registers under BOB_ORBIT_OWNER

Transaction: `0x208e5435ff4407727a4a35c35a6632ab17b97aae57f5e32ff2603450e162570d`
Block: 186

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, position=3, amount=10000000, timestamp=1790901928
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=74, level=1, receiptType=2, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=6, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=74, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=74, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, price=10000000

## 74. MEMBER_23 activates Level 2

Transaction: `0xbca1394afb8069f7fdf619de686daa59a796e6318bbb596067e23e850d0071f5`
Block: 187

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- MEMBER_14: +8.0 USDT
- MEMBER_23: -20.0 USDT
- 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853: +10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, cycleNumber=2, activationId=75, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=11, linePaymentNumber=8
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, line=2, linePaymentNumber=8, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, position=11, amount=20000000, timestamp=1790901929
- 6. p12.SpilloverPaid: from=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), to=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, amount=8000000
- 8. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, orbitType=12, sourcePosition=11, sourceCycle=2, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=75
- 10. p12.PositionActivationLinked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=3, cycleNumber=1, activationId=75, isMirror=true
- 11. p12.LinePaymentTracked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, line=1, position=3, linePaymentNumber=3
- 12. p12.PositionFilled: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, position=3, amount=8000000, timestamp=1790901929
- 13. p12.PaymentRuleApplied: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 15. levelManager.PayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 16. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), activationId=75, level=2, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=75, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=75, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=8000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, price=20000000

## 75. MEMBER_23 activates Level 3

Transaction: `0x9e9cb18a3c69f822c340a033670737c0fc3b6dfd58517079e14ede27be97f8d6`
Block: 188

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_05: +8.0 USDT
- MEMBER_23: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=23, cycleNumber=1, activationId=76, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=23, linePaymentNumber=11
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=23, line=3, linePaymentNumber=11, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, position=23, amount=40000000, timestamp=1790901930
- 6. p39.SpilloverPaid: from=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), to=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=76, level=3, receiptType=2, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=23, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=2, cycleNumber=1, activationId=76, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, position=2, amount=8000000, timestamp=1790901930
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=7, cycleNumber=1, activationId=76, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=7, linePaymentNumber=4
- 19. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, position=7, amount=8000000, timestamp=1790901930
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=7, line=2, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=40000000, currentEscrowLockedGlobal=176000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), activationId=76, level=3, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=23, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=76, level=3, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=23, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=76, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=76, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, price=40000000

## 76. MEMBER_24 registers under BOB_ORBIT_OWNER

Transaction: `0x4c4cb046bd46789422488b77941a9c157b56f81917a8b16c9c69b5d1f2177a7d`
Block: 191

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, position=4, amount=10000000, timestamp=1790901933
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=6
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, orbitType=4, sourcePosition=4, sourceCycle=6, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=77
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=3, cycleNumber=2, activationId=77, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=3, linePaymentNumber=3
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, amount=9000000, timestamp=1790901933
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=77, level=1, receiptType=4, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=6, mirroredPosition=3, mirroredCycle=2, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.RecycleCompletedDetailed: activationId=77, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), sourcePosition=4, sourceCycle=6, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=3, mirrorCycle=2, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=77, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=77, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, price=10000000

## 77. MEMBER_24 activates Level 2

Transaction: `0xf9d5b61ffaf71c4f4fdbe169bc2a327b9e838e7de16f74f1ae892c00b6595295`
Block: 192

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
- 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853: -10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, cycleNumber=2, activationId=78, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=12, linePaymentNumber=9
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, line=2, linePaymentNumber=9, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, position=12, amount=20000000, timestamp=1790901934
- 6. p12.SpilloverPaid: from=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), to=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, amount=8000000
- 7. p12.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, cycleNumber=2
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, orbitType=12, sourcePosition=12, sourceCycle=2, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=78
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=3, cycleNumber=1, activationId=78, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, position=3, amount=8000000, timestamp=1790901934
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), activationId=78, level=2, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=78, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=3, cycleNumber=1, activationId=78, isMirror=true
- 23. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=1, position=3, linePaymentNumber=3
- 24. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 25. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=3, amount=20000000, timestamp=1790901934
- 26. p12.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 28. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=78, level=2, receiptType=4, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 30. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=10, cycleNumber=1, activationId=78, isMirror=true
- 31. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=2, position=10, linePaymentNumber=3
- 32. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=10, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 33. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=10, amount=10000000, timestamp=1790901934
- 51. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 52. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=78, level=2, receiptType=4, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=2, mirroredPosition=10, mirroredCycle=1, routedRole=4, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 53. levelManager.RecycleCompletedDetailed: activationId=78, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), sourcePosition=12, sourceCycle=2, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=20000000, recycleLiquidPaid=18000000, recycleEscrowLocked=0, mirrorPosition=3, mirrorCycle=1, triggeredOrbitReset=false
- 58. levelManager.SystemChargeDistributedDetailed: activationId=78, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 59. levelManager.ActivationFinancialSummaryRecorded: activationId=78, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=26000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 60. levelManager.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, amount=20000000
- 61. levelManager.LevelActivatedInOrbit: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 62. registration.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, price=20000000

## 78. MEMBER_24 activates Level 3

Transaction: `0x78cbfa0812a56aad8e57133531e20fdbea81fa854d58d4faef5a3513d9fcda77`
Block: 193

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_06: +8.0 USDT
- MEMBER_24: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=24, cycleNumber=1, activationId=79, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=24, linePaymentNumber=12
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=24, line=3, linePaymentNumber=12, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, position=24, amount=40000000, timestamp=1790901935
- 6. p39.SpilloverPaid: from=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), to=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=79, level=3, receiptType=2, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=24, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=2, cycleNumber=1, activationId=79, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, position=2, amount=8000000, timestamp=1790901935
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=7, cycleNumber=1, activationId=79, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=7, linePaymentNumber=4
- 19. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, position=7, amount=8000000, timestamp=1790901935
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=7, line=2, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=40000000, currentEscrowLockedGlobal=184000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), activationId=79, level=3, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=24, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=79, level=3, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=24, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=79, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=79, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, price=40000000

## 79. MEMBER_25 registers under BOB_ORBIT_OWNER

Transaction: `0x7798f814aa7a29b2743a8bd552c3d3c9457948de689b7a9a4992922e61669ccd`
Block: 196

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, position=1, amount=10000000, timestamp=1790901938
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=80, level=1, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=7, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=80, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=80, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, price=10000000

## 80. MEMBER_25 activates Level 2

Transaction: `0x8156547cf03ff70c51baff4fa8ede66df267c64a72e077b39c2d15ccb565e1e1`
Block: 197

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=1, amount=20000000, timestamp=1790901939
- 6. p12.SpilloverPaid: from=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=81, level=2, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=6, cycleNumber=1, activationId=81, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=6, linePaymentNumber=7
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=6, amount=10000000, timestamp=1790901939
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=6, line=2, linePaymentNumber=7, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=81, level=2, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=3, mirroredPosition=6, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=81, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=81, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, price=20000000

## 81. MEMBER_25 activates Level 3

Transaction: `0x51b994e4fa6ff0e44bff6f3b2aa65c13a8f0a7b38344ca0493f5c54f32a0b740`
Block: 198

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, position=25, amount=40000000, timestamp=1790901940
- 6. p39.SpilloverPaid: from=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), to=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=82, level=3, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=25, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=2, cycleNumber=1, activationId=82, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, position=2, amount=8000000, timestamp=1790901940
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=8, cycleNumber=1, activationId=82, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=8, linePaymentNumber=5
- 18. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, position=8, amount=8000000, timestamp=1790901940
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=8, line=2, linePaymentNumber=5, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), activationId=82, level=3, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=25, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=82, level=3, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=25, sourceCycle=1, mirroredPosition=8, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=82, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=82, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, price=40000000

## 82. MEMBER_26 registers under BOB_ORBIT_OWNER

Transaction: `0xbf2154fcc51d80a2fedfafba4d0d658a0425398644edfc6868314dd302976388`
Block: 201

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, position=2, amount=10000000, timestamp=1790901943
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=83, level=1, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=7, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=83, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=83, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, price=10000000

## 83. MEMBER_26 activates Level 2

Transaction: `0xdf3658e2b7f88982d328de91e673458e35af8f6ba8b7a066c5431c684b587743`
Block: 202

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_26: -20.0 USDT
- 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853: +10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=2, cycleNumber=3, activationId=84, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=2, linePaymentNumber=2
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=2, amount=20000000, timestamp=1790901944
- 6. p12.SpilloverPaid: from=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=84, level=2, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=9, cycleNumber=1, activationId=84, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=9, linePaymentNumber=8
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=9, amount=10000000, timestamp=1790901944
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=9, line=2, linePaymentNumber=8, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=0
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=84, level=2, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=3, mirroredPosition=9, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=0
- 21. levelManager.SystemChargeDistributedDetailed: activationId=84, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=84, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=8000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, price=20000000

## 84. MEMBER_26 activates Level 3

Transaction: `0x8d2f3f2c5c073ae349a0c513634c88d1f7e1093c861bee30035c7b40e0d4fe69`
Block: 203

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, position=26, amount=40000000, timestamp=1790901945
- 6. p39.SpilloverPaid: from=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), to=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=85, level=3, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=26, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=2, cycleNumber=1, activationId=85, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, position=2, amount=8000000, timestamp=1790901945
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=8, cycleNumber=1, activationId=85, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=8, linePaymentNumber=5
- 18. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, position=8, amount=8000000, timestamp=1790901945
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=8, line=2, linePaymentNumber=5, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), activationId=85, level=3, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=26, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=85, level=3, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=26, sourceCycle=1, mirroredPosition=8, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=85, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=85, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, price=40000000

## 85. MEMBER_27 registers under BOB_ORBIT_OWNER

Transaction: `0xdcee98c4f9b618e4863affac52c0cf608f18993e1b1ebb5dde4efc0c095ec913`
Block: 206

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, position=3, amount=10000000, timestamp=1790901948
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=86, level=1, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=7, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=86, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=86, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, price=10000000

## 86. MEMBER_27 activates Level 2

Transaction: `0xfec4d12da78f74a066b80f9e5a2a67726b6201e6ebffef79f158b0d7694b4653`
Block: 207

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
- 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853: -10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=3, cycleNumber=3, activationId=87, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=3, linePaymentNumber=3
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=3, amount=20000000, timestamp=1790901949
- 6. p12.SpilloverPaid: from=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=87, level=2, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=12, cycleNumber=1, activationId=87, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=12, linePaymentNumber=9
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=12, amount=10000000, timestamp=1790901949
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=12, line=2, linePaymentNumber=9, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 15. p12.OrbitReset: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, cycleNumber=1
- 19. levelManager.SystemChargeDistributedDetailed: activationId=87, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 20. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=2, cycleNumber=1, activationId=87, isMirror=true
- 21. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=1, position=2, linePaymentNumber=2
- 22. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 23. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=2, amount=20000000, timestamp=1790901949
- 24. p12.SpilloverPaid: from=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 42. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 43. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=87, level=2, receiptType=4, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=12, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 44. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=3, cycleNumber=1, activationId=87, isMirror=true
- 45. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=1, position=3, linePaymentNumber=3
- 46. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 47. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=3, amount=10000000, timestamp=1790901949
- 65. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 66. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=87, level=2, receiptType=4, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=12, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=4, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 67. levelManager.RecycleCompletedDetailed: activationId=87, orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, sourceUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), sourcePosition=12, sourceCycle=1, recycleReceiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), recycleGross=20000000, recycleLiquidPaid=18000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=1, triggeredOrbitReset=false
- 68. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=0
- 69. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=87, level=2, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=3, mirroredPosition=12, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=0
- 73. levelManager.SystemChargeDistributedDetailed: activationId=87, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 74. levelManager.ActivationFinancialSummaryRecorded: activationId=87, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=8000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 75. levelManager.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, amount=20000000
- 76. levelManager.LevelActivatedInOrbit: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 77. registration.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, price=20000000

## 87. MEMBER_27 activates Level 3

Transaction: `0xc22b4ac3f03184799aea30234baf1bbb4ec302ff1ada025f673eca26cb19946c`
Block: 208

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, position=27, amount=40000000, timestamp=1790901950
- 6. p39.SpilloverPaid: from=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), to=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=88, level=3, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=27, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=2, cycleNumber=1, activationId=88, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, position=2, amount=8000000, timestamp=1790901950
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=8, cycleNumber=1, activationId=88, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=8, linePaymentNumber=5
- 18. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, position=8, amount=8000000, timestamp=1790901950
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=8, line=2, linePaymentNumber=5, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), activationId=88, level=3, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=27, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=88, level=3, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=27, sourceCycle=1, mirroredPosition=8, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=88, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=88, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, price=40000000

## 88. MEMBER_28 registers under BOB_ORBIT_OWNER

Transaction: `0x4669f8dc36b28fcc12b2a6c3276d7fec53fc6d1a1ff74bd9056a4df4152ba457`
Block: 211

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, position=4, amount=10000000, timestamp=1790901953
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=7
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, orbitType=4, sourcePosition=4, sourceCycle=7, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=89
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=4, cycleNumber=2, activationId=89, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=4, linePaymentNumber=4
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, amount=9000000, timestamp=1790901953
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=4, line=1, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=9000000
- 15. p4.OrbitReset: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, cycleNumber=2
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=0
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=89, level=1, receiptType=4, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=7, mirroredPosition=4, mirroredCycle=2, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=0
- 18. levelManager.RecycleCompletedDetailed: activationId=89, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), sourcePosition=4, sourceCycle=7, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=0, recycleEscrowLocked=0, mirrorPosition=4, mirrorCycle=2, triggeredOrbitReset=false
- 19. p4.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, position=3, cycleNumber=1, activationId=89, isMirror=true
- 20. p4.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, line=1, position=3, linePaymentNumber=3
- 21. p4.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=3, amount=9000000, timestamp=1790901953
- 22. p4.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 40. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 41. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=89, level=1, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=4, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 42. levelManager.RecycleCompletedDetailed: activationId=89, orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, sourceUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=4, sourceCycle=2, recycleReceiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=3, mirrorCycle=1, triggeredOrbitReset=false
- 47. levelManager.SystemChargeDistributedDetailed: activationId=89, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 48. levelManager.ActivationFinancialSummaryRecorded: activationId=89, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 49. levelManager.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, amount=10000000
- 50. levelManager.LevelActivatedInOrbit: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 51. registration.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, price=10000000

## 89. MEMBER_28 activates Level 2

Transaction: `0xb6fa7d4f21995391906870e988dd0076b2529340b806833c04126c4be298e715`
Block: 212

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, position=4, amount=20000000, timestamp=1790901954
- 6. p12.SpilloverPaid: from=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), to=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=90, level=2, receiptType=2, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=1, cycleNumber=1, activationId=90, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, position=1, amount=8000000, timestamp=1790901954
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), activationId=90, level=2, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=3, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=90, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=90, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, price=20000000

## 90. MEMBER_28 activates Level 3

Transaction: `0xcde426e04a2a5aa49a94466e4013726603abb8099d4d87e0bada7425b580f888`
Block: 213

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, position=28, amount=40000000, timestamp=1790901955
- 6. p39.SpilloverPaid: from=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), to=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=91, level=3, receiptType=2, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=28, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=2, cycleNumber=1, activationId=91, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, position=2, amount=8000000, timestamp=1790901955
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=9, cycleNumber=1, activationId=91, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=9, linePaymentNumber=6
- 18. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, position=9, amount=8000000, timestamp=1790901955
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=9, line=2, linePaymentNumber=6, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), activationId=91, level=3, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=28, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=91, level=3, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=28, sourceCycle=1, mirroredPosition=9, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=91, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=91, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, price=40000000

## 91. MEMBER_29 registers under BOB_ORBIT_OWNER

Transaction: `0xdeb41f4fd5614c0479d2fe654ab21c1ff7966f8c4df472a1f9b786f78c291adc`
Block: 216

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, position=1, amount=10000000, timestamp=1790901958
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=92, level=1, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=8, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=92, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=92, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, price=10000000

## 92. MEMBER_29 activates Level 2

Transaction: `0x4972d1d2f848348d4f0aa85ce63f0d519b5f45053ab129fdca33334ff3da9cd6`
Block: 217

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, position=5, amount=20000000, timestamp=1790901959
- 6. p12.SpilloverPaid: from=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), to=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=93, level=2, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=1, cycleNumber=1, activationId=93, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, position=1, amount=8000000, timestamp=1790901959
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), activationId=93, level=2, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=3, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=93, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=93, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, price=20000000

## 93. MEMBER_29 activates Level 3

Transaction: `0xbfb6d8f55be13b694e55c68409cfe6210d26a7ac5eef83b083b5a6971c6161b5`
Block: 218

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, position=29, amount=40000000, timestamp=1790901960
- 6. p39.SpilloverPaid: from=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), to=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=94, level=3, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=29, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=2, cycleNumber=1, activationId=94, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, position=2, amount=8000000, timestamp=1790901960
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=9, cycleNumber=1, activationId=94, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=9, linePaymentNumber=6
- 18. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, position=9, amount=8000000, timestamp=1790901960
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=9, line=2, linePaymentNumber=6, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), activationId=94, level=3, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=29, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=94, level=3, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=29, sourceCycle=1, mirroredPosition=9, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=94, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=94, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, price=40000000

## 94. MEMBER_30 registers under BOB_ORBIT_OWNER

Transaction: `0x0334b63376cbe5ee40c7db2dccc25b1ce4331285eecfdb818286e97f6c7e1864`
Block: 221

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, position=2, amount=10000000, timestamp=1790901963
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=95, level=1, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=8, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=95, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=95, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, price=10000000

## 95. MEMBER_30 activates Level 2

Transaction: `0x34caea66f445933b069915f1bd2803f5cb81a1101281ed49533284fc97dd6c83`
Block: 222

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, position=6, amount=20000000, timestamp=1790901964
- 6. p12.SpilloverPaid: from=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), to=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=96, level=2, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=1, cycleNumber=1, activationId=96, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, position=1, amount=8000000, timestamp=1790901964
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), activationId=96, level=2, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=3, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=96, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=96, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, price=20000000

## 96. MEMBER_30 activates Level 3

Transaction: `0x552464b0b911e56699e2471e04f8e0f2bbf7480a55a46504af7e51f7a44aeb1e`
Block: 223

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, position=30, amount=40000000, timestamp=1790901965
- 6. p39.SpilloverPaid: from=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), to=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=97, level=3, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=30, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=2, cycleNumber=1, activationId=97, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, position=2, amount=8000000, timestamp=1790901965
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=9, cycleNumber=1, activationId=97, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=9, linePaymentNumber=6
- 18. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, position=9, amount=8000000, timestamp=1790901965
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=9, line=2, linePaymentNumber=6, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), activationId=97, level=3, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=30, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=97, level=3, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=30, sourceCycle=1, mirroredPosition=9, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=97, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=97, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, price=40000000

## 97. MEMBER_31 registers under BOB_ORBIT_OWNER

Transaction: `0x1281fb03e410af861178e39322ce6a8e410701566aa466217b456fb0babe42ce`
Block: 226

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, position=3, amount=10000000, timestamp=1790901968
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=98, level=1, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=8, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=98, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=98, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, price=10000000

## 98. MEMBER_31 activates Level 2

Transaction: `0x95280cc3434f0fe8313f6380618e39fb8b6e38c41496e57562f0fe7723a73d5d`
Block: 227

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, position=7, amount=20000000, timestamp=1790901969
- 6. p12.SpilloverPaid: from=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), to=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=99, level=2, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=2, cycleNumber=1, activationId=99, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, position=2, amount=8000000, timestamp=1790901969
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), activationId=99, level=2, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=3, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=99, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=99, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, price=20000000

## 99. MEMBER_31 activates Level 3

Transaction: `0x06165867820ba20e28596cb90677c1d04d9359930e88f9c88ec5f7e4fdcfa4c3`
Block: 228

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_31: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=31, cycleNumber=1, activationId=100, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=31, linePaymentNumber=19
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=31, line=3, linePaymentNumber=19, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, position=31, amount=40000000, timestamp=1790901970
- 6. p39.SpilloverPaid: from=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), to=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=100, level=3, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=31, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=3, cycleNumber=1, activationId=100, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, position=3, amount=8000000, timestamp=1790901970
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=192000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=10, cycleNumber=1, activationId=100, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=10, linePaymentNumber=7
- 23. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, position=10, amount=8000000, timestamp=1790901970
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=10, line=2, linePaymentNumber=7, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), activationId=100, level=3, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=31, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=100, level=3, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=31, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=100, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=100, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, price=40000000

## 100. MEMBER_32 registers under BOB_ORBIT_OWNER

Transaction: `0x47cd14a21c44c72ea44537bf252ea131fb2cf51788f874f0060dc8b5810e8047`
Block: 231

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, position=4, amount=10000000, timestamp=1790901973
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=8
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, orbitType=4, sourcePosition=4, sourceCycle=8, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=101
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, cycleNumber=3, activationId=101, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=1, linePaymentNumber=1
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, amount=9000000, timestamp=1790901973
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=101, level=1, receiptType=4, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=8, mirroredPosition=1, mirroredCycle=3, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.RecycleCompletedDetailed: activationId=101, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), sourcePosition=4, sourceCycle=8, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=1, mirrorCycle=3, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=101, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=101, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, price=10000000

## 101. MEMBER_32 activates Level 2

Transaction: `0x6e050423edb5c6b0726b72f93a7aaa2a5e7d48f97b306c1612c622ee18e8c332`
Block: 232

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, position=8, amount=20000000, timestamp=1790901974
- 6. p12.SpilloverPaid: from=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), to=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=102, level=2, receiptType=2, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=2, cycleNumber=1, activationId=102, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, position=2, amount=8000000, timestamp=1790901974
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), activationId=102, level=2, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=3, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=102, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=102, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, price=20000000

## 102. MEMBER_32 activates Level 3

Transaction: `0xbc6e2020d91cfac7b5e64c820e63f93149cf6280cec57c7c526e03e10cb5682e`
Block: 233

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_32: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=32, cycleNumber=1, activationId=103, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=32, linePaymentNumber=20
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=32, line=3, linePaymentNumber=20, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, position=32, amount=40000000, timestamp=1790901975
- 6. p39.SpilloverPaid: from=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), to=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=103, level=3, receiptType=2, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=32, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=3, cycleNumber=1, activationId=103, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, position=3, amount=8000000, timestamp=1790901975
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=200000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=10, cycleNumber=1, activationId=103, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=10, linePaymentNumber=7
- 23. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, position=10, amount=8000000, timestamp=1790901975
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=10, line=2, linePaymentNumber=7, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), activationId=103, level=3, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=32, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=103, level=3, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=32, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=103, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=103, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, price=40000000

## 103. MEMBER_33 registers under BOB_ORBIT_OWNER

Transaction: `0xa300c88f97d3b0e231cae6db43cfdf9f824a5d217350689eae74509292c01039`
Block: 236

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, position=1, amount=10000000, timestamp=1790901978
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=104, level=1, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=9, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=104, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=104, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, price=10000000

## 104. MEMBER_33 activates Level 2

Transaction: `0x314b28a91dfb5d64c7b703c1652ef3d2f1edd7529fbedc4df5d93310f9f25cf0`
Block: 237

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, position=9, amount=20000000, timestamp=1790901979
- 6. p12.SpilloverPaid: from=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), to=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=105, level=2, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=2, cycleNumber=1, activationId=105, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, position=2, amount=8000000, timestamp=1790901979
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), activationId=105, level=2, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=3, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=105, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=105, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, price=20000000

## 105. MEMBER_33 activates Level 3

Transaction: `0x0c3cac445f3b9cb504b4aad344e9c3e300e68ca08f0ee584d0c354288cb83cff`
Block: 238

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_33: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=33, cycleNumber=1, activationId=106, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=33, linePaymentNumber=21
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=33, line=3, linePaymentNumber=21, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, position=33, amount=40000000, timestamp=1790901980
- 6. p39.SpilloverPaid: from=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), to=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=106, level=3, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=33, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=3, cycleNumber=1, activationId=106, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, position=3, amount=8000000, timestamp=1790901980
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=208000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=10, cycleNumber=1, activationId=106, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=10, linePaymentNumber=7
- 23. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, position=10, amount=8000000, timestamp=1790901980
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=10, line=2, linePaymentNumber=7, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), activationId=106, level=3, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=33, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=106, level=3, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=33, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=106, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=106, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, price=40000000

## 106. MEMBER_34 registers under BOB_ORBIT_OWNER

Transaction: `0x6f107f4a888659137cb646b8c592018e7f65d78fcb8a9a147e4adc5b9311e2ce`
Block: 241

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, position=2, amount=10000000, timestamp=1790901983
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=107, level=1, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=9, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=107, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=107, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, price=10000000

## 107. MEMBER_34 activates Level 2

Transaction: `0xb265ddf280766c54ff3c8665240563e146049aaca3bbe63cd18711c630ed8bd1`
Block: 242

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, position=10, amount=20000000, timestamp=1790901984
- 6. p12.SpilloverPaid: from=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), to=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=108, level=2, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=3, cycleNumber=1, activationId=108, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, position=3, amount=8000000, timestamp=1790901984
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), activationId=108, level=2, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=3, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=108, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=108, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, price=20000000

## 108. MEMBER_34 activates Level 3

Transaction: `0x9db38588953ecf19530c86572c7b71fc56e1f7a036cf29157a3202455b67dcf5`
Block: 243

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_34: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=34, cycleNumber=1, activationId=109, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=34, linePaymentNumber=22
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=34, line=3, linePaymentNumber=22, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, position=34, amount=40000000, timestamp=1790901985
- 6. p39.SpilloverPaid: from=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), to=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=109, level=3, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=34, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=3, cycleNumber=1, activationId=109, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, position=3, amount=8000000, timestamp=1790901985
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=216000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=11, cycleNumber=1, activationId=109, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=11, linePaymentNumber=8
- 23. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, position=11, amount=8000000, timestamp=1790901985
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=11, line=2, linePaymentNumber=8, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), activationId=109, level=3, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=34, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=109, level=3, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=34, sourceCycle=1, mirroredPosition=11, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=109, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=109, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, price=40000000

## 109. MEMBER_35 registers under BOB_ORBIT_OWNER

Transaction: `0x48396563654da854c09c3ece4ae036270c05ca10b2af37628e5a34e7c33b44f4`
Block: 246

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, position=3, amount=10000000, timestamp=1790901988
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=110, level=1, receiptType=2, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=9, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=110, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=110, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, price=10000000

## 110. MEMBER_35 activates Level 2

Transaction: `0x22ad5665e6dc51387770a3e5a2b8f4707e60741251c1a3ec2f82e5e0f180159d`
Block: 247

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- MEMBER_26: +8.0 USDT
- MEMBER_35: -20.0 USDT
- 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853: +10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, cycleNumber=3, activationId=111, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=11, linePaymentNumber=8
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, line=2, linePaymentNumber=8, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, position=11, amount=20000000, timestamp=1790901989
- 6. p12.SpilloverPaid: from=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), to=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, amount=8000000
- 8. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, orbitType=12, sourcePosition=11, sourceCycle=3, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=111
- 10. p12.PositionActivationLinked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=3, cycleNumber=1, activationId=111, isMirror=true
- 11. p12.LinePaymentTracked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, line=1, position=3, linePaymentNumber=3
- 12. p12.PositionFilled: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, position=3, amount=8000000, timestamp=1790901989
- 13. p12.PaymentRuleApplied: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 15. levelManager.PayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 16. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), activationId=111, level=2, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=3, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=111, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=111, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=8000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, price=20000000

## 111. MEMBER_35 activates Level 3

Transaction: `0xdb34c58477c001d278cbcf0f25f494700f7cc1fa48ff737e7c82e41276f1c0df`
Block: 248

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_35: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=35, cycleNumber=1, activationId=112, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=35, linePaymentNumber=23
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=35, line=3, linePaymentNumber=23, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, position=35, amount=40000000, timestamp=1790901990
- 6. p39.SpilloverPaid: from=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), to=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=112, level=3, receiptType=2, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=35, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=3, cycleNumber=1, activationId=112, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, position=3, amount=8000000, timestamp=1790901990
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=224000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=11, cycleNumber=1, activationId=112, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=11, linePaymentNumber=8
- 23. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, position=11, amount=8000000, timestamp=1790901990
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=11, line=2, linePaymentNumber=8, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), activationId=112, level=3, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=35, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=112, level=3, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=35, sourceCycle=1, mirroredPosition=11, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=112, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=112, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, price=40000000

## 112. MEMBER_36 registers under BOB_ORBIT_OWNER

Transaction: `0x82959e739a53bc2130b5cb28bd5f3e2b3c6e00555ebc3f44994eb89802be8c6e`
Block: 251

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, position=4, amount=10000000, timestamp=1790901993
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=9
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, orbitType=4, sourcePosition=4, sourceCycle=9, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=113
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, cycleNumber=3, activationId=113, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=2, linePaymentNumber=2
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, amount=9000000, timestamp=1790901993
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=113, level=1, receiptType=4, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=9, mirroredPosition=2, mirroredCycle=3, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.RecycleCompletedDetailed: activationId=113, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), sourcePosition=4, sourceCycle=9, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=3, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=113, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=113, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, price=10000000

## 113. MEMBER_36 activates Level 2

Transaction: `0x44b7836d2d1b352ad770d78207953511ccee40928bc7f0e91594e0059857a0d2`
Block: 252

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
- 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853: -10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, cycleNumber=3, activationId=114, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=12, linePaymentNumber=9
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, line=2, linePaymentNumber=9, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, position=12, amount=20000000, timestamp=1790901994
- 6. p12.SpilloverPaid: from=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), to=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, amount=8000000
- 7. p12.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, cycleNumber=3
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, orbitType=12, sourcePosition=12, sourceCycle=3, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=114
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=3, cycleNumber=1, activationId=114, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, position=3, amount=8000000, timestamp=1790901994
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), activationId=114, level=2, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=3, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=114, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=1, cycleNumber=2, activationId=114, isMirror=true
- 23. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=1, position=1, linePaymentNumber=1
- 24. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 25. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=1, amount=20000000, timestamp=1790901994
- 26. p12.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 28. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=114, level=2, receiptType=4, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=3, mirroredPosition=1, mirroredCycle=2, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 30. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=6, cycleNumber=1, activationId=114, isMirror=true
- 31. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=2, position=6, linePaymentNumber=4
- 32. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=6, line=2, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 33. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=6, amount=10000000, timestamp=1790901994
- 51. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 52. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=114, level=2, receiptType=4, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=3, mirroredPosition=6, mirroredCycle=1, routedRole=4, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 53. levelManager.RecycleCompletedDetailed: activationId=114, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), sourcePosition=12, sourceCycle=3, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=20000000, recycleLiquidPaid=18000000, recycleEscrowLocked=0, mirrorPosition=1, mirrorCycle=2, triggeredOrbitReset=false
- 58. levelManager.SystemChargeDistributedDetailed: activationId=114, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 59. levelManager.ActivationFinancialSummaryRecorded: activationId=114, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=26000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 60. levelManager.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, amount=20000000
- 61. levelManager.LevelActivatedInOrbit: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 62. registration.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, price=20000000

## 114. MEMBER_36 activates Level 3

Transaction: `0x9824f62abd6146286fe881386e510bff12849c7a3672109202946030c8f18d58`
Block: 253

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_36: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=36, cycleNumber=1, activationId=115, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=36, linePaymentNumber=24
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=36, line=3, linePaymentNumber=24, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, position=36, amount=40000000, timestamp=1790901995
- 6. p39.SpilloverPaid: from=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), to=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=115, level=3, receiptType=2, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=36, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=3, cycleNumber=1, activationId=115, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, position=3, amount=8000000, timestamp=1790901995
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=232000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=11, cycleNumber=1, activationId=115, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=11, linePaymentNumber=8
- 23. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, position=11, amount=8000000, timestamp=1790901995
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=11, line=2, linePaymentNumber=8, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), activationId=115, level=3, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=36, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=115, level=3, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=36, sourceCycle=1, mirroredPosition=11, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=115, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=115, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, price=40000000

## 115. MEMBER_37 registers under BOB_ORBIT_OWNER

Transaction: `0x42b34fce15fd07b5c075fc0314b5be97aacaccbf81c20ec9c3b15269ea4d8871`
Block: 256

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, position=1, amount=10000000, timestamp=1790901998
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=116, level=1, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=10, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=116, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=116, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, price=10000000

## 116. MEMBER_37 activates Level 2

Transaction: `0xb30c1c6f0fa658b80219766c93fa168bf58c2aae81b6cd359510c0c8ddb5180f`
Block: 257

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, position=1, amount=20000000, timestamp=1790901999
- 6. p12.SpilloverPaid: from=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=117, level=2, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=4, cycleNumber=2, activationId=117, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=4, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, position=4, amount=10000000, timestamp=1790901999
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=4, line=2, linePaymentNumber=1, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=117, level=2, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=4, mirroredPosition=4, mirroredCycle=2, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=117, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=117, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, price=20000000

## 117. MEMBER_37 activates Level 3

Transaction: `0x2fbd9c8d826728b380c310f329b3d4118fe1887c5a0297ca4067a4d7eaa9e96a`
Block: 258

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_37: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=37, cycleNumber=1, activationId=118, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=37, linePaymentNumber=25
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=37, line=3, linePaymentNumber=25, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, position=37, amount=40000000, timestamp=1790902000
- 6. p39.SpilloverPaid: from=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), to=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=118, level=3, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=37, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=3, cycleNumber=1, activationId=118, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, position=3, amount=8000000, timestamp=1790902000
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=240000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=12, cycleNumber=1, activationId=118, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=12, linePaymentNumber=9
- 23. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, position=12, amount=8000000, timestamp=1790902000
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=12, line=2, linePaymentNumber=9, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), activationId=118, level=3, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=37, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=118, level=3, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=37, sourceCycle=1, mirroredPosition=12, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=118, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=118, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, price=40000000

## 118. MEMBER_38 registers under BOB_ORBIT_OWNER

Transaction: `0xd55a0159cf6fce8e7913a9a656396cc75e0d6b0a9d05baaf5e16247d9a45dc82`
Block: 261

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, position=2, amount=10000000, timestamp=1790902003
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=119, level=1, receiptType=2, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=10, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=119, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=119, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, price=10000000

## 119. MEMBER_38 activates Level 2

Transaction: `0xe2390ec140d6d2b1be1355875e41fc57fe6c0ebf9910541c70028a478af3b2a9`
Block: 262

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, position=2, amount=20000000, timestamp=1790902004
- 6. p12.SpilloverPaid: from=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=120, level=2, receiptType=2, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=7, cycleNumber=2, activationId=120, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=7, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, position=7, amount=10000000, timestamp=1790902004
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=7, line=2, linePaymentNumber=2, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=120, level=2, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=4, mirroredPosition=7, mirroredCycle=2, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=120, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=120, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, price=20000000

## 120. MEMBER_38 activates Level 3

Transaction: `0x53a9cc244d457598a3cb96e02a65be8c8775e69b68e5a392217bf11c7363ed80`
Block: 263

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_38: -40.0 USDT
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT
- 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853: +20.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=38, cycleNumber=1, activationId=121, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=38, linePaymentNumber=26
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=38, line=3, linePaymentNumber=26, toOwner=0, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=20000000
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, position=38, amount=40000000, timestamp=1790902005
- 6. p39.SpilloverPaid: from=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), to=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, orbitType=39, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, orbitType=39, sourcePosition=38, sourceCycle=1, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=121
- 11. p39.PositionActivationLinked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=3, cycleNumber=1, activationId=121, isMirror=true
- 12. p39.LinePaymentTracked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, line=1, position=3, linePaymentNumber=3
- 14. p39.PositionFilled: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, position=3, amount=8000000, timestamp=1790902005
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 19. escrow.EscrowLocked: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=248000000
- 20. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=12, cycleNumber=1, activationId=121, isMirror=true
- 21. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=12, linePaymentNumber=9
- 22. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, position=12, amount=8000000, timestamp=1790902005
- 23. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=12, line=2, linePaymentNumber=9, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 25. levelManager.PayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 26. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), activationId=121, level=3, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=38, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=121, level=3, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=38, sourceCycle=1, mirroredPosition=12, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=121, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=121, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=8000000, totalEscrowLocked=8000000, totalRecycleAllocated=20000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, price=40000000

## 121. MEMBER_39 registers under BOB_ORBIT_OWNER

Transaction: `0x87e6fedc9d1cad7a09f29568aca92a8459ee98b2d64822083c6ff8343e33b586`
Block: 266

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, position=3, amount=10000000, timestamp=1790902008
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=122, level=1, receiptType=2, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=10, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=122, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=122, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, orbit=0x610178dA211FEF7D417bC0e6FeD39F05609AD788, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, price=10000000

## 122. MEMBER_39 activates Level 2

Transaction: `0x1e55cfde787ec3c647d075f8cd2ad5f1bcf41c7ec5cf75172904e0419bde2dcc`
Block: 267

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, position=3, amount=20000000, timestamp=1790902009
- 6. p12.SpilloverPaid: from=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=123, level=2, receiptType=2, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=10, cycleNumber=2, activationId=123, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=10, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, position=10, amount=10000000, timestamp=1790902009
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=10, line=2, linePaymentNumber=3, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=123, level=2, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=4, mirroredPosition=10, mirroredCycle=2, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=123, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=123, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, orbit=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, price=20000000

## 123. MEMBER_39 activates Level 3

Transaction: `0xe16e8681e9eafb31020f852e4d5a4f780366e754d3fc8afb7779e0d394251d07`
Block: 268

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
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9: +8.0 USDT
- 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853: -20.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=39, cycleNumber=1, activationId=124, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=39, linePaymentNumber=27
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=39, line=3, linePaymentNumber=27, toOwner=0, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=20000000
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, position=39, amount=40000000, timestamp=1790902010
- 6. p39.SpilloverPaid: from=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), to=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 8. p39.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, cycleNumber=1
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, orbitType=39, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 11. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, orbitType=39, sourcePosition=39, sourceCycle=1, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=124
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=3, cycleNumber=1, activationId=124, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, position=3, amount=8000000, timestamp=1790902010
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=256000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=12, cycleNumber=1, activationId=124, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=12, linePaymentNumber=9
- 23. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, position=12, amount=8000000, timestamp=1790902010
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=12, line=2, linePaymentNumber=9, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), activationId=124, level=3, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=39, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=124, level=3, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=39, sourceCycle=1, mirroredPosition=12, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=124, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=2, cycleNumber=1, activationId=124, isMirror=true
- 35. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=1, position=2, linePaymentNumber=2
- 36. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 37. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=2, amount=40000000, timestamp=1790902010
- 38. p39.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=8000000
- 39. p39.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 41. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 42. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=124, level=3, receiptType=4, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=39, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 43. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=10, cycleNumber=1, activationId=124, isMirror=true
- 44. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=2, position=10, linePaymentNumber=3
- 45. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=10, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 46. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=10, amount=8000000, timestamp=1790902010
- 64. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 65. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=124, level=3, receiptType=4, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=39, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 66. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=2, cycleNumber=1, activationId=124, isMirror=true
- 67. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=1, position=2, linePaymentNumber=2
- 68. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=2, line=1, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 69. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=2, amount=20000000, timestamp=1790902010
- 87. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 88. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=124, level=3, receiptType=4, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=39, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 89. levelManager.RecycleCompletedDetailed: activationId=124, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, sourceUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), sourcePosition=39, sourceCycle=1, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=40000000, recycleLiquidPaid=36000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=1, triggeredOrbitReset=false
- 94. levelManager.SystemChargeDistributedDetailed: activationId=124, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 95. levelManager.ActivationFinancialSummaryRecorded: activationId=124, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=44000000, totalEscrowLocked=8000000, totalRecycleAllocated=20000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 96. levelManager.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, amount=40000000
- 97. levelManager.LevelActivatedInOrbit: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, orbit=0x9A676e781A523b5d0C0e43731313A708CB607508, netAmount=40000000
- 98. registration.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, price=40000000
