import { createSlice } from '@reduxjs/toolkit';

import fileThunks from '../thunks/fileThunks.js';

const { fetchAll, fetchOne, createOne, updateOne, deleteOne } = fileThunks;

console.log('fileSlice');

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
      // console.log('action', action);
      state.selectedFile = action.payload;
    },
    setCurrentDir: (state, action) => {
      // console.log('action', action);
      state.currentDir = action.payload;
    },
    pushToDirStack: (state, action) => {
      // console.log('action', action);
      state.dirStack.push(action.payload);
    },
    popFromDirStack: (state, action) => {
      // console.log('action', action);
      const pop = state.dirStack.pop();
      state.currentDir = pop;
    },
  },
  extraReducers: {
    [fetchAll.fulfilled]: (state, action) => {
      state.allItems = action.payload;
    },
    [fetchOne.fulfilled]: (state, action) => {
      // state.selectedItem = action.payload;
    },
    [createOne.fulfilled]: (state, action) => {
      // console.log('action createOne -', action);
      // state.allItems.push(action.payload);
      // state.selectedItem = action.payload;
    },
    [updateOne.fulfilled]: (state, action) => {
      // console.log('action updateOne -', action);
      // const updatedItem = action.payload;
      // const updatedItemIndex = state.allItems.findIndex(
      //   (item) => item._id === updatedItem._id
      // );
      // state.allItems[updatedItemIndex] = updatedItem;
      // state.selectedItem = updatedItem;
    },
    [deleteOne.fulfilled]: (state, action) => {
      // console.log('action deleteOne -', action);
      // const deletedItem = action.payload;
      // state.allItems = state.allItems.filter(
      //   (item) => item._id !== deletedItem._id
      // );
    },
  },
});

export const fileActions = fileSlice.actions;

export default fileSlice.reducer;
