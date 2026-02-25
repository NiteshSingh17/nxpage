import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  platform: "node",
  target: "node18",
  dts: true,
  clean: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
  outExtension() {
    return {
      js: ".cjs",
    };
  },
});