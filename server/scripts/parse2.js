import fs from 'fs';
import path from 'path';
import moment from 'moment';
import mongoose from 'mongoose';
import CameraFile from '../models/CameraFile.js';

const fsp = fs.promises;

const dbUri = 'mongodb+srv://qwer:qwer1234@cluster0.y8ae6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const pathToStorage = 'C:\\timelapse\\timelapse\\server\\files';
const pathToDir = '60b56c7c2fdb7d0b6a820a73\\screenshots';

const fullPath = path.join(pathToStorage, pathToDir);

const start = async () => {
  try {
    const files = await fsp.readdir(fullPath);
    console.log(222, 'files', files);

    console.log(await fsp.stat(files[0]));

    // files.map(async (file) => {
    //   console.log(await fsp.stat(file));
    // });
  } catch (error) {
    console.log(123, error);
  }
};

start();
