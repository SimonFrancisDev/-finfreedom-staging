# Canonical Contract-Derived Behavior Trace

Generated: 2026-07-21T13:37:46.404Z

All amounts below are read from transaction events or token balance changes. This file is generated, not manually transcribed.

## Final Cycle State

Bob P12 completed cycles: 3
Bob P39 completed cycles: 1

## 1. ALICE_SPONSOR registers under ID1

Transaction: `0xe995d5c6f2670040dbc1baeddb08a68932ee9234042a7ca8bc8b5377726b7143`
Block: 3478

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
- 6. p4.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, amount=10000000, timestamp=1784644229
- 25. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, receiptType=2, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 26. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=1, level=1, receiptType=2, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 30. levelManager.SystemChargeDistributedDetailed: activationId=1, user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 31. levelManager.ActivationFinancialSummaryRecorded: activationId=1, user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 32. levelManager.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, amount=10000000
- 33. levelManager.LevelActivatedInOrbit: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 34. registration.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, price=10000000

## 2. ALICE_SPONSOR activates Level 2

Transaction: `0xa49137f60f55e1d73d897c37904ce07f0dc408fb3074e68c7c9490ccf44adc4d`
Block: 3479

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
- 5. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=1, amount=20000000, timestamp=1784644230
- 6. p12.SpilloverPaid: from=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 25. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=2, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 26. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=2, level=2, receiptType=2, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 44. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=3, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 45. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=2, level=2, receiptType=3, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 49. levelManager.SystemChargeDistributedDetailed: activationId=2, user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 50. levelManager.ActivationFinancialSummaryRecorded: activationId=2, user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 51. levelManager.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=20000000
- 52. levelManager.LevelActivatedInOrbit: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 53. registration.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, price=20000000

## 3. ALICE_SPONSOR activates Level 3

Transaction: `0x0a06ea1db13c1da94a24cf789db14663b6a0d675b27afe8b708a8e4b37d2a6cc`
Block: 3480

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
- 5. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=1, amount=40000000, timestamp=1784644231
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
- 72. levelManager.LevelActivatedInOrbit: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 73. registration.LevelActivated: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, price=40000000

## 4. BOB_ORBIT_OWNER registers under ALICE_SPONSOR

Transaction: `0x4a8854bc25711d0838cc72381853a047328b56aba5cd385213970e6d475806ad`
Block: 3483

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
- 6. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, amount=10000000, timestamp=1784644234
- 9. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=4, level=1, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=4, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=4, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, price=10000000

## 5. BOB_ORBIT_OWNER activates Level 2

Transaction: `0x16cb6346d16e635fd9d1e7e9dee45dc4f7778ca000c4e1277712862debfcbcf6`
Block: 3484

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
- 5. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=1, amount=20000000, timestamp=1784644235
- 6. p12.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=5, level=2, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=4, cycleNumber=1, activationId=5, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=2, position=4, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=4, amount=10000000, timestamp=1784644235
- 14. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=4, line=2, linePaymentNumber=1, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 32. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 33. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=5, level=2, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 37. levelManager.SystemChargeDistributedDetailed: activationId=5, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 38. levelManager.ActivationFinancialSummaryRecorded: activationId=5, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 39. levelManager.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, amount=20000000
- 40. levelManager.LevelActivatedInOrbit: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 41. registration.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, price=20000000

## 6. BOB_ORBIT_OWNER activates Level 3

Transaction: `0x262a48bdf73c5f4023533a3b9ce4a29dba7c0c1b22a988957f8661fb0eb8bdcb`
Block: 3485

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
- 5. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=1, amount=40000000, timestamp=1784644236
- 6. p39.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=6, level=3, receiptType=2, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=4, cycleNumber=1, activationId=6, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=2, position=4, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=4, amount=8000000, timestamp=1784644236
- 15. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=4, line=2, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=7, cycleNumber=1, activationId=6, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=2, position=7, linePaymentNumber=2
- 18. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=7, amount=20000000, timestamp=1784644236
- 19. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=7, line=2, linePaymentNumber=2, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 54. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 55. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=6, level=3, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 56. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 57. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=6, level=3, receiptType=3, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=1, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 61. levelManager.SystemChargeDistributedDetailed: activationId=6, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 62. levelManager.ActivationFinancialSummaryRecorded: activationId=6, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 63. levelManager.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, amount=40000000
- 64. levelManager.LevelActivatedInOrbit: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 65. registration.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, price=40000000

## 7. MEMBER_01 registers under BOB_ORBIT_OWNER

Transaction: `0x3688bb8e4be41c8450480250daf4c06ebdad856df933cdedadbac99fb0dc71ce`
Block: 3488

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, position=1, amount=10000000, timestamp=1784644239
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=7, level=1, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=7, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=7, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=1, price=10000000

## 8. MEMBER_01 activates Level 2

Transaction: `0x30e2759ffa1b93432fc148c7674e4d4bdcc3bfafeabf8b03e128928a4e4a46ad`
Block: 3489

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=1, amount=20000000, timestamp=1784644240
- 6. p12.SpilloverPaid: from=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=8, level=2, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=4, cycleNumber=1, activationId=8, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=4, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=4, amount=10000000, timestamp=1784644240
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=4, line=2, linePaymentNumber=1, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=8, level=2, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=8, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=8, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, price=20000000

## 9. MEMBER_01 activates Level 3

Transaction: `0x0c92d3d166e63776d0d1b497fa07ff58cd6d405c091424c33a97e3450f0df02a`
Block: 3490

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
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=1, cycleNumber=1, activationId=9, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=1, position=1, linePaymentNumber=1
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=1, amount=40000000, timestamp=1784644241
- 6. p39.SpilloverPaid: from=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=9, level=3, receiptType=2, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=4, cycleNumber=1, activationId=9, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=2, position=4, linePaymentNumber=1
- 15. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=4, amount=8000000, timestamp=1784644241
- 16. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=4, line=2, linePaymentNumber=1, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=8000000
- 21. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=16, cycleNumber=1, activationId=9, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=3, position=16, linePaymentNumber=1
- 23. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=16, amount=20000000, timestamp=1784644241
- 24. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=16, line=3, linePaymentNumber=1, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 42. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 43. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=9, level=3, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 44. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 45. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=9, level=3, receiptType=3, fromUser=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=1, mirroredPosition=16, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 49. levelManager.SystemChargeDistributedDetailed: activationId=9, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 50. levelManager.ActivationFinancialSummaryRecorded: activationId=9, user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 51. levelManager.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=40000000
- 52. levelManager.LevelActivatedInOrbit: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 53. registration.LevelActivated: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, price=40000000

## 10. MEMBER_02 registers under BOB_ORBIT_OWNER

Transaction: `0x4a03763c1cad08666837f6fe149c5ef307765545f71c6ac2a333dda8a1088ad6`
Block: 3493

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, position=2, amount=10000000, timestamp=1784644244
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=10, level=1, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=10, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=10, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=1, price=10000000

## 11. MEMBER_02 activates Level 2

Transaction: `0xc53aa64ad41bb171b7d6403c6537b7482dc9b6608b4edb2883dcd58919e896d6`
Block: 3494

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=2, amount=20000000, timestamp=1784644245
- 6. p12.SpilloverPaid: from=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=11, level=2, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=7, cycleNumber=1, activationId=11, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=7, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=7, amount=10000000, timestamp=1784644245
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=7, line=2, linePaymentNumber=2, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=11, level=2, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=11, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=11, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, price=20000000

## 12. MEMBER_02 activates Level 3

Transaction: `0x76aef30446974854f00e2dead2471cffe83afa49284a5139526850482627de2c`
Block: 3495

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
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=2, cycleNumber=1, activationId=12, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=1, position=2, linePaymentNumber=2
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=2, amount=40000000, timestamp=1784644246
- 6. p39.SpilloverPaid: from=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=12, level=3, receiptType=2, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=7, cycleNumber=1, activationId=12, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=2, position=7, linePaymentNumber=2
- 15. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=7, amount=8000000, timestamp=1784644246
- 16. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=7, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=16000000, currentEscrowLockedGlobal=16000000
- 21. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=25, cycleNumber=1, activationId=12, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=3, position=25, linePaymentNumber=2
- 23. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=25, amount=20000000, timestamp=1784644246
- 24. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=25, line=3, linePaymentNumber=2, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 42. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 43. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=12, level=3, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 44. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 45. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=12, level=3, receiptType=3, fromUser=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=1, mirroredPosition=25, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 49. levelManager.SystemChargeDistributedDetailed: activationId=12, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 50. levelManager.ActivationFinancialSummaryRecorded: activationId=12, user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 51. levelManager.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=40000000
- 52. levelManager.LevelActivatedInOrbit: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 53. registration.LevelActivated: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, price=40000000

## 13. MEMBER_03 registers under BOB_ORBIT_OWNER

Transaction: `0xb434adb9dbc7dacb9995685bf3136242dba66d74b580d2e3ada8888ae03f85ba`
Block: 3498

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, position=3, amount=10000000, timestamp=1784644249
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=13, level=1, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=13, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=13, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=1, price=10000000

## 14. MEMBER_03 activates Level 2

Transaction: `0x6e19caf95cdcf0ced852f9e4bd9c6e021d9f81869e88c410be7cf4f40a9ee158`
Block: 3499

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=3, amount=20000000, timestamp=1784644250
- 6. p12.SpilloverPaid: from=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=14, level=2, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=10, cycleNumber=1, activationId=14, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=10, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=10, amount=10000000, timestamp=1784644250
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=10, line=2, linePaymentNumber=3, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=14, level=2, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=14, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=14, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, price=20000000

## 15. MEMBER_03 activates Level 3

Transaction: `0x58f78b6d98a158184bb59943598c958cb7909d20fb05704ae70ef81caa9a908e`
Block: 3500

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
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +16.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=3, cycleNumber=1, activationId=15, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=1, position=3, linePaymentNumber=3
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=8000000, toSpillover2=20000000, toEscrow=8000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=3, amount=40000000, timestamp=1784644251
- 7. p39.SpilloverPaid: from=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=15, level=3, receiptType=2, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, orbitType=39, sourcePosition=3, sourceCycle=1, expectedAmount=8000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=15
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=24000000
- 17. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=10, cycleNumber=1, activationId=15, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=2, position=10, linePaymentNumber=3
- 20. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=10, amount=8000000, timestamp=1784644251
- 21. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=10, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 25. escrow.EscrowLocked: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=24000000, currentEscrowLockedGlobal=32000000
- 26. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=34, cycleNumber=1, activationId=15, isMirror=true
- 27. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=3, position=34, linePaymentNumber=3
- 28. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=34, amount=20000000, timestamp=1784644251
- 29. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=34, line=3, linePaymentNumber=3, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 47. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 48. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=15, level=3, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 49. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 50. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=15, level=3, receiptType=3, fromUser=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=1, mirroredPosition=34, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 54. levelManager.SystemChargeDistributedDetailed: activationId=15, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 55. levelManager.ActivationFinancialSummaryRecorded: activationId=15, user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=20000000, totalEscrowLocked=16000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 56. levelManager.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=40000000
- 57. levelManager.LevelActivatedInOrbit: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 58. registration.LevelActivated: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, price=40000000

## 16. MEMBER_04 registers under BOB_ORBIT_OWNER

Transaction: `0xd502a2ef277e173bbc41132f650d245a18a34a787eec5ed2c00cd5685d0f46b1`
Block: 3503

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, position=4, amount=10000000, timestamp=1784644254
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=1
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, orbitType=4, sourcePosition=4, sourceCycle=1, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=16
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, cycleNumber=1, activationId=16, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=2, linePaymentNumber=2
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, amount=9000000, timestamp=1784644254
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=16, level=1, receiptType=4, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.RecycleCompletedDetailed: activationId=16, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), sourcePosition=4, sourceCycle=1, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=1, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=16, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=16, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=1, price=10000000

## 17. MEMBER_04 activates Level 2

Transaction: `0xf942348c8f06b6c8966d849457efcf1761ac3913e7b2b8991547b393354ce716`
Block: 3504

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, position=4, amount=20000000, timestamp=1784644255
- 6. p12.SpilloverPaid: from=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=17, level=2, receiptType=2, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=1, cycleNumber=1, activationId=17, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, position=1, amount=8000000, timestamp=1784644255
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=17, level=2, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=17, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=17, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=2, price=20000000

## 18. MEMBER_04 activates Level 3

Transaction: `0xab7acd9e613c094805a6d4139d7ff9cda30cbbe0e93ae1ffb0c3fab5ba58f899`
Block: 3505

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_04: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +28.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=4, cycleNumber=1, activationId=18, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=4, linePaymentNumber=1
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=4, line=2, linePaymentNumber=1, toOwner=0, toSpillover1=8000000, toSpillover2=20000000, toEscrow=8000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=4, amount=40000000, timestamp=1784644256
- 7. p39.SpilloverPaid: from=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=18, level=3, receiptType=2, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, orbitType=39, sourcePosition=4, sourceCycle=1, expectedAmount=8000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=18
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=16000000, currentEscrowLockedGlobal=40000000
- 17. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=1, cycleNumber=1, activationId=18, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=1, position=1, linePaymentNumber=1
- 19. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=1, amount=8000000, timestamp=1784644256
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=13, cycleNumber=1, activationId=18, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=13, linePaymentNumber=1
- 24. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=13, amount=20000000, timestamp=1784644256
- 25. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=13, line=3, linePaymentNumber=1, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=20000000, toRecycle=0
- 29. escrow.EscrowLocked: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), fromLevel=3, toLevel=4, amount=20000000, newLockedTotal=44000000, currentEscrowLockedGlobal=60000000
- 31. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 32. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=18, level=3, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 34. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=18, level=3, receiptType=3, fromUser=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=1, mirroredPosition=13, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 38. levelManager.SystemChargeDistributedDetailed: activationId=18, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 39. levelManager.ActivationFinancialSummaryRecorded: activationId=18, user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=8000000, totalEscrowLocked=28000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 40. levelManager.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, amount=40000000
- 41. levelManager.LevelActivatedInOrbit: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 42. registration.LevelActivated: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, price=40000000

## 19. MEMBER_05 registers under BOB_ORBIT_OWNER

