import React from 'react';
import './modals.module.css';

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger',
  onConfirm,
  onCancel,
  loading = false,
  children
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content confirm-modal">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
        </div>

        <div className="modal-body">
          {message && <p className="modal-message">{message}</p>}
          {children}
        </div>

        <div className="modal-footer">
          <button
            className="btn-secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            className={`btn-${confirmVariant}`}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
