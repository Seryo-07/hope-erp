# Repository Setup (S1-SM-01)

This document records how the HOPE ERP repository is set up and the rules the team follows.

## Repository
- Repo: https://github.com/Seryo-07/hope-erp
- Owner: Seryo-07 (Scrum Master)
- Visibility: Public
- Stack: React (client), Node.js (server), Supabase (database)

## Branch protection (ruleset `protect-main`)
Applies to the default branch `main`. Status: Active.

| Rule | Setting |
|---|---|
| Require a pull request before merging | On, 1 approval required |
| Dismiss stale approvals when new commits are pushed | On |
| Require conversation resolution before merging | On |
| Block force pushes | On |
| Restrict deletions | On |

Direct commits to `main` are blocked. Every change goes through a pull request.

## Templates
| File | Purpose |
|---|---|
| `.github/pull_request_template.md` | Checklist shown on every PR (Task ID, what changed, tests, no secrets) |
| `.github/ISSUE_TEMPLATE/bug_report.md` | Used by the Tester to report bugs |
| `.github/ISSUE_TEMPLATE/task.md` | Used to plan a piece of work |

**Note:** the three templates and the `.gitignore` check were committed directly to `main` before branch protection was turned on. All later work goes through pull requests.

## Secrets
- `.env` is listed in `.gitignore` (from the Node template).
- Never commit passwords, keys or `.env` files.
- The Supabase `service_role` key is used only in `server/`, never in `client/`.

## Collaborators
Team members are invited with Write access (Settings → Collaborators). Each person must accept the invitation before they can push.

| Name | Role | GitHub username |
|---|---|---|
| Erano A. Lomibao | Scrum Master |Seryo-07|
| Brean Shein I. Ibañez | Developer |brnshl|
| Mark Angel D. Tugade | DB Admin |markdtugade-cloud|
| Jhadenn Cypher | Tester |Cypher-27J|
| Jian Dominic Delos Reyes | UI/UX Designer |Jdominic-commits|

## Working rules
1. One task = one pull request.
2. Branch name starts with the Task ID, for example `S1-DEV-01-scaffold`.
3. PR title starts with the Task ID, for example `S1-DEV-01: Project scaffold`.
4. A teammate other than the author reviews and approves each PR.
5. After the merge, update the spreadsheet row: Status = Merged and paste the PR link.

## Suggested folder layout
```
hope-erp/
├── client/            React app
├── server/            Node.js API
├── supabase/migrations/   SQL migrations (DB Admin)
├── docs/              Team documents
└── .github/           Templates
```
