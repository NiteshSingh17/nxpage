import { NxPageServerOptions } from "../server/createNxPageServer";
import { BuildOptions } from "./build";

export { createNxPageServer } from "../server/createNxPageServer";
export type { NxPageServerOptions } from "../server/createNxPageServer";
export { generateNxPageManifest } from "./build";
export type { BuildOptions } from "./build";

export type NxPageConfig = {
    build: BuildOptions;
    server: NxPageServerOptions;
}