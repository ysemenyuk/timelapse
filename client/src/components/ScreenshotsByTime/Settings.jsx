import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  start: Yup.string().required(),
  finish: Yup.string().required(),
  interval: Yup.string().required(),
});

const ScreenshotsSettings = ({ screenshotsData, onGetOneScreenshot }) => {
  // const dispatch = useDispatch();

  const [running, setRunning] = useState(false);

  const formik = useFormik({
    initialValues: {
      start: screenshotsData.startTime,
      finish: screenshotsData.stopTime,
      interval: screenshotsData.interval,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('values', values);
      setRunning(true);
    },
  });

  const handleStop = (e) => {
    setRunning(false);
  };

  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  return (
    <div>
      <form className='row g-3' onSubmit={formik.handleSubmit}>
        <div className='col-md-6'>
          <label htmlFor='description' className='form-label'>
            Start Time
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.start}
            id='start'
            name='start'
            type='text'
            disabled={running}
            className={`form-control ${formik.errors?.start && 'is-invalid'}`}
          ></input>
          <div className='invalid-feedback'>{formik.errors?.start}</div>
        </div>

        <div className='col-md-6'>
          <label htmlFor='description' className='form-label'>
            Stop Time
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.finish}
            id='finish'
            name='finish'
            type='text'
            disabled={running}
            className={`form-control ${formik.errors?.finish && 'is-invalid'}`}
          ></input>
          <div className='invalid-feedback'>{formik.errors?.finish}</div>
        </div>

        <div className='col-md-12'>
          <label htmlFor='jpegCreateInterval' className='form-label'>
            Interval (seconds)
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.interval}
            id='interval'
            name='interval'
            type='text'
            disabled={running}
            className={`form-control ${formik.errors?.interval && 'is-invalid'}`}
          ></input>
          <div className='invalid-feedback'>{formik.errors?.interval}</div>
        </div>

        <div className='d-grid gap-2 d-flex justify-content-start'>
          <button className='btn btn-sm btn-primary' type='submit'>
            Start
          </button>
          <button type='button' onClick={handleStop} className='btn btn-sm btn-primary'>
            Stop
          </button>
          <button type='button' onClick={onGetOneScreenshot} className='btn btn-sm btn-primary'>
            GetOne
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScreenshotsSettings;
