import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { cameraActions } from '../store/cameraSlice.js';

import CameraList from '../components/CameraList.jsx';
import CameraForm from '../components/CameraForm.jsx';

const CameraFormPage = () => {
  return (
    <div className='row'>
      <div className='col-3 px-3'>
        <CameraList selectedCamera={null} />
      </div>
      <div className='col-6 px-3'>
        <CameraForm />
      </div>
    </div>
  );
};

export default CameraFormPage;
