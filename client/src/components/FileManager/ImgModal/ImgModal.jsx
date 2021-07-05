import React, { useState, useEffect } from 'react';
import { Modal, Image, Spin } from 'antd';

import ImgWrapper from '../../ImgWrapper/ImgWrapper.jsx';

const ImgModal = ({ files, fileIndex, visible, onCloseModal }) => {
  if (fileIndex === null) {
    return null;
  }

  // const [load, setLoad] = useState(false);

  // useEffect(() => {
  //   setLoad(false);
  // }, [fileIndex]);

  return (
    <Modal
      title={files[fileIndex]?.date}
      footer={null}
      centered
      visible={visible}
      onOk={onCloseModal}
      onCancel={onCloseModal}
      width={1000}>
      <ImgWrapper width={100} height={56.25} src={`/files/${files[fileIndex].name}`} />
    </Modal>
  );
};

export default ImgModal;
