import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ['@myriaddreamin/typst-ts-node-compiler'],
};

export default nextConfig;
