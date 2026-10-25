# Sprint 1 Board: HOPE, Inc. ERP

**Task:** S1-SM-02 · **Owner:** Scrum Master · **Due:** Sprint day 1
**Sprint 1:** weeks 1-2 (sprint days 1-10, counted as calendar days) · **Start date:** Sat Oct 24, 2026 (agreed by the team) · **End date:** Mon Nov 2, 2026
**Stack:** React (client) · Node.js (server) · Supabase (database)
**Team:** Brean Shein I. Ibañez (Developer) · Mark Angel D. Tugade (DB Admin) · Jhadenn Cypher (Tester) · Jian Dominic Delos Reyes (UI/UX Designer) · Eraño A. Lomibao (Scrum Master)

## Sprint 1 calendar (day 1 = Oct 24, agreed by the team)

| Sprint day | Date | Sprint day | Date |
|---|---|---|---|
| 1 | Sat Oct 24 | 6 | Thu Oct 29 |
| 2 | Sun Oct 25 | 7 | Fri Oct 30 |
| 3 | Mon Oct 26 | 8 | Sat Oct 31 |
| 4 | Tue Oct 27 | 9 | Sun Nov 01 |
| 5 | Wed Oct 28 | 10 | Mon Nov 02 |

## Sprint 1 goal

By day 10, a user can register, be approved by a Superadmin, set a password, log in, and land on a main page whose menu and buttons follow their role and per-action rights. Every permission is also enforced on the server, not only hidden in the UI. Rights changes are recorded in `audit_log`.

## Module-to-sprint map (all six guide modules, 8 weeks)

| Sprint | Weeks | Module(s) | Main deliverables |
|---|---|---|---|
| 1 | 1-2 | **User Management** (plus foundation) | Scaffold, database, register, login, reset password, user list, approve/designate admin, Rights dialog, main page |
| 2 | 3-4 | **Customer**, **Product** | Customer CRUD and soft delete, Product CRUD and soft delete, price history |
| 3 | 5-6 | **Human Resources** | Departments, Jobs, Employees, Job History, salary visibility |
| 4 | 7-8 | **Sales**, **Reports** | Sales header and line items, payments, balance, 7 reports, audit log viewer |

Rights for all five business modules (Customer, Product, Human Resources, Sales, Reports) are created in Sprint 1 (36 rights, guide 3.8) so later sprints only attach screens to rights that already exist.

**Risk:** Sprint 4 is the heaviest (Sales, Payments, 7 reports, audit viewer). Track it from Sprint 2. The audit log viewer (S4-DEV-08) is the first item to simplify if we fall behind.

## Definition of Ready (a story can start when)
- It has an assigned person and a due day.
- Its dependencies (listed under each story) are merged.
- Its acceptance criteria are understood by the assignee.

## Review pairs (nobody approves their own PR)
Brean ⇄ Mark review each other. Jhadenn and Jian are reviewed by Brean or Mark. Eraño's PRs can be reviewed by anyone.

## Done means (short form; full version in the Definition of Done doc)
- One PR, with the Task ID in the title, reviewed by a teammate and merged to `main`.
- Runs locally from a fresh clone using the README.
- No passwords, keys or `.env` files committed; `service_role` key never used in `client/`.
- Permission checks exist on the server, not only in the UI.
- Spreadsheet row set to Merged with the PR link.

---

## Stories and acceptance criteria

### Developer

**S1-DEV-01 · Project scaffold** · Owner: Brean · due day 2
As a developer, I want a working app skeleton so the team can build on one shared base.
- [ ] `client/` (React) and `server/` (Node.js) start with one documented command each.
- [ ] Environment values come from `.env` files; a `.env.example` with no real secrets is committed.
- [ ] The server connects to the team's Supabase project and a test endpoint returns a successful database response.
- [ ] README explains how to run it from a fresh clone.

**S1-DEV-02 · Register** · Owner: Brean · due day 4 · depends on: DEV-01, DBA-03
As a visitor, I want to register so I can request access.
- [ ] The form asks for the required fields, with validation and clear error messages.
- [ ] Submitting creates a user with status **pending**; the user cannot log in yet.
- [ ] Duplicate email or username is rejected with a clear message.
- [ ] Passwords are never stored in plain text or shown in responses.

**S1-DEV-03 · Login, logout, set password** · Owner: Brean · due day 6 · depends on: DEV-01, DBA-03, DBA-05
As a user, I want to log in and out so only approved people can use the system.
- [ ] A correct login opens a session and goes to the main page; a wrong password shows an error without saying which part was wrong.
- [ ] Logout ends the session; the back button does not restore access.
- [ ] Passwords are hashed; the first login uses a one-time set-password link.
- [ ] Pending and blocked users cannot sign in and see a clear message.

