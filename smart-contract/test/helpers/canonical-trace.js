const { ethers } = require("hardhat");

const TRACKED_EVENTS = new Set([
  "Registered",
  "PositionActivationLinked",
  "LinePaymentTracked",
  "PaymentRuleApplied",
  "PositionFilled",
  "SpilloverPaid",
  "PayoutReceiptRecorded",
  "DetailedPayoutReceiptRecorded",
  "PayoutNotDelivered",
  "EscrowLocked",
  "EscrowUsedForUpgrade",
  "AutoUpgradeTriggered",
  "AutoUpgradeCompleted",
  "OrbitReset",
  "RecycleCompletedDetailed",
  "SystemChargeDistributedDetailed",
  "ActivationFinancialSummaryRecorded",
  "LevelActivated",
  "LevelActivatedInOrbit",
]);

function jsonValue(value) {
  if (typeof value === "bigint") return value.toString();
  if (Array.isArray(value)) return value.map(jsonValue);
  return value;
}

function contractInterfaces(contracts) {
  return Object.entries(contracts)
    .filter(([, contract]) => contract?.interface)
    .map(([name, contract]) => ({ name, address: contract.target, iface: contract.interface }));
}

function decodeTrace(receipt, contracts, labels = {}) {
  const interfaces = contractInterfaces(contracts);
  const events = [];

  for (const log of receipt.logs) {
    for (const source of interfaces) {
      if (String(source.address).toLowerCase() !== log.address.toLowerCase()) continue;
      try {
        const parsed = source.iface.parseLog(log);
        if (!parsed || !TRACKED_EVENTS.has(parsed.name)) break;
        const args = {};
        parsed.fragment.inputs.forEach((input, index) => {
          const value = jsonValue(parsed.args[index]);
          args[input.name || String(index)] =
            typeof value === "string" && ethers.isAddress(value)
              ? { address: ethers.getAddress(value), label: labels[value.toLowerCase()] || null }
              : value;
        });
        events.push({ index: log.index, source: source.name, event: parsed.name, args });
        break;
      } catch (_) {}
    }
  }

  return events;
}

async function balanceSnapshot(usdt, addresses) {
  return Object.fromEntries(await Promise.all(addresses.map(async (address) => [
    ethers.getAddress(address),
    (await usdt.balanceOf(address)).toString(),
  ])));
}

function balanceChanges(before, after, labels = {}) {
  return Object.keys(after).map((address) => ({
    address,
    label: labels[address.toLowerCase()] || null,
    before: before[address],
    after: after[address],
    delta: (BigInt(after[address]) - BigInt(before[address])).toString(),
  })).filter((row) => row.delta !== "0");
}

async function traceTransaction({ title, transaction, contracts, watchedAddresses, labels }) {
  const before = await balanceSnapshot(contracts.usdt, watchedAddresses);
  const tx = await transaction();
  const receipt = await tx.wait();
  const after = await balanceSnapshot(contracts.usdt, watchedAddresses);

  return {
    title,
    hash: receipt.hash,
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed.toString(),
    balanceChanges: balanceChanges(before, after, labels),
    events: decodeTrace(receipt, contracts, labels),
  };
}

function displayValue(value) {
  if (value && typeof value === "object" && value.address) {
    return value.label ? `${value.label} (${value.address})` : value.address;
  }
  return String(value);
}

function formatUsdt(baseUnits) {
  return ethers.formatUnits(BigInt(baseUnits), 6);
}

function renderTraceMarkdown(report) {
  const lines = [
    "# Canonical Contract-Derived Behavior Trace",
    "",
    `Generated: ${report.generatedAt}`,
    "",
    "All amounts below are read from transaction events or token balance changes. This file is generated, not manually transcribed.",
    "",
    "## Final Cycle State",
    "",
    `Bob P12 completed cycles: ${report.finalState.ownerP12Cycles}`,
    `Bob P39 completed cycles: ${report.finalState.ownerP39Cycles}`,
    "",
  ];

  report.transactions.forEach((transaction, index) => {
    lines.push(`## ${index + 1}. ${transaction.title}`, "", `Transaction: \`${transaction.hash}\``, `Block: ${transaction.blockNumber}`, "");
    if (transaction.balanceChanges.length) {
      lines.push("USDT balance changes:", "");
      for (const change of transaction.balanceChanges) {
        const sign = BigInt(change.delta) > 0n ? "+" : "";
        lines.push(`- ${change.label || change.address}: ${sign}${formatUsdt(change.delta)} USDT`);
      }
      lines.push("");
    }
    lines.push("Ordered contract evidence:", "");
    for (const event of transaction.events) {
      const details = Object.entries(event.args)
        .map(([key, value]) => `${key}=${displayValue(value)}`)
        .join(", ");
      lines.push(`- ${event.index}. ${event.source}.${event.event}: ${details}`);
    }
    lines.push("");
  });

  return `${lines.join("\n")}\n`;
}

module.exports = { renderTraceMarkdown, traceTransaction };
