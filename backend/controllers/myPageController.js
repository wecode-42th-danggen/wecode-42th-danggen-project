const myPageService = require('../services/myPageService');
const { catchAsync } = require('../utils/error');

const getUserPostsByUserId = catchAsync(async (req, res) => {
  const userId = req.user;

  const data = await myPageService.getUserPostsByUserId(userId);
  res.status(200).json({ data });
});

const getUserLikesByUserId = catchAsync(async (req, res) => {
  const userId = req.user;

  const data = await myPageService.getUserLikesByUserId(userId);
  res.status(200).json({ data });
});

const getCommunityPostsByUserId = catchAsync(async (req, res) => {
  const userId = req.user;

  const data = await myPageService.getCommunityPostsByUserId(userId);
  res.status(200).json({ data });
});

const getCommunityCommentsByUserId = catchAsync(async (req, res) => {
  const userId = req.user;

  const data = await myPageService.getCommunityCommentsByUserId(userId);
  res.status(200).json({ data });
});

const getChatRoomsByUserId = catchAsync(async (req, res) => {
  const userId = req.user;

  const data = await myPageService.getChatRoomsByUserId(userId);
  res.status(200).json({ data });
});

const getChatsByUserId = catchAsync(async (req, res) => {
  const userId = req.user;

  const data = await myPageService.getChatsByUserId(userId);
  res.status(200).json({ data });
});

module.exports = {
  getUserPostsByUserId,
  getUserLikesByUserId,
  getCommunityPostsByUserId,
  getCommunityCommentsByUserId,
  getChatRoomsByUserId,
  getChatsByUserId,
};
