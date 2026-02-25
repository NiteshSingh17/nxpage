import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts"],
  format: ["cjs"],
  dts: true,
  clean: true,
  sourcemap: false,
  target: "node18",
  outExtension() {
    return {
      js: ".cjs",
    };
  },
});
