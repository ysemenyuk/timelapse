import fs from 'fs';
import path from 'path';

const fsp = fs.promises;

const copySomeFiles = (pathToSrcDir, pathToOutDir, num) => {

 fsp.readdir(pathToSrcDir)
  // .then(res => console.log(res))
  .then(dirs => {
    const dirsArray = dirs.map(dir => {
      const pathToDir = path.join(pathToSrcDir, dir)
      return fsp.readdir(pathToDir)
        .then((files) => {
          let count = 1;
          const filesArray = files
            .map((file) => {
              if (count === 1) {
                // console.log(file)
                count = num;
                const input = path.join(pathToSrcDir, dir, file)
                const output = path.join(pathToOutDir, file)
                return fsp.copyFile(input, output)
              } else {
                count -= 1;
                return null;
              }
            })
            .filter(item => item)
    
          // console.log(arr)
          return Promise.all(filesArray);
        })

    })
    return Promise.all(dirsArray);
  })

  //   .catch((e) => {
  //     console.log('catch rename err:', e.message)
  //   })

};

export default copySomeFiles;

// const pathToSrcDir = path.join('G:\\', 'timelapse', 'camera1', 'images')
// const pathToOutDir = path.join('G:\\', 'timelapse', 'camera1', 'images', 'tmp')

// copySomeFiles(pathToSrcDir, pathToOutDir, 10);
