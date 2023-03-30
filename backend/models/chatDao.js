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

module.exports = { createRoom, createChat };
