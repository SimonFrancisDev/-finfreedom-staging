# Additive launch controls

## Scope

Only Freedom-Plus, Freedom NFT and Tasks routes are gated. Existing F-Freedom,
home, account, support and other existing public routes remain available.
Shared pages selecting program=freedom-plus are gated for that program view.
No database reset, wallet reset or production migration is performed by this code.

This is website/API release access, not a new on-chain authorization rule.
Public smart contracts remain callable directly under their own permissions.

## Configuration

Backend API:

- NEW_FEATURE_LAUNCH_ENABLED=true
- NEW_FEATURE_LAUNCH_AT=2026-10-01T20:00:00Z
- EARLY_ACCESS_SIGNING_SECRET: independent cryptographically random secret,
  minimum 32 characters; never a VITE variable, never committed.
- FRONTEND_ORIGIN: exact production origin used in generated invitations.

Frontend:

- VITE_NEW_FEATURE_LAUNCH_ENABLED=true
- Existing VITE_FREEDOM_PLUS_ENABLED=true, but only with verified production
  contract addresses and matching backend configuration.
- Retire VITE_EARLY_ACCESS_CODE. The old whole-site launch gate is no longer used.

The API enforces its own UTC clock at every request. The frontend countdown
uses server time plus monotonic elapsed time and refreshes status every 30 seconds.
No scheduled administrator click or redeploy is required at the launch boundary.
The banner automatically disappears at 2026-10-08T20:00:00Z.

## Invitations

POST /api/launch/invitations using the existing admin authentication header.
The response contains url and expiresAt. Send the returned URL privately.
It opens /freedom-plus with the signed token in a fragment, not a query string.
The browser stores it for that session and removes the fragment from the address.
Protected API requests send X-Early-Access; invitation signatures are validated
server-side. CORS permits this header only under the existing allowed-origin policy.

Links are bearer invitations: someone receiving a forwarded link can also enter
before expiry. They are not single-use or wallet-bound. Rotating the signing
secret revokes all outstanding invitations. They confer no admin or fund authority.
Invitation issuance must remain admin-protected; never publish an admin API key.

## Deployment order and acceptance

1. Verify production contracts and candidate compatibility before enabling Plus.
2. Deploy backend with the UTC date, signing secret and production frontend origin.
3. Deploy matching frontend with scoped launch enabled.
4. Check home and existing F-Freedom are accessible without an invitation.
5. Check new features reject access before launch, accept a valid invitation,
   and reject a tampered invitation.
6. Verify automatic opening and seven-day expiry using isolated boundary tests.
7. Issue the requested private link only from the deployed production API.

Do not claim a working production invitation until that API has issued one.
Changing the date after deployment requires updating backend configuration;
never move the launch earlier merely to bypass incomplete deployment work.

## Rollback

Preserve existing production data. A frontend rollback does not undo contract
transactions. Restore previous hosted release/configuration if necessary;
contract rollback requires its separately validated governance procedure.

## Current execution status

Implemented and pushed in canonical staging commit fb3223d. Vercel logs confirm
that exact commit built and deployed successfully on 2026-10-01 at 09:35 UTC:
https://finfreedom-staging-g15pfmjq6-chukwuemeka-francis-s-projects.vercel.app

This is the staging project, not the main production site. Scoped launch controls
still require the documented hosted configuration. Production invitation issuance
has not occurred. Three isolated launch-access tests passed. The build reported
28 dependency vulnerabilities (1 low, 7 moderate, 17 high, 3 critical); their
exploitability was not assessed by the build and no forced dependency update was
performed. A successful build is not a security audit.
