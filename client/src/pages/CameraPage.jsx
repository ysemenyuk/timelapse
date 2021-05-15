import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import cameraThunks from '../thunks/cameraThunks.js';
import useThunkStatus from '../hooks/useThunkStatus.js';

import CameraFormEdit from '../components/CameraFormEdit.jsx';
import CameraFiles from '../components/CameraFiles.jsx';
// import CameraStatus from '../components/CameraStatus.jsx';

const CameraPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const fetchCamera = useThunkStatus(cameraThunks.fetchOne);

  const selectedCamera = useSelector((state) => state.camera.selectedCamera);

  useEffect(() => {
    if (selectedCamera === null) {
      dispatch(cameraThunks.fetchOne(id));
    }
  }, []);

  return fetchCamera.isPending ? (
    <div className='d-flex justify-content-center'>
      <div className='spinner-border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  ) : (
    <div className='row'>
      <div className='col-3 px-3'>
        {/* <CameraStatus /> */}
        <CameraFormEdit />
      </div>
      <div className='col-9 px-3'>
        <CameraFiles />
      </div>
    </div>
  );
};

export default CameraPage;
