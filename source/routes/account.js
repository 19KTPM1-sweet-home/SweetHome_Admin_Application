const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController');

router.post('/admin/create',accountController.createAdminAccount);
router.get('/admin',accountController.showAdminAccount);

module.exports = router;