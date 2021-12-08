class accountController{
    //[GET]  /account/admin-account
    showAdminAccount(req, res) {
        res.render('account/admin');
    }
}

module.exports = new accountController();