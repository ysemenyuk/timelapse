import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { cameraActions } from '../store/cameraSlice.js';
import { formActions } from '../store/formSlice.js';
import cameraThunks from '../thunks/cameraThunks.js';
import { fetchAll } from '../thunks/cameraThunks.js';

import CameraList from '../components/CameraList.jsx';
import CameraInfo from '../components/CameraInfo.jsx';
import CameraFormEdit from '../components/CameraFormEdit.jsx';
import CameraForm from '../components/CameraForm.jsx';
import CameraScreen from '../components/CameraScreen.jsx';

const CameraPage = () => {
  const dispatch = useDispatch();
  // const cameras = useSelector((state) => state.camera.allItems);
  const selectedCamera = useSelector((state) => state.camera.selectedItem);
  const form = useSelector((state) => state.form);

  // console.log('CamerasPage cameras', cameras);
  // console.log('CamerasPage selectedCamera -', selectedCamera);
  // console.log('CamerasPage form -', form);

  useEffect(() => {
    dispatch(fetchAll());
  }, []);

  return (
    <>
      <div className='row m-0'>
        <div className='col-3 px-3'>
          <CameraList />
        </div>

        {form.type === 'add' || !selectedCamera ? (
          <div className='col-4 px-3'>
            <CameraForm />
          </div>
        ) : (
          <>
            <div className='col-4 px-3'>
              {form.type === 'edit' ? <CameraFormEdit /> : <CameraInfo />}
            </div>
            <div className='col-4 px-3'>
              <CameraScreen />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CameraPage;
