import Camera from '../models/camera.js';
import File from '../models/file.js';

import { getCameraPaths, getCameraNames } from '../services/cameraPaths.js';
import { makeDir, writeFile, removeDir } from '../services/cameraDirs.js';

// console.log("cameraController");

const getAll = async (req, res) => {
  // console.log('controller getAll req', req);
  try {
    const cameras = await Camera.find({ user: req.user.id });
    res.status(200).send(cameras);
  } catch (e) {
    console.log('controller getAll error - ', e);
    res.status(500).json(e.message);
  }
};

const createOne = async (req, res) => {
  // console.log('- controller createOne req.body - ', req.body);
  // console.log('- controller createOne req.user - ', req.user);

  // validating req.body

  try {
    const camera = new Camera({ ...req.body, user: req.user.id });

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
  // console.log('- controller getOne req.params - ', req.params);
  // console.log('- controller getOne req.user - ', req.user);
  try {
    const camera = await Camera.findOne({
      user: req.user.id,
      _id: req.params.id,
    });

    // console.log('---camera---', camera);
    res.status(200).send(camera);
  } catch (e) {
    console.log('controller getOne error - ', e);
    res.status(500).send(e.message);
  }
};

const updateOne = async (req, res) => {
  // console.log('controller updateOne req.body - ', req.body);

  // validating req.body;

  try {
    await Camera.findOneAndUpdate(
      {
        user: req.user.id,
        _id: req.params.id,
      },
      req.body
    );

    const updatedCamera = await Camera.findOne({
      user: req.user.id,
      _id: req.params.id,
    });

    // console.log('--updatedCamera--', updatedCamera);
    res.status(201).send(updatedCamera);
  } catch (e) {
    console.log('controller updateOne error - ', e);
    res.status(500).send(e.message);
  }
};

const deleteOne = async (req, res) => {
  // console.log('controller deleteOne req.params - ', req.params);
  try {
    const camera = await Camera.findOne({
      user: req.user.id,
      _id: req.params.id,
    });

    const cameraDir = await File.find({ camera: camera._id });

    await removeDir(cameraDir.path);

    await Camera.deleteOne({
      user: req.user.id,
      _id: req.params.id,
    });

    await File.deleteMany({ camera: camera._id });

    res.status(200).send({ message: `${camera.name} was removed.` });
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
