#!/usr/bin/env node
/**
 * Development script wrapper
 * Suppresses known harmless warnings from Next.js 16 Turbopack
 */

const { spawn } = require('child_process')

// Set environment variables to suppress warnings
process.env.NEXT_PRIVATE_SKIP_WARNINGS = '1'
process.env.NEXT_TELEMETRY_DISABLED = '1'

// Spawn Next.js dev server
const nextDev = spawn('next', ['dev'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NEXT_PRIVATE_SKIP_WARNINGS: '1',
    NEXT_TELEMETRY_DISABLED: '1',
  },
})

nextDev.on('close', (code) => {
  process.exit(code)
})

