import React from 'react';

import CamerasList from '../components/CamerasList/CamerasList.jsx';
import AddCameraForm from '../components/CameraForm/AddCameraForm.jsx';

const AddCameraPage = () => {
  return (
    <div className='row'>
      <div className='col-3 px-3'>
        <CamerasList selectedCamera={null} />
      </div>
      <div className='col-5 px-3'>
        <AddCameraForm />
      </div>
    </div>
  );
};

export default AddCameraPage;
