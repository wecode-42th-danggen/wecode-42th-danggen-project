const { appDataSource } = require('../models');

const createRoom = async (userId, postId) => {
  return await appDataSource
    .createQueryBuilder()
    .insert()
    .into('chat_rooms')
    .values({ buyer_id: userId, post_id: postId })
    .execute();
};

const createChat = async (userId, content, roomId) => {
  return await appDataSource
    .createQueryBuilder()
    .insert()
    .into('chats')
    .values({ user_id: userId, content: content, room_id: roomId })
    .execute();
};

module.exports = { createRoom, createChat };
