import debug from 'debug';
import { comparePassword, encrypt, generateAuthToken } from '../helper/encryptionHelper.js';
import { User } from '../models/index.js';

const logger = debug('app:userController -> ');

export const registerUser = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = await encrypt(password);
    const isUser = await User.findOne({ where: { email } });
    if (!isUser) {
      const userData = await User.create({ userName, email, password: hashedPassword });
      return res.ok({ message: 'SUCCESS', data: userData });
    }
    return res.error('User already in the database pls login');
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ where: { email } });
    if (!isUser) {
      return res.error('User Does not exists in database');
    }
    const isPassword = await comparePassword(password, isUser.password);
    if (!isPassword) {
      return res.error('Password incorrect');
    }
    req.session.user = {
      name: isUser.name,
      userFrom: isUser.userFrom,
      _id: isUser.id,
    };
    const token = await generateAuthToken(email);
    return res.ok({ message: 'LOGGED_IN_SUCCESS', data: { isUser, token } });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const signOut = async (req, res, next) => {
  try {
    req.session.destroy();
    return res.ok('SIGNED_OUT_SUCCESS');
  } catch (err) {
    logger(err.message);
    next(err);
  }
};
