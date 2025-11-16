import type { NextConfig } from "next"
import lingoCompiler from "lingo.dev/compiler"

const nextConfig: NextConfig = {
  /* existing Next.js config options can go here */
}

const withLingo = lingoCompiler.next({
  sourceRoot: "src/app",
  lingoDir: "lingo",
  sourceLocale: "en",
  targetLocales: ["hi", "te", "ta", "bn", "es", "fr", "de"],
  rsc: true,
  useDirective: true,
  debug: false,
  models: "lingo.dev",
})

export default withLingo(nextConfig);
