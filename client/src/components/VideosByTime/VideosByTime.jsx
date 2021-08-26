import React from 'react';
// import {useSelector, useDispatch } from 'react-redux';

// import { formActions } from '../store/formSlice.js';
// import cameraThunks from '../thunks/cameraThunks.js';

const VideoStatus = ({ selectedCamera }) => {
  // const dispatch = useDispatch();

  if (selectedCamera === null) {
    return null;
  }

  return (
    <div className='col-12 mb-4'>
      <h6 className='mb-3'>Make video file by time</h6>
      <div className='mb-3'>
        <ul className='list-group'>
          <li className='list-group-item d-flex'>
            <div className='me-3 w-50'>Status</div>
            <span className='badge bg-danger'>Stopped</span>
          </li>
          <li className='list-group-item d-flex'>
            <div className='me-3 w-50'>Video time</div>
            <span>1 minute</span>
          </li>
          <li className='list-group-item d-flex'>
            <div className='me-3 w-50'>Interval</div>
            <span>Every day</span>
          </li>
        </ul>
      </div>
      <div className='gap-2 d-flex justify-content-start'>
        <button type='button' className='btn btn-sm btn-primary'>
          Edit
        </button>
        <button type='button' className='btn btn-sm btn-primary'>
          Start
        </button>
      </div>
    </div>
  );
};

export default VideoStatus;
