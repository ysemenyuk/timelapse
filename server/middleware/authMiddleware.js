import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export default async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Auth error' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log('- decoded -', decoded);

    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Auth error' });
  }
};
