const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const signUp = catchAsync(async (req, res) => {
  const { email, password, phoneNumber, nickName } = req.body;

  if (!email || !password || !phoneNumber || !nickName) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  await userService.signUp(email, password, phoneNumber, nickName);
  return res.status(201).json({ message: 'SUCCESS_CREATE_USER' });
});

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const accessToken = await userService.signIn(email, password);

  return res
    .status(200)
    .json({ message: `SUCCESS_LOG_IN, TOKEN_NUMBER : ${accessToken}` });
});

module.exports = { signUp, signIn };
