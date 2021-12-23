import React from 'react';
import { useSelector } from 'react-redux';
import useCamerasList from '../hooks/useCamerasList.js';
import CamerasList from '../components/CamerasList/CamerasList.jsx';
import FormEditCamera from '../components/CameraForm/EditCameraForm.jsx';
import Screenshot from '../components/Screenshot/Screenshot.jsx';
import CameraStatus from '../components/CameraStatus/CameraStatus.jsx';
import CameraInfo from '../components/CameraInfo/CameraInfo.jsx';
import Spinner from '../components/UI/Spinner.jsx';
import Error from '../components/UI/Error.jsx';
import { Col, Row } from 'react-bootstrap';

const CameraListPage = () => {
  const selectedCamera = useSelector((state) => state.camera.selectedCamera);
  const formEdit = useSelector((state) => state.form);

  const { cameras, fetchStatus } = useCamerasList();

  return fetchStatus.isSuccess ? (
    <Row>
      <Col sm={3}>
        <CamerasList cameras={cameras} selectedCamera={selectedCamera} />
      </Col>

      <Col sm={6}>
        {formEdit.show ? (
          <FormEditCamera selectedCamera={selectedCamera} />
        ) : (
          <CameraInfo selectedCamera={selectedCamera} />
        )}
        <CameraStatus selectedCamera={selectedCamera} />
      </Col>

      <Col sm={3}>
        <Screenshot selectedCamera={selectedCamera} />
      </Col>
    </Row>
  ) : fetchStatus.isLoading ? (
    <Spinner />
  ) : fetchStatus.isError ? (
    <Error />
  ) : null;
};

export default CameraListPage;
