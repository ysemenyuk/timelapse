import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fileActions } from '../store/fileSlice.js';
import fileThunks from '../thunks/fileThunks.js';
import useThunkStatus from '../hooks/useThunkStatus.js';

import Spinner from './Spinner.jsx';
import Error from './Error.jsx';

const dirLogo = '/files/assets/folder-img.png';
const fileLogo = '/files/assets/file-img.png';

const Files = ({ files, onOpenFile }) => {
  if (files.length === 0) {
    return <div>No files.</div>;
  }
  return files.map((file) => (
    <div
      key={file._id}
      className='m-3'
      role='button'
      onClick={() => onOpenFile(file)}
    >
      <img
        src={file.type === 'dir' ? dirLogo : fileLogo}
        width='80px'
        height='80px'
        className='img-thumbnail'
      />
      <div>{file.name}</div>
    </div>
  ));
};

const CameraFiles = () => {
  const dispatch = useDispatch();
  const fetchAllFiles = useThunkStatus(fileThunks.fetchAll);

  const selectedCamera = useSelector((state) => state.camera.selectedCamera);
  const currentDir = useSelector((state) => state.file.currentDir);
  const dirStack = useSelector((state) => state.file.dirStack);
  const files = useSelector((state) => state.file.allItems);

  useEffect(() => {
    if (selectedCamera !== null) {
      dispatch(fileActions.setCurrentDir(selectedCamera.dir));
    }
  }, [selectedCamera]);

  useEffect(() => {
    if (currentDir !== null) {
      dispatch(fileThunks.fetchAll(currentDir));
    }
  }, [currentDir]);

  const openFileHandler = (file) => {
    if (file.type === 'dir') {
      // dispatch(fileActions.setCurrentDir(file._id));
      dispatch(fileActions.pushToDirStack({ currentDir, file }));
    } else {
      console.log('not dir');
    }
  };

  const backClickHandler = () => {
    // const backDirId = dirStack[dirStack.length - 1];
    // dispatch(fileActions.setCurrentDir(backDirId));
    dispatch(fileActions.popFromDirStack());
  };

  if (selectedCamera === null) {
    return (
      <div className='col-12 mb-3'>
        <h6 className='mb-3'>Files</h6>
        <div>No selected camera.</div>
      </div>
    );
  }

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Files</h6>

      <div className='mb-3'>
        {'home /'}
        {dirStack.map((dir) => (
          <span key={dir}>{` ${dir} /`}</span>
        ))}
      </div>

      <div className='mb-3 d-grid gap-2 d-flex justify-content-start'>
        <button
          type='button'
          className='btn btn-sm btn-primary'
          onClick={backClickHandler}
          disabled={fetchAllFiles.isLoading || dirStack.length === 0}
        >
          Back
        </button>
        <button type='button' className='btn btn-sm btn-primary' disabled>
          Button
        </button>
      </div>

      <div className='vh-100 d-flex flex-wrap p-3 border rounded overflow-auto'>
        {fetchAllFiles.isSuccess ? (
          <Files files={files} onOpenFile={openFileHandler} />
        ) : fetchAllFiles.isLoading ? (
          <Spinner />
        ) : fetchAllFiles.isError ? (
          <Error />
        ) : null}
      </div>
    </div>
  );
};

export default CameraFiles;
