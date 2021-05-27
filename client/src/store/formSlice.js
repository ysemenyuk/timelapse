import { createSlice } from '@reduxjs/toolkit';

import cameraThunks from '../thunks/cameraThunks.js';

const { updateOne } = cameraThunks;

// console.log('formSlice');

const formSlice = createSlice({
  name: 'form',
  initialState: {
    show: false,
    type: null,
  },
  reducers: {
    set: (state, action) => {
      state.show = action.payload.show;
      state.type = action.payload.type;
    },
  },
  extraReducers: {
    [updateOne.fulfilled]: (state, action) => {
      state.show = false;
      state.type = null;
    },
  },
});

export const formActions = formSlice.actions;

export default formSlice.reducer;
