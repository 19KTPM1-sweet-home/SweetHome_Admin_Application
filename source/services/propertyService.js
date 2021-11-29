const propertyModel = require('../models/Property');

module.exports.show = () => {
    return new Promise((resolve, reject) => {
        propertyModel.find({}, (err, data) => {
            if(err) {
                console.log(err);
                reject();
            }
            else
                resolve(data);
        });
    })
}