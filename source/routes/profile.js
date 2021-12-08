const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');

router.post('/:slug/edit',profileController.edit);
router.get('/:slug',profileController.show);
module.exports = router;