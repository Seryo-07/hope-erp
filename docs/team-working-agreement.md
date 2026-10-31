# HOPE, Inc. ERP — Team Working Agreement

## 1. Purpose

This working agreement establishes the rules and expectations that guide the HOPE, Inc. ERP development team. It helps team members coordinate their work, communicate effectively, follow the agreed development process, and deliver the required project features.

## 2. Team Members and Roles

Each member is responsible for completing their assigned tasks and coordinating with other members when necessary.

| Team Member | Role | Main Responsibility |
|---|---|---|
| Brean Shein I. Ibañez | Developer | Application development, authentication, User Management, rights dialog, and main page |
| Mark Angel D. Tugade | Database Administrator (DB Admin) | Supabase setup, database structure, migrations, seed data, permissions data, and audit functionality |
| Jhadenn Cypher | Tester | Test planning, test cases, permission testing, bug reporting, and fix verification |
| Jian Dominic Delos Reyes | UI/UX Designer | Design system, wireframes, mockups, handoff notes, and usability review |
| Eraño A. Lomibao | Scrum Master | Sprint planning, task tracking, team coordination, repository workflow, and project documentation |

Every member must understand their responsibilities and coordinate with other members when a task depends on another person's work.

## 3. Communication and Collaboration

- Team members must communicate progress, questions, and blockers promptly.
- Members should ask the responsible teammate for clarification when requirements are unclear.
- Technical decisions that affect multiple roles must be discussed with the relevant team members.
- Important decisions, meeting outcomes, and action items should be documented.
- Members must inform the team as early as possible if they expect a delay.
- Team members should help each other resolve problems that affect the sprint goal.

## 4. Sprint Schedule and Task Tracking

- The team follows the agreed Sprint 1 schedule: October 24 to November 2, 2026.
- The Sprint 1 board in `docs/board-sprint1.md` is the reference for assigned tasks, owners, due days, dependencies, and acceptance criteria.
- Each task must have an assigned owner and due day.
- A task can start when its dependencies have been merged and its acceptance criteria are understood by the assigned member.
- Team members must update their task status and report progress regularly.
- Blockers must be recorded with a responsible owner and a date.
- Changes to task assignments, dependencies, or due dates should be communicated to the team and reflected in the project board or spreadsheet.

## 5. GitHub Workflow

The team uses GitHub to manage source code, documentation, issues, and pull requests.

- The `main` branch is protected.
- Changes must be submitted through a pull request (PR).
- Each PR must receive at least one approval from another team member before merging.
- Force pushes to `main` are prohibited.
- Team members should create a separate branch for each task or related set of changes.
- PR titles must include the relevant Task ID, such as `S1-SM-03: Add team working documents`.
- PR descriptions should explain the changes and identify the relevant task.
- Team members must review changes carefully and address requested revisions before merging.
- No member may approve their own PR.
- Team members must have the necessary repository access to contribute through branches and PRs.
- Members should not make unrelated changes in the same PR unless necessary.

## 6. Pull Request Review Assignments

The team follows these agreed review arrangements:

- **Brean and Mark:** Review each other's PRs.
- **Jhadenn and Jian:** Their PRs are reviewed by Brean or Mark.
- **Eraño:** His PRs may be reviewed by any team member other than himself.

These arrangements ensure that another team member reviews changes before they are merged.

## 7. Development and Quality Standards

All work must follow the project's agreed requirements and applicable quality standards.

### Developers
- Implement features according to the acceptance criteria.
- Validate inputs and handle errors appropriately.
- Test changes before submitting a PR.
- Ensure authentication and authorization are enforced on the server where required.

### Database Administrator
- Apply database changes through migration files.
- Check tables, relationships, constraints, and permissions.
- Ensure database setup instructions are clear and reproducible.
- Verify seed data and audit-related database functionality when applicable.

### UI/UX Designer
- Follow the agreed design system.
- Keep interface elements consistent and understandable.
- Provide designs and handoff notes that developers can use.
- Document usability problems and recommended improvements.

### Tester
- Prepare and execute test cases based on the acceptance criteria.
- Record bugs with reproduction steps, expected results, and actual results.
- Retest fixes and record whether issues are verified or reopened.
- Check that menus, buttons, and server responses follow the user's assigned permissions.

### Scrum Master
- Monitor the sprint schedule and task progress.
- Help resolve blockers and coordinate dependencies.
- Keep project documentation and task tracking up to date.
- Coordinate sprint review and retrospective activities.

## 8. Definition of Done

A task is considered complete when it satisfies the applicable requirements in `docs/definition-of-done.md`.

At a minimum:

- The acceptance criteria have been satisfied.
- Relevant tests have been completed successfully.
- The changes have been submitted through a PR containing the Task ID.
- A teammate has reviewed and approved the PR.
- The PR has been merged into `main`.
- The project can be run locally from a fresh clone using the README instructions, where applicable.
- The spreadsheet row is marked **Merged** and contains the actual PR link.

Creating code or a design alone does not mean a task is complete.

## 9. Security and Data Protection

All team members must protect the project's credentials and data.

- Never commit passwords, API keys, real secrets, or `.env` files to the repository.
- Commit `.env.example` files only when they contain placeholders rather than real credentials.
- Never use the Supabase `service_role` key in `client/`.
- Keep server-only credentials in the server environment.
- Apply server-side authentication and permission checks to protected operations.
- Do not expose sensitive user information unnecessarily.
- Report suspected credential exposure or security problems to the team promptly.

## 10. Handling Blockers and Delays

When a member encounters a blocker:

1. Inform the team as soon as possible.
2. Explain the problem and its effect on the assigned task.
3. Identify any help or decision needed.
4. Coordinate with the teammate responsible for the dependency.
5. Record the blocker, owner, and date in the appropriate tracking document.
6. Update the task status when necessary.

The Scrum Master helps coordinate the response but does not replace the assigned owner's responsibility for communicating and resolving the issue.

## 11. Conflict Resolution

- Team members must discuss disagreements respectfully.
- Decisions should be based on project requirements, technical considerations, security, and agreed team practices.
- Members should listen to different viewpoints before deciding.
- If a disagreement cannot be resolved, the Scrum Master helps facilitate a discussion with the relevant members.
- Decisions affecting the project must be communicated to everyone who needs to know.

## 12. Accountability and Teamwork

Every member is expected to:

- Complete assigned tasks to the best of their ability.
- Follow the agreed schedule and report delays early.
- Ask questions when requirements are unclear.
- Keep task statuses and documentation accurate.
- Review relevant work when assigned.
- Coordinate with teammates when dependencies exist.
- Follow the team's GitHub workflow and security rules.
- Contribute to the overall Sprint 1 goal rather than focusing only on individual tasks.

## 13. Review and Updates

This agreement applies throughout the development of HOPE, Inc. ERP.

The team may update it when project requirements or working practices change. Proposed changes should be discussed with the team and submitted through the agreed GitHub workflow.

All team members are expected to read this document and follow the agreed rules.
