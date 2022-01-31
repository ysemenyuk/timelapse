import React, { useState } from 'react';
import { Col, Button, ListGroup, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Heading from '../UI/Heading.jsx';
import { getFilesPerDay } from '../../utils/utils.js';
import { modalActions } from '../../store/modalSlice.js';
import { EDIT_SCREENSHOT_SETTINGS } from '../../utils/constants.js';

const initialValues = {
  status: 'Stopped',
  startTime: '08:00',
  stopTime: '20:00',
  screenshotInterval: 60,
};

function ScreenshotsByTime({ selectedCamera }) {
  const dispatch = useDispatch();

  // const [screenshotsData, setScreenshotsData] = useState(data);
  const [running, setRunning] = useState(false);

  const { startTime, stopTime, screenshotInterval } = initialValues;

  const handleOpenEditModal = () => {
    dispatch(modalActions.openModal({
      type: EDIT_SCREENSHOT_SETTINGS,
      data: { initialValues },
    }));
  };

  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
  };

  if (!selectedCamera) {
    return null;
  }

  return (
    <Col md={12} className="mb-4">
      <Heading lvl={6} className="mb-3">
        Get screenshots by time
      </Heading>

      <ListGroup className="mb-3">
        <ListGroup.Item className="d-flex">
          <div className="me-3 w-50">Status</div>
          <Badge bg={running ? 'success' : 'secondary'}>{running ? 'Running' : 'Stopped'}</Badge>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex">
          <div className="me-3 w-50">Start time</div>
          <span>{startTime}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex">
          <div className="me-3 w-50">Stop time</div>
          <span>{stopTime}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex">
          <div className="me-3 w-50">Interval, sec</div>
          <span>{screenshotInterval}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex">
          <div className="me-3 w-50">Files/day</div>
          <span>{getFilesPerDay(initialValues)}</span>
        </ListGroup.Item>
      </ListGroup>
      <>
        <Button onClick={handleOpenEditModal} variant="primary" size="sm" className="me-2">
          Edit
        </Button>
        <Button disabled={!running} onClick={handleStop} variant="primary" size="sm" className="me-2">
          Stop
        </Button>
        <Button disabled={running} onClick={handleStart} variant="primary" size="sm" className="me-2">
          Start
        </Button>
      </>
    </Col>
  );
}

export default ScreenshotsByTime;
