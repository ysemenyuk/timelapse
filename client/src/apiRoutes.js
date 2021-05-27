const host = '';
const prefix = 'api';

export default {
  cameras: () => [host, prefix, 'cameras'].join('/'),
  cameraPath: (id) => [host, prefix, 'cameras', id].join('/'),
  loginPath: () => [host, prefix, 'user', 'login'].join('/'),
  registrationPath: () => [host, prefix, 'user', 'registration'].join('/'),
  authPath: () => [host, prefix, 'user', 'auth'].join('/'),
};
