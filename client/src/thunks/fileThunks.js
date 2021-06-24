import { createAsyncThunk } from '@reduxjs/toolkit';

import cameraRepo from '../api/camera.repository.js';

const fetchAll = createAsyncThunk('file/fetchAll', async ({ cameraId, parentId }) => {
  try {
    console.log('file/fetchAll cameraId, parentId -', { cameraId, parentId });

    const response = await cameraRepo.getFiles(cameraId, parentId);

    console.log('file/fetchAll response.data -', response.data);

    return response.data;
  } catch (e) {
    console.log('file/fetchAll error -', e.message);
    throw e;
  }
});

export default { fetchAll };
