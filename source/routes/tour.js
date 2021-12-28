const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

// show login screen => [GET] /login
router.get('/', tourController.show);

router.get('/:filter/:page', tourController.loadTourPerPage);

router.post('/update-status/:homeTourId/:status', tourController.updateTourStatus);

module.exports = router;