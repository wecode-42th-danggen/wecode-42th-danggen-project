const express = require('express');

const loginRouter = require('./loginRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/admin/login', loginRouter);
router.use('/admin/users', userRouter.router);

module.exports = router;
