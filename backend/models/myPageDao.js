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
      pi.image_url as postImageUrl,
      p.created_at as createdTime
    FROM posts p
    INNER JOIN post_images pi ON p.id=pi.post_id
    INNER JOIN users u ON u.id=p.user_id
    WHERE p.user_id=?
    ORDER BY p.created_at
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
      cp.image_url,
      cp.created_at as createdTime
    FROM community_posts cp
    WHERE cp.user_id=?
    ORDER BY cp.created_at
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
      cc.content,
      cp.title
    FROM community_comments cc
    INNER JOIN community_posts cp ON cp.id=cc.community_post_id
    WHERE cc.user_id=?
    `,
    [userId]
  );
};

const getChatRoomsByUserId = async (userId) => {
  return await appDataSource.query(
    `
    SELECT
      cr.id as roomId,
      postInfo.id as postId,
      postInfo.user_id as sellerId,
      postInfo.nickname as sellerNickname,
      cr.buyer_id as buyerId,
      uu.nickname as buyerNickname,
      uu.profile_image_url as buyerImage,
      postInfo.title,
      postInfo.image_url as imageUrl
    FROM chat_rooms cr
    INNER JOIN (
      SELECT
        p.id,
        p.user_id,
        p.title,
        pi.image_url,
        u.nickname
      FROM posts p
      INNER JOIN post_images pi ON pi.post_id = p.id
      INNER JOIN users u ON u.id=p.user_id
    ) AS postInfo ON postInfo.id=cr.post_id
    INNER JOIN users uu ON uu.id=cr.buyer_id
    WHERE uu.id=? OR postInfo.user_id=?; 
    `,
    [userId, userId]
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
  getChatRoomsByUserId,
  getChatsByUserId,
};
