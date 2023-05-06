const express = require('express');

const transferController = require('../controllers/transfer.controller');

const router = express.Router();

router.route('/').post(transferController.transfer);

module.exports = router;
