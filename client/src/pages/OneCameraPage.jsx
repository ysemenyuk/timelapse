import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import cameraThunks from '../thunks/cameraThunks.js';
import useThunkStatus from '../hooks/useThunkStatus.js';

import CameraFiles from '../components/CameraFiles/CameraFiles.jsx';
import Screenshots from '../components/Screenshots/Screenshots.jsx';
// import VideoStatus from '../components/VideoStatus/VideoStatus.jsx';
import MakeVideoFile from '../components/MakeVideoFile/MakeVideoFile.jsx';
// import CameraScreenshot from '../components/CameraScreenshot/CameraScreenshot.jsx';

import Spinner from '../components/Spinner.jsx';
import Error from '../components/Error.jsx';

const CameraPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const fetchStatus = useThunkStatus(cameraThunks.fetchOne);
  const selectedCamera = useSelector((state) => state.camera.selectedCamera);

  useEffect(() => {
    if (selectedCamera === null) {
      dispatch(cameraThunks.fetchOne(id));
    }
  }, []);

  return fetchStatus.isSuccess || selectedCamera ? (
    <div className='row'>
      <div className='col-3 px-3'>
        {/* <CameraScreenshot selectedCamera={selectedCamera} /> */}
        <Screenshots selectedCamera={selectedCamera} />
        {/* <VideoStatus selectedCamera={selectedCamera} /> */}
        <MakeVideoFile />
      </div>
      <div className='col-9 px-3'>
        <CameraFiles selectedCamera={selectedCamera} />
      </div>
    </div>
  ) : fetchStatus.isLoading ? (
    <Spinner />
  ) : fetchStatus.isError ? (
    <Error />
  ) : null;
};

export default CameraPage;
