import React from 'react';

import ImgWrapper from '../ImgWrapper/ImgWrapper.jsx';

const CameraScreen = ({ selectedCamera }) => {
  if (selectedCamera === null) {
    return null;
  }

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Screenshot</h6>

      <ImgWrapper width={'80'} height={'56.25'} src={`/files/${selectedCamera.avatar}`} />
    </div>
  );
};

export default CameraScreen;