Transaction: `0x7759ac3b9b0ad2be4316b6aadacc0925a9b52c2d72b4eb515312420727b0dbcd`
Block: 3508

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, position=1, amount=10000000, timestamp=1784644259
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=19, level=1, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=19, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=19, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=1, price=10000000

## 20. MEMBER_05 activates Level 2

Transaction: `0x3b43e1537993c37d5a911b6810be29c853ba69fc55d78b046c3d683707c33d31`
Block: 3509

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, position=5, amount=20000000, timestamp=1784644260
- 6. p12.SpilloverPaid: from=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=20, level=2, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=1, cycleNumber=1, activationId=20, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, position=1, amount=8000000, timestamp=1784644260
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=20, level=2, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=20, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=20, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=2, price=20000000

## 21. MEMBER_05 activates Level 3

Transaction: `0x0412bd9e66787d7b05c8d2807fa5e8956bd6dae623f65e186a60ceb4a6a4e516`
Block: 3510

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_05: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +28.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=5, cycleNumber=1, activationId=21, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=5, linePaymentNumber=2
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=5, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=8000000, toSpillover2=20000000, toEscrow=8000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=5, amount=40000000, timestamp=1784644261
- 7. p39.SpilloverPaid: from=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=21, level=3, receiptType=2, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, orbitType=39, sourcePosition=5, sourceCycle=1, expectedAmount=8000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=21
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=24000000, currentEscrowLockedGlobal=68000000
- 17. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=1, cycleNumber=1, activationId=21, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=1, position=1, linePaymentNumber=1
- 19. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=1, amount=8000000, timestamp=1784644261
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=16, cycleNumber=1, activationId=21, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=16, linePaymentNumber=2
- 24. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=16, amount=20000000, timestamp=1784644261
- 25. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=16, line=3, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=20000000, toRecycle=0
- 29. escrow.EscrowLocked: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), fromLevel=3, toLevel=4, amount=20000000, newLockedTotal=64000000, currentEscrowLockedGlobal=88000000
- 31. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 32. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=21, level=3, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 34. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=21, level=3, receiptType=3, fromUser=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=1, mirroredPosition=16, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 38. levelManager.SystemChargeDistributedDetailed: activationId=21, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 39. levelManager.ActivationFinancialSummaryRecorded: activationId=21, user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=8000000, totalEscrowLocked=28000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 40. levelManager.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, amount=40000000
- 41. levelManager.LevelActivatedInOrbit: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 42. registration.LevelActivated: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, price=40000000

## 22. MEMBER_06 registers under BOB_ORBIT_OWNER

Transaction: `0x775ea85b3c445452ee688c4c274c78cf8086fb25579536e04e8f742fd3dc574b`
Block: 3513

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, position=2, amount=10000000, timestamp=1784644264
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=22, level=1, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=22, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=22, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=1, price=10000000

## 23. MEMBER_06 activates Level 2

Transaction: `0x25f9ea3457bcf826841ea01a8ba40f676f6318acc999ae86b112bdce4cc21cfd`
Block: 3514

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, position=6, amount=20000000, timestamp=1784644265
- 6. p12.SpilloverPaid: from=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=23, level=2, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=1, cycleNumber=1, activationId=23, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, position=1, amount=8000000, timestamp=1784644265
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=23, level=2, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=23, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=23, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=2, price=20000000

## 24. MEMBER_06 activates Level 3

Transaction: `0xcd68093a1fa24c16cd4de2483cc484b4c31711a959cf60e1ec41408fe51dba11`
Block: 3515

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_06: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=6, cycleNumber=1, activationId=24, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=6, linePaymentNumber=3
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=6, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=8000000, toSpillover2=20000000, toEscrow=8000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=6, amount=40000000, timestamp=1784644266
- 7. p39.SpilloverPaid: from=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=24, level=3, receiptType=2, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, orbitType=39, sourcePosition=6, sourceCycle=1, expectedAmount=8000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=24
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=32000000, currentEscrowLockedGlobal=96000000
- 17. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=1, cycleNumber=1, activationId=24, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=1, position=1, linePaymentNumber=1
- 19. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=1, amount=8000000, timestamp=1784644266
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=19, cycleNumber=1, activationId=24, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=19, linePaymentNumber=3
- 23. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=19, amount=20000000, timestamp=1784644266
- 24. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=19, line=3, linePaymentNumber=3, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 27. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=24, level=3, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 30. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=24, level=3, receiptType=3, fromUser=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=1, mirroredPosition=19, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 34. levelManager.SystemChargeDistributedDetailed: activationId=24, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 35. levelManager.ActivationFinancialSummaryRecorded: activationId=24, user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 36. levelManager.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, amount=40000000
- 37. levelManager.LevelActivatedInOrbit: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 38. registration.LevelActivated: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, price=40000000

## 25. MEMBER_07 registers under BOB_ORBIT_OWNER

Transaction: `0x876a6367dd67e5384d1ff9031de0de4bcc9461ab59919f89648a2067b9731a58`
Block: 3518

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, position=3, amount=10000000, timestamp=1784644269
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=25, level=1, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=25, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=25, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=1, price=10000000

## 26. MEMBER_07 activates Level 2

Transaction: `0x73cd5fea3322f4fbc8cb9f4b8d33265c0aa868cd6eb2794b7291d6c9acf94b9d`
Block: 3519

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, position=7, amount=20000000, timestamp=1784644270
- 6. p12.SpilloverPaid: from=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=26, level=2, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=2, cycleNumber=1, activationId=26, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, position=2, amount=8000000, timestamp=1784644270
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=26, level=2, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=26, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=26, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=2, price=20000000

## 27. MEMBER_07 activates Level 3

Transaction: `0xb9f0e0659b1389620a4bfbb95b96aa16535e998278d8c2be049bef9bb1d91d05`
Block: 3520

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_07: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=7, cycleNumber=1, activationId=27, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=7, linePaymentNumber=4
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=7, line=2, linePaymentNumber=4, toOwner=0, toSpillover1=8000000, toSpillover2=20000000, toEscrow=8000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=7, amount=40000000, timestamp=1784644271
- 7. p39.SpilloverPaid: from=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=27, level=3, receiptType=2, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, orbitType=39, sourcePosition=7, sourceCycle=1, expectedAmount=8000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=27
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=40000000, currentEscrowLockedGlobal=104000000
- 17. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=2, cycleNumber=1, activationId=27, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=1, position=2, linePaymentNumber=2
- 19. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=2, amount=8000000, timestamp=1784644271
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=22, cycleNumber=1, activationId=27, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=22, linePaymentNumber=4
- 23. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=22, amount=20000000, timestamp=1784644271
- 24. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=22, line=3, linePaymentNumber=4, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 27. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=27, level=3, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 30. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=27, level=3, receiptType=3, fromUser=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=1, mirroredPosition=22, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 34. levelManager.SystemChargeDistributedDetailed: activationId=27, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 35. levelManager.ActivationFinancialSummaryRecorded: activationId=27, user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 36. levelManager.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, amount=40000000
- 37. levelManager.LevelActivatedInOrbit: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 38. registration.LevelActivated: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, price=40000000

## 28. MEMBER_08 registers under BOB_ORBIT_OWNER

Transaction: `0xeaf42f115a61d375e5cdbf16346c658c56e6dabd995d51ba8d577982b6436651`
Block: 3523

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, position=4, amount=10000000, timestamp=1784644274
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=2
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, orbitType=4, sourcePosition=4, sourceCycle=2, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=28
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=3, cycleNumber=1, activationId=28, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=3, linePaymentNumber=3
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, amount=9000000, timestamp=1784644274
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=28, level=1, receiptType=4, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.RecycleCompletedDetailed: activationId=28, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), sourcePosition=4, sourceCycle=2, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=3, mirrorCycle=1, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=28, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=28, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=1, price=10000000

## 29. MEMBER_08 activates Level 2

Transaction: `0xd8abbe1671e4573d4c03a5e744c81c1d79b832b883e31c94c7bf73c4add0657d`
Block: 3524

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, position=8, amount=20000000, timestamp=1784644275
- 6. p12.SpilloverPaid: from=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=29, level=2, receiptType=2, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=2, cycleNumber=1, activationId=29, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, position=2, amount=8000000, timestamp=1784644275
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=29, level=2, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=29, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=29, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=2, price=20000000

## 30. MEMBER_08 activates Level 3

Transaction: `0xc74c01305f6cb8c9356cfd0b946e7d37fdd909537896212a7a02ab11fb3faf51`
Block: 3525

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=8, amount=40000000, timestamp=1784644276
- 6. p39.SpilloverPaid: from=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=30, level=3, receiptType=2, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=2, cycleNumber=1, activationId=30, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=2, amount=8000000, timestamp=1784644276
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=25, cycleNumber=1, activationId=30, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=25, linePaymentNumber=5
- 18. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=25, amount=20000000, timestamp=1784644276
- 19. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=25, line=3, linePaymentNumber=5, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=30, level=3, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=30, level=3, receiptType=3, fromUser=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=1, mirroredPosition=25, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=30, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=30, user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, price=40000000

## 31. MEMBER_09 registers under BOB_ORBIT_OWNER

Transaction: `0x93d39f499aec75a102f9be630285ddb4fa0899458fd45f0b5d656cd5150e9a25`
Block: 3528

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, position=1, amount=10000000, timestamp=1784644279
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=31, level=1, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=31, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=31, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=1, price=10000000

## 32. MEMBER_09 activates Level 2

Transaction: `0x73fadf4029b671f58de606195b1e38d145a6f71a5969cfb539350453bd92d6cc`
Block: 3529

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, position=9, amount=20000000, timestamp=1784644280
- 6. p12.SpilloverPaid: from=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=32, level=2, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=2, cycleNumber=1, activationId=32, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, position=2, amount=8000000, timestamp=1784644280
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=32, level=2, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=32, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=32, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=2, price=20000000

## 33. MEMBER_09 activates Level 3

Transaction: `0xe3e1590c89509266d0384fbad966c4aa411ee3e1bb7b07bde93762a089642faf`
Block: 3530

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=9, amount=40000000, timestamp=1784644281
- 6. p39.SpilloverPaid: from=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=33, level=3, receiptType=2, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=2, cycleNumber=1, activationId=33, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=2, amount=8000000, timestamp=1784644281
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=28, cycleNumber=1, activationId=33, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=28, linePaymentNumber=6
- 18. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=28, amount=20000000, timestamp=1784644281
- 19. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=28, line=3, linePaymentNumber=6, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=33, level=3, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=33, level=3, receiptType=3, fromUser=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=1, mirroredPosition=28, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=33, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=33, user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, price=40000000

## 34. MEMBER_10 registers under BOB_ORBIT_OWNER

Transaction: `0xce3085e1e81f7bffb064505bb00b73d56e7c5d7ffb368ef2c0208d11d4656ada`
Block: 3533

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, position=2, amount=10000000, timestamp=1784644284
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=34, level=1, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=34, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=34, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=1, price=10000000

## 35. MEMBER_10 activates Level 2

Transaction: `0x20d4862bf20f4c14af5a03c222ded93969c5c25deb351e3966d78df36b9eb283`
Block: 3534

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, position=10, amount=20000000, timestamp=1784644285
- 6. p12.SpilloverPaid: from=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=35, level=2, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=3, cycleNumber=1, activationId=35, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, position=3, amount=8000000, timestamp=1784644285
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=2, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=35, level=2, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=35, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=35, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=2, price=20000000

## 36. MEMBER_10 activates Level 3

Transaction: `0x7d199e3c87fdac5548a7002caa848622a5a4f47fcdee58fb78120d843886c517`
Block: 3535

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_10: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=10, cycleNumber=1, activationId=36, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=10, linePaymentNumber=7
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=10, line=2, linePaymentNumber=7, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=10, amount=40000000, timestamp=1784644286
- 6. p39.SpilloverPaid: from=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=36, level=3, receiptType=2, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=3, cycleNumber=1, activationId=36, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=3, amount=8000000, timestamp=1784644286
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=112000000
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=31, cycleNumber=1, activationId=36, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=31, linePaymentNumber=7
- 23. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=31, amount=20000000, timestamp=1784644286
- 24. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=31, line=3, linePaymentNumber=7, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=36, level=3, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=36, level=3, receiptType=3, fromUser=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=1, mirroredPosition=31, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=36, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=36, user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, price=40000000

## 37. MEMBER_11 registers under BOB_ORBIT_OWNER

Transaction: `0x0eb6f22d4bcfb0256437345b5d1528f88a1bc4a35ae602904e46b0afb0339281`
Block: 3538

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, position=3, amount=10000000, timestamp=1784644289
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=37, level=1, receiptType=2, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=37, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=37, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=1, price=10000000

## 38. MEMBER_11 activates Level 2

Transaction: `0xf8198fa353f1f207cc76dea9cbc780ac9e53f8755e52e70906b47718928f030f`
Block: 3539

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_11: -20.0 USDT
- 0xEd00171E28B55C3ba9bE26a474611755C860E6F0: +10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, cycleNumber=1, activationId=38, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=11, linePaymentNumber=8
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, line=2, linePaymentNumber=8, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, position=11, amount=20000000, timestamp=1784644290
- 6. p12.SpilloverPaid: from=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, amount=8000000
- 8. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, orbitType=12, sourcePosition=11, sourceCycle=1, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=38
- 10. p12.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=3, cycleNumber=1, activationId=38, isMirror=true
- 11. p12.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, line=1, position=3, linePaymentNumber=3
- 12. p12.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, position=3, amount=8000000, timestamp=1784644290
- 13. p12.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 15. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=2, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 16. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=38, level=2, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=38, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=38, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=8000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=2, price=20000000

## 39. MEMBER_11 activates Level 3

Transaction: `0xef76de6a9799574645ca2c594dd32f4ea8a9777015b8a0ab39d6e1d2b1b28ea3`
Block: 3540

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_11: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=11, cycleNumber=1, activationId=39, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=11, linePaymentNumber=8
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=11, line=2, linePaymentNumber=8, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=11, amount=40000000, timestamp=1784644291
- 6. p39.SpilloverPaid: from=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=39, level=3, receiptType=2, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=3, cycleNumber=1, activationId=39, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=3, amount=8000000, timestamp=1784644291
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=120000000
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=34, cycleNumber=1, activationId=39, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=34, linePaymentNumber=8
- 23. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=34, amount=20000000, timestamp=1784644291
- 24. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=34, line=3, linePaymentNumber=8, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=39, level=3, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=39, level=3, receiptType=3, fromUser=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=1, mirroredPosition=34, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=39, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=39, user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, price=40000000

