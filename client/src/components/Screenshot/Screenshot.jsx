import React from 'react';

import ImgWrapper from '../ImgWrapper/ImgWrapper.jsx';

const CameraScreen = ({ selectedCamera }) => {
  if (selectedCamera === null) {
    return null;
  }

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Screenshot</h6>

      <ImgWrapper src={`/files/${selectedCamera.avatar}?size=thumbnail`} desc={'desc'} />

      {/* <div className='mb-3'>
        <img
          // height='165px'
          width='250px'
          src={`/files/${selectedCamera.avatar}?size=thumbnail`}
          className='img-thumbnail'
        />
      </div> */}
    </div>
  );
};

export default CameraScreen;
