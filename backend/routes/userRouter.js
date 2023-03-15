const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { checkValidationToken } = require('../middlewares/auth');

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

module.exports = { router };
