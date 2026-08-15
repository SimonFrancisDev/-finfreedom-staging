# Repository Registry

This registry defines ownership. Folder names alone must not be used to decide
what is production or staging.

## Production Runtime Repositories

| Component | Local root | Remote | Branch |
| --- | --- | --- | --- |
| Backend API and worker | ../backend | SimonFrancisDev/fin-freedom-backend | main |
| Frontend | ../Fin-Freedom-Web2 - Copy | SimonFrancisDev/ffn-frontend | main |

Production platform settings must deploy these repositories from their
repository roots. Environment values remain in Render and Vercel and are not
committed.

## Canonical Contract Repository

The canonical source for the currently deployed core contracts is
./smart-contract in this repository.

The sibling ../Smart-Contract repository is a legacy divergent contract
repository. Its current P4, P12, P39, Registration, and LevelManager artifacts
do not match the executable bytecode currently running on Polygon production.
It must not be used for production until explicitly reconciled and
bytecode-certified against the canonical source.

## Staging Monorepository

The staging-environment repository contains the staging backend, staging
frontend, canonical smart-contract source, and non-secret operations records.
These are normal tracked directories, not independent Git worktrees.

Every deployment record must contain the repository remote, branch, commit
SHA, chain ID, addresses, deployment/start blocks, manifest path, verification
status, and timestamp. No deployment is certified from a dirty working tree.
