const express = require('express');

const loginRouter = require('./loginRouter');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const cmpostRouter = require('./cmpostRouter');

const router = express.Router();

router.use('/admin/login', loginRouter);
router.use('/admin/users', userRouter);
router.use('/admin/posts', postRouter);
router.use('/admin/cmpost', cmpostRouter);

module.exports = router;
