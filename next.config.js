/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for wallet adapter compatibility
  // output: 'export', // Commented out - wallet adapters need server-side rendering
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
