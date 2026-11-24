import React, { useState, useEffect } from 'react';

const MODULE_PERMISSIONS = {
    customerManagement: {
        title: 'Customer Management',
        permissions: ['Add Customer', 'Edit Customer', 'Delete Customer']
    },
    productManagement: {
        title: 'Product Management',
        permissions: ['Add Product', 'Edit Product', 'Delete Product', 'Add Price', 'Edit Price', 'Delete Price']
    },
    humanResources: {
        title: 'Human Resources',
        permissions: [
            'Add Job', 'Edit Job', 'Delete Job', 'Add Department', 'Edit Department', 'Delete Department',
            'Add Employee', 'Edit Employee', 'Delete Employee', 'View Job History', 'Add Job History',
            'Edit Job History', 'Delete Job History'
        ]
    },
    sales: {
        title: 'Sales',
        permissions: ['Add Sale', 'Edit Sale', 'Delete Sale', 'View Sale Details', 'Add Sale Detail', 'Edit Sale Detail', 'Delete Sale Detail']
    },
    reports: {
        title: 'Reports',
        permissions: ['Top Customers', 'Product Master List', 'Top Products', 'Active Employees', 'All Employees', 'Employee Job History', 'Top Sales']
    }
};

export function ManageRightsModal({ user, isOpen, onClose, onSaveRights }) {
    const [selectedRights, setSelectedRights] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            // Kung may existing permissions ang user, gamitin ito; kung wala, default sa empty object
            setSelectedRights(user.rights || {});
        }
    }, [user]);

    if (!isOpen || !user) return null;

    // Toggle single permission
    const handleTogglePermission = (perm) => {
        setSelectedRights((prev) => ({
            ...prev,
            [perm]: !prev[perm]
        }));
    };

    // Toggle category header checkbox
    const handleCategoryToggle = (categoryKey) => {
        const permList = MODULE_PERMISSIONS[categoryKey].permissions;
        const allChecked = permList.every((perm) => selectedRights[perm]);

        const updated = { ...selectedRights };
        permList.forEach((perm) => {
            updated[perm] = !allChecked;
        });
        setSelectedRights(updated);
    };

    // Select all inside category
    const handleSelectAllCategory = (categoryKey) => {
        const permList = MODULE_PERMISSIONS[categoryKey].permissions;
        const updated = { ...selectedRights };
        permList.forEach((perm) => {
            updated[perm] = true;
        });
        setSelectedRights(updated);
    };

    // Select none inside category
    const handleSelectNoneCategory = (categoryKey) => {
        const permList = MODULE_PERMISSIONS[categoryKey].permissions;
        const updated = { ...selectedRights };
        permList.forEach((perm) => {
            updated[perm] = false;
        });
        setSelectedRights(updated);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // Save rights sa backend API
            const res = await fetch(`http://localhost:5000/api/auth/users/${user.id}/rights`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rights: selectedRights })
            });

            if (res.ok) {
                onSaveRights && onSaveRights(user.id, selectedRights);
            } else {
                // Fallback UI update
                onSaveRights && onSaveRights(user.id, selectedRights);
            }
        } catch (err) {
            onSaveRights && onSaveRights(user.id, selectedRights);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '28px 32px',
                width: '100%',
                maxWidth: '680px',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                position: 'relative'
            }}>

                {/* Modal Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                            Rights — {user.full_name || 'User'}
                        </h3>
                        <p style={{ fontSize: '0.88rem', color: '#64748B', margin: '4px 0 0 0' }}>
                            {user.email}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#64748B', cursor: 'pointer' }}
                    >
                        ✕
                    </button>
                </div>

                {/* Scrollable Permissions List */}
                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '6px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {Object.keys(MODULE_PERMISSIONS).map((categoryKey) => {
                        const category = MODULE_PERMISSIONS[categoryKey];
                        const isCategoryAllChecked = category.permissions.every((p) => selectedRights[p]);

                        return (
                            <div key={categoryKey} style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 20px', background: '#FFFFFF' }}>

                                {/* Category Header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={isCategoryAllChecked}
                                            onChange={() => handleCategoryToggle(categoryKey)}
                                            style={{ width: '16px', height: '16px', accentColor: '#1E40AF', cursor: 'pointer' }}
                                        />
                                        {category.title}
                                    </label>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            type="button"
                                            onClick={() => handleSelectAllCategory(categoryKey)}
                                            style={smallBtnStyle}
                                        >
                                            All
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleSelectNoneCategory(categoryKey)}
                                            style={smallBtnStyle}
                                        >
                                            None
                                        </button>
                                    </div>
                                </div>

                                {/* Sub Permissions Grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', paddingLeft: '26px' }}>
                                    {category.permissions.map((perm) => (
                                        <label key={perm} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: selectedRights[perm] ? '#0F172A' : '#94A3B8', cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={!!selectedRights[perm]}
                                                onChange={() => handleTogglePermission(perm)}
                                                style={{ width: '15px', height: '15px', accentColor: '#1E40AF', cursor: 'pointer' }}
                                            />
                                            {perm}
                                        </label>
                                    ))}
                                </div>

                            </div>
                        );
                    })}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={loading}
                        style={{ flex: 1, padding: '12px', background: '#1E40AF', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}
                    >
                        {loading ? 'Saving...' : 'Save Rights'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{ padding: '12px 24px', background: '#F1F5F9', color: '#0F172A', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
}

const smallBtnStyle = {
    background: '#F1F5F9',
    border: 'none',
    borderRadius: '6px',
    padding: '4px 12px',
    fontSize: '0.78rem',
    fontWeight: 600,
    color: '#334155',
    cursor: 'pointer'
};