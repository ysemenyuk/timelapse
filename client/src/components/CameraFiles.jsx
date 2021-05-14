import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './camera.css';

import { fileActions } from '../store/fileSlice.js';

import fileThunks from '../thunks/fileThunks.js';

const CameraFiles = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.file.currentDir);
  const dirStack = useSelector((state) => state.file.dirStack);
  const selectedCamera = useSelector((state) => state.camera.selectedItem);

  const files = useSelector((state) => state.file.allItems);
  const dirLogo = '/files/assets/folder-img.png';
  const fileLogo = '/files/assets/file-img.png';

  // useEffect(() => {
  //   dispatch(fileActions.setCurrentDir(selectedCamera._id));
  //   dispatch(fileThunks.fetchAll(currentDir));
  // }, [currentDir]);

  const openDirHandler = (file) => {
    if (file.type === 'dir') {
      dispatch(fileActions.pushToDirStack(currentDir));
      dispatch(fileActions.setCurrentDir(file._id));
      dispatch(fileThunks.fetchAll(file._id));
    }
  };

  const backClickHandler = () => {
    console.log('back');
    console.log('dirStack', dirStack);

    // const backDirId = dirStack.pop();
    dispatch(fileActions.popFromDirStack());
    // dispatch(fileActions.setCurrentDir(backDirId));
  };

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Camera dirs and files</h6>

      <div className='mb-3 d-grid gap-2 d-flex justify-content-start'>
        <button
          type='button'
          className='btn btn-sm btn-primary'
          onClick={backClickHandler}
        >
          Back
        </button>
        <button
          type='button'
          className='btn btn-sm btn-primary'
          // onClick={handleEdit}
        >
          New folder
        </button>
      </div>

      <div className='files_container overflow-auto'>
        {files.map((file) => (
          <div
            key={file._id}
            className='file_plate col-2'
            onClick={() => openDirHandler(file)}
          >
            <img
              src={file.type === 'dir' ? dirLogo : fileLogo}
              // src="/files/609be1084eff73304811605d/screenshots/img-2021-03-22--07-00-17.jpg"
              className='file_plate_img img-thumbnail'
            />
            <div className='file_plate_name'>{file.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraFiles;