## 40. MEMBER_12 registers under BOB_ORBIT_OWNER

Transaction: `0x64b27bba8406d7dd99ef477960d807baf852020dbf09ac04af7779cde1142895`
Block: 3543

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, position=4, amount=10000000, timestamp=1784644294
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=3
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, orbitType=4, sourcePosition=4, sourceCycle=3, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=40
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=4, cycleNumber=1, activationId=40, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=4, linePaymentNumber=4
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, amount=9000000, timestamp=1784644294
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=4, line=1, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=9000000
- 15. p4.OrbitReset: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, cycleNumber=1
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=0
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=40, level=1, receiptType=4, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=3, mirroredPosition=4, mirroredCycle=1, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=0
- 18. levelManager.RecycleCompletedDetailed: activationId=40, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), sourcePosition=4, sourceCycle=3, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=0, recycleEscrowLocked=0, mirrorPosition=4, mirrorCycle=1, triggeredOrbitReset=false
- 19. p4.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, position=2, cycleNumber=1, activationId=40, isMirror=true
- 20. p4.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, line=1, position=2, linePaymentNumber=2
- 21. p4.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, amount=9000000, timestamp=1784644294
- 22. p4.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 40. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 41. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=40, level=1, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=4, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 42. levelManager.RecycleCompletedDetailed: activationId=40, orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, sourceUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=4, sourceCycle=1, recycleReceiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=1, triggeredOrbitReset=false
- 47. levelManager.SystemChargeDistributedDetailed: activationId=40, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 48. levelManager.ActivationFinancialSummaryRecorded: activationId=40, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 49. levelManager.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, amount=10000000
- 50. levelManager.LevelActivatedInOrbit: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 51. registration.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=1, price=10000000

## 41. MEMBER_12 activates Level 2

Transaction: `0x7728a0e71df3c327b998e8606b7534bb4cb650e57769e2a9601939090ba03e84`
Block: 3544

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
- 0xEd00171E28B55C3ba9bE26a474611755C860E6F0: -10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, cycleNumber=1, activationId=41, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=12, linePaymentNumber=9
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, line=2, linePaymentNumber=9, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, position=12, amount=20000000, timestamp=1784644295
- 6. p12.SpilloverPaid: from=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, amount=8000000
- 7. p12.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, cycleNumber=1
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, orbitType=12, sourcePosition=12, sourceCycle=1, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=41
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=3, cycleNumber=1, activationId=41, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, position=3, amount=8000000, timestamp=1784644295
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=2, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=41, level=2, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=41, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=2, cycleNumber=1, activationId=41, isMirror=true
- 23. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=1, position=2, linePaymentNumber=2
- 24. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 25. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=2, amount=20000000, timestamp=1784644295
- 26. p12.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 28. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=41, level=2, receiptType=4, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 30. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=7, cycleNumber=1, activationId=41, isMirror=true
- 31. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=2, position=7, linePaymentNumber=2
- 32. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=7, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 33. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=7, amount=10000000, timestamp=1784644295
- 51. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 52. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=41, level=2, receiptType=4, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=4, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 53. levelManager.RecycleCompletedDetailed: activationId=41, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, sourceUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), sourcePosition=12, sourceCycle=1, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=20000000, recycleLiquidPaid=18000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=1, triggeredOrbitReset=false
- 58. levelManager.SystemChargeDistributedDetailed: activationId=41, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 59. levelManager.ActivationFinancialSummaryRecorded: activationId=41, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=26000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 60. levelManager.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, amount=20000000
- 61. levelManager.LevelActivatedInOrbit: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 62. registration.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=2, price=20000000

## 42. MEMBER_12 activates Level 3

Transaction: `0xb3b7d6e7db4c4b4ef4f23e8b78cc7188e5d0bc2ab01c5322aad67a9c9cbb7b8c`
Block: 3545

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- ALICE_SPONSOR: +20.0 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_12: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=12, cycleNumber=1, activationId=42, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=2, position=12, linePaymentNumber=9
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=12, line=2, linePaymentNumber=9, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=12, amount=40000000, timestamp=1784644296
- 6. p39.SpilloverPaid: from=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, amount=20000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=42, level=3, receiptType=2, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=3, cycleNumber=1, activationId=42, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=3, amount=8000000, timestamp=1784644296
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=128000000
- 21. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=37, cycleNumber=1, activationId=42, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=3, position=37, linePaymentNumber=9
- 23. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=37, amount=20000000, timestamp=1784644296
- 24. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=37, line=3, linePaymentNumber=9, toOwner=20000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=42, level=3, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=42, level=3, receiptType=3, fromUser=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=1, mirroredPosition=37, mirroredCycle=1, routedRole=3, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=42, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=42, user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, price=40000000

## 43. MEMBER_13 registers under BOB_ORBIT_OWNER

Transaction: `0xfc0f463dd6b56daae374b1170727da7e0cc89415f26e2e7dfe9e596c13c301b1`
Block: 3548

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, position=1, amount=10000000, timestamp=1784644299
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=43, level=1, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=43, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=43, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=1, price=10000000

## 44. MEMBER_13 activates Level 2

Transaction: `0xab6b3332043c492c440b49e39a23b5f0895356c0376a4985f38007cda087b545`
Block: 3549

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=1, amount=20000000, timestamp=1784644300
- 6. p12.SpilloverPaid: from=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=44, level=2, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=5, cycleNumber=1, activationId=44, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=5, linePaymentNumber=4
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=5, amount=10000000, timestamp=1784644300
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=5, line=2, linePaymentNumber=4, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=44, level=2, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=2, mirroredPosition=5, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=44, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=44, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, price=20000000

## 45. MEMBER_13 activates Level 3

Transaction: `0xeb351254bcabb32b071792348648bc3899e649d100f34a206b2551641acd4025`
Block: 3550

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- MEMBER_04: +8.0 USDT
- MEMBER_13: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +28.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=13, cycleNumber=1, activationId=45, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=13, linePaymentNumber=1
- 5. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=13, line=3, linePaymentNumber=1, toOwner=0, toSpillover1=8000000, toSpillover2=8000000, toEscrow=20000000, toRecycle=0
- 6. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, position=13, amount=40000000, timestamp=1784644301
- 7. p39.SpilloverPaid: from=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), to=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, amount=8000000
- 8. p39.SpilloverPaid: from=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=45, level=3, receiptType=2, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=13, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 12. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, orbitType=39, sourcePosition=13, sourceCycle=1, expectedAmount=20000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=45
- 16. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=20000000, newLockedTotal=60000000, currentEscrowLockedGlobal=148000000
- 17. p39.PositionActivationLinked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=1, cycleNumber=1, activationId=45, isMirror=true
- 18. p39.LinePaymentTracked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, line=1, position=1, linePaymentNumber=1
- 19. p39.PositionFilled: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, position=1, amount=8000000, timestamp=1784644301
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=4, cycleNumber=1, activationId=45, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=4, linePaymentNumber=1
- 24. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, position=4, amount=8000000, timestamp=1784644301
- 25. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=4, line=2, linePaymentNumber=1, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 29. escrow.EscrowLocked: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=16000000, currentEscrowLockedGlobal=156000000
- 31. levelManager.PayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 32. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), activationId=45, level=3, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=13, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 34. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=45, level=3, receiptType=3, fromUser=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=13, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 38. levelManager.SystemChargeDistributedDetailed: activationId=45, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 39. levelManager.ActivationFinancialSummaryRecorded: activationId=45, user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=8000000, totalEscrowLocked=28000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 40. levelManager.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, amount=40000000
- 41. levelManager.LevelActivatedInOrbit: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 42. registration.LevelActivated: user=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=3, price=40000000

## 46. MEMBER_14 registers under BOB_ORBIT_OWNER

Transaction: `0xb37e83bf5d9deeb20f590b6d0495dcc847b93aed38378ecc83ac473940b3319c`
Block: 3553

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, position=2, amount=10000000, timestamp=1784644304
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=46, level=1, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=46, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=46, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=1, price=10000000

## 47. MEMBER_14 activates Level 2

Transaction: `0xbfc8b6c2691e46c2cea3d813f98f4d4acf5c16d29dc06e087faa05988772c342`
Block: 3554

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=2, amount=20000000, timestamp=1784644305
- 6. p12.SpilloverPaid: from=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=47, level=2, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=8, cycleNumber=1, activationId=47, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=8, linePaymentNumber=5
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=8, amount=10000000, timestamp=1784644305
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=8, line=2, linePaymentNumber=5, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=47, level=2, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=2, mirroredPosition=8, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=47, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=47, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, price=20000000

## 48. MEMBER_14 activates Level 3

Transaction: `0xc35db76dd14eaf074509755e1a8e9d2f1401bbd5d80c9225cbe9ec7d6c0e7457`
Block: 3555

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
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: -52.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=14, cycleNumber=1, activationId=48, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=14, linePaymentNumber=2
- 5. p39.AutoUpgradeTriggered: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=80000000
- 6. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=14, line=3, linePaymentNumber=2, toOwner=0, toSpillover1=8000000, toSpillover2=8000000, toEscrow=20000000, toRecycle=0
- 7. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, position=14, amount=40000000, timestamp=1784644306
- 8. p39.SpilloverPaid: from=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), to=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, amount=8000000
- 9. p39.SpilloverPaid: from=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 11. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 12. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=48, level=3, receiptType=2, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=14, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=20000000, liquidPaid=0
- 13. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, orbitType=39, sourcePosition=14, sourceCycle=1, expectedAmount=20000000, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x455343524f575f494e53544541445f4f465f4c49515549440000000000000000, actionCode=0x4e4f5f414354494f4e0000000000000000000000000000000000000000000000, activationId=48
- 17. escrow.EscrowLocked: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=20000000, newLockedTotal=80000000, currentEscrowLockedGlobal=176000000
- 18. p39.PositionActivationLinked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=1, cycleNumber=1, activationId=48, isMirror=true
- 19. p39.LinePaymentTracked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, line=1, position=1, linePaymentNumber=1
- 20. p39.PositionFilled: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, position=1, amount=8000000, timestamp=1784644306
- 21. p39.PaymentRuleApplied: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=4, cycleNumber=1, activationId=48, isMirror=true
- 23. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=4, linePaymentNumber=1
- 25. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, position=4, amount=8000000, timestamp=1784644306
- 26. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=4, line=2, linePaymentNumber=1, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 30. escrow.EscrowLocked: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=16000000, currentEscrowLockedGlobal=184000000
- 32. levelManager.PayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), activationId=48, level=3, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=14, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 34. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 35. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=48, level=3, receiptType=3, fromUser=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=14, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 39. levelManager.SystemChargeDistributedDetailed: activationId=48, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 40. levelManager.ActivationFinancialSummaryRecorded: activationId=48, user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=8000000, totalEscrowLocked=28000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 41. levelManager.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, amount=40000000
- 42. levelManager.LevelActivatedInOrbit: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 45. escrow.EscrowUsedForUpgrade: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, amount=80000000, recipient=0xEd00171E28B55C3ba9bE26a474611755C860E6F0, currentEscrowLockedGlobal=104000000
- 47. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=80000000, actualReceiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), actualAmount=80000000, receiptType=2, routedRole=0x4f574e4552000000000000000000000000000000000000000000000000000000, reasonCode=0x4944315f46414c4c4241434b0000000000000000000000000000000000000000, actionCode=0x41435449564154455f4c4556454c000000000000000000000000000000000000, activationId=49
- 65. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=4, receiptType=1, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), grossAmount=72000000, escrowLocked=0, liquidPaid=72000000
- 66. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=49, level=4, receiptType=1, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), sourcePosition=0, sourceCycle=0, mirroredPosition=0, mirroredCycle=0, routedRole=5, grossAmount=72000000, escrowLocked=0, liquidPaid=72000000
- 70. levelManager.SystemChargeDistributedDetailed: activationId=49, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, systemChargeTotal=8000000, nftPoolAmount=6400000, operationsAmount=1600000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 71. levelManager.ActivationFinancialSummaryRecorded: activationId=49, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, activationAmount=80000000, systemCharge=8000000, nftPoolAmount=6400000, operationsAmount=1600000, totalLiquidPaid=72000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=true, isFounderRepFreeActivation=false
- 72. levelManager.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, amount=80000000
- 73. levelManager.LevelActivatedInOrbit: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=80000000
- 74. registration.LevelActivated: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=4, price=80000000
- 75. registration.AutoUpgradeTriggered: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4
- 76. levelManager.AutoUpgradeTriggered: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4
- 77. levelManager.AutoUpgradeCompleted: activationId=49, user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), fromLevel=3, toLevel=4, requiredAmount=80000000, usedAmount=80000000, escrowBefore=80000000, escrowAfter=0
- 78. registration.LevelActivated: user=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=3, price=40000000

## 49. MEMBER_15 registers under BOB_ORBIT_OWNER

Transaction: `0xaed7f9c8fd0eba1871da0b354078c4217bd5b8f3df5c1399b3fb558a68d60035`
Block: 3558

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, position=3, amount=10000000, timestamp=1784644309
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=50, level=1, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=50, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=50, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=1, price=10000000

## 50. MEMBER_15 activates Level 2

Transaction: `0xae89b52412c2f67f81d80dc85ed559c55bbf45a65179989c0e5108a446787b78`
Block: 3559

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=3, amount=20000000, timestamp=1784644310
- 6. p12.SpilloverPaid: from=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=51, level=2, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=11, cycleNumber=1, activationId=51, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=11, linePaymentNumber=6
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=11, amount=10000000, timestamp=1784644310
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=11, line=2, linePaymentNumber=6, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=51, level=2, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=2, mirroredPosition=11, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=51, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=51, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, price=20000000

## 51. MEMBER_15 activates Level 3

