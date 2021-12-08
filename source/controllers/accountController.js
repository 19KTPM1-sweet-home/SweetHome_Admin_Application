const adminService = require('../services/adminService')

class accountController{
    //[GET]  /account/admin
    async showAdminAccount(req, res) {
        const admins = await adminService.listAll();
        res.render('account/admin',{admins: admins});
    }

    //POST /account/admin/create
    async createAdminAccount(req, res,next) {
        const ack = await adminService.createAccount(req.body.username, req.body.password,req.body.fullname);
        
        res.redirect('/account/admin?status='+ack)
        
        
    }
}

module.exports = new accountController();