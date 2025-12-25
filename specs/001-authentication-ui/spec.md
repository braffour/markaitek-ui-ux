# Summary
UI-only authentication screens that let users navigate between login, register, forgot-password, reset-link sent, and email verification views. Evidence: `src/components/auth/AuthShell.tsx`.

# Users & Goals
- End users who need to access the app shell after a mock login. Evidence: `src/main.tsx`, `src/components/auth/AuthShell.tsx`.

# Non-Goals
- No real credential validation, persistence, or backend auth. Evidence: `src/components/auth/AuthShell.tsx`.

# User Stories
- As a user, I can switch between login and registration screens. Evidence: `src/components/auth/AuthShell.tsx`.
- As a user, I can request a password reset and see a confirmation screen. Evidence: `src/components/auth/ForgotPasswordView.tsx`, `src/components/auth/ResetLinkSentView.tsx`.
- As a user, I can proceed through email verification UI. Evidence: `src/components/auth/EmailVerificationView.tsx`.

# Acceptance Criteria (Given/When/Then)
- Given the app starts unauthenticated, when I land on the auth shell, then the login view is shown by default. Evidence: `src/components/auth/AuthShell.tsx`.
- Given I navigate to register, when I submit registration, then a toast shows success and the verification view displays. Evidence: `src/components/auth/AuthShell.tsx`.
- Given I submit forgot-password, when success occurs, then reset-link-sent view appears with the email displayed. Evidence: `src/components/auth/AuthShell.tsx`.
- Given I complete login, when login success fires, then the app shell renders after a short delay. Evidence: `src/components/auth/AuthShell.tsx`, `src/main.tsx`.

# Edge Cases & Errors
- Toast messages are shown for success; no error validation flows are implemented. Evidence: `src/components/auth/AuthShell.tsx`.

# Permissions & Roles
- No role logic implemented. Evidence: `src/components/auth/*`.

# Non-Functional Requirements
- None specified.

# Observability
- None implemented.

# Open Questions [NEEDS CLARIFICATION]
- [NEEDS CLARIFICATION: What real auth provider(s) should back these views?]
- [NEEDS CLARIFICATION: What error states and validation rules are required?]