Transaction: `0xfbfababb921e5838c0e983d225c280224e3ca5d14b5b010e26ae49fa23cfecf9`
Block: 3560

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_06: +8.0 USDT
- MEMBER_15: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=15, cycleNumber=1, activationId=52, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=15, linePaymentNumber=3
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=15, line=3, linePaymentNumber=3, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, position=15, amount=40000000, timestamp=1784644311
- 6. p39.SpilloverPaid: from=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), to=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=52, level=3, receiptType=2, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=15, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=1, cycleNumber=1, activationId=52, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, position=1, amount=8000000, timestamp=1784644311
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=4, cycleNumber=1, activationId=52, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=4, linePaymentNumber=1
- 19. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, position=4, amount=8000000, timestamp=1784644311
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=4, line=2, linePaymentNumber=1, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=16000000, currentEscrowLockedGlobal=112000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), activationId=52, level=3, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=15, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=52, level=3, receiptType=3, fromUser=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=15, sourceCycle=1, mirroredPosition=4, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=52, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=52, user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=3, price=40000000

## 52. MEMBER_16 registers under BOB_ORBIT_OWNER

Transaction: `0xa77505889f678e748aea3f3e108835af7f574b57be3aa994ed01a35be5b36cc5`
Block: 3563

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, position=4, amount=10000000, timestamp=1784644314
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=4
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, orbitType=4, sourcePosition=4, sourceCycle=4, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=53
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, cycleNumber=2, activationId=53, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=1, linePaymentNumber=1
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, amount=9000000, timestamp=1784644314
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=53, level=1, receiptType=4, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=4, mirroredPosition=1, mirroredCycle=2, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.RecycleCompletedDetailed: activationId=53, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), sourcePosition=4, sourceCycle=4, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=1, mirrorCycle=2, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=53, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=53, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=1, price=10000000

## 53. MEMBER_16 activates Level 2

Transaction: `0x2645c725f6b4ab845bb1ae124382e0ad0f63ef851d51e92e23eb1ec6f03329ca`
Block: 3564

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, position=4, amount=20000000, timestamp=1784644315
- 6. p12.SpilloverPaid: from=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), to=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=54, level=2, receiptType=2, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=1, cycleNumber=1, activationId=54, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, position=1, amount=8000000, timestamp=1784644315
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), activationId=54, level=2, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=2, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=54, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=54, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=2, price=20000000

## 54. MEMBER_16 activates Level 3

Transaction: `0xb1d4b749a60364a3bcb985bdb748ed8c5d7f667f783d0a86a6197bf6b906c4f0`
Block: 3565

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_07: +8.0 USDT
- MEMBER_16: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=16, cycleNumber=1, activationId=55, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=16, linePaymentNumber=4
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=16, line=3, linePaymentNumber=4, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, position=16, amount=40000000, timestamp=1784644316
- 6. p39.SpilloverPaid: from=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), to=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=55, level=3, receiptType=2, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=16, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=1, cycleNumber=1, activationId=55, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, position=1, amount=8000000, timestamp=1784644316
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=5, cycleNumber=1, activationId=55, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=5, linePaymentNumber=2
- 19. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, position=5, amount=8000000, timestamp=1784644316
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=5, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=24000000, currentEscrowLockedGlobal=120000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), activationId=55, level=3, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=16, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=55, level=3, receiptType=3, fromUser=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=16, sourceCycle=1, mirroredPosition=5, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=55, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=55, user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_16 (0x0095026Db01221aCEA4E91EF319eE4841dCE6D06), level=3, price=40000000

## 55. MEMBER_17 registers under BOB_ORBIT_OWNER

Transaction: `0x5bb8773934940fe0b6ea10c362a0e0286814e9607dd19fc18c45a2da63073140`
Block: 3568

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, position=1, amount=10000000, timestamp=1784644319
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=56, level=1, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=5, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=56, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=56, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=1, price=10000000

## 56. MEMBER_17 activates Level 2

Transaction: `0x652e78a2fb7c4ffc1c088c45fe93a991bfe919edce863adefcf2432dcac693f1`
Block: 3569

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, position=5, amount=20000000, timestamp=1784644320
- 6. p12.SpilloverPaid: from=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), to=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=57, level=2, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=1, cycleNumber=1, activationId=57, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, position=1, amount=8000000, timestamp=1784644320
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), activationId=57, level=2, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=2, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=57, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=57, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=2, price=20000000

## 57. MEMBER_17 activates Level 3

Transaction: `0x199a64b89044d2c1db50ea40153216e2bb0c92a67b76e9483cbf2825ededcb5b`
Block: 3570

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_08: +8.0 USDT
- MEMBER_17: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=17, cycleNumber=1, activationId=58, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=17, linePaymentNumber=5
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=17, line=3, linePaymentNumber=5, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, position=17, amount=40000000, timestamp=1784644321
- 6. p39.SpilloverPaid: from=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), to=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=58, level=3, receiptType=2, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=17, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=1, cycleNumber=1, activationId=58, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, position=1, amount=8000000, timestamp=1784644321
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=5, cycleNumber=1, activationId=58, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=5, linePaymentNumber=2
- 19. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, position=5, amount=8000000, timestamp=1784644321
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=5, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=24000000, currentEscrowLockedGlobal=128000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), activationId=58, level=3, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=17, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=58, level=3, receiptType=3, fromUser=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=17, sourceCycle=1, mirroredPosition=5, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=58, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=58, user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_17 (0x3d881281a53A05347b83cA1fE4Fac04e50645bc6), level=3, price=40000000

## 58. MEMBER_18 registers under BOB_ORBIT_OWNER

Transaction: `0xcc4f9c1413e5d7cdeef887bff09ca301032849642777cbdc95e4f5129005e0f8`
Block: 3573

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, position=2, amount=10000000, timestamp=1784644324
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=59, level=1, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=5, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=59, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=59, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=1, price=10000000

## 59. MEMBER_18 activates Level 2

Transaction: `0x95533a512288fce1d24d38d8926b7d2f6c2649518b8c648d63bffd2efbc7290e`
Block: 3574

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, position=6, amount=20000000, timestamp=1784644325
- 6. p12.SpilloverPaid: from=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), to=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=60, level=2, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=1, cycleNumber=1, activationId=60, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, position=1, amount=8000000, timestamp=1784644325
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), activationId=60, level=2, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=2, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=60, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=60, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=2, price=20000000

## 60. MEMBER_18 activates Level 3

Transaction: `0x44bfc4ef46790816e48d957cacf60aeb94f67f7db771dd08b0f59928fbf1501e`
Block: 3575

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_09: +8.0 USDT
- MEMBER_18: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=18, cycleNumber=1, activationId=61, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=18, linePaymentNumber=6
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=18, line=3, linePaymentNumber=6, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, position=18, amount=40000000, timestamp=1784644326
- 6. p39.SpilloverPaid: from=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), to=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=61, level=3, receiptType=2, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=18, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=1, cycleNumber=1, activationId=61, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, position=1, amount=8000000, timestamp=1784644326
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=5, cycleNumber=1, activationId=61, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=5, linePaymentNumber=2
- 19. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, position=5, amount=8000000, timestamp=1784644326
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=5, line=2, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=24000000, currentEscrowLockedGlobal=136000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), activationId=61, level=3, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=18, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=61, level=3, receiptType=3, fromUser=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=18, sourceCycle=1, mirroredPosition=5, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=61, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=61, user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_18 (0x9740C4dc8b0C6aec9c13BC01C5c3C3bde69517Bc), level=3, price=40000000

## 61. MEMBER_19 registers under BOB_ORBIT_OWNER

Transaction: `0x68f1452fadf171d12a05496ccbfc68594b462db6c5f1c28b5cc3abe5656bd2d1`
Block: 3578

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, position=3, amount=10000000, timestamp=1784644329
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=62, level=1, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=5, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=62, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=62, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=1, price=10000000

## 62. MEMBER_19 activates Level 2

Transaction: `0xc560f302f5295fd00f5fe27547b23b62bb9779661820476dbadf7a0335c9df3a`
Block: 3579

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, position=7, amount=20000000, timestamp=1784644330
- 6. p12.SpilloverPaid: from=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), to=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=63, level=2, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=2, cycleNumber=1, activationId=63, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, position=2, amount=8000000, timestamp=1784644330
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), activationId=63, level=2, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=2, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=63, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=63, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=2, price=20000000

## 63. MEMBER_19 activates Level 3

Transaction: `0x1f1d1ef171959337207c2a533b748a1eafa7d3b98cba86a947e0a87c3fe52c3b`
Block: 3580

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_10: +8.0 USDT
- MEMBER_19: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=19, cycleNumber=1, activationId=64, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=19, linePaymentNumber=7
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=19, line=3, linePaymentNumber=7, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, position=19, amount=40000000, timestamp=1784644331
- 6. p39.SpilloverPaid: from=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), to=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=64, level=3, receiptType=2, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=19, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=1, cycleNumber=1, activationId=64, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, position=1, amount=8000000, timestamp=1784644331
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=6, cycleNumber=1, activationId=64, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=6, linePaymentNumber=3
- 19. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, position=6, amount=8000000, timestamp=1784644331
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=6, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=32000000, currentEscrowLockedGlobal=144000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), activationId=64, level=3, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=19, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=64, level=3, receiptType=3, fromUser=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=19, sourceCycle=1, mirroredPosition=6, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=64, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=64, user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_19 (0x6E6d5b684d5A1d82cB9696563e10e5C0775E996D), level=3, price=40000000

## 64. MEMBER_20 registers under BOB_ORBIT_OWNER

Transaction: `0x869879f1f7566fe97f6c2a9f4a40c0f1c06b4dccf80573023861595bc6b417ee`
Block: 3583

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, position=4, amount=10000000, timestamp=1784644334
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=5
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, orbitType=4, sourcePosition=4, sourceCycle=5, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=65
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, cycleNumber=2, activationId=65, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=2, linePaymentNumber=2
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, amount=9000000, timestamp=1784644334
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=65, level=1, receiptType=4, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=5, mirroredPosition=2, mirroredCycle=2, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.RecycleCompletedDetailed: activationId=65, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), sourcePosition=4, sourceCycle=5, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=2, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=65, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=65, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=1, price=10000000

## 65. MEMBER_20 activates Level 2

Transaction: `0xc52b7cce75f3abaae97352bb0f6ccfafd601f71fa16c7822d1b57f8dbb2437e1`
Block: 3584

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, position=8, amount=20000000, timestamp=1784644335
- 6. p12.SpilloverPaid: from=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), to=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=66, level=2, receiptType=2, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=2, cycleNumber=1, activationId=66, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, position=2, amount=8000000, timestamp=1784644335
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), activationId=66, level=2, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=2, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=66, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=66, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=2, price=20000000

## 66. MEMBER_20 activates Level 3

Transaction: `0x6ace3f01829f7f3989993c68e4c801f824796bfd77596b37277b92b0c3514b52`
Block: 3585

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_11: +8.0 USDT
- MEMBER_20: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=20, cycleNumber=1, activationId=67, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=20, linePaymentNumber=8
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=20, line=3, linePaymentNumber=8, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, position=20, amount=40000000, timestamp=1784644336
- 6. p39.SpilloverPaid: from=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), to=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=67, level=3, receiptType=2, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=20, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=1, cycleNumber=1, activationId=67, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, position=1, amount=8000000, timestamp=1784644336
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=6, cycleNumber=1, activationId=67, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=6, linePaymentNumber=3
- 19. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, position=6, amount=8000000, timestamp=1784644336
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=6, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=32000000, currentEscrowLockedGlobal=152000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), activationId=67, level=3, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=20, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=67, level=3, receiptType=3, fromUser=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=20, sourceCycle=1, mirroredPosition=6, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=67, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=67, user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_20 (0x2Cc0F87aAAF781007CC93E51Aa1275e47Ac9d3a5), level=3, price=40000000

## 67. MEMBER_21 registers under BOB_ORBIT_OWNER

Transaction: `0xbc245e801a826944345d131f40d693c63b1f45be420b5b553c214ec809506f1b`
Block: 3588

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, position=1, amount=10000000, timestamp=1784644339
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=68, level=1, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=6, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=68, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=68, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=1, price=10000000

## 68. MEMBER_21 activates Level 2

Transaction: `0x05e327046846c29bc64b2d1ce308d50967f47889a9f2cb12944ece3315bb19f8`
Block: 3589

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, position=9, amount=20000000, timestamp=1784644340
- 6. p12.SpilloverPaid: from=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), to=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=69, level=2, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=2, cycleNumber=1, activationId=69, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, position=2, amount=8000000, timestamp=1784644340
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), activationId=69, level=2, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=2, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=69, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=69, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=2, price=20000000

## 69. MEMBER_21 activates Level 3

Transaction: `0x97813c302eab1b851cd7a153f714ef2b1bd8af090e18a2ebb58deb8327d03e49`
Block: 3590

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_12: +8.0 USDT
- MEMBER_21: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=21, cycleNumber=1, activationId=70, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=21, linePaymentNumber=9
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=21, line=3, linePaymentNumber=9, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, position=21, amount=40000000, timestamp=1784644341
- 6. p39.SpilloverPaid: from=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), to=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=70, level=3, receiptType=2, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=21, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=1, cycleNumber=1, activationId=70, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, line=1, position=1, linePaymentNumber=1
- 14. p39.PositionFilled: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, position=1, amount=8000000, timestamp=1784644341
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=6, cycleNumber=1, activationId=70, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=6, linePaymentNumber=3
- 19. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, position=6, amount=8000000, timestamp=1784644341
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=6, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=32000000, currentEscrowLockedGlobal=160000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), activationId=70, level=3, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=21, sourceCycle=1, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=70, level=3, receiptType=3, fromUser=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=21, sourceCycle=1, mirroredPosition=6, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=70, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=70, user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_21 (0xFf6eA90343B65A54ceee25C2CdEd5a86299Ee8F1), level=3, price=40000000

## 70. MEMBER_22 registers under BOB_ORBIT_OWNER

Transaction: `0x28378e328e8a3986b020fbd9c5f6d790332f8d76cbb0aba914d073e466f6fe7c`
Block: 3593

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, position=2, amount=10000000, timestamp=1784644344
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=71, level=1, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=6, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=71, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=71, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=1, price=10000000

