import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Col, ListGroup } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';
import { cameraActions } from '../../store/cameraSlice.js';

const CamerasList = ({ cameras, selectedCamera }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch('/');

  const handleSelectItem = (item) => () => {
    dispatch(cameraActions.selectCamera(item));
    if (match.isExact === false) {
      history.push('/');
    }
  };

  return (
    <Col md={12} className='mb-4'>
      <Heading lvl={6} className='mb-3'>
        Cameras
      </Heading>
      <ListGroup className='mb-3'>
        <Choose>
          <When condition={!cameras.length}>
            <div>No cameras.</div>
          </When>
          <Otherwise>
            {cameras.map((camera) => {
              return (
                <ListGroup.Item
                  action
                  onClick={handleSelectItem(camera)}
                  key={camera._id}
                  className={cn(selectedCamera?._id === camera._id && 'active')}
                >
                  <div className='d-flex justify-content-between align-items-start'>
                    <div className='w-75 text-truncate fw-bold'>{camera.name}</div>
                    <span
                      className={cn('badge', camera.screenshotLink ? 'bg-success' : 'bg-danger')}
                    >
                      {camera.screenshotLink ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <div className='w-75 text-truncate small'>{camera.description}</div>
                </ListGroup.Item>
              );
            })}
          </Otherwise>
        </Choose>
      </ListGroup>
      <>
        <Link className='btn btn-sm btn-primary' to='/form'>
          Add camera
        </Link>
      </>
    </Col>
  );
};

export default CamerasList;
