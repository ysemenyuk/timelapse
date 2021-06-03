import React from 'react';
import ReactDOM from 'react-dom';

// import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../assets/favicon.ico';
import '../assets/style.css';

import initApp from './App/init.jsx';
import createStore from './store/index.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'app:*';
}

// const userInfo = JSON.parse(localStorage.getItem('userInfo'));
// console.log('userInfo', userToken);

const store = createStore();

ReactDOM.render(initApp(store), document.getElementById('root'));
