import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import cameraThunks from '../thunks/cameraThunks.js';

import CameraSidebar from '../components/CameraSidebar.jsx';
import CameraInfo from '../components/CameraInfo.jsx';
import CameraForm from '../components/CameraForm.jsx';

const CameraListPage = () => {
  const dispatch = useDispatch();
  const cameras = useSelector((state) => state.camera.allItems);
  const selectedCamera = useSelector((state) => state.camera.selectedItem);
  const form = useSelector((state) => state.form);

  // console.log('CamerasPage cameras', cameras);
  // console.log('CamerasPage selectedCamera -', selectedCamera);
  // console.log('CamerasPage form -', form);

  useEffect(() => {
    dispatch(cameraThunks.fetchAll());
  }, []);

  return (
    <div className='row m-0'>
      <div className='col-3 px-3'>
        <CameraSidebar />
      </div>
      <div className='col-9 px-3'>
        {form.show || !selectedCamera ? <CameraForm /> : <CameraInfo />}
      </div>
    </div>
  );
};

export default CameraListPage;
