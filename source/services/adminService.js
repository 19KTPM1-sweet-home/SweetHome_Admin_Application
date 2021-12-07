const adminModel = require('../models/Admin');
const bcrypt = require('bcrypt');
exports.findByUsername = (username)=>{
    const admin = adminModel.findOne({
        username: username
    }).lean();
    return admin;
}
exports.validPassword =  (password,admin)=>{
    bcrypt.hash("admin",10,(err,hash)=>{
        console.log(hash);
    })
    return bcrypt.compare(password, admin.password);
}