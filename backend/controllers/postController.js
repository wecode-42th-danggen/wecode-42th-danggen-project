const postService = require('../services/postServices');
const { catchAsync } = require('../utils/error');
const { deleteImage } = require('../utils/imageUplodaer');

const createPost = catchAsync(async (req, res) => {
  const image = req.file;
  const { postContent } = req.body;
  const postInfo = JSON.parse(postContent);

  if (!image) {
    const error = new Error('Image Upload Failed');
    error.statusCode = 400;
    throw error;
  }

  try {
    await postService.createPost(image, postInfo);

    return res.status(201).json({ message: 'Post Created Successfully' });
  } catch (err) {
    deleteImage(image.key);
    throw err;
  }
});

const updatePost = catchAsync(async (req, res) => {
  const { userId, title, price, description, categoryId, priceSuggestion } =
    req.body;
  const { postId } = req.params;

  await postService.updatePost(
    userId,
    postId,
    title,
    price,
    priceSuggestion,
    description,
    categoryId
  );

  return res.status(200).json({ message: 'Post Updated Successfully' });
});

const hidePost = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  await postService.hidePost(userId, postId);

  return res.status(200).json({ message: 'Post Hided Successfully' });
});

const unhidePost = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  await postService.unhidePost(userId, postId);

  return res.status(200).json({ message: 'Post Show Again Successfully' });
});

const pullUpPost = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  await postService.pullUpPost(userId, postId);

  return res.status(200).json({ message: 'Post Pulled Up Successfully' });
});

const deletePost = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  await postService.deletePost(userId, postId);

  return res.status(200).json({ message: 'Post Deleted Successfully' });
});

module.exports = {
  createPost,
  updatePost,
  hidePost,
  unhidePost,
  pullUpPost,
  deletePost,
};
