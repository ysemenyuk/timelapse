import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { camerasActions } from '../store/index.js';
import apiRoutes from '../apiRoutes.js';

import CameraSidebar from '../components/CameraSidebar.jsx';
import CameraInfo from '../components/CameraInfo.jsx';
import CameraForm from '../components/CameraForm.jsx';

const CamerasPage = () => {
  const dispatch = useDispatch();
  // const cameras = useSelector((state) => state.cameras.allItems);
  const selectedCamera = useSelector((state) => state.cameras.selectedItem);
  const form = useSelector((state) => state.form);

  // console.log('CamerasPage cameras', cameras);
  console.log('CamerasPage selectedCamera -', selectedCamera);
  console.log('CamerasPage form -', form);

  useEffect(() => {
    axios
      .get(apiRoutes.cameras())
      .then((resp) => {
        console.log('CamerasPage useEffect resp -', resp);
        dispatch(camerasActions.fetchAll(resp.data));
      })
      .catch((err) => console.log('err', err));
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

export default CamerasPage;
