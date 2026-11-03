# Sprint 1 Mid-Sprint Check and Impediment Log: HOPE, Inc. ERP

- **Task:** S1-SM-04 · **Owner:** Eraño A. Lomibao (Scrum Master) · **Due:** Sprint day 5 (Wed Oct 28)
- **Written:** Wed Nov 4, 2026 (morning of the midterm). This check is **late**: it was due on day 5 and is being logged after Sprint 1 ended on day 10 (Mon Nov 2). The record below compares progress with due days using the task spreadsheet as of 05:18 on Nov 4, and logs every blocker found during the sprint.
- **Sources:** `docs/board-sprint1.md`, the Sprint 1 task spreadsheet, the GitHub repository (PRs and commits), and team chat.

## 1. Progress compared with due days (as of Nov 4, 05:18)

Sprint 1 ran from Sat Oct 24 (day 1) to Mon Nov 2 (day 10). Most tasks below were merged after their due day. The table shows the current status only.

| Task | Owner | Due day | Status | PR / note |
|------|-------|---------|--------|-----------|
| S1-SM-01 Repo setup | Eraño | 1 | Merged | PR #2 |
| S1-SM-02 Sprint 1 board | Eraño | 1 | Merged | PR #4 (rights catalogue added later in PR #19) |
| S1-SM-03 Working agreement, DoD, role guide | Eraño | 2 | Merged | |
| S1-SM-04 Mid-sprint check and impediment log | Eraño | 5 | In this PR | Late |
| S1-SM-05 Sprint 1 review and retrospective | Eraño | 10 | In this PR | Late |
| S1-DEV-01 Project scaffold | Brean | 2 | Merged | |
| S1-DEV-02 Register form and API | Brean | 4 | Merged | |
| S1-DEV-03 Login, logout, set password | Brean | 6 | Merged | Late. PR link in the spreadsheet |
| S1-DEV-04 Reset password | Brean | 7 | Merged | Late. PR link in the spreadsheet |
| S1-DEV-05 User Management screen | Brean | 8 | Merged | Late. PR link in the spreadsheet |
| S1-DEV-06 Approve users, designate admins | Brean | 8 | Merged | Late. PR link in the spreadsheet |
| S1-DEV-07 Rights dialog | Brean | 9 | Merged | Late. PR link in the spreadsheet |
| S1-DEV-08 Main page and server-side permission check | Brean | 9 | Merged | Late. PR link in the spreadsheet |
| S1-DBA-01 Database setup and README | Mark | 2 | Merged | PR #9 |
| S1-DBA-02 HOPE base tables and sample data | Mark | 3 | Merged | PR #10 |
| S1-DBA-03 Auth and rights tables | Mark | 4 | Merged | PR #14 (see I-04) |
| S1-DBA-04 Password reset token table | Mark | 5 | Merged | PR #17 |
| S1-DBA-05 Seed data | Mark | 5 | Merged | PR #22 (late) |
| S1-DBA-06 `audit_user()` | Mark | 8 | Merged | PR #23 (late) |
| S1-TST-01 Test plan and acceptance criteria | Jhadenn | 3 | Merged | PR #13 |
| S1-TST-02 Test cases: register, login, passwords | Jhadenn | 7 | Merged | PR #15 |
| S1-TST-03 Test cases: User Management | Jhadenn | 8 | Merged | PR link in the spreadsheet |
| S1-TST-04 Permission matrix tests | Jhadenn | 9 | Merged | PR link in the spreadsheet |
| S1-TST-05 Automated smoke test | Jhadenn | 9 | Merged | PR link in the spreadsheet |
| S1-TST-06 Bug reports and fix verification | Jhadenn | 9 | In review | Late |
| S1-UIX-01 Design system | Jian | 2 | Not started | Late (see I-08) |
| S1-UIX-02 Wireframes: login, register, passwords | Jian | 3 | Not started | Late |
| S1-UIX-03 Wireframes: main page, User Management, Rights | Jian | 4 | Not started | Late |
| S1-UIX-04 Hi-fi mockups and handoff notes | Jian | 6 | Not started | Late |
| S1-UIX-05 Usability review and fix list | Jian | 9 | Not started | Late |

**Totals:** 22 of 30 merged (73%), 1 in review, 7 not started (the five UI/UX tasks, plus SM-04 and SM-05 in this PR set).
**By role:** Developer 8 of 8 · DB Admin 6 of 6 · Tester 5 of 6 (TST-06 in review) · UI/UX Designer 0 of 5 · Scrum Master 3 of 5.

## 2. Impediment log

