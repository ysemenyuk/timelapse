import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import fileThunks from '../../thunks/fileThunks.js';
import folderThunks from '../../thunks/folderThunks.js';

import useThunkStatus from '../../hooks/useThunkStatus.js';

import { folderActions } from '../../store/folderSlice.js';

import ListBox from './ListBox.jsx';
import FilesListItem from './FilesListItem.jsx';
import FoldersList from './FoldersList.jsx';
import Breadcrumbs from './Breadcrumbs.jsx';

import ButtonsGroup from '../ButtonsGroup.jsx';
import Spinner from '../Spinner.jsx';
import Error from '../Error.jsx';

const CameraFiles = ({ selectedCamera }) => {
  const dispatch = useDispatch();

  const fetchFiles = useThunkStatus(fileThunks.fetchAll);
  const fetchFolders = useThunkStatus(folderThunks.fetchAll);

  const { files } = useSelector((state) => state.files);
  const { folders, currentFolder, stack } = useSelector((state) => state.folders);

  const cameraId = selectedCamera._id;
  const parentId = currentFolder ? currentFolder._id : selectedCamera.mainFolder;

  useEffect(() => {
    dispatch(fileThunks.fetchAll({ cameraId, parentId }));
    dispatch(folderThunks.fetchAll({ cameraId, parentId }));
  }, [currentFolder]);

  const clickFileHandler = (file) => {
    console.log('click', file);
  };

  const clickFolderHandler = (folder) => {
    dispatch(folderActions.pushToStack(folder));
  };

  const backClickHandler = () => {
    dispatch(folderActions.popFromStack());
  };

  const refreshHandler = () => {
    dispatch(fileThunks.fetchAll({ cameraId, parentId }));
    dispatch(folderThunks.fetchAll({ cameraId, parentId }));
  };

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Files</h6>

      <ButtonsGroup>
        <button
          type='button'
          className='btn btn-sm btn-primary'
          onClick={backClickHandler}
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
      </ButtonsGroup>

      <Breadcrumbs stack={stack} />

      <ListBox>
        {fetchFolders.isSuccess && fetchFiles.isSuccess ? (
          <>
            <FoldersList folders={folders} onClickFolder={clickFolderHandler} />
            {files.map((file) => (
              <FilesListItem
                name={file.date}
                icon={file.preview}
                key={file._id}
                onClickFile={clickFileHandler}
              />
            ))}
          </>
        ) : fetchFolders.isLoading || fetchFiles.isLoading ? (
          <Spinner />
        ) : fetchFolders.isError || fetchFiles.isLoading ? (
          <Error message={'error'} />
        ) : null}
      </ListBox>
    </div>
  );
};

export default CameraFiles;
