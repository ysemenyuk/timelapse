import React from 'react';
// import { useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import CamerasList from '../components/CamerasList.jsx';
import FormAddCamera from '../components/FormAddCamera.jsx';

const CameraFormPage = () => {
  return (
    <div className='row'>
      <div className='col-3 px-3'>
        <CamerasList selectedCamera={null} />
      </div>
      <div className='col-5 px-3'>
        <FormAddCamera />
      </div>
    </div>
  );
};

export default CameraFormPage;
