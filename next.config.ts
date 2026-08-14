import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only configure turbopack root in development to avoid Vercel build path/routing issues
  ...(process.env.NODE_ENV === "development" ? {
    turbopack: {
      root: process.cwd(),
    },
  } : {}),
};

export default nextConfig;



