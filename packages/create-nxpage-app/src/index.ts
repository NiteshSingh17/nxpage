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

fs.copyFileSync(path.join(templateDir, "nxpage.config.js"), path.join(root, "nxpage.config.js"));
fs.copyFileSync(path.join(templateDir, "server.js"), path.join(root, "server.js"));

const packageJsonPath = path.join(root, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
packageJson.scripts.dev = "nxpage dev";
packageJson.scripts.build = "nxpage build";
packageJson.scripts.start = "nxpage start";

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log("NxPage app created successfully.");
