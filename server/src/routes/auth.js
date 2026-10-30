const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { full_name, email, password } = req.body;

        if (!full_name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields in backend.' });
        }

        const { data, error } = await supabase
            .from('app_user')
            .insert([
                {
                    full_name,
                    email,
                    password,
                    status: 'pending',
                },
            ])
            .select();

        if (error) {
            console.error('Supabase DB Error:', error);
            return res.status(400).json({ message: error.message });
        }

        return res.status(201).json({ message: 'User registered successfully!', data });
    } catch (err) {
        console.error('Server Catch Error:', err);
        return res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
});

module.exports = router;