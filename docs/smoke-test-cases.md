# Sprint 1 - Automated Smoke Test Documentation (S1-TST-05)

## Overview
This document outlines the automated smoke testing cases covering user authentication (login) and core main page rendering for the Hope, Inc. ERP system.

## Smoke Test Suites

| Test ID | Module | Action / Endpoint | Preconditions | Expected Outcome | Status |
|---|---|---|---|---|---|
| **TC-SMK-001** | Auth | Login (`/login`) | Valid user credentials registered | Successful redirection to dashboard with valid auth token | Passing |
| **TC-SMK-002** | Core | Main Dashboard (`/dashboard`) | Authenticated session active | Dashboard widgets, nav shell, and metrics load without error | Passing |
| **TC-SMK-003** | Auth | Logout Flow | Active session on main page | Session token cleared, redirected securely to login page | Passing |

---

## Execution & Verification
- **Framework / Script:** Verified via local test runner / API integration checks.
- **Environment:** Staging / Localhost build.
