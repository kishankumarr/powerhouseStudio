import type { NextConfig } from "next";

// `GITHUB_PAGES=true pnpm build` produces a static export in /out for GitHub Pages,
// served from https://<user>.github.io/<repo>. Any other build is a normal Next.js server build.
const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? (process.env.PAGES_BASE_PATH ?? "/powerhouseStudio") : "";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: pages ? "export" : undefined,
  basePath,
  trailingSlash: pages,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    // GitHub Pages has no image optimiser; images ship pre-sized from /public/media.
    unoptimized: pages,
    qualities: [75, 85],
  },
};

export default nextConfig;
