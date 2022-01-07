const adminService = require('../services/adminService')

class accountController{
    //[GET]  /account/admin
    async showAdminAccount(req, res) {
        res.render('account/admin');
    }

    async loadAdminAccount(req, res) {
        const addAccountSuccess = req.query['add-new-account-success'] !== undefined;
        const accountExist = req.query['exist'] !== undefined;
        const admins = await adminService.listAll();
        if(admins) {
            res.send({
                listAdmin: admins,
                accountExist: accountExist,
                addAccountSuccess: addAccountSuccess,
                currentAdminId: req.user._id.toString()
            })
        }
        // res.render('account/admin',{accountExist,addAccountSuccess,admins: admins});
    }

    async lockAdminAccount(req, res) {
      const ack = await adminService.lockAdminAccount(req.params.id);
      if(ack)
        res.send(ack);
    }

    async loadAdminDetail(req, res) {
      const admin = await adminService.loadAdminDetail(req.params.id);
      res.render('adminDetail', {admin});
    }

    async unlockAdminAccount(req, res) {
      const ack = await adminService.unlockAdminAccount(req.params.id);
      if(ack)
        res.send(ack);
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

    async loadUserDetail(req, res) {
      const user = await adminService.loadUserDetail(req.params.id);
      res.render('userDetail', {user});
    }
}

module.exports = new accountController();