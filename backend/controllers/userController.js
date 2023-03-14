const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const signUp = catchAsync(async (req, res) => {
  const { socialId, email, password, phoneNumber, nickName, profileImageUrl } =
    req.body;

  if (!email || !password || !phoneNumber || !nickName) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  await userService.signUp(
    socialId,
    email,
    password,
    phoneNumber,
    nickName,
    profileImageUrl
  );
  return res.status(201).json({ message: 'SUCCESS_CREATE_USER' });
});

module.exports = { signUp };
