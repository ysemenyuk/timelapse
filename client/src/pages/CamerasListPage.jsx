import React from 'react';
import { useSelector } from 'react-redux';

import useCamerasList from '../hooks/useCamerasList.js';

import CamerasList from '../components/CamerasList/CamerasList.jsx';
import FormEditCamera from '../components/CameraForm/EditCameraForm.jsx';
import Screenshot from '../components/Screenshot/Screenshot.jsx';
import CameraStatus from '../components/CameraStatus/CameraStatus.jsx';
import CameraInfo from '../components/CameraInfo/CameraInfo.jsx';

import Spinner from '../components/UI/Spinner.jsx';
import Error from '../components/UI/Error.jsx';

const CameraListPage = () => {
  const selectedCamera = useSelector((state) => state.camera.selectedCamera);
  const formEdit = useSelector((state) => state.form);

  const { cameras, fetchStatus } = useCamerasList();

  return fetchStatus.isSuccess ? (
    <div className='row'>
      <div className='col-3 px-3'>
        <CamerasList cameras={cameras} selectedCamera={selectedCamera} />
      </div>

      <div className='col-6 px-3'>
        <CameraStatus selectedCamera={selectedCamera} />
        {formEdit.show ? (
          <FormEditCamera selectedCamera={selectedCamera} />
        ) : (
          <CameraInfo selectedCamera={selectedCamera} />
        )}
      </div>

      <div className='col-3 px-3'>
        <Screenshot selectedCamera={selectedCamera} />
      </div>
    </div>
  ) : fetchStatus.isLoading ? (
    <Spinner />
  ) : fetchStatus.isError ? (
    <Error />
  ) : null;
};

export default CameraListPage;
