# HOPE ERP

Hope, Inc. ERP — React, Node.js, and Supabase.

## Prerequisites

- Git
- Node.js and npm.cmd
- Access to the team's shared Supabase project
- Supabase database credentials provided securely by the project administrator

Docker is not required for the remote database workflow.

## Installation

1. Clone the repository.
2. Open the repository root directory in your terminal.
3. Install root dependencies:

   ```powershell
   npm.cmd install
   ```

4. Install server dependencies:

   ```powershell
   cd server
   npm.cmd install
   cd ..
   ```

5. Authenticate with Supabase:

   ```powershell
   npx.cmd supabase login
   ```

## Database setup

Ask the project administrator for the shared Supabase project reference. Link your local repository using that reference:

```powershell
npx.cmd supabase link --project-ref YOUR_PROJECT_REF
```

Replace `YOUR_PROJECT_REF` with the actual project reference. Do not commit credentials, access tokens, or passwords.

## Database migrations

Migration files are stored in `supabase/migrations/`.

Create a migration:

```powershell
npm.cmd run db:new -- descriptive_migration_name
```

Review the generated SQL before committing it.

Check migration history:

```powershell
npm.cmd run db:status
```

Apply pending migrations to the linked remote database:

```powershell
npm.cmd run db:push
```

Review pending changes and confirm the target project before applying migrations to a shared database.

Supabase tracks applied migrations. Keep migration filenames unique and ordered. Do not edit migrations that have already been applied to the shared database; create a new migration for subsequent changes.

## Environment variables and security

- Never commit `.env` files, database passwords, access tokens, or secret keys.
- Use `server/.env.example` as a reference if it exists.
- Keep the Supabase service-role key on the server only.
- Share credentials through an approved secure channel.

## Team workflow

- Create a branch named after the assigned task ID.
- Keep each pull request focused on one task.
- Include relevant migration and documentation changes.
- Request review from another team member before merging.
