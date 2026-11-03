# Sprint 1 Review and Retrospective: HOPE, Inc. ERP

- **Task:** S1-SM-05 · **Owner:** Eraño A. Lomibao (Scrum Master) · **Due:** Sprint day 10 (Mon Nov 2)
- **Written:** Wed Nov 4, 2026 (late, on the morning of the midterm). Sprint 1 ran Sat Oct 24 to Mon Nov 2, 2026.
- **Team:** Brean Shein I. Ibañez (Developer) · Mark Angel D. Tugade (DB Admin) · Jhadenn Cypher (Tester) · Jian Dominic Delos Reyes (UI/UX Designer) · Eraño A. Lomibao (Scrum Master)
- **Related:** `docs/board-sprint1.md`, `docs/sprint1-impediment-log.md`

## 1. Sprint goal and result

**Goal (from the board):** by day 10, a user can register, be approved by a Superadmin, set a password, log in, and land on a main page whose menu and buttons follow their role and per-action rights, with every permission enforced on the server and rights changes recorded in `audit_log`.

**Result: mostly delivered in code, but late.** By the morning of Nov 4 every Developer and DB Admin task was merged, covering registration, login, password reset, user approval, the Rights dialog, the main page, server-side permission checks and audit logging. However, these were merged after day 10, the bug-report and fix verification task (TST-06) was still in review, and none of the UI/UX tasks were delivered. End-to-end behavior still has to be confirmed in the browser.

## 2. What was merged

22 of 30 tasks (73%) were merged when this report was written (spreadsheet as of 05:18 on Nov 4).

| Role | Merged | Tasks |
|------|--------|-------|
| Developer | 8 of 8 | DEV-01 scaffold, DEV-02 register, DEV-03 login, DEV-04 reset password, DEV-05 User Management, DEV-06 approvals and admin designation, DEV-07 Rights dialog, DEV-08 main page with server-side permission checks |
| DB Admin | 6 of 6 | DBA-01 database setup, DBA-02 base tables and sample data, DBA-03 auth and rights tables, DBA-04 password reset token table, DBA-05 seed data, DBA-06 `audit_user()` |
| Tester | 5 of 6 | TST-01 test plan, TST-02 register, login and password test cases, TST-03 User Management test cases, TST-04 permission matrix tests, TST-05 automated smoke test (TST-06 is in review) |
| UI/UX Designer | 0 of 5 | None |
| Scrum Master | 3 of 5 | SM-01 repo setup, SM-02 Sprint 1 board, SM-03 working agreement, Definition of Done and role guide (SM-04 and SM-05 are this PR set) |

