import { createSlice, configureStore } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    type: 'read',
  },
  reducers: {
    setType: (state, action) => {
      console.log('action', action);
      state.type = action.payload;
    },
  },
});

const camerasSlice = createSlice({
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
        (item) => item.id === updatedItem.id
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
        (item) => item.id !== deletedItem.id
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
});

export const camerasActions = camerasSlice.actions;
export const formActions = formSlice.actions;

export const camerasReducer = camerasSlice.reducer;
export const formReducer = formSlice.reducer;

export default () =>
  configureStore({
    reducer: {
      cameras: camerasReducer,
      form: formReducer,
    },
  });
