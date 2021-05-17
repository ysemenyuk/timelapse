import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import cameraThunks from '../thunks/cameraThunks.js';
import useThunkStatus from '../hooks/useThunkStatus.js';

import CameraFormEdit from '../components/CameraFormEdit.jsx';
import CameraFiles from '../components/CameraFiles.jsx';
import CameraStatus from '../components/CameraStatus.jsx';

import Spinner from '../components/Spinner.jsx';
import Error from '../components/Error.jsx';

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

  return selectedCamera !== null ? (
    <div className='row'>
      <div className='col-3 px-3'>
        <CameraStatus />
        <CameraFormEdit selectedCamera={selectedCamera} />
      </div>
      <div className='col-9 px-3'>
        <CameraFiles selectedCamera={selectedCamera} />
      </div>
    </div>
  ) : fetchCamera.isLoading ? (
    <Spinner />
  ) : fetchCamera.isError ? (
    <Error />
  ) : null;
};

export default CameraPage;
