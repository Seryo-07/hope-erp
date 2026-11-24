import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yrtmgwdxtagrelaeczsu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_PUBLIC_ANON_KEY_HERE';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase Environment Variables!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true
    }
});