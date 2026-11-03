-- 1. Create User Permissions Table
CREATE TABLE IF NOT EXISTS public.user_permissions (
                                                       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    module VARCHAR(50) NOT NULL, -- 'Customer', 'Product', 'Human Resources', 'Sales', 'Reports'
    can_view BOOLEAN DEFAULT false,
    can_create BOOLEAN DEFAULT false,
    can_edit BOOLEAN DEFAULT false,
    can_delete BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, module)
    );

-- 2. Create Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
                                                 id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    actor_id UUID, -- Admin or Superadmin making the change
    target_user_id UUID NOT NULL,
    action VARCHAR(100) NOT NULL, -- e.g., 'UPDATE_PERMISSIONS'
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
    );