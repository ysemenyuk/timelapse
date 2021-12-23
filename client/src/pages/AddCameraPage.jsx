import React from 'react';
import useCamerasList from '../hooks/useCamerasList.js';
import CamerasList from '../components/CamerasList/CamerasList.jsx';
import AddCameraForm from '../components/CameraForm/AddCameraForm.jsx';
import Spinner from '../components/UI/Spinner.jsx';
import Error from '../components/UI/Error.jsx';
import { Col, Row } from 'react-bootstrap';

const AddCameraPage = () => {
  const { cameras, fetchStatus } = useCamerasList();

  return fetchStatus.isSuccess ? (
    <Row>
      <Col sm={3}>
        <CamerasList cameras={cameras} selectedCamera={null} />
      </Col>
      <Col sm={6}>
        <AddCameraForm />
      </Col>
    </Row>
  ) : fetchStatus.isLoading ? (
    <Spinner />
  ) : fetchStatus.isError ? (
    <Error />
  ) : null;
};

export default AddCameraPage;
