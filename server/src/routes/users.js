const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');

// Get all users
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('app_users')
            .select('*');

        if (error) return res.status(400).json({ error: error.message });
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Update user status/role
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const { data, error } = await supabase
            .from('app_users')
            .update(updates)
            .eq('id', id)
            .select();

        if (error) return res.status(400).json({ error: error.message });
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to update user' });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { error } = await supabase
            .from('app_users')
            .delete()
            .eq('id', id);

        if (error) return res.status(400).json({ error: error.message });
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;