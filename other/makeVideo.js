import { spawn } from "child_process";
import fs from 'fs';
import path from 'path';

// "ffmpeg -r 25 -i G:/0217/img-%06d.jpg -vcodec libx264 G:/output.mp4"
// const video = spawn("ffmpeg", ["-r", "25", "-i", "G:/0217/img-%06d.jpg", "-vcodec", "libx264", "G:/output2.mp4"]);

const makeVideo = (pathToImages, pathToVideoFiles, videoFileName) => {

    const video = spawn("ffmpeg", ["-r", "-y", "25", "-i", `${pathToImages}\\img-%06d.jpg`, "-vcodec", "libx264", `${pathToVideoFiles}\\${videoFileName}.mp4`]);
        
    // video.stdout.on("data", data => {
    //     console.log(`stdout: ${data}`);
    // });
    
    // video.stderr.on("data", data => {
    //     console.log(`stderr: ${data}`);
    // });
    
    video.on('error', (error) => {
        console.log(`error: ${error.message}`);
        console.log('error', (new Date()).toLocaleString())
    });
    
    video.on("close", code => {
        console.log(`child process exited with code ${code}`);
        console.log('close', (new Date()).toLocaleString())
    });
};

// setInterval(() => {
//     console.log('interval', (new Date()).toLocaleString())
//   }, 1000);

// const pathToImages = path.join('G:\\', '20210217');
// const pathToVideoFiles = 'G:\\';
// const videoFileName = 'timelapse-170221-3';

// console.log('start', (new Date()).toLocaleString())

// makeVideo(pathToImages, pathToVideoFiles, videoFileName);

// console.log('end', (new Date()).toLocaleString())

export default makeVideo;