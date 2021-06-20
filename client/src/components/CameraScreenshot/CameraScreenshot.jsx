import React from 'react';

const CameraScreen = ({ selectedCamera }) => {
  if (selectedCamera === null) {
    return null;
  }

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Screenshot</h6>
      <div className='mb-3'>
        <img
          // height='165px'
          width='250px'
          src='/files/assets/no_img.png'
          className='img-thumbnail'
        />
      </div>
    </div>
  );
};

export default CameraScreen;
