const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { checkValidationToken } = require('../middlewares/auth');
const { upload } = require('../utils/imageUploader');

router.get('/image', checkValidationToken, userController.getUserImageByUserId);
router.post('/signup', upload.single('image'), userController.signUp);
router.post('/signin', userController.signIn);

module.exports = { router };
