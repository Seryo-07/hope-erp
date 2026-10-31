router.post('/register', async (req, res) => {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) {
            return res.status(400).json({ error: authError.message });
        }


        if (!authData.user) {
            return res.status(400).json({ error: 'Failed to create authentication user.' });
        }

        const { data: profileData, error: profileError } = await supabase
            .from('app_user')
            .insert([
                {
                    id: authData.user.id,
                    full_name,
                    email,
                    status: 'pending',
                },
            ]);

        if (profileError) {
            return res.status(400).json({ error: profileError.message });
        }

        return res.status(201).json({
            message: 'Registration successful!',
            user: authData.user,
        });
    } catch (err) {
        return res.status(500).json({ error: 'Server error during registration.' });
    }
});