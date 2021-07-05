import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Row, Col, Button, Space, Typography, Alert, Spin } from 'antd';
const { Title } = Typography;

import fileThunks from '../../thunks/fileThunks.js';
import cameraThunks from '../../thunks/cameraThunks.js';

import useThunkStatus from '../../hooks/useThunkStatus.js';

import { fileActions } from '../../store/fileSlice.js';

import Breadcrumbs from './Breadcrumbs/Breadcrumbs.jsx';
import FilesList from './FileList/FilesList.jsx';
import FoldersList from './FolderList/FoldersList.jsx';
import ImgModal from './ImgModal/ImgModal.jsx';

const CameraFiles = ({ selectedCamera }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [fileIndex, setFileIndex] = useState(null);

  const fetchFiles = useThunkStatus(fileThunks.fetchFiles);
  const fetchFolders = useThunkStatus(fileThunks.fetchFolders);

  const { files, folders, currentFolder, stack } = useSelector((state) => state.files);

  const cameraId = selectedCamera._id;
  const parentId = currentFolder ? currentFolder._id : selectedCamera.mainFolder;

  useEffect(() => {
    dispatch(fileThunks.fetchFiles({ cameraId, parentId }));
    dispatch(fileThunks.fetchFolders({ cameraId, parentId }));
  }, [currentFolder]);

  const clickFileHandler = (fileIndex) => {
    setFileIndex(fileIndex);
    setVisible(true);
  };

  const closeModalHandler = () => {
    // setFileIndex(null);
    setVisible(false);
  };

  const clickFolderHandler = (folder) => {
    dispatch(fileActions.pushToStack(folder));
  };

  const backHandler = () => {
    dispatch(fileActions.popFromStack());
  };

  const refreshHandler = () => {
    dispatch(fileThunks.fetchFiles({ cameraId, parentId }));
    dispatch(fileThunks.fetchFolders({ cameraId, parentId }));
  };

  const createScreenshotHandler = async (e) => {
    dispatch(cameraThunks.createScreenshot(cameraId));
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={5}>Files</Title>
          <Space>
            <Button
              type='primary'
              onClick={backHandler}
              disabled={fetchFolders.isLoading || fetchFiles.isLoading}>
              Back
            </Button>
            <Button
              type='primary'
              onClick={refreshHandler}
              disabled={fetchFolders.isLoading || fetchFiles.isLoading}>
              Refresh
            </Button>
            <Button
              type='primary'
              onClick={createScreenshotHandler}
              disabled={fetchFolders.isLoading || fetchFiles.isLoading}>
              CreateScreenshot
            </Button>
          </Space>

          <Breadcrumbs stack={stack} />
        </Col>
      </Row>

      {fetchFolders.isSuccess && fetchFiles.isSuccess ? (
        <>
          <Row gutter={[16, 16]}>
            <FoldersList folders={folders} onClickFolder={clickFolderHandler} />
            <FilesList files={files} onClickFile={clickFileHandler} />
          </Row>
        </>
      ) : fetchFolders.isLoading || fetchFiles.isLoading ? (
        <Spin />
      ) : fetchFolders.isError || fetchFiles.isError ? (
        <Alert message='Network error' type='error' />
      ) : null}

      <ImgModal
        files={files}
        fileIndex={fileIndex}
        visible={visible}
        onCloseModal={closeModalHandler}
      />
    </>
  );
};

//v1.pro.ant.design/docs/new-component

export default CameraFiles;
