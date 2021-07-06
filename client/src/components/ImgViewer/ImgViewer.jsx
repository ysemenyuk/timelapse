import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Image, Spin } from 'antd';

import ImgWrapper from '../ImgWrapper/ImgWrapper.jsx';

import { fileManagerActions } from '../../store/fileManagerSlice.js';
import { imgViewerActions } from '../../store/imgViewerSlice.js';

const ImgViewer = () => {
  const dispatch = useDispatch();

  const { files, currentFileIndex } = useSelector((state) => state.fileManager);
  const { visible } = useSelector((state) => state.imgViewer);

  const nextImgBtnDisabled = currentFileIndex === files.length - 1;
  const prewImgBtnDisabled = currentFileIndex === 0;

  const closeModalHandler = () => {
    dispatch(imgViewerActions.close());
  };

  const nextImageHandler = () => {
    dispatch(fileManagerActions.nextFileIndex());
  };

  const prewImageHandler = () => {
    dispatch(fileManagerActions.prewFileIndex());
  };

  const deleteImageHandler = () => {
    console.log('delete', files[currentFileIndex]);
    dispatch(fileManagerActions.deletehOneFile({ fileId: files[currentFileIndex]._id }));
  };

  if (currentFileIndex === null || !visible) {
    return null;
  }

  return (
    <Modal
      title={files[currentFileIndex]?.date}
      footer={[
        <Button key='prew' onClick={prewImageHandler} disabled={prewImgBtnDisabled}>
          PrewItem
        </Button>,
        <Button key='next' onClick={nextImageHandler} disabled={nextImgBtnDisabled}>
          NextItem
        </Button>,
        <Button key='delete' onClick={deleteImageHandler}>
          Delete
        </Button>,
        <Button key='close' onClick={closeModalHandler}>
          Close
        </Button>,
      ]}
      centered
      visible={visible}
      onOk={closeModalHandler}
      onCancel={closeModalHandler}
      width={900}>
      <ImgWrapper width={100} height={0.5625} src={`/files/${files[currentFileIndex]?.name}`} />
    </Modal>
  );
};

export default ImgViewer;
