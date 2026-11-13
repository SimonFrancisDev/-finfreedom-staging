// Export only public chain evidence needed to reproduce package validation offline.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const ROOT = path.resolve(__dirname, "../../..");
const read = file => JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
const paths = ["tmp/id1-production-package.json", "tmp/freedom-plus-id1-audit/events.json"];
const previous = read(paths[0]); const audit = read(paths[1]);
const pick = (v, keys) => Object.fromEntries(keys.map(k => [k, v[k]]));
const output = {
  purpose: "Public read-only input subset; not deployment or submission authorization",
  sourceSha256: Object.fromEntries(paths.map(file => [file, crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, file))).digest("hex")])),
  previous: pick(previous, ["packageId", "chainId", "addresses", "deployments", "actions", "previousImplementations", "previousRouter"]),
  audit: { ...pick(audit, ["chainId", "id1", "governance", "contracts", "wiring", "fromBlock", "toBlock", "toBlockHash"]),
    events: audit.events.filter(e => e.event === "PositionRecorded") },
};
const file = path.join(ROOT, "staging-environment/docs/evidence/combined-placement-package-inputs-2026-11-13.json");
fs.writeFileSync(file, JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify({ file, sourceWrites: 0, positionEvents: output.audit.events.length }));
