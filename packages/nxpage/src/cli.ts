#!/usr/bin/env node
import { spawn } from "child_process";
import { generateNxPageManifest } from "./build.js";

async function main() {
  const command = process.argv[2];
  const args = process.argv.slice(3);
  async function runNext(subCommand: string, extraArgs: string[] = []) {
    return new Promise((resolve, reject) => {
      const child = spawn(
        "npx",
        ["next", subCommand, ...extraArgs],
        { stdio: "inherit", shell: true }
      );
      child.on("close", (code) => {
        if (code === 0) {
          resolve(0);
        } else {
          reject(code);
        }
      });
    });
  }
  if (command === "build") {
    console.log("Running next build...");
    await runNext("build", args);
    console.log("Generating NxPage manifest...");
    await generateNxPageManifest();
  } else if (command === "start") {
      spawn(
        "npx",
        ["node", "server.js", ...args],
        {
          stdio: "inherit",
          shell: true,
          env: { ...process.env, NODE_ENV: "production" }, 
        }
      );
  } else {
    await runNext(command, args);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});