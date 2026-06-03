import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/invitation",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;