## 71. MEMBER_22 activates Level 2

Transaction: `0x4058844d8bb2500811e5a6351dff75152963dbe0397cf227c535beceb0948e98`
Block: 3594

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, position=10, amount=20000000, timestamp=1784644345
- 6. p12.SpilloverPaid: from=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), to=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=72, level=2, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=2, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=3, cycleNumber=1, activationId=72, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, position=3, amount=8000000, timestamp=1784644345
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), level=2, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_13 (0x81C7Ec5A92FcD48CB61B471C4148923E5866E965), activationId=72, level=2, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=72, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=72, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=2, price=20000000

## 72. MEMBER_22 activates Level 3

Transaction: `0xd9adbdb54ecc089aab51e8b24bebb8e5771c809149f6d571f74c319e8022e208`
Block: 3595

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_04: +8.0 USDT
- MEMBER_22: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=22, cycleNumber=1, activationId=73, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=22, linePaymentNumber=10
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=22, line=3, linePaymentNumber=10, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, position=22, amount=40000000, timestamp=1784644346
- 6. p39.SpilloverPaid: from=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), to=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=73, level=3, receiptType=2, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=22, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=2, cycleNumber=1, activationId=73, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, position=2, amount=8000000, timestamp=1784644346
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=7, cycleNumber=1, activationId=73, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=7, linePaymentNumber=4
- 19. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, position=7, amount=8000000, timestamp=1784644346
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=7, line=2, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=40000000, currentEscrowLockedGlobal=168000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), activationId=73, level=3, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=22, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=73, level=3, receiptType=3, fromUser=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=22, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=73, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=73, user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_22 (0xb4f02A49e5452Ae992c00c9AC2B6439b23737FD1), level=3, price=40000000

## 73. MEMBER_23 registers under BOB_ORBIT_OWNER

Transaction: `0x660d276df23a9866e3bb8b1c8e9ca8c894fa453f7688e9ba6d64b58b8489d464`
Block: 3598

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, position=3, amount=10000000, timestamp=1784644349
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=74, level=1, receiptType=2, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=6, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=74, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=74, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=1, price=10000000

## 74. MEMBER_23 activates Level 2

Transaction: `0x85dd58456c271c8fe711e8c9689f1d15cf5f1293761afd852bf6608869b16d30`
Block: 3599

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- MEMBER_14: +8.0 USDT
- MEMBER_23: -20.0 USDT
- 0xEd00171E28B55C3ba9bE26a474611755C860E6F0: +10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, cycleNumber=2, activationId=75, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=11, linePaymentNumber=8
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, line=2, linePaymentNumber=8, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, position=11, amount=20000000, timestamp=1784644350
- 6. p12.SpilloverPaid: from=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), to=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, amount=8000000
- 8. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, orbitType=12, sourcePosition=11, sourceCycle=2, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=75
- 10. p12.PositionActivationLinked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=3, cycleNumber=1, activationId=75, isMirror=true
- 11. p12.LinePaymentTracked: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, line=1, position=3, linePaymentNumber=3
- 12. p12.PositionFilled: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, position=3, amount=8000000, timestamp=1784644350
- 13. p12.PaymentRuleApplied: orbitOwner=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 15. levelManager.PayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), level=2, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 16. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_14 (0xe6C5eB487c61cD59b8FA5BdB6095f4dFB4Eb7C80), activationId=75, level=2, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=75, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=75, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=8000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=2, price=20000000

## 75. MEMBER_23 activates Level 3

Transaction: `0xae68d3f1e81c8dd61f39c5e22445afde9c014d535c82102b1076cb13bcdf7ea4`
Block: 3600

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_05: +8.0 USDT
- MEMBER_23: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=23, cycleNumber=1, activationId=76, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=23, linePaymentNumber=11
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=23, line=3, linePaymentNumber=11, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, position=23, amount=40000000, timestamp=1784644351
- 6. p39.SpilloverPaid: from=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), to=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=76, level=3, receiptType=2, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=23, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=2, cycleNumber=1, activationId=76, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, position=2, amount=8000000, timestamp=1784644351
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=7, cycleNumber=1, activationId=76, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=7, linePaymentNumber=4
- 19. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, position=7, amount=8000000, timestamp=1784644351
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=7, line=2, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=40000000, currentEscrowLockedGlobal=176000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), activationId=76, level=3, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=23, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=76, level=3, receiptType=3, fromUser=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=23, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=76, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=76, user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_23 (0x16d8A0bACFF251Ff40C6B2B21e5AfDAc6c870830), level=3, price=40000000

## 76. MEMBER_24 registers under BOB_ORBIT_OWNER

Transaction: `0xdf3b6b115768e5c011e201e51ede03e6ac195146d165d0b912d1db4c0e152682`
Block: 3603

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, position=4, amount=10000000, timestamp=1784644354
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=6
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, orbitType=4, sourcePosition=4, sourceCycle=6, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=77
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=3, cycleNumber=2, activationId=77, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=3, linePaymentNumber=3
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=3, amount=9000000, timestamp=1784644354
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=77, level=1, receiptType=4, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=6, mirroredPosition=3, mirroredCycle=2, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.RecycleCompletedDetailed: activationId=77, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), sourcePosition=4, sourceCycle=6, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=3, mirrorCycle=2, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=77, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=77, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=1, price=10000000

## 77. MEMBER_24 activates Level 2

Transaction: `0x1c7a8a1117fa56953fb29a2dea78156687ebec6da8ec91d03cda070e5c385258`
Block: 3604

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
- 0xEd00171E28B55C3ba9bE26a474611755C860E6F0: -10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, cycleNumber=2, activationId=78, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=12, linePaymentNumber=9
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, line=2, linePaymentNumber=9, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, position=12, amount=20000000, timestamp=1784644355
- 6. p12.SpilloverPaid: from=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), to=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, amount=8000000
- 7. p12.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, cycleNumber=2
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, orbitType=12, sourcePosition=12, sourceCycle=2, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=78
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=3, cycleNumber=1, activationId=78, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, position=3, amount=8000000, timestamp=1784644355
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), level=2, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_15 (0x9D6d5e28EeF91B4b94BA3b15Eb73de61A4BBC34D), activationId=78, level=2, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=78, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=3, cycleNumber=1, activationId=78, isMirror=true
- 23. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=1, position=3, linePaymentNumber=3
- 24. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 25. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=3, amount=20000000, timestamp=1784644355
- 26. p12.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 28. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=78, level=2, receiptType=4, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 30. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=10, cycleNumber=1, activationId=78, isMirror=true
- 31. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=2, position=10, linePaymentNumber=3
- 32. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=10, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 33. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=10, amount=10000000, timestamp=1784644355
- 51. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 52. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=78, level=2, receiptType=4, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=2, mirroredPosition=10, mirroredCycle=1, routedRole=4, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 53. levelManager.RecycleCompletedDetailed: activationId=78, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, sourceUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), sourcePosition=12, sourceCycle=2, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=20000000, recycleLiquidPaid=18000000, recycleEscrowLocked=0, mirrorPosition=3, mirrorCycle=1, triggeredOrbitReset=false
- 58. levelManager.SystemChargeDistributedDetailed: activationId=78, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 59. levelManager.ActivationFinancialSummaryRecorded: activationId=78, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=26000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 60. levelManager.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, amount=20000000
- 61. levelManager.LevelActivatedInOrbit: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 62. registration.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=2, price=20000000

## 78. MEMBER_24 activates Level 3

Transaction: `0x7921b2fea1f6a97c24e2afbdb2d50a3953871533ac533899af37f0bf60fbe34b`
Block: 3605

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_06: +8.0 USDT
- MEMBER_24: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=24, cycleNumber=1, activationId=79, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=24, linePaymentNumber=12
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=24, line=3, linePaymentNumber=12, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, position=24, amount=40000000, timestamp=1784644356
- 6. p39.SpilloverPaid: from=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), to=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=79, level=3, receiptType=2, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=24, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=2, cycleNumber=1, activationId=79, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, position=2, amount=8000000, timestamp=1784644356
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=7, cycleNumber=1, activationId=79, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=7, linePaymentNumber=4
- 19. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, position=7, amount=8000000, timestamp=1784644356
- 20. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=7, line=2, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 24. escrow.EscrowLocked: user=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=40000000, currentEscrowLockedGlobal=184000000
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), activationId=79, level=3, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=24, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=79, level=3, receiptType=3, fromUser=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=24, sourceCycle=1, mirroredPosition=7, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 33. levelManager.SystemChargeDistributedDetailed: activationId=79, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=79, user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_24 (0x0a305C6b38981D6a6569B43309Df062f93Ecb0F2), level=3, price=40000000

## 79. MEMBER_25 registers under BOB_ORBIT_OWNER

Transaction: `0x80882e9dd9f70643738ceb07db8b38bbfbc4fc03f8ae2d45455ea7da2c9921df`
Block: 3608

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, position=1, amount=10000000, timestamp=1784644359
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=80, level=1, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=7, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=80, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=80, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=1, price=10000000

## 80. MEMBER_25 activates Level 2

Transaction: `0xd8eab9d305107a47341083be7ec86a447869e2bbdab5df2732c2acd0c46373ce`
Block: 3609

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=1, amount=20000000, timestamp=1784644360
- 6. p12.SpilloverPaid: from=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=81, level=2, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=6, cycleNumber=1, activationId=81, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=6, linePaymentNumber=7
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=6, amount=10000000, timestamp=1784644360
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=6, line=2, linePaymentNumber=7, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=81, level=2, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=3, mirroredPosition=6, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=81, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=81, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, price=20000000

## 81. MEMBER_25 activates Level 3

Transaction: `0x34615885b7c70c7df41c91d192d43a115b977aeafacc2d923b9f149c108dc67d`
Block: 3610

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, position=25, amount=40000000, timestamp=1784644361
- 6. p39.SpilloverPaid: from=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), to=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=82, level=3, receiptType=2, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=25, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=2, cycleNumber=1, activationId=82, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, position=2, amount=8000000, timestamp=1784644361
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=8, cycleNumber=1, activationId=82, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=8, linePaymentNumber=5
- 18. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, position=8, amount=8000000, timestamp=1784644361
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=8, line=2, linePaymentNumber=5, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), activationId=82, level=3, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=25, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=82, level=3, receiptType=3, fromUser=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=25, sourceCycle=1, mirroredPosition=8, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=82, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=82, user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=3, price=40000000

## 82. MEMBER_26 registers under BOB_ORBIT_OWNER

Transaction: `0xc3061609eecf3f4f306943ccefd43697724c22d02d082f70a0fb57d0fd1aff40`
Block: 3613

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, position=2, amount=10000000, timestamp=1784644364
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=83, level=1, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=7, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=83, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=83, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=1, price=10000000

## 83. MEMBER_26 activates Level 2

Transaction: `0x47b9a03d4742f5cea664ca169ad16d36c06fe927fa9c22615417d4e95574e1b4`
Block: 3614

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- BOB_ORBIT_OWNER: +8.0 USDT
- MEMBER_26: -20.0 USDT
- 0xEd00171E28B55C3ba9bE26a474611755C860E6F0: +10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=2, cycleNumber=3, activationId=84, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=2, linePaymentNumber=2
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=2, amount=20000000, timestamp=1784644365
- 6. p12.SpilloverPaid: from=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=84, level=2, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=9, cycleNumber=1, activationId=84, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=9, linePaymentNumber=8
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=9, amount=10000000, timestamp=1784644365
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=9, line=2, linePaymentNumber=8, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=0
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=84, level=2, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=3, mirroredPosition=9, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=0
- 21. levelManager.SystemChargeDistributedDetailed: activationId=84, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=84, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=8000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, price=20000000

## 84. MEMBER_26 activates Level 3

Transaction: `0xe9a1bdb3c55ec7106db8bc6be80ffad552e6d00c57af0bcf003e464b76e0a9b9`
Block: 3615

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, position=26, amount=40000000, timestamp=1784644366
- 6. p39.SpilloverPaid: from=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), to=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=85, level=3, receiptType=2, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=26, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=2, cycleNumber=1, activationId=85, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, position=2, amount=8000000, timestamp=1784644366
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=8, cycleNumber=1, activationId=85, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=8, linePaymentNumber=5
- 18. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, position=8, amount=8000000, timestamp=1784644366
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=8, line=2, linePaymentNumber=5, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), activationId=85, level=3, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=26, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=85, level=3, receiptType=3, fromUser=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=26, sourceCycle=1, mirroredPosition=8, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=85, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=85, user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=3, price=40000000

## 85. MEMBER_27 registers under BOB_ORBIT_OWNER

Transaction: `0xce7415d175ae37cb44a33f395fc5bc446e3a05c2980e9893fd61803952b45b56`
Block: 3618

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, position=3, amount=10000000, timestamp=1784644369
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=86, level=1, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=7, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=86, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=86, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=1, price=10000000

## 86. MEMBER_27 activates Level 2

Transaction: `0x7e8f6e459182998ee59dc88f850b249fa1fce9bf290a0bc4c7b56b1263a2ecfd`
Block: 3619

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
- 0xEd00171E28B55C3ba9bE26a474611755C860E6F0: -10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=3, cycleNumber=3, activationId=87, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=1, position=3, linePaymentNumber=3
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=3, amount=20000000, timestamp=1784644370
- 6. p12.SpilloverPaid: from=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=87, level=2, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=12, cycleNumber=1, activationId=87, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=12, linePaymentNumber=9
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=12, amount=10000000, timestamp=1784644370
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=12, line=2, linePaymentNumber=9, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 15. p12.OrbitReset: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, cycleNumber=1
- 19. levelManager.SystemChargeDistributedDetailed: activationId=87, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 20. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=2, cycleNumber=1, activationId=87, isMirror=true
- 21. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=1, position=2, linePaymentNumber=2
- 22. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 23. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=2, amount=20000000, timestamp=1784644370
- 24. p12.SpilloverPaid: from=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 42. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 43. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=87, level=2, receiptType=4, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=12, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 44. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=3, cycleNumber=1, activationId=87, isMirror=true
- 45. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=1, position=3, linePaymentNumber=3
- 46. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 47. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=3, amount=10000000, timestamp=1784644370
- 65. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 66. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=87, level=2, receiptType=4, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=12, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=4, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 67. levelManager.RecycleCompletedDetailed: activationId=87, orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, sourceUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), sourcePosition=12, sourceCycle=1, recycleReceiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), recycleGross=20000000, recycleLiquidPaid=18000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=1, triggeredOrbitReset=false
- 68. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=0
- 69. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=87, level=2, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=3, mirroredPosition=12, mirroredCycle=1, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=0
- 73. levelManager.SystemChargeDistributedDetailed: activationId=87, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 74. levelManager.ActivationFinancialSummaryRecorded: activationId=87, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=8000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 75. levelManager.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, amount=20000000
- 76. levelManager.LevelActivatedInOrbit: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 77. registration.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, price=20000000

