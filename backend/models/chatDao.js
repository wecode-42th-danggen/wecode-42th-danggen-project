const { appDataSource } = require('../models');

const createRoom = async (userId, postId) => {
  try {
    const result = await appDataSource.query(
      `
      INSERT INTO chat_rooms (
        buyer_id, 
        post_id
      ) 
      VALUES (
        ?, 
        ?
      )
    `,
      [userId, postId]
    );

    return { raw: { insertId: result.insertId } };
  } catch (error) {
    console.error('SQL Query:', error.sql);
    console.error('createRoom Error Message:', error.sqlMessage);
  }
};

const createChat = async (userId, content, roomId) => {
  try {
    const result = await appDataSource.query(
      `
      INSERT INTO chats (
        user_id, 
        content, 
        room_id
      ) 
      VALUES (
        ?, 
        ?, 
        ?
      )
    `,
      [userId, content, roomId]
    );

    return { raw: { insertId: result.insertId } };
  } catch (error) {
    console.error('SQL Query:', error.sql);
    console.error('createChat Error Message:', error.sqlMessage);
  }
};

const getChatRoomsByRoomId = async (roomId) => {
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
      postInfo.image_url as imageUrl,
      c.content
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
    INNER JOIN chats c ON c.room_id=cr.id
    WHERE cr.id=?
    `,
    [roomId]
  );
};

module.exports = { createRoom, createChat, getChatRoomsByRoomId };
