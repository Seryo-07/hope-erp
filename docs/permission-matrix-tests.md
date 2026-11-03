# Sprint 1 - Permission Matrix Test Cases (S1-TST-04)

## Role-Based Access Control (RBAC) Matrix

| Modules & Capabilities | Superadmin | Admin | User | Expected System Behavior |
|---|---|---|---|---|
| **View Public Dashboard** | ✅ Pass | ✅ Pass | ✅ Pass | Accessible to all authenticated roles. |
| **User Management Access** | ✅ Pass | ✅ Pass | ❌ Fail (Blocked) | Non-admin users are redirected with 403 Access Denied. |
| **Create / Approve Users** | ✅ Pass | ✅ Pass | ❌ Fail (Blocked) | Action buttons hidden and API endpoint secured. |
| **System Settings & RLS Overrides** | ✅ Pass | ❌ Fail (Blocked) | ❌ Fail (Blocked) | Restricted exclusively to Superadmin role. |

---

## Permission Matrix Test Scenarios

| Test Case ID | Role | Target Route / Action | Preconditions | Input Data | Expected Result | Pass / Fail |
|---|---|---|---|---|---|---|
| **TC-PERM-001** | User | `/settings` / System Config | Logged in as standard User | Navigate to Admin route | System blocks navigation and shows Access Denied banner. | Pending |
| **TC-PERM-002** | Admin | Create User Action | Logged in as Admin | Submit new user details | User creation succeeds with proper role assignment. | Pending |
| **TC-PERM-003** | Superadmin | Modify System Roles | Logged in as Superadmin | Change user role permissions | Role permissions update instantly across RLS policies. | Pending |
