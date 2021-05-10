import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { cameraActions } from '../store/cameraSlice.js';
import { formActions } from '../store/formSlice.js';

import apiRoutes from '../apiRoutes.js';

export const fetchAll = createAsyncThunk('camera/fetchAll', async () => {
  try {
    const response = await axios.get(apiRoutes.cameras());
    console.log('fetchAll2 response.data -', response.data);
    return response.data;
  } catch (e) {
    console.log('fetchAll2 error -', e.message);
    throw e;
  }
});

console.log('thunks');

// const fetchAll = () => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(apiRoutes.cameras());
//       dispatch(cameraActions.fetchAll(data));
//     } catch (e) {
//       console.log('fetchAll error', e.message);
//       // alert(e.message);
//     }
//   };
// };

const createOne = (values, { setSubmitting, resetForm, setFieldError }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(apiRoutes.cameras(), values);
      resetForm();
      setSubmitting(false);
      // console.log('form onSubmit addOne resp data -', data);
      dispatch(cameraActions.addOne(data));
      dispatch(formActions.set({ show: false, type: null }));
    } catch (err) {
      setSubmitting(false);
      setFieldError('networkError', 'networkError');
      console.log('catch err -', err);
    }
  };
};

const updateOne = (values, { setSubmitting, resetForm, setFieldError }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        apiRoutes.cameraPath(values._id),
        values
      );
      resetForm();
      setSubmitting(false);
      // console.log('form onSubmit updateOne resp data -', data);
      dispatch(cameraActions.updateOne(data));
      dispatch(formActions.set({ show: false, type: null }));
    } catch (err) {
      setSubmitting(false);
      setFieldError('networkError', 'networkError');
      console.log('catch err -', err);
    }
  };
};

const deleteOne = (selectedCamera) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        apiRoutes.cameraPath(selectedCamera._id)
      );
      // console.log('form onSubmit resp data -', data);
      dispatch(cameraActions.deleteOne(selectedCamera));
    } catch (err) {
      console.log('catch err -', err);
    }
  };
};

export default { createOne, updateOne, deleteOne };
