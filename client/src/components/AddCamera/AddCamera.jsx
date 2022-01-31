import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import cameraThunks from '../../thunks/cameraThunks.js';
import Heading from '../UI/Heading.jsx';
import CameraForm from '../Forms/CameraForm.jsx';

function AddCameraForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cameras = useSelector((state) => state.camera.allCameras);

  const handleCancel = () => {
    if (cameras.length > 0) {
      history.push('/');
    }
  };

  const handleSubmit = (values, { resetForm, setSubmitting, setFieldError }) => {
    dispatch(cameraThunks.createOne(values))
      .then((resp) => {
        unwrapResult(resp);
        resetForm();
        setSubmitting(false);
        history.push('/');
      })
      .catch((e) => {
        setSubmitting(false);
        setFieldError('network', e.message);
        console.log('catch formik err -', e);
      });
  };

  // console.log('selectedCamera -', selectedCamera);
  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  return (
    <Col md={12} className="mb-4">
      <Heading lvl={6} className="mb-3">
        Add new camera
      </Heading>
      <CameraForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />

    </Col>
  );
}

export default AddCameraForm;
