-- ============================================================
-- HOPE ERP
-- S1-DBA-03: User Roles and Permissions
-- ============================================================

-- 1. ROLE TABLE
CREATE TABLE role (
    role_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name VARCHAR(50) NOT NULL,
    description TEXT,
    is_system_role BOOLEAN NOT NULL DEFAULT FALSE,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    stamp VARCHAR(60)
);

-- 2. APP USER TABLE
-- id references the Supabase Auth user.
-- No password is stored here.

-- Update existing empty app_user table
ALTER TABLE public.app_user
    DROP COLUMN password;

ALTER TABLE public.app_user
    RENAME COLUMN fullname TO full_name;

ALTER TABLE public.app_user
    ALTER COLUMN full_name TYPE VARCHAR(150),
    ALTER COLUMN email TYPE VARCHAR(255),
    ALTER COLUMN status TYPE VARCHAR(20),
    ALTER COLUMN status SET DEFAULT 'pending';

ALTER TABLE public.app_user
    ADD COLUMN role_id UUID,
    ADD COLUMN is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN stamp VARCHAR(60);

ALTER TABLE public.app_user
    ADD CONSTRAINT app_user_auth_user_fkey
        FOREIGN KEY (id) REFERENCES auth.users(id),
    ADD CONSTRAINT app_user_role_id_fkey
        FOREIGN KEY (role_id) REFERENCES public.role(role_id),
    ADD CONSTRAINT app_user_status_check
        CHECK (status IN ('pending', 'active'));

-- 3. MODULE TABLE
CREATE TABLE module (
    module_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    stamp VARCHAR(60)
);

-- 4. RIGHTS CATALOGUE TABLE
CREATE TABLE right_catalog (
    right_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES module(module_id),
    right_key VARCHAR(100) NOT NULL,
    right_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    stamp VARCHAR(60)
);

-- 5. ROLE PERMISSION TABLE
-- Defines the default permissions of each role.
CREATE TABLE role_permission (
    role_permission_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID NOT NULL REFERENCES role(role_id),
    right_id UUID NOT NULL REFERENCES right_catalog(right_id),
    is_allowed BOOLEAN NOT NULL DEFAULT TRUE,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    stamp VARCHAR(60)
);

-- 6. USER PERMISSION TABLE
-- Allows individual permission overrides.
-- is_allowed = TRUE grants the permission.
-- is_allowed = FALSE denies the permission.
CREATE TABLE user_permission (
    user_permission_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES app_user(id),
    right_id UUID NOT NULL REFERENCES right_catalog(right_id),
    is_allowed BOOLEAN NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    stamp VARCHAR(60)
);

-- 7. UNIQUE ACTIVE RECORDS
CREATE UNIQUE INDEX role_name_active_unique
ON role (LOWER(role_name))
WHERE is_deleted = FALSE;

CREATE UNIQUE INDEX app_user_email_active_unique
ON app_user (LOWER(email))
WHERE is_deleted = FALSE;

CREATE UNIQUE INDEX module_name_active_unique
ON module (LOWER(module_name))
WHERE is_deleted = FALSE;

CREATE UNIQUE INDEX right_key_active_unique
ON right_catalog (LOWER(right_key))
WHERE is_deleted = FALSE;

CREATE UNIQUE INDEX role_permission_active_unique
ON role_permission (role_id, right_id)
WHERE is_deleted = FALSE;

CREATE UNIQUE INDEX user_permission_active_unique
ON user_permission (user_id, right_id)
WHERE is_deleted = FALSE;

-- 8. PREVENT SOFT DELETE WHEN ACTIVE CHILD RECORDS EXIST
CREATE OR REPLACE FUNCTION trg_check_user_permission_children()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    v_n INT := 0;
BEGIN
    IF NOT (NEW.is_deleted AND NOT OLD.is_deleted) THEN
        RETURN NEW;
    END IF;

    CASE TG_TABLE_NAME
        WHEN 'role' THEN
            SELECT
                (SELECT count(*) FROM app_user
                 WHERE role_id = OLD.role_id AND NOT is_deleted)
                +
                (SELECT count(*) FROM role_permission
                 WHERE role_id = OLD.role_id AND NOT is_deleted)
            INTO v_n;

        WHEN 'app_user' THEN
            SELECT count(*) INTO v_n
            FROM user_permission
            WHERE user_id = OLD.id AND NOT is_deleted;

        WHEN 'module' THEN
            SELECT count(*) INTO v_n
            FROM right_catalog
            WHERE module_id = OLD.module_id AND NOT is_deleted;

        WHEN 'right_catalog' THEN
            SELECT
                (SELECT count(*) FROM role_permission
                 WHERE right_id = OLD.right_id AND NOT is_deleted)
                +
                (SELECT count(*) FROM user_permission
                 WHERE right_id = OLD.right_id AND NOT is_deleted)
            INTO v_n;

        ELSE
            NULL;
    END CASE;

    IF v_n > 0 THEN
        RAISE EXCEPTION
            'Cannot delete % row: % active related record(s) still exist.',
            TG_TABLE_NAME, v_n;
    END IF;

    RETURN NEW;
