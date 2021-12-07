class accountController{
    //[GET]  /account/admin-account
    showAdminAccount(req, res) {
        res.render('login');
    }
}

module.exports = new accountController();