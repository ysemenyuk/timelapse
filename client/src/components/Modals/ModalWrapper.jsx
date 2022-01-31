import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { modalActions } from '../../store/modalSlice';

function ModalWrapper({ name, size, children, ...props }) {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.modal);

  const isVisible = modal[name] || false;

  const handleClose = () => {
    dispatch(modalActions.closeModal(name));
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title"
      show={isVisible}
      onHide={handleClose}
      size={size}
      {...props}
    >
      {children}
    </Modal>
  );
}

export default ModalWrapper;
