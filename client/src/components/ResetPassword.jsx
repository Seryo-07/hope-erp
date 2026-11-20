import React, { useState } from 'react';

export default function ResetPassword({ tokens, onNavigate }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (newPassword.length < 8) {
            return setError('Password must be at least 8 characters long.');
        }

        if (newPassword !== confirmPassword) {
            return setError('Passwords do not match.');
        }

        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    new_password: newPassword,
                    access_token: tokens?.access_token,
                    refresh_token: tokens?.refresh_token
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update password.');
            }

            setMessage('Password updated successfully! Redirecting to sign in...');

            // Re-direct sa Sign In page pagkatapos ng 2 segundo
            setTimeout(() => {
                onNavigate('login');
            }, 2000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#F8FAFC', padding: '40px 20px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '36px', maxWidth: '440px', width: '100%', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)', border: '1px solid #F1F5F9' }}>

                {/* Mail Icon */}
                <div style={{ width: '36px', height: '36px', background: '#EEF2FF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4338CA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </div>

                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                    Set a new password
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.88rem', marginBottom: '24px', lineHeight: '1.5' }}>
                    Choose a strong password that you haven't used before for your HOPE ERP account.
                </p>

                {error && (
                    <div style={{ color: '#DC2626', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                        {error}
                    </div>
                )}
                {message && (
                    <div style={{ color: '#059669', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', color: '#334155', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter a new password"
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.95rem' }}
                            required
                        />
                        <span style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px', display: 'block' }}>
                            Use at least 8 characters, including a letter and a number.
                        </span>
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#334155', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter your new password"
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.95rem' }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#2E2A72', color: '#FFFFFF', border: 'none', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', marginTop: '8px' }}
                    >
                        {loading ? 'Updating Password...' : 'Reset Password'}
                    </button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', color: '#94A3B8', marginTop: '20px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    You'll return to sign in after your password is reset.
                </div>
            </div>

            <div style={{ marginTop: '24px', fontSize: '0.9rem' }}>
                <button
                    onClick={() => onNavigate('login')}
                    style={{ background: 'none', border: 'none', color: '#4F46E5', fontWeight: 600, cursor: 'pointer' }}
                >
                    ← Back to sign in
                </button>
            </div>
        </main>
    );
}