| ID | Date found | Impediment | Affects | Owner | Status | Action / resolution |
|----|-----------|------------|---------|-------|--------|---------------------|
| I-01 | Oct 24 (board risks 1, 7, 8) | Schedule was overloaded: day 9 held six tasks, day 2 fell on a Sunday, days 8 and 9 fell on a weekend. The board proposed moving DEV-07 and DEV-08 to day 8, but no change was recorded. | DEV-07, DEV-08, TST-04 to TST-06, UIX-05 | Eraño | Open | Re-plan Sprint 2 due days on weekdays only, with review time between dependent tasks. |
| I-02 | Nov 3 | No GitHub issues existed (0 open, 0 closed) before issue #18, so earlier PRs could not be linked to an issue. The grading sheet counts a PR as valid only if it is linked to an issue. | All PRs before #19 | Eraño | Open | Create one issue per task from the task template. Every PR description must have `Closes #N`. Ask the teacher whether earlier PRs can be linked afterwards. |
| I-03 | Nov 3 | The 36-rights list (guide 3.8) existed only in the teacher's PDF. The board pointed to it but the repo did not hold it, so Mark could not seed DBA-05. | DBA-05, DEV-07, TST-04 | Eraño | **Resolved Nov 3** | `docs/rights-catalogue.md` merged in PR #19 (issue #18). Right codes are proposed; Mark confirms. |
| I-04 | Nov 3 | Live Supabase schema did not match the merged GitHub migration. Live: integer-id `role` and `module`, boolean `rights_catalogue`, `user_permission` with `module_id`. Migration: UUID ids, one `right_catalog` row per right (`right_key`), `user_permission` linked by `right_id`. DBA-03 was marked Merged but had not been applied to the live database. | DBA-05, DEV-03, DEV-07, DEV-08 | Mark, Brean | Confirm | DBA-05 (PR #22), DBA-06 (PR #23) and the Developer tasks have since merged. Mark confirms that the live database matches the migration and that the backend uses the same table and column names. Rule: a DB task is done only when its migration runs on the shared database. |
| I-05 | Nov 3 | DBA-05 (seed data) blocked login for the demo, because DEV-03 depends on it and DEV-04 on DEV-03. | DEV-03, DEV-04, DEV-08, TST-05 | Mark, Brean | **Resolved Nov 4** | Seed data, login, reset password and the main page are all merged. Confirm in the browser that they work end to end. |
| I-06 | Oct 24 (board decisions 4, 5) | Two decisions were left open on the board: is `pending` a status or a role, and custom login or Supabase Auth. They change DEV-03, DEV-04 and DBA-04. | DEV-03, DEV-04, DBA-04 | Brean, Mark | Confirm | Team to record the decision that was taken in the board or the DoD doc. |
| I-07 | Nov 3 | Spreadsheet errors: some DB Admin and Tester rows had wrong Task IDs (S1-DEV-09 to DEV-19). Most are now corrected. One typo remains: S1-DAB-02 should be S1-DBA-02. | Grading sheet, PR matching | Eraño | Open | Fix the remaining typo and check that each Merged row has its PR link. |
| I-08 | Nov 3 | All five UI/UX tasks are Not started, and Jian has no commits in the repository's contributor list. Developers built without wireframes or a design system. | UIX-01 to UIX-05 | Eraño, Jian | Open | Confirm that Jian has repository access and can open PRs. Agree a minimal deliverable (design system, mockups of the four demo pages) and a date. |
| I-09 | Oct (handoff) | A PR reused an old branch after a squash merge, which brought old commits back (Mark's PR #7). | Any author | All | Resolved | Rule in the working agreement: start each task on a new branch from the latest `main`. |
| I-10 | Nov 3 | Review waits: some PRs depend on one reviewer, and the review target is 24 hours. | All PRs | Brean, Mark | Watch | Brean and Mark review each other and review Jhadenn, Jian and Eraño within 24 hours. |
| I-11 | Nov 4 | Work was concentrated on one person and landed late. The Developer role held 8 of the 30 tasks. On the evening of Nov 3 six of them were not started; by early Nov 4 all were merged, so review and testing time before the demo was short. | DEV-03 to DEV-08, TST-06 | Eraño, Brean | Watch | Spot-check the merged features in the browser before the demo. In Sprint 2, split developer-heavy work across roles earlier and check capacity at planning. |
| I-12 | Nov 4 | The spreadsheet notes for DEV-03 and DEV-04 mention only the backend. The login and reset-password pages in `client/` have not been confirmed. | Demo pages | Brean, Jhadenn | Open | Open the login and reset-password pages on the presenting computer, and confirm they work with the backend. |

## 3. Demo readiness (today, Wed Nov 4)

The midterm needs four working pages connected to Supabase: Register, Login, Reset Password and the main page.

- **Merged:** DEV-02 register, DEV-03 login, DEV-04 reset password, DEV-08 main page, DBA-05 seed data, and tests TST-01 to TST-05.
- **Still to do:** run the four pages end to end on the presenting computer (I-12), finish TST-06 (in review), and prepare a backup recording or screenshots.
- **Not delivered:** all UI/UX work (UIX-01 to UIX-05). These carry to Sprint 2.

Fallback if a page does not work during the demo: show the backup recording or screenshots and explain the remaining issue.

## 4. Next check

Re-check progress against due days at the start of Sprint 2 (and at its midpoint), and update this log. Mark an impediment Resolved only when the fix is merged or confirmed by its owner.
