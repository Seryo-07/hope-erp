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
const supabase = require('../config/supabaseClient');

router.get('/', async (req, res) => {
    try {
        const { data: users, error } = await supabase
            .from('app_user')
            .select('*, role(name)')
            .neq('role.name', 'Superadmin')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const filteredUsers = (users || []).filter(u => u.role?.name !== 'Superadmin');

        return res.status(200).json(filteredUsers);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch users: ' + err.message });
    }
});

router.post('/', async (req, res) => {
    const { email, password, full_name, role_id } = req.body;

    if (!email || !password || !full_name) {
        return res.status(400).json({ error: 'Email, password, and full name are required.' });
    }

    try {

        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: email.trim().toLowerCase(),
            password: password,
            email_confirm: true,
            user_metadata: { full_name }
        });

        if (authError) throw authError;

        const userId = authData.user?.id;


        const { data: newUser, error: profileError } = await supabase
            .from('app_user')
            .insert([{
                id: userId,
                email: email.trim().toLowerCase(),
                full_name,
                role_id: role_id || null,
                status: 'first_login',
                is_blocked: false
            }])
            .select()
            .single();

        if (profileError) {
            await supabase.auth.admin.deleteUser(userId);
            throw profileError;
        }

        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { full_name, role_id, status } = req.body;

    try {
        const { data: updatedUser, error } = await supabase
            .from('app_user')
            .update({
                full_name,
                role_id,
                status,
                updated_at: new Date()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.patch('/:id/toggle-block', async (req, res) => {
    const { id } = req.params;
    const { is_blocked } = req.body;

    try {
        const newStatus = is_blocked ? 'blocked' : 'active';

        const { data: updatedUser, error } = await supabase
            .from('app_user')
            .update({
                is_blocked,
                status: newStatus,
                updated_at: new Date()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return res.status(200).json({
            message: `User ${is_blocked ? 'blocked' : 'unblocked'} successfully`,
            user: updatedUser
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;