## 87. MEMBER_27 activates Level 3

Transaction: `0xf5e726202da56984447ea220e0e17138fd32a0496d7aba11622c836b6e542113`
Block: 3620

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, position=27, amount=40000000, timestamp=1784644371
- 6. p39.SpilloverPaid: from=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), to=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=88, level=3, receiptType=2, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=27, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=2, cycleNumber=1, activationId=88, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, position=2, amount=8000000, timestamp=1784644371
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=8, cycleNumber=1, activationId=88, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=8, linePaymentNumber=5
- 18. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, position=8, amount=8000000, timestamp=1784644371
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=8, line=2, linePaymentNumber=5, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), activationId=88, level=3, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=27, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=88, level=3, receiptType=3, fromUser=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=27, sourceCycle=1, mirroredPosition=8, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=88, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=88, user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=3, price=40000000

## 88. MEMBER_28 registers under BOB_ORBIT_OWNER

Transaction: `0x1b9c90746af9120a02a4edfccb414ef75eb78a08cb3667f5dc119af5b56118c0`
Block: 3623

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, position=4, amount=10000000, timestamp=1784644374
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=7
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, orbitType=4, sourcePosition=4, sourceCycle=7, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=89
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=4, cycleNumber=2, activationId=89, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=4, linePaymentNumber=4
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=4, amount=9000000, timestamp=1784644374
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=4, line=1, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=9000000
- 15. p4.OrbitReset: user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, cycleNumber=2
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=0
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=89, level=1, receiptType=4, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=7, mirroredPosition=4, mirroredCycle=2, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=0
- 18. levelManager.RecycleCompletedDetailed: activationId=89, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), sourcePosition=4, sourceCycle=7, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=0, recycleEscrowLocked=0, mirrorPosition=4, mirrorCycle=2, triggeredOrbitReset=false
- 19. p4.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, position=3, cycleNumber=1, activationId=89, isMirror=true
- 20. p4.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, line=1, position=3, linePaymentNumber=3
- 21. p4.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=3, amount=9000000, timestamp=1784644374
- 22. p4.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, position=3, line=1, linePaymentNumber=3, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 40. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=1, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 41. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=89, level=1, receiptType=4, fromUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=4, sourceCycle=2, mirroredPosition=3, mirroredCycle=1, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 42. levelManager.RecycleCompletedDetailed: activationId=89, orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, sourceUser=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), sourcePosition=4, sourceCycle=2, recycleReceiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=3, mirrorCycle=1, triggeredOrbitReset=false
- 47. levelManager.SystemChargeDistributedDetailed: activationId=89, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 48. levelManager.ActivationFinancialSummaryRecorded: activationId=89, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 49. levelManager.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, amount=10000000
- 50. levelManager.LevelActivatedInOrbit: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 51. registration.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=1, price=10000000

## 89. MEMBER_28 activates Level 2

Transaction: `0x880e7fa1a8b816c124a95b7920d7dfe8448ad52c139d943b199a16360776471d`
Block: 3624

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, position=4, amount=20000000, timestamp=1784644375
- 6. p12.SpilloverPaid: from=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), to=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=90, level=2, receiptType=2, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=1, cycleNumber=1, activationId=90, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, position=1, amount=8000000, timestamp=1784644375
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), activationId=90, level=2, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=3, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=90, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=90, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=2, price=20000000

## 90. MEMBER_28 activates Level 3

Transaction: `0xdca3c0be4efbbefe4a1f441539879bb37dcaa873025d1ef5152f22a3c4345f2d`
Block: 3625

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, position=28, amount=40000000, timestamp=1784644376
- 6. p39.SpilloverPaid: from=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), to=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=91, level=3, receiptType=2, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=28, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=2, cycleNumber=1, activationId=91, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, position=2, amount=8000000, timestamp=1784644376
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=9, cycleNumber=1, activationId=91, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=9, linePaymentNumber=6
- 18. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, position=9, amount=8000000, timestamp=1784644376
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=9, line=2, linePaymentNumber=6, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), activationId=91, level=3, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=28, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=91, level=3, receiptType=3, fromUser=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=28, sourceCycle=1, mirroredPosition=9, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=91, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=91, user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_28 (0x81560bf69A46E3E05443b05356E71178a317f647), level=3, price=40000000

## 91. MEMBER_29 registers under BOB_ORBIT_OWNER

Transaction: `0xbb80bb4bd2073dee3c7541696f3734a2c09bbbc85acb7376457b875a2ef94f42`
Block: 3628

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, position=1, amount=10000000, timestamp=1784644379
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=92, level=1, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=8, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=92, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=92, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=1, price=10000000

## 92. MEMBER_29 activates Level 2

Transaction: `0xa4ec77961a81aa3658b09af69f7553f35f109abcfccd4775049dc9a7324a084c`
Block: 3629

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, position=5, amount=20000000, timestamp=1784644380
- 6. p12.SpilloverPaid: from=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), to=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=93, level=2, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=1, cycleNumber=1, activationId=93, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, position=1, amount=8000000, timestamp=1784644380
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), activationId=93, level=2, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=5, sourceCycle=3, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=93, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=93, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=2, price=20000000

## 93. MEMBER_29 activates Level 3

Transaction: `0xcf06102f01f6323109b70dec0428ca6f8d0fd35069c643ae6d47c2523d9f2b3e`
Block: 3630

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, position=29, amount=40000000, timestamp=1784644381
- 6. p39.SpilloverPaid: from=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), to=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=94, level=3, receiptType=2, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=29, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=2, cycleNumber=1, activationId=94, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, position=2, amount=8000000, timestamp=1784644381
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=9, cycleNumber=1, activationId=94, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=9, linePaymentNumber=6
- 18. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, position=9, amount=8000000, timestamp=1784644381
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=9, line=2, linePaymentNumber=6, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), activationId=94, level=3, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=29, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=94, level=3, receiptType=3, fromUser=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=29, sourceCycle=1, mirroredPosition=9, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=94, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=94, user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_29 (0xe06CE33fe48cc152baf13859691445160D742bB4), level=3, price=40000000

## 94. MEMBER_30 registers under BOB_ORBIT_OWNER

Transaction: `0xbd365d2fd24afe02f636f1df5e7b57239f3cf14653dd2d30e22c45b91ea02132`
Block: 3633

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, position=2, amount=10000000, timestamp=1784644384
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=95, level=1, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=8, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=95, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=95, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=1, price=10000000

## 95. MEMBER_30 activates Level 2

Transaction: `0xb026fdd9655188ee17c6d218f4cd54174c488462f3a2802cf3f7b774fa109df4`
Block: 3634

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, position=6, amount=20000000, timestamp=1784644385
- 6. p12.SpilloverPaid: from=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), to=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=96, level=2, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=1, cycleNumber=1, activationId=96, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, line=1, position=1, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, position=1, amount=8000000, timestamp=1784644385
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), activationId=96, level=2, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=6, sourceCycle=3, mirroredPosition=1, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=96, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=96, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=2, price=20000000

## 96. MEMBER_30 activates Level 3

Transaction: `0xcf864bc95a03f4a419b4f952b9f1567e1896b9ae229999c2f7247b3b0d29718e`
Block: 3635

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
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, position=30, amount=40000000, timestamp=1784644386
- 6. p39.SpilloverPaid: from=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), to=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=97, level=3, receiptType=2, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=30, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=2, cycleNumber=1, activationId=97, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, line=1, position=2, linePaymentNumber=2
- 14. p39.PositionFilled: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, position=2, amount=8000000, timestamp=1784644386
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=9, cycleNumber=1, activationId=97, isMirror=true
- 17. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=9, linePaymentNumber=6
- 18. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, position=9, amount=8000000, timestamp=1784644386
- 19. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=9, line=2, linePaymentNumber=6, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 22. levelManager.PayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 23. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), activationId=97, level=3, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=30, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 24. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 25. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=97, level=3, receiptType=3, fromUser=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=30, sourceCycle=1, mirroredPosition=9, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.SystemChargeDistributedDetailed: activationId=97, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 30. levelManager.ActivationFinancialSummaryRecorded: activationId=97, user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=36000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 31. levelManager.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, amount=40000000
- 32. levelManager.LevelActivatedInOrbit: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 33. registration.LevelActivated: user=MEMBER_30 (0x0FA49241C7C0F8Fee9fd70BcBCbe6f6601fcb789), level=3, price=40000000

## 97. MEMBER_31 registers under BOB_ORBIT_OWNER

Transaction: `0x22704ab766d1cde271577182d98e1f86f04a54cc1f1b52b1656b7704287534c0`
Block: 3638

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, position=3, amount=10000000, timestamp=1784644389
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=98, level=1, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=8, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=98, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=98, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=1, price=10000000

## 98. MEMBER_31 activates Level 2

Transaction: `0x1b574a7126409039f2bf6b471de685209ba66401f566d351f29b93ffc9071bbc`
Block: 3639

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, position=7, amount=20000000, timestamp=1784644390
- 6. p12.SpilloverPaid: from=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), to=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=99, level=2, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=2, cycleNumber=1, activationId=99, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, position=2, amount=8000000, timestamp=1784644390
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), activationId=99, level=2, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=7, sourceCycle=3, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=99, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=99, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=2, price=20000000

## 99. MEMBER_31 activates Level 3

Transaction: `0x6139483298565e19acebe0d70f70499c7e52c0d7e6625466ac1afe16a03735ed`
Block: 3640

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_31: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=31, cycleNumber=1, activationId=100, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=31, linePaymentNumber=19
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=31, line=3, linePaymentNumber=19, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, position=31, amount=40000000, timestamp=1784644391
- 6. p39.SpilloverPaid: from=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), to=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=100, level=3, receiptType=2, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=31, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=3, cycleNumber=1, activationId=100, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, position=3, amount=8000000, timestamp=1784644391
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=192000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=10, cycleNumber=1, activationId=100, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=10, linePaymentNumber=7
- 23. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, position=10, amount=8000000, timestamp=1784644391
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=10, line=2, linePaymentNumber=7, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), level=3, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_04 (0x3C3651a6B6570B00B497Fa61c131cE19199278BD), activationId=100, level=3, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=31, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=100, level=3, receiptType=3, fromUser=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=31, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=100, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=100, user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_31 (0xDDDB9A15897954723B1F65717DACc5d190C1149a), level=3, price=40000000

## 100. MEMBER_32 registers under BOB_ORBIT_OWNER

Transaction: `0xa1df0e2eea5ea465e1fc3b35134e635cf5f3ab692d5738d9fed765114c9dd22c`
Block: 3643

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, position=4, amount=10000000, timestamp=1784644394
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=8
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, orbitType=4, sourcePosition=4, sourceCycle=8, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=101
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, cycleNumber=3, activationId=101, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=1, linePaymentNumber=1
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=1, amount=9000000, timestamp=1784644394
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=1, line=1, linePaymentNumber=1, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=101, level=1, receiptType=4, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=8, mirroredPosition=1, mirroredCycle=3, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.RecycleCompletedDetailed: activationId=101, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), sourcePosition=4, sourceCycle=8, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=1, mirrorCycle=3, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=101, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=101, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=1, price=10000000

## 101. MEMBER_32 activates Level 2

Transaction: `0xf0d1d6809f1acc5172e41a0bbcd92ad6f0288084d2c84bed596e5c4cabfb881f`
Block: 3644

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, position=8, amount=20000000, timestamp=1784644395
- 6. p12.SpilloverPaid: from=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), to=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=102, level=2, receiptType=2, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=2, cycleNumber=1, activationId=102, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, position=2, amount=8000000, timestamp=1784644395
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), activationId=102, level=2, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=8, sourceCycle=3, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=102, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=102, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=2, price=20000000

## 102. MEMBER_32 activates Level 3

Transaction: `0x99bedb8dfa0bb0eda6c920aec2246e3e5c705051465771f950f7156c098d7c1d`
Block: 3645

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_32: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=32, cycleNumber=1, activationId=103, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=32, linePaymentNumber=20
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=32, line=3, linePaymentNumber=20, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, position=32, amount=40000000, timestamp=1784644396
- 6. p39.SpilloverPaid: from=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), to=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=103, level=3, receiptType=2, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=32, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=3, cycleNumber=1, activationId=103, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, position=3, amount=8000000, timestamp=1784644396
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=200000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=10, cycleNumber=1, activationId=103, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=10, linePaymentNumber=7
- 23. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, position=10, amount=8000000, timestamp=1784644396
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=10, line=2, linePaymentNumber=7, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), level=3, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_05 (0x0E49235124CAB91dfc5437303D4C1210dBe5B90D), activationId=103, level=3, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=32, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=103, level=3, receiptType=3, fromUser=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=32, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=103, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=103, user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_32 (0x0C90F2859fF79A99e9409AA3a708dAa578C300B1), level=3, price=40000000

## 103. MEMBER_33 registers under BOB_ORBIT_OWNER

Transaction: `0x3700f30fdbb5d32c5c6a2e28cac8427bc39c7aa8f3e33725ee96a28fadb453ed`
Block: 3648

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, position=1, amount=10000000, timestamp=1784644399
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=104, level=1, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=9, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=104, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=104, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=1, price=10000000

## 104. MEMBER_33 activates Level 2

Transaction: `0x46c122660d10c57feb8842e4dfcea077b8ae3e0af663f997d2bca993c54cd732`
Block: 3649

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, position=9, amount=20000000, timestamp=1784644400
- 6. p12.SpilloverPaid: from=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), to=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=105, level=2, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=2, cycleNumber=1, activationId=105, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, line=1, position=2, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, position=2, amount=8000000, timestamp=1784644400
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), activationId=105, level=2, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=9, sourceCycle=3, mirroredPosition=2, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=105, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=105, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=2, price=20000000

