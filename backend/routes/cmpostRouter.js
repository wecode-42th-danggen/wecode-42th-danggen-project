const express = require('express');
const router = express.Router();

const cmpostController = require('../controllers/cmpostcontroller');
const { checkValidationToken } = require('../middlewares/auth');
const { upload } = require('../utils/imageUplodaer');

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

module.exports = { router };
