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

    async showUserAccount(req, res) {
        res.render('account/user');
    }

    async loadUserPerPage(req, res) {
      const listUser = await adminService.loadUserPerPage(req.params.page);
      if(listUser)
        res.send(listUser);
    }

    async lockUserAccount(req, res) {
      const ack = await adminService.lockUserAccount(req.params.id);
      if(ack)
        res.send(ack);
    }

    async unlockUserAccount(req, res) {
      const ack = await adminService.unlockUserAccount(req.params.id);
      if(ack)
        res.send(ack);
    }
}

module.exports = new accountController();