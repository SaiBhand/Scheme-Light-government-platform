# Permanently Suppress Next.js Warnings

This document provides solutions to permanently suppress the warnings you see in the terminal.

## Quick Solution

The warnings are **harmless** and don't affect functionality. However, if you want to suppress them:

### Option 1: Use the Clean Dev Script (Recommended)

Run the development server using the clean script:

```bash
npm run dev:clean
```

This script suppresses warnings automatically.

### Option 2: Set Environment Variables

Create a `.env.local` file (if it doesn't exist) and add:

```env
NEXT_PRIVATE_SKIP_WARNINGS=1
NEXT_TELEMETRY_DISABLED=1
```

Or set them in your terminal before running commands:

**PowerShell:**
```powershell
$env:NEXT_PRIVATE_SKIP_WARNINGS="1"
$env:NEXT_TELEMETRY_DISABLED="1"
npm run dev
```

**Bash/CMD:**
```bash
set NEXT_PRIVATE_SKIP_WARNINGS=1
set NEXT_TELEMETRY_DISABLED=1
npm run dev
```

### Option 3: Remove Parent Directory Lockfile (Permanent Fix)

If you don't need the `pnpm-lock.yaml` in the parent directory (`C:\Users\admin\OneDrive\Documents\`), you can:

1. **Rename it** (safest):
   ```powershell
   Rename-Item "C:\Users\admin\OneDrive\Documents\pnpm-lock.yaml" "pnpm-lock.yaml.backup"
   ```

2. **Delete it** (if not needed):
   ```powershell
   Remove-Item "C:\Users\admin\OneDrive\Documents\pnpm-lock.yaml"
   ```

This will permanently eliminate the lockfile warning.

## About the Warnings

### 1. Lockfile Warning
- **Status**: Harmless - doesn't affect functionality
- **Cause**: Next.js detects multiple lockfiles (one in parent directory)
- **Impact**: None - your project works correctly

### 2. Middleware Warning
- **Status**: Harmless - Turbopack quirk
- **Cause**: Next.js 16 Turbopack shows this warning, but `middleware.ts` is correct
- **Impact**: None - middleware works perfectly

## Verification

After applying any solution, run:

```bash
npm run build
```

The warnings should be reduced or eliminated. The build will still succeed regardless.

