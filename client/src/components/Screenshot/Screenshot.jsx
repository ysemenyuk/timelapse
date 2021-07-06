import React from 'react';

import ImgWrapper from '../ImgWrapper/ImgWrapper.jsx';

const CameraScreen = ({ selectedCamera }) => {
  if (selectedCamera === null) {
    return null;
  }

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Screenshot</h6>
      <ImgWrapper
        width={80}
        height={0.5625}
        src={`/files/${selectedCamera.avatar}`}
      />
      <span>{selectedCamera.name}</span>
    </div>
  );
};

export default CameraScreen;
