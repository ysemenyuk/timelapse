import React from 'react';
import { Provider } from 'react-redux';

import App from './App.jsx.js';

const initApp = (store) => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default initApp;
