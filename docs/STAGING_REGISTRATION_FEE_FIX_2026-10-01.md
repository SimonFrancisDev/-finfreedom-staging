# Staging Registration Fee Fix

Lady Sabina reported a rejected Amoy registration: the wallet supplied a
1,500,000,000 wei priority fee while the RPC required 25,000,000,000 wei.
This is a fee-per-gas mismatch, not evidence of an insufficient POL balance.
Sending more POL does not change the fee fields selected by the wallet.

The dedicated staging representative page now supplies:

- EIP-1559 priority fee: the larger of the wallet RPC suggestion and 30 gwei.
- Maximum fee: twice the current block base fee plus that priority fee.
- Legacy fallback when the block has no base fee: live gas price, at least 30 gwei.
- Estimated gas limit plus 20 percent, rounded up.
- Chain and account revalidation immediately before the wallet request.

The wallet owner still reviews and signs. No automatic transaction submission,
custody, contract deployment, mainnet change, or extra funding is involved.
This fixes the page's fee request; a wallet can still override requested fees.

The separately reported unavailable RPC is a wallet-network connection problem.
The page fails without submitting if the latest block cannot be fetched.
It does not silently replace the wallet RPC or embed a private provider key.

Focused tests cover the reported 1.5 gwei suggestion, higher live suggestions,
unsupported priority-fee RPC, legacy fees, unavailable RPC, approved wallets,
the exact Amoy contract, and ID1 calldata.
An actual successful registration still requires the owner's signature and receipt.

Reference: https://support.polygon.technology/support/solutions/articles/82000906165-how-to-resolve-the-transaction-underprice-issue-
