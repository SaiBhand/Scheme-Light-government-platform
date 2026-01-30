import { fileURLToPath } from "url"
import { dirname } from "path"
import { realpathSync } from "fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get the absolute path to the project root using realpathSync to resolve symlinks
const projectRoot = realpathSync(__dirname)

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {},

  // Suppress webpack warnings (for compatibility)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    // Suppress specific webpack warnings
    config.ignoreWarnings = [
      { module: /node_modules/ },
    ]
    return config
  },
  // Suppress logging for cleaner output
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  // Note: The middleware deprecation warning is a Turbopack quirk.
  // middleware.ts is still the standard and correct way to implement middleware in Next.js 16.
  // This warning can be safely ignored as it doesn't affect functionality.
}

export default nextConfig
