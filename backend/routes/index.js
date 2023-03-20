const express = require('express');

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const chatRouter = require('./chatRouter');
const cmpostRouter = require('./cmpostRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/posts', postRouter);
router.use('/chats', chatRouter);
router.use('/communitypost', cmpostRouter.router);

module.exports = router;
