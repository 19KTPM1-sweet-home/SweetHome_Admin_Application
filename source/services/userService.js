const userModel = require('../models/User');
const bcrypt = require('bcrypt');
exports.findByEmail = (email)=>{
    return new Promise((resolve, reject)=>{
        userModel.findOne({email: email})
            .then((user)=>{resolve(user);})
            .catch((err)=>{reject(err);})               
    })
}
exports.validPassword = (password,user)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if(err)
            {
                reject(err);
            }
            bcrypt.compare(user.password, hash, function(err, result) {
                if(err)
                {
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        });
    })
}