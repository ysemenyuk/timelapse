import React from 'react';
// import {useSelector, useDispatch } from 'react-redux';

const CameraStatus = ({ selectedCamera }) => {
  // const dispatch = useDispatch();

  if (selectedCamera === null) {
    return null;
  }

  return (
    <div className='col-12 mb-4'>
      <h6 className='mb-3'>CameraStatus</h6>
      <div className='mb-3'>
        <ul className='list-group'>
          <li className='list-group-item d-flex justify-content-between'>
            <div className='me-3'>Screenshots by time</div>
            <span className='badge bg-danger'>Stopped</span>
          </li>
          <li className='list-group-item d-flex justify-content-between'>
            <div className='me-3'>Video by time</div>
            <span className='badge bg-danger'>Stopped</span>
          </li>
          <li className='list-group-item d-flex justify-content-between'>
            <div className='me-3'>Total files</div>
            <span>1000</span>
          </li>
          <li className='list-group-item d-flex justify-content-between'>
            <div className='me-3'>Total videos</div>
            <span>3</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CameraStatus;
