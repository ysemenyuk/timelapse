import React from 'react';
import cameraRepository from '../../api//camera.repository.js';

const ScreenshotStatus = ({ selectedCamera }) => {
  // const dispatch = useDispatch();

  const onGetScreenshot = async (e) => {
    const { data } = await cameraRepository.getScreenshot(selectedCamera._id);
    console.log(data);
  };

  if (selectedCamera === null) {
    return null;
  }

  return (
    <div className='col-12 mb-4'>
      <h6 className='mb-3'>Get screenshot by time</h6>
      <div className='mb-3'>
        <ul className='list-group'>
          <li className='list-group-item d-flex'>
            <div className='me-3 w-50'>Status</div>
            <span className='badge bg-danger'>Stopped</span>
          </li>
          <li className='list-group-item d-flex'>
            <div className='me-3 w-50'>Start time</div>
            <span>10:00</span>
          </li>
          <li className='list-group-item d-flex'>
            <div className='me-3 w-50'>Stop time</div>
            <span>18:00</span>
          </li>
          <li className='list-group-item d-flex'>
            <div className='me-3 w-50'>Interval</div>
            <span>1 minute</span>
          </li>
        </ul>
      </div>
      <div className='d-grid gap-2 d-flex justify-content-start'>
        <button type='button' className='btn btn-sm btn-primary'>
          Start
        </button>
        <button type='button' onClick={onGetScreenshot} className='btn btn-sm btn-primary'>
          GetOne
        </button>
      </div>
    </div>
  );
};

export default ScreenshotStatus;
