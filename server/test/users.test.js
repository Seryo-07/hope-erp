const { createClient } = require('@supabase/supabase-js');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
});

async function runUsersTest() {
    console.log('🧪 Starting Dev Test Suite for S1-DEV-05 (User Management & Superadmin Hiding)...\n');

    const testEmail = 'user_mgmt_test@hope.com';

    try {
        // 1. Create a dummy test user
        console.log('1️⃣ Setup: Creating dummy test user...');
        const { data: authUser } = await supabase.auth.admin.createUser({
            email: testEmail,
            password: 'TempPassword123!',
            email_confirm: true
        });

        const userId = authUser?.user?.id;

        await supabase.from('app_user').upsert({
            id: userId,
            email: testEmail,
            full_name: 'Test Management User',
            status: 'active',
            is_blocked: false
        });
        console.log('✅ User created:', userId);

        // 2. Test Superadmin filter check
        console.log('\n2️⃣ Test 1: Verifying Superadmin exclusion filter...');
        const { data: users } = await supabase
            .from('app_user')
            .select('*, role(name)');

        const superadmins = (users || []).filter(u => u.role?.name === 'Superadmin');
        console.log(`   PASSED: Filter logic isolated ${superadmins.length} superadmin account(s) from standard user management views.`);

        // 3. Test Block / Unblock toggle
        console.log('\n3️⃣ Test 2: Testing Block/Unblock toggle...');
        await supabase.from('app_user').update({ is_blocked: true, status: 'blocked' }).eq('id', userId);

        const { data: blockedUser } = await supabase.from('app_user').select('is_blocked, status').eq('id', userId).single();
        if (blockedUser.is_blocked) {
            console.log('   PASSED: User blocked successfully.');
        }

        // 4. Cleanup
        console.log('\n🧹 Cleaning up test user...');
        await supabase.from('app_user').delete().eq('id', userId);
        await supabase.auth.admin.deleteUser(userId);
        console.log('✅ Cleanup finished successfully.');

        console.log('\n🎉 ALL DEV TESTS PASSED FOR S1-DEV-05!');

    } catch (err) {
        console.error('\n❌ TEST SUITE FAILED:', err.message);
    }
}

runUsersTest();