import diskStorage from './storage/disk.storage.js';
import gridFsStorage from './storage/gridFS.storage.js';

export default (storageType, mongoClient) => {
  const storages = {
    disk: diskStorage,
    gridfs: gridFsStorage,
  };

  return storages[storageType](mongoClient);
};
