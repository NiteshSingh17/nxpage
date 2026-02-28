import fs from "fs";
import path from "path";
import {
  routePathFromBuildFile,
  shouldProcessRoute,
  type RoutePattern,
} from "../shared/routeMatcher";
import { htmlExtractor } from "./helper/htmlExtractor";
import { readConfig } from "../shared/config";

export interface BuildOptions {
  distDir?: string;
  manifestPath?: string;
  includeRoutePatterns?: RoutePattern[];
  blockRoutePatterns?: RoutePattern[];
  generateJSON?: (data: { path: string; html: string }) => Promise<JSON>;
}

export async function generateNxPageManifest(
  options: BuildOptions = {},
): Promise<void> {
  const distDir = options.distDir || ".next";
  const outputFolder = "nxpage-pages";
  const buildPath = options.manifestPath ?? path.join(process.cwd(), distDir);

  const config = await readConfig();
  async function walk(dir: string): Promise<void> {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        await walk(fullPath);
      } else if (file.endsWith(".html")) {
        const htmlRelativePath = path
          .relative(buildPath, fullPath)
          .replace(/\\/g, "/");
        const routePath = routePathFromBuildFile(htmlRelativePath);
        if (!shouldProcessRoute(routePath, options)) {
          continue;
        }

        const relativePath =
          path
            .relative(buildPath, fullPath)
            .replace(/\\/g, "/")
            .split(".")
            .slice(0, -1)
            .join(".") + ".json";
        const content = fs.readFileSync(fullPath, "utf8");
        const jsonContent = config.build.generateJSON
          ? await config.build.generateJSON({ path: file, html: content })
          : htmlExtractor(content);
        const outputPath = path.join(
          buildPath,
          path.join(outputFolder, relativePath),
        );
        const outputDir = path.dirname(outputPath);

        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, JSON.stringify(jsonContent, null, 2));
      }
    }
  }

  await walk(buildPath);
  console.log(`NxPage manifest generated view build at ${distDir}/${outputFolder} `);
}
