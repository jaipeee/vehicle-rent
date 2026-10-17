import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
  return [
    { source: "/cities/:slug", destination: "/:slug", permanent: true },
    { source: "/vehicles/:category", destination: "/:category", permanent: true },
  ];
},
};

export default nextConfig;