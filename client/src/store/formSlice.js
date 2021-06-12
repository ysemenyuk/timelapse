import { createSlice } from '@reduxjs/toolkit';

import cameraThunks from '../thunks/cameraThunks.js';

const { updateOne } = cameraThunks;

// console.log('formSlice');

const formSlice = createSlice({
  name: 'form',
  initialState: {
    show: false,
  },
  reducers: {
    showEditForm: (state, action) => {
      state.show = action.payload;
    },
  },
  extraReducers: {
    [updateOne.fulfilled]: (state, action) => {
      state.show = false;
    },
  },
});

export const formActions = formSlice.actions;

export default formSlice.reducer;
