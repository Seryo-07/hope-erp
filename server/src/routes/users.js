const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient'); // Your Supabase client instance


router.patch('/approve/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('users')
            .update({ status: 'approved' })
            .eq('id', id)
            .select();

        if (error) throw error;
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ message: 'User account approved successfully', user: data[0] });
    } catch (err) {
        return res.status(500).json({ error: err.message || 'Failed to approve user' });
    }
});

// 2. DESIGNATE / UPDATE ROLE (e.g. Promote to 'admin' or Demote to 'user')
router.patch('/role/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body; // Expected: 'admin' or 'user'

        if (!['admin', 'user'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role assignment' });
        }

        const { data, error } = await supabase
            .from('users')
            .update({ role })
            .eq('id', id)
            .select();

        if (error) throw error;
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ message: `User role updated to ${role}`, user: data[0] });
    } catch (err) {
        return res.status(500).json({ error: err.message || 'Failed to update role' });
    }
});

// 3. TOGGLE BLOCK / UNBLOCK USER
router.patch('/toggle-block/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { is_blocked } = req.body;

        const { data, error } = await supabase
            .from('users')
            .update({ is_blocked })
            .eq('id', id)
            .select();

        if (error) throw error;
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({
            message: `User successfully ${is_blocked ? 'blocked' : 'unblocked'}`,
            user: data[0]
        });
    } catch (err) {
        return res.status(500).json({ error: err.message || 'Failed to toggle block status' });
    }
});

module.exports = router;