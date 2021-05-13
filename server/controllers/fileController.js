import File from '../models/file.js';

import { getCameraPaths, getCameraNames } from '../services/cameraPaths.js';
import { makeDir, writeFile, removeDir } from '../services/cameraDirs.js';

const getMany = async (req, res) => {
  console.log('File controller getMany req.query', req.query);
  console.log('File controller getMany req.body', req.body);

  const { cameraId } = req.query;

  try {
    const files = await File.find({
      camera: cameraId,
    });
    res.status(200).send(files);
  } catch (e) {
    console.log('File controller getMany error - ', e);
    res.status(500).json(e.message);
  }
};

const createOne = async (req, res) => {
  console.log('File controller createOne req - ', req.body);
  try {
    // const file = new File(req.body);
    // await file.save();
    // res.status(201).send(file);
  } catch (e) {
    console.log('File controller createOne error - ', e);
    res.status(500).send(e.message);
  }
};

const getOne = async (req, res) => {
  console.log('File controller getOne req.body - ', req);
  const { id } = req.params;
  try {
    const file = await File.findById(id);
    res.status(200).send(file);
  } catch (e) {
    console.log('File controller getOne error - ', e);
    res.status(500).send(e.message);
  }
};

// const updateOne = async (req, res) => {
//   // console.log('controller updateOne req.body - ', req.body);
//   const { id } = req.params;
//   const {
//     name,
//     description,
//     rtspLink,
//     jpegLink,
//     jpegCreateInterval,
//     jpegCreateStartTime,
//     jpegCreateStopTime,
//   } = req.body;
//   try {
//     // const camera = await Camera.findByIdAndUpdate(id, req.body);
//     const camera = await Camera.findById(id);

//     camera.name = name;
//     camera.description = description;
//     camera.rtspLink = rtspLink;
//     camera.jpegLink = jpegLink;
//     camera.jpegCreateInterval = jpegCreateInterval;
//     camera.jpegCreateStartTime = jpegCreateStartTime;
//     camera.jpegCreateStopTime = jpegCreateStopTime;

//     await camera.save();
//     res.status(201).send(camera);
//   } catch (e) {
//     console.log("controller updateOne error - ", e);
//     res.status(500).send(e.message);
//   }
// };

// const deleteOne = async (req, res) => {
//   console.log("controller deleteOne req.params - ", req.params);
//   const { id } = req.params;
//   try {
//     const camera = await Camera.findById(id);
//     const cameraPaths = getCameraPaths(camera);
//     await removeDirsForCamera(cameraPaths);
//     camera.remove();
//     res.status(204).send();
//   } catch (e) {
//     console.log("controller deleteOne error - ", e);
//     res.status(500).send(e.message);
//   }
// };

export default {
  getMany,
  createOne,
  getOne,
  // updateOne,
  // deleteOne,
};
