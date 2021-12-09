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
    return new Promise((resolve,reject)=>{
         adminModel.updateOne({slug:slug},admin,(err)=>{
            if(err) {
                console.log(err);
                reject(err);
            }
            resolve('edit-profile-success');
         });

    })
}

exports.changePassword = (username,oldPassword,newPassword) =>{
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
                resolve('change-password-success');
            });
        }
        else
            resolve('wrong-password');
    });
}

exports.listAll = ()=>{
    return new Promise( (resolve, reject) => {
        adminModel.find({}).lean()
        .then((admins)=>{
            resolve(admins);
        })
        .catch((err)=>{reject(err);});
    });
}

exports.createAccount = (username,password,fullname) =>{
    return new Promise( async (resolve, reject) => {
        const existAdmin = await adminModel.findOne({username:username});
        if(existAdmin){
            resolve("exist")
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newAdminModel = new adminModel({
            username: username,
            password: hashPassword,
            fullname: fullname,
            slug:'',
        });
        newAdminModel.save((err) => {
            if(err) {
                reject(err);
            }
            resolve("add-new-account-success");
        })
    });
}