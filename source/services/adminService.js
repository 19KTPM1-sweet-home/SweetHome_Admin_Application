const adminModel = require('../models/Admin');
const bcrypt = require('bcrypt');
exports.findByUsername = (username)=>{
    const admin = adminModel.findOne({
        username: username
    }).lean();
    return admin;
}
exports.validPassword =  (password,admin)=>{
    return bcrypt.compare(password, admin.password);
}

exports.getProfileBySlug =async (slug)=>{
    const admin = await adminModel.findOne({slug:slug}).lean();
    return admin;
}

exports.editProfile = async (slug,admin) =>{
    await adminModel.updateOne({slug:slug},admin);
}