import { createSlice } from '@reduxjs/toolkit';

import folderThunks from '../thunks/folderThunks.js';
import cameraActions from './cameraSlice.js';

const { fetchAll, fetchOne } = folderThunks;

// console.log("fileSlice");

const folderSlice = createSlice({
  name: 'folder',
  initialState: {
    allItems: [],
    currentItem: null,
    stack: [],
  },
  reducers: {
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },
    pushToStack: (state, action) => {
      state.stack.push(action.payload);
    },
    popFromStack: (state, action) => {
      state.stack.pop();
    },
  },
  extraReducers: {
    [cameraActions.selectCamera]: (state, action) => {
      console.log('cameraActions.selectCamera action.payload -', action.payload);
      // state.currentItem = ;
    },
    [fetchAll.fulfilled]: (state, action) => {
      state.allItems = action.payload;
    },
    [fetchOne.fulfilled]: (state, action) => {
      state.currentItem = action.payload;
      state.stack = [action.payload];
    },
  },
});

export const folderActions = folderSlice.actions;

export default folderSlice.reducer;
