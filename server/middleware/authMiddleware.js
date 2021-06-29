// import logger from '../libs/logger.js';
import jwt from '../libs/token.js';

export default (req, res, next) => {
  // console.log(req.headers.authorization);
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!req.headers.authorization || !token) {
      req.logger('authMiddleware no token');
      return res.status(401).json({ message: 'no token' });
    }

    const { userId } = jwt.verify(token);
    req.userId = userId;

    req.logger(`authMiddleware token ok userId: ${userId}`);

    next();
  } catch (e) {
    req.logger(`authMiddleware error: ${e.message}`);
    return res.status(401).json({ message: e.message });
  }
};
