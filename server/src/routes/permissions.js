const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');

// GET user permissions by User ID
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { data, error } = await supabase
            .from('user_permissions')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;
        return res.status(200).json({ permissions: data || [] });
    } catch (err) {
        return res.status(500).json({ error: err.message || 'Failed to fetch permissions' });
    }
});

// POST / UPDATE permissions and record audit_log
router.post('/assign', async (req, res) => {
    try {
        const { actorId, targetUserId, permissions } = req.body;
        // permissions is an array: [{ module, can_view, can_create, can_edit, can_delete }]

        if (!targetUserId || !Array.isArray(permissions)) {
            return res.status(400).json({ error: 'Invalid payload parameters' });
        }

        // 1. Upsert permissions per module
        const upsertData = permissions.map(p => ({
            user_id: targetUserId,
            module: p.module,
            can_view: !!p.can_view,
            can_create: !!p.can_create,
            can_edit: !!p.can_edit,
            can_delete: !!p.can_delete,
            updated_at: new Date()
        }));

        const { error: permError } = await supabase
            .from('user_permissions')
            .upsert(upsertData, { onConflict: 'user_id, module' });

        if (permError) throw permError;

        // 2. S1-DEV-07 REQUIREMENT: Log every rights change in audit_log
        const { error: auditError } = await supabase
            .from('audit_logs')
            .insert({
                actor_id: actorId || null,
                target_user_id: targetUserId,
                action: 'UPDATE_PERMISSIONS',
                details: { updated_permissions: permissions }
            });

        if (auditError) throw auditError;

        return res.status(200).json({ message: 'Permissions updated and logged to audit_log successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message || 'Failed to save permissions' });
    }
});

module.exports = router;