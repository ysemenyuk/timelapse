import React from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import userThunks from '../thunks/userThunks.js';

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    }),
    onSubmit: (values, { resetForm, setSubmitting, setFieldError }) => {
      dispatch(userThunks.login(values))
        .then((resp) => {
          unwrapResult(resp);
          resetForm();
          setSubmitting(false);
          history.push('/');
        })
        .catch((e) => {
          setSubmitting(false);
          setFieldError('auth', e.message);
          console.log('catch formik err -', e);
        });
    },
  });

  // console.log('formik.values -', formik.values);
  // console.log('formik.errors -', formik.errors);

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center pt-5'>
        <div className='col-3'>
          <h3 className='text-center mb-3'>Log In</h3>
          <form className='mb-3' onSubmit={formik.handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                autoComplete='email'
                className={
                  formik.errors.email || formik.errors.auth
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                onChange={formik.handleChange}
                value={formik.values.email}
                // required
                // ref={inputRef}
              ></input>
              <div className='invalid-feedback'>{formik.errors.email}</div>
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                autoComplete='current-password'
                className={
                  formik.errors.password || formik.errors.auth
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                onChange={formik.handleChange}
                value={formik.values.password}
                // required
              ></input>
              <div className='invalid-feedback'>{formik.errors.password}</div>
              <div className='invalid-feedback'>{formik.errors.auth}</div>
            </div>

            <button
              type='submit'
              className='w-100 mb-3 btn btn-outline-primary'
            >
              Submit
            </button>
          </form>

          <div className='d-flex flex-column align-items-center'>
            <span className='small mb-2'>New user?</span>
            <Link to='/signup'>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