**S1-DEV-04 · Reset password** · Owner: Brean · due day 7 · depends on: DEV-03, DBA-04
As a user, I want to reset a forgotten password.
- [ ] Requesting a reset sends an email with a one-time link (no hint whether the email exists).
- [ ] The token is stored hashed, expires, and works once only.
- [ ] An expired or already-used link shows an error and cannot reset the password.
- [ ] After a reset the new password works and the old one does not.

**S1-DEV-05 · User Management screen** · Owner: Brean · due day 8 · depends on: DEV-03, DBA-03
As an Admin or Superadmin, I want to manage users.
- [ ] The list shows users with role and status; Add, Edit and Block/Unblock work.
- [ ] A blocked user cannot log in; unblocking restores access.
- [ ] Admin manages ordinary users only; **Superadmin accounts are hidden** from Admin in the list and by direct request.
- [ ] The server rejects management actions from users who lack the right.

**S1-DEV-06 · Approve users and designate admins** · Owner: Brean · due day 8 · depends on: DEV-05
As a Superadmin, I want to approve pending users and designate admins.
- [ ] Only a Superadmin can approve a pending user or designate an Admin (checked on the server).
- [ ] Approved users can log in; designated admins gain the Admin role.
- [ ] The last remaining Superadmin cannot be removed, demoted or blocked; the system explains why.

**S1-DEV-07 · Rights dialog** · Owner: Brean · due day 9 · depends on: DEV-05, DBA-03, DBA-05, DBA-06
As an Admin or Superadmin, I want to assign per-action rights by module.
- [ ] The dialog lists the 36 rights grouped under Customer, Product, Human Resources, Sales and Reports.
- [ ] Each module has a checkbox, and All/None selects or clears its rights.
- [ ] Saving updates `user_permission`; reopening shows the saved state.
- [ ] Every change is written to `audit_log` with who changed what, for whom, and when.

**S1-DEV-08 · Main page and server-side permission check** · Owner: Brean · due day 9 · depends on: DEV-03, DBA-05
As a user, I want a main page showing only what I'm allowed to use.
- [ ] The sidebar and module tiles show only modules and actions the user's role and rights allow.
- [ ] Every API route checks the user's session and rights on the server and returns 403 when not allowed.
- [ ] Calling a protected URL directly, without the right, is refused even if the button is hidden.

### DB Admin

**S1-DBA-01 · Database setup and README** · Owner: Mark · due day 2
- [ ] One shared Supabase project exists and every member has access.
- [ ] A migration runner script applies migrations in order and can be re-run safely.
- [ ] The setup README works on a fresh machine without Docker.

**S1-DBA-02 · HOPE base tables and sample data** · Owner: Mark · due day 3 · depends on: DBA-01
- [ ] All HOPE tables from `HopeDB_audit.sql` are created through a migration, with sample data loaded.
- [ ] Rebuilding from empty produces the same result.

**S1-DBA-03 · Auth and rights tables** · Owner: Mark · due day 4 · depends on: DBA-02
- [ ] `app_user` (role, status including pending, blocked flag), `role`, `module`, rights catalogue and `user_permission` (with soft delete) exist.
- [ ] Foreign keys and constraints prevent orphan rows.
- [ ] Table and column names are agreed with the Developer first.

**S1-DBA-04 · Password reset token table** · Owner: Mark · due day 5 · depends on: DBA-03
- [ ] The table stores a hashed token, expiry time and used flag, linked to the user.
- [ ] No plain-text token is stored.
- [ ] _Confirm with the team whether Supabase Auth replaces this._

**S1-DBA-05 · Seed data** · Owner: Mark · due day 5 · depends on: DBA-03
- [ ] One Superadmin per team member, five modules, default roles and **36 rights** (3 + 6 + 13 + 7 + 7, guide 3.8).
- [ ] No passwords in the repo; first password is set through a one-time link.
- [ ] Counts are verified with a query.

**S1-DBA-06 · `audit_user()` records the logged-in user** · Owner: Mark · due day 8 · depends on: DEV-03
- [ ] Inserts, updates and deletes record the logged-in user, not a generic database user.
- [ ] A test shows the right user name appears in `audit_log`.

### Tester

**S1-TST-01 · Test plan and acceptance criteria** · Owner: Jhadenn · due day 3
- [ ] The plan lists scope, test accounts per role, environments and how bugs are reported (using the bug template).
- [ ] Acceptance criteria for each Sprint 1 story are collected from this board.

