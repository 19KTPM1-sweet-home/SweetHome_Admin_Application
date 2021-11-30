const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/propertyController');

router.get('/page/:currentPage', propertyController.loadProperties);

module.exports = router;