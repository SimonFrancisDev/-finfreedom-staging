# Third Staging Representative Replacement

## Scope

User-approved replacement on Polygon Amoy (80002) only:

- Retired wallet: 0xf72873d6233B5e3dfbA6D1D8058BF90E990902f0
- Replacement wallet: 0x0de1B6F15Fe8E5Cf7fbBA2cD4C576357Ececa962
- Fresh F-Freedom manager: 0xaf6cC44C5B860BA076Ee703244edcaB0C806c27A
- Fresh registration: 0xC5750BfA5b4Dd888e55420911b58CB57539aEb90
- Sponsor / ID1: 0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A

The other two representatives and all mainnet configuration remain unchanged.
The eight founder payout recipients are distinct from these representatives.
No database reset, account migration, or mainnet transaction is part of this change.

## Method

The existing representative setter is append-only. Adding the new wallet through
that setter would retain the retired wallet and create four representatives.
Instead, a temporary storage-compatible implementation replaces only slot 2 and
its two eligibility flags. It requires exactly three representatives and rejects
either wallet having registered or used its representative activation privileges.
It is restricted to the exact fresh staging proxy, registration contract and chain.

The multisig approves the temporary implementation through the guardian, then
executes upgrade-and-call. The replacement restores the previous implementation
within the same transaction. Existing program logic is not left running on the
temporary implementation. An ERC1967 delegatecall annotation permits this reviewed
restoration primitive; storage compatibility validation remains enabled.

## Evidence And Status

On-chain replacement completed successfully on 2026-10-01.
Execution transaction:
0x0a64222f76b01f394ae0b84e5e4e4c85023a9860a3e77b8b02b92c39081ffe08.
The execution record has verdict PASS. The original implementation was restored,
exactly three representatives remain, and the first two registrations are unchanged.
The replacement wallet had 9.948492808657828555 test POL before execution;
registration gas estimation succeeded. No additional funding was needed.

Execution is journaled in
smart-contract/test-reports/october-representative-execution.json.
Only verdict PASS in that record confirms completed on-chain replacement.
The script checks restoration, exactly three representatives, retired eligibility
removed, replacement eligibility added, and the first two registrations preserved.
It estimates the replacement registration without signing for the wallet owner.

The registration page's nine mocked tests passed, including new-wallet acceptance
and old-wallet rejection. A local fork test was attempted but did not complete:
the first inherited migration exceeded bytecode size; the small migration then
needed an explicit annotation for ERC1967 restoration. The user requested stopping
additional tests and proceeding. Do not describe the fork test as passed.

The signing page and future Freedom-Plus genesis list use the replacement wallet.
The wallet owner must still personally register under ID1 after publication.
This change alone does not mean the fresh Freedom-Plus/NFT rollout is complete.

## Recovery

Do not delete the execution journal or blindly resubmit transactions.
The execution script reuses recorded transaction hashes and verifies proposal
target, calldata, value and cancellation/execution state before continuing.
If a transaction receipt is unresolved, inspect that hash before retrying.

## Mainnet Representatives (Unchanged)

1. 0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A
2. 0xb673c9D14Da920f187d25Cc793f1955a43284622
3. 0x117C9258a95775Ecf448fd086D00cA22506Ea79d
