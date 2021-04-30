import Cameras from './models.js';

export const getCameras = async (req, res) => {
  const cameras = await Cameras.read();
  res.send(cameras);
};
