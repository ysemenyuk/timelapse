import React from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Modal } from 'react-bootstrap';
import cameraThunks from '../../thunks/cameraThunks.js';
import CameraForm from '../Forms/CameraForm.jsx';

function EditCameraModal({ initialValues, show, onHide }) {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm, setSubmitting, setFieldError }) => {
    dispatch(cameraThunks.updateOne(values))
      .then((resp) => {
        unwrapResult(resp);
        resetForm();
        setSubmitting(false);
        onHide();
      })
      .catch((e) => {
        setSubmitting(false);
        setFieldError('network', e.message);
        console.log('catch formik err -', e);
      });
  };

  return (
    <Modal
      aria-labelledby="modal-settings"
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="modal-settings">Edit settings</Modal.Title>
      </Modal.Header>

      <CameraForm
        initialValues={initialValues}
        onCancel={onHide}
        onSubmit={handleSubmit}
      />

    </Modal>
  );
}

export default EditCameraModal;
