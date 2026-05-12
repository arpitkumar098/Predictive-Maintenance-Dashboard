# Predictive Maintenance Dashboard

A polished, interactive frontend dashboard for industrial equipment monitoring and predictive maintenance visualization. Built as a frontend showcase with React, TypeScript, and modern UI design patterns.

## Screenshots

> Dashboard with real-time sensor charts, machine status, alerts, and ML prediction cards.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | Component framework |
| TypeScript | Type safety |
| Vite | Build tooling |
| Tailwind CSS | Styling with glassmorphism design |
| Recharts | Data visualization (sensor charts) |
| React Query | Async state management (mock API layer) |
| React Hook Form + Zod | Form validation |
| date-fns | Date formatting |
| Wouter | Lightweight routing |
| Lucide React | Icon library |

## Features

- **Dashboard** — Stat cards, real-time sensor chart (Temperature/Vibration/RPM), machine status list, recent alerts, predictive analysis preview
- **Machines** — Filterable grid with health scores, sensor readings, maintenance history, and detail modals
- **Alerts** — Type-filtered alert list with working acknowledge button and live badge counts
- **Maintenance** — Full task table with validated create form (Zod schema), status transitions (Scheduled → In Progress → Completed)
- **Predictions** — Risk-level cards with confidence bars, days-to-failure indicators, and feature importance visualization
- **Reports / Settings / Help** — Static informational pages

## Architecture

```
src/
├── data/mockData.ts          ← Single source of truth (all mock data)
├── services/api.ts           ← Mock API client (swap for real fetch() later)
├── services/queryClient.ts   ← React Query config
├── types/index.ts            ← Full TypeScript interfaces
├── utils/
│   ├── formatters.ts         ← Date/number formatters (uses date-fns)
│   └── styles.ts             ← Shared status/risk styling (eliminates duplication)
├── components/
│   ├── ErrorBoundary.tsx     ← React error boundary
│   ├── LoadingSpinner.tsx    ← Loading states & skeletons
│   ├── SensorChart.tsx       ← Recharts wrapper
│   ├── Dashboard/            ← Dashboard-specific components
│   └── layouts/              ← Sidebar + Layout wrapper
├── hooks/                    ← Custom React hooks
└── pages/                    ← Route-level page components
```

## Getting Started

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

## Design Decisions

- **Mock API layer** — All pages use `react-query` hooks that call async functions in `api.ts`. Currently returns local mock data. To add a real backend, replace those functions with `fetch()` calls — zero page changes needed.
- **Centralized mock data** — One file (`data/mockData.ts`) is the single source of truth. No data duplication across pages.
- **Shared style utilities** — `utils/styles.ts` provides consistent risk/status styling. Each page imports from here instead of duplicating switch statements.
- **Form validation** — Maintenance form uses `react-hook-form` + `zod` for real client-side validation.

## Known Limitations

- All data is mock/simulated (no backend)
- Search bar is decorative (no search logic)
- Sidebar doesn't collapse on mobile
- No authentication

## License

MIT
