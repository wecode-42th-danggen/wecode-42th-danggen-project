const express = require('express');

const postRouter = require('./postRouter');

const router = express.Router();

router.use('/posts', postRouter);

module.exports = router;
