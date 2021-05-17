import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { cameraActions } from '../store/cameraSlice.js';
import cameraThunks from '../thunks/cameraThunks.js';
import useThunkStatus from '../hooks/useThunkStatus.js';

import Spinner from './Spinner.jsx';
import Error from './Error.jsx';

const List = ({ cameras, selectedCamera, onSelectItem }) => {
  if (cameras.length === 0) {
    return <div>No cameras.</div>;
  }

  return cameras.map((camera) => {
    const activeClass = selectedCamera?._id === camera._id && 'active';
    return (
      <button
        onClick={onSelectItem(camera)}
        key={camera._id}
        type='button'
        className={`list-group-item list-group-item-action ${activeClass}`}
        aria-current='true'
      >
        <div className='fw-bold'>{camera.name}</div>
        <small>{camera.description}</small>
      </button>
    );
  });
};

const CameraList = ({ selectedCamera }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch('/');
  const fetchAllCameras = useThunkStatus(cameraThunks.fetchAll);

  const cameras = useSelector((state) => state.camera.allCameras);

  useEffect(() => {
    if (cameras.length === 0) {
      dispatch(cameraThunks.fetchAll());
    }
  }, []);

  const handleSelectItem = (item) => () => {
    dispatch(cameraActions.selectCamera(item));
    if (match.isExact === false) {
      history.push('/');
    }
  };

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>List</h6>
      <div className='list-group mb-3'>
        {fetchAllCameras.isSuccess ? (
          <List
            cameras={cameras}
            selectedCamera={selectedCamera}
            onSelectItem={handleSelectItem}
          />
        ) : fetchAllCameras.isLoading ? (
          <Spinner />
        ) : fetchAllCameras.isError ? (
          <Error />
        ) : null}
      </div>
      <div>
        <Link className='btn btn-primary' to='/form'>
          Add camera
        </Link>
      </div>
    </div>
  );
};

export default CameraList;
