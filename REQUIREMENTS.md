Project Requirements & Setup
===========================

This file documents what a new developer needs to install and how to get the project running locally.

1) System prerequisites
- **Node.js**: 18.x or 20.x (LTS recommended)
- **npm**: bundled with Node.js (npm 8/9+ recommended)
- **Git**: for cloning the repo
- Optional: **bun** or **pnpm** if you prefer those package managers

2) Major project dependencies (high level)
- `react`, `react-dom` (UI)
- `vite` (dev server & build)
- `tailwindcss` (styles)
- `typescript` (types)
- `react-router-dom` (routing)
- `react-leaflet`, `leaflet` (map view)
- `@radix-ui/*` (UI primitives)
- `chart.js`, `react-chartjs-2`, `recharts` (charts)
- `@tanstack/react-query` (data fetching)

For the full list of packages, see `package.json` -> `dependencies` and `devDependencies`.

3) Clone and install (PowerShell examples)
- Clone the repo:

```
git clone <repo-url>
cd <repo-folder>/SIH-HydroMetrics-alternate-plan
cd SIH-HydroMetrics-alternate-plan
```

- Install using npm (recommended):

```
npm install --legacy-peer-deps
```

Notes:
- We recommend `--legacy-peer-deps` if npm raises peer dependency conflicts (common with some versions of `react-leaflet`).
- You can also use `npm install` (or `pnpm install` / `bun install`) but you may need to resolve peer conflicts manually.

4) Start the dev server

```
npm run dev
```

Vite will print local and network URLs (e.g., `http://localhost:8080/`). If you need to change the port in PowerShell:

```
$env:PORT = "3000"; npm run dev
```

5) Build & Preview

```
npm run build
npm run preview
```

6) Lint

```
npm run lint
```

7) Common issues & fixes
- Peer dependency errors for `react`/`react-dom` vs `react-leaflet`:
  - Use `npm install --legacy-peer-deps` to bypass strict peer resolution, or
  - Upgrade `react`/`react-dom` to a version required by `react-leaflet` (may require code changes).
- If the dev server doesn't start because a port is in use, set `PORT` as shown above or kill the process using that port.

8) Optional helpful commands
- Show audit & fix vulnerabilities:

```
npm audit
npm audit fix
```

- Show funding info:

```
npm fund
```

9) Where to look next
- App entry: `src/main.tsx`
- Pages: `src/pages/`
- Components: `src/components/`

