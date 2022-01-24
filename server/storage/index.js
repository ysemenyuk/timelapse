import diskStorage from './disk.storage.js';
import gridFsStorage from './gridFS.storage.js';

export const storageType = process.env.STORAGE_TYPE || 'disk';

const storages = {
  disk: diskStorage,
  gridfs: gridFsStorage,
};

export default storages[storageType];
