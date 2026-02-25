import fs from "fs";
import http from "http";
import next from "next";
import path from "path";
import { normalizeRoutePath, shouldProcessRoute, type RoutePattern } from "../shared/routeMatcher";
import { isAIAgent } from "./isAIAgent";
import { readConfig } from "../shared/config";

type IsAiAgent = (req: http.IncomingMessage) => boolean;

export type NxPageServerOptions = {
    port: number;
    isBot?: IsAiAgent;
};

const defaultManifestFolderPath = ".next/nxpage-pages/server/app";

export async function createNxPageServer(): Promise<void> {
  const config = await readConfig();
  const dev = process.env.NODE_ENV !== "production";
  const {
    port = 3000,
    isBot: checkIsBot,
  } = config.server;
  const manifestPath = config.build.manifestPath ?? defaultManifestFolderPath;


  const app = next({ dev });
  const handle = app.getRequestHandler();

  const loadManifest = (urlPath: string): string | null => {
    const manifestKey = urlPath.replace(/^\//, "");
    const filePath = path.join(process.cwd(), manifestPath, `${manifestKey}.json`);
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, "utf8");
  };

  app.prepare().then(() => {
    http
      .createServer(async (req, res) => {
        try {
          const isBot = !dev && (checkIsBot ? checkIsBot(req) : isAIAgent(req));

          if (isBot) {
            const routePath = normalizeRoutePath(req.url ?? "/");
            const showProceed = shouldProcessRoute(routePath, config.build);
            if (!showProceed) {
              return handle(req, res);
            }

            const page = loadManifest(routePath);

            if (page) {
              res.setHeader("Cache-Control", "private, no-store");
              res.setHeader("Vary", "User-Agent");
              res.setHeader("Content-Type", "text/json");
              res.statusCode = 200;
              return res.end(page);
            }
          }

          const output = await handle(req, res);
          res.setHeader("Cache-Control", "private, no-store");
          res.setHeader("Vary", "User-Agent");
          return output;
        } catch {
          res.statusCode = 500;
          res.end("Internal Server Error");
        }
      })
      .listen(port, "0.0.0.0", () => {
        console.log(`NxPage server running on port ${port}`);
      });
  });
}
