// import logger from '../libs/logger.js';
import jwt from '../libs/token.js';

export default (req, res, next) => {
  // console.log(req.headers);
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      req.logger.warn('no token');
      return res.status(401).json({ message: 'no token' });
    }

    const { userId } = jwt.verify(token);
    req.userId = userId;
    // req.user = await userActions.getOne({ _id: userId });

    req.logger.info(`token ok - userId: ${userId}`);

    next();
  } catch (e) {
    req.logger.error(new Error(e));
    return res.status(401).json({ message: e.message });
  }
};
