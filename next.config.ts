import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

// cacheComponents matches what create-next-app enables, so examples that
// break a fresh Next.js app (e.g. reading the time during render) fail here first.
const nextConfig: NextConfig = { cacheComponents: true };

export default withMDX(nextConfig);
