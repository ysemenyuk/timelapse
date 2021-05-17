import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// import { cameraActions } from '../store/cameraSlice.js';
// import { formActions } from '../store/formSlice.js';
import cameraThunks from '../thunks/cameraThunks.js';

const validationSchema = Yup.object({
  name: Yup.string().required().min(3).max(20),
  description: Yup.string().required().min(3).max(30),
});

const CameraForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cameras = useSelector((state) => state.camera.allCameras);

  const handleCancel = () => {
    if (cameras.length > 0) {
      history.push('/');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      rtspLink: '',
      jpegLink: '',
      jpegCreateInterval: '',
      jpegCreateStartTime: '',
      jpegCreateStopTime: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting, setFieldError }) => {
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
    },
  });

  // console.log('selectedCamera -', selectedCamera);
  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Add new camera</h6>
      <div>
        <form className='row g-3' onSubmit={formik.handleSubmit}>
          <div className='col-md-12'>
            <label htmlFor='name' className='form-label'>
              name
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.name}
              id='name'
              name='name'
              type='text'
              className={`form-control ${formik.errors?.name && 'is-invalid'}`}
            ></input>
            <div className='invalid-feedback'>{formik.errors?.name}</div>
          </div>

          <div className='col-md-12'>
            <label htmlFor='description' className='form-label'>
              description
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.description}
              id='description'
              name='description'
              type='text'
              className={`form-control ${
                formik.errors?.description && 'is-invalid'
              }`}
            ></input>
            <div className='invalid-feedback'>{formik.errors?.description}</div>
          </div>

          <div className='col-md-12'>
            <label htmlFor='name' className='form-label'>
              rtspLink
            </label>
            <div className='input-group'>
              <input
                onChange={formik.handleChange}
                value={formik.values.rtspLink}
                name='rtspLink'
                type='text'
                className={`form-control ${
                  formik.errors?.rtspLink && 'is-invalid'
                }`}
              ></input>
              <div className='invalid-feedback'>{formik.errors?.rtspLink}</div>
              <button
                className='btn btn-outline-secondary'
                type='button'
                id='button-addon2'
              >
                Check
              </button>
            </div>
          </div>

          <div className='col-md-12'>
            <label htmlFor='name' className='form-label'>
              jpegLink
            </label>
            <div className='input-group'>
              <input
                onChange={formik.handleChange}
                value={formik.values.jpegLink}
                name='jpegLink'
                type='text'
                className={`form-control ${
                  formik.errors?.jpegLink && 'is-invalid'
                }`}
              ></input>
              <div className='invalid-feedback'>{formik.errors?.jpegLink}</div>
              <button
                className='btn btn-outline-secondary'
                type='button'
                id='button-addon2'
              >
                Check
              </button>
            </div>
          </div>

          <div className='col-md-6'>
            <label htmlFor='description' className='form-label'>
              jpegCreateStartTime
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.jpegCreateStartTime}
              id='jpegCreateStartTime'
              name='jpegCreateStartTime'
              type='text'
              className={`form-control ${
                formik.errors?.jpegCreateStartTime && 'is-invalid'
              }`}
            ></input>
            <div className='invalid-feedback'>
              {formik.errors?.jpegCreateStartTime}
            </div>
          </div>

          <div className='col-md-6'>
            <label htmlFor='description' className='form-label'>
              jpegCreateStopTime
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.jpegCreateStopTime}
              id='jpegCreateStopTime'
              name='jpegCreateStopTime'
              type='text'
              className={`form-control ${
                formik.errors?.jpegCreateStopTime && 'is-invalid'
              }`}
            ></input>
            <div className='invalid-feedback'>
              {formik.errors?.jpegCreateStopTime}
            </div>
          </div>

          <div className='col-md-12'>
            <label htmlFor='jpegCreateInterval' className='form-label'>
              jpegCreateInterval
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.jpegCreateInterval}
              id='jpegCreateInterval'
              name='jpegCreateInterval'
              type='text'
              className={`form-control ${
                formik.errors?.jpegCreateInterval && 'is-invalid'
              }`}
            ></input>
            <div className='invalid-feedback'>
              {formik.errors?.jpegCreateInterval}
            </div>
          </div>

          <div className='d-grid gap-2 d-flex justify-content-start'>
            <button
              className='btn btn-primary'
              type='button'
              onClick={handleCancel}
              disabled={formik.isSubmitting}
            >
              Cancel
            </button>
            <button
              className='btn btn-primary'
              type='submit'
              disabled={formik.isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CameraForm;