## 105. MEMBER_33 activates Level 3

Transaction: `0xe3d9001c2d4e703a84b9c095b695025cf3eccb6174811c4ad896ae8b2a2fe770`
Block: 3650

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_33: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=33, cycleNumber=1, activationId=106, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=33, linePaymentNumber=21
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=33, line=3, linePaymentNumber=21, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, position=33, amount=40000000, timestamp=1784644401
- 6. p39.SpilloverPaid: from=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), to=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=106, level=3, receiptType=2, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=33, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=3, cycleNumber=1, activationId=106, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, position=3, amount=8000000, timestamp=1784644401
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=208000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=10, cycleNumber=1, activationId=106, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=10, linePaymentNumber=7
- 23. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, position=10, amount=8000000, timestamp=1784644401
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=10, line=2, linePaymentNumber=7, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), level=3, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_06 (0xf740E53fB5872114Afa93a09F5b95ac242fbfB81), activationId=106, level=3, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=33, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=106, level=3, receiptType=3, fromUser=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=33, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=106, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=106, user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_33 (0xCa92B9D20Aec0b33126D850eAE6a59ac5658AaF8), level=3, price=40000000

## 106. MEMBER_34 registers under BOB_ORBIT_OWNER

Transaction: `0xab0cf41c4434754e461e2f58005bcab2c07e6ba4f08d59330e8b2e23cd7947ed`
Block: 3653

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, position=2, amount=10000000, timestamp=1784644404
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=107, level=1, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=9, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=107, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=107, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=1, price=10000000

## 107. MEMBER_34 activates Level 2

Transaction: `0x516e73f1b2c63051057be4dc48dad61507e98f67c85f9098dbcbd89fa112a1d7`
Block: 3654

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, position=10, amount=20000000, timestamp=1784644405
- 6. p12.SpilloverPaid: from=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), to=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, amount=8000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=108, level=2, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=3, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=3, cycleNumber=1, activationId=108, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, position=3, amount=8000000, timestamp=1784644405
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), level=2, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_25 (0x8B5375Fd1BB4BA4aCF07A3bdA23fdFb6ced05d09), activationId=108, level=2, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=10, sourceCycle=3, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=108, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=108, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=2, price=20000000

## 108. MEMBER_34 activates Level 3

Transaction: `0x445009c6fce39ee2ef204852244a493af9ac81534b8329cc397c5ac67c4ec957`
Block: 3655

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_34: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=34, cycleNumber=1, activationId=109, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=34, linePaymentNumber=22
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=34, line=3, linePaymentNumber=22, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, position=34, amount=40000000, timestamp=1784644406
- 6. p39.SpilloverPaid: from=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), to=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=109, level=3, receiptType=2, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=34, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=3, cycleNumber=1, activationId=109, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, position=3, amount=8000000, timestamp=1784644406
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=216000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=11, cycleNumber=1, activationId=109, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=11, linePaymentNumber=8
- 23. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, position=11, amount=8000000, timestamp=1784644406
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=11, line=2, linePaymentNumber=8, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), level=3, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_07 (0xFbBf853B1C688767d768877f0b9e2A0F590CacD6), activationId=109, level=3, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=34, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=109, level=3, receiptType=3, fromUser=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=34, sourceCycle=1, mirroredPosition=11, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=109, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=109, user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_34 (0x1Fe5af16bCaa8487811DC692093682e7883CacDD), level=3, price=40000000

## 109. MEMBER_35 registers under BOB_ORBIT_OWNER

Transaction: `0xb503413d2656fbfe0919aaedfffb843226038f0e691a86d562f0d1313d224654`
Block: 3658

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, position=3, amount=10000000, timestamp=1784644409
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=110, level=1, receiptType=2, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=9, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=110, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=110, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=1, price=10000000

## 110. MEMBER_35 activates Level 2

Transaction: `0xba85d77f04c91e76d8ca43683b162fab71ddc3d72c024c12bafdde98d62c19e6`
Block: 3659

USDT balance changes:

- NFT_POOL: +1.6 USDT
- OPERATIONS: +0.4 USDT
- MEMBER_26: +8.0 USDT
- MEMBER_35: -20.0 USDT
- 0xEd00171E28B55C3ba9bE26a474611755C860E6F0: +10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, cycleNumber=3, activationId=111, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=11, linePaymentNumber=8
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=11, line=2, linePaymentNumber=8, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, position=11, amount=20000000, timestamp=1784644410
- 6. p12.SpilloverPaid: from=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), to=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, amount=8000000
- 8. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, orbitType=12, sourcePosition=11, sourceCycle=3, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=111
- 10. p12.PositionActivationLinked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=3, cycleNumber=1, activationId=111, isMirror=true
- 11. p12.LinePaymentTracked: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, line=1, position=3, linePaymentNumber=3
- 12. p12.PositionFilled: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, position=3, amount=8000000, timestamp=1784644410
- 13. p12.PaymentRuleApplied: orbitOwner=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 15. levelManager.PayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), level=2, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 16. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_26 (0xbA6770aeD8AAa146910f790F5B797642d53595c1), activationId=111, level=2, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=11, sourceCycle=3, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=111, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=111, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=8000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=2, price=20000000

## 111. MEMBER_35 activates Level 3

Transaction: `0xf659a824c7425b855bb17438416657b62d7d04814373c2f958bf66109b45c0c0`
Block: 3660

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_35: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=35, cycleNumber=1, activationId=112, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=35, linePaymentNumber=23
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=35, line=3, linePaymentNumber=23, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, position=35, amount=40000000, timestamp=1784644411
- 6. p39.SpilloverPaid: from=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), to=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=112, level=3, receiptType=2, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=35, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=3, cycleNumber=1, activationId=112, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, position=3, amount=8000000, timestamp=1784644411
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=224000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=11, cycleNumber=1, activationId=112, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=11, linePaymentNumber=8
- 23. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, position=11, amount=8000000, timestamp=1784644411
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=11, line=2, linePaymentNumber=8, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), level=3, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_08 (0x3691b405a47d91ab86f9f02E5df13022542d95Ed), activationId=112, level=3, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=35, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=112, level=3, receiptType=3, fromUser=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=35, sourceCycle=1, mirroredPosition=11, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=112, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=112, user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_35 (0xcD7f0767DC9EAD3973Ae5643A4415259e29Da6f5), level=3, price=40000000

## 112. MEMBER_36 registers under BOB_ORBIT_OWNER

Transaction: `0xe4e88a5277f1e32292cad3d2da0b35c0aec08e2404ac6f60346d794c1eb975da`
Block: 3663

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, position=4, amount=10000000, timestamp=1784644414
- 7. p4.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, cycleNumber=9
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, orbitType=4, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, orbitType=4, sourcePosition=4, sourceCycle=9, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=113
- 11. p4.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, cycleNumber=3, activationId=113, isMirror=true
- 12. p4.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, line=1, position=2, linePaymentNumber=2
- 13. p4.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, position=2, amount=9000000, timestamp=1784644414
- 14. p4.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, position=2, line=1, linePaymentNumber=2, toOwner=9000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=1, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=113, level=1, receiptType=4, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=4, sourceCycle=9, mirroredPosition=2, mirroredCycle=3, routedRole=4, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 18. levelManager.RecycleCompletedDetailed: activationId=113, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), sourcePosition=4, sourceCycle=9, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=9000000, recycleLiquidPaid=9000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=3, triggeredOrbitReset=false
- 23. levelManager.SystemChargeDistributedDetailed: activationId=113, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 24. levelManager.ActivationFinancialSummaryRecorded: activationId=113, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=9000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 25. levelManager.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, amount=10000000
- 26. levelManager.LevelActivatedInOrbit: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 27. registration.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=1, price=10000000

## 113. MEMBER_36 activates Level 2

Transaction: `0x71fe427ffcf01a19c64718f0c43dcb6675e31b0fca008a4f60c3120c61e998f8`
Block: 3664

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
- 0xEd00171E28B55C3ba9bE26a474611755C860E6F0: -10.0 USDT

Ordered contract evidence:

- 2. p12.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, cycleNumber=3, activationId=114, isMirror=false
- 3. p12.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, line=2, position=12, linePaymentNumber=9
- 4. p12.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=12, line=2, linePaymentNumber=9, toOwner=0, toSpillover1=8000000, toSpillover2=0, toEscrow=0, toRecycle=10000000
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, position=12, amount=20000000, timestamp=1784644415
- 6. p12.SpilloverPaid: from=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), to=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, amount=8000000
- 7. p12.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, cycleNumber=3
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, orbitType=12, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, orbitType=12, sourcePosition=12, sourceCycle=3, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=114
- 11. p12.PositionActivationLinked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=3, cycleNumber=1, activationId=114, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, line=1, position=3, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, position=3, amount=8000000, timestamp=1784644415
- 14. p12.PaymentRuleApplied: orbitOwner=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, position=3, line=1, linePaymentNumber=3, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), level=2, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_27 (0x523462abE3ca865aa3B47BA7fC6cDE4652435FBf), activationId=114, level=2, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=3, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=114, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=1, cycleNumber=2, activationId=114, isMirror=true
- 23. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=1, position=1, linePaymentNumber=1
- 24. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=1, line=1, linePaymentNumber=1, toOwner=8000000, toSpillover1=10000000, toSpillover2=0, toEscrow=0, toRecycle=0
- 25. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=1, amount=20000000, timestamp=1784644415
- 26. p12.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, amount=10000000
- 28. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=114, level=2, receiptType=4, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=3, mirroredPosition=1, mirroredCycle=2, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 30. p12.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=6, cycleNumber=1, activationId=114, isMirror=true
- 31. p12.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, line=2, position=6, linePaymentNumber=4
- 32. p12.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, position=6, line=2, linePaymentNumber=4, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 33. p12.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, position=6, amount=10000000, timestamp=1784644415
- 51. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=2, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 52. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=114, level=2, receiptType=4, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=12, sourceCycle=3, mirroredPosition=6, mirroredCycle=1, routedRole=4, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 53. levelManager.RecycleCompletedDetailed: activationId=114, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, sourceUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), sourcePosition=12, sourceCycle=3, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=20000000, recycleLiquidPaid=18000000, recycleEscrowLocked=0, mirrorPosition=1, mirrorCycle=2, triggeredOrbitReset=false
- 58. levelManager.SystemChargeDistributedDetailed: activationId=114, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 59. levelManager.ActivationFinancialSummaryRecorded: activationId=114, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=26000000, totalEscrowLocked=0, totalRecycleAllocated=10000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 60. levelManager.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, amount=20000000
- 61. levelManager.LevelActivatedInOrbit: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 62. registration.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=2, price=20000000

## 114. MEMBER_36 activates Level 3

Transaction: `0x9d9cf406a948ece510dd6e0f0d59ef2f11b44ba7dc8a6acf0b9dbb741a115c77`
Block: 3665

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_03: +8.0 USDT
- MEMBER_36: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=36, cycleNumber=1, activationId=115, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=36, linePaymentNumber=24
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=36, line=3, linePaymentNumber=24, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, position=36, amount=40000000, timestamp=1784644416
- 6. p39.SpilloverPaid: from=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), to=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=115, level=3, receiptType=2, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=36, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=3, cycleNumber=1, activationId=115, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, position=3, amount=8000000, timestamp=1784644416
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=232000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=11, cycleNumber=1, activationId=115, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=11, linePaymentNumber=8
- 23. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, position=11, amount=8000000, timestamp=1784644416
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=11, line=2, linePaymentNumber=8, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), level=3, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_09 (0x68B2eD942c183cB5Bf2119d3EAA6081D80A062eC), activationId=115, level=3, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=36, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=115, level=3, receiptType=3, fromUser=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=36, sourceCycle=1, mirroredPosition=11, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=115, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=115, user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_36 (0xbABd7fe6fEef37eD88ed096Ec4FfB5C6D96Ad73a), level=3, price=40000000

## 115. MEMBER_37 registers under BOB_ORBIT_OWNER

Transaction: `0xeedf4f501e4c7c26255a766b162f37b81d7ccde84e8938a7f39f2751663abe78`
Block: 3668

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, position=1, amount=10000000, timestamp=1784644419
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=116, level=1, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=10, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=116, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=116, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=1, price=10000000

## 116. MEMBER_37 activates Level 2

Transaction: `0x0181651b719c3a33db344d1ccc3718ceba484ab439c5a50a7ca758e6edb14da4`
Block: 3669

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, position=1, amount=20000000, timestamp=1784644420
- 6. p12.SpilloverPaid: from=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=117, level=2, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=4, cycleNumber=2, activationId=117, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=4, linePaymentNumber=1
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, position=4, amount=10000000, timestamp=1784644420
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=4, line=2, linePaymentNumber=1, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=117, level=2, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=1, sourceCycle=4, mirroredPosition=4, mirroredCycle=2, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=117, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=117, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=2, price=20000000

## 117. MEMBER_37 activates Level 3

Transaction: `0x9d3a07c62ff4e46fe05bf2071db35a1de2a8160cce6b484f36fe6871442afb7d`
Block: 3670

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- BOB_ORBIT_OWNER: +20.0 USDT
- MEMBER_01: +8.0 USDT
- MEMBER_37: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=37, cycleNumber=1, activationId=118, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=37, linePaymentNumber=25
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=37, line=3, linePaymentNumber=25, toOwner=20000000, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=0
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, position=37, amount=40000000, timestamp=1784644421
- 6. p39.SpilloverPaid: from=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), to=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), to=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, amount=8000000
- 10. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 11. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=118, level=3, receiptType=2, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=37, sourceCycle=1, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=3, cycleNumber=1, activationId=118, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, position=3, amount=8000000, timestamp=1784644421
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=240000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=12, cycleNumber=1, activationId=118, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, line=2, position=12, linePaymentNumber=9
- 23. p39.PositionFilled: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, position=12, amount=8000000, timestamp=1784644421
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, position=12, line=2, linePaymentNumber=9, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), level=3, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_10 (0xC0811231ea3D547a38417e5a1cd5bE09F56f3367), activationId=118, level=3, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=37, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), level=3, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_01 (0xF955D12bf1FfAEd3cF8228FF34AbCA2dDb534032), activationId=118, level=3, receiptType=3, fromUser=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=37, sourceCycle=1, mirroredPosition=12, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=118, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=118, user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=28000000, totalEscrowLocked=8000000, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_37 (0xf8Dada5aA4fF2a2581Ccba68e235329Ac0c84E04), level=3, price=40000000

