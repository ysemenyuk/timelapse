import { v4 as uuidv4 } from 'uuid';

import logger from '../libs/logger.js';

export default (req, res, next) => {
  const requestId = uuidv4();

  req.requestId = requestId;
  req.logger = logger.child({ requestId });

  req.logger.info(`req: ${req.method} - ${req.originalUrl}`);
  const t1 = Date.now();

  next();

  const t2 = Date.now();
  req.logger.info(`res: ${res.statusCode} - ${t2 - t1} msec`);
};
