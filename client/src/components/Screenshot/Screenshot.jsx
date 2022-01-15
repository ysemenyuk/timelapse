import React from 'react';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import { Row, Col, Form, Button } from 'react-bootstrap';

const CameraScreen = ({ selectedCamera }) => {
  if (selectedCamera === null) {
    return null;
  }

  const imageSrc = !!selectedCamera.avatar
    ? `/files/${selectedCamera.avatar}`
    : `/assets/no_img.png`;

  return (
    <Col sm={12}>
      <h6 className='mb-3'>Screenshot</h6>
      <ImgWrapper width={100} height={0.5625} src={imageSrc} />
      <span>{selectedCamera.name}</span>
    </Col>
  );
};

export default CameraScreen;
