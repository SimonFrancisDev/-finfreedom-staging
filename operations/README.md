# Operations Control Plane

This directory contains non-secret operational records used to identify and
reproduce production and staging deployments.

## Safety Rules

1. Inventory and classify before moving, deleting, staging, or committing.
2. Never commit private keys, database credentials, bot tokens, authenticated
   RPC URLs, or platform access tokens.
3. Production and staging deployment records must remain separate.
4. A generated file is deleted only when its source and reproduction command
   are known.
5. A production migration artifact is retained until its on-chain outcome,
   rollback path, and replacement artifact are documented.

## Directories

- workspace-inventory: checksum-backed inventory of dirty workspace files.
- production: production deployment baselines and sanitized audit indexes.
- staging: staging deployment baselines and certification indexes.
- archive-index: manifests for evidence archived outside runtime repositories.

Run the read-only inventory generator:

    .\scripts\workspace-governance\Export-WorkspaceInventory.ps1

The generator does not move, delete, stage, commit, or push files.
