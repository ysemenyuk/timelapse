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
import Heading from '../UI/Heading.jsx';

const CameraFileManager = ({ selectedCamera }) => {
  const dispatch = useDispatch();

  const fetchFiles = useThunkStatus(fileManagerActions.fetchFiles);
  const fetchFolders = useThunkStatus(fileManagerActions.fetchFolders);

  const { files, folders, currentFolder, foldersStack } = useSelector(
    (state) => state.fileManager
  );

  useEffect(() => {
    if (!currentFolder) {
      dispatch(
        fileManagerActions.fetchOneFolder({
          cameraId: selectedCamera._id,
          folderId: selectedCamera.mainFolder,
        })
      );
    }
  }, [currentFolder]);

  useEffect(() => {
    if (currentFolder && !folders[currentFolder._id] && !files[currentFolder._id]) {
      dispatch(
        fileManagerActions.fetchFiles({
          cameraId: selectedCamera._id,
          parentId: currentFolder._id,
        })
      );
      dispatch(
        fileManagerActions.fetchFolders({
          cameraId: selectedCamera._id,
          parentId: currentFolder._id,
        })
      );
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
    dispatch(
      fileManagerActions.fetchFiles({
        cameraId: selectedCamera._id,
        parentId: currentFolder._id,
      })
    );
    dispatch(
      fileManagerActions.fetchFolders({
        cameraId: selectedCamera._id,
        parentId: currentFolder._id,
      })
    );
  };

  const createScreenshotHandler = async (e) => {
    dispatch(cameraActions.createScreenshot(selectedCamera._id));
  };

  return (
    <>
      <Row className='mb-3'>
        <Col>
          <Heading lvl={6} className='mb-3'>
            Files
          </Heading>
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
                fetchFolders.isLoading || fetchFiles.isLoading || foldersStack.length === 1
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
          <Choose>
            <When condition={fetchFolders.isError || fetchFiles.isError}>
              <Alert message='Network error' type='error' />
            </When>

            <When
              condition={
                !currentFolder || !!folders[currentFolder._id] || !!files[currentFolder._id]
              }
            >
              <Spinner animation='border' />
            </When>

            <When
              condition={
                folders[currentFolder._id].length === 0 && files[currentFolder._id].length === 0
              }
            >
              <div className={styles.container}>No files..</div>
            </When>

            <When condition={fetchFolders.isSuccess && fetchFiles.isSuccess}>
              <div className={styles.container}>
                <FoldersList
                  className={styles.item}
                  folders={folders[currentFolder._id]}
                  onClickFolder={clickFolderHandler}
                />
                <FilesList
                  className={styles.item}
                  files={files[currentFolder._id]}
                  onClickFile={clickFileHandler}
                />
              </div>
            </When>
          </Choose>
        </Col>
      </Row>
    </>
  );
};

export default CameraFileManager;
