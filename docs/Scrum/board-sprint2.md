# Sprint 2 Planning Notes and Board
 
**Task:** S2-SM-01 · **Owner:** Eraño A. Lomibao (Scrum Master) · **Sprint:** 2 (Weeks 3–4, 10 sprint days)
**Sprint dates:** 2026-11-17 to 2026-12-1
 
---
 
## 1. Sprint Goal
 
Deliver the **Customer** and **Product** modules (including product price history). Each must have list, search/filter, create/edit, and soft delete/restore. Every action must be enforced by the per-action rights built in Sprint 1.
 
By Sprint Review, a user with the right permissions can manage customers, products and prices end to end. A user without a given right cannot see the button or call the API for that action.
 
---
 
## 2. Attendees
 
| Name | Role |
|---|---|
| Eraño A. Lomibao | Scrum Master, UI/UX Designer |
| Brean Shein I. Ibañez | Developer |
| Mark Angel D. Tugade | DB Admin |
| Jian Dominic Delos Reyes | Tester (moved from UI/UX in Sprint 2, replacing Jhadenn Cypher) |
 
---
 
## 3. Inputs from Sprint 1
 
- **Sprint 1 outcome:** All Developer, DB Admin, Tester and Scrum Master tasks merged. This covers auth, User Management, Superadmin approval, the Rights dialog, the main page and server-side permission checks.
- **Team change:** Jhadenn Cypher has left the team. The team agreed on these role changes from Sprint 2:
  - Jian Dominic Delos Reyes moves from UI/UX Designer to Tester. Jian was the planned UI/UX Designer in Sprint 1 but completed no Sprint 1 tasks.
  - Eraño A. Lomibao formally takes the UI/UX Designer role alongside Scrum Master. Eraño already covered the Sprint 1 UI/UX work (S1-UIX-01 to 05).
  - Jhadenn's Sprint 1 test work (S1-TST-01 to 06) stays credited to him. Jian builds on the existing test docs: `test-plan-sprint1.md`, `test-cases-auth.md`, `test-cases-core.md`, `permission-matrix-tests.md` and `smoke-test-cases.md`.
---
 
## 4. Scope and Capacity
 
| Role | Owner | Tasks | IDs |
|---|---|---|---|
| Developer | Brean Shein I. Ibañez | 8 | S2-DEV-01 to 08 |
| DB Admin | Mark Angel D. Tugade | 6 | S2-DBA-01 to 06 |
| Tester | Jian Dominic Delos Reyes | 6 | S2-TST-01 to 06 |
| UI/UX Designer | Eraño A. Lomibao | 5 | S2-UIX-01 to 05 |
| Scrum Master | Eraño A. Lomibao | 5 | S2-SM-01 to 05 |
| **Total** | | **30** | |
 
Each task is one planned PR.
 
> **Action:** Fill in the "Assigned to" names for the Sprint 2 DB Admin, Tester and UI/UX rows in the task sheet. They are currently blank.
 
---
 
## 5. User Stories and Acceptance Criteria
 
### Story 1: View and find customers (S2-DEV-01, S2-DBA-01)
*As a user with Customer view rights, I want to search and filter the customer list so I can find a customer quickly.*
- The list shows active customers only. Soft-deleted customers are hidden unless "Show deleted" is used by a user with restore rights.
- Search by customer name or code. Filter by payment terms.
- A user without the Customer view right gets no menu item, no tile, and a 403 from the API.
### Story 2: Add and edit customers (S2-DEV-02, S2-DBA-03)
*As a user with Customer Add/Edit rights, I want to create and update customer records.*
- Required fields are validated on both the client and the server.
- `payTerms` only accepts allowed values. This is enforced by a database constraint as well as the form.
- The Add and Edit buttons appear only for users who hold that specific right.
- Every insert and update is recorded in `audit_log` with the logged-in user.
### Story 3: Delete and restore customers (S2-DEV-03, S2-DBA-04)
*As a user with Customer Delete rights, I want to soft delete and restore customers without losing history.*
- Delete asks for confirmation and sets the soft-delete flag. No row is physically removed.
- Delete is blocked, with a clear message, when the customer has active child records.
- Restore brings the record back to the active list.
### Story 4: View and find products (S2-DEV-04, S2-DBA-01, S2-DBA-06)
*As a user with Product view rights, I want to search and filter the product list.*
- Same rules as Story 1, applied to products.
- Search stays responsive on the demo dataset. This is checked in S2-DBA-06.
### Story 5: Add and edit products (S2-DEV-05, S2-DBA-03)
*As a user with Product Add/Edit rights, I want to create and update products.*
- `unit` only accepts allowed values, enforced by a database constraint and the form.
- Add and Edit follow per-action rights. All changes are audited.
### Story 6: Delete and restore products (S2-DEV-06, S2-DBA-04)
*As a user with Product Delete rights, I want to soft delete and restore products.*
- Same rules as Story 3, including the active-child-record check.
### Story 7: Manage price history (S2-DEV-07, S2-DBA-02)
*As a user with price rights, I want to add, edit and delete prices with an effective date so price changes are tracked over time.*
- Each price row has an amount and an effective date.
- Two prices for the same product cannot share an effective date.
- Add, Edit and Delete for prices each follow their own right.
### Story 8: Show the current price (S2-DEV-08, S2-DBA-02)
*As a user, I want the product page to show the price in effect today.*
- The current price is the row with the latest effective date on or before today.
- If no price is in effect yet, the page shows "No current price".
- The per-action rights checks (Add/Edit/Delete) are verified across both modules.
---
 
