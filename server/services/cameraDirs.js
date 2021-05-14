import fs from "fs";
import path from "path";

const fsp = fs.promises;

console.log("cameraDirs");

// import { __dirname } from '../index.js';
// const mainPath = path.join(__dirname, '..', 'cameras');

const mainPath = path.join(path.resolve(), "..", "cameras");
// console.log('cameraDirs mainPath - ', mainPath);

const makeDir = (pathToDir) => {
  console.log("makeDir pathToDir - ", pathToDir);
  const fullPath = path.join(mainPath, pathToDir);
  return fsp.mkdir(fullPath);
};

const writeFile = (pathToFile, data = "") => {
  console.log("writeFile pathToFile - ", pathToFile);
  const fullPath = path.join(mainPath, pathToFile);
  return fsp.writeFile(fullPath, data);
};

const removeDir = (pathToDir) => {
  console.log("removeDir pathToDir - ", pathToDir);
  const fullPath = path.join(mainPath, pathToDir);
  return fsp
    .rmdir(fullPath, { recursive: true })
    .catch((e) => console.log(`catch removeDir error: ${e.message}`));
};

export { makeDir, writeFile, removeDir };
