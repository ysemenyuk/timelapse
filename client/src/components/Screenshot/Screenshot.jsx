import React from 'react';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import { Col } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';

const CameraScreen = ({ selectedCamera }) => {
  if (selectedCamera === null) {
    return null;
  }

  const imageSrc = !!selectedCamera.avatar
    ? `/files/${selectedCamera.avatar}`
    : `/assets/no_img.png`;

  return (
    <Col md={12} className='mb-4'>
      <Heading lvl={6} className='mb-3'>
        Screenshot
      </Heading>
      <ImgWrapper width={100} height={0.5625} src={imageSrc} />
      <span>{selectedCamera.name}</span>
    </Col>
  );
};

export default CameraScreen;
