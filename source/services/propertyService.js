const propertyModel = require('../models/Property');
const categoryModel = require('../models/Category');
const { mongooseToObject } = require('../util/mongoose');
const mongoose = require('mongoose');
const slugify = require('slugify');
const uniqid = require('uniqid');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// --------CLOUDINARY SETUP---------
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.loadProperties = (propertiesPerPage, currentPage) => {
    return new Promise((resolve, reject) => {
        // load properties corresponding to current page
        // load from (propertiesPerPage * currentPage) - propertiesPerPage
        // ex: propertiesPerPage = 8, currentPage = 1 => 8 * 1 - 8 = 0 => the 1st page will not skip any element
        // ex: propertiesPerPage = 8, currentPage = 2 => 8 * 2 - 8 = 8 => the 2nd page will skip 8 elements
        propertyModel
            .find()
            .sort({'updatedAt':-1})
            .skip((propertiesPerPage * currentPage) - propertiesPerPage)
            .limit(propertiesPerPage)
            .exec((err, properties) => {
                if(err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    propertyModel.countDocuments((err, count) => {
                        if(err) {
                            console.log(err);
                            reject(err);
                        }
                        else {
                            resolve({
                                properties: properties,
                                count: count
                            });
                        }
                    });
                }
            });
    })
}

module.exports.loadProperty = (propertyId) => {
    return new Promise((resolve, reject) => {
        propertyModel.findById(propertyId, function (err, property) {
            if(err) {
                console.log(err);
                reject(err);
            }
            resolve(property);
        });
    });
}

async function generateUniqueSlug(model, field) {
    return new Promise((resolve, reject) => {
        const slug = uniqid((slugify(model[field], {lower:true, locale: 'vi'}) + '-'));
        model.slug = slug;
        resolve(slug);
    });
}


async function addNewPropertyToCategoryCollection(categoryId,propertyId){
    return new Promise(async (resolve, reject) => {
        categoryModel.findOne({_id:categoryId})
        .then((category)=>{
            let newProperties = mongooseToObject(category).properties
            newProperties.push(mongoose.Types.ObjectId(propertyId));
            categoryModel.updateOne({_id:categoryId},{properties:newProperties})
            .then(()=>{
                resolve('success')
            })
            .catch((error) => {
                reject(error);
            })
        })
        .catch((error) => {
            reject(error);
        })
        
    })
}

async function getCategoryIdByName(categoryName) {
    return new Promise(async (resolve, reject) => {
        categoryModel.findOne({ name: categoryName }, (err, category) => {
            if(err) {
                console.log(err);
                reject(err);
            }
            resolve(mongooseToObject(category)._id.toString());
        });
    });
}

async function generateUploadPath(base, listOfImage, slug, type) {
    // ---------PARAMETER---------
    // base: base path to img
    // type: 'preview' or 'detail' (for dividing img into folders according to type)
    return new Promise((resolve, reject) => {
        // Array contains paths to store uploaded images
        var pathList = [];
        for(let i = 0; i < listOfImage.length; i++) {
            pathList.push(base + slug + '-' + type + '-' + i.toString());
            if(i == listOfImage.length - 1)
                resolve(pathList);
        }
    });
}

async function uploadImageToCloud(listOfPath, listOfImage) {
    return new Promise((resolve, reject) => {
        var resultUrl = [];
        listOfImage.forEach((img, index) => {
            const cld_upload_stream = cloudinary.uploader.upload_stream(
                {public_id: listOfPath[index]}, // slug based ID (for SEO)
                function(err, result) {
                    if(err) {
                        console.log('Upload error: ' + err);
                        reject(err);
                    }
                    resultUrl.push(result.secure_url);
                    if(index == listOfImage.length - 1) {
                        resolve(resultUrl);
                    }
                }
            );
            // Push img.buffer in to upload stream
            streamifier.createReadStream(img.buffer).pipe(cld_upload_stream);
        });
    });
}

