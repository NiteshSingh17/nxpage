
## What this solves

Modern AI agents such as ChatGPT/OpenAI crawlers, Claude/Anthropic bots, Perplexity, and similar automation clients usually do not need full browser-ready HTML, JS bundles, and client hydration payloads.

`nxpage` lets you serve a lightweight JSON representation for these agent requests, while normal users still get the standard Next.js HTML app.

This gives practical benefits:

- faster agent response delivery (smaller payloads),
- lower network egress and transfer cost,
- reduced CPU usage for bot traffic paths,
- cleaner extraction path for crawlers and AI systems.

Depending on page size and app complexity, this can reduce transfer volume by **up to ~99%** for bot-targeted responses.

## Project Structure

```text
newupdate/
├── packages/
│   ├── nxpage/
│   └── create-nxpage-app/
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

## Packages

- `packages/nxpage`: runtime server + manifest builder for bot-oriented JSON responses.
- `packages/create-nxpage-app`: CLI scaffolder for a Next.js app with NxPage setup.

Each package has its own local README:

- `packages/nxpage/README.md`
- `packages/create-nxpage-app/README.md`

## Quick usage flow

1. Build your Next app (human HTML build).
2. Run NxPage manifest build (bot JSON build).
3. Start NxPage server.
4. AI agents receive JSON for allowed routes; humans continue receiving normal HTML.

### Dual-build model

- **Human build:** Next.js HTML output (`next build`)
- **Bot build:** NxPage JSON pages (`nxpage build`)

This creates two response artifacts from the same app routes:

- `.next/*` -> normal HTML flow
- `.next/nxpage-pages/*` -> bot/agent JSON flow

You can control which routes are included/excluded with:

- `includeRoutePatterns`
- `blockRoutePatterns`

## Development

### Install dependencies

```bash
cd nxpage
pnpm install
```

If `pnpm` is not available on your machine:

```bash
npm i -g pnpm
```

### Build all packages

```bash
pnpm -r run build
```

### Build a single package

```bash
pnpm --filter nxpage run build
pnpm --filter create-nxpage-app run build
```

## Notes

- Source is written in TypeScript.
- Build output is emitted as CommonJS (`.cjs`) in each package `dist` folder.
- Route filtering for NxPage supports:
  - `includeRoutePatterns`
  - `blockRoutePatterns`
