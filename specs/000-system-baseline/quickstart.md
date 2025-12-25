# Quickstart

## Languages & Runtimes
- TypeScript/React (Vite) for UI. Evidence: `package.json`, `src/main.tsx`.
- Rust (Tauri) for native shell. Evidence: `src-tauri/Cargo.toml`, `src-tauri/src/main.rs`.

## Package Managers
- npm for Node dependencies and scripts. Evidence: `package.json`, `package-lock.json`.
- cargo for Rust/Tauri. Evidence: `src-tauri/Cargo.toml`.

## Entrypoints
- Web entrypoint: `src/main.tsx` mounting React app into `index.html`. Evidence: `src/main.tsx`, `index.html`.
- Tauri entrypoint: `src-tauri/src/main.rs` with default Tauri builder. Evidence: `src-tauri/src/main.rs`.

## Modules/Projects
- Frontend app under `src/` (React + Tailwind).
- Tauri wrapper under `src-tauri/`.
Evidence: `src/`, `src-tauri/tauri.conf.json`.

## Data Layer
- No persistent data layer or database is implemented. UI uses in-memory constants and component state. Evidence: `src/constants.ts`, `src/components/**`.

## Auth, Permissions, Roles
- UI-only auth flow with login/register/forgot/reset/verification screens; no backend integration. Evidence: `src/components/auth/AuthShell.tsx`, `src/components/auth/*View.tsx`.
- No role/permission enforcement beyond UI labels. Evidence: `src/components/views/*.tsx`.

## External Integrations
- No external API integrations implemented; Tauri allowlist enables shell open/window APIs only. Evidence: `src-tauri/tauri.conf.json`.
- i18n uses browser language detection and localStorage/cookies. Evidence: `src/i18n.ts`.

## Public Interfaces (API/Events/CLI)
- No public API/CLI/events are implemented. UI is the only interface. Evidence: `src/main.tsx`, absence of API handlers.

## Tests & CI
- No test runner or CI configuration present. Evidence: `package.json` (no test scripts).

## Evidence
- UI modes: `src/components/views/AdvisorView.tsx`, `src/components/views/YoloView.tsx`, `src/components/views/ClassicView.tsx`, `src/components/views/LuckyView.tsx`.
- Execution panel UI: `src/components/execution/ExecutionPanel.tsx` and related components.
