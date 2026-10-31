# HOPE, Inc. ERP — Definition of Done

## 1. Purpose

The Definition of Done (DoD) establishes the requirements that a task or feature must satisfy before the team considers it completed.

## 2. General Requirements

A task is considered done when:

- All applicable acceptance criteria have been satisfied.
- The changes meet the task's requirements.
- Relevant testing has been completed successfully.
- No known critical bugs remain unresolved.
- The code or documentation follows the team's agreed standards.
- Relevant documentation has been updated when necessary.
- Changes have been committed to the appropriate Git branch.
- A pull request (PR) has been created with the Task ID in its title.
- A teammate has reviewed and approved the PR.
- The PR has been merged into `main`.
- The task's spreadsheet row is marked **Merged** and includes the actual PR link.

## 3. Application and Setup Requirements

For application changes:

- The application runs locally from a fresh clone by following the README instructions.
- The client and server setup instructions are documented.
- Environment variables are configured through environment files.
- An `.env.example` file contains placeholders and no real secrets.
- Required database migrations and setup instructions are documented when applicable.

## 4. Security Requirements

All applicable security requirements must be satisfied.

- Passwords must never be stored in plain text.
- Passwords, API keys, real secrets, and `.env` files must not be committed to the repository.
- The Supabase `service_role` key must never be used in `client/`.
- Protected API routes must check the user's session and permissions on the server.
- Unauthorized requests must be rejected, including direct requests that bypass hidden buttons or menus.
- Authentication and authorization must follow the requirements of the assigned task.

## 5. Database Requirements

For database-related tasks:

- Database changes must be implemented through migration files.
- Tables, relationships, foreign keys, and constraints must work as intended.
- Required seed data must be included when applicable.
- Database setup must be reproducible from an empty database when required.
- Database changes must be tested and documented when necessary.
- Audit-related requirements must be verified for tasks that involve audit functionality.

## 6. UI/UX Requirements

For design-related tasks:

- Designs follow the agreed design system.
- Required screens and interface elements are included.
- Layouts, buttons, inputs, tables, and dialogs are consistent and understandable.
- Design files and handoff notes are available to the development team.
- Usability issues are documented and assigned for follow-up when applicable.

## 7. Testing Requirements

For testing-related tasks:

- Test cases cover the applicable acceptance criteria.
- Required positive and negative test cases are executed.
- Bugs are documented with reproduction steps, expected results, and actual results.
- Fixes are retested when applicable.
- Test results are recorded.
- Permission tests verify the menu, buttons, and server responses where applicable.

## 8. Pull Request Requirements

Before a task can be marked as done:

1. The assigned member completes the task according to its acceptance criteria.
2. The member commits the changes to the appropriate branch.
3. A pull request is created with the Task ID in its title.
4. The PR description explains the changes and relevant testing.
5. At least one teammate reviews and approves the PR.
6. Any requested revisions are addressed.
7. The PR is merged into `main`.
8. The spreadsheet row is updated to **Merged** with the PR link.

No member may approve their own pull request. The team must follow the agreed PR review assignments and repository protection rules.

## 9. Role-Specific Responsibilities

### Scrum Master
- Ensure task statuses and PR links are updated in the project spreadsheet.
- Track progress, blockers, and sprint deadlines.
- Ensure required team documentation is maintained.

### Developer
- Implement features according to the acceptance criteria.
- Test code and address reported bugs.
- Follow security requirements and server-side permission rules.
- Update technical documentation when necessary.

### Database Administrator
- Verify database migrations, tables, relationships, constraints, and seed data.
- Confirm that database setup instructions work.
- Test database changes and audit-related functionality when applicable.

### UI/UX Designer
- Check designs against the agreed requirements and design system.
- Provide the required mockups, specifications, and handoff notes.
- Document usability issues and recommended fixes.

### Tester
- Execute the required test cases.
- Document test results and report bugs.
- Retest fixes and verify whether acceptance criteria have been met.

## 10. Incomplete or Blocked Tasks

A task must not be marked as done if its applicable acceptance criteria have not been satisfied.

If a task is blocked or incomplete:

- The assigned member must report the problem promptly.
- The blocker should be recorded with an owner and date.
- The task status must accurately reflect its progress.
- The task can be marked done only after the applicable requirements have been satisfied.

## 11. Review and Updates

This Definition of Done applies throughout the development of HOPE, Inc. ERP.

The team may revise it when project requirements or development practices change. Proposed changes should be discussed with the team and documented through the agreed GitHub workflow.
