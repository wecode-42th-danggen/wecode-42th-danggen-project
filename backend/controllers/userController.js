const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const getUserImageByUserId = catchAsync(async (req, res) => {
  const userId = req.user;

  const userImage = await userService.getUserImageByUserId(userId);
  res.status(200).json(userImage);
});

const signUp = catchAsync(async (req, res) => {
  let image = req.file;
  const { email, password, phoneNumber, nickName } = req.body;

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
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    })
    .status(200)
    .json({ accessToken });
});

const waemSignIn = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }
  const accessToken = await userService.waemSignIn(email);

  return res.status(200).json({ accessToken });
});

// const waemSignOut = catchAsync(async (req, res) => {
//   const userId = req.user;
//   if (!userId) {
//     const error = new Error('NOT_EXIST_USER');
//     error.statusCode = 400;
//     throw error;
//   }
//   await userService.waemSignOut(userId);
// });

const updateUserInfo = catchAsync(async (req, res) => {
  const image = req.file;
  const userId = req.user;
  const { phoneNumber, nickName } = req.body;

  await userService.updateUserInfo(phoneNumber, nickName, image, userId);
  return res.status(200).json({ message: 'Update User Info Successfully' });
});

module.exports = {
  getUserImageByUserId,
  signUp,
  signIn,
  waemSignIn,
  //waemSignOut,
  updateUserInfo,
};
