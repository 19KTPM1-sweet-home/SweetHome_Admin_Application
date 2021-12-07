class authController {
    //[GET]  /login
    show(req, res) {
        const wrongPassword = req.query['wrong-password'] !== undefined;
        res.render('login',{wrongPassword});
    }
}

module.exports = new authController();