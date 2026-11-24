const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient'); // check your relative path to supabaseClient

// 1. APPROVE USER
router.patch('/approve/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('app_user')
            .update({ status: 'active' })
            .eq('id', id)
            .select();

        if (error) throw error;
        return res.status(200).json({ message: 'User approved successfully', user: data[0] });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// 2. UPDATE ROLE
router.patch('/role/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const { data, error } = await supabase
            .from('app_user')
            .update({ role })
            .eq('id', id)
            .select();

        if (error) throw error;
        return res.status(200).json({ message: `Role updated to ${role}`, user: data[0] });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;