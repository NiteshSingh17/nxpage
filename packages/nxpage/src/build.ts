import fs from "fs";
import path from "path";
import { routePathFromBuildFile, shouldProcessRoute, type RoutePattern } from "../shared/routeMatcher";
import { htmlExtractor } from "./helper/htmlExtractor";

export interface BuildOptions {
  distDir?: string;
  manifestPath?: string;
  includeRoutePatterns?: RoutePattern[];
  blockRoutePatterns?: RoutePattern[];
}

export async function generateNxPageManifest(
  options: BuildOptions = {}
): Promise<void> {
  const distDir = options.distDir || ".next";
  const outputFolder = "nxpage-pages";
  const buildPath = options.manifestPath ?? path.join(process.cwd(), distDir);

  function walk(dir: string): void {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith(".html")) {
        const htmlRelativePath = path.relative(buildPath, fullPath).replace(/\\/g, "/");
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

        const jsonContent = htmlExtractor(fs.readFileSync(fullPath, "utf8"));
        const outputPath = path.join(buildPath, path.join(outputFolder, relativePath));
        const outputDir = path.dirname(outputPath);

        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, JSON.stringify(jsonContent, null, 2));
      }
    }
  }

  walk(buildPath);
  console.log("NxPage manifest generated");
}