END;
$$;
-- 9. ATTACH AUDIT AND SOFT-DELETE TRIGGERS
DO $$
DECLARE
    r RECORD;
    v_args TEXT;
BEGIN
    FOR r IN
        SELECT * FROM (VALUES
            ('role',            'role_id'),
            ('app_user',        'id'),
            ('module',          'module_id'),
            ('right_catalog',   'right_id'),
            ('role_permission', 'role_permission_id'),
            ('user_permission', 'user_permission_id')
        ) AS t(tbl, keycols)
    LOOP
        SELECT string_agg(quote_literal(k), ',')
        INTO v_args
        FROM unnest(string_to_array(r.keycols, ',')) AS k;

        -- Automatically update audit stamp
        EXECUTE format(
            'CREATE TRIGGER %I BEFORE INSERT OR UPDATE ON %I
             FOR EACH ROW EXECUTE FUNCTION trg_set_stamp()',
            r.tbl || '_biu_stamp', r.tbl
        );

        -- Check active child records before soft deletion
        IF r.tbl IN ('role', 'app_user', 'module', 'right_catalog') THEN
            EXECUTE format(
                'CREATE TRIGGER %I BEFORE UPDATE ON %I
                 FOR EACH ROW EXECUTE FUNCTION trg_check_user_permission_children()',
                r.tbl || '_bu_check', r.tbl
            );
        END IF;

        -- Block hard DELETE
        EXECUTE format(
            'CREATE TRIGGER %I BEFORE DELETE ON %I
             FOR EACH ROW EXECUTE FUNCTION trg_block_hard_delete()',
            r.tbl || '_bd_block', r.tbl
        );

        -- Block TRUNCATE
        EXECUTE format(
            'CREATE TRIGGER %I BEFORE TRUNCATE ON %I
             FOR EACH STATEMENT EXECUTE FUNCTION trg_block_hard_delete()',
            r.tbl || '_bt_block', r.tbl
        );

        -- Record INSERT and UPDATE in audit log
        EXECUTE format(
            'CREATE TRIGGER %I AFTER INSERT OR UPDATE ON %I
             FOR EACH ROW EXECUTE FUNCTION trg_audit_log(%s)',
            r.tbl || '_aiu_audit', r.tbl, v_args
        );

        -- Create active-record view with RLS respected
        EXECUTE format(
            'CREATE VIEW %I WITH (security_invoker = true)
             AS SELECT * FROM %I WHERE NOT is_deleted',
            r.tbl || '_active', r.tbl
        );
    END LOOP;
END;
$$;
-- 10. INSERT DEFAULT ROLES
INSERT INTO role (role_name, description, is_system_role)
SELECT v.role_name, v.description, TRUE
FROM (VALUES
    ('User',       'Default role for newly registered accounts.'),
    ('Superadmin', 'Highest-level system access.'),
    ('Admin',      'Manages users, roles, and system access.'),
    ('Sales',      'Handles sales-related operations.'),
    ('Product',    'Handles product-related operations.')
) AS v(role_name, description)
WHERE NOT EXISTS (
    SELECT 1
    FROM role r
    WHERE LOWER(r.role_name) = LOWER(v.role_name)
      AND r.is_deleted = FALSE
);

-- 11. AUTOMATICALLY ASSIGN DEFAULT USER ROLE
CREATE OR REPLACE FUNCTION set_default_app_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.role_id IS NULL THEN
        SELECT role_id
        INTO NEW.role_id
        FROM role
        WHERE LOWER(role_name) = 'user'
          AND is_deleted = FALSE
        LIMIT 1;

        IF NEW.role_id IS NULL THEN
            RAISE EXCEPTION 'Default User role was not found.';
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER app_user_set_default_role
BEFORE INSERT ON app_user
FOR EACH ROW
EXECUTE FUNCTION set_default_app_user_role();

-- 12. EFFECTIVE USER PERMISSIONS VIEW
-- Individual user permissions override role permissions.
CREATE VIEW user_effective_permissions
WITH (security_invoker = true) AS
SELECT
    au.id AS user_id,
    rc.right_id,
    rc.right_key,
    COALESCE(up.is_allowed, rp.is_allowed) AS is_allowed
FROM app_user au
JOIN right_catalog rc
    ON rc.is_deleted = FALSE
LEFT JOIN role_permission rp
    ON rp.role_id = au.role_id
    AND rp.right_id = rc.right_id
    AND rp.is_deleted = FALSE
LEFT JOIN user_permission up
    ON up.user_id = au.id
    AND up.right_id = rc.right_id
    AND up.is_deleted = FALSE
WHERE au.is_deleted = FALSE
  AND (
      rp.role_permission_id IS NOT NULL
      OR up.user_permission_id IS NOT NULL
  );

-- ============================================================
-- IMPORTANT:
-- Login must check app_user.status = 'active'
-- and app_user.is_blocked = FALSE.
-- Supabase Auth sign-in alone does not enforce these conditions.
-- ============================================================