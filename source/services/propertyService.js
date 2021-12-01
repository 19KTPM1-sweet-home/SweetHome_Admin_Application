const propertyModel = require('../models/Property');
const categoryModel = require('../models/Category');
const mongoose = require('mongoose');
const fs = require('fs-extra');
const slugify = require('slugify');

module.exports.loadProperties = (propertiesPerPage, currentPage) => {
    return new Promise((resolve, reject) => {
        // load properties corresponding to current page
        // load from (propertiesPerPage * currentPage) - propertiesPerPage
        // ex: propertiesPerPage = 8, currentPage = 1 => 8 * 1 - 8 = 0 => the 1st page will not skip any element
        // ex: propertiesPerPage = 8, currentPage = 2 => 8 * 2 - 8 = 8 => the 2nd page will skip 8 elements
        propertyModel
            .find()
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

async function getCategoryIdByName(categoryName) {
    return new Promise(async (resolve, reject) => {
        categoryModel.findOne({ name: categoryName }, (err, category) => {
            if(err) {
                console.log(err);
                reject(err);
            }
            resolve(category._id);
        });
    });
}

async function generateUploadPath(base, listOfImage, slug, type) {
    return new Promise((resolve, reject) => {
        // Array contains paths to store uploaded images
        var pathList = [];
        for(let i = 0; i < listOfImage.length; i++) {
            const extension = listOfImage[i].mimetype.replace('image/', '');
            pathList.push(base + slug + '-' + type + '-' + i.toString() + '.' + extension);
            if(i == listOfImage.length - 1)
                resolve(pathList);
        }
    });
}

async function saveImageToLocal(listOfPath, listOfImage) {
    return new Promise((resolve, reject) => {
        listOfImage.forEach( (img, index) => {
            fs.createFileSync(listOfPath[index]);
            fs.writeFile(listOfPath[index], img, function (err) {
                console.log('Write preview image error:' + 'at index ' + index + ':' + err);
                reject(err);
            });

            if(index == listOfImage.length - 1)
                resolve('success');
        });
    });
}

module.exports.addNewProperty = (previewImage, detailImages, newProperty) => {
    // ---------PARAMETER---------
    // previewImage: array contains preview image of property (just 1 image)
    // detailImages: array contains detail images of property
    // newProperty: object other data of property (in text)
    return new Promise(async (resolve, reject) => {
        const tmpSeller = {
            name: newProperty.sellerName,
            email: newProperty.sellerEmail,
        };
        
        if(newProperty.sellerPhoneNumber != '')
            tmpSeller["phoneNumber"] = newProperty.sellerPhoneNumber;


        const categoryObjectId = await getCategoryIdByName(newProperty.propertyCategory);
        const tmpCategory = {
            name: newProperty.propertyCategory,
            categoryId: mongoose.Types.ObjectId(categoryObjectId)
        };
        
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
        });
// [Object: null prototype] {
// inputPreviewImage: [
//   {
//     fieldname: 'inputPreviewImage',
//     originalname: 'house_7.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 09 06 07 12 10 12 15 10 12 12 15 15 15 15 15 15 16 16 16 15 15 15 15 18 16 ... 7177 more bytes>,
//     size: 7227
//   }
// ],
// inputDetailImage: [
//   {
//     fieldname: 'inputDetailImage',
//     originalname: 'house_2.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 60 00 60 00 00 ff fe 00 3b 43 52 45 41 54 4f 52 3a 20 67 64 2d 6a 70 65 67 20 76 31 2e 30 20 28 75 73 69 ... 21072 more bytes>,
//     size: 21122
//   },
        // Base paths to store uploaded images
        const baseForPreview = 'D:\\Study\\ThirdYear\\Semester_1\\Lap_trinh_web\\Project\\repo\\SweetHome_Admin_Application\\uploads\\images\\property\\' + slugify(newPropertyModel.name) + '\\preview\\';
        const baseForDetail = 'D:\\Study\\ThirdYear\\Semester_1\\Lap_trinh_web\\Project\\repo\\SweetHome_Admin_Application\\uploads\\images\\property\\' + slugify(newPropertyModel.name) + '\\detail\\';
        
        // Generate upload path for preview and detail images
        const previewPath = await generateUploadPath(baseForPreview, previewImage, slugify(newPropertyModel.name), "preview");
        const detailPaths = await generateUploadPath(baseForDetail, detailImages, slugify(newPropertyModel.name), "detail");

        // Save generated paths to model
        newPropertyModel.previewImage = previewPath[0];
        newPropertyModel.detailImage = detailPaths;

        // Save model to database
        newPropertyModel.save(async (err) => {
            if (err) {
                reject(err);
                console.error(err);
            }
            // Write preview and detail images to corresponding folder
            await saveImageToLocal(previewPath, previewImage);
            await saveImageToLocal(detailPaths, detailImages);
            resolve('Success');
        });
    })
}