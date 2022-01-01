const scheduleModel = require('../models/Schedule');
const categoryModel = require('../models/Category');
const tourPerPage = 5;
const moment = require('moment');

module.exports.loadTourPerPage = (filter, page) => {
    return new Promise((resolve, reject) => {
        filter = filter != 'all' ? {ack: filter} : {}

        // load tours corresponding to current page
        // load from (tourPerPage * page) - tourPerPage
        // ex: tourPerPage = 8, page = 1 => 8 * 1 - 8 = 0 => the 1st page will not skip any element
        // ex: tourPerPage = 8, page = 2 => 8 * 2 - 8 = 8 => the 2nd page will skip 8 elements
        scheduleModel
            .find(filter)
            .populate({
                path: 'propertyId',
                select: 'name address seller'
            })
            .sort({'createdAt':-1})
            .skip((tourPerPage * page) - tourPerPage)
            .limit(tourPerPage)
            .exec((err, schedules) => {
                const homeTours = schedules.map((homeTour) => {
                    return {
                        id: homeTour._id.toString(),
                        status: homeTour.ack,
                        appointmentDate: moment(homeTour.appointmentDate).format("DD/MM/YYYY hh:mm A").toLocaleString(),
                        propertyName: homeTour.propertyId.name,
                        propertyAddress: homeTour.propertyId.address,
                        sellerName: homeTour.propertyId.seller.name,
                        sellerEmail: homeTour.propertyId.seller.email,
                        sellerPhoneNumber: homeTour.propertyId.seller.phoneNumber,
                        customerName: homeTour.fullName,
                        customerEmail: homeTour.email,
                        customerPhoneNumber: homeTour.phoneNumber
                    }
                })
            
                // Count total tours
                scheduleModel.countDocuments(filter, (err, count) => {
                    if(err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        resolve({
                            homeTour: homeTours,
                            numOfTour: count
                        });
                    }
                });
                
            });
    })
}

module.exports.updateTourStatus = (homeTourId, status) => {
    return new Promise((resolve, reject) => {
        scheduleModel.findOneAndUpdate({_id: homeTourId}, {ack: status}, (err) => {
            if(err) {
                console.log(err);
                reject(err);
            }
            resolve('success');
        });
    })
}