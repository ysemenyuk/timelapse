import React from 'react';

const ScreenshotsStatus = ({ screenshotsData }) => {

  return (
    <div className='mb-3'>
      <ul className='list-group'>
        <li className='list-group-item d-flex'>
          <div className='me-3 w-50'>Status</div>
          <span className='badge bg-danger'>{screenshotsData.status}</span>
        </li>
        <li className='list-group-item d-flex'>
          <div className='me-3 w-50'>Files per day</div>
          <span>1000</span>
        </li>
        <li className='list-group-item d-flex'>
          <div className='me-3 w-50'>Total files</div>
          <span>18000</span>
        </li>
      </ul>
    </div>
  );
};

export default ScreenshotsStatus;
