import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { cameraActions } from '../store/cameraSlice.js';
import cameraThunks from '../thunks/cameraThunks.js';
import useThunkStatus from '../hooks/useThunkStatus.js';

import CameraList from '../components/CameraList.jsx';
import CameraForm from '../components/CameraForm.jsx';

const CameraFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const fetchAllCameras = useThunkStatus(cameraThunks.fetchAll);

  const cameras = useSelector((state) => state.camera.allCameras);
  const selectedCamera = useSelector((state) => state.camera.selectedCamera);

  useEffect(async () => {
    if (cameras.length === 0) {
      await dispatch(cameraThunks.fetchAll());
      dispatch(cameraActions.selectItem(null));
    }
  }, []);

  useEffect(() => {
    if (selectedCamera !== null) {
      dispatch(cameraActions.selectItem(null));
    }
  }, []);

  return fetchAllCameras.isPending ? (
    <div className='d-flex justify-content-center'>
      <div className='spinner-border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  ) : (
    <div className='row'>
      <div className='col-3 px-3'>
        <CameraList />
      </div>
      <div className='col-6 px-3'>
        <CameraForm />
      </div>
    </div>
  );
};

export default CameraFormPage;
