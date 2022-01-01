const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/', homeController.home);

router.get('/home-tour-overview/:filter', homeController.loadHomeTourByFilter);
router.get('/properties-of-interest', homeController.loadPropertiesOfInterest);
router.get('/top-10-properties-of-interest', homeController.loadTop10PropertiesOfInterest);
module.exports = router;