# HOPE, Inc. ERP — Team Role Guide

## 1. Purpose

This guide defines each team member's responsibilities during the development of HOPE, Inc. ERP. It helps the team coordinate tasks and understand who is responsible for each part of Sprint 1.

## 2. Team Members and Roles

| Team Member | Role |
|---|---|
| Brean Shein I. Ibañez | Developer |
| Mark Angel D. Tugade | Database Administrator (DB Admin) |
| Jhadenn Cypher | Tester |
| Jian Dominic Delos Reyes | UI/UX Designer |
| Eraño A. Lomibao | Scrum Master |

## 3. Scrum Master

**Assigned member:** Eraño A. Lomibao

### Responsibilities
- Maintain the sprint board and task spreadsheet.
- Track task owners, due days, dependencies, and progress.
- Coordinate meetings and team communication.
- Help identify and resolve blockers.
- Maintain team agreements and project process documentation.
- Coordinate sprint reviews and retrospectives.
- Ensure completed tasks have the required PR links and updated statuses.

### Sprint 1 Deliverables
- Repository setup and workflow documentation.
- Sprint 1 board.
- Team working agreement.
- Definition of Done and role guide.
- Mid-sprint checkpoint and impediment log.
- Sprint review and retrospective report.

## 4. Developer

**Assigned member:** Brean Shein I. Ibañez

### Responsibilities
- Develop the React client and Node.js server.
- Implement user registration and authentication.
- Implement login, logout, password setup, and password reset.
- Develop the User Management screen.
- Implement user approval and admin designation.
- Develop the Rights dialog and main page.
- Ensure protected API routes enforce permissions on the server.
- Test code, fix reported bugs, and update technical documentation.

### Sprint 1 Deliverables
- Project scaffold.
- Registration and authentication features.
- Password setup and reset functionality.
- User Management screen.
- User approval and admin designation.
- Rights dialog.
- Main page and server-side permission checks.

## 5. Database Administrator (DB Admin)

**Assigned member:** Mark Angel D. Tugade

### Responsibilities
- Set up the shared Supabase project.
- Create and maintain database migrations.
- Create the required HOPE base tables and sample data.
- Design authentication, role, module, and permission tables.
- Prepare password-reset token storage if required by the agreed authentication approach.
- Seed default roles, modules, and the 36 required rights.
- Support audit logging and verify database-related changes.
- Coordinate table and column names with the Developer.

### Sprint 1 Deliverables
- Database setup instructions and migration runner.
- HOPE base tables and sample data.
- Authentication and rights tables.
- Password-reset token table, if required.
- Seed data for roles, modules, and rights.
- `audit_user()` functionality and related verification.

## 6. Tester

**Assigned member:** Jhadenn Cypher

### Responsibilities
- Prepare the Sprint 1 test plan and acceptance criteria.
- Create test cases for registration, login, logout, password setup, and password reset.
- Test user-management functions, including adding, editing, blocking, unblocking, approving users, and designating admins.
- Verify role-based and per-action permissions.
- Test the main page and protected API routes.
- Report bugs with reproduction steps, expected results, and actual results.
- Retest fixes and record whether issues are verified or reopened.
- Document test results.

### Sprint 1 Deliverables
- Test plan and acceptance criteria.
- Authentication and password test cases.
- User Management test cases.
- Permission matrix tests.
- Automated smoke test.
- Bug reports and fix-verification records.

## 7. UI/UX Designer

**Assigned member:** Jian Dominic Delos Reyes

### Responsibilities
- Establish the design system, including colors, typography, spacing, buttons, inputs, tables, and dialogs.
- Create wireframes for login, registration, and password-related screens.
- Design the main page, User Management screen, and Rights dialog.
- Create high-fidelity mockups using the agreed design system.
- Provide handoff notes describing layouts, states, spacing, and behavior.
- Review implemented screens against the mockups.
- Document usability problems, their severity, and the person responsible for addressing them.

### Sprint 1 Deliverables
- Design system.
- Authentication wireframes.
- Main page and User Management wireframes.
- Rights dialog wireframe.
- High-fidelity mockups and handoff notes.
- Usability review and fix list.

## 8. Shared Responsibilities

All team members must:

- Understand their assigned tasks and acceptance criteria.
- Follow the Sprint 1 board and communicate delays early.
- Coordinate with teammates when tasks have dependencies.
- Follow the team's GitHub branch and pull request workflow.
- Never approve their own pull requests.
- Protect passwords, API keys, and other sensitive information.
- Test and document their work as applicable.
- Follow the Definition of Done before marking tasks complete.
- Review and follow the team working agreement.

## 9. Collaboration Between Roles

- The Scrum Master coordinates task progress and helps resolve blockers.
- The Developer and DB Admin agree on database table and column names before dependent features are implemented.
- The UI/UX Designer provides wireframes and mockups to guide development.
- The Tester uses acceptance criteria to verify implemented features.
- The Developer addresses reported bugs and coordinates with the Tester for retesting.
- All members communicate changes that may affect another member's work.

## 10. Review and Updates

This guide applies throughout the development of HOPE, Inc. ERP. The team may update it when responsibilities or project requirements change. Proposed changes should be discussed with the team and documented through the agreed GitHub workflow.
