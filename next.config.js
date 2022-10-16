/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // images: {
  //   domains: [`https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}`],
  // },
};

module.exports = withBundleAnalyzer(nextConfig);
