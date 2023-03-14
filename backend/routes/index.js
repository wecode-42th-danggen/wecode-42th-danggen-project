const express = require('express');

const postRouter = require('./postRouter');

const router = express.Router();
const userRouter = require('./userRouter');

router.use('/user', userRouter.router);

router.use('/posts', postRouter);

module.exports = router;