module.exports.addNewProperty = (previewImage, detailImages, newProperty) => {
    // ---------PARAMETER---------
    // previewImage: array contains preview image of property (just 1 image)
    // detailImages: array contains detail images of property
    // newProperty: object other data of property (in text)
    return new Promise(async (resolve, reject) => {

        // Create seller object with data in POST request
        const tmpSeller = {
            name: newProperty.sellerName,
            email: newProperty.sellerEmail,
        };
        if(newProperty.sellerPhoneNumber != '')
            tmpSeller["phoneNumber"] = newProperty.sellerPhoneNumber;


        // Get category objectID from database
        const categoryObjectId = await getCategoryIdByName(newProperty.propertyCategory);
        // Create category object with data in POST request
        const tmpCategory = {
            name: newProperty.propertyCategory,
            categoryId: mongoose.Types.ObjectId(categoryObjectId)
        };
        

        // Create model for new property to be saved to database with data in POST request
        // previewImage, detailImage, slug are set to default and will be generated later
        const newPropertyModel = new propertyModel({
            name: newProperty.propertyName,
            address: newProperty.propertyAddress,
            description: newProperty.propertyDescription,
            feature: newProperty.propertyFeature,
            previewImage: "default",
            price: newProperty.propertyPrice,
            seller: tmpSeller,
            rate: newProperty.propertyRate,
            status: newProperty.propertyStatus,
            category: tmpCategory,
            detailImage: ['default'],
            slug: 'default'
        });

        // Generate slug from property name, language: vi
        const slugGenerateField = 'name';
        const slug = await generateUniqueSlug(newPropertyModel, slugGenerateField);

        // Base paths to store uploaded images
        const baseForPreview = 'sweet-home/images/property/' + slug + '/preview/';
        const baseForDetail = 'sweet-home/images/property/' + slug + '/detail/';
        
        // Generate upload path for preview and detail images
        const previewPath = await generateUploadPath(baseForPreview, previewImage, slug, "preview");
        const detailPaths = await generateUploadPath(baseForDetail, detailImages, slug, "detail");

        // Save generated paths to model
        var previewImgUrls = [];
        var detailImgUrls = [];
        previewImgUrls = await uploadImageToCloud(previewPath, previewImage);
        detailImgUrls = await uploadImageToCloud(detailPaths, detailImages);
        newPropertyModel.previewImage = previewImgUrls[0];
        newPropertyModel.detailImage = detailImgUrls;
        // Save model to database
        newPropertyModel.save((err,doc) => {
            if (err) {
                reject(err);
                console.error(err);
            }
            else{
                newPropertyId = doc._id.toString();
                addNewPropertyToCategoryCollection(categoryObjectId,newPropertyId);
                resolve('success'); // ACK msg
            }
        });
    })
}

module.exports.deleteProperty = (propertyId) => {
    return new Promise(async (resolve, reject) => {
        propertyModel.deleteOne({ _id: propertyId }, function (err) {
            if(err) {
                console.log(err);
                reject(err);
            }
            resolve('success');
        });
    });
}

module.exports.editProperty = (propertyId, editProperty) => {
    // ---------PARAMETER---------
    // previewImage: array contains preview image of property (just 1 image)
    // detailImages: array contains detail images of property
    // editProperty: object other data of property (in text)
    return new Promise(async (resolve, reject) => {
        // Create seller object with data in POST request
        const tmpSeller = {
            name: editProperty.sellerName,
            email: editProperty.sellerEmail,
        };
        if(editProperty.sellerPhoneNumber != '')
            tmpSeller["phoneNumber"] = editProperty.sellerPhoneNumber;


        // Get category objectID from database
        const categoryObjectId = await getCategoryIdByName(editProperty.propertyCategory);
        // Create category object with data in POST request
        const tmpCategory = {
            name: editProperty.propertyCategory,
            categoryId: mongoose.Types.ObjectId(categoryObjectId)
        };
        

        // Create a temp property to be saved to database with data in POST request
        const tmpProperty = {
            name: editProperty.propertyName,
            address: editProperty.propertyAddress,
            description: editProperty.propertyDescription,
            feature: editProperty.propertyFeature,
            price: editProperty.propertyPrice,
            seller: tmpSeller,
            rate: editProperty.propertyRate,
            status: editProperty.propertyStatus,
            category: tmpCategory,
        };


        // Generate slug from property name, language: vi
        const slugGenerateField = 'name';
        const slug = await generateUniqueSlug(tmpProperty, slugGenerateField);

        // if(previewImage) {
        //     // Base paths to store uploaded images
        //     const baseForPreview = 'sweet-home/images/property/' + slug + '/preview/';

        //     // Generate upload path for preview and detail images
        //     const previewPath = await generateUploadPath(baseForPreview, previewImage, slug, "preview");

        //     // Save generated paths to model
        //     var previewImgUrls = [];
        //     previewImgUrls = await uploadImageToCloud(previewPath, previewImage);
        //     tmpProperty['previewImage'] = previewImgUrls[0];
        // }
        
        // if(detailImages) {
        //     // Base paths to store uploaded images
        //     const baseForDetail = 'sweet-home/images/property/' + slug + '/detail/';

        //     // Generate upload path for preview and detail images
        //     const detailPaths = await generateUploadPath(baseForDetail, detailImages, slug, "detail");

        //     // Save generated paths to model
        //     var detailImgUrls = [];
        //     detailImgUrls = await uploadImageToCloud(detailPaths, detailImages);
        //     tmpProperty['detailImage'] = detailImgUrls;
        // }

        // Find and update property in database
        propertyModel.findOneAndUpdate({ _id: propertyId }, tmpProperty, {upsert:true}, (err) => {
            if (err) {
                reject(err);
                console.error(err);
            }
            resolve('success'); // ACK msg
        });
    })
}
