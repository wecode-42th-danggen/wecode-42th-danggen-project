const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');
const { deleteImage } = require('../utils/imageUploader');

const getUserImageByUserId = catchAsync(async (req, res) => {
  const userId = req.user;

  const userImage = await userService.getUserImageByUserId(userId);
  res.status(200).json(userImage);
});

const signUp = catchAsync(async (req, res) => {
  let image = req.file;
  const { email, password, phoneNumber, nickName } = req.body;

  // if (!image) {
  //   image = null;
  // }

  if (!email || !password || !phoneNumber || !nickName) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  await userService.signUp(email, password, phoneNumber, nickName, image);
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
  res
    .cookie('count', 'viewCount', {
      maxAge: 60000000,
      httpOnly: false,
      secure: true,
      sameSite: 'None',
    })
    .status(200)
    .json({ accessToken });
});

module.exports = { getUserImageByUserId, signUp, signIn };
