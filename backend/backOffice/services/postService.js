const postDao = require('../models/postDao');

const getPostInfo = async () => {
  return await postDao.getPostInfo();
};

const changePostStatus = async (postId, postStatusId) => {
  return await postDao.changePostStatus(postId, postStatusId);
};

module.exports = { getPostInfo, changePostStatus };
