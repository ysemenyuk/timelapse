import Camera from '../models/camera.js';
import File from '../models/file.js';

import { getCameraPaths, getCameraNames } from '../services/cameraPaths.js';
import { makeDir, writeFile, removeDir } from '../services/cameraDirs.js';

console.log('cameraController');

const getAll = async (req, res) => {
  // console.log('controller getAll req', req);
  try {
    const cameras = await Camera.find();
    res.status(200).send(cameras);
  } catch (e) {
    console.log('controller getAll error - ', e);
    res.status(500).json(e.message);
  }
};

const createOne = async (req, res) => {
  // console.log('controller createOne req - ', req.body);
  try {
    const camera = new Camera(req.body);
    const names = getCameraNames(camera);
    const paths = getCameraPaths(names);

    const cameraDir = new File({
      name: names.cameraDir,
      path: paths.pathToCameraDir,
      camera: camera._id,
      type: 'dir',
    });

    await makeDir(paths.pathToCameraDir);
    await cameraDir.save();

    const screenshotsDir = new File({
      name: names.screenshotsDir,
      path: paths.pathToScreenshotsDir,
      camera: camera._id,
      type: 'dir',
      parent: cameraDir._id,
    });

    await makeDir(paths.pathToScreenshotsDir);
    await screenshotsDir.save();

    const imagesDir = new File({
      name: names.imagesDir,
      path: paths.pathToImagesDir,
      camera: camera._id,
      type: 'dir',
      parent: cameraDir._id,
    });

    await makeDir(paths.pathToImagesDir);
    await imagesDir.save();

    const videosDir = new File({
      name: names.videosDir,
      path: paths.pathToVideosDir,
      camera: camera._id,
      type: 'dir',
      parent: cameraDir._id,
    });

    await makeDir(paths.pathToVideosDir);
    await videosDir.save();

    const logFile = new File({
      name: names.logFile,
      path: paths.pathToLogFile,
      camera: camera._id,
      type: 'txt',
      parent: cameraDir._id,
    });

    await writeFile(paths.pathToLogFile, 'log file \n');
    await logFile.save();

    camera.dir = cameraDir._id;
    await camera.save();

    res.status(201).send(camera);
  } catch (e) {
    console.log('controller createOne error - ', e);
    res.status(500).send(e.message);
  }
};

const getOne = async (req, res) => {
  // console.log('controller getOne req.body - ', req.body);
  const { id } = req.params;
  try {
    const camera = await Camera.findById(id);
    res.status(200).send(camera);
  } catch (e) {
    console.log('controller getOne error - ', e);
    res.status(500).send(e.message);
  }
};

const updateOne = async (req, res) => {
  // console.log('controller updateOne req.body - ', req.body);
  const { id } = req.params;
  const {
    name,
    description,
    rtspLink,
    jpegLink,
    jpegCreateInterval,
    jpegCreateStartTime,
    jpegCreateStopTime,
  } = req.body;
  try {
    // const camera = await Camera.findByIdAndUpdate(id, req.body);
    const camera = await Camera.findById(id);

    camera.name = name;
    camera.description = description;
    camera.rtspLink = rtspLink;
    camera.jpegLink = jpegLink;
    camera.jpegCreateInterval = jpegCreateInterval;
    camera.jpegCreateStartTime = jpegCreateStartTime;
    camera.jpegCreateStopTime = jpegCreateStopTime;

    await camera.save();
    res.status(201).send(camera);
  } catch (e) {
    console.log('controller updateOne error - ', e);
    res.status(500).send(e.message);
  }
};

const deleteOne = async (req, res) => {
  // console.log('controller deleteOne req.params - ', req.params);
  const { id } = req.params;
  try {
    const camera = await Camera.findById(id);
    // const cameraPaths = getCameraPaths(camera);
    // await removeDirsForCamera(cameraPaths);
    camera.remove();
    res.status(204).send();
  } catch (e) {
    console.log('controller deleteOne error - ', e);
    res.status(500).send(e.message);
  }
};

export default {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
};
