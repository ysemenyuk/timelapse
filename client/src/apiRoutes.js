const host = '';
const prefix = 'api';

export default {
  camerasPath: () => [host, prefix, 'cameras'].join('/'),
  cameraPath: (id) => [host, prefix, 'cameras', id].join('/'),
  loginPath: () => [host, prefix, 'user', 'login'].join('/'),
  singupPath: () => [host, prefix, 'user', 'singup'].join('/'),
  authPath: () => [host, prefix, 'user', 'auth'].join('/'),
};
