const Properties = require('../models/Property');

class homeController {
    //[GET]  /
    home(req, res) {
        if(req.user){
            res.render('home',{admin:req.user});
        }
        else{
            res.redirect('/login');
        }
    }
}

module.exports = new homeController();