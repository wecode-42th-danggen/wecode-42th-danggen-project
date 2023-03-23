const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');

router.get('/', postController.getPostInfo);
router.patch('/:postId/:postStatusId', postController.changePostStatus);

module.exports = router;
