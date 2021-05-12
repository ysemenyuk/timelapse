import { createSlice } from '@reduxjs/toolkit';

import cameraThunks from '../thunks/cameraThunks.js';

const { fetchAll, fetchOne, createOne, updateOne, deleteOne } = cameraThunks;

console.log('cameraSlice');

const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    allItems: [],
    selectedItem: null,
  },
  reducers: {
    selectItem: (state, action) => {
      // console.log('action', action);
      state.selectedItem = action.payload;
    },
  },
  extraReducers: {
    [fetchAll.fulfilled]: (state, action) => {
      state.allItems = action.payload;
      if (state.selectedItem === null && action.payload.length !== 0) {
        state.selectedItem = action.payload[0];
      }
    },
    [fetchOne.fulfilled]: (state, action) => {
      state.selectedItem = action.payload;
    },
    [createOne.fulfilled]: (state, action) => {
      // console.log('action createOne -', action);
      state.allItems.push(action.payload);
      state.selectedItem = action.payload;
    },
    [updateOne.fulfilled]: (state, action) => {
      // console.log('action updateOne -', action);
      const updatedItem = action.payload;
      const updatedItemIndex = state.allItems.findIndex(
        (item) => item._id === updatedItem._id
      );
      state.allItems[updatedItemIndex] = updatedItem;
      state.selectedItem = updatedItem;
    },
    [deleteOne.fulfilled]: (state, action) => {
      // console.log('action deleteOne -', action);
      const deletedItem = action.payload;
      state.allItems = state.allItems.filter(
        (item) => item._id !== deletedItem._id
      );
      if (state.allItems.length === 0) {
        state.selectedItem = null;
      } else {
        state.selectedItem = state.allItems[0];
      }
    },
  },
});

export const cameraActions = cameraSlice.actions;

export default cameraSlice.reducer;
