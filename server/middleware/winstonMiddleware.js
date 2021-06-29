import { v4 as uuidv4 } from 'uuid';

import logger from '../libs/logger.js';

export default (req, res, next) => {
  const requestId = uuidv4();

  req.requestId = requestId;
  req.logger = logger.child({ requestId });
  req.t1 = Date.now();
  req.logger(`REQ: ${req.method} - ${req.originalUrl}`);

  next();
};
