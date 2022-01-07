const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController');

router.post('/admin/create',accountController.createAdminAccount);
router.get('/admin',accountController.showAdminAccount);
router.get('/user',accountController.showUserAccount);
router.get('/user/:page', accountController.loadUserPerPage);
router.post('/user/lock/:id',accountController.lockUserAccount);
router.post('/user/unlock/:id',accountController.unlockUserAccount);
module.exports = router;