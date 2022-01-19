import React from 'react';
import useCamerasList from '../hooks/useCamerasList.js';
import CamerasList from '../components/CamerasList/CamerasList.jsx';
import AddCameraForm from '../components/CameraForm/AddCameraForm.jsx';
import Spinner from '../components/UI/Spinner.jsx';
import Error from '../components/UI/Error.jsx';
import { Col, Row } from 'react-bootstrap';

const AddCameraPage = () => {
  const { cameras, fetchStatus } = useCamerasList();

  return (
    <Choose>
      <When condition={fetchStatus.isSuccess}>
        <Row>
          <Col md={3}>
            <CamerasList cameras={cameras} selectedCamera={null} />
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
};

export default AddCameraPage;
