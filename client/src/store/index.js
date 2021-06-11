import { configureStore } from '@reduxjs/toolkit';

import cameraReducer from './cameraSlice.js';
import formReducer from './formSlice.js';
import thunkReducer from './thunkSlice.js';
import userReducer from './user.slice.js';

// console.log('store');

export default () =>
  configureStore({
    reducer: {
      user: userReducer,
      camera: cameraReducer,
      form: formReducer,
      thunk: thunkReducer,
    },
  });
