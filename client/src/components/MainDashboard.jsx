import React, { useState, useEffect } from 'react';

const MODULE_CONFIG = [
    { name: 'Customer', icon: 'fa-users', color: '#6366F1', desc: 'Manage client accounts, contacts & history' },
    { name: 'Product', icon: 'fa-boxes-stacked', color: '#10B981', desc: 'Track inventory, SKU levels & pricing' },
    { name: 'Human Resources', icon: 'fa-user-tie', color: '#8B5CF6', desc: 'Employee records, payroll & staffing' },
    { name: 'Sales', icon: 'fa-chart-line', color: '#F59E0B', desc: 'Monitor orders, invoices & revenue' },
    { name: 'Reports', icon: 'fa-file-invoice-dollar', color: '#06B6D4', desc: 'System analytics & exportable insights' },
];

export default function MainDashboard({ currentUser }) {
    const [userPermissions, setUserPermissions] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (currentUser?.role === 'superadmin') return;

        // Fetch granular permissions for standard users
        fetch(`http://localhost:5000/api/permissions/${currentUser.id}`)
            .then((res) => res.json())
            .then((data) => setUserPermissions(data.permissions || []))
            .catch(() => setUserPermissions([]));
    }, [currentUser]);

    // Check if current user has permission to view a module
    const canAccessModule = (moduleName) => {
        if (currentUser?.role === 'superadmin') return true;
        const perm = userPermissions.find((p) => p.module === moduleName);
        return !!perm?.can_view;
    };

    const allowedModules = MODULE_CONFIG.filter((mod) => canAccessModule(mod.name));

    return (
        <div className="dash-wrapper">
            {/* Dynamic Sidebar filtered by Rights */}
            <aside className="sidebar">
                <div className="sidebar-head">
                    <i className="fa-solid fa-layer-group" style={{ color: '#6366F1', fontSize: '1.2rem' }}></i>
                    <span style={{ fontWeight: 800, color: 'white', fontSize: '1.1rem' }}>HOPE ERP</span>
                </div>

                <div className="sidebar-menu">
                    <div
                        onClick={() => setActiveTab('overview')}
                        style={{
                            padding: '12px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            marginBottom: '8px',
                            background: activeTab === 'overview' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                            color: activeTab === 'overview' ? '#6366F1' : 'var(--text-muted)',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}
                    >
                        <i className="fa-solid fa-house"></i> Overview Dashboard
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', margin: '16px 0 8px 12px', fontWeight: 700, textTransform: 'uppercase' }}>
                        Authorized Modules
                    </div>

                    {allowedModules.map((mod) => (
                        <div
                            key={mod.name}
                            onClick={() => setActiveTab(mod.name.toLowerCase())}
                            style={{
                                padding: '10px 16px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                marginBottom: '4px',
                                background: activeTab === mod.name.toLowerCase() ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                                color: activeTab === mod.name.toLowerCase() ? 'white' : 'var(--text-muted)',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}
                        >
                            <i className={`fa-solid ${mod.icon}`} style={{ color: mod.color }}></i>
                            {mod.name}
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main View Grid */}
            <main className="main-wrapper">
                <h2 style={{ color: 'white', fontWeight: 800, marginBottom: '24px' }}>
                    Welcome back, {currentUser?.full_name || 'User'}
                    <span className="status-badge status-active" style={{ marginLeft: '12px', fontSize: '0.75rem' }}>
            ROLE: {currentUser?.role || 'User'}
          </span>
                </h2>

                {/* Dynamic Module Tiles */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {allowedModules.map((mod) => (
                        <div key={mod.name} className="table-card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: `${mod.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className={`fa-solid ${mod.icon}`} style={{ color: mod.color, fontSize: '1.2rem' }}></i>
                                </div>
                                <h3 style={{ color: 'white', fontWeight: 700, margin: 0 }}>{mod.name}</h3>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '20px' }}>
                                {mod.desc}
                            </p>
                            <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'space-between' }}>
                                Open Module <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    ))}

                    {allowedModules.length === 0 && (
                        <div className="table-card" style={{ padding: '32px', textAlign: 'center', gridColumn: '1 / -1' }}>
                            <i className="fa-solid fa-lock" style={{ fontSize: '2rem', color: 'var(--text-subtle)', marginBottom: '12px' }}></i>
                            <h3 style={{ color: 'white' }}>No Assigned Modules</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                Contact your administrator to request module permission access.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}