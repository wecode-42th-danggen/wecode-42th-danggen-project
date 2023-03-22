const express = require('express');

const router = express.Router();

const chatController = require('../controllers/chatController');
const { checkValidationToken } = require('../middlewares/auth');

router.get('/', chatController.socket);

module.exports = router;
