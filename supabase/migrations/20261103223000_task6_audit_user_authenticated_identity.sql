-- S1-DBA-06: Record the authenticated application user in audit_log

CREATE OR REPLACE FUNCTION public.audit_user()
RETURNS TEXT
LANGUAGE sql
STABLE
AS $$
    SELECT COALESCE(
        (
            SELECT NULLIF(BTRIM(au.full_name), '')
            FROM public.app_user AS au
            WHERE au.id = auth.uid()
        ),
        (
            SELECT NULLIF(BTRIM(au.email), '')
            FROM public.app_user AS au
            WHERE au.id = auth.uid()
        ),
        NULLIF(current_setting('app.username', true), ''),
        session_user::text
    );
$$;
