import React from 'react';

export default function SuperadminDashboard({ onNavigate, user }) {
    // 1. Correct fallback name to 'Juan Dela Cruz'
    const userName = user?.full_name || 'Juan Dela Cruz';

    // 2. Fixed Initials Extractor (Juan Dela Cruz -> JD)
    const getInitials = (name) => {
        const parts = name.trim().split(' ').filter(Boolean);
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    const userInitials = getInitials(userName);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#F8FAFC' }}>

            {/* ----------------- SIDEBAR ----------------- */}
            <aside style={{ width: '260px', background: '#0F172A', color: '#94A3B8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    {/* Logo Header */}
                    <div style={{ padding: '24px 20px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '30px', height: '30px', background: '#312E81', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                    <polyline points="2 17 12 22 22 17"></polyline>
                                    <polyline points="2 12 17 22 12"></polyline>
                                </svg>
                            </div>
                            <span style={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF', letterSpacing: '-0.3px' }}>HOPE, Inc. ERP</span>
                        </div>
                        <button style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                        </button>
                    </div>

                    {/* Workspace Nav */}
                    <div style={{ padding: '20px 12px 10px 12px' }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#475569', letterSpacing: '0.5px', marginBottom: '12px', paddingLeft: '12px' }}>
                            WORKSPACE
                        </div>

                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#1E293B', color: '#FFFFFF', border: 'none', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                                Dashboard
                            </button>

                            <button style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'transparent', color: '#94A3B8', border: 'none', fontWeight: 500, fontSize: '0.88rem', cursor: 'pointer' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                Customers
                            </button>

                            <button style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'transparent', color: '#94A3B8', border: 'none', fontWeight: 500, fontSize: '0.88rem', cursor: 'pointer' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                                Products
                            </button>

                            <button style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'transparent', color: '#94A3B8', border: 'none', fontWeight: 500, fontSize: '0.88rem', cursor: 'pointer' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                                Human Resources
                            </button>

                            <button style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'transparent', color: '#94A3B8', border: 'none', fontWeight: 500, fontSize: '0.88rem', cursor: 'pointer' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                                Sales
                            </button>

                            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'transparent', color: '#94A3B8', border: 'none', fontWeight: 500, fontSize: '0.88rem', cursor: 'pointer' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '0.88rem' }}>Reports</span>
                                </div>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            </button>
                        </nav>
                    </div>

                    {/* Administration Nav */}
                    <div style={{ padding: '10px 12px 20px 12px' }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#475569', letterSpacing: '0.5px', marginBottom: '12px', paddingLeft: '12px' }}>
                            ADMINISTRATION
                        </div>
                        <button
                            onClick={() => onNavigate('user-management')}
                            style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'transparent', color: '#94A3B8', border: 'none', fontWeight: 500, fontSize: '0.88rem', cursor: 'pointer' }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            User Management
                        </button>
                    </div>
                </div>

                {/* User Footer: Matched Yellow Avatar Design */}
                <div style={{ padding: '16px', borderTop: '1px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '38px', height: '38px', background: '#FACC15', color: '#0F172A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                            {userInitials}
                        </div>
                        <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>{userName}</div>
                            <span style={{ fontSize: '0.65rem', fontWeight: 800, background: '#FEF08A', color: '#854D0E', padding: '2px 6px', borderRadius: '4px', display: 'inline-block' }}>
                                SUPERADMIN
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => onNavigate('landing')}
                        style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* ----------------- MAIN CONTENT AREA ----------------- */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

                {/* Top Header */}
                <header style={{ height: '64px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Dashboard</h2>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#FEF08A', color: '#854D0E', padding: '4px 8px', borderRadius: '4px' }}>
                        SUPERADMIN
                    </span>
                </header>

                {/* Body Content */}
                <div style={{ padding: '32px', flex: 1 }}>

                    {/* Welcome Text */}
                    <div style={{ marginBottom: '28px' }}>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                            Welcome back, {userName}!
                        </h1>
                        <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '6px', margin: 0 }}>
                            You have full system access. You can manage all modules and assign roles to any user.
                        </p>
                    </div>

                    {/* Stat Cards Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                        {/* Card 1 */}
                        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                            <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '12px' }}>Total Customers</div>
                            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1, marginBottom: '12px' }}>0</div>
                            <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600 }}>+24 this month</div>
                        </div>

                        {/* Card 2 */}
                        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                            <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '12px' }}>Products</div>
                            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1, marginBottom: '12px' }}>0</div>
                            <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '0.9rem' }}>📈</span> 5 new this month
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                            <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '12px' }}>Open Orders</div>
                            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1, marginBottom: '12px' }}>0</div>
                            <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '0.9rem' }}>📈</span> 0% vs last week
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                            <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '12px' }}>Revenue (MTD)</div>
                            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1, marginBottom: '12px' }}>$00.00</div>
                            <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '0.9rem' }}>📈</span> 0% vs last week
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Container */}
                    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0, marginBottom: '4px' }}>Quick Actions</h3>
                        <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: 0, marginBottom: '20px' }}>Your most-used workspace tasks, one click away.</p>

                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
                                👤 View Customers
                            </button>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
                                📦 Manage Product
                            </button>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
                                📋 Human Resources
                            </button>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
                                💼 Sales Pipeline
                            </button>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
                                📊 Report
                            </button>
                            <button
                                onClick={() => onNavigate('user-management')}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}
                            >
                                🔒 Manage Users
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}