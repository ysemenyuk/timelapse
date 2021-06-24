import { createAsyncThunk } from '@reduxjs/toolkit';

import cameraRepo from '../api/camera.repository.js';

const fetchAll = createAsyncThunk('folder/fetchAll', async ({ cameraId, parentId }) => {
  try {
    console.log('folder/fetchAll cameraId parentId -', { cameraId, parentId });

    const response = await cameraRepo.getFolders(cameraId, parentId);

    console.log('folder/fetchAll response.data -', response.data);

    return response.data;
  } catch (e) {
    console.log('folder/fetchAll error -', e.message);
    throw e;
  }
});

const fetchOne = createAsyncThunk('folder/fetchOne', async ({ cameraId, parentId }) => {
  try {
    console.log('folder/fetchOne cameraId parentId -', { cameraId, parentId });

    const response = await cameraRepo.getOneFolder(cameraId, parentId);

    console.log('folder/fetchOne response.data -', response.data);

    return response.data;
  } catch (e) {
    console.log('folder/fetchOne error -', e.message);
    throw e;
  }
});

export default { fetchAll, fetchOne };
