const { appDataSource } = require('./index');

const getUserPostsByUserId = async (userId) => {
  return await appDataSource.query(
    `
    SELECT
      p.id as postId,
      p.title as postTitle,
      p.description as postDescription,
      u.nickname as userNickname,
      u.profile_image_url as profileImageUrl,
      pi.image_url as postImageUrl
    FROM posts p
    INNER JOIN post_images pi ON p.id=pi.post_id
    INNER JOIN users u ON u.id=p.user_id
    WHERE p.user_id=?
    `,
    [userId]
  );
};

const getUserLikesByUserId = async (userId) => {
  return await appDataSource.query(
    `
    SELECT
      l.post_id,
      l.user_id,
      post.title,
      post.image_url as postImageUrl
    FROM likes l
    INNER JOIN (
      SELECT
        p.id,
        p.user_id,
        p.title,
        pi.image_url
      FROM posts p
      INNER JOIN post_images pi ON pi.post_id=p.id
    ) as post ON post.id=l.post_id
    WHERE l.user_id=?
    `,
    [userId, userId]
  );
};

const getCommunityPostsByUserId = async (userId) => {
  return await appDataSource.query(
    `
    SELECT
      cp.user_id as userId,
      cp.id as postId,
      cp.title,
      cp.description,
      cp.image_url
    FROM community_posts cp
    WHERE cp.user_id=?
    `,
    [userId]
  );
};

const getCommunityCommentsByUserId = async (userId) => {
  return await appDataSource.query(
    `
    SELECT
      cc.id,
      cc.user_id,
      cc.community_post_id as postId,
      cc.content
    FROM community_comments cc
    WHERE cc.user_id=?
    `,
    [userId]
  );
};

const getChatsByUserId = async (userId) => {
  return await appDataSource.query(
    `
    SELECT
      c.user_id,
      c.content
    FROM chats c
    WHERE c.user_id=?
    `,
    [userId]
  );
};

module.exports = {
  getUserPostsByUserId,
  getUserLikesByUserId,
  getCommunityPostsByUserId,
  getCommunityCommentsByUserId,
  getChatsByUserId,
};
