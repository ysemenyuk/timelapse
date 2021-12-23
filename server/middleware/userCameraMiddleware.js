import CameraRepo from '../repositories/camera.repository.js';

export default async (req, res, next) => {
  // console.log('userCameraMiddleware req.logger', req.logger);
  // console.log('userCameraMiddleware req.params', req.params);
  // console.log('userCameraMiddleware req.query', req.query);

  req.logger(`userCameraMiddleware cameraId: ${req.params.cameraId}`);
  try {
    const camera = await CameraRepo.getOne({
      userId: req.userId,
      cameraId: req.params.cameraId,
      logger: req.logger,
    });

    if (!camera) {
      return res.sendStatus(404);
    }

    req.cameraId = camera._id;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
