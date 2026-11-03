const supabase = require('../config/supabaseClient');

/**
 * Middleware to enforce server-side permission checks by role & module rights.
 * @param {string} requiredModule - e.g., 'Customer', 'Product', 'Human Resources', 'Sales', 'Reports'
 * @param {string} requiredAction - 'can_view' | 'can_create' | 'can_edit' | 'can_delete'
 */
const checkPermission = (requiredModule, requiredAction = 'can_view') => {
    return async (req, res, next) => {
        try {
            const userId = req.headers['x-user-id'];
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized: User ID header missing' });
            }

            // 1. Fetch user status & role
            const { data: user, error: userError } = await supabase
                .from('users')
                .select('role, is_blocked, is_approved')
                .eq('id', userId)
                .single();

            if (userError || !user) {
                return res.status(401).json({ error: 'Unauthorized: Invalid user account' });
            }

            if (user.is_blocked || !user.is_approved) {
                return res.status(403).json({ error: 'Forbidden: Account is blocked or awaiting approval' });
            }

            // 2. Superadmin bypasses module-level restrictions
            if (user.role === 'superadmin') {
                req.user = user;
                return next();
            }

            // 3. Query module permissions for regular users / admins
            const { data: perm, error: permError } = await supabase
                .from('user_permissions')
                .select('*')
                .eq('user_id', userId)
                .eq('module', requiredModule)
                .single();

            if (permError || !perm || !perm[requiredAction]) {
                return res.status(403).json({
                    error: `Access Denied: Missing ${requiredAction} permission for module '${requiredModule}'`
                });
            }

            req.user = user;
            next();
        } catch (err) {
            return res.status(500).json({ error: err.message || 'Server permission check failed' });
        }
    };
};

module.exports = checkPermission;