import path from "path";
import { NxPageConfig } from "../src";
import { existsSync } from "fs";

export const readConfig = async (): Promise<NxPageConfig> => {
  // Load .env from the project root so env vars are available in nxpage.config.js
  // Uses Node's built-in .env support (Node >= 20.12), no external dependency needed
  const envPath = path.resolve(".env");
  if (existsSync(envPath)) {
    process.loadEnvFile(envPath);
  }
  const configPath = path.resolve("nxpage.config.js");
  if (!existsSync(configPath)) {
    throw new Error("NxPage config file not found");
  }
  const config = require(configPath).default || require(configPath);
  return config();
};
