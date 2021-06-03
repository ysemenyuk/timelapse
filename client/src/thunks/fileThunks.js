import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../api/routes.js';

// console.log("thunks");

const fetchAll = createAsyncThunk('file/fetchAll', async (parentId) => {
  try {
    console.log('fetchAll files parentId -', parentId);
    const response = await axios.get(`/api/files?parentId=${parentId}`);

    console.log('fetchAll files response.data -', response.data);
    return response.data;
  } catch (e) {
    console.log('fetchAll error -', e.message);
    throw e;
  }
});

const fetchOne = createAsyncThunk('file/fetchOne', async (id) => {
  try {
    // const response = await axios.get();
    // console.log("fetchOne response.data -", response.data);
    // return response.data;
  } catch (e) {
    console.log('fetchOne error -', e.message);
    throw e;
  }
});

const createOne = createAsyncThunk('file/createOne', async (values) => {
  try {
    // const response = await axios.post(, values);
    // console.log("createOne response.data -", response.data);
    // return response.data;
  } catch (e) {
    console.log('createOne error -', e.message);
    throw e;
  }
});

const updateOne = createAsyncThunk('file/updateOne', async (values) => {
  try {
    console.log('updateOne values -', values);
    // const response = await axios.put(, values);
    // console.log("updateOne response.data -", response.data);
    // return response.data;
  } catch (e) {
    console.log('updateOne error -', e.message);
    throw e;
  }
});

const deleteOne = createAsyncThunk('file/deleteOne', async (file) => {
  try {
    console.log('deleteOne file -', file);
    // const response = await axios.delete();
    // console.log("deleteOne response.data -", response.data);
    // return camera;
  } catch (e) {
    console.log('deleteOne error -', e.message);
    throw e;
  }
});

export default { fetchAll, fetchOne, createOne, updateOne, deleteOne };
