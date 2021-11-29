const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/propertyController');

router.get('/', propertyController.show);

module.exports = router;