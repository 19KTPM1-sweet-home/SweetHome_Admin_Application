const express = require('express');
const router = express.Router();
const passport = require('../passport');
const loginController = require('../controllers/authController');



// submit login form => [POST] /login
router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?wrong-password'
}));

// show login screen => [GET] /login
router.get('/', loginController.show);

module.exports = router;