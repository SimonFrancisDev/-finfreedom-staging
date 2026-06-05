param(
  [string]$Root = (Resolve-Path "$PSScriptRoot\..").Path
)

$ErrorActionPreference = "Stop"

$backendEnv = Join-Path $Root "backend\.env"
$workerEnv = Join-Path $Root "backend\WORKER.env"
$frontendEnv = Join-Path $Root "frontend\.env"
$contractEnv = Join-Path $Root "smart-contract\.env"

$files = @($backendEnv, $workerEnv, $frontendEnv, $contractEnv)

foreach ($file in $files) {
  if (!(Test-Path -LiteralPath $file)) {
    throw "Missing staging env file: $file"
  }
}

$text = ($files | ForEach-Object { Get-Content -LiteralPath $_ -Raw }) -join "`n"

$blockedPatterns = @(
  "fin-freedom-backend-3.onrender.com",
  "www.finfreedomnetwork.io",
  "https://finfreedomnetwork.io",
  "https://www.finfreedomnetwork.io",
  "NODE_ENV=production",
  "TELEGRAM_ENABLED=true",
  "NOTIFICATIONS_ENABLED=true"
)

foreach ($pattern in $blockedPatterns) {
  if ($text -match [regex]::Escape($pattern)) {
    throw "Unsafe staging config found: $pattern"
  }
}

$backend = Get-Content -LiteralPath $backendEnv -Raw
$worker = Get-Content -LiteralPath $workerEnv -Raw
$frontend = Get-Content -LiteralPath $frontendEnv -Raw
$frontendViteConfig = Join-Path $Root "frontend\vite.config.js"
$frontendVite = if (Test-Path -LiteralPath $frontendViteConfig) { Get-Content -LiteralPath $frontendViteConfig -Raw } else { "" }

if ($backend -notmatch "MONGODB_URI=.*finfreedom-staging") {
  throw "Backend MONGODB_URI must point to a staging database containing 'finfreedom-staging'."
}

if ($worker -notmatch "MONGODB_URI=.*finfreedom-staging") {
  throw "Worker MONGODB_URI must point to a staging database containing 'finfreedom-staging'."
}

if ($backend -match "RUN_INDEXER=true") {
  throw "Backend API .env must keep RUN_INDEXER=false. Use WORKER.env for indexing."
}

if ($worker -notmatch "RUN_INDEXER=true") {
  throw "Backend WORKER.env must set RUN_INDEXER=true."
}

$sameOriginApiProxy = $frontend -match "(?m)^VITE_API_BASE_URL=\s*$" -and
  $frontendVite -match "'/api'" -and
  $frontendVite -match "http://localhost:5001"

if (!$sameOriginApiProxy -and $frontend -notmatch "VITE_API_BASE_URL=http://localhost:5001" -and $frontend -notmatch "VITE_API_BASE_URL=https://.*staging") {
  throw "Frontend VITE_API_BASE_URL must point to localhost staging backend, a staging backend URL, or use the Vite /api proxy to localhost:5001."
}

if ($backend -notmatch "FRONTEND_ORIGIN=http://localhost:(3000|5174)" -and $backend -notmatch "FRONTEND_ORIGIN=https://.*staging") {
  throw "Backend FRONTEND_ORIGIN must point to localhost staging frontend or a staging frontend URL."
}

Write-Host "Staging safety check passed." -ForegroundColor Green
