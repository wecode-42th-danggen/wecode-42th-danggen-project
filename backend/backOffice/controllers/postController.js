const postService = require('../services/postService');
const { catchAsync } = require('../../utils/error');

const getPostInfo = catchAsync(async (req, res) => {
  const data = await postService.getPostInfo();

  return res.status(200).json({ data });
});

const changePostStatus = catchAsync(async (req, res) => {
  const { postId, postStatusId } = req.params;

  await postService.changePostStatus(postId, postStatusId);

  return res
    .status(200)
    .json({ message: 'Change Admin Post Status Successfully' });
});

module.exports = { getPostInfo, changePostStatus };
