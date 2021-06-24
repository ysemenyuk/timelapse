import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import fileThunks from '../../thunks/fileThunks.js';
import folderThunks from '../../thunks/folderThunks.js';

import useThunkStatus from '../../hooks/useThunkStatus.js';

// import { folderActions } from '../../store/folderSlice.js';

import FilesList from './FilesList.jsx';
import FolderList from './FolderList.jsx';

import Spinner from '../Spinner.jsx';
import Error from '../Error.jsx';

const CameraFiles = ({ selectedCamera }) => {
  const { _id, mainFolder } = selectedCamera;
  const cameraId = _id;

  const dispatch = useDispatch();

  const fetchFiles = useThunkStatus(fileThunks.fetchAll);
  const fetchFolders = useThunkStatus(folderThunks.fetchAll);

  const files = useSelector((state) => state.files);
  const folders = useSelector((state) => state.folders);

  useEffect(() => {
    dispatch(folderThunks.fetchOne({ cameraId, parentId: mainFolder }));
  }, [selectedCamera]);

  useEffect(() => {
    if (folders.currentItem) {
      dispatch(fileThunks.fetchAll({ cameraId, parentId: folders.currentItem._id }));
      dispatch(folderThunks.fetchAll({ cameraId, parentId: folders.currentItem._id }));
    }
  }, [folders.currentItem]);

  const clickFileHandler = (file) => {
    console.log('click', file);
  };

  const clickFolderHandler = (folder) => {
    console.log('click', folder);
    // setCurrentDir(file);
    // setDirStack((prevState) => [...prevState, file]);
  };

  // const backClickHandler = () => {
  //   const backDir = dirStack[dirStack.length - 2];
  //   setCurrentDir(backDir);
  //   setDirStack((prevState) => prevState.slice(0, -1));
  // };

  // const refreshHandler = () => {
  //   fetchFiles();
  // };

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Files</h6>

      {/* <div className='mb-3 d-grid gap-2 d-flex justify-content-start'>
        <button
          type='button'
          className='btn btn-sm btn-primary'
          onClick={backClickHandler}
          // disabled={isLoading || dirStack.length === 1}
        >
          Back
        </button>
        <button
          type='button'
          className='btn btn-sm btn-primary'
          onClick={refreshHandler}
          // disabled={isLoading}
        >
          Refresh
        </button>
      </div> */}

      <div className='mb-3'>
        {folders.stack.map((folder) => (
          <span key={folder._id}>{` ${folder.name} /`}</span>
        ))}
      </div>

      <div className='vh-100 d-flex flex-wrap align-content-start border rounded overflow-auto'>
        {fetchFolders.isSuccess && fetchFiles.isSuccess ? (
          <>
            <FolderList folders={folders.allItems} onClickFolder={clickFolderHandler} />
            <FilesList files={files.allItems} onClickFile={clickFileHandler} />
          </>
        ) : fetchFolders.isLoading || fetchFiles.isLoading ? (
          <Spinner />
        ) : fetchFolders.isError || fetchFiles.isLoading ? (
          <Error message={'error'} />
        ) : null}
      </div>
    </div>
  );
};

export default CameraFiles;
