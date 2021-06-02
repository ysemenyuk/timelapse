import path from 'path';

// import Camera from '../models/camera.js';
import File from '../models/file.js';

import {
  makeDir,
  writeFile,
  removeDir,
  removeFile,
} from '../services/fileService.js';

// console.log('fileController');

const getFiles = async (req, res) => {
  // console.log("File controller getFiles req.query -", req.query);\
  const { parentId } = req.query;

  try {
    const files = await File.find({
      parent: parentId,
    });
    res.status(200).send(files);
  } catch (e) {
    console.log('File controller getFiles error - ', e);
    res.status(500).json(e.message);
  }
};

const createFile = async (req, res) => {
  // console.log("File controller createOne req.body -", req.body);
  // console.log("File controller createOne req.query -", req.query);
  const { parentId, fileName, fileData } = req.body;

  const parent = await File.findOne({ _id: parentId });

  const fileType = fileName.split('.').pop();
  const pathToFile = path.join(parent.path, fileName);

  try {
    const file = new File({
      name: fileName,
      path: pathToFile,
      camera: parent.camera,
      type: fileType,
      parent: parent._id,
    });

    await writeFile(pathToFile, fileData);
    await file.save();

    res.status(201).send(file);
  } catch (e) {
    console.log('File controller createOne error - ', e);
    res.status(500).send(e.message);
  }
};

const createDir = async (req, res) => {
  // console.log("File controller createDir req.body -", req.body);
  // console.log("File controller createDir req.query -", req.query);
  const { parentId, dirName } = req.body;

  const parent = await File.findOne({ _id: parentId });

  const pathToDir = path.join(parent.path, dirName);

  try {
    const file = new File({
      name: dirName,
      path: pathToDir,
      camera: parent.camera,
      type: 'dir',
      parent: parentId,
    });

    await makeDir(pathToDir);
    await file.save();

    res.status(201).send(file);
  } catch (e) {
    console.log('File controller createOne error - ', e);
    res.status(500).send(e.message);
  }
};

const getFile = async (req, res) => {
  // console.log("File controller getFile req.params -", req.params);
  // console.log("File controller getFile req.query -", req.query);
  const { id } = req.params;

  try {
    const file = await File.findById(id);
    res.status(200).send(file);
  } catch (e) {
    console.log('File controller getFile error - ', e);
    res.status(500).send(e.message);
  }
};

const deleteOne = async (req, res) => {
  // console.log("File controller deleteOne req.params -", req.params);
  // console.log("File controller deleteOne req.query -", req.query);
  const { id } = req.params;

  try {
    const file = await File.findById(id);

    if (file.type === 'dir') {
      await removeDir(file.path);
    } else {
      await removeFile(file.path);
    }

    await File.deleteOne({ _id: id });

    res.status(204).send({ message: `${file.name} was removed.` });
  } catch (e) {
    console.log('controller deleteOne error - ', e);
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
