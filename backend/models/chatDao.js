const { appDataSource } = require('../models');

const createRoom = async (userId, postId) => {
  try {
    return await appDataSource.query(
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
  } catch (error) {
    console.error('SQL Query:', error.sql);
    console.error('createRoom Error Message:', error.sqlMessage);
  }
};

const createChat = async (userId, content, roomId) => {
  try {
    return await appDataSource
      .createQueryBuilder()
      .insert()
      .into('chats')
      .values({ user_id: userId, content: content, room_id: roomId })
      .execute();
  } catch (error) {
    console.error('SQL Query:', error.sql);
    console.error('createChat Error Message:', error.sqlMessage);
  }
};

// const getRoom = async (roomId) => {
//   try {
//     return await appDataSource.query(
//       `
//       SELECT
//       `
//     );
//   } catch (error) {
//     throw new Error();
//   }
// };

module.exports = { createRoom, createChat };
