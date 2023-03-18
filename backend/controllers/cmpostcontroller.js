const cmpostService = require('../services/cmpostService');
const { catchAsync } = require('../utils/error');

const createCmpost = catchAsync(async (req, res) => {
  const imageUrl = req.file;
  const cmpostContent = req.body;
  const cmpostInfo = JSON.parse(cmpostContent.cmpostInfo);

  if (!imageUrl || !cmpostInfo) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  await cmpostService.createCmpost(imageUrl, cmpostInfo);
  return res.status(201).json({ messgage: 'CREATE_COMMUNITY_POST' });
});

const updateCmpost = catchAsync(async (req, res) => {
  const imageUrl = req.file;
  const { title, description, categoryId } = req.body;
  const { postId } = req.params;

  await cmpostService.updateCmpost(
    imageUrl,
    title,
    description,
    categoryId,
    postId
  );

  return res.status(200).json({ message: 'UPDATE_COMMUNITY_POST' });
});

const deleteCmpost = catchAsync(async (req, res) => {
  const { postId } = req.params;

  await cmpostService.deleteCmpost(postId);

  return res.status(200).json({ message: 'DELETE_COMMUNITY_POST' });
});

module.exports = { createCmpost, updateCmpost, deleteCmpost };
