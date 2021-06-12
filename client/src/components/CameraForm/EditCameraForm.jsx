import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// import { cameraActions } from '../store/cameraSlice.js';
import { formActions } from '../../store/formSlice.js';
import cameraThunks from '../../thunks/cameraThunks.js';

const validationSchema = Yup.object({
  name: Yup.string().required().min(3).max(20),
  description: Yup.string().required().min(3).max(30),
});

const CameraFormEdit = ({ selectedCamera }) => {
  const dispatch = useDispatch();

  const form = useSelector((state) => state.form);

  const handleCancel = () => {
    dispatch(formActions.showEditForm(false));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      jpegLink: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting, setFieldError }) => {
      dispatch(cameraThunks.updateOne(values))
        .then((resp) => {
          unwrapResult(resp);
          resetForm();
          setSubmitting(false);
        })
        .catch((e) => {
          setSubmitting(false);
          setFieldError('network', e.message);
          console.log('catch formik err -', e);
        });
    },
  });

  useEffect(() => {
    selectedCamera && formik.setValues(selectedCamera);
  }, [selectedCamera]);

  // console.log('selectedCamera -', selectedCamera);
  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>CameraInfo</h6>

      <div>
        <form className='row g-3' onSubmit={formik.handleSubmit}>
          <div className='col-md-12'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.name}
              disabled={formik.isSubmitting}
              id='name'
              name='name'
              type='text'
              className={`form-control ${formik.errors?.name ? 'is-invalid' : ''}`}
            ></input>
            <div className='invalid-feedback'>{formik.errors?.name}</div>
          </div>

          <div className='col-md-12'>
            <label htmlFor='description' className='form-label'>
              Description
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.description}
              disabled={formik.isSubmitting}
              id='description'
              name='description'
              type='text'
              className={`form-control ${formik.errors?.description && 'is-invalid'}`}
            ></input>
            <div className='invalid-feedback'>{formik.errors?.description}</div>
          </div>

          <div className='col-md-12'>
            <label htmlFor='name' className='form-label'>
              Screenshot Link
            </label>
            <div className='input-group'>
              <input
                onChange={formik.handleChange}
                value={formik.values.jpegLink}
                disabled={formik.isSubmitting}
                name='jpegLink'
                type='text'
                className={`form-control ${formik.errors?.jpegLink && 'is-invalid'}`}
              ></input>
              <div className='invalid-feedback'>{formik.errors?.jpegLink}</div>
              <button
                className='btn btn-outline-secondary'
                disabled
                type='button'
                id='button-addon2'
              >
                Check
              </button>
            </div>
          </div>

          <div className='d-grid gap-2 d-flex justify-content-start'>
            <button
              className='btn btn-sm btn-primary'
              type='button'
              onClick={handleCancel}
              disabled={formik.isSubmitting}
            >
              Cancel
            </button>
            <button
              className='btn btn-sm btn-primary'
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

export default CameraFormEdit;
