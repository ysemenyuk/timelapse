import path from 'path';
import fs from 'fs';

const fsp = fs.promises;

const read = async () => {
  const pathToCamerasFile = path.resolve('server', 'settings.json');
  console.log(pathToCamerasFile);
  const cameras = await fsp.readFile(pathToCamerasFile);
  console.log(cameras);

  return cameras;
}

export default { read };

