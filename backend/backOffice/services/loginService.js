const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userDao = require('../../models/userDao');
const validation = require('../../utils/validation');

const login = async (email, password) => {
  const accessToken = async (userId) => {
    const secterKey = process.env.SECRET_KEY;
    const time = new Date().getTime() / 1000 + 60 * 60 * 9;
    const currentTime = Math.floor(time);
    const expireTime = currentTime * 60 * 60 * 24;

    const payload = {
      userId: userId,
      iss: 'waem-danggen',
      iat: currentTime,
      exp: expireTime,
    };

    return jwt.sign(payload, secterKey);
  };

  await validation.checkValidationEmail(email);
  await validation.checkValidationPassword(password);

  if (process.env.ADMIN_EMAIL !== email) {
    const error = new Error('NOT_ADMIN_ACCOUNT');
    error.statusCode = 401;
    throw error;
  }

  const hashedPassword = await userDao.getPasswordByEmail(email);
  const checkHash = await bcrypt.compare(password, hashedPassword);

  if (!checkHash) {
    const error = new Error('INVALID_PASSWORD');
    error.statusCode = 400;
    throw error;
  }

  const userId = hashedPassword.id;

  return accessToken(userId);
};

module.exports = { login };
