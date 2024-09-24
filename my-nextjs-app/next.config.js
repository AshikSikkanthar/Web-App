/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Add the webpack configuration for ignoring unused modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Avoid including PostgreSQL and SQLite-related modules in the build
      config.resolve.fallback = { fs: false, net: false, tls: false };

      // Exclude PostgreSQL related modules
      config.externals = [...config.externals, 'pg', 'pg-hstore', 'sqlite3', 'tedious', 'pg-native'];
    }
    return config;
  },
};

module.exports = nextConfig;

