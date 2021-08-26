import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import cameraThunks from '../thunks/cameraThunks.js';
import useThunkStatus from '../hooks/useThunkStatus.js';

import FileManager from '../components/FileManager/FileManager.jsx';
import ImgViewer from '../components/ImgViewer/ImgViewer.jsx';

import ScreenshotsByTime from '../components/ScreenshotsByTime/ScreenshotsByTime.jsx';
import VideosByTime from '../components/VideosByTime/VideosByTime.jsx';
import Screenshot from '../components/Screenshot/Screenshot.jsx';

import Spinner from '../components/UI/Spinner.jsx';
import Error from '../components/UI/Error.jsx';

const CameraPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const fetchOneCamera = useThunkStatus(cameraThunks.fetchOne);
  const selectedCamera = useSelector((state) => state.camera.selectedCamera);

  useEffect(() => {
    if (selectedCamera === null) {
      dispatch(cameraThunks.fetchOne(id));
    }
  }, []);

  return fetchOneCamera.isSuccess || selectedCamera ? (
    <div className='row'>
      <div className='col-3 px-3'>
        <Screenshot selectedCamera={selectedCamera} />
        <ScreenshotsByTime selectedCamera={selectedCamera} />
        <VideosByTime selectedCamera={selectedCamera} />
      </div>
      <div className='col-9 px-3'>
        <FileManager selectedCamera={selectedCamera} />
        <ImgViewer selectedCamera={selectedCamera} />
      </div>
    </div>
  ) : fetchOneCamera.isLoading ? (
    <Spinner />
  ) : fetchOneCamera.isError ? (
    <Error />
  ) : null;
};

export default CameraPage;
