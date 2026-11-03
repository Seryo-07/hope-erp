
-- ============================================================
-- HOPE ERP
-- S1-DBA-03: Enable RLS - Backend Only Architecture
-- ============================================================

-- 1. ENABLE ROW LEVEL SECURITY ON ALL 17 TABLES

ALTER TABLE employee ENABLE ROW LEVEL SECURITY;
ALTER TABLE department ENABLE ROW LEVEL SECURITY;
ALTER TABLE job ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobhistory ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE salesdetail ENABLE ROW LEVEL SECURITY;
ALTER TABLE product ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricehist ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

ALTER TABLE role ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_user ENABLE ROW LEVEL SECURITY;
ALTER TABLE module ENABLE ROW LEVEL SECURITY;
ALTER TABLE right_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permission ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_permission ENABLE ROW LEVEL SECURITY;


-- 2. UPDATE EXISTING BUSINESS ACTIVE VIEWS
-- Make views respect the underlying tables' RLS policies.

ALTER VIEW employee_active SET (security_invoker = true);
ALTER VIEW department_active SET (security_invoker = true);
ALTER VIEW job_active SET (security_invoker = true);
ALTER VIEW jobhistory_active SET (security_invoker = true);
ALTER VIEW customer_active SET (security_invoker = true);
ALTER VIEW sales_active SET (security_invoker = true);
ALTER VIEW salesdetail_active SET (security_invoker = true);
ALTER VIEW product_active SET (security_invoker = true);
ALTER VIEW payment_active SET (security_invoker = true);
ALTER VIEW pricehist_active SET (security_invoker = true);


-- 3. UPDATE USER AND PERMISSION ACTIVE VIEWS

ALTER VIEW role_active SET (security_invoker = true);
ALTER VIEW app_user_active SET (security_invoker = true);
ALTER VIEW module_active SET (security_invoker = true);
ALTER VIEW right_catalog_active SET (security_invoker = true);
ALTER VIEW role_permission_active SET (security_invoker = true);
ALTER VIEW user_permission_active SET (security_invoker = true);


-- 4. SECURE EFFECTIVE USER PERMISSIONS VIEW

ALTER VIEW user_effective_permissions
SET (security_invoker = true);


-- ============================================================
-- BACKEND-ONLY SECURITY:
-- No policies are intentionally created.
-- Direct anon/authenticated table access is denied by default.
-- The trusted backend uses the Supabase service role key.
-- The service role key must NEVER be exposed to the frontend.
-- ============================================================
