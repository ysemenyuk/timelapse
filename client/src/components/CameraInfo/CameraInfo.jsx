import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formActions } from '../../store/formSlice.js';
import cameraThunks from '../../thunks/cameraThunks.js';
import { Col, Button, ListGroup, Badge } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';
import { useSocket } from '../../hooks/useSocket.js';

const CameraInfo = ({ selectedCamera }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [messages, sendMessage] = useSocket();

  const handleDelete = async () => {
    dispatch(cameraThunks.deleteOne(selectedCamera));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(formActions.showEditForm(true));
  };

  const handleCameraPage = () => {
    history.push(`/cameras/${selectedCamera._id}`);
  };

  if (selectedCamera === null) {
    return null;
  }

  return (
    <Col md={12} className='mb-4'>
      <Heading lvl={6} className='mb-3'>
        CameraInfo
      </Heading>
      <ListGroup className='mb-3'>
        <ListGroup.Item>
          <div className='w-50 me-3'>Name:</div>
          <div className='w-75 text-truncate text-muted'>{selectedCamera.name}</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className='w-50 me-3'>Description:</div>
          <div className='w-75 text-truncate text-muted'>{selectedCamera.description}</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className='d-flex justify-content-between align-items-start'>
            <div className='me-3'>Screenshot Link:</div>
            <span
              className={cn('badge', selectedCamera.screenshotLink ? 'bg-success' : 'bg-danger')}
            >
              {selectedCamera.screenshotLink ? 'Online' : 'Offline'}
            </span>
          </div>
          <div className='w-75 text-truncate text-muted'>
            {selectedCamera.screenshotLink || 'Empty link'}
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className='d-flex justify-content-between align-items-start'>
            <div className='me-3'>Make screenshots by time</div>
            <span className='badge bg-secondary'>Stopped</span>
          </div>
          <div className='w-75 text-truncate text-muted'>
            Start: 08:00, Stop: 20:00, Interval: 60 seconds, Files: 720
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className='d-flex justify-content-between align-items-start'>
            <div className='me-3'>Make video of the day</div>
            <span className='badge bg-secondary'>Stopped</span>
          </div>
          <div className='w-75 text-truncate text-muted'>Video file length: 60 seconds</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className='d-flex justify-content-between align-items-start'>
            <div className='me-3'>Total screenshot files:</div>
            <span className='badge bg-info'>5000</span>
          </div>
          <div className='w-75 text-truncate text-muted'>From: 01.01.2022, To: 20.01.2022</div>
        </ListGroup.Item>
      </ListGroup>

      <>
        <Button onClick={handleEdit} variant='primary' size='sm' className='me-2'>
          Edit
        </Button>
        <Button onClick={handleDelete} variant='primary' size='sm' className='me-2'>
          Delete
        </Button>
        <Button onClick={handleCameraPage} variant='info' size='sm' className='me-2'>
          Files
        </Button>
      </>
      <Button onClick={sendMessage} variant='info' size='sm' className='me-2'>
        Message
      </Button>
    </Col>
  );
};

export default CameraInfo;
