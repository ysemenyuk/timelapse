import { createAsyncThunk } from '@reduxjs/toolkit';

import cameraRepository from '../api/camera.repository.js';

const fetchAll = createAsyncThunk('camera/fetchAll', async () => {
  try {
    const { data } = await cameraRepository.getAll();
    console.log('fetchAll response.data -', data);
    return data;
  } catch (e) {
    console.log('fetchAll error -', e.message);
    throw e;
  }
});

const fetchOne = createAsyncThunk('camera/fetchOne', async (id) => {
  try {
    const { data } = await cameraRepository.getOne(id);
    console.log('fetchOne response.data -', data);
    return data;
  } catch (e) {
    console.log('fetchOne error -', e.message);
    throw e;
  }
});

const createOne = createAsyncThunk('camera/createOne', async (values) => {
  try {
    console.log('createOne values -', values);

    const { data } = await cameraRepository.createOne(values);
    console.log('createOne response.data -', data);
    return data;
  } catch (e) {
    console.log('createOne error -', e.message);
    throw e;
  }
});

const updateOne = createAsyncThunk('camera/updateOne', async (values) => {
  try {
    console.log('updateOne values -', values);

    const { data } = await cameraRepository.updateOne(values._id, values);

    console.log('updateOne response.data -', data);
    return data;
  } catch (e) {
    console.log('updateOne error -', e.message);
    throw e;
  }
});

const deleteOne = createAsyncThunk('camera/deleteOne', async (id) => {
  try {
    const { data } = await cameraRepository.deleteOne(id);

    console.log('deleteOne response -', data);
    return data;
  } catch (e) {
    console.log('deleteOne error -', e.message);
    throw e;
  }
});

export default { fetchAll, fetchOne, createOne, updateOne, deleteOne };
