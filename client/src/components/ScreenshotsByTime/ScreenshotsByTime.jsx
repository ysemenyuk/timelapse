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
  interval: 60,
};

function ScreenshotsByTime({ selectedCamera, row }) {
  const dispatch = useDispatch();

  // const [screenshotsData, setScreenshotsData] = useState(data);
  const [running, setRunning] = useState(false);

  const { startTime, stopTime, interval } = initialValues;
  const files = getFilesPerDay(initialValues);

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
      <Choose>
        <When condition={row}>
          <ListGroup className="mb-3">
            <ListGroup.Item>
              <div className="d-flex justify-content-between align-items-start">
                <div className="me-3">Make screenshots by time</div>
                <Badge bg={running ? 'success' : 'secondary'}>{running ? 'Running' : 'Stopped'}</Badge>
              </div>
              <div className="w-75 text-truncate text-muted">
                {`Start: ${startTime}, Stop: ${stopTime}, Interval: ${interval} sec, Files/day: ${files}`}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </When>
        <Otherwise>
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
              <span>{interval}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex">
              <div className="me-3 w-50">Files/day</div>
              <span>{files}</span>
            </ListGroup.Item>
          </ListGroup>
        </Otherwise>
      </Choose>

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
