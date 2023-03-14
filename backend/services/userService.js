const bcrypt = require('bcrypt');

const userDao = require('../models/userDao');
const validation = require('../utils/validation');

const signUp = async (
  socialId,
  email,
  password,
  phoneNumber,
  nickName,
  profileImageUrl
) => {
  await validation.checkValidationEmail(email);
  await validation.checkValidationPassword(password);
  await validation.checkValdationPhoneNumber(phoneNumber);

  const userEmail = await userDao.getUserEmail(email);
  const userPhoneNumber = await userDao.getUserPhoneNumber(phoneNumber);
  const userNickName = await userDao.getUserNickName(nickName);

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
      socialId,
      email,
      hashedPassword,
      phoneNumber,
      nickName,
      profileImageUrl
    );
    return createUser;
  }
};

module.exports = { signUp };