## 118. MEMBER_38 registers under BOB_ORBIT_OWNER

Transaction: `0x93b42cf1a19989486b27631e7f23eee51bb116983e8f60439eb4debb0e37b468`
Block: 3673

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, position=2, amount=10000000, timestamp=1784644424
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=119, level=1, receiptType=2, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=10, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=119, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=119, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=1, price=10000000

## 119. MEMBER_38 activates Level 2

Transaction: `0x726bd18d5eab6d82cf2f4a7e0e566e291c6180b439b4b97774b5a288c0d0116b`
Block: 3674

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, position=2, amount=20000000, timestamp=1784644425
- 6. p12.SpilloverPaid: from=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=120, level=2, receiptType=2, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=7, cycleNumber=2, activationId=120, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=7, linePaymentNumber=2
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, position=7, amount=10000000, timestamp=1784644425
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=7, line=2, linePaymentNumber=2, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=120, level=2, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=2, sourceCycle=4, mirroredPosition=7, mirroredCycle=2, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=120, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=120, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=2, price=20000000

## 120. MEMBER_38 activates Level 3

Transaction: `0xf6b9913c826da6777d5a7f1001b6da65b7a1069facfe2cf01cde0e7668e4fc3b`
Block: 3675

USDT balance changes:

- NFT_POOL: +3.2 USDT
- OPERATIONS: +0.8 USDT
- MEMBER_02: +8.0 USDT
- MEMBER_38: -40.0 USDT
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT
- 0xEd00171E28B55C3ba9bE26a474611755C860E6F0: +20.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=38, cycleNumber=1, activationId=121, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=38, linePaymentNumber=26
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=38, line=3, linePaymentNumber=26, toOwner=0, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=20000000
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, position=38, amount=40000000, timestamp=1784644426
- 6. p39.SpilloverPaid: from=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), to=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), to=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, amount=8000000
- 9. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, orbitType=39, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, orbitType=39, sourcePosition=38, sourceCycle=1, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=121
- 11. p39.PositionActivationLinked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=3, cycleNumber=1, activationId=121, isMirror=true
- 12. p39.LinePaymentTracked: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, line=1, position=3, linePaymentNumber=3
- 14. p39.PositionFilled: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, position=3, amount=8000000, timestamp=1784644426
- 15. p39.PaymentRuleApplied: orbitOwner=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 19. escrow.EscrowLocked: user=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=248000000
- 20. p39.PositionActivationLinked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=12, cycleNumber=1, activationId=121, isMirror=true
- 21. p39.LinePaymentTracked: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, line=2, position=12, linePaymentNumber=9
- 22. p39.PositionFilled: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, position=12, amount=8000000, timestamp=1784644426
- 23. p39.PaymentRuleApplied: orbitOwner=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, position=12, line=2, linePaymentNumber=9, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 25. levelManager.PayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), level=3, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 26. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_11 (0x6F718F31bEEdde2dA67Bc8e5779c3cB84b2C26cC), activationId=121, level=3, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=38, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.PayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), level=3, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 28. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_02 (0x4d51a994Ae1d9F52EF7cb8A805C5f6895A84B8af), activationId=121, level=3, receiptType=3, fromUser=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=38, sourceCycle=1, mirroredPosition=12, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=121, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. levelManager.ActivationFinancialSummaryRecorded: activationId=121, user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=8000000, totalEscrowLocked=8000000, totalRecycleAllocated=20000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 35. levelManager.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, amount=40000000
- 36. levelManager.LevelActivatedInOrbit: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 37. registration.LevelActivated: user=MEMBER_38 (0x41b92bf7Bc90E00872591Ea4c35E468fF3Cb91C6), level=3, price=40000000

## 121. MEMBER_39 registers under BOB_ORBIT_OWNER

Transaction: `0x052cac6a84ac3363ff20b0ccfc284a6b21a5dbf1996eff77467fc413d4d5eb90`
Block: 3678

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
- 6. p4.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, position=3, amount=10000000, timestamp=1784644429
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=1, receiptType=2, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=122, level=1, receiptType=2, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=10, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=9000000, escrowLocked=0, liquidPaid=9000000
- 14. levelManager.SystemChargeDistributedDetailed: activationId=122, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, systemChargeTotal=1000000, nftPoolAmount=800000, operationsAmount=200000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 15. levelManager.ActivationFinancialSummaryRecorded: activationId=122, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, activationAmount=10000000, systemCharge=1000000, nftPoolAmount=800000, operationsAmount=200000, totalLiquidPaid=9000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 16. levelManager.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, amount=10000000
- 17. levelManager.LevelActivatedInOrbit: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, orbit=0xBd422978E222C626b94e66f33791a61FbE662115, netAmount=10000000
- 18. registration.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=1, price=10000000

## 122. MEMBER_39 activates Level 2

Transaction: `0xe891c5785d09c2fec5d511a14b4d4054b2ad5af874ea959aebb73af3183aeb35`
Block: 3679

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
- 5. p12.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, position=3, amount=20000000, timestamp=1784644430
- 6. p12.SpilloverPaid: from=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), to=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, amount=10000000
- 9. levelManager.PayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=2, receiptType=2, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 10. levelManager.DetailedPayoutReceiptRecorded: receiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), activationId=123, level=2, receiptType=2, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=4, mirroredPosition=0, mirroredCycle=0, routedRole=1, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 11. p12.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=10, cycleNumber=2, activationId=123, isMirror=true
- 12. p12.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, line=2, position=10, linePaymentNumber=3
- 13. p12.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, position=10, amount=10000000, timestamp=1784644430
- 14. p12.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, position=10, line=2, linePaymentNumber=3, toOwner=10000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 16. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=2, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 17. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=123, level=2, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=3, sourceCycle=4, mirroredPosition=10, mirroredCycle=2, routedRole=2, grossAmount=10000000, escrowLocked=0, liquidPaid=10000000
- 21. levelManager.SystemChargeDistributedDetailed: activationId=123, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, systemChargeTotal=2000000, nftPoolAmount=1600000, operationsAmount=400000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 22. levelManager.ActivationFinancialSummaryRecorded: activationId=123, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, activationAmount=20000000, systemCharge=2000000, nftPoolAmount=1600000, operationsAmount=400000, totalLiquidPaid=18000000, totalEscrowLocked=0, totalRecycleAllocated=0, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 23. levelManager.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, amount=20000000
- 24. levelManager.LevelActivatedInOrbit: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, orbit=0x67b444dB2581920A7Bb4FB07f6B19D614B7f6ACA, netAmount=20000000
- 25. registration.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=2, price=20000000

## 123. MEMBER_39 activates Level 3

Transaction: `0x5ee945d904a8ffabbf0f10b34f7812c5c47b80426338507d2a583cfbfb5a496c`
Block: 3680

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
- 0x81AE7583f06C2Bc141b9141FB9D701F0F2f59133: +8.0 USDT
- 0xEd00171E28B55C3ba9bE26a474611755C860E6F0: -20.0 USDT

Ordered contract evidence:

- 2. p39.PositionActivationLinked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=39, cycleNumber=1, activationId=124, isMirror=false
- 3. p39.LinePaymentTracked: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, line=3, position=39, linePaymentNumber=27
- 4. p39.PaymentRuleApplied: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=39, line=3, linePaymentNumber=27, toOwner=0, toSpillover1=8000000, toSpillover2=8000000, toEscrow=0, toRecycle=20000000
- 5. p39.PositionFilled: orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, position=39, amount=40000000, timestamp=1784644431
- 6. p39.SpilloverPaid: from=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), to=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, amount=8000000
- 7. p39.SpilloverPaid: from=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), to=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, amount=8000000
- 8. p39.OrbitReset: user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, cycleNumber=1
- 10. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, orbitType=39, sourcePosition=0, sourceCycle=0, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=0
- 11. levelManager.PayoutNotDelivered: affectedUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourceUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, orbitType=39, sourcePosition=39, sourceCycle=1, expectedAmount=0, actualReceiver=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), actualAmount=0, receiptType=2, routedRole=0x0000000000000000000000000000000000000000000000000000000000000000, reasonCode=0x5a45524f5f414d4f554e54000000000000000000000000000000000000000000, actionCode=0x535550504f52545f524556494557000000000000000000000000000000000000, activationId=124
- 12. p39.PositionActivationLinked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=3, cycleNumber=1, activationId=124, isMirror=true
- 13. p39.LinePaymentTracked: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, line=1, position=3, linePaymentNumber=3
- 15. p39.PositionFilled: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, position=3, amount=8000000, timestamp=1784644431
- 16. p39.PaymentRuleApplied: orbitOwner=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, position=3, line=1, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=8000000, toRecycle=0
- 20. escrow.EscrowLocked: user=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), fromLevel=3, toLevel=4, amount=8000000, newLockedTotal=8000000, currentEscrowLockedGlobal=256000000
- 21. p39.PositionActivationLinked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=12, cycleNumber=1, activationId=124, isMirror=true
- 22. p39.LinePaymentTracked: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, line=2, position=12, linePaymentNumber=9
- 23. p39.PositionFilled: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, position=12, amount=8000000, timestamp=1784644431
- 24. p39.PaymentRuleApplied: orbitOwner=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, position=12, line=2, linePaymentNumber=9, toOwner=8000000, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 26. levelManager.PayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), level=3, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 27. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_12 (0x868ED502239C71feBD939D952D1FB26CbEAcDd6A), activationId=124, level=3, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=39, sourceCycle=1, mirroredPosition=3, mirroredCycle=1, routedRole=2, grossAmount=8000000, escrowLocked=8000000, liquidPaid=0
- 28. levelManager.PayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), level=3, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 29. levelManager.DetailedPayoutReceiptRecorded: receiver=MEMBER_03 (0x3C7EF50e30cfd4C0f5b36D5e8a885C6613BAD628), activationId=124, level=3, receiptType=3, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=39, sourceCycle=1, mirroredPosition=12, mirroredCycle=1, routedRole=3, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 33. levelManager.SystemChargeDistributedDetailed: activationId=124, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 34. p39.PositionActivationLinked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=2, cycleNumber=1, activationId=124, isMirror=true
- 35. p39.LinePaymentTracked: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, line=1, position=2, linePaymentNumber=2
- 36. p39.PaymentRuleApplied: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, position=2, line=1, linePaymentNumber=2, toOwner=8000000, toSpillover1=8000000, toSpillover2=20000000, toEscrow=0, toRecycle=0
- 37. p39.PositionFilled: orbitOwner=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=2, amount=40000000, timestamp=1784644431
- 38. p39.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=8000000
- 39. p39.SpilloverPaid: from=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), to=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, amount=20000000
- 41. levelManager.PayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), level=3, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 42. levelManager.DetailedPayoutReceiptRecorded: receiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), activationId=124, level=3, receiptType=4, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=39, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 43. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=10, cycleNumber=1, activationId=124, isMirror=true
- 44. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=2, position=10, linePaymentNumber=3
- 45. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=10, line=2, linePaymentNumber=3, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 46. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=10, amount=8000000, timestamp=1784644431
- 64. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 65. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=124, level=3, receiptType=4, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=39, sourceCycle=1, mirroredPosition=10, mirroredCycle=1, routedRole=4, grossAmount=8000000, escrowLocked=0, liquidPaid=8000000
- 66. p39.PositionActivationLinked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=2, cycleNumber=1, activationId=124, isMirror=true
- 67. p39.LinePaymentTracked: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, line=1, position=2, linePaymentNumber=2
- 68. p39.PaymentRuleApplied: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, position=2, line=1, linePaymentNumber=2, toOwner=0, toSpillover1=0, toSpillover2=0, toEscrow=0, toRecycle=0
- 69. p39.PositionFilled: orbitOwner=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), user=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, position=2, amount=20000000, timestamp=1784644431
- 87. levelManager.PayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), level=3, receiptType=4, fromUser=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 88. levelManager.DetailedPayoutReceiptRecorded: receiver=ID1 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), activationId=124, level=3, receiptType=4, fromUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), sourcePosition=39, sourceCycle=1, mirroredPosition=2, mirroredCycle=1, routedRole=4, grossAmount=20000000, escrowLocked=0, liquidPaid=20000000
- 89. levelManager.RecycleCompletedDetailed: activationId=124, orbitOwner=BOB_ORBIT_OWNER (0xa57B89Fb440C46092a311713790f0cd2b874E0F0), level=3, sourceUser=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), sourcePosition=39, sourceCycle=1, recycleReceiver=ALICE_SPONSOR (0xeFdb5550Bf7D00423Bb24B153132144d92059d79), recycleGross=40000000, recycleLiquidPaid=36000000, recycleEscrowLocked=0, mirrorPosition=2, mirrorCycle=1, triggeredOrbitReset=false
- 94. levelManager.SystemChargeDistributedDetailed: activationId=124, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, systemChargeTotal=4000000, nftPoolAmount=3200000, operationsAmount=800000, nftPool=NFT_POOL (0x70997970C51812dc3A010C7d01b50e0d17dc79C8), operationsWallet=OPERATIONS (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
- 95. levelManager.ActivationFinancialSummaryRecorded: activationId=124, user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, activationAmount=40000000, systemCharge=4000000, nftPoolAmount=3200000, operationsAmount=800000, totalLiquidPaid=44000000, totalEscrowLocked=8000000, totalRecycleAllocated=20000000, isAutoUpgrade=false, isFounderRepFreeActivation=false
- 96. levelManager.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, amount=40000000
- 97. levelManager.LevelActivatedInOrbit: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, orbit=0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2, netAmount=40000000
- 98. registration.LevelActivated: user=MEMBER_39 (0x01a54b51ae4bD42CffBDE4b532C6562793b96C22), level=3, price=40000000
