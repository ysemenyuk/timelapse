import { createSlice, createSelector } from '@reduxjs/toolkit';

// import { deleteOneFile } from '../thunks/fileManagerThunks.js';
// import { cameraActions } from './cameraSlice.js';

const imgViewerSlice = createSlice({
  name: 'imgViewer',
  initialState: {
    visible: false,
  },
  reducers: {
    open: (state, action) => {
      state.visible = true;
    },
    close: (state, action) => {
      state.visible = false;
    },
  },
  extraReducers: {
    // [deleteOneFile.fulfilled]: (state, action) => {
    //
    // },
  },
});

export const imgViewerActions = imgViewerSlice.actions;

export default imgViewerSlice.reducer;
