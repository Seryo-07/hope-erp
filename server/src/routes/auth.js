const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.post('/register', async (req, res) => {
    let { email, password, full_name } = req.body;

    if (!email || !password || !full_name) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    email = email.trim().toLowerCase();

    try {

        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: email,
            password: password,
            email_confirm: true,
            user_metadata: { full_name: full_name },
        });

        if (authError) throw authError;

        const userId = authData.user?.id;
        if (!userId) throw new Error('User creation failed.');

        const { error: profileError } = await supabase
            .from('app_user')
            .insert([
                {
                    id: userId,
                    full_name: full_name,
                    email: email,
                    status: 'pending',
                },
            ]);

        if (profileError) {
            await supabase.auth.admin.deleteUser(userId);
            throw profileError;
        }

        return res.status(201).json({
            message: 'Registration successful! Status set to pending approval.',
        });
    } catch (err) {
        console.error('Registration Error:', err.message);
        return res.status(400).json({ error: err.message });
    }
});

module.exports = router;