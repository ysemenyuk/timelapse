import { createSlice, createSelector } from '@reduxjs/toolkit';
import fileManagerThunks from '../thunks/fileManagerThunks.js';
// import { cameraActions } from './cameraSlice.js';

const { fetchFiles, fetchFolders, fetchMainFolder, deletehOneFile } = fileManagerThunks;

const fileManagerSlice = createSlice({
  name: 'fileManager',
  initialState: {
    files: {},
    folders: {},
    parent: {},
    stack: {},
    currentFileIndex: null,
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
      const { cameraId, folder } = action.payload;
      const index = state.stack[cameraId].findIndex((item) => item._id === folder._id);
      if (index) {
        state.stack[cameraId] = state.stack[cameraId].slice(0, index + 1);
      } else {
        state.stack[cameraId] = [folder];
      }
      state.parent[cameraId] = folder;
    },
    pushToFoldersStack: (state, action) => {
      const { cameraId, folder } = action.payload;
      state.stack[cameraId].push(folder);
      state.parent[cameraId] = state.stack[cameraId][state.stack[cameraId].length - 1];
    },
    popFromFoldersStack: (state, action) => {
      const { cameraId } = action.payload;
      state.stack[cameraId].pop();
      state.parent[cameraId] = state.stack[cameraId][state.stack[cameraId].length - 1];
    },
  },
  extraReducers: {
    [fetchFiles.fulfilled]: (state, action) => {
      const { parentId, data } = action.payload;
      state.files[parentId] = data;
    },
    [fetchFolders.fulfilled]: (state, action) => {
      const { parentId, data } = action.payload;
      state.folders[parentId] = data;
    },
    [fetchMainFolder.fulfilled]: (state, action) => {
      const { cameraId, data } = action.payload;
      state.parent[cameraId] = data;
      state.stack[cameraId] = [data];
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
