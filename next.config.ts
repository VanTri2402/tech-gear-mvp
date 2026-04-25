import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co", // ✅ Placeholder đã có
      },
      {
        // ⚠️ Sửa: Bỏ dấu sao (*) ở hostname khi dùng remotePatterns, trừ khi là subdomain
        // Kinde thường trả về ảnh từ domain chính
        protocol: "https",
        hostname: "kinde.com", // Hoặc chỉ cần "cdn.kinde.com" nếu đó là CDN ảnh
      },
      {
        protocol: "https",
        hostname: "gravatar.com", // ✅ Gravatar đã có
      },
      {
        protocol: "https",
        hostname: "www.apple.com", // ✅ Apple đã có
      },
      {
        protocol: "https",
        hostname: "static.iphoned.nl",
      },
      {
        protocol: "https",
        hostname: "www.apple.com",
        port: "",
        pathname: "/v/mac/welcome/g/images/overview/**", // Chỉ định rõ đường dẫn ảnh nếu cần
      },
    ],
  },
};

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withAnalyzer(nextConfig);
