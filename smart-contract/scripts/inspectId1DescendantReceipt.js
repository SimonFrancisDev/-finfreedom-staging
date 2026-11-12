// Bounded Polygon historical reads. No signer or live write methods.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { ethers } = require("ethers");
const ROOT = path.resolve(__dirname, "../../..");
const json = value => JSON.stringify(value, (_, item) => typeof item === "bigint" ? item.toString() : item, 2);

async function main() {
  assert(process.env.ID1_MAINNET_REPLAY_RPC, "Explicit mainnet read-only RPC required");
  const snapshot = JSON.parse(fs.readFileSync(path.join(ROOT, "tmp/id1-repair-prestate.json"), "utf8"));
  assert.equal(snapshot.chainId, 137);
  const rootOrbit = snapshot.orbits.find(row => row.wallet.toLowerCase() === snapshot.id1.toLowerCase() && row.level === 6);
  const child = rootOrbit.positions.find(row => row.slot === 21);
  assert.equal(child.link.activationId, "1107");
  const request = new ethers.FetchRequest(process.env.ID1_MAINNET_REPLAY_RPC);
  request.timeout = 20000;
  const provider = new ethers.JsonRpcProvider(request, undefined, { batchMaxCount: 1, cacheTimeout: -1 });
  const abi = name => JSON.parse(fs.readFileSync(path.resolve(__dirname, `../artifacts/contracts/${name}.sol/${name}.json`))).abi;
  const definitions = new Map([
    [snapshot.addresses.manager.toLowerCase(), new ethers.Interface(abi("LevelManager"))],
    [snapshot.addresses.registration.toLowerCase(), new ethers.Interface(abi("RegistrationFixed"))],
    [snapshot.addresses.p39.toLowerCase(), new ethers.Interface(abi("P39Orbit"))],
    [snapshot.usdt.toLowerCase(), new ethers.Interface(["event Transfer(address indexed from,address indexed to,uint256 value)"])],
  ]);
  try {
    assert.equal((await provider.getNetwork()).chainId, 137n);
    assert.equal((await provider.getBlock(snapshot.block)).hash, snapshot.blockHash);
    // The two reconciled activation receipts bracket this arrival.
    let low = 95478606;
    let high = 96532390;
    const timestamp = Number(child.timestamp);
    assert((await provider.getBlock(low)).timestamp < timestamp);
    assert((await provider.getBlock(high)).timestamp > timestamp);
    let requests = 0;
    while (low + 1 < high) {
      assert(requests++ < 24, "Block search budget exceeded");
      const middle = Math.floor((low + high) / 2);
      if ((await provider.getBlock(middle)).timestamp < timestamp) low = middle;
      else high = middle;
    }
    assert.equal((await provider.getBlock(high)).timestamp, timestamp);
    const managerInterface = definitions.get(snapshot.addresses.manager.toLowerCase());
    const logs = await provider.getLogs({ address: snapshot.addresses.manager, fromBlock: high, toBlock: high + 4,
      topics: [managerInterface.getEvent("ActivationFinancialSummaryRecorded").topicHash, ethers.toBeHex(1107, 32)] });
    assert.equal(logs.length, 1, "Expected exactly one activation summary");
    const receipt = await provider.getTransactionReceipt(logs[0].transactionHash);
    assert.equal(receipt.status, 1);
    const block = await provider.getBlock(receipt.blockNumber);
    assert.equal(receipt.blockHash, block.hash);
    assert.equal(block.timestamp, timestamp);
    const events = [];
    const transfers = [];
    for (const log of receipt.logs) {
      let decoded;
      try { decoded = definitions.get(log.address.toLowerCase())?.parseLog(log); } catch {}
      if (!decoded) continue;
      events.push({ address: log.address, logIndex: log.index, event: decoded.name, args: decoded.args.toObject() });
      if (log.address.toLowerCase() === snapshot.usdt.toLowerCase() && decoded.name === "Transfer") transfers.push(decoded.args.toObject());
    }
    const debit = transfers.filter(row => row.from.toLowerCase() === child.occupant.toLowerCase())
      .reduce((sum, row) => sum + row.value, 0n);
    assert.equal(debit, 320000000n);
    const recipients = {};
    for (const row of transfers.filter(row => row.from.toLowerCase() === snapshot.addresses.manager.toLowerCase())) {
      recipients[row.to] = (recipients[row.to] || 0n) + row.value;
    }
    const report = { chainId: 137, writes: 0, checkpoint: snapshot.block, wallet: child.occupant,
      activationId: 1107, level: 6, tx: receipt.hash, block: receipt.blockNumber, blockHash: block.hash,
      timestamp: new Date(timestamp * 1000).toISOString(), blockSearchRequests: requests,
      userDebitRaw: debit, managerRecipientsRaw: recipients, indexedPosition: child, events };
    fs.writeFileSync(path.resolve(__dirname, "../../docs/evidence/id1-level6-descendant1107-receipt-2026-11-12.json"), json(report) + "\n");
    console.log(json(report));
  } finally { provider.destroy(); }
}

main().catch(error => { console.error(error.shortMessage || error.message); process.exitCode = 1; });
