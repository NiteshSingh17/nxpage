#!/usr/bin/env node
import { generateNxPageManifest } from "./build";

const command = process.argv[2];

if (command === "build") {
  void generateNxPageManifest();
} else {
  console.log("Usage: nxpage build");
}
