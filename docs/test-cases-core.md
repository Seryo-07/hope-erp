# Sprint 1 - Test Cases: Core Modules & Dashboard (S1-TST-03)

## 1. Dashboard Overview & Metrics (`/dashboard`)

| Test Case ID | Feature / Scenario | Preconditions | Input Data | Expected Result | Pass / Fail |
|---|---|---|---|---|---|
| **TC-DASH-001** | Dashboard Load & Summary Cards | User is authenticated with valid session token. | Navigate to `/dashboard` | Dashboard loads successfully, displaying summary metrics and correct user role context. | Pending |
| **TC-DASH-002** | Unauthorized Dashboard Access | User is not logged in / session expired. | Direct URL access to `/dashboard` | System blocks access and redirects user back to the login page. | Pending |
| **TC-DASH-003** | Metrics Data Refresh / API Failure | Dashboard is open; backend database encounters network timeout. | Trigger manual refresh action | UI gracefully handles API failure with an error banner or retry option without crashing. | Pending |

---

## 2. Navigation & Layout (`/app-shell`)

| Test Case ID | Feature / Scenario | Preconditions | Input Data | Expected Result | Pass / Fail |
|---|---|---|---|---|---|
| **TC-NAV-001** | Sidebar Navigation Links | User is logged into the ERP system. | Click various sidebar menu items (Inventory, HR, Sales) | Correct module views load without layout breaking or navigation errors. | Pending |
| **TC-NAV-002** | Responsive Mobile Drawer Toggle | User is viewing dashboard on a mobile screen size (< 768px). | Tap hamburger menu icon | Navigation drawer opens/closes smoothly with proper overlay backdrop. | Pending |
| **TC-NAV-003** | User Logout Flow | User is active on the dashboard. | Click Logout button | Session token is cleared from storage, and user is securely redirected to login. | Pending |
