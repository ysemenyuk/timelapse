import React, { useState } from 'react';
import { Col, Button, ListGroup, Badge } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';
import EditSettingsModal from './EditSettingsModal.jsx';
import { getFilesPerDay } from '../../utils/utils.js';

const data = {
  status: 'Stopped',
  startTime: '08:00',
  stopTime: '20:00',
  screenshotInterval: 60,
};

function ScreenshotsByTime({ selectedCamera }) {
  const [screenshotsData, setScreenshotsData] = useState(data);

  // useEffect(async () => {
  //   const { data } = await cameraService.getScreenshotByTimeData(selectedCamera._id);
  //   console.log(data);
  //   setScreenshotsData(data);
  // }, []);

  const [running, setRunning] = useState(false);
  const [visible, setVisible] = useState(false);

  const { startTime, stopTime, screenshotInterval } = screenshotsData;

  const handleCloseSettings = () => {
    setVisible(false);
  };

  const handleOpenSettings = () => {
    setVisible(true);
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
          <span>{getFilesPerDay(screenshotsData)}</span>
        </ListGroup.Item>
      </ListGroup>
      <>
        <Button onClick={handleOpenSettings} variant="primary" size="sm" className="me-2">
          Edit
        </Button>
        <Button disabled={!running} onClick={handleStop} variant="primary" size="sm" className="me-2">
          Stop
        </Button>
        <Button disabled={running} onClick={handleStart} variant="primary" size="sm" className="me-2">
          Start
        </Button>
      </>

      <EditSettingsModal
        screenshotsData={screenshotsData}
        visible={visible}
        onClose={handleCloseSettings}
        onSubmit={setScreenshotsData}
      />
    </Col>
  );
}

export default ScreenshotsByTime;
