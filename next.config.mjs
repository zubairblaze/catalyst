/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — produces an `out/` directory ready for any Apache/cPanel host.
  output: 'export',
  // Each route becomes /route/index.html so Apache can serve it without Node.js.
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  // next build does the compression; Apache serves pre-compressed files.
  compress: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Images must be unoptimized for static export (no Next.js image server).
    unoptimized: true,
  },
};

export default nextConfig;
