import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const root = process.cwd()
const [ffManifest, plusManifest] = process.argv.slice(2)
if (!ffManifest || !plusManifest) throw new Error('Pass explicit F-Freedom and Freedom-Plus staging manifest paths')
const f = JSON.parse(fs.readFileSync(path.resolve(root, ffManifest), 'utf8'))
const p = JSON.parse(fs.readFileSync(path.resolve(root, plusManifest), 'utf8'))
if (String(f.chainId) !== '80002' || String(p.chainId) !== '80002') throw new Error('Amoy manifests required')
const require = createRequire(path.join(root, 'backend/package.json'))
const { parse } = require('dotenv')
const proxy = (name) => p.contracts[name].proxy
const expected = {
  CHAIN_ID: '80002',
  REGISTRATION_ADDRESS: f.addresses.registration,
  LEVEL_MANAGER_ADDRESS: f.addresses.levelManager,
  START_BLOCK: String(f.deploymentBlocks.NFTPoolVault),
  START_BLOCK_REGISTRATION: String(f.deploymentBlocks.Registration),
  START_BLOCK_LEVEL_MANAGER: String(f.deploymentBlocks.LevelManager),
  FREEDOM_PLUS_REGISTRATION_ADDRESS: proxy('FreedomPlusRegistration'),
  FREEDOM_PLUS_LEVEL_MANAGER_ADDRESS: proxy('FreedomPlusLevelManager'),
  FREEDOM_PLUS_START_BLOCK: String(p.contracts.FPTToken.deploymentBlock),
  NFT_POOL_VAULT_ADDRESS: proxy('FreedomNFTPoolVault'),
  OPERATIONS_VAULT_ADDRESS: f.addresses.operationsVault,
}
const files = [
  'backend/.env',
  'env-files/render-staging-api.runtime.env',
  'env-files/render-staging-worker.runtime.env',
]
const errors = []
for (const relative of files) {
  const file = path.join(root, relative)
  if (!fs.existsSync(file)) { errors.push(relative + ': missing configuration file'); continue }
  const actual = parse(fs.readFileSync(file, 'utf8'))
  for (const [key, value] of Object.entries(expected)) {
    if (actual[key] === undefined || actual[key].toLowerCase() !== value.toLowerCase()) {
      errors.push(relative + ': ' + key + ' is stale')
    }
  }
}
const links = [
  ['chain ID', f.chainId, p.chainId],
  ['registration link', f.addresses.registration, p.fFreedomRegistration],
  ['USDT', f.addresses.usdt, p.usdt],
  ['multisig', f.multisig, p.multisig],
  ['guardian', f.guardian, p.guardian],
]
for (const [label, left, right] of links) {
  if (String(left).toLowerCase() !== String(right).toLowerCase()) errors.push(label + ' mismatch')
}
if (errors.length) {
  console.error('Staging cutover validation FAILED')
  errors.forEach((error) => console.error('- ' + error))
  process.exitCode = 1
} else {
  console.log('Staging manifests and present public runtime checkpoints are consistent.')
}
