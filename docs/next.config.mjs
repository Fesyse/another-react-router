// next.config.js
const { withContentlayer } = await import("next-contentlayer2")

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true }

export default withContentlayer(nextConfig)
