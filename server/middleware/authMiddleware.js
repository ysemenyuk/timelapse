import jwt from 'jsonwebtoken';

import userActions from '../actions/user.actions.js';

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Auth error' });
    }

    const { userId } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await userActions.getOne({ _id: userId });
    // req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Auth error' });
  }
};
