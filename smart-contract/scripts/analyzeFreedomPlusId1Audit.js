const fs = require('node:fs');
const path = require('node:path');
const { analyze } = require('./lib/freedomPlusId1Audit');
const dir = path.resolve(__dirname, '../../../tmp/freedom-plus-id1-audit');
const report = analyze(JSON.parse(fs.readFileSync(path.join(dir, 'events.json'))));
fs.writeFileSync(path.join(dir, 'analysis.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ status: report.status, counts: report.counts,
  missing: report.missingRootMirrors.map(p => ({ participant: p.participant, level: p.level, tx: p.tx,
    sourceOwner: p.sourceOwner, rootAnchor: p.requiredRootAnchor })), upgrades: report.upgrades }, null, 2));
