import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure dynamic rendering for pages that read from filesystem
  // This is needed so admin changes to JSON files take effect immediately
  experimental: {
    // Allow server actions for admin panel
  },
};

export default nextConfig;
