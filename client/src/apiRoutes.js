const host = '';
const prefix = 'api';

export default {
  cameras: () => [host, prefix, 'cameras'].join('/'),
  cameraPath: (id) => [host, prefix, 'cameras', id].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  signupPath: () => [host, prefix, 'signup'].join('/'),
};
