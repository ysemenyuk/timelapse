import File from "../models/file.js";

import {
  makeDirsForCamera,
  removeDirsForCamera,
} from "../services/cameraDirs.js";

import { getCameraPaths } from "../services/cameraPaths.js";

const getAll = async (req, res) => {
  // console.log('controller getAll req', req);
  try {
    const cameras = await Camera.find();
    res.status(200).send(cameras);
  } catch (e) {
    console.log("controller getAll error - ", e);
    res.status(500).json(e.message);
  }
};

const createOne = async (req, res) => {
  // console.log('controller createOne req - ', req.body);
  try {
    const camera = new File(req.body);
    const cameraPaths = getCameraPaths(camera);
    await makeDirsForCamera(cameraPaths);
    await camera.save();
    res.status(201).send(camera);
  } catch (e) {
    console.log("controller createOne error - ", e);
    res.status(500).send(e.message);
  }
};

// const getOne = async (req, res) => {
//   // console.log('controller getOne req.body - ', req.body);
//   const { id } = req.params;
//   try {
//     const camera = await Camera.findById(id);
//     res.status(200).send(camera);
//   } catch (e) {
//     console.log("controller getOne error - ", e);
//     res.status(500).send(e.message);
//   }
// };

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
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
};
