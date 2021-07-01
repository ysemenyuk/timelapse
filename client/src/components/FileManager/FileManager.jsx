import React, { useState, useEffect, useRef } from 'react';
// import { Modal } from 'bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import fileThunks from '../../thunks/fileThunks.js';
import cameraThunks from '../../thunks/cameraThunks.js';

import useThunkStatus from '../../hooks/useThunkStatus.js';

import { fileActions } from '../../store/fileSlice.js';

import FilesListBox from './FilesListBox.jsx';
import Breadcrumbs from './Breadcrumbs.jsx';
import FilesListModal from './FilesListModal.jsx';
import FilesList from './FilesList.jsx';
import FoldersList from './FoldersList.jsx';

import ButtonsGroup from '../ButtonsGroup.jsx';
import Spinner from '../Spinner.jsx';
import Error from '../Error.jsx';

const CameraFiles = ({ selectedCamera }) => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(null);

  const fetchFiles = useThunkStatus(fileThunks.fetchFiles);
  const fetchFolders = useThunkStatus(fileThunks.fetchFolders);

  const { files, folders, currentFolder, stack, selectedFileIndex } = useSelector(
    (state) => state.files
  );

  const cameraId = selectedCamera._id;
  const parentId = currentFolder ? currentFolder._id : selectedCamera.mainFolder;

  useEffect(() => {
    dispatch(fileThunks.fetchFiles({ cameraId, parentId }));
    dispatch(fileThunks.fetchFolders({ cameraId, parentId }));
  }, [currentFolder]);

  const clickFileHandler = (fileIndex) => {
    dispatch(fileActions.selectFile(fileIndex));
    modal.show();
  };

  const nextFileHandler = () => {
    dispatch(fileActions.selectNextFile());
  };

  const prewFileHandler = () => {
    dispatch(fileActions.selectPrewFile());
  };

  const closeModalHandler = () => {
    dispatch(fileActions.selectFile(null));
    modal.hide();
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
          disabled={fetchFolders.isLoading || fetchFiles.isLoading}
        >
          Back
        </button>
        <button
          type='button'
          className='btn btn-sm btn-primary'
          onClick={refreshHandler}
          disabled={fetchFolders.isLoading || fetchFiles.isLoading}
        >
          Refresh
        </button>
        <button
          type='button'
          className='btn btn-sm btn-primary'
          onClick={createScreenshotHandler}
          disabled={fetchFolders.isLoading || fetchFiles.isLoading}
        >
          CreateScreenshot
        </button>
        <button
          type='button'
          className='btn btn-sm btn-primary'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
        >
          Launch modal
        </button>
      </ButtonsGroup>

      <Breadcrumbs stack={stack} />

      <FilesListModal
        setModal={setModal}
        files={files}
        fileIndex={selectedFileIndex}
        onNextFile={nextFileHandler}
        onPrewFile={prewFileHandler}
        onCloseModal={closeModalHandler}
      />

      <FilesListBox>
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
      </FilesListBox>
    </div>
  );
};

export default CameraFiles;
