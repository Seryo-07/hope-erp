import React, { useState } from 'react';

export default function ForgotPassword({ onNavigate }) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!email) {
            return setError('Please enter your email address.');
        }

        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const text = await response.text();
            let data = {};
            try {
                data = text ? JSON.parse(text) : {};
            } catch (err) {
                throw new Error('Server returned an invalid response format.');
            }

            if (!response.ok) {
                throw new Error(data.error || data.message || 'Failed to send reset link.');
            }

            setMessage(data.message || 'If an account exists for this email, password reset instructions have been sent.');
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '36px', maxWidth: '440px', width: '100%', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)', border: '1px solid #F1F5F9' }}>

                {/* Mail Header Icon (Clickable to go back to Landing Page) */}
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
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </div>

                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                    Forgot your password?
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.88rem', marginBottom: '24px', lineHeight: '1.5' }}>
                    Enter the email associated with your account. We'll send you a link to reset your password.
                </p>

                {error && (
                    <p style={{ color: '#DC2626', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                        {error}
                    </p>
                )}
                {message && (
                    <p style={{ color: '#059669', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                        {message}
                    </p>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', color: '#334155', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.95rem', color: '#0F172A' }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#2E2A72', color: '#FFFFFF', border: 'none', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}
                    >
                        {loading ? 'Sending link...' : 'Send reset Link'}
                    </button>
                </form>

                <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '20px', textAlign: 'center', lineHeight: '1.5' }}>
                    For your security, reset instructions are sent only if the email is associated with an existing account.
                </p>
            </div>

            <div style={{ marginTop: '24px', fontSize: '0.9rem' }}>
                <button
                    onClick={() => onNavigate('login')}
                    style={{ background: 'none', border: 'none', color: '#4F46E5', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                    ← Back to sign in
                </button>
            </div>
        </main>
    );
}