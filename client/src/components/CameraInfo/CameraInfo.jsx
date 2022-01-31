import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Col, Button, ListGroup, Spinner } from 'react-bootstrap';
import cameraThunks from '../../thunks/cameraThunks.js';
import Heading from '../UI/Heading.jsx';
import { EDIT_CAMERA_SETTINGS } from '../../utils/constants.js';
import EditCameraModal from './EditCameraModal.jsx';
import { modalActions } from '../../store/modalSlice.js';
import useThunkStatus from '../../hooks/useThunkStatus.js';

function CameraInfo({ selectedCamera }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const modal = useSelector((state) => state.modal);
  const fetchStatus = useThunkStatus(cameraThunks.deleteOne);

  const isVisibleEditCameraModal = modal[EDIT_CAMERA_SETTINGS] || false;

  const handleDelete = async () => {
    dispatch(cameraThunks.deleteOne(selectedCamera));
  };

  const openEditCameraModal = () => {
    dispatch(modalActions.openModal(EDIT_CAMERA_SETTINGS));
  };

  const closeEditCameraModal = () => {
    dispatch(modalActions.closeModal(EDIT_CAMERA_SETTINGS));
  };

  const handleCameraPage = () => {
    history.push(`/cameras/${selectedCamera._id}`);
  };

  if (selectedCamera === null) {
    return null;
  }

  return (
    <Col md={12} className="mb-4">
      <Heading lvl={6} className="mb-3">
        CameraInfo
      </Heading>
      <ListGroup className="mb-3">
        <ListGroup.Item>
          <div className="w-50 me-3">Name:</div>
          <div className="w-75 text-truncate text-muted">{selectedCamera.name}</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="w-50 me-3">Description:</div>
          <div className="w-75 text-truncate text-muted">{selectedCamera.description}</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="d-flex justify-content-between align-items-start">
            <div className="me-3">Screenshot Link:</div>
            <span
              className={cn('badge', selectedCamera.screenshotLink ? 'bg-success' : 'bg-danger')}
            >
              {selectedCamera.screenshotLink ? 'Online' : 'Offline'}
            </span>
          </div>
          <div className="w-75 text-truncate text-muted">
            {selectedCamera.screenshotLink || 'Empty link'}
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="d-flex justify-content-between align-items-start">
            <div className="me-3">Make screenshots by time</div>
            <span className="badge bg-secondary">Stopped</span>
          </div>
          <div className="w-75 text-truncate text-muted">
            Start: 08:00, Stop: 20:00, Interval: 60 seconds, Files: 720
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="d-flex justify-content-between align-items-start">
            <div className="me-3">Make video of the day</div>
            <span className="badge bg-secondary">Stopped</span>
          </div>
          <div className="w-75 text-truncate text-muted">Video file length: 60 seconds</div>
        </ListGroup.Item>
      </ListGroup>

      <>
        <Button onClick={openEditCameraModal} variant="primary" size="sm" className="me-2">
          EditCamera
        </Button>
        <Button onClick={handleDelete} variant="primary" size="sm" className="me-2">
          DeleteCamera
          {' '}
          {fetchStatus.isLoading && <Spinner as="span" animation="border" size="sm" />}
        </Button>
        <Button onClick={handleCameraPage} variant="info" size="sm" className="me-2">
          FilesPage
        </Button>
      </>

      <EditCameraModal
        initialValues={selectedCamera}
        show={isVisibleEditCameraModal}
        onHide={closeEditCameraModal}
      />
    </Col>
  );
}

export default CameraInfo;
