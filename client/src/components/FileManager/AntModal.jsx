import React, { useState, useEffect } from 'react';
import { Modal, Image, Spin } from 'antd';

const AntModal = ({ files, fileIndex, visible, onCloseModal }) => {
  if (fileIndex === null) {
    return null;
  }

  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(false);
  }, [fileIndex]);

  return (
    <Modal
      title={files[fileIndex].date}
      footer={null}
      centered
      visible={visible}
      onOk={onCloseModal}
      onCancel={onCloseModal}
      width={1000}>
      <Spin spinning={!load}>
        <Image
          onLoad={() => setLoad(true)}
          width={'100%'}
          src={`/files/${files[fileIndex].original}`}
          preview={false}
          // placeholder={<Spin />}
        />
      </Spin>
    </Modal>
  );
};

export default AntModal;
