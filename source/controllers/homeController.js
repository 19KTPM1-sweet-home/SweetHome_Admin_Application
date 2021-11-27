const Properties = require('../models/Property');

class homeController {
    //[GET]  /
    home(req, res, next) {
        res.render('home');
    }

}

module.exports = new homeController();