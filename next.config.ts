import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  // Ensure dynamic rendering for pages that read from filesystem
  // This is needed so admin changes to JSON files take effect immediately
  experimental: {
    // Allow server actions for admin panel
  },
=======
  output: "standalone",
>>>>>>> 99ede7398d96ae04b0c71a469473f3d221405599
};

export default nextConfig;
