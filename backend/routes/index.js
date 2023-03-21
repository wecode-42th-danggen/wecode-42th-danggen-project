const express = require('express');

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const chatRouter = require('./chatRouter');
const cmpostRouter = require('./cmpostRouter');
const commentRouter = require('./commentRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/posts', postRouter);
router.use('/chats', chatRouter);
router.use('/communityposts', cmpostRouter.router);
router.use('/comments', commentRouter.router);

module.exports = router;
