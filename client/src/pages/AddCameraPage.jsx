import React from 'react';

import useCamerasList from '../hooks/useCamerasList.js';

import CamerasList from '../components/CamerasList/CamerasList.jsx';
import AddCameraForm from '../components/CameraForm/AddCameraForm.jsx';

import Spinner from '../components/Spinner.jsx';
import Error from '../components/Error.jsx';

const AddCameraPage = () => {
  const { cameras, fetchStatus } = useCamerasList();

  return fetchStatus.isSuccess ? (
    <div className='row'>
      <div className='col-3 px-3'>
        <CamerasList cameras={cameras} selectedCamera={null} />
      </div>
      <div className='col-5 px-3'>
        <AddCameraForm />
      </div>
    </div>
  ) : fetchStatus.isLoading ? (
    <Spinner />
  ) : fetchStatus.isError ? (
    <Error />
  ) : null;
};

export default AddCameraPage;
