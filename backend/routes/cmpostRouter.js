const express = require('express');
const router = express.Router();

const cmpostController = require('../controllers/cmpostcontroller');
const { checkValidationToken } = require('../middlewares/auth');
const { upload } = require('../utils/imageUploader');

router.post(
  '/',
  upload.single('img'),
  checkValidationToken,
  cmpostController.createCmpost
);
router.patch(
  '/:postId',
  upload.single('img'),
  checkValidationToken,
  cmpostController.updateCmpost
);
router.delete('/:postId', checkValidationToken, cmpostController.deleteCmpost);

router.get('/', cmpostController.getCmpost);

module.exports = { router };
