# Staging Three-Wallet Balance Check - 2026-09-29

## Scope

The user reported zero FGT/FPT for three wallets. This investigation covers the
existing Polygon Amoy staging deployment, not production or a fresh genesis.
Repository checkpoint: `ede42a6` (tested application code `1ff05fc`).

Only contract reads, public participant API reads and public frontend asset
inspection were performed. No signer, transaction, database repair, reset,
contract deployment or environment-variable change was used.

## Verified balances and registration

Chain ID 80002 was checked explicitly. Registration and token state were read
at block 48,836,460, initial timestamp 2026-09-29T05:14:38.007Z, using host
`proud-floral-morning.matic-amoy.quiknode.pro`. Credential paths are omitted.
Decimals were read from each token. Failed reads were not converted into zero.

| Wallet | F-Freedom registered | Freedom-Plus registered | FGT total / available / locked | FPT total / available / locked |
| --- | --- | --- | --- | --- |
| `0x296238e950ef0066d2119230bf0eb3adebc94882` | true | true | 10 / 10 / 0 | 50 / 50 / 0 |
| `0x884e48f9897e8633238747b608dd49de12bf94df` | false | false | 0 / 0 / 0 | 0 / 0 / 0 |
| `0x21f9edb0ce6b79afa98de14b03678cb29bc4859c` | false | false | 0 / 0 / 0 | 0 / 0 / 0 |

Queried contracts:

- F-Freedom registration: `0x83029F37Ac4BAA2CB29d4f0195149B6575bd403B`.
- Freedom-Plus registration: `0xB23B64dB6c3Be53B532d611d0f66DC63e2A68655`.
- FGT: `0x53a11f9c333Cf8f94E3A9Bd642dcf5168E7280E0`.
- FPT: `0x46aBAa6a3888C95E73Be457cF69f6Ef834D8d08F`.

Methods: `isRegistered`, `balanceOf`, `availableBalanceOf`, `lockedBalanceOf`.
Unregistered means unregistered in these current contracts, not necessarily in
every historical deployment or network.

## First wallet: active levels and receipts

At block 48,836,873, only Level 1 was active in each program. All ten F-Freedom
and all seven Freedom-Plus flags were read. Follow-up completed at
2026-09-29T05:21:42.794Z.

- F-Freedom receipt `0xa8d0b4a8a9533d4a83327b60bb337caf619b54c39c079790b02ac588ed5399f7`:
  status `0x1`, block 46,247,316, from the first wallet to the current
  F-Freedom registration contract. FGT Transfer from zero address to this
  wallet: 10,000,000 raw units, or 10 FGT.
- Freedom-Plus receipt `0x6d6757a82ee026f74fa8f1cfc3650e4163a62780bbf7d01293b4ed276c61c04e`:
  status `0x1`, block 46,247,672, from the first wallet to the current
  Freedom-Plus registration contract. FPT Transfer from zero address to this
  wallet: 50,000,000 raw units, or 50 FPT.

These are the two activation hashes supplied earlier in the conversation.
This confirms activation and issuance, not a new exhaustive payout audit.

## API comparison

Read `GET /api/freedom-plus/participant/:address` on the staging API for all
three wallets. First wallet: participant number 6, registered, indexed Level 1
active at block 46,247,672 and timestamp 2026-08-30T05:01:54.000Z. Ledger includes
`FPTIssued` for 50,000,000 raw units and the matching receipt above. Two placement
records are present. F-Freedom gateway reports registered and Level 1 active,
with source `indexed+chain-fallback`.

Other two wallets: participant null; levels, positions and ledger empty;
F-Freedom gateway unregistered and Level 1 inactive.

The first wallet's Freedom-Plus activation/issuance is not missing from this
API response. Gateway fallback does not prove complete F-Freedom indexing.

## Frontend configuration and direct comparison

The public staging frontend served `/assets/index-BN3L62Xn.js`. The bundle
contains the current FGT/FPT addresses, staging API host and older
`sly-solemn-emerald.matic-amoy.quiknode.pro` RPC host. Source inspection confirms
the browser read provider uses build-time `VITE_RPC_URL`; Render environment
changes do not update this compiled browser configuration.

Three direct requests to the old HTTPS endpoint extracted from that bundle
returned HTTP 200 and allowed the staging Origin header: chain ID 80002,
FGT balance `0x989680` (10,000,000 raw), and FPT balance `0x2faf080`
(50,000,000 raw) for the first wallet.

Thus frontend/backend endpoint parity is incomplete, but the old endpoint was
not returning zero or failing in this check. Its presence alone is NOT a proven
cause of the UI report. Browser batching, retries, wallet switching and
intermittent failures have not been reproduced by these standalone requests.

## Supplied startup logs

- Worker 04:45:31 UTC: port 5002, indexing enabled, new build-plan WebSocket
  host opened. At 04:46:20 UTC it reports 66 listeners, including 16
  Freedom-Plus listeners, sharing one connection.
- API 04:49:55 UTC: port 5001, indexing disabled. No API-process realtime,
  polling or Freedom-Plus indexer is started.
- Both excerpts show Render live status, without a crash/rate-limit error.
  Render commit hashes, effective HTTP configuration, complete history recovery
  and sustained RPC consumption are not established by those excerpts.

## Pending UI diagnosis

For the first wallet, zero wallet balances would contradict the verified state;
zero locked/committed tokens is correct. Obtain the exact page heading,
connected wallet and metric labels in a screenshot before calling this a
reproduced balance-rendering defect. An asynchronous screenshot request was
sent during the investigation.

Then trace that screen's chain/API source, caches, account/network association
and unknown-versus-zero handling. Do not re-register, mint replacement tokens,
reset records or replay events just to change an unidentified display.
No application code was modified for this investigation.

## Limits and diagnostic cost

- Local shell attempts initially stalled. One Node launch failed due to Windows
  argument quoting before RPC requests. PowerShell here-string input to Node
  resolved quoting. Explorer/web-tool errors were not treated as wallet data.
- 28 direct registration/balance RPC reads, 3 old-endpoint reads and 21
  level/receipt reads: 52 direct RPC requests, sequential and bounded, without
  any historical range scan. This excludes server-side RPC calls caused by
  three public API reads; it is not an application-wide usage benchmark.
- No connected-wallet browser session or screenshot was inspected. No
  application tests were rerun for this documentation-only change. Reset,
  production rollout and overall historical completeness remain unverified.
