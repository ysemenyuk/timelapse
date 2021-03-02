import fs from 'fs';
import path from 'path';

const fsp = fs.promises;

const copySomeFiles = (pathToSrcDir, pathToOutDir, num) => {
  return fsp.readdir(pathToSrcDir)
    .then((files) => {
      let count = 1;
      const arr = files
        .map((file) => {
          if (count === 1) {
            // console.log(file)
            count = num;
            const input = path.join(pathToSrcDir, file)
            const output = path.join(pathToOutDir, file)
            return fsp.copyFile(input, output)
          } else {
            count -= 1;
            return null;
          }
        })
        .filter(item => item)

      console.log(arr)
      return Promise.all(arr);
    })
    .catch((e) => {
      console.log('catch rename err:', e.message)
    })
};

export default copySomeFiles;

// const pathToSrcDir = path.join('G:\\', 'timelapse', 'camera1', 'images', '2021-02-27')
// const pathToOutDir = path.join('G:\\', 'timelapse', 'camera1', 'images', 'tmp')

// copySomeFiles(pathToSrcDir, pathToOutDir);

// export default renameFiles;
