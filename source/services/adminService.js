const adminModel = require('../models/Admin');
const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const cloudinary = require('../cloudinary/cloudinary');
const streamifier = require('streamifier');
const userPerPage = 5;

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

function uploadImage(img, path) {
    return new Promise((resolve, reject) => {
        // Upload user avatar to cloud
        const cld_upload_stream = cloudinary.uploader.upload_stream(
            {public_id: path}, // slug based ID (for SEO)
            function(err, result) {
                if(err) {
                    console.log('Upload error: ' + err);
                    reject(err);
                }
                resolve(result.secure_url); // return uploaded img url
            }
        );
        // Push img.buffer in to upload stream
        streamifier.createReadStream(img.buffer).pipe(cld_upload_stream);
    });
}

exports.editProfile = async (slug, admin, avatar) =>{
    return new Promise(async (resolve,reject)=>{
        if(avatar) {
            // Path to store uploaded images in cloud
            const path = 'sweet-home/images/admin/' + slug + '-avatar';

            // Upload user avatar to cloud
            const uploadedImgUrl = await uploadImage(avatar, path);
            if(uploadedImgUrl)
                admin["avatar"] = uploadedImgUrl;
        }
        
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



module.exports.loadUserPerPage = (page) => {
    return new Promise((resolve, reject) => {

        userModel
            .find()
            .select('fullName email phoneNumber avatar lock')
            .sort({'createdAt':-1})
            .skip((userPerPage * page) - userPerPage)
            .limit(userPerPage)
            .exec((err, users) => {
                const listUser = users.map((user) => {
                    return {
                        id: user._id,
                        fullName: user.fullName,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        avatar: user.avatar,
                        lock: user.lock || ""
                    }
                })
            
                // Count total tours
                userModel.countDocuments((err, count) => {
                    if(err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        resolve({
                            listUser: listUser,
                            numOfUser: count
                        });
                    }
                });
                
            });
    })
}

module.exports.lockUserAccount = (id) =>{
    return new Promise( async (resolve, reject) => {
        userModel.findOneAndUpdate({_id: id}, {lock: true}, (err) => {
            if(err) {
                console.log(err);
                reject(err);
            }
            resolve('success');
        });
    });
}

module.exports.unlockUserAccount = (id) =>{
    return new Promise( async (resolve, reject) => {
        userModel.findOneAndUpdate({_id: id}, {lock: false}, (err) => {
            if(err) {
                console.log(err);
                reject(err);
            }
            resolve('success');
        });
    });
}