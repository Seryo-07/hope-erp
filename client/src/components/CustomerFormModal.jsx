import React, { useState, useEffect } from 'react';

export function CustomerFormModal({
                                      isOpen,
                                      onClose,
                                      mode = 'create', // 'create' | 'edit'
                                      customer = null,
                                      nextCustNo = 'C-006',
                                      currentUserName = 'User',
                                      onSave
                                  }) {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        address: '',
        pay_terms: 'Net 30',
        status: 'Active'
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        setError('');
        if (mode === 'edit' && customer) {
            setFormData({
                id: customer.id || '',
                name: customer.name || '',
                address: customer.address || '',
                pay_terms: customer.pay_terms || 'Net 30',
                status: customer.status || 'Active'
            });
        } else {
            setFormData({
                id: nextCustNo,
                name: '',
                address: '',
                pay_terms: 'Net 30',
                status: 'Active'
            });
        }
    }, [isOpen, mode, customer, nextCustNo]);

    if (!isOpen) return null;

    const formatStamp = (actionType) => {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const actor = currentUserName.trim().split(' ')[0].toLowerCase() || 'user';
        return `${actionType} ${actor} ${yyyy}-${mm}-${dd} ${hours}:${minutes} ${ampm}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setError('Customer Name is required.');
            return;
        }
        if (!formData.address.trim()) {
            setError('Address is required.');
            return;
        }

        setIsSubmitting(true);
        const stampText = formatStamp(mode === 'edit' ? 'EDITED' : 'CREATED');
        const payload = {
            ...formData,
            name: formData.name.trim(),
            address: formData.address.trim(),
            stamp: stampText
        };

        try {
            const url =
                mode === 'edit'
                    ? `http://localhost:5000/api/customers/${encodeURIComponent(payload.id)}`
                    : 'http://localhost:5000/api/customers';
            const method = mode === 'edit' ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const savedFromApi = await res.json();
                onSave(savedFromApi && savedFromApi.id ? savedFromApi : payload, mode);
            } else {
                onSave(payload, mode);
            }
        } catch (err) {
            // Fallback to local state while DB/API is not yet connected
            onSave(payload, mode);
        } finally {
            setIsSubmitting(false);
            onClose();
        }
    };

    return (
        <div style={backdropStyle}>
            <div style={modalCardStyle}>
                {/* Modal Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                            {mode === 'edit' ? 'Edit Customer' : 'Add New Customer'}
                        </h3>
                        <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#64748B' }}>
                            {mode === 'edit'
                                ? `Update record details for ${formData.id}`
                                : 'Fill in the customer details below.'}
                        </p>
                    </div>
                    <button onClick={onClose} style={closeBtnStyle} aria-label="Close modal">
                        ✕
                    </button>
                </div>

                {error && (
                    <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '10px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '16px' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Row 1: CUST NO & STATUS */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                        <div>
                            <label style={labelStyle}>CUST NO</label>
                            <input
                                type="text"
                                value={formData.id}
                                readOnly
                                style={{ ...inputStyle, background: '#F8FAFC', color: '#64748B', fontWeight: 700, cursor: 'not-allowed' }}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>STATUS</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                style={inputStyle}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 2: CUSTOMER NAME */}
                    <div style={{ marginBottom: '14px' }}>
                        <label style={labelStyle}>CUSTOMER NAME *</label>
                        <input
                            type="text"
                            placeholder="e.g. Acme Corporation"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            style={inputStyle}
                        />
                    </div>

                    {/* Row 3: ADDRESS */}
                    <div style={{ marginBottom: '14px' }}>
                        <label style={labelStyle}>ADDRESS *</label>
                        <input
                            type="text"
                            placeholder="e.g. 123 Main St, Metro City"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            style={inputStyle}
                        />
                    </div>

                    {/* Row 4: PAY TERMS */}
                    <div style={{ marginBottom: '22px' }}>
                        <label style={labelStyle}>PAY TERMS</label>
                        <select
                            value={formData.pay_terms}
                            onChange={(e) => setFormData({ ...formData, pay_terms: e.target.value })}
                            style={inputStyle}
                        >
                            <option value="COD">COD</option>
                            <option value="Net 15">Net 15</option>
                            <option value="Net 30">Net 30</option>
                            <option value="Net 45">Net 45</option>
                            <option value="Net 60">Net 60</option>
                        </select>
                    </div>

                    {/* Footer Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                        <button type="button" onClick={onClose} style={cancelBtnStyle}>
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} style={saveBtnStyle}>
                            {isSubmitting ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Create Customer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const backdropStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(15, 23, 42, 0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    padding: '16px'
};

const modalCardStyle = {
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
    width: '100%',
    maxWidth: '480px',
    padding: '24px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box'
};

const closeBtnStyle = {
    background: 'none',
    border: 'none',
    color: '#94A3B8',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '4px'
};

const labelStyle = {
    display: 'block',
    fontSize: '0.72rem',
    fontWeight: 700,
    color: '#475569',
    marginBottom: '6px',
    letterSpacing: '0.3px'
};

const inputStyle = {
    width: '100%',
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1px solid #CBD5E1',
    fontSize: '0.84rem',
    color: '#0F172A',
    background: '#FFFFFF',
    boxSizing: 'border-box',
    outline: 'none'
};

const cancelBtnStyle = {
    background: '#FFFFFF',
    border: '1px solid #CBD5E1',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: '#475569',
    cursor: 'pointer'
};

const saveBtnStyle = {
    background: '#1D4ED8',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 18px',
    fontSize: '0.82rem',
    fontWeight: 700,
    color: '#FFFFFF',
    cursor: 'pointer'
};