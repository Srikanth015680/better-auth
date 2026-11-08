
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate standalone production server
  output: "standalone",

  experimental: {
    agentFeedback: true,
  },

  serverExternalPackages: ["@node-rs/argon2"],

  cacheComponents: true,

  partialPrefetching: true,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
