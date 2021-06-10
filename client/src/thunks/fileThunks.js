import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchAll = createAsyncThunk('file/fetchAll', async (parentId) => {
  try {
    console.log('file/fetchAll parentId -', parentId);

    const response = await axios.get(`/api/files?parentId=${parentId}`);

    console.log('file/fetchAll response.data -', response.data);

    return response.data;
  } catch (e) {
    console.log('file/fetchAll error -', e.message);
    throw e;
  }
});

export default { fetchAll };
