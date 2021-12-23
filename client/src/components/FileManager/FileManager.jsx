import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './FileManager.module.css';
import { Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import useThunkStatus from '../../hooks/useThunkStatus.js';
import { cameraActions } from '../../store/cameraSlice.js';
import { fileManagerActions } from '../../store/fileManagerSlice.js';
import { imgViewerActions } from '../../store/imgViewerSlice.js';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs.jsx';
import FilesList from './FileList/FilesList.jsx';
import FoldersList from './FolderList/FoldersList.jsx';
import ButtonsGroup from '../UI/ButtonsGroup.jsx';

const CameraFileManager = ({ selectedCamera }) => {
  const dispatch = useDispatch();

  const fetchFiles = useThunkStatus(fileManagerActions.fetchFiles);
  const fetchFolders = useThunkStatus(fileManagerActions.fetchFolders);

  useEffect(() => {
    dispatch(
      fileManagerActions.fetchOneFolder({
        cameraId: selectedCamera._id,
        folderId: selectedCamera.mainFolder,
      })
    );
  }, []);

  const { files, folders, currentFolder, foldersStack } = useSelector(
    (state) => state.fileManager
  );

  const parentId = currentFolder?._id;
  const cameraId = selectedCamera?._id;

  const loaded =
    Object.keys(files).includes(parentId) &&
    Object.keys(folders).includes(parentId);

  useEffect(() => {
    if (!loaded && parentId) {
      dispatch(fileManagerActions.fetchFiles({ cameraId, parentId }));
      dispatch(fileManagerActions.fetchFolders({ cameraId, parentId }));
    }
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
      <Row className='mb-3'>
        <Col>
          <h6>Files</h6>
        </Col>
      </Row>
      <Row>
        <Col className='mb-3'>
          <ButtonsGroup>
            <Button
              type='primary'
              size='sm'
              onClick={backHandler}
              disabled={
                fetchFolders.isLoading ||
                fetchFiles.isLoading ||
                foldersStack.length === 1
              }
            >
              Back
            </Button>
            <Button
              type='primary'
              size='sm'
              onClick={refreshHandler}
              disabled={fetchFolders.isLoading || fetchFiles.isLoading}
            >
              Refresh
            </Button>
            <Button
              type='primary'
              size='sm'
              onClick={createScreenshotHandler}
              disabled={fetchFolders.isLoading || fetchFiles.isLoading}
            >
              CreateScreenshot
            </Button>
            <Button
              type='primary'
              size='sm'
              disabled={fetchFolders.isLoading || fetchFiles.isLoading}
            >
              CreateVideoFile
            </Button>
          </ButtonsGroup>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col>
          <Breadcrumbs stack={foldersStack} />
        </Col>
      </Row>
      <Row>
        <Col>
          {fetchFolders.isSuccess && fetchFiles.isSuccess && loaded ? (
            <div className={styles.container}>
              <FoldersList
                className={styles.item}
                folders={folders[parentId]}
                onClickFolder={clickFolderHandler}
              />
              <FilesList
                className={styles.item}
                files={files[parentId]}
                onClickFile={clickFileHandler}
              />
            </div>
          ) : fetchFolders.isLoading || fetchFiles.isLoading || !loaded ? (
            <Spinner animation='border' />
          ) : fetchFolders.isError || fetchFiles.isError ? (
            <Alert message='Network error' type='error' />
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export default CameraFileManager;
