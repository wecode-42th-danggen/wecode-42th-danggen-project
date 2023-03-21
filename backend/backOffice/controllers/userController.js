const userService = require('../services/userService');
const { catchAsync } = require('../../utils/error');

const getUserInfo = catchAsync(async (req, res) => {
  const data = await userService.getUserInfo();

  return res.status(200).json({ data });
});

const changeUserStatus = catchAsync(async (req, res) => {
  const { userId, userStatusId } = req.params;

  await userService.changeUserStatus(userId, userStatusId);

  return res.status(200).json({ message: 'Change User Status Successfully' });
});

module.exports = { getUserInfo, changeUserStatus };
