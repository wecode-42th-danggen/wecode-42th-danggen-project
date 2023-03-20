const { appDataSource } = require('../models');
const QueryBuilder = require('./queryBuilder');

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

  const {
    userId,
    title,
    price,
    description,
    location,
    categoryId,
    priceSuggestion,
  } = postInfo;
  console.log(postInfo);
  console.log(title);

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
        location,
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
        ?,
        ?
      );
      `,
      [
        userId,
        title,
        price,
        description,
        location,
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

const createLike = async (userId, postId) => {
  return await appDataSource.query(
    `
    INSERT INTO likes (
      user_id,
      post_id
    ) VALUES (
      ?,
      ?
    )
    `,
    [userId, postId]
  );
};

const cancelLike = async (userId, postId) => {
  return await appDataSource.query(
    `
    DELETE
    FROM likes
    WHERE user_id=? AND post_id=?;
    `,
    [userId, postId]
  );
};

const getPosts = async (postId) => {
  const queryBuilder = new QueryBuilder({
    postId: postId,
  });

  const query = queryBuilder.buildQuery();
  return await appDataSource.query(
    `
  SELECT
    post.id,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        "userId", post.user_id,
        "nickname", user.nickname,
        "title", post.title,
        "price", post.price,
        "description", post.description,
        "category", category.name,
        "hidden", post.hidden,
        "location", post.location,
        "viewCount", post.view_count,
        "createdTime", post.created_at,
        "pullupTime", post.pullup_time,
        "imageUrl", image.image_url,
        "likes", (SELECT COUNT(likes.id) FROM likes WHERE likes.post_id=post.id)
      )
    ) as postInfo
  FROM posts post
  INNER JOIN categories category ON category.id=post.category_id
  INNER JOIN post_images image ON image.post_id=post.id
  INNER JOIN users user ON user.id=post.user_id
  ${query}
  GROUP BY post.id;
`
  );
};

module.exports = {
  createPost,
  updatePost,
  hidePost,
  unhidePost,
  pullUpPost,
  deletePost,
  getPosts,
  createLike,
  cancelLike,
};
