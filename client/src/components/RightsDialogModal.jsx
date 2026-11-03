import React, { useState, useEffect } from 'react';

const MODULES = ['Customer', 'Product', 'Human Resources', 'Sales', 'Reports'];
const ACTIONS = ['can_view', 'can_create', 'can_edit', 'can_delete'];

export default function RightsDialogModal({ targetUser, onClose, currentActorId }) {
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Initialize default structure
        const initial = {};
        MODULES.forEach((mod) => {
            initial[mod] = { can_view: false, can_create: false, can_edit: false, can_delete: false };
        });

        // Fetch user rights if existing
        fetch(`http://localhost:5000/api/permissions/${targetUser.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.permissions && data.permissions.length > 0) {
                    data.permissions.forEach((item) => {
                        if (initial[item.module]) {
                            initial[item.module] = {
                                can_view: item.can_view,
                                can_create: item.can_create,
                                can_edit: item.can_edit,
                                can_delete: item.can_delete,
                            };
                        }
                    });
                }
                setPermissions(initial);
            })
            .catch(() => setPermissions(initial));
    }, [targetUser]);

    // Toggle single action checkbox
    const handleActionToggle = (module, action) => {
        setPermissions((prev) => ({
            ...prev,
            [module]: {
                ...prev[module],
                [action]: !prev[module][action],
            },
        }));
    };

    // Toggle entire module (All / None for a row)
    const handleModuleToggle = (module, selectAll) => {
        setPermissions((prev) => ({
            ...prev,
            [module]: {
                can_view: selectAll,
                can_create: selectAll,
                can_edit: selectAll,
                can_delete: selectAll,
            },
        }));
    };

    // Global All / None Batch Selection
    const handleGlobalToggle = (selectAll) => {
        const updated = {};
        MODULES.forEach((mod) => {
            updated[mod] = {
                can_view: selectAll,
                can_create: selectAll,
                can_edit: selectAll,
                can_delete: selectAll,
            };
        });
        setPermissions(updated);
    };

    // Save permissions
    const handleSave = async () => {
        setLoading(true);
        setMessage('');
        try {
            const payload = {
                actorId: currentActorId || null,
                targetUserId: targetUser.id,
                permissions: MODULES.map((mod) => ({
                    module: mod,
                    ...permissions[mod],
                })),
            };

            const res = await fetch('http://localhost:5000/api/permissions/assign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to save');

            setMessage('✅ Rights saved & logged in audit_log!');
            setTimeout(() => onClose(), 1200);
        } catch (err) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div className="table-card" style={{ maxWidth: '680px', width: '100%', padding: '28px', border: '1px solid var(--border-glow)' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                        <h3 style={{ color: 'white', fontWeight: 800, margin: 0 }}>Assign User Rights</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>
                            Target User: <strong style={{ color: 'var(--accent-primary)' }}>{targetUser.full_name || targetUser.email}</strong>
                        </p>
                    </div>
                    <button className="btn btn-ghost" onClick={onClose}>✕</button>
                </div>

                {/* Global Batch Controls */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', background: 'rgba(15, 23, 42, 0.6)', padding: '10px 16px', borderRadius: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Global Select:</span>
                    <button type="button" className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => handleGlobalToggle(true)}>Select All</button>
                    <button type="button" className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => handleGlobalToggle(false)}>Deselect All</button>
                </div>

                {/* Rights Table */}
                <table className="table-custom" style={{ width: '100%', marginBottom: '20px' }}>
                    <thead>
                    <tr>
                        <th>Module</th>
                        <th style={{ textAlign: 'center' }}>View</th>
                        <th style={{ textAlign: 'center' }}>Create</th>
                        <th style={{ textAlign: 'center' }}>Edit</th>
                        <th style={{ textAlign: 'center' }}>Delete</th>
                        <th style={{ textAlign: 'right' }}>Module Batch</th>
                    </tr>
                    </thead>
                    <tbody>
                    {MODULES.map((mod) => {
                        const modRights = permissions[mod] || {};
                        const isAll = ACTIONS.every((act) => modRights[act]);

                        return (
                            <tr key={mod}>
                                <td style={{ fontWeight: 700, color: 'white' }}>{mod}</td>
                                {ACTIONS.map((act) => (
                                    <td key={act} style={{ textAlign: 'center' }}>
                                        <input
                                            type="checkbox"
                                            checked={!!modRights[act]}
                                            onChange={() => handleActionToggle(mod, act)}
                                            style={{ accentColor: 'var(--accent-primary)', width: '16px', height: '16px', cursor: 'pointer' }}
                                        />
                                    </td>
                                ))}
                                <td style={{ textAlign: 'right' }}>
                                    <button
                                        type="button"
                                        className="btn btn-ghost"
                                        style={{ padding: '2px 8px', fontSize: '0.7rem' }}
                                        onClick={() => handleModuleToggle(mod, !isAll)}
                                    >
                                        {isAll ? 'None' : 'All'}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>

                {message && <div style={{ marginBottom: '16px', fontSize: '0.85rem', color: message.startsWith('✅') ? '#34D399' : '#FCA5A5' }}>{message}</div>}

                {/* Footer Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <button className="btn btn-ghost" onClick={onClose} disabled={loading}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                        {loading ? 'Saving...' : 'Save Permissions & Log'}
                    </button>
                </div>

            </div>
        </div>
    );
}