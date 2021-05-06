import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { camerasActions } from './store/index.js';
import apiRoutes from './apiRoutes.js';

import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import MainInfo from './components/MainInfo.jsx';

// import CameraInfo from './components/CameraInfo.jsx';
// import CameraForm from './components/CameraForm.jsx';

const App = () => {
  const dispatch = useDispatch();
  const cameras = useSelector((state) => state.cameras.allItems);
  // const selectedCamera = useSelector((state) => state.cameras.selectedItem);

  useEffect(() => {
    axios
      .get(apiRoutes.cameras())
      .then((resp) => {
        console.log('App useEffect resp -', resp);
        dispatch(camerasActions.fetchAll(resp.data));
      })
      .catch((err) => console.log('err', err));
  }, []);

  console.log('App cameras', cameras);

  return (
    <div className='container p-2'>
      <Navbar />
      <div className='row m-0'>
        <div className='col-3 px-3'>
          <Sidebar />
        </div>
        <div className='col-9 px-3'>
          <MainInfo />
        </div>
      </div>
    </div>
  );
};

export default App;
