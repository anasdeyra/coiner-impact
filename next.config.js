/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  // images: {
  //   domains: [`https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}`],
  // },
};

module.exports = withBundleAnalyzer(nextConfig);
