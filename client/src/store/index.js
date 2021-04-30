import { createSlice, configureStore } from '@reduxjs/toolkit';

const camerasSlice = createSlice({
  name: 'cameras',
  initialState: {
    allItems: [],
    selectedCamera: {},
  },
  reducers: {
    fetchAll: (state, action) => {
      console.log('action', action);
      state.allItems = action.payload;
      state.selectedCamera = action.payload[0];
    },
    selectItem: (state, action) => {
      console.log('action', action);
      state.selectedCamera = action.payload;
    },
  },
});

export const camerasActions = camerasSlice.actions;

export const camerasReducer = camerasSlice.reducer;

export default () => configureStore({
  reducer: {
    cameras: camerasReducer,
  },
});
