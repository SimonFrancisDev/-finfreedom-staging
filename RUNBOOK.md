# Staging Runbook

This is the exact order to follow. Do not skip steps.

## 1. Local Safety Check

From `C:\DevProjects\f-freedom-stable`:

```powershell
.\staging-environment\scripts\check-staging-safety.ps1
```

If this fails, do not run or deploy staging.

## 2. What You Must Create Externally

I cannot create these without your accounts/API access:

- A new MongoDB Atlas database named `finfreedom-staging`.
- A staging HTTP RPC URL and WS RPC URL.
- Later, a staging Render backend service.
- Later, a staging frontend preview/domain.

## 3. Local Backend

Edit:

```text
C:\DevProjects\f-freedom-stable\staging-environment\backend\.env
```

Replace:

- `MONGODB_URI`
- `RPC_URL_1`
- `WS_RPC_URL_1`
- contract addresses after testnet deployment

Keep:

```env
RUN_INDEXER=false
NOTIFICATIONS_ENABLED=false
TELEGRAM_ENABLED=false
```

Run backend:

```powershell
cd C:\DevProjects\f-freedom-stable\staging-environment\backend
npm install
npm run dev
```

This starts the staging API with `.env`.

Expected role:

```env
PORT=5001
RUN_INDEXER=false
```

## 3B. Local Worker

The worker mirrors production's worker role. It uses `WORKER.env`.

Expected role:

```env
PORT=5002
RUN_INDEXER=true
```

Run worker in a separate PowerShell:

```powershell
cd C:\DevProjects\f-freedom-stable\staging-environment\backend
$env:DOTENV_CONFIG_PATH=".\WORKER.env"
npm run dev
```

Keep the API and worker in separate terminals.

## 4. Local Frontend

Edit:

```text
C:\DevProjects\f-freedom-stable\staging-environment\frontend\.env
```

Replace:

- `VITE_RPC_URL`
- contract addresses after testnet deployment

Run frontend:

```powershell
cd C:\DevProjects\f-freedom-stable\staging-environment\frontend
npm install
npm run dev -- --port 5174
```

Open:

```text
http://localhost:5174
```

## 5. Production Rule

Nothing moves to production until:

- the safety check passes,
- staging frontend works,
- staging backend works,
- mobile wallet behavior is tested,
- profile lock/unlock is tested,
- orbit modal is tested,
- admin flow is tested if touched.
