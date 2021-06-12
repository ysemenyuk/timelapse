import React from 'react';

const CameraInfo = ({ selectedCamera }) => {
  return (
    <div className='mb-3'>
      <ul className='list-group'>
        <li className='list-group-item'>
          <div className='me-3'>Name: </div>
          <div className='col-9 text-truncate fw-bold'>{selectedCamera.name}</div>
        </li>
        <li className='list-group-item'>
          <div className='me-3'>Description: </div>
          <div className='col-9 text-truncate fw-bold'>{selectedCamera.description}</div>
        </li>
        <li className='list-group-item'>
          <div className='d-flex justify-content-between align-items-start'>
            <div className='me-3'>Screenshot Link: </div>
            <span className='badge bg-success'>ok</span>
          </div>
          <div className='col-9 text-truncate text-muted'>{selectedCamera.jpegLink}</div>
        </li>
      </ul>
    </div>
  );
};

export default CameraInfo;
