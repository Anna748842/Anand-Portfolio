$ErrorActionPreference = 'Stop'

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$dbPath = Join-Path $projectRoot 'mongodb-data'
$logPath = Join-Path $dbPath 'mongod.log'

if (-not (Test-Path $dbPath)) {
  New-Item -ItemType Directory -Path $dbPath -Force | Out-Null
}

$mongoBin = (Get-Command mongod -ErrorAction Stop).Source
$tcp = Get-NetTCPConnection -LocalPort 27017 -ErrorAction SilentlyContinue

if (-not $tcp) {
  Write-Host 'Starting local MongoDB...'
  Start-Process -FilePath $mongoBin -ArgumentList @(
    '--dbpath', $dbPath,
    '--logpath', $logPath,
    '--bind_ip', '127.0.0.1',
    '--port', '27017'
  ) -WindowStyle Hidden | Out-Null

  $deadline = (Get-Date).AddSeconds(15)
  while ((Get-Date) -lt $deadline) {
    if (Get-NetTCPConnection -LocalPort 27017 -ErrorAction SilentlyContinue) {
      break
    }
    Start-Sleep -Milliseconds 250
  }

  if (-not (Get-NetTCPConnection -LocalPort 27017 -ErrorAction SilentlyContinue)) {
    throw "MongoDB did not start correctly. Check the log file: $logPath"
  }
} else {
  Write-Host 'MongoDB is already running on localhost:27017'
}

Write-Host 'Starting backend...'
Set-Location $projectRoot
node server/server.js
