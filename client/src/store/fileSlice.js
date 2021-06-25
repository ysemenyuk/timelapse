import { createSlice, current } from '@reduxjs/toolkit';

import fileThunks from '../thunks/fileThunks.js';

const { fetchAll } = fileThunks;

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    files: [],
    selectedFile: null,
  },
  reducers: {
    selectFile: (state, action) => {
      state.selectedFile = action.payload;
    },
  },
  extraReducers: {
    [fetchAll.fulfilled]: (state, action) => {
      state.files = action.payload;
    },
  },
});

export const fileActions = fileSlice.actions;

export default fileSlice.reducer;
