const express = require('express');
const router = express.Router();
const passport = require('../passport');
const loginController = require('../controllers/authController');


// change password => [POST] /login/:slug/change-password
router.post('/change-password', loginController.changePassword)

// submit login form => [POST] /login
router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?error'
}));

// show login screen => [GET] /login
router.get('/', loginController.show);

module.exports = router;