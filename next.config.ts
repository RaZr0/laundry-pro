import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => [
    {
      source: '/',
      destination: '/dashboard',
      permanent: false, // set to true if this is a permanent redirect (e.g. for SEO)
    },
  ],
};

export default nextConfig;