## 6. Sprint Board (snapshot at planning)
 
Columns: **To Do → In Progress → In Review → Done (Merged)**
 
| Column | Tasks |
|---|---|
| **Done** | S2-DEV-01 (PR #40) |
| **In Review** | S2-DEV-02 (#41), S2-DEV-03 (#42), S2-DEV-04 (#43), S2-DEV-05 (#44) |
| **In Progress** | S2-UIX-01, S2-SM-01 |
| **To Do** | S2-DEV-06–08, S2-DBA-01–06, S2-TST-01–06, S2-UIX-02–05, S1-UIX-05 (carry-over), S2-SM-02–05 |
 
### Plan by sprint day
 
| Day | Due |
|---|---|
| 1 | S2-SM-01 |
| 2 | S2-DEV-01, S2-DBA-01, S2-UIX-01 |
| 3 | S2-DEV-02, S2-TST-01, S2-UIX-02, S2-SM-02 |
| 4 | S2-DEV-03, S2-DBA-02 |
| 5 | S2-DEV-04, S2-DBA-03, S2-TST-02, S2-UIX-03, S2-SM-03 |
| 6 | S2-DEV-05, S2-DBA-04 |
| 7 | S2-DEV-06, S2-DBA-05, S2-TST-03, S2-UIX-04 |
| 8 | S2-DEV-07, S2-TST-04, S2-SM-04 |
| 9 | S2-DEV-08, S2-DBA-06, S2-TST-05, S2-TST-06, S2-UIX-05, S1-UIX-05 |
| 10 | S2-SM-05 (review and retrospective) |
 
---
 
## 7. Risks and Impediments
 
| # | Risk | Mitigation | Owner |
|---|---|---|---|
| 1 | Developer PRs are ahead of design and DB work. Customer and product screens were built before the S2 wireframes and constraints (S2-UIX-01–03, S2-DBA-01–03). | Review open PRs #41–#44 against the wireframes and constraints once they land. Log any gaps as fix tasks. | Eraño, Mark |
| 2 | Four developer PRs are waiting in review at once. | Reviewers pick up PRs within one sprint day. Merge in task order (#41 → #44) to avoid conflicts. | All |
| 3 | Test cases (S2-TST-01/02) are due after the related features were opened. | Tester writes customer test cases first and runs them against #41–#42 while they are in review. | Jian |
| 4 | Tester role change. Jian is new to testing and delivered no tasks in Sprint 1, and the team loses a regular PR reviewer (Jhadenn approved most Sprint 1 developer PRs). | Confirm Jian has repo access and update the collaborators table in `repo-setup.md`. Walk Jian through the Sprint 1 test docs and local setup README. Check in on Jian's first task (S2-TST-01, due day 3) at the day 3 check-in and raise it at the mid-sprint check (S2-SM-03) if it slips. Share PR reviews among Eraño, Mark and Jian so #41–#44 are not blocked. | Eraño |
| 5 | Eraño holds two roles (Scrum Master and UI/UX), 10 tasks this sprint, the most on the team. | Keep Scrum Master documents short. Prioritise the UI/UX tasks that unblock development (S2-UIX-01–03). | Eraño |
| 6 | The 8-week limit: at two weeks per sprint, Sprint 5 would fall in weeks 9–10. | Confirm the Sprint 3–5 schedule before Sprint 2 Review (shorter sprints or merged scope). | Eraño |
 
---
 
## 8. Definition of Done
 
This sprint follows the team Definition of Done in `docs/definition-of-done.md` (S1-SM-03): one PR per task, at least one approving review, merged into `main`, task sheet status set to **Merged** with the PR link, and acceptance criteria verified by the Tester.
 
