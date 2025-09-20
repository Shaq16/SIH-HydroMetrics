# HeavyWater Dashboard 🌊

An interactive dashboard for visualizing and analyzing heavy metal contamination in lakes, rivers, and groundwater sources.

![HeavyWater Dashboard](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.0-blue)

## ✨ Features

- **Interactive Map**: Dark-themed Leaflet map with contamination markers
- **Smart Filtering**: Search by location, district, or water body type
- **Data Visualization**: Chart.js bar charts showing heavy metal concentrations
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Smooth Animations**: Framer Motion transitions for enhanced UX
- **Real-time Analysis**: Click markers to view detailed contamination data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm (install with [nvm](https://github.com/nvm-sh/nvm))

### Installation & Setup

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The dashboard will be available at `http://localhost:8080`

## 🏗️ Architecture

This is a **React + TypeScript + Vite** application (not traditional MERN stack) with:

### Frontend Technologies
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for modern styling with custom design system
- **Leaflet** for interactive maps with dark theme
- **Chart.js** for data visualization
- **Framer Motion** for smooth animations
- **Shadcn/ui** for consistent UI components

### Data Layer
- Sample dataset with 10 water bodies across different US locations
- Contamination metrics for 5 heavy metals: Uranium, Lead, Cadmium, Mercury, Arsenic
- Smart categorization system: Safe → Low → Medium → High → Critical

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # Main dashboard layout
│   ├── DashboardSidebar.tsx   # Search, filters, and water body list
│   ├── MapView.tsx           # Interactive Leaflet map
│   ├── DetailsPanel.tsx      # Sliding panel with charts
│   └── ui/                   # Reusable UI components
├── data/
│   └── waterbodies.ts        # Sample contamination data
# HeavyWater Dashboard 🌊

An interactive dashboard for visualizing and heavy-metal contamination in lakes, rivers, and groundwater.

![React](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.0-blue)

Overview
--------

HeavyWater is a single-page React + TypeScript app (Vite) that provides an interactive map, charts, and tools to explore contamination metrics for water bodies.

See `REQUIREMENTS.md` for detailed setup instructions.

Key Features
------------
- Interactive Leaflet map with contamination markers and a dark water theme
- Filtering and search by location, district, and water body type
- Charts (Chart.js) showing heavy metal concentrations per site
- Responsive layout and Framer Motion transitions for better UX

Quick Start
-----------

Prerequisites: Node.js 18+ and `npm`.

1. Clone the repo and change into the project folder:

```bash
git clone <YOUR_GIT_URL>
cd SIH-HydroMetrics-alternate-plan/SIH-HydroMetrics-alternate-plan
```

2. Install dependencies (recommended with legacy peer deps to avoid some peer conflicts):

```bash
npm install --legacy-peer-deps
```

3. Start the dev server:

```bash
npm run dev
```

The app prints the local URL (for example `http://localhost:8080/`).

Project Structure
-----------------

```
src/
├── components/        # UI components and layout
├── data/              # sample water bodies and data fixtures
├── hooks/             # custom React hooks
├── lib/               # utilities
├── pages/             # route pages
└── styles/            # global styles and theme
```

Data Format
-----------

Water-body objects in `src/data/waterbodies.ts` follow this shape:

```ts
interface WaterBody {
  _id: string;
  location: string;
  district: string;
  type: 'Lake' | 'River' | 'Groundwater' | 'Stream';
  year: number;
  latitude: number;
  longitude: number;
  metrics: Record<string, number>; // heavy metal concentrations (mg/L)
}
```

Commands
--------

- `npm run dev` — run development server
- `npm run build` — build production assets
- `npm run preview` — preview production build
- `npm run lint` — run ESLint checks

Troubleshooting
---------------
- If `npm install` fails with peer dependency errors, run `npm install --legacy-peer-deps`.
- If the dev server port is already in use, set a custom port in PowerShell:

```powershell
$env:PORT = "3000"; npm run dev
```

Future Work & Ideas
-------------------
- Connect to a database (Supabase or a small Node/Express + MongoDB API)
- Add authentication and role-based access
- Export reports (CSV/PDF) and add time-series charts

Contributing
------------

1. Fork and clone
2. Create a branch: `git checkout -b feature/my-feature`
3. Implement changes and add tests where appropriate
4. Push and open a PR

License & Attribution
---------------------
This project uses multiple open-source libraries — see `package.json` for the full dependency list.


