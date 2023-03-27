const { appDataSource } = require('../models');
const QueryBuilder = require('./queryBuilder');

const createPost = async (
  image,
  title,
  price,
  description,
  categoryId,
  priceSuggestion,
  location,
  userId
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

  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const post = await queryRunner.query(
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

    for (let i = 0; i < image.length; i++) {
      await queryRunner.query(
        `
        INSERT INTO post_images (
          image_url,
          post_id
        ) VALUES (?, ?)
        `,
        [image[i].location, post.insertId]
      );
    }

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
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.query(
      `
      DELETE
      FROM post_images
      WHERE post_id=?;
      `,
      [postId]
    );

    await queryRunner.query(
      `
      DELETE
      FROM posts
      WHERE user_id=? AND id=?;
      `,
      [userId, postId]
    );

    await queryRunner.commitTransaction();
    await queryRunner.release();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();

    throw new Error('Failed To Delete Post');
  }
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

const getLikeStatus = async (userId, postId) => {
  const [result] = await appDataSource.query(
    `
    SELECT EXISTS(
      SELECT id FROM likes WHERE user_id=? AND post_id=?
    ) AS isliked
    `,
    [userId, postId]
  );

  return !!parseInt(result.isliked);
};

const getPosts = async (postId, keyword) => {
  const queryBuilder = new QueryBuilder(postId, keyword);
  const query = queryBuilder.buildQuery();

  return await appDataSource.query(
    `
    SELECT
      post.id,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "id", post.id,
          "userId", post.user_id,
          "nickname", user.nickname,
          "profileImageUrl", user.profile_image_url,
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

const getPostViewsByPostId = async (postId) => {
  return await appDataSource.query(
    `
    SELECT
      id,
      view_count as viewCount
    FROM posts
    WHERE id = ?
    `,
    [postId]
  );
};

const addPostViewCount = async (viewCount, postId) => {
  return await appDataSource.query(
    `
    UPDATE posts
    SET view_count = ?
    WHERE id = ?
    `,
    [viewCount, postId]
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
  getPostViewsByPostId,
  addPostViewCount,
  getLikeStatus,
};
