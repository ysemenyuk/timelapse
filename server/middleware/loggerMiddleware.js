import { v4 as uuidv4 } from 'uuid';

import logger from '../libs/logger.js';

export default (req, res, next) => {
  const requestId = uuidv4();

  req.requestId = requestId;
  req.logger = logger.child({ requestId });

  req.logger.info(`req: ${req.method} - ${req.originalUrl}`);

  next();
};
