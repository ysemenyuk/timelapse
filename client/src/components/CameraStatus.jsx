import React from 'react';
// import {useSelector, useDispatch } from 'react-redux';

// import { formActions } from '../store/formSlice.js';
// import cameraThunks from '../thunks/cameraThunks.js';

const CameraStatus = ({ selectedCamera }) => {
  // const dispatch = useDispatch();

  if (selectedCamera === null) {
    return (
      <div className='col-12 mb-3'>
        <h6 className='mb-3'>Status</h6>
        <div>No selected camera.</div>
      </div>
    );
  }

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Status</h6>
      <div className='mb-3'>
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
