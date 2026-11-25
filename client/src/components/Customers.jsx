import React, { useState, useEffect } from 'react';
import { CustomerFormModal } from './CustomerFormModal';
import { ConfirmActionModal } from './ConfirmActionModal';

export default function Customers({ onNavigate, currentUser }) {
    const loggedInUser = currentUser || {
        full_name: 'Jose Marie',
        email: 'superadmin@hope.com',
        role: 'Superadmin',
        rights: { customers: { view: true, create: true, edit: true, delete: true } }
    };

    const role = loggedInUser.role?.toLowerCase();
    const isSuperadmin = role === 'superadmin';
    const isAdmin = role === 'admin';

    // Permission Check Logic (Superadmin/Admin = full access; User = checked via rights)
    const customerRights = loggedInUser.rights?.customers || {};
    const canView = isSuperadmin || isAdmin || customerRights.view !== false;
    const canCreate = isSuperadmin || isAdmin || Boolean(customerRights.create);
    const canEdit = isSuperadmin || isAdmin || Boolean(customerRights.edit);
    const canDelete = isSuperadmin || isAdmin || Boolean(customerRights.delete);

    const [customers, setCustomers] = useState([
        { id: 'C-001', name: 'Acme Corporation', address: '123 Main St, Metro City', pay_terms: 'Net 30', status: 'Active', stamp: 'CREATED system 2026-10-01 9:00 AM' },
        { id: 'C-002', name: 'Globex Industries', address: '456 Oak Ave, Harbor Town', pay_terms: 'Net 45', status: 'Active', stamp: 'CREATED system 2026-10-02 10:15 AM' },
        { id: 'C-003', name: 'Initech LLC', address: '789 Pine Rd, Silicon Valley', pay_terms: 'COD', status: 'Active', stamp: 'EDITED user1 2026-10-13 1:01 PM' },
        { id: 'C-004', name: 'Wayne Enterprises', address: '1007 Mountain Dr, Gotham', pay_terms: 'Net 30', status: 'Inactive', stamp: 'DELETED system 2026-10-05 2:30 PM' },
        { id: 'C-005', name: 'Stark Enterprises', address: '200 Park Avenue, New York', pay_terms: 'Net 15', status: 'Active', stamp: 'EDITED user1 2026-10-13 1:01 PM' },
    ]);

    const [activeTab, setActiveTab] = useState('Active');
    const [searchQuery, setSearchQuery] = useState('');

    // Create / Edit Modal States
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [editingCustomer, setEditingCustomer] = useState(null);

    // Soft Delete / Restore Modal States
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        actionType: 'delete', // 'delete' | 'restore'
        customer: null
    });
    const [isActionLoading, setIsActionLoading] = useState(false);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/customers');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setCustomers(data);
                    }
                }
            } catch (err) {
                console.log('Using default customer dataset.');
            }
        };
        if (canView) fetchCustomers();
    }, [canView]);

    const formatStamp = (actionType) => {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const actor = loggedInUser.full_name?.trim().split(' ')[0].toLowerCase() || 'user';
        return `${actionType} ${actor} ${yyyy}-${mm}-${dd} ${hours}:${minutes} ${ampm}`;
    };

    const getNextCustNo = () => {
        const maxNum = customers.reduce((max, c) => {
            const match = String(c.id).match(/\d+/);
            const num = match ? parseInt(match[0], 10) : 0;
            return num > max ? num : max;
        }, 0);
        return `C-${String(maxNum + 1).padStart(3, '0')}`;
    };

    const handleOpenCreate = () => {
        if (!canCreate) return;
        setFormMode('create');
        setEditingCustomer(null);
        setIsFormOpen(true);
    };

    const handleOpenEdit = (cust) => {
        if (!canEdit) return;
        setFormMode('edit');
        setEditingCustomer(cust);
        setIsFormOpen(true);
    };

    const handleSaveCustomer = (savedCustomer, mode) => {
        if (mode === 'edit') {
            setCustomers(customers.map((c) => (c.id === savedCustomer.id ? savedCustomer : c)));
        } else {
            setCustomers([...customers, savedCustomer]);
        }
    };

    const openSoftDeleteModal = (cust) => {
        if (!canDelete) return;
        setConfirmModal({ isOpen: true, actionType: 'delete', customer: cust });
    };

    const openRestoreModal = (cust) => {
        if (!canDelete && !canEdit) return;
        setConfirmModal({ isOpen: true, actionType: 'restore', customer: cust });
    };

    const handleConfirmStatusAction = async () => {
        const { actionType, customer } = confirmModal;
        if (!customer) return;

        setIsActionLoading(true);
        const isDelete = actionType === 'delete';
        const nextStatus = isDelete ? 'Inactive' : 'Active';
        const nextStamp = formatStamp(isDelete ? 'DELETED' : 'RESTORED');
        const endpoint = isDelete ? 'deactivate' : 'restore';

        try {
            await fetch(`http://localhost:5000/api/customers/${encodeURIComponent(customer.id)}/${endpoint}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: nextStatus, stamp: nextStamp })
            });
        } catch (err) {
            // Fallback to local state while DB/API is not yet connected
        } finally {
            setCustomers(
                customers.map((c) =>
                    c.id === customer.id ? { ...c, status: nextStatus, stamp: nextStamp } : c
                )
            );
            setIsActionLoading(false);
            setConfirmModal({ isOpen: false, actionType: 'delete', customer: null });
        }
    };

    const activeCount = customers.filter(c => c.status?.toLowerCase() === 'active').length;
    const inactiveCount = customers.filter(c => c.status?.toLowerCase() === 'inactive').length;
    const allCount = customers.length;

    const filteredCustomers = customers.filter((c) => {
        const matchesTab =
            activeTab === 'All' ||
            c.status?.toLowerCase() === activeTab.toLowerCase();

        const q = searchQuery.toLowerCase();
        const matchesSearch =
            c.id?.toLowerCase().includes(q) ||
            c.name?.toLowerCase().includes(q) ||
            c.address?.toLowerCase().includes(q) ||
            c.pay_terms?.toLowerCase().includes(q);

        return matchesTab && matchesSearch;
    });

    const getInitials = (name) => {
        if (!name) return 'JM';
        const parts = name.trim().split(' ').filter(Boolean);
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    const getAvatarStyle = () => {
        if (isSuperadmin) return { bg: '#FACC15', text: '#0F172A', badgeBg: '#FEF08A', badgeText: '#854D0E' };
        if (isAdmin) return { bg: '#9333EA', text: '#FFFFFF', badgeBg: '#F3E8FF', badgeText: '#7E22CE' };
        return { bg: '#00C853', text: '#0F172A', badgeBg: '#DCFCE7', badgeText: '#15803D' };
    };

    const avatarColors = getAvatarStyle();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%', background: '#F8FAFC', fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: 'border-box' }}>

            {/* ----------------- SIDEBAR (LOCKED 256px) ----------------- */}
            <aside style={{ width: '256px', minWidth: '256px', maxWidth: '256px', background: '#0F172A', color: '#94A3B8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexShrink: 0, boxSizing: 'border-box' }}>
                <div>
                    <div style={{ height: '64px', minHeight: '64px', padding: '0 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                            <div style={{ width: '28px', height: '28px', minWidth: '28px', flexShrink: 0, background: '#312E81', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                    <polyline points="2 17 12 22 22 17"></polyline>
                                    <polyline points="2 12 17 22 12"></polyline>
                                </svg>
                            </div>
                            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF', whiteSpace: 'nowrap' }}>HOPE, Inc. ERP</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" style={{ cursor: 'pointer', flexShrink: 0 }}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                    </div>

                    <nav style={{ padding: '20px 12px', fontSize: '0.85rem', boxSizing: 'border-box' }}>
                        <div style={{ padding: '0 12px 12px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.5px' }}>WORKSPACE</div>

                        <div onClick={() => onNavigate('dashboard')} style={navItemStyle}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                            <span>Dashboard</span>
                        </div>

                        <div style={{ padding: '10px 12px', background: '#1E293B', borderRadius: '8px', color: '#FFFFFF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2px' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span>Customers</span>
                        </div>

                        <div onClick={() => onNavigate('products')} style={navItemStyle}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 17 22 12"></polyline></svg>
                            <span>Products</span>
                        </div>

                        <div style={navItemStyle}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                            <span>Human Resources</span>
                        </div>

                        <div style={navItemStyle}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                            <span>Sales</span>
                        </div>

                        <div style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94A3B8', marginBottom: '16px' }}>
                            <span>Reports</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        </div>

                        {(isSuperadmin || isAdmin) && (
                            <>
                                <div style={{ padding: '8px 12px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.5px' }}>ADMINISTRATION</div>
                                <div onClick={() => onNavigate('user-management')} style={navItemStyle}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                    <span>User Management</span>
                                </div>
                            </>
                        )}
                    </nav>
                </div>

                <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            minWidth: '36px',
                            minHeight: '36px',
                            flexShrink: 0,
                            background: avatarColors.bg,
                            color: avatarColors.text,
                            fontWeight: 800,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.82rem',
                            lineHeight: 1
                        }}>
                            {getInitials(loggedInUser.full_name)}
                        </div>
                        <div style={{ minWidth: 0 }}>
                            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {loggedInUser.full_name}
                            </div>
                            <span style={{
                                display: 'inline-block',
                                background: avatarColors.badgeBg,
                                color: avatarColors.badgeText,
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '0.62rem',
                                fontWeight: 800,
                                lineHeight: 1.2
                            }}>
                                {loggedInUser.role.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <button onClick={() => onNavigate('landing')} style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.78rem', cursor: 'pointer', flexShrink: 0, padding: '4px' }}>
                        Logout
                    </button>
                </div>
            </aside>

            {/* ----------------- MAIN CONTENT AREA ----------------- */}
            <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                <header style={{ height: '64px', minHeight: '64px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Customers</h2>
                    <span style={{
                        background: avatarColors.badgeBg,
                        color: avatarColors.badgeText,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.68rem',
                        fontWeight: 800
                    }}>
                        {loggedInUser.role.toUpperCase()}
                    </span>
                </header>

                <div style={{ padding: '32px 40px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
                    {!canView ? (
                        <div style={{ background: '#FFFFFF', border: '1px solid #FECACA', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
                            <h3 style={{ color: '#991B1B', margin: '0 0 8px 0', fontWeight: 800 }}>Access Restricted</h3>
                            <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>
                                You do not have permission to view Customer Management. Please contact an Admin to request access.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '16px', flexWrap: 'wrap' }}>
                                <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.3px' }}>
                                    Customer Management
                                </h1>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                    <div style={{ display: 'inline-flex', background: '#F1F5F9', padding: '4px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                                        {[
                                            { key: 'Active', label: `Active (${activeCount})` },
                                            { key: 'Inactive', label: `Inactive (${inactiveCount})` },
                                            { key: 'All', label: `All (${allCount})` }
                                        ].map((tab) => {
                                            const isSelected = activeTab === tab.key;
                                            return (
                                                <button
                                                    key={tab.key}
                                                    onClick={() => setActiveTab(tab.key)}
                                                    style={{
                                                        padding: '6px 14px',
                                                        borderRadius: '6px',
                                                        border: 'none',
                                                        fontSize: '0.8rem',
                                                        fontWeight: isSelected ? 700 : 500,
                                                        background: isSelected ? '#FFFFFF' : 'transparent',
                                                        color: isSelected ? '#0F172A' : '#64748B',
                                                        boxShadow: isSelected ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {tab.label}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Search customers..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{
                                            padding: '8px 14px',
                                            borderRadius: '8px',
                                            border: '1px solid #E2E8F0',
                                            background: '#FFFFFF',
                                            fontSize: '0.82rem',
                                            color: '#0F172A',
                                            width: '200px',
                                            outline: 'none'
                                        }}
                                    />

                                    {canCreate && (
                                        <button
                                            onClick={handleOpenCreate}
                                            style={{
                                                background: '#1D4ED8',
                                                color: '#FFFFFF',
                                                border: 'none',
                                                borderRadius: '8px',
                                                padding: '8px 16px',
                                                fontSize: '0.82rem',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            + Add Customer
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
                                    <thead>
                                    <tr style={{ background: '#F8FAFC', color: '#64748B', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.4px', borderBottom: '1px solid #E2E8F0' }}>
                                        <th style={{ padding: '14px 20px' }}>CUST NO</th>
                                        <th style={{ padding: '14px 20px' }}>CUSTOMER NAME</th>
                                        <th style={{ padding: '14px 20px' }}>ADDRESS</th>
                                        <th style={{ padding: '14px 20px' }}>PAY TERMS</th>
                                        <th style={{ padding: '14px 20px' }}>STATUS</th>
                                        <th style={{ padding: '14px 20px' }}>STAMP</th>
                                        {(canEdit || canDelete) && <th style={{ padding: '14px 20px' }}>ACTIONS</th>}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filteredCustomers.map((cust) => {
                                        const isInactive = cust.status?.toLowerCase() === 'inactive';
                                        return (
                                            <tr key={cust.id} style={{ borderBottom: '1px solid #F1F5F9', background: isInactive ? '#FAFAFA' : '#FFFFFF' }}>
                                                <td style={{ padding: '16px 20px', fontWeight: 700, color: '#0F172A' }}>{cust.id}</td>
                                                <td style={{ padding: '16px 20px', color: '#0F172A', fontWeight: 500 }}>{cust.name}</td>
                                                <td style={{ padding: '16px 20px', color: '#334155' }}>{cust.address}</td>
                                                <td style={{ padding: '16px 20px', color: '#334155' }}>{cust.pay_terms}</td>
                                                <td style={{ padding: '16px 20px' }}>
                                                        <span style={{
                                                            background: isInactive ? '#FEE2E2' : '#DCFCE7',
                                                            color: isInactive ? '#B91C1C' : '#15803D',
                                                            padding: '3px 10px',
                                                            borderRadius: '999px',
                                                            fontSize: '0.72rem',
                                                            fontWeight: 700
                                                        }}>
                                                            {cust.status}
                                                        </span>
                                                </td>
                                                <td style={{ padding: '16px 20px', color: '#64748B', fontSize: '0.75rem', maxWidth: '180px', lineHeight: 1.4 }}>
                                                    {cust.stamp}
                                                </td>
                                                {(canEdit || canDelete) && (
                                                    <td style={{ padding: '16px 20px' }}>
                                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                            {canEdit && (
                                                                <button onClick={() => handleOpenEdit(cust)} style={rowActionBtnStyle}>
                                                                    Edit
                                                                </button>
                                                            )}
                                                            {isInactive ? (
                                                                (canDelete || canEdit) && (
                                                                    <button
                                                                        onClick={() => openRestoreModal(cust)}
                                                                        style={{
                                                                            ...rowActionBtnStyle,
                                                                            borderColor: '#86EFAC',
                                                                            background: '#F0FDF4',
                                                                            color: '#15803D'
                                                                        }}
                                                                    >
                                                                        Restore
                                                                    </button>
                                                                )
                                                            ) : (
                                                                canDelete && (
                                                                    <button
                                                                        onClick={() => openSoftDeleteModal(cust)}
                                                                        style={{
                                                                            ...rowActionBtnStyle,
                                                                            borderColor: '#FECACA',
                                                                            color: '#B91C1C'
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                )
                                                            )}
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        );
                                    })}
                                    {filteredCustomers.length === 0 && (
                                        <tr>
                                            <td colSpan="7" style={{ padding: '32px', textAlign: 'center', color: '#94A3B8' }}>
                                                No customers found.
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>

                {/* Create / Edit Modal */}
                <CustomerFormModal
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    mode={formMode}
                    customer={editingCustomer}
                    nextCustNo={getNextCustNo()}
                    currentUserName={loggedInUser.full_name}
                    onSave={handleSaveCustomer}
                />

                {/* Soft Delete / Restore Confirmation Modal */}
                <ConfirmActionModal
                    isOpen={confirmModal.isOpen}
                    onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                    onConfirm={handleConfirmStatusAction}
                    actionType={confirmModal.actionType}
                    customer={confirmModal.customer}
                    isProcessing={isActionLoading}
                />
            </main>
        </div>
    );
}

const navItemStyle = {
    padding: '10px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#94A3B8',
    marginBottom: '2px'
};

const rowActionBtnStyle = {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    padding: '5px 12px',
    fontSize: '0.76rem',
    fontWeight: 600,
    color: '#0F172A',
    cursor: 'pointer'
};