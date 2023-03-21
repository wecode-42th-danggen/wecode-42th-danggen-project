const express = require('express');

const loginRouter = require('./loginRouter');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');

const router = express.Router();

router.use('/admin/login', loginRouter);
router.use('/admin/users', userRouter);
router.use('/admin/posts', postRouter);

module.exports = router;
