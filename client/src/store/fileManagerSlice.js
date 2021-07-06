import { createSlice, createSelector } from '@reduxjs/toolkit';

import fileManagerThunks from '../thunks/fileManagerThunks.js';
import { cameraActions } from './cameraSlice.js';

const { fetchFiles, fetchFolders, deletehOneFile } = fileManagerThunks;

const fileManagerSlice = createSlice({
  name: 'fileManager',
  initialState: {
    files: [],
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
    setCurrentFolder: (state, action) => {
      state.currentFolder = action.payload;
    },
    pushToFoldersStack: (state, action) => {
      state.currentFolder = action.payload;
      state.foldersStack.push(action.payload);
    },
    popFromFoldersStack: (state, action) => {
      state.foldersStack.pop();
      state.currentFolder = state.foldersStack.length
        ? state.foldersStack[state.foldersStack.length - 1]
        : null;
    },
  },
  extraReducers: {
    [fetchFiles.fulfilled]: (state, { payload }) => {
      state.files = { ...state.files, ...payload };
      // state.files = action.payload;
    },
    [fetchFolders.fulfilled]: (state, { payload }) => {
      state.folders = { ...state.folders, ...payload };
      // state.folders = action.payload;
    },
    [deletehOneFile.fulfilled]: (state, action) => {
      state.files = state.files.filter((file) => file._id !== action.payload);
      if (state.currentFileIndex > state.files.length - 1) {
        state.currentFileIndex = state.files.length - 1;
      }
    },
    [cameraActions.selectCamera]: (state, action) => {
      state.currentFolder = null;
      state.foldersStack = [];
    },
  },
});

export const selectFilesByCurrentFolder = createSelector(
  (state) => state.files.files,
  (state) => state.files.currentFolder,
  (files, currentFolder) => files.filter((file) => file.parent === currentFolder._id)
);

export const fileManagerActions = { ...fileManagerSlice.actions, ...fileManagerThunks };

export default fileManagerSlice.reducer;
