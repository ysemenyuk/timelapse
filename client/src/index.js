import React from 'react';
import ReactDOM from 'react-dom';

// import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/favicon.ico';
import '../assets/style.css';

import initApp from './initApp.jsx';
import createStore from './store/index.js';

console.log('index-1');
const store = createStore();
console.log('index-2');
ReactDOM.render(initApp(store), document.getElementById('root'));
