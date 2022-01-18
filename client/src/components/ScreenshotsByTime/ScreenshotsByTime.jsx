import React, { useEffect, useState } from 'react';
import { Col, Button, ListGroup, Badge } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';

const screenshotsData = {
  status: 'Stopped',
  startTime: '08:00',
  stopTime: '20:00',
  screenshotInterval: 60,
};

const ScreenshotsByTime = ({ selectedCamera }) => {
  // const dispatch = useDispatch();

  // const [screenshotsData, setScreenshotsData] = useState(null);

  const { status, startTime, stopTime, screenshotInterval } = screenshotsData;

  // useEffect(async () => {
  //   const { data } = await cameraService.getScreenshotByTimeData(selectedCamera._id);
  //   console.log(data);
  //   setScreenshotsData(data);
  // }, []);

  // const getOneScreenshot = async (e) => {
  //   const { data } = await cameraService.getScreenshot(selectedCamera._id);
  //   console.log(data);
  // };

  if (!selectedCamera) {
    return null;
  }

  return (
    <Col md={12} className='mb-4'>
      <Heading lvl={6} className='mb-3'>
        Get screenshots by time
      </Heading>

      <ListGroup className='mb-3'>
        <ListGroup.Item className='d-flex'>
          <div className='me-3 w-50'>Status</div>
          <Badge bg='secondary'>{status}</Badge>
        </ListGroup.Item>
        <ListGroup.Item className='d-flex'>
          <div className='me-3 w-50'>Start time</div>
          <span>{startTime}</span>
        </ListGroup.Item>
        <ListGroup.Item className='d-flex'>
          <div className='me-3 w-50'>Stop time</div>
          <span>{stopTime}</span>
        </ListGroup.Item>
        <ListGroup.Item className='d-flex'>
          <div className='me-3 w-50'>Interval, sec</div>
          <span>{screenshotInterval}</span>
        </ListGroup.Item>
        <ListGroup.Item className='d-flex'>
          <div className='me-3 w-50'>Files/day</div>
          <span>720</span>
        </ListGroup.Item>
      </ListGroup>
      <>
        <Button variant='primary' size='sm' className='me-2'>
          Edit
        </Button>
        <Button variant='primary' size='sm' className='me-2'>
          Start
        </Button>
      </>
    </Col>
  );
};

export default ScreenshotsByTime;
