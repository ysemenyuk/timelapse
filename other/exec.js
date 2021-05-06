// import { exec } from 'child_process';
import util from 'util';

// exec("ffmpeg -r 25 -i G:/0217/img-%06d.jpg -vcodec libx264 G:/output.mp4",
//   (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });

const execp = util.promisify(require('child_process').exec);

execp('ffmpeg -r 25 -i G:/0217/img-%06d.jpg -vcodec libx264 G:/output.mp4')
  .then(({ stdout, stderr }) => {
    console.log('stdout:', stdout);
    console.error('stderr:', stderr);
  })
  .catch((e) => {
    console.log('error:', e.message);
  });
