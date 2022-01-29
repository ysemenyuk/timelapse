import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fileManagerActions } from '../store/fileManagerSlice.js';
import useThunkStatus from './useThunkStatus.js';

export default function useFileManager(selectedCamera) {
  const dispatch = useDispatch();

  // const fetchMainFolder = useThunkStatus(fileManagerActions.fetchMainFolder);
  const fetchFiles = useThunkStatus(fileManagerActions.fetchFiles);
  const fetchFolders = useThunkStatus(fileManagerActions.fetchFolders);

  const [fetchMainFolder, setFetchMainFolder] = useState({ isLoading: false, isError: false });

  const { files, folders, parent, stack } = useSelector((state) => state.fileManager);

  const parentFolder = parent[selectedCamera._id] || null;
  const foldersStack = stack[selectedCamera._id] || [];

  const currentFolders = parentFolder ? folders[parentFolder._id] : null;
  const currentFiles = parentFolder ? files[parentFolder._id] : null;

  useEffect(() => {
    if (!parentFolder) {
      setFetchMainFolder({ isLoading: true, isError: false });
      dispatch(
        fileManagerActions.fetchMainFolder({
          cameraId: selectedCamera._id,
          folderId: selectedCamera.mainFolder,
        }),
      )
        .unwrap()
        .then(() => {
          setFetchMainFolder({ isLoading: false, isError: false });
        })
        .catch(() => {
          setFetchMainFolder({ isLoading: false, isError: true });
        });
    }

    if (parentFolder && !currentFolders && !currentFiles) {
      dispatch(
        fileManagerActions.fetchFiles({
          cameraId: selectedCamera._id,
          parentId: parentFolder._id,
        }),
      );
      dispatch(
        fileManagerActions.fetchFolders({
          cameraId: selectedCamera._id,
          parentId: parentFolder._id,
        }),
      );
    }
  }, [parentFolder, selectedCamera]);

  const fetchStatus = {
    isSuccess: fetchFiles.isSuccess && fetchFolders.isSuccess,
    isLoading: fetchFiles.isLoading || fetchFolders.isLoading,
    isError: fetchFiles.isError || fetchFolders.isError,
  };

  return {
    folders: currentFolders,
    files: currentFiles,
    parentFolder,
    foldersStack,
    fetchStatus,
    fetchMainFolder,
  };
}
