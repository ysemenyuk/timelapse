import { exec } from "child_process";

exec("ffmpeg -r 25 -i G:/0217/img-%06d.jpg -vcodec libx264 G:/output.mp4", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
