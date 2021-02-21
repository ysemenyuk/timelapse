import { spawn } from "child_process";
import path from 'path';

import { logger } from './utils.js'

const makeVideoFile = (pathToImages, pathToOutputDir, videoFileName) => {

    const pathToVideoFile = path.join(pathToOutputDir, `${videoFileName}.mp4`)
    
    const settings = ["-y", "-r", "25", "-i", `${pathToImages}\\img-%06d.jpg`, "-vcodec", "libx264", `${pathToVideoFile}`];
    const video = spawn("ffmpeg", settings);
        
    video.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });
    
    video.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });
    
    video.on('error', (error) => {
        console.log(`error: ${error.message}`);
        console.log('error', (new Date()).toLocaleString())
    });
    
    video.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
        console.log('close', (new Date()).toLocaleString())
    });
};

export default makeVideoFile;


// import { cam1 } from './settings.js';

// const { pathToImagesDir, pathToVideosDir, pathToLogFile } = cam1;
// const fileName = '20210220';
// const imagesDirName = '20210220';
// const pathToImages = path.join(pathToImagesDir, imagesDirName);

// makeVideoFile(pathToImages, pathToVideosDir, fileName, pathToLogFile)
