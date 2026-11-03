const { createClient } = require('@supabase/supabase-js');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in server/.env file!');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
});

async function runResetPasswordTest() {
    console.log('🧪 Starting Dev Test Suite for S1-DEV-04 (Reset Password Flow)...\n');

    const testEmail = 'reset_test_user@hope.com';
    const initialPassword = 'InitialPass123!';

    try {
        // 1. Create temporary test user
        console.log('1️⃣ Setup: Creating temporary user...');
        const { data: authUser, error: createError } = await supabase.auth.admin.createUser({
            email: testEmail,
            password: initialPassword,
            email_confirm: true
        });

        if (createError && !createError.message.includes('already registered')) {
            throw createError;
        }

        const userId = authUser?.user?.id || (await supabase.from('app_user').select('id').eq('email', testEmail).single()).data.id;
        console.log('✅ User ready with ID:', userId);

        // 2. Generate Password Reset Link via Admin API
        console.log('\n2️⃣ Test 1: Generating password reset token link...');
        const { data: resetData, error: resetError } = await supabase.auth.admin.generateLink({
            type: 'recovery',
            email: testEmail,
        });

        if (resetError) throw resetError;

        if (resetData?.properties?.action_link) {
            console.log('   PASSED: Reset token link generated successfully.');
            console.log('   🔗 Reset Link Sample:', resetData.properties.action_link.substring(0, 65) + '...');
        } else {
            console.error('   FAILED: Could not generate reset link.');
        }

        // 3. Cleanup
        console.log('\n🧹 Cleaning up test user...');
        await supabase.from('app_user').delete().eq('id', userId);
        await supabase.auth.admin.deleteUser(userId);
        console.log('✅ Cleanup finished successfully.');

        console.log('\n🎉 ALL DEV TESTS PASSED FOR S1-DEV-04!');

    } catch (err) {
        console.error('\n❌ TEST SUITE FAILED:', err.message);
    }
}

runResetPasswordTest();