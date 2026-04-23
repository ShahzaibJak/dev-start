import { nextTsApi } from "next-ts-api/config"
import { varlockNextConfigPlugin } from "@varlock/nextjs-integration/plugin"

const withNextTsApi = nextTsApi()
const withVarlock = varlockNextConfigPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default withNextTsApi(withVarlock(nextConfig))
