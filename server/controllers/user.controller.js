import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import expressValidator from 'express-validator';

import User from '../models/user.js';

const singup = async (req, res) => {
  // console.log('- /singup req.body - ', req.body);

  try {
    const { email, password } = req.body;
    // validation

    const candidate = await User.findOne({ email });

    if (candidate) {
      return res
        .status(400)
        .json({ message: `User with email ${email} already exist` });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    const user = new User({ email, password: hashPassword, cameras: [] });
    await user.save();

    res.json({ message: 'User was created' });
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  // console.log('- /login req.body - ', req.body);

  try {
    const { email, password } = req.body;
    // validation

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: 'User not found' });
    }

    const isPassValid = bcrypt.compareSync(password, user.password);

    if (!isPassValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server error' });
  }
};

const auth = async (req, res) => {
  // console.log('- /auth req.body - ', req.body);
  // console.log('- /auth req.user - ', req.user);

  try {
    const user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server error' });
  }
};

const getOne = async (req, res) => {
  // console.log('- /getOne req.body - ', req.body);
  // console.log('- /getOne req.user - ', req.user);

  try {
    const user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server error' });
  }
};

const updateOne = async (req, res) => {
  // console.log('- /getOne updateOne.body - ', req.body);
};

const deleteOne = async (req, res) => {
  // console.log('- /deleteOne req.params - ', req.params);
};

export default {
  singup,
  login,
  auth,
  getOne,
  updateOne,
  deleteOne,
};
