import { v4 as uuidv4 } from 'uuid';
import colors from 'colors';

import logger from '../libs/logger.js';

export default (req, res, next) => {
  const requestId = uuidv4();

  req.requestId = requestId;
  req.logger = logger.child({ requestId });

  // console.log(1111, requestId);

  const t1 = Date.now();
  req.t1 = t1;
  req.logger.info(`REQ: ${req.method} - ${req.originalUrl}`);

  next();

  // const t2 = Date.now();
  // req.logger.info(`res: ${res.statusCode} - ${t2 - t1} msec`);
  // console.log(2222, requestId, t2 - t1);
};
