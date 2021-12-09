const adminService = require('../services/adminService')

class accountController{
    //[GET]  /account/admin
    async showAdminAccount(req, res) {
        const addAccountSuccess = req.query['add-new-account-success'] !== undefined;
        const accountExist = req.query['exist'] !== undefined;
        
        const admins = await adminService.listAll();
        res.render('account/admin',{accountExist,addAccountSuccess,admins: admins});
    }

    //POST /account/admin/create
    async createAdminAccount(req, res,next) {
        const ack = await adminService.createAccount(req.body.username, req.body.password,req.body.fullname);
        
        res.redirect('/account/admin?'+ack)
        
        
    }
}

module.exports = new accountController();