import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Button, Image, Spin } from 'antd';

import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';

import { fileManagerActions } from '../../store/fileManagerSlice.js';
import { imgViewerActions } from '../../store/imgViewerSlice.js';

const ImgViewer = ({ selectedCamera }) => {
  const dispatch = useDispatch();

  const { files, currentFileIndex, currentFolder } = useSelector((state) => state.fileManager);
  const { visible } = useSelector((state) => state.imgViewer);

  if (currentFileIndex === null || !visible) {
    return null;
  }

  const parentId = currentFolder ? currentFolder._id : selectedCamera.mainFolder;
  const currentFile = files[parentId][currentFileIndex];

  const nextImgBtnDisabled = currentFileIndex === files[parentId].length - 1;
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
    // console.log('delete', currentFile);
    dispatch(
      fileManagerActions.deletehOneFile({
        cameraId: selectedCamera._id,
        fileId: currentFile._id,
      })
    );
  };

  return (
    <Modal
      title={currentFile?.date}
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
      <ImgWrapper width={100} height={0.5625} src={`/files/${currentFile?.name}`} />
    </Modal>
  );
};

export default ImgViewer;
