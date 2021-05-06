import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
// import axios from 'axios';
import * as Yup from 'yup';

// import { camerasActions, formActions } from '../store/index.js';
// import useFormState from '../hooks/useFormState.js';

const validationSchema = Yup.object({
  name: Yup.string().required().min(3).max(20),
});

const CameraForm = ({ selectedCamera, onSubmit }) => {
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
    onSubmit,
  });

  useEffect(() => {
    selectedCamera && formik.setValues(selectedCamera);
  }, []);

  // console.log('selectedCamera -', selectedCamera);
  // console.log('formik.errors -', formik.errors);
  // console.log(333, 'formik.values -', formik.values);

  return (
    <div className='mb-3'>
      <div className='mb-3'>Camera Form</div>
      <div>
        <form className='row g-3' onSubmit={formik.handleSubmit}>
          <div className='col-md-8'>
            <label htmlFor='name' className='form-label'>
              name
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.name}
              // readOnly={form.readOnly}
              id='name'
              name='name'
              type='text'
              className={`form-control ${formik.errors?.name && 'is-invalid'}`}
            ></input>
            <div className='invalid-feedback'>{formik.errors?.name}</div>
          </div>

          <div className='col-md-8'>
            <label htmlFor='description' className='form-label'>
              description
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.description}
              // readOnly={form.readOnly}
              id='description'
              name='description'
              type='text'
              className={`form-control ${
                formik.errors?.description && 'is-invalid'
              }`}
            ></input>
            <div className='invalid-feedback'>{formik.errors?.rtspLink}</div>
          </div>

          <div className='col-md-8'>
            <label htmlFor='name' className='form-label'>
              rtspLink
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.rtspLink}
              id='rtspLink'
              name='rtspLink'
              type='text'
              className={`form-control ${
                formik.errors?.rtspLink && 'is-invalid'
              }`}
            ></input>
            <div className='invalid-feedback'>{formik.errors?.rtspLink}</div>
          </div>

          <div className='col-md-8'>
            <label htmlFor='name' className='form-label'>
              jpegLink
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.jpegLink}
              id='jpegLink'
              name='jpegLink'
              type='text'
              className={`form-control ${
                formik.errors?.jpegLink && 'is-invalid'
              }`}
            ></input>
            <div className='invalid-feedback'>{formik.errors?.jpegLink}</div>
          </div>

          <div className='col-md-12'>
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
