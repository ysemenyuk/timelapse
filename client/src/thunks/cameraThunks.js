import { createAsyncThunk } from '@reduxjs/toolkit';

import cameraRepository from '../api/camera.repository.js';

const fetchAll = createAsyncThunk('camera/fetchAll', async () => {
  try {
    const { data } = await cameraRepository.getAll();
    console.log('camera/fetchAll response.data -', data);
    return data;
  } catch (e) {
    console.log('camera/fetchAll error -', e.message);
    throw e;
  }
});

const fetchOne = createAsyncThunk('camera/fetchOne', async (id) => {
  try {
    const { data } = await cameraRepository.getOne(id);
    console.log('camera/fetchOne response.data -', data);
    return data;
  } catch (e) {
    console.log('camera/fetchOne error -', e.message);
    throw e;
  }
});

const createOne = createAsyncThunk('camera/createOne', async (values) => {
  try {
    console.log('camera/createOne values -', values);

    const { data } = await cameraRepository.createOne(values);
    console.log('createOne response.data -', data);
    return data;
  } catch (e) {
    console.log('camera/createOne error -', e.message);
    throw e;
  }
});

const updateOne = createAsyncThunk('camera/updateOne', async (values) => {
  try {
    console.log('camera/updateOne values -', values);

    const { data } = await cameraRepository.updateOne(values._id, values);

    console.log('camera/updateOne response.data -', data);
    return data;
  } catch (e) {
    console.log('camera/updateOne error -', e.message);
    throw e;
  }
});

const deleteOne = createAsyncThunk('camera/deleteOne', async (camera) => {
  try {
    console.log('camera/deleteOne camera -', camera);

    const { data } = await cameraRepository.deleteOne(camera._id);

    console.log('camera/deleteOne response -', data);
    return camera;
  } catch (e) {
    console.log('camera/deleteOne error -', e.message);
    throw e;
  }
});

export default { fetchAll, fetchOne, createOne, updateOne, deleteOne };
