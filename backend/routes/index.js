const express = require('express');

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const cmpostRouter = require('./cmpostRouter');
const commentRouter = require('./commentRouter');
const myPageRouter = require('./myPageRouter');
const chatRouter = require('./chatRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/posts', postRouter);
router.use('/communityposts', cmpostRouter.router);
router.use('/comments', commentRouter.router);
router.use('/mypage', myPageRouter.router);
router.use('/chats', chatRouter.router);

module.exports = router;
