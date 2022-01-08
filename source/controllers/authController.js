const adminService = require('../services/adminService')
class authController {
    //[GET]  /login
    show(req, res) {
        const errorMsg = req.flash('errorMsg');
        res.render('login', { errorMsg, layout: false });
        // const wrongPassword = req.query['wrong-password'] !== undefined;
        // res.render('login',{layout:false, wrongPassword: wrongPassword});
    }

    //[POST] /login/change-password
    async changePassword(req, res) {
        const ack = await adminService.changePassword(req.body.username, req.body.password,req.body.newPassword);
        res.redirect('/profile?'+ack);
    }
}

module.exports = new authController();