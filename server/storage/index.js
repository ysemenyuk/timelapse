import diskStorage from './disk.storage.js';
import gridFsStorage from './gridFS.storage.js';

const storageType = process.env.STORAGE_TYPE || 'gridfs';

export default (mongoClient) => {
  const storages = {
    disk: diskStorage,
    gridfs: gridFsStorage,
  };

  return storages[storageType](mongoClient);
};
