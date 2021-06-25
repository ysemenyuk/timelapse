import { createSlice } from '@reduxjs/toolkit';

import folderThunks from '../thunks/folderThunks.js';
import cameraThunks from '../thunks/cameraThunks.js';

import { cameraActions } from './cameraSlice.js';

const folderSlice = createSlice({
  name: 'folder',
  initialState: {
    folders: [],
    currentFolder: null,
    stack: [],
  },
  reducers: {
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
    [cameraActions.selectCamera]: (state, action) => {
      state.currentFolder = null;
      state.stack = [];
    },
    [folderThunks.fetchAll.fulfilled]: (state, action) => {
      state.folders = action.payload;
    },
    [cameraThunks.fetchOne.fulfilled]: (state, action) => {
      // state.currentFolder = null;
      // state.stack = [];
    },
  },
});

export const folderActions = folderSlice.actions;

export default folderSlice.reducer;
