import { createAsyncThunk } from '@reduxjs/toolkit';
import fileManagerService from '../api/fileManager.service.js';

const fetchFiles = createAsyncThunk('file/fetchFiles', async ({ cameraId, parentId }) => {
  try {
    console.log('file/fetchFiles cameraId, parentId -', { cameraId, parentId });

    const response = await fileManagerService.getFiles(cameraId, parentId);

    console.log('file/fetchFiles response.data -', response.data);

    return { cameraId, parentId, data: response.data };
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

    return { cameraId, parentId, data: response.data };
  } catch (e) {
    console.log('folder/fetchFolders error -', e.message);
    throw e;
  }
});

const fetchMainFolder = createAsyncThunk(
  'folder/fetchMainFolder',
  async ({ cameraId, folderId }) => {
    try {
      console.log('folder/fetchMainFolder cameraId folderId -', { cameraId, folderId });

      const response = await fileManagerService.getOneFolder(cameraId, folderId);

      console.log('folder/fetchMainFolder response.data -', response.data);

      return { cameraId, data: response.data };
    } catch (e) {
      console.log('folder/fetchMainFolder error -', e.message);
      throw e;
    }
  },
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

export default {
  fetchFiles, fetchFolders, fetchMainFolder, deletehOneFile,
};
