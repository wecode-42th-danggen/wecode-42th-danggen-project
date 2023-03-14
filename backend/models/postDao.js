const { appDataSource } = require('../models');

const createPost = async (
  userId,
  title,
  price,
  description,
  priceSuggestion,
  categoryId
) => {
  const postStatus = Object.freeze({
    onSale: 1,
    onReservation: 2,
    doneDeal: 3,
  });
  const adminPostStatus = Object.freeze({
    normal: 1,
    onReporting: 2,
    takeDown: 3,
  });
  return await appDataSource.query(
    `
    INSERT INTO posts (
      user_id, 
      title, 
      price, 
      description, 
      price_suggestion,
      category_id, 
      post_status_id,
      admin_post_status_id
    ) VALUES (
      ?, 
      ?, 
      ?, 
      ?, 
      ?,
      ?, 
      ?,
      ?
    );
  `,
    [
      userId,
      title,
      price,
      description,
      priceSuggestion,
      categoryId,
      postStatus.onSale,
      adminPostStatus.normal,
    ]
  );
};

const updatePost = async (
  userId,
  postId,
  title,
  price,
  priceSuggestion,
  description,
  categoryId
) => {
  return await appDataSource.query(
    `
    UPDATE posts
    SET
      title=?,
      price=?,
      description=?,
      category_id=?,
      price_suggestion=?
    WHERE user_id=? AND id=?
  `,
    [title, price, description, categoryId, priceSuggestion, userId, postId]
  );
};

module.exports = {
  createPost,
  updatePost,
};
