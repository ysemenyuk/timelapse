import { createSlice, createSelector } from '@reduxjs/toolkit';

import fileThunks from '../thunks/fileThunks.js';
import { cameraActions } from './cameraSlice.js';

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    files: [],
    selectedFileIndex: null,
    folders: [],
    currentFolder: null,
    stack: [],
  },
  reducers: {
    selectFile: (state, action) => {
      state.selectedFileIndex = action.payload;
    },
    selectNextFile: (state, action) => {
      state.selectedFileIndex += 1;
    },
    selectPrewFile: (state, action) => {
      state.selectedFileIndex -= 1;
    },
    setCurrentFolder: (state, action) => {
      state.currentFolder = action.payload;
    },
    pushToStack: (state, action) => {
      state.currentFolder = action.payload;
      state.stack.push(action.payload);
    },
    popFromStack: (state, action) => {
      state.stack.pop();
      state.currentFolder = state.stack.length ? state.stack[state.stack.length - 1] : null;
    },
  },
  extraReducers: {
    [fileThunks.fetchFiles.fulfilled]: (state, action) => {
      state.files = action.payload;
    },
    [fileThunks.fetchFolders.fulfilled]: (state, action) => {
      state.folders = action.payload;
    },
    [cameraActions.selectCamera]: (state, action) => {
      state.currentFolder = null;
      state.stack = [];
    },
  },
});

export const selectFilesByCurrentFolder = createSelector(
  (state) => state.files.files,
  (state) => state.files.currentFolder,
  (files, currentFolder) => files.filter((file) => file.parent === currentFolder._id)
);

export const fileActions = fileSlice.actions;

export default fileSlice.reducer;
