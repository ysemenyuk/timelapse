import fs from 'fs';
import path from 'path';

const fsp = fs.promises;

const makeNum = (num) => {
  if (num < 10) {
    return `00000${num}`
  }
  if (num >= 10 && num < 100) {
  return `0000${num}`
  }
  if (num >= 100 && num < 1000) {
    return `000${num}`
  }
  if (num >= 1000 && num < 10000) {
    return `00${num}`
  }
  if (num >= 10000 && num < 100000) {
    return `0${num}`
  }
};

const renameFiles = (pathToSrcDir, pathToOutDir = pathToSrcDir) => {
  return fsp.readdir(pathToSrcDir)
    .then((files) => {
      const arr = files.map((name, index) => {
        const newName = `img-${makeNum(index)}${path.extname(name)}`
        const input = path.join(pathToSrcDir, name)
        const output = path.join(pathToOutDir, newName)
        return fsp.rename(input, output)
      })
      return Promise.all(arr);
    })
    .catch((e) => {
      console.log('catch rename err:', e.message)
    })
};

// const pathToSrcDir = path.join('G:\\', '2021-02-17')
// const pathToOutDir = path.join('G:\\', 'renamed')

// renameFiles(pathToSrcDir);

export default renameFiles;