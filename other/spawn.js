import { spawn } from 'child_process';

// "ffmpeg -r 25 -i G:/0217/img-%06d.jpg -vcodec libx264 G:/output.mp4"

const ls = spawn('ffmpeg', ['-r', '25', '-i', 'G:/0217/img-%06d.jpg', '-vcodec', 'libx264', 'G:/output2.mp4']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('error', (error) => {
  console.log(`error: ${error.message}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
