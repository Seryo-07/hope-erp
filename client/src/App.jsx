import React, { useState, useEffect } from 'react';
import UserManagement from './components/UserManagement';
import SuperadminDashboard from './components/SuperAdminDashboard';
import AdminDashboard from './components/AdminDashboard';
import SignInPage from './components/SignInPage';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';

export default function App() {
    // Navigation State: 'landing' | 'dashboard' | 'user-management' | 'register' | 'login' | 'forgot-password' | 'reset-password'
    const [currentView, setCurrentView] = useState('landing');
    const [currentUser, setCurrentUser] = useState({ full_name: 'Juan Dela Cruz', role: 'Superadmin' });
    const [resetTokens, setResetTokens] = useState({ access_token: '', refresh_token: '' });

    // -------------------------------------------------------------
    // AUTOMATIC RECOVERY LINK DETECTION (SUPABASE PASSWORD RESET)
    // -------------------------------------------------------------
    useEffect(() => {
        const handleUrlHash = () => {
            const hash = window.location.hash;
            if (hash && (hash.includes('type=recovery') || hash.includes('access_token='))) {
                const params = new URLSearchParams(hash.replace('#', '?'));
                const accessToken = params.get('access_token');
                const refreshToken = params.get('refresh_token');

                if (accessToken) {
                    setResetTokens({
                        access_token: accessToken,
                        refresh_token: refreshToken || ''
                    });
                    // Otomatikong ilipat sa Reset Password screen!
                    setCurrentView('reset-password');
                }
            }
        };

        handleUrlHash();
        window.addEventListener('hashchange', handleUrlHash);
        return () => window.removeEventListener('hashchange', handleUrlHash);
    }, []);

    // -------------------------------------------------------------
    // RENDER: DASHBOARD VIEW (SUPERADMIN / ADMIN ROUTING)
    // -------------------------------------------------------------
    if (currentView === 'dashboard') {
        if (currentUser?.role === 'Superadmin') {
            return <SuperadminDashboard onNavigate={setCurrentView} user={currentUser} />;
        }
        return <AdminDashboard onNavigate={setCurrentView} user={currentUser} />;
    }

    // -------------------------------------------------------------
    // RENDER: USER MANAGEMENT VIEW
    // -------------------------------------------------------------
    if (currentView === 'user-management') {
        return (
            <div>
                <div style={{ position: 'fixed', top: '15px', right: '20px', zIndex: 9999 }}>
                    <button
                        className="btn btn-ghost"
                        onClick={() => setCurrentView('dashboard')}
                        style={{ background: '#0F172A', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', padding: '8px 16px', borderRadius: '6px' }}
                    >
                        ← Back to Dashboard
                    </button>
                </div>
                <UserManagement onNavigate={setCurrentView} />
            </div>
        );
    }

    // -------------------------------------------------------------
    // RENDER: SIGN IN VIEW
    // -------------------------------------------------------------
    if (currentView === 'login') {
        return (
            <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column', color: '#0F172A', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <header style={{ height: '70px', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', padding: '0 40px', display: 'flex', alignItems: 'center' }}>
                    <div onClick={() => setCurrentView('landing')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <div style={{ width: '30px', height: '30px', background: '#312E81', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                <polyline points="2 17 12 22 22 17"></polyline>
                                <polyline points="2 12 17 22 12"></polyline>
                            </svg>
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1E1B4B' }}>HOPE, Inc. ERP</span>
                    </div>
                </header>

                <SignInPage onNavigate={setCurrentView} setCurrentUser={setCurrentUser} />

                <footer style={{ padding: '24px 40px', borderTop: '1px solid #F1F5F9', background: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#94A3B8' }}>
                    <div>© 2026 HOPE ERP. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '32px' }}>
                        <span style={{ cursor: 'pointer' }}>Privacy policy</span>
                        <span style={{ cursor: 'pointer' }}>Contact support</span>
                    </div>
                </footer>
            </div>
        );
    }

    // -------------------------------------------------------------
    // RENDER: FORGOT PASSWORD VIEW
    // -------------------------------------------------------------
    if (currentView === 'forgot-password') {
        return (
            <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column', color: '#0F172A', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <header style={{ height: '70px', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', padding: '0 40px', display: 'flex', alignItems: 'center' }}>
                    <div onClick={() => setCurrentView('landing')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <div style={{ width: '30px', height: '30px', background: '#312E81', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                <polyline points="2 17 12 22 22 17"></polyline>
                                <polyline points="2 12 17 22 12"></polyline>
                            </svg>
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1E1B4B' }}>HOPE, Inc. ERP</span>
                    </div>
                </header>

                <ForgotPassword onNavigate={setCurrentView} />

                <footer style={{ padding: '24px 40px', borderTop: '1px solid #F1F5F9', background: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#94A3B8' }}>
                    <div>© 2026 HOPE ERP. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '32px' }}>
                        <span style={{ cursor: 'pointer' }}>Privacy policy</span>
                        <span style={{ cursor: 'pointer' }}>Contact support</span>
                    </div>
                </footer>
            </div>
        );
    }

    // -------------------------------------------------------------
    // RENDER: RESET PASSWORD VIEW
    // -------------------------------------------------------------
    if (currentView === 'reset-password') {
        return (
            <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column', color: '#0F172A', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <header style={{ height: '70px', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', padding: '0 40px', display: 'flex', alignItems: 'center' }}>
                    <div onClick={() => setCurrentView('landing')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <div style={{ width: '30px', height: '30px', background: '#312E81', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                <polyline points="2 17 12 22 22 17"></polyline>
                                <polyline points="2 12 17 22 12"></polyline>
                            </svg>
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1E1B4B' }}>HOPE, Inc. ERP</span>
                    </div>
                </header>

                <ResetPassword onNavigate={setCurrentView} tokens={resetTokens} />

                <footer style={{ padding: '24px 40px', borderTop: '1px solid #F1F5F9', background: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#94A3B8' }}>
                    <div>© 2026 HOPE ERP. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '32px' }}>
                        <span style={{ cursor: 'pointer' }}>Privacy policy</span>
                        <span style={{ cursor: 'pointer' }}>Contact support</span>
                    </div>
                </footer>
            </div>
        );
    }

    // -------------------------------------------------------------
    // RENDER: REGISTRATION VIEW
    // -------------------------------------------------------------
    if (currentView === 'register') {
        return (
            <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column', color: '#0F172A', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <header style={{ height: '70px', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', padding: '0 40px', display: 'flex', alignItems: 'center' }}>
                    <div onClick={() => setCurrentView('landing')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <div style={{ width: '30px', height: '30px', background: '#312E81', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                <polyline points="2 17 12 22 22 17"></polyline>
                                <polyline points="2 12 17 22 12"></polyline>
                            </svg>
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1E1B4B' }}>HOPE, Inc. ERP</span>
                    </div>
                </header>

                <Register onNavigate={setCurrentView} />

                <footer style={{ padding: '24px 40px', borderTop: '1px solid #F1F5F9', background: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#94A3B8' }}>
                    <div>© 2026 HOPE ERP. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '32px' }}>
                        <span style={{ cursor: 'pointer' }}>Privacy policy</span>
                        <span style={{ cursor: 'pointer' }}>Contact support</span>
                    </div>
                </footer>
            </div>
        );
    }

    // -------------------------------------------------------------
    // RENDER: LANDING PAGE
    // -------------------------------------------------------------
    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column', color: '#0F172A', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <header style={{ height: '70px', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', padding: '0 40px', display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', background: '#312E81', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                            <polyline points="2 17 12 22 22 17"></polyline>
                            <polyline points="2 12 17 22 12"></polyline>
                        </svg>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.3px', color: '#1E1B4B' }}>
            HOPE, Inc. ERP
          </span>
                </div>
            </header>

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.2rem', fontWeight: 800, color: '#09090B', letterSpacing: '-1.2px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    An ERP System Built to
                    <span style={{ background: '#E0E7FF', color: '#3730A3', padding: '4px 24px', borderRadius: '40px', fontWeight: 700 }}>
            Perform.
          </span>
                </h1>

                <p style={{ maxWidth: '640px', color: '#64748B', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '40px', fontWeight: 400 }}>
                    HOPE, Inc. ERP unifies Sales, Product Catalog, Customer Relationship Management, and HR onto one cohesive platform. Make data-driven decisions and streamline operations across the board.
                </p>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <button
                        onClick={() => setCurrentView('register')}
                        style={{ padding: '14px 36px', borderRadius: '30px', background: '#C7D2FE', color: '#312E81', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
                    >
                        Register Now
                    </button>
                    <button
                        onClick={() => setCurrentView('login')}
                        style={{ padding: '14px 44px', borderRadius: '30px', background: '#2E2A72', color: '#FFFFFF', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
                    >
                        Sign in
                    </button>
                </div>
            </main>

            <footer style={{ padding: '24px 40px', borderTop: '1px solid #F1F5F9', background: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#94A3B8' }}>
                <div>© 2026 HOPE ERP. All rights reserved.</div>
                <div style={{ display: 'flex', gap: '32px' }}>
                    <span style={{ cursor: 'pointer' }}>Privacy policy</span>
                    <span style={{ cursor: 'pointer' }}>Contact support</span>
                </div>
            </footer>
        </div>
    );
}