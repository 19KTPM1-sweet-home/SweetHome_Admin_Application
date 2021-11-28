const Properties = require('../models/Property');

class homeController {
    //[GET]  /
    home(req, res) {
        res.render('home');
    }

    add(req, res) {
        console.log("hello");
        console.log(req.body.propertyFeature[0]);
        console.log(req.body.propertyFeature[1]);
    }
}

module.exports = new homeController();