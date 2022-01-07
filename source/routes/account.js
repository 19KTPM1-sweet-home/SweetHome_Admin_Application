const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController');

router.post('/admin/create',accountController.createAdminAccount);
router.get('/admin',accountController.showAdminAccount);
router.get('/admin/list',accountController.loadAdminAccount);
router.get('/admin/detail/:id',accountController.loadAdminDetail);
router.post('/admin/lock/:id',accountController.lockAdminAccount);
router.post('/admin/unlock/:id',accountController.unlockAdminAccount);


router.get('/user',accountController.showUserAccount);
router.get('/user/:page', accountController.loadUserPerPage);
router.get('/user/detail/:id',accountController.loadUserDetail);
router.post('/user/lock/:id',accountController.lockUserAccount);
router.post('/user/unlock/:id',accountController.unlockUserAccount);
module.exports = router;