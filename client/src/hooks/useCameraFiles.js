import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import fileThunks from '../thunks/fileThunks.js';
import folderThunks from '../thunks/folderThunks.js';

import useThunkStatus from './useThunkStatus.js';

export default function () {
  const dispatch = useDispatch();

  const fetchFiles = useThunkStatus(fileThunks.fetchAll);
  const fetchFolders = useThunkStatus(folderThunks.fetchAll);

  const files = useSelector((state) => state.files);
  const folders = useSelector((state) => state.folders);

  useEffect(() => {
    const parentId = folders.currentItem ? folders.currentItem._id : mainFolder;
    dispatch(fileThunks.fetchAll({ cameraId, parentId }));
    dispatch(folderThunks.fetchAll({ cameraId, parentId }));
  }, [folders.currentItem]);

  const fetchStatus = {
    isSuccess: fetchFiles.isSuccess && fetchFolders.isSuccess,
    isLoading: fetchFiles.isLoading || fetchFolders.isLoading,
    isError: fetchFiles.iisError || fetchFolders.isError,
  };

  return { files, folders, fetchStatus };
}
