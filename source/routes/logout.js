const express = require('express');
const router = express.Router();
const passport = require('../passport');

// when clicked sign out button => [GET] /logout
router.get('/', function (req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;