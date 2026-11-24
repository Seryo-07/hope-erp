import React, { useState } from 'react';

export default function Register({ onNavigate }) {
    const [regData, setRegData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [regMessage, setRegMessage] = useState('');
    const [regError, setRegError] = useState('');
    const [regLoading, setRegLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegisterChange = (e) => {
        setRegData({ ...regData, [e.target.name]: e.target.value });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setRegError('');
        setRegMessage('');

        if (!regData.full_name || !regData.email || !regData.password) {
            return setRegError('All fields are required.');
        }
        if (regData.password !== regData.confirmPassword) {
            return setRegError('Passwords do not match.');
        }

        try {
            setRegLoading(true);
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: regData.full_name,
                    email: regData.email,
                    password: regData.password,
                }),
            });

            const text = await response.text();
            let data = {};
            try {
                data = text ? JSON.parse(text) : {};
            } catch (err) {
                throw new Error(`Server returned non-JSON response (${response.status})`);
            }

            if (!response.ok) {
                throw new Error(data.error || data.message || 'Registration failed');
            }

            setRegMessage('Account registered successfully! Redirecting to sign in...');
            setTimeout(() => {
                onNavigate('login');
            }, 1500);
        } catch (err) {
            setRegError(err.message || 'An error occurred during registration.');
        } finally {
            setRegLoading(false);
        }
    };

    return (
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '36px', maxWidth: '440px', width: '100%', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)', border: '1px solid #F1F5F9' }}>

                {/* User Add Header Icon (Clickable to go back to Landing Page) */}
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
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                </div>

                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px', letterSpacing: '-0.5px' }}>
                    Create your account
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.88rem', marginBottom: '20px' }}>
                    Register for access to your HOPE ERP workspace.
                </p>

                {/* Info Box */}
                <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '10px', padding: '14px', marginBottom: '24px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <span style={{ fontSize: '0.82rem', color: '#475569', lineHeight: '1.4' }}>
                        New registrations require Administrator approval before sign-in.
                    </span>
                </div>

                {regError && (
                    <p style={{ color: '#DC2626', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                        {regError}
                    </p>
                )}
                {regMessage && (
                    <p style={{ color: '#059669', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                        {regMessage}
                    </p>
                )}

                {/* Registration Form */}
                <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div>
                        <label style={{ display: 'block', color: '#334155', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="full_name"
                            value={regData.full_name}
                            onChange={handleRegisterChange}
                            placeholder="Enter your full name"
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.95rem', color: '#0F172A' }}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#334155', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={regData.email}
                            onChange={handleRegisterChange}
                            placeholder="your@email.com"
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.95rem', color: '#0F172A' }}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#334155', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={regData.password}
                                onChange={handleRegisterChange}
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
                        <span style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px', display: 'block' }}>
                            Use at least 8 characters, including a letter and a number.
                        </span>
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#334155', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={regData.confirmPassword}
                            onChange={handleRegisterChange}
                            placeholder="Re-enter password"
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.95rem', color: '#0F172A' }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={regLoading}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#2E2A72', color: '#FFFFFF', border: 'none', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', marginTop: '6px' }}
                    >
                        {regLoading ? 'Creating account...' : 'Create account'}
                    </button>
                </form>
            </div>

            <div style={{ marginTop: '24px', fontSize: '0.9rem', color: '#64748B' }}>
                Already have an account?{' '}
                <button
                    onClick={() => onNavigate('login')}
                    style={{ background: 'none', border: 'none', color: '#4F46E5', fontWeight: 600, cursor: 'pointer' }}
                >
                    Sign in
                </button>
            </div>
        </main>
    );
}