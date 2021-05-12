import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { cameraActions } from '../store/cameraSlice.js';
// import { formActions } from '../store/formSlice.js';
import cameraThunks from '../thunks/cameraThunks.js';

import CameraList from '../components/CameraList.jsx';
// import CameraInfo from '../components/CameraInfo.jsx';
import CameraFormEdit from '../components/CameraFormEdit.jsx';
// import CameraStatus from '../components/CameraStatus.jsx';
import CameraScreen from '../components/CameraScreen.jsx';

const CameraListPage = () => {
  const dispatch = useDispatch();

  const cameras = useSelector((state) => state.camera.allItems);
  const selectedCamera = useSelector((state) => state.camera.selectedItem);
  // const form = useSelector((state) => state.form);

  useEffect(() => {
    if (selectedCamera === null && cameras.length !== 0) {
      dispatch(cameraActions.selectItem(cameras[0]));
    }
  }, []);

  useEffect(() => {
    if (cameras.length === 0) {
      dispatch(cameraThunks.fetchAll());
    }
  }, []);

  return (
    <>
      <div className='row m-0'>
        <div className='col-3 px-3'>
          <CameraList />
        </div>

        <div className='col-6 px-3'>
          {/* {form.type === 'edit' ? <CameraFormEdit /> : <CameraInfo />} */}
          <CameraFormEdit />
        </div>
        <div className='col-3 px-3'>
          {/* <CameraStatus /> */}
          <CameraScreen />
        </div>
      </div>
    </>
  );
};

export default CameraListPage;
