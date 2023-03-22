const express = require('express');

const cmpostController = require('../controllers/cmpostController');

const router = express.Router();

router.get('/', cmpostController.getCmpost);
router.delete('/:cmpostId', cmpostController.deleteCmpost);

module.exports = router;
