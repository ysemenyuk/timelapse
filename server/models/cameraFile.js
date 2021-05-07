import path from 'path';
import fs from 'fs';
// import { v4 as uuidv4 } from 'uuid';

const fsp = fs.promises;

const pathToApp = path.resolve('cameras');
console.log('pathToApp', pathToApp);

const pathToCamerasFile = path.resolve('server', 'data', 'cameras.json');
const pathToIdFile = path.resolve('server', 'data', 'id.json');

const writeDataFile = async (data) => {
  try {
    await fsp.writeFile(pathToCamerasFile, JSON.stringify(data, null, '\t'));
  } catch (error) {
    console.log('writeFile error', error);
    throw new Error(error);
  }
};

const readDataFile = async () => {
  try {
    const cameras = await fsp.readFile(pathToCamerasFile, 'utf8');
    if (cameras === '') {
      return [];
    }
    return JSON.parse(cameras);
  } catch (error) {
    console.log('readFile error', error);
    throw new Error(error);
  }
};

const getNextId = async () => {
  const id = await fsp.readFile(pathToIdFile, 'utf8');
  let nextId;
  if (id === '') {
    nextId = 'camera_1';
  } else {
    nextId = `camera_${Number(id) + 1}`;
  }
  await fsp.writeFile(pathToIdFile, JSON.stringify(Number(id) + 1));
  return nextId;
};

class Camera {
  constructor({
    name,
    description,
    rtspLink,
    jpegLink,
    jpegCreateInterval,
    jpegCreateStartTime,
    jpegCreateStopTime,
  }) {
    this.id = null;
    this.name = name;
    this.description = description;
    this.rtspLink = rtspLink;
    this.jpegLink = jpegLink;
    this.jpegCreateInterval = jpegCreateInterval;
    this.jpegCreateStartTime = jpegCreateStartTime;
    this.jpegCreateStopTime = jpegCreateStopTime;
  }

  static async getAll() {
    try {
      const cameras = await readDataFile();
      return cameras;
    } catch (error) {
      console.log('camera model getAll error -', error);
      throw new Error(error);
    }
  }

  async saveOne() {
    try {
      this.id = await getNextId();
      const cameras = await readDataFile();
      cameras.push(this);
      await writeDataFile(cameras);
      return this;
    } catch (error) {
      console.log('camera model saveOne error -', error);
      throw new Error(error);
    }
  }

  static async findOneById(id) {
    try {
      const cameras = await readDataFile();
      const camera = cameras.find((item) => item.id === id);
      if (!camera) {
        throw new Error('camera not found');
      }
      return camera;
    } catch (error) {
      console.log('camera model findOne error -', error);
      throw new Error(error);
    }
  }

  static async updateOne(id, newData) {
    try {
      const cameras = await Camera.getAll();
      const camera = await Camera.findOneById(id);
      const updatedCamera = { ...camera, ...newData };
      // console.log(cameras);
      const updatedCameraIndex = cameras.findIndex((item) => item.id === id);
      cameras[updatedCameraIndex] = updatedCamera;
      await writeDataFile(cameras);
      return updatedCamera;
    } catch (error) {
      console.log('camera model updateOne error -', error);
      throw new Error(error);
    }
  }

  static async deleteOne(id) {
    try {
      const cameras = await readDataFile();
      const updatedCameras = cameras.filter((item) => item.id !== id);
      await writeDataFile(updatedCameras);
    } catch (error) {
      console.log('camera model deleteOne error -', error);
      throw new Error(error);
    }
  }
}

export default Camera;
