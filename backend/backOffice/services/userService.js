const userDao = require('../models/userDao');

const getUserInfo = async () => {
  return await userDao.getUserInfo();
};

const changeUserStatus = async (userId, userStatusId) => {
  return await userDao.changeUserStatus(userId, userStatusId);
};

module.exports = { getUserInfo, changeUserStatus };
