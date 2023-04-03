const express = require('express');

const chatController = require('../controllers/chatController');

const router = express.Router();

router.get('/:roomId', chatController.getChatRoomsByRoomId);

module.exports = { router };
