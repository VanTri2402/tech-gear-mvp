// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co", // Cho phép ảnh từ placehold.co
      },
      {
        protocol: "https",
        hostname: "*.kinde.com", // Cho phép ảnh avatar từ Kinde
      },
      {
        protocol: "https",
        hostname: "gravatar.com", // Cho phép ảnh avatar từ Gravatar (Kinde có thể dùng)
      }
    ],
  },
};

export default nextConfig;