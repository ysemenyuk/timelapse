import React, { useEffect, useState } from 'react';
import axios from 'axios';

import FilesList from './FilesList.jsx';
import Spinner from './Spinner.jsx';
import Error from './Error.jsx';

const filesStates = {
  idle: 'idle',
  loading: 'loading',
  error: 'error',
};

const CameraFiles = ({ selectedCamera }) => {
  // console.log('camera files');

  const [currentDir, setCurrentDir] = useState(null);
  const [dirStack, setDirStack] = useState([]);

  const [state, setState] = useState(filesStates.idle);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (selectedCamera !== null) {
      const selectedCameraDir = {
        _id: selectedCamera.dir,
        name: selectedCamera.name,
      };
      setCurrentDir(selectedCameraDir);
      setDirStack((prevState) => [...prevState, selectedCameraDir]);
    }
  }, [selectedCamera]);

  useEffect(async () => {
    if (currentDir !== null) {
      try {
        setState(filesStates.loading);
        const { data } = await axios.get(
          `/api/files?parentId=${currentDir._id}`
        );
        // console.log(data);
        setFiles(data);
        setState(filesStates.idle);
      } catch (err) {
        // console.log(err);
        setState(filesStates.error);
      }
    }
  }, [currentDir]);

  const clickFileHandler = (file) => {
    if (file.type === 'dir') {
      setCurrentDir(file);
      setDirStack((prevState) => [...prevState, file]);
    } else {
      console.log('not dir');
    }
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

      <div className='mb-3'>
        {dirStack.map((dir) => (
          <span key={dir._id}>{` ${dir.name} /`}</span>
        ))}
      </div>

      <div className='mb-3 d-grid gap-2 d-flex justify-content-start'>
        <button
          type='button'
          className='btn btn-sm btn-primary'
          onClick={backClickHandler}
          disabled={state === filesStates.loading || dirStack.length === 1}
        >
          Back
        </button>
        <button type='button' className='btn btn-sm btn-primary' disabled>
          Button
        </button>
      </div>

      <div className='vh-100 d-flex flex-wrap p-3 border rounded overflow-auto'>
        {state === filesStates.idle ? (
          <FilesList files={files} onClickFile={clickFileHandler} />
        ) : state === filesStates.loading ? (
          <Spinner />
        ) : state === filesStates.error ? (
          <Error />
        ) : null}
      </div>
    </div>
  );
};

export default CameraFiles;
