-- ============================================================
-- S1-DBA-04: Password Reset Tokens
-- Stores hashed password reset tokens with expiration tracking.
-- Plaintext reset tokens must NEVER be stored in this table.
-- ============================================================

CREATE TABLE public.password_reset_token (
    password_reset_token_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES public.app_user(id) ON DELETE CASCADE,

    token_hash TEXT NOT NULL UNIQUE,

    expires_at TIMESTAMPTZ NOT NULL,

    used BOOLEAN NOT NULL DEFAULT FALSE,

    used_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT password_reset_token_hash_not_empty
        CHECK (length(trim(token_hash)) > 0),

    CONSTRAINT password_reset_token_used_at_check
        CHECK (
            (used = FALSE AND used_at IS NULL)
            OR
            (used = TRUE AND used_at IS NOT NULL)
        )
);

-- Index for finding reset tokens belonging to a user.
CREATE INDEX password_reset_token_user_id_idx
ON public.password_reset_token(user_id);

-- Index for checking token expiration and usage.
CREATE INDEX password_reset_token_expiry_idx
ON public.password_reset_token(expires_at)
WHERE used = FALSE;

-- Backend-only security: no client policies are created.
ALTER TABLE public.password_reset_token
ENABLE ROW LEVEL SECURITY;