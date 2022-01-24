import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './FileManager.module.css';
import { Breadcrumb, Col, Button, Spinner } from 'react-bootstrap';
import useThunkStatus from '../../hooks/useThunkStatus.js';
import { cameraActions } from '../../store/cameraSlice.js';
import { fileManagerActions } from '../../store/fileManagerSlice.js';
import { imgViewerActions } from '../../store/imgViewerSlice.js';
import FilesList from './FileList/FilesList.jsx';
import FoldersList from './FolderList/FoldersList.jsx';
import ButtonsGroup from '../UI/ButtonsGroup.jsx';
import Heading from '../UI/Heading.jsx';
import Error from '../UI/Error';

const CameraFileManager = ({ selectedCamera }) => {
  const dispatch = useDispatch();

  const fetchOneFolder = useThunkStatus(fileManagerActions.fetchOneFolder);
  const fetchFiles = useThunkStatus(fileManagerActions.fetchFiles);
  const fetchFolders = useThunkStatus(fileManagerActions.fetchFolders);

  const { files, folders, currentFolder, foldersStack } = useSelector(
    (state) => state.fileManager
  );

  console.log(1111112, currentFolder);

  useEffect(() => {
    return () => {
      dispatch(fileManagerActions.resetCurrentFolder());
    };
  }, []);

  useEffect(() => {
    if (!currentFolder && selectedCamera.mainFolder) {
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

  const breadcrumbClickHandler = (folder) => {
    dispatch(fileManagerActions.setCurrentFolder(folder));
  };

  const backHandler = () => {
    dispatch(fileManagerActions.popFromFoldersStack());
  };

  const refreshHandler = () => {
    if (currentFolder) {
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
  };

  const createScreenshotHandler = () => {
    dispatch(cameraActions.createScreenshot(selectedCamera._id));
  };

  return (
    <>
      <Col md={12} className='mb-4'>
        <Heading lvl={6} className='mb-3'>
          Files
        </Heading>

        <ButtonsGroup>
          <Button
            type='primary'
            size='sm'
            onClick={backHandler}
            disabled={
              !currentFolder ||
              fetchOneFolder.isLoading ||
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
            disabled={
              !currentFolder ||
              fetchOneFolder.isLoading ||
              fetchFolders.isLoading ||
              fetchFiles.isLoading
            }
          >
            Refresh
          </Button>
          <Button
            type='primary'
            size='sm'
            onClick={createScreenshotHandler}
            disabled={
              !currentFolder ||
              fetchOneFolder.isLoading ||
              fetchFolders.isLoading ||
              fetchFiles.isLoading
            }
          >
            CreateScreenshot
          </Button>
        </ButtonsGroup>
      </Col>

      <Col md={12} className='mb-4'>
        <Breadcrumb>
          {foldersStack.map((folder) => (
            <Breadcrumb.Item onClick={() => breadcrumbClickHandler(folder)} key={folder._id}>
              {folder.name}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </Col>

      <Col md={12} className='mb-4'>
        <Choose>
          <When condition={!currentFolder && !selectedCamera.mainFolder}>
            <div className={styles.container}>No files or folders..</div>
          </When>

          <When condition={fetchOneFolder.isError || fetchFolders.isError || fetchFiles.isError}>
            <Error message='Network error' type='error' />
          </When>

          <When
            condition={!currentFolder || !folders[currentFolder._id] || !files[currentFolder._id]}
          >
            <Spinner animation='border' />
          </When>

          <When
            condition={
              folders[currentFolder._id].length === 0 && files[currentFolder._id].length === 0
            }
          >
            <div className={styles.container}>No files or folders..</div>
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
    </>
  );
};

export default CameraFileManager;
