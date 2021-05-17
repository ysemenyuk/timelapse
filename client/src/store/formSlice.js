import { createSlice } from '@reduxjs/toolkit';

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
    [fetchAll.fulfilledupdateOne.fulfilled]: (state, action) => {
      state.show = false;
      state.type = null;
    },
  },
});

export const formActions = formSlice.actions;

export default formSlice.reducer;
