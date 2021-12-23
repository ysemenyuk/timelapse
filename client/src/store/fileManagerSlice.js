import { createSlice, createSelector } from '@reduxjs/toolkit';

import fileManagerThunks from '../thunks/fileManagerThunks.js';
import { cameraActions } from './cameraSlice.js';

const { fetchFiles, fetchFolders, fetchOneFolder, deletehOneFile } = fileManagerThunks;

const fileManagerSlice = createSlice({
  name: 'fileManager',
  initialState: {
    files: {},
    currentFileIndex: null,
    folders: {},
    currentFolder: null,
    foldersStack: [],
  },
  reducers: {
    setCurrentFileIndex: (state, action) => {
      state.currentFileIndex = action.payload;
    },
    nextFileIndex: (state, action) => {
      state.currentFileIndex += 1;
    },
    prewFileIndex: (state, action) => {
      state.currentFileIndex -= 1;
    },
    setcurrentFolder: (state, action) => {
      state.currentFolder = action.payload;
    },
    pushToFoldersStack: (state, action) => {
      state.foldersStack.push(action.payload);
      state.currentFolder = state.foldersStack[state.foldersStack.length - 1];
    },
    popFromFoldersStack: (state, action) => {
      state.foldersStack.pop();
      state.currentFolder = state.foldersStack[state.foldersStack.length - 1];
    },
  },
  extraReducers: {
    [fetchFiles.fulfilled]: (state, action) => {
      state.files[state.currentFolder._id] = action.payload;
    },
    [fetchFolders.fulfilled]: (state, action) => {
      state.folders[state.currentFolder._id] = action.payload;
    },
    [fetchOneFolder.fulfilled]: (state, action) => {
      state.currentFolder = action.payload;
      state.foldersStack.push(action.payload);
    },
    [deletehOneFile.fulfilled]: (state, action) => {
      const key = state.currentFolder._id;
      state.files[key] = state.files[key].filter((file) => file._id !== action.payload);
      if (state.currentFileIndex > state.files[key].length - 1) {
        state.currentFileIndex = state.files[key].length - 1;
      }
    },
  },
});

export const fileManagerActions = { ...fileManagerSlice.actions, ...fileManagerThunks };

export default fileManagerSlice.reducer;
