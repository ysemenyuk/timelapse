import { configureStore } from '@reduxjs/toolkit';

import cameraReducer from './cameraSlice.js';
import fileReducer from './fileSlice.js';
import formReducer from './formSlice.js';
import thunkReducer from './thunkSlice.js';
import userReducer from './userSlice.js';

// console.log('store');

export default () =>
  configureStore({
    reducer: {
      user: userReducer,
      camera: cameraReducer,
      file: fileReducer,
      form: formReducer,
      thunk: thunkReducer,
    },
  });
