import { createSlice } from '@reduxjs/toolkit';

import fileThunks from '../thunks/fileThunks.js';

const { fetchAll, fetchOne, createOne, updateOne, deleteOne } = fileThunks;

// console.log("fileSlice");

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    allItems: [],
    selectedFile: null,
    currentDir: null,
    dirStack: [],
    view: 'plate',
  },
  reducers: {
    selectFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    setCurrentDir: (state, action) => {
      state.currentDir = action.payload;
    },
    pushToDirStack: (state, action) => {
      state.dirStack.push(action.payload.currentDir);
    },
    popFromDirStack: (state, action) => {
      state.dirStack.pop();
    },
  },
  extraReducers: {
    [fetchAll.fulfilled]: (state, action) => {
      state.allItems = action.payload;
    },
    [fetchOne.fulfilled]: (state, action) => {
      state.selectedFile = action.payload;
    },
    [createOne.fulfilled]: (state, action) => {
      // console.log('action createOne -', action);
    },
    [updateOne.fulfilled]: (state, action) => {
      // console.log('action updateOne -', action);
    },
    [deleteOne.fulfilled]: (state, action) => {
      // console.log('action deleteOne -', action);
    },
  },
});

export const fileActions = fileSlice.actions;

export default fileSlice.reducer;
