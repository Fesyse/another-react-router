// next.config.js
import { createContentlayerPlugin } from "next-contentlayer2"

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true }

const withContentlayer = createContentlayerPlugin({})

export default withContentlayer(nextConfig)
