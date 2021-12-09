const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');

router.post('/edit',profileController.edit);
router.get('/',profileController.show);
module.exports = router;