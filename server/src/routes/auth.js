const express = require('express');
const router = express.Router();
 feature/S1-DEV-03-auth
const supabase = require('../config/supabaseClient'); // Express Supabase ClientWrapper

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            return res.status(401).json({ error: authError.message });
        }

        const userId = authData.user.id;

        const { data: appUser, error: userError } = await supabase
            .from('app_user')
            .select('*, role(name)')
            .eq('id', userId)
            .single();

        if (userError || !appUser) {
            return res.status(404).json({ error: 'App user profile not found.' });
        }

        if (appUser.is_blocked || appUser.status === 'blocked') {
            return res.status(403).json({ error: 'Access denied: Your account has been blocked.' });
        }

        if (appUser.status === 'pending') {
            return res.status(403).json({ error: 'Access denied: Your registration is pending admin approval.' });
        }

        return res.status(200).json({
            message: 'Login successful',
            session: authData.session,
            user: {
                id: appUser.id,
                email: appUser.email,
                full_name: appUser.full_name,
                role: appUser.role?.name || 'User',
                status: appUser.status,
                requires_password_change: appUser.status === 'first_login', // First-login flag
            },
        });
    } catch (err) {
        return res.status(500).json({ error: 'Server error during authentication.' });
    }
});

router.post('/set-password', async (req, res) => {
    const { userId, newPassword } = req.body;

    if (!userId || !newPassword) {
        return res.status(400).json({ error: 'User ID and new password are required.' });
    }

    try {

        const { error: updateAuthError } = await supabase.auth.admin.updateUserById(userId, {
            password: newPassword,
        });

        if (updateAuthError) {
            return res.status(400).json({ error: updateAuthError.message });
        }

        const { error: updateDbError } = await supabase
            .from('app_user')
            .update({ status: 'active', updated_at: new Date() })
            .eq('id', userId);

        if (updateDbError) {
            return res.status(500).json({ error: 'Failed to update user status.' });
        }

        return res.status(200).json({ message: 'Password updated successfully. Account activated.' });
    } catch (err) {
        return res.status(500).json({ error: 'Server error during password update.' });
    }
});


router.post('/logout', async (req, res) => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        return res.status(500).json({ error: 'Failed to terminate session.' });
    }
    return res.status(200).json({ message: 'Logged out successfully.' });
=======
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
main
});

module.exports = router;