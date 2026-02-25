#!/usr/bin/env node
import spawn from "cross-spawn";
import fs from "fs";
import path from "path";

const appName = process.argv[2];

if (!appName) {
  console.error("Please provide a project name.");
  process.exit(1);
}

const root = path.resolve(process.cwd(), appName);
const templateDir = path.join(__dirname, "../dist/templates");

spawn.sync(
  "npx",
  ["create-next-app@latest", appName, "--ts", "--use-npm", "--eslint", "--app"],
  { stdio: "inherit" }
);

spawn.sync("npm", ["install", "nxpage"], { cwd: root, stdio: "inherit" });

fs.copyFileSync(path.join(templateDir, "server.ts"), path.join(root, "server.ts"));

const packageJsonPath = path.join(root, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
packageJson.scripts.dev = "next dev";
packageJson.scripts.build = "next build && nxpage build";
packageJson.scripts.start = "NODE_ENV=production node server.js";

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log("NxPage app created successfully.");
