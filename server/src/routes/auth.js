const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');

// ==========================================
// 1. AUTHENTICATION ROUTES
// ==========================================

// Login Route (With Demo Accounts Bypass)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Demo Accounts Bypass Logic
    const demoAccounts = [
        'superadmin@hope.com',
        'ceo@hope.com',
        'admin@hope.com',
        'manager@hope.com'
    ];

    if (email && demoAccounts.includes(email.toLowerCase().trim())) {
        const isSuperadmin = email.toLowerCase().includes('superadmin') || email.toLowerCase().includes('ceo');
        const role = isSuperadmin ? 'Superadmin' : 'Admin';

        return res.status(200).json({
            message: 'Demo login successful',
            session: {
                access_token: 'demo-fake-jwt-token',
                user: {
                    id: 'demo-user-id',
                    email: email,
                    role: role,
                    full_name: isSuperadmin ? 'Demo Superadmin' : 'Demo Admin'
                }
            },
            user: {
                email: email,
                role: role,
                full_name: isSuperadmin ? 'Demo Superadmin' : 'Demo Admin'
            }
        });
    }

    // Real Supabase Auth Logic
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) return res.status(400).json({ error: error.message });

        return res.status(200).json({ message: 'Login successful', session: data.session, user: data.user });
    } catch (err) {
        return res.status(500).json({ error: 'Server error during login' });
    }
});

// Register Route
router.post('/register', async (req, res) => {
    const { full_name, email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name },
                emailRedirectTo: 'http://localhost:5173',
            },
        });

        if (error) return res.status(400).json({ error: error.message });

        return res.status(200).json({
            message: 'Registration successful! Please check your email to confirm your account.',
            user: data.user
        });
    } catch (err) {
        return res.status(500).json({ error: 'Server error during registration' });
    }
});

// Request Password Reset Link
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:5173/reset-password',
        });

        if (error) return res.status(400).json({ error: error.message });

        return res.status(200).json({
            message: 'Password reset link sent to your email.'
        });
    } catch (err) {
        return res.status(500).json({ error: 'Server error requesting password reset' });
    }
});

// Update Password with New Password
router.post('/reset-password', async (req, res) => {
    const { new_password, access_token, refresh_token } = req.body;

    try {
        if (access_token) {
            await supabase.auth.setSession({
                access_token,
                refresh_token: refresh_token || '',
            });
        }

        const { data, error } = await supabase.auth.updateUser({
            password: new_password
        });

        if (error) return res.status(400).json({ error: error.message });

        return res.status(200).json({
            message: 'Password has been reset successfully! You can now log in.',
            user: data.user
        });
    } catch (err) {
        return res.status(500).json({ error: 'Server error updating password' });
    }
});

// ==========================================
// 2. USER MANAGEMENT ROUTES (FOR SUPERADMIN UI)
// ==========================================

// Get All Users (Para sa Superadmin User Management Table)
router.get('/users', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('app_users')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) return res.status(400).json({ error: error.message });
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: 'Server error fetching users' });
    }
});

// Approve User ('Pending' -> 'Active')
router.patch('/users/:id/approve', async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('app_users')
            .update({ status: 'Active' })
            .eq('id', id)
            .select();

        if (error) return res.status(400).json({ error: error.message });
        return res.status(200).json({ message: 'User approved successfully', user: data[0] });
    } catch (err) {
        return res.status(500).json({ error: 'Server error approving user' });
    }
});

// Block User ('Active' -> 'Blocked')
router.patch('/users/:id/block', async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('app_users')
            .update({ status: 'Blocked' })
            .eq('id', id)
            .select();

        if (error) return res.status(400).json({ error: error.message });
        return res.status(200).json({ message: 'User blocked successfully', user: data[0] });
    } catch (err) {
        return res.status(500).json({ error: 'Server error blocking user' });
    }
});

// Update Full User Details (First Name, Last Name, Email, Role, Status)
router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, role, status, email } = req.body;

    try {
        const full_name = `${first_name || ''} ${last_name || ''}`.trim();

        const { data, error } = await supabase
            .from('app_users')
            .update({
                full_name: full_name,
                role: role,
                status: status,
                email: email
            })
            .eq('id', id)
            .select();

        if (error) return res.status(400).json({ error: error.message });

        return res.status(200).json({
            message: 'User details updated successfully',
            user: data[0]
        });
    } catch (err) {
        return res.status(500).json({ error: 'Server error updating user details' });
    }
});

module.exports = router;