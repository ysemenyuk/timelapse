import React from 'react';
import { useSelector } from 'react-redux';

// import { formActions } from '../store/formSlice.js';
// import cameraThunks from '../thunks/cameraThunks.js';

const CameraStatus = () => {
  const selectedCamera = useSelector((state) => state.camera.selectedItem);

  // console.log('CameraStatus selectedCamera -', selectedCamera);

  if (selectedCamera === null) {
    return <div>No selected camera.</div>;
  }

  return (
    <div className='col-12 px-3 mb-4'>
      <h6 className='mb-1'>Status</h6>
      <div className='mb-4'>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item d-flex justify-content-between align-items-start'>
            <div>rtspLink</div>
            <span className='badge bg-success'>Ok</span>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start'>
            <div>jpgLink</div>
            <span className='badge bg-danger'>Bad</span>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start'>
            <div>create Jpg with interval</div>
            <span className='badge bg-danger'>stop</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CameraStatus;
