import React from 'react';

export function ConfirmActionModal({
                                       isOpen,
                                       onClose,
                                       onConfirm,
                                       actionType = 'delete', // 'delete' | 'restore'
                                       customer = null,
                                       isProcessing = false
                                   }) {
    if (!isOpen || !customer) return null;

    const isDelete = actionType === 'delete';

    return (
        <div style={backdropStyle}>
            <div style={modalCardStyle}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '18px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                        borderRadius: '10px',
                        background: isDelete ? '#FEE2E2' : '#DCFCE7',
                        color: isDelete ? '#B91C1C' : '#15803D',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1.1rem'
                    }}>
                        {isDelete ? '!' : '↺'}
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
                            {isDelete ? 'Deactivate Customer?' : 'Restore Customer?'}
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
                            {isDelete ? (
                                <>
                                    Are you sure you want to deactivate <strong>{customer.name}</strong> ({customer.id})?
                                    Their status will be set to <strong>Inactive</strong> and can be restored anytime.
                                </>
                            ) : (
                                <>
                                    Restore <strong>{customer.name}</strong> ({customer.id}) back to <strong>Active</strong> status?
                                </>
                            )}
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                    <button type="button" onClick={onClose} disabled={isProcessing} style={cancelBtnStyle}>
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isProcessing}
                        style={{
                            background: isDelete ? '#DC2626' : '#16A34A',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 18px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            color: '#FFFFFF',
                            cursor: 'pointer'
                        }}
                    >
                        {isProcessing
                            ? 'Processing...'
                            : isDelete
                                ? 'Yes, Deactivate'
                                : 'Yes, Restore'}
                    </button>
                </div>
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
    zIndex: 60,
    padding: '16px'
};

const modalCardStyle = {
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
    width: '100%',
    maxWidth: '430px',
    padding: '24px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box'
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