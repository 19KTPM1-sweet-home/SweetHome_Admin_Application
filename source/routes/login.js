const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.post('/',passport.authenticate('local'), loginController.signIn);
router.get('/',loginController.show);

module.exports = router;