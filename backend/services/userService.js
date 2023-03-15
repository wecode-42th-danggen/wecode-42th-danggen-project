const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userDao = require('../models/userDao');
const validation = require('../utils/validation');

const signUp = async (email, password, phoneNumber, nickName) => {
  await validation.checkValidationEmail(email);
  await validation.checkValidationPassword(password);
  await validation.checkValdationPhoneNumber(phoneNumber);

  const userEmail = await userDao.getUserByEmail(email);
  const userPhoneNumber = await userDao.getUserByPhoneNumber(phoneNumber);
  const userNickName = await userDao.getUserByNickName(nickName);

  if (userEmail) {
    const error = new Error('ALREADY_EXIST_EMAIL');
    error.statusCode = 400;
    throw error;
  }
  if (userPhoneNumber) {
    const error = new Error('ALREADY_EXIST_PHONE_NUMBER');
    error.statusCode = 400;
    throw error;
  }

  if (userNickName) {
    const error = new Error('ALREADY_EXIST_NICKNAME');
    error.statusCode = 400;
    throw error;
  }

  if (!userEmail && !userPhoneNumber && !userNickName) {
    const salt = parseInt(process.env.SALT_ROUNDS);

    const hashedPassword = await bcrypt.hash(password, salt);
    const createUser = await userDao.createUser(
      email,
      hashedPassword,
      phoneNumber,
      nickName
    );
    return createUser;
  }
};

const accessToken = async (userInfo) => {
  const secterKey = process.env.SECRET_KEY;
  const time = new Date().getTime() / 1000 + 60 * 60 * 9;
  const currentTime = Math.floor(time);
  const expireTime = currentTime * 60 * 60 * 24;

  const payload = {
    userInfo: userInfo,
    iss: 'waem-danggen',
    iat: currentTime,
    exp: expireTime,
  };

  return jwt.sign(payload, secterKey);
};

const signIn = async (email, password) => {
  await validation.checkValidationEmail(email);
  await validation.checkValidationPassword(password);

  const checkUserInfo = await userDao.getUserByEmail(email);
  if (!checkUserInfo) {
    const error = new Error('NOT_EXIST_USER');
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await userDao.getPasswordByEmail(email);
  const checkHash = await bcrypt.compare(password, hashedPassword);

  if (!checkHash) {
    const error = new Error('INVALID_PASSWORD');
    error.statusCode = 400;
    throw error;
  }

  const userId = checkUserInfo.id;
  return accessToken(userId);
};

module.exports = { signUp, signIn };
