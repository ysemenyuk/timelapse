export const promisifyUploadStream = (uploadStream) => {
  return new Promise((resolve, reject) => {
    uploadStream.on('error', () => {
      // console.log('error uploadStream stream');
      reject('file upload error');
    });

    uploadStream.on('finish', () => {
      // console.log('finish uploadStream stream');
      resolve('file upload');
    });
  });
};
