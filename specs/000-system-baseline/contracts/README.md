# Contracts

No external contracts are implemented in the current codebase.

Evidence:
- UI-only entrypoint: `src/main.tsx`
- No API route handlers or CLI binaries under `src/` or `src-tauri/src/`
- Tauri config exposes only shell/window permissions without custom commands: `src-tauri/tauri.conf.json`
