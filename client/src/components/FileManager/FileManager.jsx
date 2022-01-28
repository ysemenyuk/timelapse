import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './FileManager.module.css';
import { Breadcrumb, Col, Button, Spinner } from 'react-bootstrap';
// import useThunkStatus from '../../hooks/useThunkStatus.js';
import { cameraActions } from '../../store/cameraSlice.js';
import { fileManagerActions } from '../../store/fileManagerSlice.js';
import { imgViewerActions } from '../../store/imgViewerSlice.js';
import FilesList from './FileList/FilesList.jsx';
import FoldersList from './FolderList/FoldersList.jsx';
import ButtonsGroup from '../UI/ButtonsGroup.jsx';
import Heading from '../UI/Heading.jsx';
import Error from '../UI/Error';
import useFileManager from '../../hooks/useFileManager';

const CameraFileManager = ({ selectedCamera }) => {
  const dispatch = useDispatch();

  const cameraId = selectedCamera._id;

  const { folders, files, parentFolder, foldersStack, fetchStatus, fetchMainFolder } =
    useFileManager(selectedCamera);

  const clickFileHandler = (fileIndex) => {
    dispatch(fileManagerActions.setCurrentFileIndex({ cameraId, fileIndex }));
    dispatch(imgViewerActions.open());
  };

  const clickFolderHandler = (folder) => {
    dispatch(fileManagerActions.pushToFoldersStack({ cameraId, folder }));
  };

  const breadcrumbClickHandler = (folder) => {
    dispatch(fileManagerActions.setCurrentFolder({ cameraId, folder }));
  };

  const backHandler = () => {
    dispatch(fileManagerActions.popFromFoldersStack({ cameraId }));
  };

  const refreshHandler = () => {
    if (parentFolder) {
      dispatch(
        fileManagerActions.fetchFiles({
          cameraId: selectedCamera._id,
          parentId: parentFolder._id,
        })
      );
      dispatch(
        fileManagerActions.fetchFolders({
          cameraId: selectedCamera._id,
          parentId: parentFolder._id,
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
            disabled={!parentFolder || fetchStatus.isLoading || foldersStack.length === 1}
          >
            Back
          </Button>
          <Button
            type='primary'
            size='sm'
            onClick={refreshHandler}
            disabled={!parentFolder || fetchStatus.isLoading}
          >
            Refresh
          </Button>
          <Button
            type='primary'
            size='sm'
            onClick={createScreenshotHandler}
            disabled={!parentFolder || fetchStatus.isLoading}
          >
            CreateScreenshot
          </Button>
        </ButtonsGroup>
      </Col>

      <Choose>
        <When condition={fetchMainFolder.isError}>
          <Error message='Network error main folder' type='error' />
        </When>

        <When condition={!folders || !files || !parentFolder || !foldersStack}>
          <Spinner animation='border' />
        </When>

        <Otherwise>
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
              <When condition={fetchStatus.isError}>
                <Error message='Network error folders and files' type='error' />
              </When>

              <When condition={fetchStatus.isLoading}>
                <Spinner animation='border' />
              </When>

              <When condition={folders.length === 0 && files.length === 0}>
                <div className={styles.container}>No files or folders..</div>
              </When>

              <When condition={fetchStatus.isSuccess}>
                <div className={styles.container}>
                  <FoldersList
                    className={styles.item}
                    folders={folders}
                    onClickFolder={clickFolderHandler} //
                  />
                  <FilesList
                    className={styles.item}
                    files={files}
                    onClickFile={clickFileHandler} //
                  />
                </div>
              </When>
            </Choose>
          </Col>
        </Otherwise>
      </Choose>
    </>
  );
};

export default CameraFileManager;
