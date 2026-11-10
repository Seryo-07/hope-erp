import React, { useState, useEffect } from 'react';
import { EditUserModal } from './EditUserModal';
import { ManageRightsModal } from './ManageRightsModal';

export default function UserManagement({ onNavigate, currentUser }) {
    // Current user context (Default to Maria Clara kung Admin test, or Juan Dela Cruz)
    const loggedInUser = currentUser || {
        full_name: 'Maria Clara',
        email: 'superadmin@hope.com',
        role: 'Admin'
    };

    const isSuperadmin = loggedInUser.role === 'Superadmin';

    const [users, setUsers] = useState([
        { id: '1', full_name: 'Juan Dela Cruz', email: 'admin@hope.com', role: 'Superadmin', status: 'Active' },
        { id: '2', full_name: 'Maria Clara', email: 'superadmin@hope.com', role: 'Admin', status: 'Active' },
        { id: '3', full_name: 'Jose Marie', email: 'josemarie@hope.com', role: 'User', status: 'Active' },
        { id: '4', full_name: 'Lisa Kim', email: 'lisakim@hope.com', role: 'User', status: 'Pending' },
    ]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [rightsUser, setRightsUser] = useState(null);
    const [isRightsModalOpen, setIsRightsModalOpen] = useState(false);

    const fetchUsers = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/users');
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) setUsers(data);
            }
        } catch (err) {
            console.log('Using default UI state for demo.');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleApprove = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/auth/users/${id}/approve`, { method: 'PATCH' });
            setUsers(users.map(u => u.id === id ? { ...u, status: 'Active' } : u));
        } catch (err) {
            setUsers(users.map(u => u.id === id ? { ...u, status: 'Active' } : u));
        }
    };

    const handleBlockToggle = async (user) => {
        const newStatus = user.status === 'Active' ? 'Blocked' : 'Active';
        const endpoint = newStatus === 'Blocked' ? 'block' : 'approve';
        try {
            await fetch(`http://localhost:5000/api/auth/users/${user.id}/${endpoint}`, { method: 'PATCH' });
            setUsers(users.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
        } catch (err) {
            setUsers(users.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleRightsClick = (user) => {
        setRightsUser(user);
        setIsRightsModalOpen(true);
    };

    const handleUserUpdated = (updatedUser) => {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    };

    const handleRightsSaved = (userId, updatedRights) => {
        setUsers(users.map(u => u.id === userId ? { ...u, rights: updatedRights } : u));
    };

    const getRoleBadge = (role) => {
        const isUser = role === 'User';
        return (
            <span style={{
                background: isUser ? '#BBF7D0' : '#FEF08A',
                color: isUser ? '#166534' : '#854D0E',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase'
            }}>
                {role}
            </span>
        );
    };

    const getStatusBadge = (status) => {
        const isPending = status?.toUpperCase() === 'PENDING';
        return (
            <span style={{
                background: isPending ? '#FEF08A' : '#BBF7D0',
                color: isPending ? '#854D0E' : '#15803D',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase'
            }}>
                {status}
            </span>
        );
    };

    // Helper para sa Action buttons batay sa role ng nakatitig sa UI
    const renderRowActions = (targetUser) => {
        // Kung Admin ang nakalogin, bawal niyang galawin si Superadmin at kapwa Admin
        if (!isSuperadmin && (targetUser.role === 'Superadmin' || targetUser.role === 'Admin')) {
            return <span style={{ color: '#CBD5E1', fontWeight: 600, letterSpacing: '2px' }}>──────</span>;
        }

        if (targetUser.status?.toUpperCase() === 'PENDING') {
            return (
                <>
                    <button onClick={() => handleApprove(targetUser.id)} style={actionBtnStyle}>APPROVE</button>
                    <button style={actionBtnStyle}>DISAPPROVE</button>
                    <button onClick={() => handleRightsClick(targetUser)} style={actionBtnStyle}>RIGHTS</button>
                    <button onClick={() => handleEditClick(targetUser)} style={actionBtnStyle}>EDIT</button>
                </>
            );
        }

        return (
            <>
                {targetUser.role !== 'Admin' && (
                    <button onClick={() => handleBlockToggle(targetUser)} style={actionBtnStyle}>
                        {targetUser.status === 'Blocked' ? 'UNBLOCK' : 'BLOCK'}
                    </button>
                )}
                <button onClick={() => handleEditClick(targetUser)} style={actionBtnStyle}>EDIT</button>
                {targetUser.role === 'User' && (
                    <button onClick={() => handleRightsClick(targetUser)} style={actionBtnStyle}>RIGHTS</button>
                )}
            </>
        );
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

            {/* ----------------- SIDEBAR ----------------- */}
            <aside style={{ width: '250px', background: '#0F172A', color: '#94A3B8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexShrink: 0 }}>
                <div>
                    {/* Header Logo */}
                    <div style={{ height: '64px', padding: '0 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '28px', height: '28px', background: '#312E81', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                    <polyline points="2 17 12 22 22 17"></polyline>
                                    <polyline points="2 12 17 22 12"></polyline>
                                </svg>
                            </div>
                            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>HOPE, Inc. ERP</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" style={{ cursor: 'pointer' }}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                    </div>

                    {/* Nav Links */}
                    <nav style={{ padding: '20px 12px', fontSize: '0.85rem' }}>
                        <div style={{ padding: '0 12px 12px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.5px' }}>WORKSPACE</div>

                        <div onClick={() => onNavigate && onNavigate('dashboard')} style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: '#94A3B8', marginBottom: '2px' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                            <span>Dashboard</span>
                        </div>
                        <div style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: '#94A3B8', marginBottom: '2px' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span>Customers</span>
                        </div>
                        <div style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: '#94A3B8', marginBottom: '2px' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 17 22 12"></polyline></svg>
                            <span>Products</span>
                        </div>
                        <div style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: '#94A3B8', marginBottom: '2px' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                            <span>Human Resources</span>
                        </div>
                        <div style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: '#94A3B8', marginBottom: '2px' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                            <span>Sales</span>
                        </div>

                        <div style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94A3B8', marginBottom: '16px' }}>
                            <span>Reports</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        </div>

                        <div style={{ padding: '8px 12px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.5px' }}>ADMINISTRATION</div>

                        {/* ACTIVE NAV BOX */}
                        <div style={{ padding: '10px 12px', background: '#1E293B', borderRadius: '8px', color: '#FFFFFF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            <span>User Management</span>
                        </div>
                    </nav>
                </div>

                {/* Footer Profile (Dynamic for Admin / Superadmin) */}
                <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            background: isSuperadmin ? '#FACC15' : '#A855F7',
                            color: isSuperadmin ? '#0F172A' : '#FFFFFF',
                            fontWeight: 800,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justify: 'center',
                            fontSize: '0.85rem'
                        }}>
                            {isSuperadmin ? 'JM' : 'MC'}
                        </div>
                        <div>
                            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.85rem' }}>{loggedInUser.full_name}</div>
                            <span style={{
                                background: isSuperadmin ? '#FEF08A' : '#E9D5FF',
                                color: isSuperadmin ? '#854D0E' : '#6B21A8',
                                padding: '1px 6px',
                                borderRadius: '4px',
                                fontSize: '0.65rem',
                                fontWeight: 800
                            }}>
                                {loggedInUser.role.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <button onClick={() => onNavigate && onNavigate('landing')} style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.78rem', cursor: 'pointer' }}>Logout</button>
                </div>
            </aside>

            {/* ----------------- MAIN CONTENT AREA ----------------- */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>

                {/* Top Header Bar */}
                <header style={{ height: '64px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>User Management</h2>
                    <span style={{
                        background: isSuperadmin ? '#FEF08A' : '#E9D5FF',
                        color: isSuperadmin ? '#854D0E' : '#6B21A8',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.68rem',
                        fontWeight: 800
                    }}>
                        {loggedInUser.role.toUpperCase()}
                    </span>
                </header>

                {/* Body */}
                <div style={{ padding: '32px 40px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>User Management</h1>
                    <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: '0 0 28px 0' }}>
                        Superadmin: manage all accounts, assign Admin role, and set rights for Users.
                    </p>

                    {/* Table */}
                    <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', width: '100%' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                            <thead>
                            <tr style={{ background: '#F3E8FF', color: '#6B21A8', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.5px', borderBottom: '1px solid #E9D5FF' }}>
                                <th style={{ padding: '14px 24px' }}>NAME</th>
                                <th style={{ padding: '14px 24px' }}>EMAIL</th>
                                <th style={{ padding: '14px 24px' }}>ROLE</th>
                                <th style={{ padding: '14px 24px' }}>STATUS</th>
                                <th style={{ padding: '14px 24px' }}>ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((u) => (
                                <tr key={u.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                    <td style={{ padding: '16px 24px', fontWeight: 700, color: '#0F172A' }}>{u.full_name}</td>
                                    <td style={{ padding: '16px 24px', color: '#475569' }}>{u.email}</td>
                                    <td style={{ padding: '16px 24px' }}>{getRoleBadge(u.role)}</td>
                                    <td style={{ padding: '16px 24px' }}>{getStatusBadge(u.status)}</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            {renderRowActions(u)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modals */}
                <EditUserModal
                    user={selectedUser}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onUserUpdated={handleUserUpdated}
                />
                <ManageRightsModal
                    user={rightsUser}
                    isOpen={isRightsModalOpen}
                    onClose={() => setIsRightsModalOpen(false)}
                    onSaveRights={handleRightsSaved}
                />
            </main>
        </div>
    );
}

const actionBtnStyle = {
    background: '#FFFFFF',
    border: '1px solid #CBD5E1',
    borderRadius: '4px',
    padding: '4px 10px',
    fontSize: '0.68rem',
    fontWeight: 700,
    color: '#475569',
    cursor: 'pointer',
    textTransform: 'uppercase'
};