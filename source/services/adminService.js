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

exports.changePassword = async (username,oldPassword,newPassword) =>{
    return new Promise(async (resolve, reject) => {
        const admin = await adminModel.findOne({
            "username": username
        }).lean();
        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if(isMatch) {
            const hashPassword = await bcrypt.hash(newPassword, 10);
            // Find and update user password in database
            adminModel.updateOne({ username: username },{password: hashPassword}, (err) => {
                if(err) {
                    console.log(err);
                    reject(err);
                }
                resolve('success');
            });
        }
        else
            resolve('wrong-password');
    });
}