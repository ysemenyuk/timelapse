import React from 'react';
// import { useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import CamerasList from '../components/CamerasList.jsx';
import CameraAddForm from '../components/CameraForm.jsx';

const CameraFormPage = () => {
  return (
    <div className='row'>
      <div className='col-3 px-3'>
        <CamerasList selectedCamera={null} />
      </div>
      <div className='col-6 px-3'>
        <CameraAddForm />
      </div>
    </div>
  );
};

export default CameraFormPage;
