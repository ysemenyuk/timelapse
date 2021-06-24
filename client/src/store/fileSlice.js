import { createSlice } from '@reduxjs/toolkit';

import fileThunks from '../thunks/fileThunks.js';

const { fetchAll } = fileThunks;

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    allItems: [],
    selectedItem: null,
  },
  reducers: {
    selectFile: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
  extraReducers: {
    [fetchAll.fulfilled]: (state, action) => {
      state.allItems = action.payload;
    },
  },
});

export const fileActions = fileSlice.actions;

export default fileSlice.reducer;
