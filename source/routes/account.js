const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController');

router.get('/admin-account',accountController.showAdminAccount);

module.exports = router;