Also merged, outside the original task list: `docs/rights-catalogue.md` (PR #19, issue #18), the 36 per-action rights from guide 3.8.

Many of these were merged after their due day. Most of the Developer tasks landed between the evening of Nov 3 and early Nov 4.

## 3. What was not merged

| Group | Tasks | Why |
|-------|-------|-----|
| Testing | TST-06 bug reports and fix verification | In review when written |
| Design | UIX-01 to UIX-05 | Not started; see I-08 in the impediment log |

## 4. Review of the work (for the midterm demo)

The midterm (Wed Nov 4) needs four working pages connected to Supabase: Register, Login, Reset Password and the main page.

| Page | Status when written |
|------|---------------------|
| Register | Merged (DEV-02) |
| Login | Merged (DEV-03). Browser check pending |
| Reset Password | Merged (DEV-04). Browser check pending |
| Main page | Merged (DEV-08). Browser check pending |

The spreadsheet notes for DEV-03 and DEV-04 mention only the backend, so the login and reset-password pages in `client/` still need to be confirmed (impediment I-12). Demo plan: run all four pages on the presenting computer, keep screenshots or a backup recording, and finish TST-06. *(Update this table with the final demo result after the presentation.)*

## 5. Retrospective

### What went well
- The repository is protected: `main` accepts changes only through PRs with one approval, and the PR template and task template are in `.github/`.
- Review pairs worked. Brean and Mark review each other and approved Scrum Master PRs quickly (PR #19 was approved and merged the same evening it was opened).
- The DB Admin completed all six tasks, including the seed data and `audit_user()`.
- The Tester delivered the test plan, test cases, the permission matrix and a smoke test, ahead of or alongside the features.
- The Developer merged all eight tasks, including login, the Rights dialog and server-side permission checks, in the last day before the demo.
- Problems were raised openly. Mark checked the live Supabase database before seeding and reported the schema mismatch instead of guessing.

### What did not go well
- **Too much was planned for the time.** Day 9 held six tasks, day 2 fell on a Sunday and days 8 and 9 fell on a weekend. The board named these risks on day 1 but the plan was not changed.
- **Work landed late.** Most of the Developer work merged after day 10, so review and testing time before the demo was short.
- **Dependencies were stacked.** Login depended on seed data, which depended on the rights tables, which depended on a schema that was not applied to the live database. One blocked task held up the whole chain.
- **"Merged" did not mean "working".** DBA-03 was merged but not applied to the shared database, so the repo and live schema drifted apart.
- **Work was concentrated on one person.** The Developer role held 8 of the 30 tasks.
- **Design work did not start.** None of the five UI/UX tasks were merged, so developers built without wireframes or a design system.
- **No GitHub issues.** Before issue #18 there were none, so earlier PRs were not linked to issues, which the grading sheet requires.
- **Shared information was missing.** The 36-rights list stayed in the teacher's PDF until Nov 3.
- **Tracking was late.** The mid-sprint check (SM-04) was written after the sprint ended, and the spreadsheet had Task ID errors.

### Lessons learned
1. Plan from dependencies and capacity, not only due dates. Put the unblocking tasks (database, seed data) first and give them slack.
2. A database task is done only when its migration runs on the shared database, not when the PR merges.
3. Every task gets an issue, and every PR says `Closes #N`.
4. Put shared reference material (rights list, decisions) in `docs/` where everyone can find it.
5. Hold the mid-sprint check on the due day and update the impediment log whenever a blocker appears.
6. When one role is overloaded, move or share its work early instead of waiting for the due day.
7. Merge earlier so there is time to test, not only to review.

## 6. Actions for Sprint 2

Sprint 2 (weeks 3-4) covers Customer and Product. The Sprint 1 tasks below carry over first.

| # | Action | Owner | By |
|---|--------|-------|----|
| 1 | Run Register, Login, Reset Password and the main page end to end on the presenting computer, and keep screenshots or a backup recording | Jhadenn, Brean, Eraño | Today, before the demo |
| 2 | Finish TST-06 (bug reports and fix verification) | Jhadenn | Today |
| 3 | Confirm that the live Supabase schema matches the migration, and that the right codes in `docs/rights-catalogue.md` are the ones in the database | Mark, Brean | Today |
| 4 | Confirm Jian's repository access and deliver a minimal design system and mockups (UIX-01, UIX-04); carry UIX-02, UIX-03 and UIX-05 to Sprint 2 | Jian, Eraño | This week |
| 5 | Create an issue for every task and require `Closes #N` in every PR | Eraño, all | Immediately |
| 6 | Re-plan Sprint 2 due days on weekdays, with at most three tasks due on any one day per person, and balance work across roles | Eraño | Sprint 2 planning |
| 7 | Correct the remaining spreadsheet Task ID typo (S1-DAB-02) and keep each Merged row's PR link current | Eraño | Immediately |
| 8 | Hold a mid-sprint check on the due day and update `docs/sprint1-impediment-log.md` | Eraño | Sprint 2 midpoint |
| 9 | Agree a "done" rule: a task is done when it is merged, applied to the shared database if it changes it, and checked in the browser | All | Sprint 2 planning |
| 10 | Ask the teacher whether late merges and issues linked after merging count toward grading | Eraño | Immediately |

## 7. Notes

- Counts come from the task spreadsheet and the repository on Nov 4 and should be re-checked after any later merge.
- The retrospective reasons are the Scrum Master's observations from the board, the repository and team chat. The team can add to them.
