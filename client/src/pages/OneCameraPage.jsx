import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import cameraThunks from '../thunks/cameraThunks.js';
import useThunkStatus from '../hooks/useThunkStatus.js';

import FileManager from '../components/FileManager/FileManager.jsx';
// import ScreenshotsByTime from '../components/ScreenshotsByTime/ScreenshotsByTime.jsx';
// import VideosByTime from '../components/VideosByTime/VideosByTime.jsx';
// import MakeVideoFile from '../components/MakeVideoFile/MakeVideoFile.jsx';
import Screenshot from '../components/Screenshot/Screenshot.jsx';

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
        <Screenshot selectedCamera={selectedCamera} />
        {/* <Screenshots selectedCamera={selectedCamera} /> */}
        {/* <VideoStatus selectedCamera={selectedCamera} /> */}
        {/* <MakeVideoFile /> */}
      </div>
      <div className='col-9 px-3'>
        <FileManager selectedCamera={selectedCamera} />
      </div>
    </div>
  ) : fetchStatus.isLoading ? (
    <Spinner />
  ) : fetchStatus.isError ? (
    <Error />
  ) : null;
};

export default CameraPage;
