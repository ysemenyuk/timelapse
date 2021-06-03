import React from 'react';
import { useSelector } from 'react-redux';

// import { cameraActions } from '../store/cameraSlice.js';

import CamerasList from '../components/CamerasList.jsx';
import FormEditCamera from '../components/FormEditCamera.jsx';
import Screenshot from '../components/Screenshot.jsx';
import CameraStatus from '../components/CameraStatus.jsx';
import CameraInfo from '../components/CameraInfo.jsx';

const CameraListPage = () => {
  const selectedCamera = useSelector((state) => state.camera.selectedCamera);
  const form = useSelector((state) => state.form);

  return (
    <div className='row'>
      <div className='col-3 px-3'>
        <CamerasList selectedCamera={selectedCamera} />
      </div>

      <div className='col-5 px-3'>
        {form.show && form.type === 'editCamera' ? (
          <FormEditCamera selectedCamera={selectedCamera} />
        ) : (
          <CameraInfo selectedCamera={selectedCamera} />
        )}
      </div>

      <div className='col-3 px-3'>
        <Screenshot selectedCamera={selectedCamera} />
        <CameraStatus selectedCamera={selectedCamera} />
      </div>
    </div>
  );
};

export default CameraListPage;
