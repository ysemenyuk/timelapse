import { spawn } from "child_process";
import fs from 'fs';
import path from 'path';

// "ffmpeg -r 25 -i G:/0217/img-%06d.jpg -vcodec libx264 G:/output.mp4"
// const video = spawn("ffmpeg", ["-r", "25", "-i", "G:/0217/img-%06d.jpg", "-vcodec", "libx264", "G:/output2.mp4"]);

const makeVideo = (pathToImages, outputPath, videoFileName) => {
    const video = spawn("ffmpeg", ["-r", "25", "-i", `${pathToImages}\\img-%06d.jpg`, "-vcodec", "libx264", `${pathToVideoFiles}\\${videoFileName}.mp4`]);
        
    video.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });
    
    video.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });
    
    video.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });
    
    video.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
};

const pathToImages = path.join('G:\\', '2021-02-17');
const pathToVideoFiles = 'G:\\';
const videoFileName = 'timelapse-170221';

makeVideo(pathToImages, pathToVideoFiles, videoFileName);

export default makeVideo;