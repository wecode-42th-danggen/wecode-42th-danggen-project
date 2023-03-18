const express = require('express');

const router = express.Router();

const chatController = require('../controllers/chatController');

// router.get('/', chatController.socketMessage);
router.post('/:postId', chatController.createRoom);

module.exports = router;