**S1-TST-02 · Test cases: register, login, passwords** · Owner: Jhadenn · due day 7
- [ ] Cases cover register, login, logout, set password and reset password.
- [ ] Negative cases include wrong password, pending user, blocked user, expired token and reused token.

**S1-TST-03 · Test cases: User Management** · Owner: Jhadenn · due day 8
- [ ] Cases cover add, edit, block/unblock, approve and designate admin.
- [ ] Admin cannot see or edit a Superadmin, and the last-Superadmin guard is tested.

**S1-TST-04 · Permission matrix tests** · Owner: Jhadenn · due day 9
- [ ] Superadmin, Admin and User are each tested against every right, using registered and approved accounts.
- [ ] For each right, the menu, the button **and the server response** agree.

**S1-TST-05 · Automated smoke test** · Owner: Jhadenn · due day 9
- [ ] One automated test logs in and checks that the main page loads.
- [ ] It runs with a single command and the README says how.

**S1-TST-06 · Bug reports and fix verification** · Owner: Jhadenn · due day 9
- [ ] Each bug uses the bug template with steps, expected result, actual result and role used.
- [ ] Each fix is re-tested and marked verified or reopened.

### UI/UX Designer

**S1-UIX-01 · Design system** · Owner: Jian · due day 2
- [ ] Colors, typography, spacing, buttons, inputs, tables and dialog are defined in one place the developers can open.

**S1-UIX-02 · Wireframes: login, register, passwords** · Owner: Jian · due day 3
- [ ] Screens include normal, error and success states.

**S1-UIX-03 · Wireframes: main page, User Management, Rights dialog** · Owner: Jian · due day 4
- [ ] The Rights dialog shows the module checkbox, All/None and the long list of rights.

**S1-UIX-04 · Hi-fi mockups and handoff notes** · Owner: Jian · due day 6
- [ ] Mockups cover login, register, main page, User Management and Rights dialog using the design system.
- [ ] Handoff notes list spacing, states and behavior. Developers build from wireframes until day 6.

**S1-UIX-05 · Usability review and fix list** · Owner: Jian · due day 9
- [ ] Built screens are reviewed against the mockups.
- [ ] Problems are listed with severity and an owner.

### Scrum Master

**S1-SM-01 · Repo setup** · Owner: Eraño · due day 1
- [x] Branch protection on `main` (PR required, 1 approval, no force push): ruleset `protect-main`, active.
- [x] PR template and the two issue templates are in `.github/`.
- [x] Teammates are invited as collaborators (4 of 5 have joined).

**S1-SM-02 · Sprint 1 board** · Owner: Eraño · due day 1
- [ ] This document is merged to `main` as `docs/board-sprint1.md`.
- [ ] All six modules are mapped to sprints within 8 weeks.

**S1-SM-03 · Working agreement, Definition of Done, role guide** · Owner: Eraño · due day 2
- [ ] Documents are merged and every member has read them.

**S1-SM-04 · Mid-sprint check and impediment log** · Owner: Eraño · due day 5
- [ ] Progress is compared with due days; blockers are logged with an owner and a date.

**S1-SM-05 · Sprint 1 review and retrospective report** · Owner: Eraño · due day 10
- [ ] The report covers what was merged, what was not, the reasons, and actions for Sprint 2.

---

## Schedule risks and open decisions

1. **Day 9 is overloaded:** DEV-07, DEV-08, TST-04, TST-05, TST-06 and UIX-05 are all due on day 9, and the review is day 10. Proposal: move DEV-07 and DEV-08 to day 8.
2. **DEV-02 and DBA-03 are both due day 4.** The Developer needs the table first.
3. **Mockups (UIX-04, day 6) arrive when DEV-03 is due.** Build from wireframes first.
4. **Is `pending` a status or a role?** Decide before DBA-03.
5. **Custom login or Supabase Auth?** This changes DEV-03, DEV-04 and DBA-04.
6. **Collaborators:** four of five members have joined the repo. One member's GitHub username is still pending, so that member cannot open PRs yet and UIX-01 (due day 2) is at risk.
7. **Day 2 is Sun Oct 25.** DEV-01, DBA-01 and UIX-01 are due on day 2. Agree whether the due days stay as they are or move.
8. **Days 8 and 9 fall on a weekend (Oct 31 and Nov 1).** Most review-heavy tasks are due then. Confirm the team can work on those days, or move the due dates earlier.
