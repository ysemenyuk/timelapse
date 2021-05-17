import React from 'react';
import { useSelector } from 'react-redux';

// import { cameraActions } from '../store/cameraSlice.js';

import CameraList from '../components/CameraList.jsx';
import CameraFormEdit from '../components/CameraFormEdit.jsx';
import CameraScreen from '../components/CameraScreen.jsx';
// import CameraStatus from '../components/CameraStatus.jsx';
// import CameraInfo from '../components/CameraInfo.jsx';

const CameraListPage = () => {
  // const dispatch = useDispatch();

  const selectedCamera = useSelector((state) => state.camera.selectedCamera);

  return (
    <div className='row'>
      <div className='col-3 px-3'>
        <CameraList selectedCamera={selectedCamera} />
      </div>
      <div className='col-6 px-3'>
        <CameraFormEdit selectedCamera={selectedCamera} />
      </div>
      <div className='col-3 px-3'>
        <CameraScreen selectedCamera={selectedCamera} />
        {/* <CameraStatus selectedCamera={selectedCamera} /> */}
      </div>
    </div>
  );
};

export default CameraListPage;
