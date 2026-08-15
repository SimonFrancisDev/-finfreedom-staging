# Workspace Cleanup Report

Date: 2026-08-15

## Result

The workspace was reduced from 494 original dirty entries to clean,
independently versioned repositories. Production and staging ownership are
documented without physically moving deployment roots.

## Canonical Ownership

- Production backend: fin-freedom-backend
- Production frontend: ffn-frontend
- Canonical contracts and staging services: -finfreedom-staging
- Legacy contract history only: ffn-smart-contract

## Preserved and Pushed

- Frontend video and brand package
- Production and staging address baselines
- Repository ownership registry and classification policy
- Wallet-replacement migration contracts and harnesses
- Six wallet-replacement test suites
- Guarded backend migration, rollback, and verification tools
- Production migration packages, deployment manifests, proposal records,
  provenance, pre/post-state evidence, and certification reports
- Wallet-replacement deployment and governance toolchain

## Archived Before Removal

Archives are stored outside all Git repositories under:

    C:\DevProjects\f-freedom-stable\tmp\workspace-cleanup-20260815

Their hashes are recorded in archive-index/workspace-cleanup-20260815.json.
The staging diagnostics archive contains authenticated RPC endpoints and must
not be committed or shared publicly.

## Removed

- 258 generated frontend build-snapshot files
- one generated frontend validation build
- empty local Mongo scratch data
- backend incident-only probes and undeployed snapshot experiment
- staging one-off diagnostics and raw RPC captures
- divergent uncommitted changes from the legacy contract repository

## Verification

- Production frontend build: PASS, 3315 modules transformed
- Wallet replacement Registration tests: PASS, 3
- Wallet replacement LevelManager tests: PASS, 2
- Wallet replacement orbit tests: PASS, 4
- Captured-chain orbit replay tests: PASS, 3
- Wallet replacement escrow tests: PASS, 2
- Wallet replacement token tests: PASS, 3
- Total wallet replacement assertions: 17 passing
- Retained migration operation scripts: JavaScript syntax checks passed
- Sensitive-file gate blocked authenticated RPC captures from Git

## Deployment Warning

Pushing a repository does not prove Render or Vercel has deployed that commit.
Before the next runtime release, record each platform's deployed commit SHA and
compare it with the intended repository head. Contract deployments additionally
require on-chain proxy implementation-slot and executable-bytecode checks.

The legacy ffn-smart-contract repository remains prohibited for deployment.
