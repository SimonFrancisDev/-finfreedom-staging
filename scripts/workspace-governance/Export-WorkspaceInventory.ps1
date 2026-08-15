param(
    [string]$WorkspaceRoot = "C:\DevProjects\f-freedom-stable",
    [string]$OutputDirectory = ""
)

$ErrorActionPreference = "Stop"

if (-not $OutputDirectory) {
    $OutputDirectory = Join-Path $WorkspaceRoot "staging-environment\operations\workspace-inventory"
}

$repositories = @(
    @{ Name = "production-backend"; Path = "backend" },
    @{ Name = "production-frontend"; Path = "Fin-Freedom-Web2 - Copy" },
    @{ Name = "legacy-production-contract"; Path = "Smart-Contract" },
    @{ Name = "staging-monorepo"; Path = "staging-environment" }
)

function Get-Classification {
    param([string]$Repository, [string]$Path, [string]$Status)
    $normalized = $Path.Replace("\", "/")

    if ($Repository -eq "production-frontend" -and $normalized.StartsWith("tmp-production-build/")) {
        return "generated-delete-candidate"
    }
    if ($normalized -match "(^|/)(\.tmp-mongo|dist|build|coverage|cache|artifacts)(/|$)" -or $normalized -match "\.(log|tmp)$") {
        return "generated-delete-candidate"
    }
    if ($Repository -eq "production-frontend" -and $normalized.StartsWith("docs/")) {
        return "shared-documentation"
    }
    if ($Repository -eq "staging-monorepo" -and $normalized -match "^smart-contract/contracts/(migration|mocks)/") {
        return "canonical-migration-source"
    }
    if ($Repository -eq "staging-monorepo" -and $normalized -match "^smart-contract/test/wallet-replacement-") {
        return "canonical-migration-test"
    }
    if ($Repository -eq "staging-monorepo" -and $normalized -match "^smart-contract/(deployments-production-migration|migration-packages|migration-audits|test-reports)/") {
        return "production-audit-evidence-review"
    }
    if ($normalized -match "(^|/).+\.tmp\.(js|ps1)$") {
        return "temporary-diagnostic-review"
    }
    if ($Repository -eq "production-backend" -and $normalized -eq "src/models/WalletIdentityAlias.js") {
        return "production-migration-source-review"
    }
    if ($Repository -eq "production-backend" -and $Status -notmatch "^\?\?") {
        return "production-runtime-change-review"
    }
    if ($Repository -eq "legacy-production-contract") {
        return "divergent-contract-review"
    }
    return "manual-review"
}

function Get-SensitivityFlags {
    param([string]$FullPath)
    if (-not (Test-Path -LiteralPath $FullPath -PathType Leaf)) { return @() }

    $extension = [IO.Path]::GetExtension($FullPath).ToLowerInvariant()
    if ($extension -notin @(".js", ".ps1", ".json", ".md", ".sol", ".txt", ".env")) { return @() }

    $content = Get-Content -LiteralPath $FullPath -Raw -ErrorAction SilentlyContinue
    if ($null -eq $content) { return @() }

    $flags = @()
    if ($content -match "quiknode\.pro/[A-Za-z0-9_-]+") { $flags += "embedded-authenticated-rpc" }
    if ($content -match "mongodb(\+srv)?://.+:.+@") { $flags += "embedded-database-credential" }
    if ($content -match "(?i)(private[_-]?key|mnemonic).{0,20}0x[0-9a-f]{64}") { $flags += "embedded-signing-secret" }
    if ($content -match "\b[0-9]{8,12}:AA[A-Za-z0-9_-]{25,}\b") { $flags += "embedded-bot-token" }
    return @($flags | Sort-Object -Unique)
}

New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null
$inventory = @()
$repositorySummary = @()

foreach ($repository in $repositories) {
    $repositoryRoot = Join-Path $WorkspaceRoot $repository.Path
    $gitArgs = @("-c", "safe.directory=$($repositoryRoot.Replace('\', '/'))", "-C", $repositoryRoot)
    $statusLines = & git @gitArgs status --porcelain=v1 --untracked-files=all
    $head = (& git @gitArgs rev-parse HEAD).Trim()
    $branch = (& git @gitArgs branch --show-current).Trim()
    $remote = (& git @gitArgs remote get-url origin).Trim()

    foreach ($line in $statusLines) {
        if ($line.Length -lt 4) { continue }
        $status = $line.Substring(0, 2)
        $path = $line.Substring(3).Trim('"')
        if ($path -match " -> ") { $path = ($path -split " -> ")[-1].Trim('"') }
        $fullPath = Join-Path $repositoryRoot $path
        $exists = Test-Path -LiteralPath $fullPath -PathType Leaf
        $hash = if ($exists) { (Get-FileHash -LiteralPath $fullPath -Algorithm SHA256).Hash.ToLowerInvariant() } else { $null }
        $size = if ($exists) { (Get-Item -LiteralPath $fullPath).Length } else { 0 }

        $inventory += [pscustomobject]@{
            repository = $repository.Name
            repositoryRoot = $repositoryRoot
            status = $status
            path = $path.Replace("\", "/")
            sizeBytes = $size
            sha256 = $hash
            classification = Get-Classification -Repository $repository.Name -Path $path -Status $status
            sensitivityFlags = @(Get-SensitivityFlags -FullPath $fullPath)
        }
    }

    $repositorySummary += [pscustomobject]@{
        name = $repository.Name
        root = $repositoryRoot
        branch = $branch
        head = $head
        remote = $remote
        dirtyEntryCount = @($statusLines).Count
    }
}

$document = [ordered]@{
    schemaVersion = 1
    generatedAtUtc = (Get-Date).ToUniversalTime().ToString("o")
    workspaceRoot = $WorkspaceRoot
    deletionPerformed = $false
    repositories = $repositorySummary
    classificationCounts = @($inventory | Group-Object classification | Sort-Object Name | ForEach-Object {
        [pscustomobject]@{ classification = $_.Name; count = $_.Count }
    })
    entries = $inventory
}

$jsonPath = Join-Path $OutputDirectory "workspace-inventory.json"
$csvPath = Join-Path $OutputDirectory "workspace-inventory.csv"
$document | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $jsonPath -Encoding utf8
$inventory | Export-Csv -LiteralPath $csvPath -NoTypeInformation -Encoding utf8

Write-Host "Inventory entries: $($inventory.Count)"
Write-Host "JSON: $jsonPath"
Write-Host "CSV:  $csvPath"
if (@($inventory | Where-Object { $_.sensitivityFlags.Count -gt 0 }).Count -gt 0) {
    Write-Warning "Sensitive candidates were found. Review sensitivityFlags before staging any file."
}
