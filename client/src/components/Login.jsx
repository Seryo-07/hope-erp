import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [firstLoginUser, setFirstLoginUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pwdError, setPwdError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed.');
            }

            if (data.user.requires_password_change) {
                setFirstLoginUser(data.user);
                setLoading(false);
                return;
            }

            localStorage.setItem('hope_session', JSON.stringify(data.session));
            localStorage.setItem('hope_user', JSON.stringify(data.user));
            onLoginSuccess(data.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSetFirstPassword = async (e) => {
        e.preventDefault();
        setPwdError('');

        if (newPassword.length < 8) {
            setPwdError('Password must be at least 8 characters long.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPwdError('Passwords do not match.');
            return;
        }

        try {
            const res = await fetch('/api/auth/set-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: firstLoginUser.id, newPassword }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to set password.');

            alert('Password updated! Please log in with your new password.');
            setFirstLoginUser(null);
            setPassword('');
        } catch (err) {
            setPwdError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg shadow-sm p-8">

                {/* FIRST LOGIN MODAL OVERLAY */}
                {firstLoginUser ? (
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-1">Set Your Password</h2>
                        <p className="text-xs text-slate-500 mb-6">
                            This is your first login. Please choose a new secure password before proceeding.
                        </p>

                        {pwdError && (
                            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {pwdError}
                            </div>
                        )}

                        <form onSubmit={handleSetFirstPassword} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-slate-800"
                                    placeholder="At least 8 characters"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-slate-800"
                                    placeholder="Re-enter new password"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded transition"
                            >
                                Update Password & Login
                            </button>
                        </form>
                    </div>
                ) : (
                    /* STANDARD LOGIN FORM */
                    <div>
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">HOPE ERP</h1>
                            <p className="text-xs text-slate-500 mt-1">Sign in to your enterprise operational account</p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-slate-800"
                                        placeholder="user@hope.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-9 pr-10 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-slate-800"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded transition disabled:opacity-50"
                            >
                                {loading ? 'Authenticating...' : 'Sign In'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}