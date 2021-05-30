import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import cameraThunks from '../thunks/cameraThunks.js';

const CameraScreen = ({ selectedCamera }) => {
  // const dispatch = useDispatch();

  const handleGetScreenshot = () => {
    console.log('handleGetScreenshot');
  };

  if (selectedCamera === null) {
    return null;
  }

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Screenshot</h6>
      <div className='mb-4'>
        <img
          width='250px'
          height='200px'
          src='/files/assets/no_img.png'
          className='file_screenshot img-thumbnail'
        />
      </div>

      {/* <h6 className='mb-3'>Last screenshots</h6>
      <div className='mb-3'>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>img--2021-05-01--10-26.jpg</li>
          <li className='list-group-item'>img--2021-05-01--10-26.jpg</li>
          <li className='list-group-item'>img--2021-05-01--10-26.jpg</li>
        </ul>
      </div>

      <div className='mb-3'>
        <button className='btn btn-primary' onClick={handleGetScreenshot}>
          Get screenshot
        </button>
      </div> */}
    </div>
  );
};

export default CameraScreen;
