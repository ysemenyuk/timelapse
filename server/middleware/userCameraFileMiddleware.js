import fileRepository from '../repositories/file.repository.js';

export default async (req, res, next) => {
  req.logger(`userCameraFileMiddleware fileName: ${req.params.fileName}`);

  try {
    const file = await fileRepository.getOneByName({ name: req.params.fileName });
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
