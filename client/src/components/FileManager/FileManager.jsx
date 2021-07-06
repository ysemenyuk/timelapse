import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Row, Col, Button, Space, Typography, Alert, Spin } from 'antd';
const { Title } = Typography;

import useThunkStatus from '../../hooks/useThunkStatus.js';

import { cameraActions } from '../../store/cameraSlice.js';
import { fileManagerActions } from '../../store/fileManagerSlice.js';
import { imgViewerActions } from '../../store/imgViewerSlice.js';

import Breadcrumbs from './Breadcrumbs/Breadcrumbs.jsx';
import FilesList from './FileList/FilesList.jsx';
import FoldersList from './FolderList/FoldersList.jsx';

const CameraFileManager = ({ selectedCamera }) => {
  const dispatch = useDispatch();

  const fetchFiles = useThunkStatus(fileManagerActions.fetchFiles);
  const fetchFolders = useThunkStatus(fileManagerActions.fetchFolders);

  const { files, folders, currentFolder, foldersStack } = useSelector(
    (state) => state.fileManager
  );

  const cameraId = selectedCamera._id;
  const parentId = currentFolder ? currentFolder._id : selectedCamera.mainFolder;

  useEffect(() => {
    dispatch(fileManagerActions.fetchFiles({ cameraId, parentId }));
    dispatch(fileManagerActions.fetchFolders({ cameraId, parentId }));
  }, [currentFolder]);

  const clickFileHandler = (fileIndex) => {
    dispatch(fileManagerActions.setCurrentFileIndex(fileIndex));
    dispatch(imgViewerActions.open());
  };

  const clickFolderHandler = (folder) => {
    dispatch(fileManagerActions.pushToFoldersStack(folder));
  };

  const backHandler = () => {
    dispatch(fileManagerActions.popFromFoldersStack());
  };

  const refreshHandler = () => {
    dispatch(fileManagerActions.fetchFiles({ cameraId, parentId }));
    dispatch(fileManagerActions.fetchFolders({ cameraId, parentId }));
  };

  const createScreenshotHandler = async (e) => {
    dispatch(cameraActions.createScreenshot(cameraId));
  };

  return (
    <>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Title level={5}>Files</Title>
        </Col>
        <Col span={24}>
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
        </Col>
        <Col span={24}>
          <Breadcrumbs stack={foldersStack} />
        </Col>

        <Col span={24}>
          {fetchFolders.isSuccess && fetchFiles.isSuccess ? (
            <Row gutter={[16, 16]}>
              <FoldersList folders={folders} onClickFolder={clickFolderHandler} />
              <FilesList files={files} onClickFile={clickFileHandler} />
            </Row>
          ) : fetchFolders.isLoading || fetchFiles.isLoading ? (
            <Spin />
          ) : fetchFolders.isError || fetchFiles.isError ? (
            <Alert message='Network error' type='error' />
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export default CameraFileManager;
