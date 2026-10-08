# Repository Guidelines

This is a Vite + React + TypeScript public website. Keep product code under `src/app/`: `features/` for page domains, `routes/` for route definitions, `shell/` for the public site frame, `providers/` for app-wide state, and `shared/` for reusable UI, data, API code, and types. Global styles belong in `src/styles/`.

Use pnpm. Before handoff, run `pnpm lint`, `pnpm typecheck`, `pnpm test --run`, and `pnpm build`.

The public route surface is `/`, `/privacy`, and `/terms`. Do not add login, internal dashboard, authentication, Prisma, or server code to this repository.
