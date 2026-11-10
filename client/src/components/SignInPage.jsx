import React, { useState } from 'react';

export default function SignInPage({ onNavigate, setCurrentUser }) {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const fillDemoAccount = (email) => {
        setLoginEmail(email);
        setLoginPassword('password123');
        setLoginError('');
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');

        if (!loginEmail || !loginPassword) {
            return setLoginError('Please enter both email and password.');
        }

        const emailLower = loginEmail.toLowerCase().trim();
        const demoAccounts = ['superadmin@hope.com', 'ceo@hope.com', 'admin@hope.com', 'manager@hope.com'];

        // 1. DEMO LOGIN BYPASS LOGIC
        if (demoAccounts.includes(emailLower)) {
            const isSuperadmin = emailLower.includes('superadmin') || emailLower.includes('ceo');

            if (setCurrentUser) {
                setCurrentUser({
                    full_name: isSuperadmin ? 'Jose Marie' : 'Maria Clara',
                    role: isSuperadmin ? 'Superadmin' : 'Admin',
                    email: loginEmail
                });
            }

            onNavigate('dashboard');
            return;
        }

        // 2. BACKEND API LOGIN
        try {
            setLoginLoading(true);
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, password: loginPassword }),
            });

            const text = await response.text();
            let data = {};
            try {
                data = text ? JSON.parse(text) : {};
            } catch (err) {
                throw new Error('Server returned an invalid response format.');
            }

            if (!response.ok || !data.session) {
                throw new Error(data.error || data.message || 'Invalid email or password.');
            }

            // Set logged in user state based on API response
            if (setCurrentUser) {
                const userRole = data.user?.role || 'Admin';
                setCurrentUser({
                    full_name: data.user?.full_name || (userRole === 'Superadmin' ? 'Jose Marie' : 'Maria Clara'),
                    role: userRole,
                    email: data.user?.email || loginEmail
                });
            }

            onNavigate('dashboard');
        } catch (err) {
            setLoginError(err.message || 'Login failed.');
        } finally {
            setLoginLoading(false);
        }
    };

    return (
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '36px', maxWidth: '440px', width: '100%', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)', border: '1px solid #F1F5F9' }}>

                {/* Header Icon Badge (Click to return to Landing Page) */}
                <div
                    onClick={() => onNavigate('landing')}
                    title="Go back to Home"
                    style={{
                        width: '36px',
                        height: '36px',
                        background: '#EEF2FF',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4338CA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10 17 15 12 10 7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                </div>

                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F172A', marginBottom: '20px', letterSpacing: '-0.5px' }}>
                    Sign in to HOPE ERP
                </h2>

                {/* Demo Accounts Box */}
                <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '10px', padding: '16px', marginBottom: '24px' }}>
                    <div style={{ color: '#D97706', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>
                        Demo accounts (any password works):
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#D97706', lineHeight: '1.6' }}>
                        <div style={{ cursor: 'pointer' }} onClick={() => fillDemoAccount('superadmin@hope.com')}>
                            superadmin@hope.com/ceo@hope.com &rarr; <span style={{ fontWeight: 600 }}>Superadmin</span>
                        </div>
                        <div style={{ cursor: 'pointer' }} onClick={() => fillDemoAccount('admin@hope.com')}>
                            admin@hope.com/manager@hope.com &rarr; <span style={{ fontWeight: 600 }}>Admin</span>
                        </div>
                        <div style={{ marginTop: '4px', opacity: 0.9 }}>
                            Or register a new account (starts as User)
                        </div>
                    </div>
                </div>

                {loginError && (
                    <p style={{ color: '#DC2626', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                        {loginError}
                    </p>
                )}

                {/* Form */}
                <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', color: '#334155', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>Email</label>
                        <input
                            type="email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="your@email.com"
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.95rem', color: '#0F172A' }}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#334155', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                placeholder="Create a password"
                                style={{ width: '100%', padding: '12px 40px 12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.95rem', color: '#0F172A' }}
                                required
                            />
                            <svg
                                onClick={() => setShowPassword(!showPassword)}
                                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                            >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                        <label style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <span>Remember Me</span>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                style={{ borderRadius: '4px', border: '1px solid #CBD5E1', accentColor: '#312E81' }}
                            />
                        </label>
                        <span
                            onClick={() => onNavigate('forgot-password')}
                            style={{ color: '#4F46E5', fontWeight: 600, cursor: 'pointer' }}
                        >
                            Forgot Password?
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={loginLoading}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#2E2A72', color: '#FFFFFF', border: 'none', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', marginTop: '4px' }}
                    >
                        {loginLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <div style={{ margin: '24px 0', textAlign: 'center', position: 'relative' }}>
                    <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0' }} />
                    <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#FFFFFF', padding: '0 12px', color: '#64748B', fontSize: '0.82rem' }}>
                        or continue with
                    </span>
                </div>

                <button style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#334155', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    Sign in Google
                </button>
            </div>

            <div style={{ marginTop: '24px', fontSize: '0.9rem', color: '#64748B' }}>
                New to HOPE ERP?{' '}
                <button onClick={() => onNavigate('register')} style={{ background: 'none', border: 'none', color: '#4F46E5', fontWeight: 600, cursor: 'pointer' }}>
                    Create an account
                </button>
            </div>
        </main>
    );
}