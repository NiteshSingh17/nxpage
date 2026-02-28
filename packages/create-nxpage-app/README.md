# create-nxpage-app

CLI to scaffold a Next.js TypeScript app and wire in NxPage.

## Why use this CLI

This package gives you a fast way to start a Next.js app that can serve optimized JSON responses to AI agents (ChatGPT/OpenAI, Claude, Perplexity, and others) using `nxpage`.

It helps you quickly adopt a dual-delivery model:

- normal users -> regular Next.js HTML
- AI agents -> lightweight NxPage JSON (when route filters allow)

## Usage

```bash
npx create-nxpage-app my-app
```

## What the CLI does

1. Creates a Next.js app with TypeScript and App Router.
2. Installs `nxpage`.
3. Adds `server.ts` and `nxpage.config.js` from the templates.
4. Updates scripts in generated `package.json`:
   - `dev`: `nxpage dev`
   - `build`: `nxpage build`
   - `start`: `nxpage start`

## After scaffold (recommended)

1. Open generated `server.ts`.
2. Configure:
   - `includeRoutePatterns`
   - `blockRoutePatterns`
3. Build app and run production server.

This setup can reduce agent-response transfer volume dramatically (often large savings, up to ~99% in favorable cases).

## Template Files

- `templates/server.ts`
- `templates/next.config.ts`

These are copied into generated app output (via build pipeline).

## Local Development (Monorepo)

```bash
cd newupdate/packages/create-nxpage-app
npm install
npm run build
```

## Publish Notes

This package ships:

- `dist/index.cjs`
- `dist/templates/*`
