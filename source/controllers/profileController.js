const adminService = require('../services/adminService')
class profileController{
    //[GET] /profile/:slug
    async show(req, res){
        const admin = await adminService.getProfileBySlug(req.params.slug);
        res.render('profile',{admin:admin});
    }

    //[POST] /profile/:slug/edit
    async edit(req, res){
        await adminService.editProfile({_id: req.params.slug},req.body);
        res.redirect('/profile/'+req.params.slug)
    }
}
module.exports = new profileController();