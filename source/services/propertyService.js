const propertyModel = require('../models/Property');

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