const adminService = require('../services/adminService')
class profileController{
    //[GET] /profile
    async show(req, res){
        const admin = await adminService.getProfileBySlug(req.user.slug);
        const editSuccess = req.query['edit-profile-success'] !== undefined;
        const changePasswordSuccess = req.query['change-password-success'] !== undefined;
        const wrongPassword = req.query['wrong-password'] !== undefined
        res.render('profile',{editSuccess,changePasswordSuccess,wrongPassword,admin:admin});
    }

    //[POST] /profile/edit
    async edit(req, res){
        const ack = await adminService.editProfile(req.user.slug,req.body);
        res.redirect('/profile?'+ack);
    }
}
module.exports = new profileController();