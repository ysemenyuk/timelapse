import path from "path";

import Camera from "../models/camera.js";
import File from "../models/file.js";

import { getCameraPaths, getCameraNames } from "../services/cameraPaths.js";
import { makeDir, writeFile, removeDir } from "../services/cameraDirs.js";

// console.log('fileController');

const getFiles = async (req, res) => {
  // console.log("File controller getMany req.query", req.query);
  // console.log("File controller getMany req.body", req.body);

  const { parentId } = req.query;

  try {
    const files = await File.find({
      parent: parentId,
    });
    res.status(200).send(files);
  } catch (e) {
    console.log("File controller getFiles error - ", e);
    res.status(500).json(e.message);
  }
};

const createFile = async (req, res) => {
  // console.log("File controller createOne req - ", req.body);

  const { parentId, cameraId } = req.body;

  const parent = await File.findOne({ _id: parentId });
  const camera = await Camera.findOne({ _id: cameraId });

  const pathToFile = path.join(parent.path, "new-file.txt");

  try {
    const file = new File({
      name: "new-file.txt",
      path: pathToFile,
      camera: camera._id,
      type: "txt",
      parent: parentId,
    });

    await writeFile(pathToFile, "new-file \n");
    await file.save();

    res.status(201).send(file);
  } catch (e) {
    console.log("File controller createOne error - ", e);
    res.status(500).send(e.message);
  }
};

const createDir = async (req, res) => {
  // console.log("File controller createDir req - ", req.body);

  const { parentId, cameraId } = req.body;

  const parent = await File.findOne({ _id: parentId });
  const camera = await Camera.findOne({ _id: cameraId });

  const pathToDir = path.join(parent.path, "new-name");

  try {
    const file = new File({
      name: "new-name",
      path: pathToDir,
      camera: camera._id,
      type: "dir",
      parent: parentId,
    });

    await makeDir(pathToDir);
    await file.save();

    res.status(201).send(file);
  } catch (e) {
    console.log("File controller createOne error - ", e);
    res.status(500).send(e.message);
  }
};

const getFile = async (req, res) => {
  // console.log("File controller getFile req.body - ", req);

  const { id } = req.params;

  try {
    const file = await File.findById(id);
    res.status(200).send(file);
  } catch (e) {
    console.log("File controller getFile error - ", e);
    res.status(500).send(e.message);
  }
};

const deleteOne = async (req, res) => {
  // console.log("controller deleteOne req.params - ", req.params);

  const { id } = req.params;

  try {
    const file = await File.findById(id);
    // get full path
    // remove from disk
    file.remove();
    res.status(204).send({ message: `${file.name} was removed.` });
  } catch (e) {
    console.log("controller deleteOne error - ", e);
    res.status(500).send(e.message);
  }
};

export default {
  getFiles,
  createFile,
  createDir,
  getFile,
  // updateOne,
  deleteOne,
};
