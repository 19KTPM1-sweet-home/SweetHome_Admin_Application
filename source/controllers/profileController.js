const adminService = require('../services/adminService')
class profileController{
    //[GET] /profile
    async show(req, res){
        const admin = await adminService.getProfileBySlug(req.user.slug);
        res.render('profile',{admin:admin});
    }

    //[POST] /profile/edit
    async edit(req, res){
        const ack = await adminService.editProfile(req.user.slug,req.body);
        res.redirect('/profile?edit-profile='+ack);
    }
}
module.exports = new profileController();