import { createAsyncThunk } from '@reduxjs/toolkit';

import fileManagerService from '../api/fileManager.service.js';

const fetchFiles = createAsyncThunk('file/fetchFiles', async ({ cameraId, parentId }) => {
  try {
    console.log('file/fetchFiles cameraId, parentId -', { cameraId, parentId });

    const response = await fileManagerService.getFiles(cameraId, parentId);

    console.log('file/fetchFiles response.data -', response.data);

    return response.data;
  } catch (e) {
    console.log('file/fetchFiles error -', e.message);
    throw e;
  }
});

const fetchFolders = createAsyncThunk('folder/fetchFolders', async ({ cameraId, parentId }) => {
  try {
    console.log('folder/fetchFolders cameraId parentId -', { cameraId, parentId });

    const response = await fileManagerService.getFolders(cameraId, parentId);

    console.log('folder/fetchFolders response.data -', response.data);

    return response.data;
  } catch (e) {
    console.log('folder/fetchFolders error -', e.message);
    throw e;
  }
});

const fetchOneFolder = createAsyncThunk(
  'folder/fetchOneFolder',
  async ({ cameraId, parentId }) => {
    try {
      console.log('folder/fetchOneFolder cameraId parentId -', { cameraId, parentId });

      const response = await fileManagerService.getOneFolder(cameraId, parentId);

      console.log('folder/fetchOneFolder response.data -', response.data);

      return response.data;
    } catch (e) {
      console.log('folder/fetchOneFolder error -', e.message);
      throw e;
    }
  }
);

const deletehOneFile = createAsyncThunk('file/deleteOneFile', async ({ cameraId, fileId }) => {
  try {
    console.log('file/deleteOneFile cameraId fileId -', { cameraId, fileId });

    const response = await fileManagerService.deleteOneFile(cameraId, fileId);

    console.log('file/deleteOneFile response.data -', response.data);

    return fileId;
  } catch (e) {
    console.log('file/deleteOneFile error -', e.message);
    throw e;
  }
});

export default { fetchFiles, fetchFolders, fetchOneFolder, deletehOneFile };
