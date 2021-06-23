import React, { useEffect, useState } from 'react';

import FilesList from './FilesList.jsx';
import Spinner from '../Spinner.jsx';
import Error from '../Error.jsx';

import useCurrentDirFiles from '../../hooks/useCurrentDirFiles.js';

const CameraFiles = ({ selectedCamera }) => {
  // console.log('camera files');

  const [currentDir, setCurrentDir] = useState(null);
  const [dirStack, setDirStack] = useState([]);

  useEffect(() => {
    if (selectedCamera !== null) {
      const selectedCameraDir = {
        _id: selectedCamera.mainFolder,
        name: selectedCamera.name,
      };
      setCurrentDir(selectedCameraDir);
      setDirStack([selectedCameraDir]);
    }
  }, [selectedCamera]);

  const fetchFiles = useCurrentDirFiles(currentDir);

  const clickFileHandler = (file) => {
    console.log('click');
  };

  const clickDirHandler = (file) => {
    setCurrentDir(file);
    setDirStack((prevState) => [...prevState, file]);
  };

  const backClickHandler = () => {
    const backDir = dirStack[dirStack.length - 2];
    setCurrentDir(backDir);
    setDirStack((prevState) => prevState.slice(0, -1));
  };

  if (selectedCamera === null) {
    return null;
  }

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Files</h6>

      <div className='mb-3 d-grid gap-2 d-flex justify-content-start'>
        <button
          type='button'
          className='btn btn-sm btn-primary'
          onClick={backClickHandler}
          disabled={fetchFiles.isLoading || dirStack.length === 1}
        >
          Back
        </button>
        <button type='button' className='btn btn-sm btn-primary' disabled>
          Button
        </button>
      </div>

      <div className='mb-3'>
        {dirStack.map((dir) => (
          <span key={dir._id}>{` ${dir.name} /`}</span>
        ))}
      </div>

      <div className='vh-100 d-flex flex-wrap align-content-start border rounded overflow-auto'>
        {fetchFiles.isSuccess ? (
          <FilesList files={fetchFiles.files} onClickFile={clickFileHandler} />
        ) : fetchFiles.isLoading ? (
          <Spinner />
        ) : fetchFiles.isError ? (
          <Error message={fetchFiles.error} />
        ) : null}
      </div>
    </div>
  );
};

export default CameraFiles;
