import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import apiRoutes from '../apiRoutes.js';
import { getAuthHeader } from './helpers.js';

const fetchAll = createAsyncThunk('camera/fetchAll', async () => {
  try {
    const response = await axios.get(apiRoutes.cameras(), {
      headers: getAuthHeader(),
    });
    console.log('fetchAll response.data -', response.data);
    return response.data;
  } catch (e) {
    console.log('fetchAll error -', e.message);
    throw e;
  }
});

const fetchOne = createAsyncThunk('camera/fetchOne', async (id) => {
  try {
    const response = await axios.get(apiRoutes.cameraPath(id), {
      headers: getAuthHeader(),
    });
    console.log('fetchOne response.data -', response.data);
    return response.data;
  } catch (e) {
    console.log('fetchOne error -', e.message);
    throw e;
  }
});

const createOne = createAsyncThunk('camera/createOne', async (values) => {
  try {
    const response = await axios.post(apiRoutes.cameras(), values, {
      headers: getAuthHeader(),
    });
    console.log('createOne response.data -', response.data);
    return response.data;
  } catch (e) {
    console.log('createOne error -', e.message);
    throw e;
  }
});

const updateOne = createAsyncThunk('camera/updateOne', async (values) => {
  try {
    console.log('updateOne values -', values);
    const response = await axios.put(apiRoutes.cameraPath(values._id), values, {
      headers: getAuthHeader(),
    });
    console.log('updateOne response.data -', response.data);
    return response.data;
  } catch (e) {
    console.log('updateOne error -', e.message);
    throw e;
  }
});

const deleteOne = createAsyncThunk('camera/deleteOne', async (camera) => {
  try {
    const response = await axios.delete(apiRoutes.cameraPath(camera._id), {
      headers: getAuthHeader(),
    });
    console.log('deleteOne response -', response);
    return camera;
  } catch (e) {
    console.log('deleteOne error -', e.message);
    throw e;
  }
});

export default { fetchAll, fetchOne, createOne, updateOne, deleteOne };
