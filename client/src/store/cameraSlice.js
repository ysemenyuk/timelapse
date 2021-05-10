import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

console.log('cameraSlice');

const fetchAll = createAsyncThunk('camera/fetchAll', async () => {
  try {
    const response = await axios.get(apiRoutes.cameras());
    console.log('fetchAll2 response.data -', response.data);
    return response.data;
  } catch (e) {
    console.log('fetchAll2 error -', e.message);
    throw e;
  }
});

const cameraSlice = createSlice({
  name: 'cameras',
  initialState: {
    allItems: [],
    selectedItem: null,
  },
  reducers: {
    fetchAll: (state, action) => {
      // console.log('action', action);
      state.allItems = action.payload;
      state.selectedItem = action.payload[0];
    },
    updateOne: (state, action) => {
      // console.log('action addOne -', action);
      const updatedItem = action.payload;
      const updatedItemIndex = state.allItems.findIndex(
        (item) => item._id === updatedItem._id
      );
      state.allItems[updatedItemIndex] = updatedItem;
      state.selectedItem = updatedItem;
    },
    addOne: (state, action) => {
      // console.log('action addOne -', action);
      state.allItems.push(action.payload);
      state.selectedItem = action.payload;
    },
    deleteOne: (state, action) => {
      // console.log('action addOne -', action);
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
    selectItem: (state, action) => {
      // console.log('action', action);
      state.selectedItem = action.payload;
    },
  },
  extraReducers: {
    [fetchAll.fulfilled]: (state, action) => {
      state.allItems = action.payload;
      state.selectedItem = action.payload[0];
    },
  },
});

export const cameraActions = cameraSlice.actions;

export default cameraSlice.reducer;
