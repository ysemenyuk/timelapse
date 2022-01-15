import CameraFileRepo from '../repositories/cameraFile.repository.js';

export default async (req, res, next) => {
  req.logger(`userCameraFileMiddleware fileName: ${req.params.fileName}`);

  try {
    const file = await CameraFileRepo.getOneByName({ filename: req.params.fileName });
    // console.log(file);

    if (!file) {
      return res.sendStatus(404);
    }

    if (file.user.toString() !== req.userId) {
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    return res.sendStatus(500);
  }
};
