const adminService = require('../services/adminService')
class authController {
    //[GET]  /login
    show(req, res) {
        const wrongPassword = req.query['wrong-password'] !== undefined;
        res.render('login',{layout:false, wrongPassword: wrongPassword});
    }

    //[POST] /login/:slug/change-password
    async changePassword(req, res) {
        const ack = await adminService.changePassword(req.body.username, req.body.password,req.body.newPassword);
        console.log('/profile/'+req.params.slug+'?change-password='+ack);
        res.redirect('/profile/'+req.params.slug+'?change-password='+ack);
    }
}

module.exports = new authController();