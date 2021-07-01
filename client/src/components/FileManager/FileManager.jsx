import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import fileThunks from '../../thunks/fileThunks.js';
import cameraThunks from '../../thunks/cameraThunks.js';

import useThunkStatus from '../../hooks/useThunkStatus.js';

import { fileActions } from '../../store/fileSlice.js';

import ListBox from './ListBox.jsx';
import FilesList from './FilesList.jsx';
import FoldersList from './FoldersList.jsx';
import Breadcrumbs from './Breadcrumbs.jsx';

import ButtonsGroup from '../ButtonsGroup.jsx';
import Spinner from '../Spinner.jsx';
import Error from '../Error.jsx';

const CameraFiles = ({ selectedCamera }) => {
  const dispatch = useDispatch();

  const fetchFiles = useThunkStatus(fileThunks.fetchFiles);
  const fetchFolders = useThunkStatus(fileThunks.fetchFolders);

  const { files, folders, currentFolder, stack } = useSelector((state) => state.files);

  const cameraId = selectedCamera._id;
  const parentId = currentFolder ? currentFolder._id : selectedCamera.mainFolder;

  useEffect(() => {
    dispatch(fileThunks.fetchFiles({ cameraId, parentId }));
    dispatch(fileThunks.fetchFolders({ cameraId, parentId }));
  }, [currentFolder]);

  const clickFileHandler = (file) => {
    console.log('click', file);
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
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Files</h6>

      <ButtonsGroup>
        <button
          type='button'
          className='btn btn-sm btn-primary'
          onClick={backHandler}
          disabled={fetchFolders.isLoading || fetchFiles.isLoading}>
          Back
        </button>
        <button
          type='button'
          className='btn btn-sm btn-primary'
          onClick={refreshHandler}
          disabled={fetchFolders.isLoading || fetchFiles.isLoading}>
          Refresh
        </button>
        <button
          type='button'
          className='btn btn-sm btn-primary'
          onClick={createScreenshotHandler}
          disabled={fetchFolders.isLoading || fetchFiles.isLoading}>
          CreateScreenshot
        </button>
      </ButtonsGroup>

      <Breadcrumbs stack={stack} />

      <button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'>
        Launch demo modal
      </button>

      <div
        className='modal  fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-xl'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Modal title
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <img src={`/files/${files[0]?.original}`} />
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Close
              </button>
              <button type='button' className='btn btn-primary'>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <ListBox>
        {fetchFolders.isSuccess && fetchFiles.isSuccess ? (
          <>
            <FoldersList folders={folders} onClickFolder={clickFolderHandler} />
            <FilesList files={files} onClickFile={clickFileHandler} />
          </>
        ) : fetchFolders.isLoading || fetchFiles.isLoading ? (
          <Spinner />
        ) : fetchFolders.isError || fetchFiles.isError ? (
          <Error message={'error'} />
        ) : null}
      </ListBox>
    </div>
  );
};

export default CameraFiles;
