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
router.get('/:cmpostId', cmpostController.getCmpostDetail);

router.post(
  '/likes/:cmpostId',
  checkValidationToken,
  cmpostController.createLike
);
router.delete(
  '/likes/:cmpostId',
  checkValidationToken,
  cmpostController.cancelLike
);
router.get(
  '/likes/:cmpostId',
  checkValidationToken,
  cmpostController.getLikeStatus
);

module.exports = { router };
