import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CameraList from '../components/CameraList.jsx';
import CameraForm from '../components/CameraForm.jsx';

const CameraFormPage = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn) {
    return <Redirect to='/login' />;
  }

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
