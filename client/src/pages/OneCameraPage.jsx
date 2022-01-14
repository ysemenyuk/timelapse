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
import { Col, Row } from 'react-bootstrap';

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

  return (
    <Choose>
      <When condition={fetchOneCamera.isSuccess || selectedCamera}>
        <Row>
          <Col sm={3}>
            <Screenshot selectedCamera={selectedCamera} />
            <ScreenshotsByTime selectedCamera={selectedCamera} />
            <VideosByTime selectedCamera={selectedCamera} />
          </Col>
          <Col sm={9}>
            <FileManager selectedCamera={selectedCamera} />
            <ImgViewer selectedCamera={selectedCamera} />
          </Col>
        </Row>
      </When>

      <When condition={fetchOneCamera.isLoading}>
        <Spinner />
      </When>

      <When condition={fetchOneCamera.isError}>
        <Error />
      </When>
    </Choose>
  );
};

export default CameraPage;
