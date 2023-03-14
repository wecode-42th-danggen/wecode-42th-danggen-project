const postService = require('../services/postServices');
const { catchAsync } = require('../utils/error');

const createPost = catchAsync(async (req, res) => {
  const { userId, title, price, description, categoryId, priceSuggestion } =
    req.body;

  await postService.createPost(
    userId,
    title,
    price,
    description,
    priceSuggestion,
    categoryId
  );

  return res.status(201).json({ message: 'Post Created Successfully' });
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

module.exports = {
  createPost,
  updatePost,
};
