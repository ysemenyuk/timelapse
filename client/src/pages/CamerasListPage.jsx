import React from 'react';
import { useSelector } from 'react-redux';

import useCamerasList from '../hooks/useCamerasList.js';

import CamerasList from '../components/CamerasList/CamerasList.jsx';
import FormEditCamera from '../components/CameraForm/EditCameraForm.jsx';
import Screenshot from '../components/CameraScreenshot/CameraScreenshot.jsx';
import CameraStatus from '../components/CameraStatus/CameraStatus.jsx';
import CameraInfo from '../components/CameraInfo/CameraInfo.jsx';

const CameraListPage = () => {
  const selectedCamera = useSelector((state) => state.camera.selectedCamera);
  const form = useSelector((state) => state.form);

  const cameras = useCamerasList();

  return (
    <div className='row'>
      <div className='col-3 px-3'>
        <CamerasList cameras={cameras} selectedCamera={selectedCamera} />
      </div>

      <div className='col-6 px-3'>
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
