class loginController {
    //[GET]  /login
    show(req, res) {
        res.render('login');
    }

    //[POST] /login
    signIn(req, res) {
        res.redirect('/' + req.user.username);
    }

}

module.exports = new loginController();