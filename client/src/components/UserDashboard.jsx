import React from 'react';

export default function UserDashboard({ onNavigate, user }) {
    const userName = user?.full_name || 'Jade Jenner';
    const firstName = userName.trim().split(' ')[0];

    const getInitials = (name) => {
        const parts = name.trim().split(' ').filter(Boolean);
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    const userInitials = getInitials(userName);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%', fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#F8FAFC', boxSizing: 'border-box' }}>

            {/* ----------------- SIDEBAR (LOCKED 256px) ----------------- */}
            <aside style={{ width: '256px', minWidth: '256px', maxWidth: '256px', background: '#0F172A', color: '#94A3B8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexShrink: 0, boxSizing: 'border-box' }}>
                <div>
                    {/* Logo Header (LOCKED 64px height) */}
                    <div style={{ height: '64px', minHeight: '64px', padding: '0 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                            <div style={{ width: '28px', height: '28px', minWidth: '28px', flexShrink: 0, background: '#FFFFFF', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2.5">
                                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                    <polyline points="2 17 12 22 22 17"></polyline>
                                    <polyline points="2 12 17 22 12"></polyline>
                                </svg>
                            </div>
                            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF', whiteSpace: 'nowrap' }}>HOPE, Inc. ERP</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" style={{ cursor: 'pointer', flexShrink: 0 }}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                    </div>

                    {/* Workspace Nav (No ADMINISTRATION section for standard Users) */}
                    <nav style={{ padding: '20px 12px', fontSize: '0.85rem', boxSizing: 'border-box' }}>
                        <div style={{ padding: '0 12px 12px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.5px' }}>
                            WORKSPACE
                        </div>

                        {/* ACTIVE NAV BOX */}
                        <div style={{ padding: '10px 12px', background: '#1E293B', borderRadius: '8px', color: '#FFFFFF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2px' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                            <span>Dashboard</span>
                        </div>

                        <div
                            onClick={() => onNavigate('customers')}
                            style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: '#94A3B8', marginBottom: '2px' }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span>Customers</span>
                        </div>

                        <div
                            onClick={() => onNavigate('products')}
                            style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: '#94A3B8', marginBottom: '2px' }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 17 22 12"></polyline></svg>
                            <span>Products</span>
                        </div>

                        <div style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: '#94A3B8', marginBottom: '2px' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                            <span>Human Resources</span>
                        </div>

                        <div style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: '#94A3B8', marginBottom: '2px' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                            <span>Sales</span>
                        </div>

                        <div style={{ padding: '10px 12px 10px 42px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#94A3B8' }}>
                            <span>Reports</span>
                        </div>
                    </nav>
                </div>

                {/* Footer Profile (Fixed Green Avatar Circle) */}
                <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            minWidth: '36px',
                            minHeight: '36px',
                            flexShrink: 0,
                            background: '#00C853',
                            color: '#0F172A',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '0.82rem',
                            lineHeight: 1,
                            letterSpacing: '0px'
                        }}>
                            {userInitials}
                        </div>
                        <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {userName}
                            </div>
                            <span style={{
                                display: 'inline-block',
                                fontSize: '0.62rem',
                                fontWeight: 800,
                                background: '#DCFCE7',
                                color: '#15803D',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                lineHeight: 1.2
                            }}>
                                User
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => onNavigate('landing')}
                        style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.78rem', cursor: 'pointer', flexShrink: 0, padding: '4px' }}
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* ----------------- MAIN CONTENT AREA ----------------- */}
            <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>

                {/* Top Header (LOCKED 64px height) */}
                <header style={{ height: '64px', minHeight: '64px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Dashboard</h2>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, background: '#DCFCE7', color: '#15803D', padding: '4px 10px', borderRadius: '4px' }}>
                        User
                    </span>
                </header>

                {/* Body Content */}
                <div style={{ padding: '32px 40px', flex: 1, width: '100%', boxSizing: 'border-box' }}>

                    {/* Welcome Text */}
                    <div style={{ marginBottom: '28px' }}>
                        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
                            Welcome back, {firstName}
                        </h1>
                        <p style={{ color: '#64748B', fontSize: '0.85rem', margin: 0 }}>
                            You can access the modules and actions assigned to your account. Contact an Admin if you need additional permissions.
                        </p>
                    </div>

                    {/* Stat Cards Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                            <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '12px' }}>Total Customers</div>
                            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1, marginBottom: '12px' }}>0</div>
                            <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600 }}>+24 this month</div>
                        </div>

                        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                            <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '12px' }}>Products</div>
                            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1, marginBottom: '12px' }}>0</div>
                            <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '0.9rem' }}>📈</span> 5 new this month
                            </div>
                        </div>

                        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                            <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '12px' }}>Open Orders</div>
                            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1, marginBottom: '12px' }}>0</div>
                            <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '0.9rem' }}>📈</span> 0% vs last week
                            </div>
                        </div>

                        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                            <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '12px' }}>Revenue (MTD)</div>
                            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1, marginBottom: '12px' }}>$00.00</div>
                            <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '0.9rem' }}>📈</span> 0% vs last week
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Container (4 User Module Buttons) */}
                    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0, marginBottom: '4px' }}>Quick Actions</h3>
                        <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: 0, marginBottom: '20px' }}>Your most-used workspace tasks, one click away.</p>

                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => onNavigate('customers')}
                                style={quickActionBtnStyle}
                            >
                                <span style={quickActionIconBox}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                                </span>
                                View Customers
                            </button>

                            <button
                                onClick={() => onNavigate('products')}
                                style={quickActionBtnStyle}
                            >
                                <span style={quickActionIconBox}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                                </span>
                                Manage Products
                            </button>

                            <button style={quickActionBtnStyle}>
                                <span style={quickActionIconBox}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                                </span>
                                Human Resources
                            </button>

                            <button style={quickActionBtnStyle}>
                                <span style={quickActionIconBox}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#312E81" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                                </span>
                                Sales Management
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

const quickActionBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '10px',
    padding: '12px 20px',
    fontWeight: 700,
    fontSize: '0.85rem',
    color: '#0F172A',
    cursor: 'pointer'
};

const quickActionIconBox = {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    background: '#EEF2FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};