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
        if(req.files.avatar) {
            const ack = await adminService.editProfile(req.user.slug,req.body, req.files.avatar[0]);
            res.redirect('/profile?'+ack);
        }
        else {
          const ack = await adminService.editProfile(req.user.slug,req.body, null);
          res.redirect('/profile?'+ack);
        }
        
        
    }
}
module.exports = new profileController();