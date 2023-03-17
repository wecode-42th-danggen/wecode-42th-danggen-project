const jwt = require('jsonwebtoken');
const userDao = require('../models/userDao');
const { catchAsync } = require('../utils/error');

const secterKey = process.env.SECRET_KEY;

const checkValidationToken = catchAsync(async (req, res, next) => {
  const accesstoken = req.headers.authorization;

  if (!accesstoken) {
    const error = new Error('NOT_EXIST_TOKEN');
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(accesstoken, secterKey);
  const user = await userDao.checkRegisterUserId(decoded.userId);

  if (!user) {
    const error = new Error('INVALID_TOKEN');
    error.statusCode = 400;
    throw error;
  }
  req.user = decoded.userId;
  return next();
});

module.exports = { checkValidationToken };
