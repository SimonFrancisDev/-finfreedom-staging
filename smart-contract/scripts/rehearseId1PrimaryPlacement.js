// Local-only counterfactual replay. Never submits a transaction to the source RPC.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const hre = require("hardhat");
const { assertStorageUpgradeSafe } = require("@openzeppelin/upgrades-core");

const { ethers, network, artifacts } = hre;
const FORK_BLOCK = 96536530;
const IMPLEMENTATION_SLOT = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const addresses = {
  registration: "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5",
  manager: "0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53",
  p4: "0x1ED0b443c880Ba88F732c3F5915561A07B21F6B4",
  p12: "0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b",
  p39: "0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb",
  id1: "0xCE38722a72c9099D9237897E18B0cfb6D51c4470",
  sofia: "0xEA2bCf620d164Af63fba2F832C5F37E9eABdC528",
  sabina: "0xb673c9D14Da920f187d25Cc793f1955a43284622",
  parent: "0xE8b1ac47231651cCc38326a59645a8D976D0Eabf",
};

function equalAddress(actual, expected) {
  assert.equal(actual.toLowerCase(), expected.toLowerCase());
}

function baselineContract(folder, source, name, runtime) {
  for (const file of fs.readdirSync(folder).filter((item) => item.endsWith(".json"))) {
    const build = JSON.parse(fs.readFileSync(path.join(folder, file), "utf8"));
    const contract = build.output.contracts?.[source]?.[name];
    if (!contract) continue;
    const bytecode = contract.evm.deployedBytecode;
    const normalize = (hex) => {
      let value = hex.replace(/^0x/, "");
      for (const refs of Object.values(bytecode.immutableReferences || {})) {
        for (const { start, length } of refs) {
          value = value.slice(0, start * 2) + "0".repeat(length * 2) + value.slice((start + length) * 2);
        }
      }
      return value.toLowerCase();
    };
    if (normalize(runtime) === normalize(bytecode.object)) return contract;
  }
  throw new Error(`No bytecode-matched compiler baseline for ${name}; rehearsal stopped`);
}

async function fundLocalReplayBalance(token, wallet, required) {
  assert.equal(network.name, "hardhat");
  assert.equal((await ethers.provider.getNetwork()).chainId, 31337n);
  const balance = await token.balanceOf(wallet);
  if (balance >= required) return 0n;
  assert.equal(process.env.ID1_ALLOW_SYNTHETIC_FUNDING, "1",
    `Insufficient historical USDT for ${wallet}: ${balance}; explicit local synthetic funding required`);
  // Later historical deposits are not part of this four-activation replay.
  // Identify the actual ERC20 balance slot from a local execution trace, never
  // guess a slot or submit a token transfer to the source chain.
  const trace = await network.provider.send("debug_traceCall", [{
    to: token.target, data: token.interface.encodeFunctionData("balanceOf", [wallet]),
  }, "latest", { disableMemory: true, disableStorage: true }]);
  const reads = new Set(trace.structLogs.filter((entry) => entry.op === "SLOAD")
    .map((entry) => "0x" + entry.stack.at(-1).replace(/^0x/, "").padStart(64, "0")));
  let balanceSlot;
  for (let slot = 0; slot < 1024; slot += 1) {
    const candidate = ethers.keccak256(ethers.AbiCoder.defaultAbiCoder().encode(["address", "uint256"], [wallet, slot]));
    if (reads.has(candidate) && BigInt(await ethers.provider.getStorage(token.target, candidate)) === balance) {
      balanceSlot = candidate;
      break;
    }
  }
  assert(balanceSlot, "Could not identify balance storage from local trace; stopped without a token transfer");
  await network.provider.send("hardhat_setStorageAt", [token.target, balanceSlot, ethers.toBeHex(required, 32)]);
  assert.equal(await token.balanceOf(wallet), required);
  return required - balance;
}

