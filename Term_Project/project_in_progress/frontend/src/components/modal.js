import React from 'react';
import './styles/Modal.css'; // Assuming you have a separate CSS file for styles

const Modal = ({ show, children, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default Modal;
