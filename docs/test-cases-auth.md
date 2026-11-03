# Sprint 1 - Test Cases: Authentication Module (S1-TST-02)

## 1. User Registration (`/register`)

| Test Case ID | Feature / Scenario | Preconditions | Input Data | Expected Result | Pass / Fail |
|---|---|---|---|---|---|
| **TC-AUTH-001** | Successful User Registration | Database is running; User is on Register page. | Valid Name, Unique Email, Strong Password | User is successfully registered, redirected to login/dashboard, and auth record is created in Supabase. | Pending |
| **TC-AUTH-002** | Duplicate Email Registration | User with `test@example.com` already exists. | Existing Email, Valid Password | Registration fails with error message: "Email already registered." | Pending |
| **TC-AUTH-003** | Weak / Invalid Password | User is on Register page. | Valid Email, Short Password (e.g., `123`) | Form validation blocks submission or displays password policy requirement error. | Pending |
| **TC-AUTH-004** | Empty Required Fields | User is on Register page. | Blank Name / Email / Password | HTML5/React validation triggers on required inputs; form cannot be submitted. | Pending |

---

## 2. User Login (`/login`)

| Test Case ID | Feature / Scenario | Preconditions | Input Data | Expected Result | Pass / Fail |
|---|---|---|---|---|---|
| **TC-LOG-001** | Successful Login | Registered user account exists. | Correct Email and Password | User logs in successfully, session token stored, redirected to Dashboard. | Pending |
| **TC-LOG-002** | Incorrect Password | Registered user account exists. | Valid Email, Wrong Password | Login fails with error: "Invalid login credentials." No sensitive internal data exposed. | Pending |
| **TC-LOG-003** | Non-existent User Login | User does not exist in database. | Unregistered Email, Any Password | Login fails with error: "Invalid login credentials." | Pending |
| **TC-LOG-004** | SQL / Script Injection Attempt | User is on Login page. | `' OR 1=1 --` in email field | Input is sanitized/handled safely by Supabase; login attempt is blocked. | Pending |

---

## 3. Password Management & Security (`/forgot-password`)

| Test Case ID | Feature / Scenario | Preconditions | Input Data | Expected Result | Pass / Fail |
|---|---|---|---|---|---|
| **TC-PWD-001** | Forgot Password Request | User exists in system. | Valid Email | System sends password reset email link via Supabase Auth service. | Pending |
| **TC-PWD-002** | Password Reset Link Execution | Valid reset token received. | New Valid Password | Password updated successfully in database; user can log in with new password. | Pending |
| **TC-PWD-003** | Expired / Invalid Reset Link | Invalid or used reset token. | New Password | Error displayed: "Invalid or expired password reset link." | Pending |
