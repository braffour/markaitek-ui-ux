# Summary
The system is a client-side UI/UX for an "Agentic Workflow Composer" that presents multiple modes (Advisor, Yolo, Classic, I'm Lucky) for designing automation workflows, plus a mock authentication flow and an execution panel UI. It is packaged for web (Vite) and optional native shell (Tauri). Evidence: `README.md`, `src/main.tsx`, `src/components/views/*.tsx`, `src/components/execution/*.tsx`.

# Users & Goals
- Workflow builders who want to explore automation ideas in multiple UI modes. Evidence: `README.md`, `src/components/views/*.tsx`.
- Admins/teams switching workspaces and policies in UI-only mock state. Evidence: `src/components/layout/AppShell.tsx`, `src/constants.ts`.
- Users needing login/register/forgot-password UI flows (mocked). Evidence: `src/components/auth/AuthShell.tsx`.

# Non-Goals
- No backend execution, persistence, or real authentication. Evidence: `src/components/**`, `src/constants.ts`.
- No real external integrations or API endpoints. Evidence: `src-tauri/tauri.conf.json` (allowlist only), absence of API code.

# User Stories
- As a user, I can log in or register via UI screens and then see the app shell. Evidence: `src/main.tsx`, `src/components/auth/AuthShell.tsx`.
- As a user, I can switch between Advisor/Yolo/Classic/Lucky modes. Evidence: `src/components/layout/AppShell.tsx`.
- As a user, I can draft a workflow in Yolo mode and see simulated transcript steps. Evidence: `src/components/views/YoloView.tsx`.
- As a user, I can visually edit a workflow graph in Classic mode. Evidence: `src/components/views/ClassicView.tsx`, `src/components/nodes/WorkflowNode.tsx`.
- As a user, I can enter an intent and see suggestions in I'm Lucky mode. Evidence: `src/components/views/LuckyView.tsx`, `src/constants.ts`.
- As a user, I can use Advisor mode to select an intent and chat with a simulated advisor. Evidence: `src/components/views/AdvisorView.tsx`.
- As a user, I can view run/debug/history UI in the execution panel. Evidence: `src/components/execution/ExecutionPanel.tsx`.

# Acceptance Criteria (Given/When/Then)
- Given the app loads, when I am not authenticated, then I see the auth shell and can navigate between login/register/forgot/reset/verify views. Evidence: `src/main.tsx`, `src/components/auth/AuthShell.tsx`.
- Given I complete the login UI flow, when the login success handler runs, then I am routed to the app shell. Evidence: `src/components/auth/AuthShell.tsx`.
- Given the app shell, when I click a mode tab, then the corresponding view renders. Evidence: `src/components/layout/AppShell.tsx`.
- Given Yolo mode, when I enter text and click execute, then a simulated transcript is appended over time. Evidence: `src/components/views/YoloView.tsx`.
- Given Classic mode, when I drag a component from the library and drop it, then a new workflow node is created and can be connected. Evidence: `src/components/views/ClassicView.tsx`, `src/components/layout/LibrarySidebar.tsx`.
- Given Lucky mode, when I focus the intent input, then suggestion UI and past success insights are displayed. Evidence: `src/components/views/LuckyView.tsx`, `src/constants.ts`.
- Given Advisor mode, when I select an intent and send a message, then a simulated advisor response is appended. Evidence: `src/components/views/AdvisorView.tsx`.

# Edge Cases & Errors
- Drag-drop without component data logs a warning and does not create a node. Evidence: `src/components/views/ClassicView.tsx`.
- Yolo simulation uses a timer; repeated execute calls are disabled while building. Evidence: `src/components/views/YoloView.tsx`.
- Auth flows show toast messages for success but do not validate real credentials. Evidence: `src/components/auth/AuthShell.tsx`.

# Permissions & Roles
- No enforced permissions or role checks; roles appear only as UI labels. Evidence: `src/components/layout/AppShell.tsx`, `src/constants.ts`.

# Non-Functional Requirements
- None explicitly implemented beyond UI responsiveness and styling. Evidence: absence of performance/security configuration beyond defaults.

# Observability
- UI-level console logs in Classic mode drop handler; no structured logging or telemetry. Evidence: `src/components/views/ClassicView.tsx`.

# Open Questions [NEEDS CLARIFICATION]
- [NEEDS CLARIFICATION: What backend services are intended for auth, workflow execution, and persistence?]
- [NEEDS CLARIFICATION: What policies and governance rules should be enforced beyond UI labels?]
- [NEEDS CLARIFICATION: What real integrations (connectors) are required for workflows?]
- [NEEDS CLARIFICATION: What is the intended data model for workflows, runs, and audit logs?]
