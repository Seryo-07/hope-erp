import React, { useState, useEffect } from 'react';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    // Fetch real users from Express backend on render
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/users');
            const data = await res.json();
            if (Array.isArray(data)) {
                setUsers(data);
            }
        } catch (err) {
            console.error('Failed to load users:', err);
        } finally {
            setLoading(false);
        }
    };

    // Live toggle block/unblock via your Express S1-DEV-05 endpoint
    const handleToggleBlock = async (id, currentBlockedStatus) => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/toggle-block/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_blocked: !currentBlockedStatus })
            });

            if (res.ok) {
                // Refresh live state upon successful backend response
                fetchUsers();
            } else {
                const errData = await res.json();
                alert(errData.error || 'Failed to update user status');
            }
        } catch (err) {
            console.error('Error toggling status:', err);
        }
    };

    const filteredUsers = users.filter((u) =>
        u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="dash-wrapper">
            {/* SIDEBAR */}
            <aside className="sidebar">
                <div className="sidebar-head">
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'white' }}>Hope ERP</span>
                </div>
                <div className="sidebar-menu">
                    <div style={{ color: 'var(--text-subtle)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '12px' }}>
                        CORE MODULES
                    </div>
                    <a className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '8px' }}>
                        📊 Overview
                    </a>
                    <a className="btn btn-primary" style={{ width: '100%', justifyContent: 'flex-start' }}>
                        👥 User Directory
                    </a>
                </div>
            </aside>

            {/* TOPBAR */}
            <header className="topbar">
                <input
                    type="text"
                    placeholder="Search user by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid var(--border-color)',
                        color: 'white',
                        width: '320px'
                    }}
                />
                <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>
                    Role: <span className="status-badge" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#A5B4FC' }}>ADMIN</span>
                </div>
            </header>

            {/* MAIN TABLE WRAPPER */}
            <main className="main-wrapper">
                <div className="table-card">
                    <div className="table-toolbar">
                        <div>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>User Management</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                Manage team access, status, and system permissions. (Superadmin accounts strictly hidden)
                            </p>
                        </div>
                        <button className="btn btn-primary" onClick={fetchUsers}>
                            🔄 Refresh List
                        </button>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table className="table-custom">
                            <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Email Address</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-subtle)' }}>
                                        Loading real user data from Supabase...
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-subtle)' }}>
                                        No active user accounts found.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((u) => (
                                    <tr key={u.id}>
                                        <td><strong>{u.full_name}</strong></td>
                                        <td>{u.email}</td>
                                        <td>{u.role?.name || 'User'}</td>
                                        <td>
                        <span className={`status-badge ${u.is_blocked ? 'status-blocked' : 'status-active'}`}>
                          {u.is_blocked ? 'BLOCKED' : u.status.toUpperCase()}
                        </span>
                                        </td>
                                        <td>
                                            <button
                                                className={u.is_blocked ? 'btn btn-ghost' : 'btn btn-danger'}
                                                onClick={() => handleToggleBlock(u.id, u.is_blocked)}
                                            >
                                                {u.is_blocked ? 'Unblock Access' : 'Block Access'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}