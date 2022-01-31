import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CamerasList from '../components/CamerasList/CamerasList.jsx';
import AddCameraForm from '../components/AddCamera/AddCamera.jsx';
import Spinner from '../components/UI/Spinner.jsx';
import Error from '../components/UI/Error.jsx';
import cameraThunks from '../thunks/cameraThunks.js';
import useThunkStatus from '../hooks/useThunkStatus.js';

function AddCameraPage() {
  const dispatch = useDispatch();
  const allCameras = useSelector((state) => state.camera.allCameras);

  const fetchStatus = useThunkStatus(cameraThunks.fetchAll);

  useEffect(() => {
    if (allCameras.length === 0) {
      dispatch(cameraThunks.fetchAll());
    }
  }, []);

  return (
    <Choose>
      <When condition={fetchStatus.isSuccess}>
        <Row>
          <Col md={3}>
            <CamerasList cameras={allCameras} selectedCamera={null} />
          </Col>
          <Col md={6}>
            <AddCameraForm />
          </Col>
        </Row>
      </When>

      <When condition={fetchStatus.isLoading}>
        <Spinner />
      </When>

      <When condition={fetchStatus.isError}>
        <Error />
      </When>
    </Choose>
  );
}

export default AddCameraPage;
