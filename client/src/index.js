import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/favicon.ico';
import '../assets/style.css';

import initApp from './initApp.jsx';
import createStore from './store/index.js';

const store = createStore();

ReactDOM.render(
  initApp(store),
  document.getElementById('root'),
);
