import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Uncomment the line below for static export (no server required)
  // output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
