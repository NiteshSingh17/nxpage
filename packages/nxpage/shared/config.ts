import path from "path";
import { NxPageConfig } from "../src";
import { existsSync } from "fs";

export const readConfig = async (): Promise<NxPageConfig> => {
  const configPath = path.resolve("nxpage.config.js");
  if (!existsSync(configPath)) {
    throw new Error("NxPage config file not found");
  }
  const config = require(configPath).default || require(configPath);
  return config();
};