async function main() {
  assert.equal(network.name, "hardhat", "This script only permits the in-process Hardhat network");
  assert.equal((await ethers.provider.getNetwork()).chainId, 31337n);
  const rpc = process.env.ID1_MAINNET_REPLAY_RPC;
  const baseline = process.env.ID1_BASELINE_BUILD_INFO;
  assert(rpc && baseline, "Explicit mainnet source RPC and baseline build-info directory required");
  const source = new ethers.JsonRpcProvider(rpc);
  try {
    assert.equal((await source.getNetwork()).chainId, 137n, "Source must be Polygon mainnet, not Amoy");
  } finally {
    source.destroy();
  }
  await network.provider.send("hardhat_reset", [{ forking: { jsonRpcUrl: rpc, blockNumber: FORK_BLOCK } }]);
  const registration = await ethers.getContractAt("RegistrationFixed", addresses.registration);
  const manager = await ethers.getContractAt("LevelManager", addresses.manager);
  const usdt = await ethers.getContractAt("IERC20", await manager.usdt());
  const p12 = await ethers.getContractAt("P12Orbit", addresses.p12);
  const p39 = await ethers.getContractAt("P39Orbit", addresses.p39);
  equalAddress(await registration.getReferrer(addresses.sofia), addresses.sabina);
  equalAddress((await p12.getPosition(addresses.id1, 8, 3)).occupant, ethers.ZeroAddress);
  equalAddress((await p39.getPosition(addresses.id1, 9, 2)).occupant, ethers.ZeroAddress);

  for (const [name, proxy] of [
    ["LevelManager", addresses.manager], ["P4Orbit", addresses.p4],
    ["P12Orbit", addresses.p12], ["P39Orbit", addresses.p39],
  ]) {
    const old = ethers.getAddress("0x" + (await ethers.provider.getStorage(proxy, IMPLEMENTATION_SLOT)).slice(-40));
    const original = baselineContract(baseline, `contracts/${name}.sol`, name, await ethers.provider.getCode(old));
    const build = await artifacts.getBuildInfo(`contracts/${name}.sol:${name}`);
    assertStorageUpgradeSafe(original.storageLayout, build.output.contracts[`contracts/${name}.sol`][name].storageLayout, false);
    const implementation = await (await ethers.getContractFactory(name)).deploy();
    await implementation.waitForDeployment();
    // Bypass governance only on this disposable local fork. This is not a deploy script.
    await network.provider.send("hardhat_setStorageAt", [proxy, IMPLEMENTATION_SLOT, ethers.zeroPadValue(implementation.target, 32)]);
    console.log(JSON.stringify({ contract: name, originalImplementation: old, bytecodeBaselineMatched: true, storageCompatible: true }));
  }

  const [localSigner] = await ethers.getSigners();
  const router = await (await ethers.getContractFactory("LevelSettlementRouter", localSigner)).deploy(addresses.manager, usdt.target);
  await router.waitForDeployment();
  const governance = await manager.owner();
  await network.provider.send("hardhat_impersonateAccount", [governance]);
  await network.provider.send("hardhat_setBalance", [governance, ethers.toBeHex(ethers.parseEther("100"))]);
  await (await manager.connect(await ethers.getSigner(governance)).setSettlementRouter(router.target)).wait();
  await network.provider.send("hardhat_stopImpersonatingAccount", [governance]);

  const results = [];
  for (const [wallet, level, slot, timestamp] of [
    [addresses.sofia, 8, 3, "2026-11-01T05:17:33Z"],
    [addresses.sofia, 9, 2, "2026-11-01T05:18:54Z"],
    [addresses.sabina, 8, 4, "2026-11-03T11:26:10Z"],
    [addresses.sabina, 9, 3, "2026-11-11T08:15:55Z"],
  ]) {
    await network.provider.send("hardhat_impersonateAccount", [wallet]);
    await network.provider.send("hardhat_setBalance", [wallet, ethers.toBeHex(ethers.parseEther("100"))]);
    const signer = await ethers.getSigner(wallet);
    const price = await manager.levelPrices(level);
    const syntheticTopUp = await fundLocalReplayBalance(usdt, wallet, price);
    console.log(JSON.stringify({ phase: "replay-start", wallet, level, syntheticLocalUsdtRaw: syntheticTopUp.toString() }));
    await (await usdt.connect(signer).approve(addresses.manager, price)).wait();
    const beforeParent = await usdt.balanceOf(addresses.parent);
    const latest = await network.provider.send("eth_getBlockByNumber", ["latest", false]);
    // Local implementation installation mines blocks before the first replay.
    const replayTimestamp = Math.max(Date.parse(timestamp) / 1000, Number(BigInt(latest.timestamp)) + 1);
    await network.provider.send("evm_setNextBlockTimestamp", [replayTimestamp]);
    const receipt = await (await registration.connect(signer).activateLevel(level)).wait();
    assert.equal(receipt.status, 1);
    const orbit = level === 8 ? p12 : p39;
    equalAddress((await orbit.getPosition(addresses.id1, level, slot)).occupant, wallet);
    const parentDelta = (await usdt.balanceOf(addresses.parent)) - beforeParent;
    if (wallet === addresses.sabina && level === 8) {
      assert.equal(parentDelta, ethers.parseUnits("512", 6));
      equalAddress((await p12.getPosition(addresses.parent, 8, 1)).occupant, wallet);
      equalAddress(await registration.currentMatrixParentOf(wallet, 8), addresses.parent);
    }
    const summary = receipt.logs.map((log) => { try { return manager.interface.parseLog(log); } catch { return null; } })
      .find((event) => event?.name === "ActivationFinancialSummaryRecorded");
    assert(summary, "Financial summary required");
    assert.equal(summary.args.activationAmount, price);
    assert.equal(summary.args.totalLiquidPaid + summary.args.systemCharge, price);
    const result = { wallet, level, id1Position: slot, originalTimestamp: timestamp, replayTimestamp,
      syntheticLocalUsdtRaw: syntheticTopUp.toString(),
      parentPaymentRaw: parentDelta.toString(),
      activationAmountRaw: price.toString(), liquidPaidRaw: summary.args.totalLiquidPaid.toString(),
      systemChargeRaw: summary.args.systemCharge.toString(), localTransaction: receipt.hash };
    results.push(result);
    console.log(JSON.stringify({ phase: "replay-passed", ...result }));
    await network.provider.send("hardhat_stopImpersonatingAccount", [wallet]);
  }
  equalAddress(await registration.getReferrer(addresses.sofia), addresses.sabina);
  console.log(JSON.stringify({ sourceChainId: 137, executionChainId: 31337, forkBlock: FORK_BLOCK,
    scope: "Four selected counterfactual activations, not a historical repair or full intervening-chain replay",
    liveTransactionsSent: 0, results }, null, 2));
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.shortMessage || error.message);
    process.exitCode = 1;
  });
}

module.exports = { addresses, baselineContract, fundLocalReplayBalance };
