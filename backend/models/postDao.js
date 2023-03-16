const { appDataSource } = require('../models');

const createPost = async (image, postInfo) => {
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

  const { userId, title, price, description, categoryId, priceSuggestion } =
    postInfo;

  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const post = await appDataSource.query(
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

    await queryRunner.query(
      `
      INSERT INTO post_images (
        image_url,
        post_id
      ) VALUES (?, ?)
      `,
      [image.location, post.insertId]
    );
    await queryRunner.commitTransaction();
    await queryRunner.release();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();

    throw new Error('Failed To Create Post');
  }
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
    WHERE user_id=? AND id=?;
    `,
    [title, price, description, categoryId, priceSuggestion, userId, postId]
  );
};

const hidePost = async (userId, postId) => {
  return await appDataSource.query(
    `
    UPDATE posts
    SET
      hidden=1
    WHERE user_id=? AND id=?;
    `,
    [userId, postId]
  );
};

const unhidePost = async (userId, postId) => {
  return await appDataSource.query(
    `
    UPDATE posts
    SET
      hidden=0
    WHERE user_id=? AND id=?;
    `,
    [userId, postId]
  );
};

const pullUpPost = async (userId, postId) => {
  return await appDataSource.query(
    `
    UPDATE posts
    SET
      pullup_time=now()
    WHERE user_id=? AND id=?;
    `,
    [userId, postId]
  );
};

const deletePost = async (userId, postId) => {
  return await appDataSource.query(
    `
    DELETE
    FROM posts
    WHERE user_id=? AND id=?;
    `,
    [userId, postId]
  );
};

module.exports = {
  createPost,
  updatePost,
  hidePost,
  unhidePost,
  pullUpPost,
  deletePost,
};
