# PowerShell script to suppress Next.js warnings
# Run this before starting the dev server

$env:NEXT_PRIVATE_SKIP_WARNINGS = "1"
$env:NEXT_TELEMETRY_DISABLED = "1"

Write-Host "Warning suppression environment variables set." -ForegroundColor Green
Write-Host "Now run: npm run dev" -ForegroundColor Yellow

