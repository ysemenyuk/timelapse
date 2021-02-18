import fs, { appendFileSync, readdirSync, writeFileSync } from 'fs';
import path from 'path';
import { exec } from "child_process";
import util from 'util';

const fsp = fs.promises;
const execp = util.promisify(exec);

// ffmpeg -f concat -safe 0 -i G:\videos\list.txt -c copy G:\videos\output.mp4

// list.txt
// file G:\\videos\\timelapse-01.mp4
// file G:\\videos\\timelapse-02.mp4

const concatVideoFiles = (pathToVideosDir, pathToOutputDir, videoFileName) => {

  const pathToListFile = path.join(pathToVideosDir, `${videoFileName}-list.txt`)

  writeFileSync(pathToListFile, '')

  const videosDir = path.parse(pathToVideosDir)

  const files = readdirSync(pathToVideosDir);
  files.forEach((file) => {
    if (path.extname(file) === '.mp4') {
      appendFileSync(pathToListFile, `file ${videosDir.root}\\${videosDir.base}\\\\${file}\n`)
    }
  })

  return execp(`ffmpeg -y -f concat -safe 0 -i ${pathToListFile} -c copy ${pathToOutputDir}\\${videoFileName}-video.mp4`)
    .then(({ stdout, stderr }) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
    })
    .catch((e) => {
      console.log('error:', e.message)
    })

  // fsp.readdir(pathToVideosDir)
  //   .then((files) => {
  //     return files.map(async (file) => {
  //       await fsp.appendFile(pathToListFile, `file ${videosDir.root}\\${videosDir.base}\\\\${file}\n`);
  //     });
  //   })
  //   .then(() => {
  //     return exec1(`ffmpeg -f concat -safe 0 -i G:\\videos\\list.txt -c copy G:\\videos\\output.mp4`)
  //   })
  //   .catch((e) => {
  //     console.log('error:', e.message)
  //   })

}

// const pathToApp = 'G:\\timelapse';

// const pathToVideosDir = path.join(pathToApp, 'videos', '');
// const pathToOutputDir = path.join(pathToApp);
// const videoFileName = 'fullVideo';


// console.log('start', (new Date()).toLocaleString())

// concatVideoFiles(pathToVideosDir, pathToOutputDir, videoFileName)
//   .then(() => {
//     console.log('end from then', (new Date()).toLocaleString())
//   })
//   .catch((e) => {
//     console.log('catch error', e.message)
//   })

export default concatVideoFiles;