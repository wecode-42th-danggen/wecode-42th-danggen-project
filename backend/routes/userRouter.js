const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { checkValidationToken } = require('../middlewares/auth');
const { upload } = require('../utils/imageUploader');

router.get('/image', checkValidationToken, userController.getUserImageByUserId);
router.post('/signup', upload.single('image'), userController.signUp);
router.post('/signin', userController.signIn);
router.post('/waemsignin', userController.waemSignIn);
//router.post('/waemsignout', checkValidationToken, userController.waemSignOut);
router.patch(
  '/',
  checkValidationToken,
  upload.single('image'),
  userController.updateUserInfo
);

module.exports = { router };
