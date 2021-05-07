import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { camerasActions } from './store/index.js';
import apiRoutes from './apiRoutes.js';

import Navbar from './components/Navbar.jsx';
import CamerasPage from './pages/CamerasPage.jsx';

const App = () => {
  console.log('App');

  return (
    <div className='container p-2'>
      <Navbar />
      <CamerasPage />
    </div>
  );
};

export default App;
