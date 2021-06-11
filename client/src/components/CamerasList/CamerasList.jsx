import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { cameraActions } from '../../store/cameraSlice.js';

import List from './List.jsx';
import Spinner from '../Spinner.jsx';
import Error from '../Error.jsx';

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
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>List</h6>
      <div className='list-group mb-3'>
        {cameras.isSuccess ? (
          <List
            cameras={cameras.cameras}
            selectedCamera={selectedCamera}
            onSelectItem={handleSelectItem}
          />
        ) : cameras.isLoading ? (
          <Spinner />
        ) : cameras.isError ? (
          <Error />
        ) : null}
      </div>
      <div>
        <Link className='btn btn-sm btn-primary' to='/form'>
          Add camera
        </Link>
      </div>
    </div>
  );
};

export default CamerasList;
