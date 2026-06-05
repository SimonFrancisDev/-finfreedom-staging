# F-Freedom Staging Environment

This folder is the isolated staging workspace. It exists so changes can be tested before production.

Production folders remain:

- `../Fin-Freedom-Web2 - Copy`
- `../backend`
- `../Smart-Contract`

Staging folders are:

- `frontend` - frontend worktree on `staging-frontend-testing`
- `backend` - backend worktree on `staging-backend-testing`
- `smart-contract` - smart contract worktree on `staging-contract-testing`
- `env-files` - non-secret staging env templates and safety notes

## Non-Negotiable Rules

1. Do not put the production MongoDB URI in staging.
2. Do not point staging frontend at the production backend.
3. Do not deploy staging code to the production domain.
4. Do not run a staging indexer against the production database.
5. The backend indexer switch in this codebase is `RUN_INDEXER`; keep it `false` unless intentionally testing a staging indexer.
6. Test mobile wallet behavior before production rollout.
7. Production deployment happens only after staging validation.

## Intended Flow

1. Make code changes in this staging workspace.
2. Run local build/tests.
3. Deploy staging backend to a separate Render service.
4. Deploy staging frontend to a separate staging/preview domain.
5. Test with internal wallets only.
6. Approve the change.
7. Merge/deploy to production.
8. Verify production quickly.

## Safe Modes

### Full Testnet Mode

Use Polygon Amoy/testnet contracts, staging backend, staging database, and staging frontend.
This is safest for transaction testing.

### Mainnet Read-Only Mirror Mode

Use Polygon mainnet contract addresses for reads, but staging backend and staging database.
Do not enable staging indexers or write jobs unless explicitly testing them.
