const scheduleModel = require('../models/Schedule');
const categoryModel = require('../models/Category');
const userModel = require('../models/User');
const moment = require('moment');

function loadCategory() {
    return new Promise((resolve, reject) => {
        categoryModel.find({}, 'name', (err, result) => {
            if(err) {
                console.log(err);
                reject(err);
            }
            result = result.map((category) => {
                return category.name;
            })

            resolve(result);
        });
    });
}

function loadAllHomeTour() {
    return new Promise(async (resolve, reject) => {
        scheduleModel
        .find()
        .select('propertyId createdAt')
        .populate({
            path: 'propertyId',
            select: 'category'
        })
        .exec((err, schedules) => {
            const result = schedules.map((homeTour) => {
                return {
                    category: homeTour.propertyId.category.name,
                    createdAt: moment(homeTour.createdAt).format("DD/MM/YYYY").toLocaleString()
                }
            })
            resolve(result);
        });
    })
}

function numOfHomeTourOfAllCategoryByDay(listOfCategory, listOfDate) {
    return new Promise(async (resolve, reject) => {
        var resultSet = await loadAllHomeTour();
        
        var dataSet = [];
        // Init dataset with label corresponding to each category and empty data
        for(let i = 0; i < listOfCategory.length; i++) {
            var tmp = {
                label: listOfCategory[i],
                data: []
            };

            for(let j = 0; j < listOfDate.length; j++) {
                const numOfHomeTour = resultSet.filter((homeTour) => {
                    return homeTour.category == listOfCategory[i] && homeTour.createdAt == listOfDate[j]
                }).length;
                tmp.data.push(numOfHomeTour);
            }

            dataSet.push(tmp);
        }
        resolve(dataSet);
    })
}

module.exports.loadHomeTourByDays = () => {
    return new Promise(async (resolve, reject) => {
        const numOfDaysToLoad = 4;


        const listOfCategory = await loadCategory();
        // Just load num of home tour in the last 7 days
        var listOfDate = [];

        const today = moment();
        // listOfDate.push(moment(today.format("DD/MM/YYYY").toLocaleString(), 'DD/MM/YYYY'));
        listOfDate.push(moment(today).format("DD/MM/YYYY").toLocaleString());
        for(let i = 0; i < numOfDaysToLoad; i++) {
            // let date = moment(today.subtract(1, 'days').format("DD/MM/YYYY").toLocaleString(), 'DD/MM/YYYY');
            let date = moment(today.subtract(1, 'days')).format("DD/MM/YYYY").toLocaleString();
            listOfDate.push(date);
        }
        listOfDate.reverse();

        const data = await numOfHomeTourOfAllCategoryByDay(listOfCategory, listOfDate);
        resolve({listOfDate: listOfDate, datasets: data});
    })
}


function numOfHomeTourOfAllCategoryByMonth(listOfCategory, listOfMonth) {
    return new Promise(async (resolve, reject) => {
        var resultSet = await loadAllHomeTour();
        
        var dataSet = [];
        // Init dataset with label corresponding to each category and empty data
        for(let i = 0; i < listOfCategory.length; i++) {
            var tmp = {
                label: listOfCategory[i],
                data: []
            };

            for(let j = 0; j < listOfMonth.length; j++) {
                const numOfHomeTour = resultSet.filter((homeTour) => {
                    const currentMonth = moment(listOfMonth[j], "DD/MM/YYYY").month() + 1;
                    const createdAtMonth = moment(homeTour.createdAt, "DD/MM/YYYY").month() + 1;
                    
                    return homeTour.category == listOfCategory[i] && Math.abs(currentMonth - createdAtMonth) == 0
                }).length;
                tmp.data.push(numOfHomeTour);
            }

            dataSet.push(tmp);
        }

        resolve(dataSet);
    })
}

module.exports.loadHomeTourByMonths = () => {
    return new Promise(async (resolve, reject) => {
        const numOfMonthsToLoad = 11;


        const listOfCategory = await loadCategory();
        // Load num of home tour in the 12 months
        var listOfMonth = [];

        const currentYear = moment().year();
        const date = moment('01/12/' + currentYear.toString(), "DD/MM/YYYY");
        listOfMonth.push(date.format("DD/MM/YYYY").toLocaleString());
        for(let i = 0; i < numOfMonthsToLoad; i++) {
            let tmp = moment(date.subtract(1, 'months'), "DD/MM/YYYY").format("DD/MM/YYYY").toLocaleString();
            listOfMonth.push(tmp);
        }
        listOfMonth.reverse();

        const data = await numOfHomeTourOfAllCategoryByMonth(listOfCategory, listOfMonth);
        for(let i = 0; i < listOfMonth.length; i++) {
            listOfMonth[i] = moment(listOfMonth[i], "DD/MM/YYYY").format("MMM");
        }
        resolve({listOfMonth: listOfMonth, datasets: data});
    })
}

function numOfHomeTourOfAllCategoryByQuarter(listOfCategory, listOfQuarter) {
    return new Promise(async (resolve, reject) => {
        var resultSet = await loadAllHomeTour();
        
        var dataSet = [];
        // Init dataset with label corresponding to each category and empty data
        for(let i = 0; i < listOfCategory.length; i++) {
            var tmp = {
                label: listOfCategory[i],
                data: []
            };

            for(let j = 0; j < listOfQuarter.length; j++) {
                const numOfHomeTour = resultSet.filter((homeTour) => {
                    const currentQuarter = listOfQuarter[j];
                    const createdAtQuarter = moment(homeTour.createdAt, "DD/MM/YYYY").quarter();

                    return homeTour.category == listOfCategory[i] && currentQuarter == createdAtQuarter
                }).length;
                tmp.data.push(numOfHomeTour);
            }

            dataSet.push(tmp);
        }

        resolve(dataSet);
    })
}

module.exports.loadHomeTourByQuarters = () => {
    return new Promise(async (resolve, reject) => {


        const listOfCategory = await loadCategory();
        // Load num of home tour in each of 4 quarters
        var listOfQuarter = [1, 2, 3, 4];


        const data = await numOfHomeTourOfAllCategoryByQuarter(listOfCategory, listOfQuarter);

        for(let i = 0; i < listOfQuarter.length; i++) {
            listOfQuarter[i] = 'Quarter ' + listOfQuarter[i].toString();
        }
        resolve({listOfQuarter: listOfQuarter, datasets: data});
    })
}


function numOfHomeTourOfAllCategoryByYear(listOfCategory, listOfYear) {
    return new Promise(async (resolve, reject) => {
        var resultSet = await loadAllHomeTour();
        
        var dataSet = [];
        // Init dataset with label corresponding to each category and empty data
        for(let i = 0; i < listOfCategory.length; i++) {
            var tmp = {
                label: listOfCategory[i],
                data: []
            };

            for(let j = 0; j < listOfYear.length; j++) {
                const numOfHomeTour = resultSet.filter((homeTour) => {
                    const currentYear = listOfYear[j];
                    const createdAtYear = moment(homeTour.createdAt, "DD/MM/YYYY").year();
                    
                    return homeTour.category == listOfCategory[i] && currentYear == createdAtYear
                }).length;
                tmp.data.push(numOfHomeTour);
            }

            dataSet.push(tmp);
        }

        resolve(dataSet);
    })
}

module.exports.loadHomeTourByYears = () => {
    return new Promise(async (resolve, reject) => {
        const numOfYearsToLoad = 4;


        const listOfCategory = await loadCategory();
        // Load num of home tour in the 12 months
        var listOfYear = [];

        const currentYear = moment().year();
        listOfYear.push(currentYear);
        for(let i = 1; i <= numOfYearsToLoad; i++) {
            listOfYear.push(currentYear - i);
        }
        listOfYear.reverse();

        const data = await numOfHomeTourOfAllCategoryByYear(listOfCategory, listOfYear);
        
        resolve({listOfYear: listOfYear, datasets: data});
    })
}

function loadCategoryOfAllFavouriteProperties() {
    return new Promise(async (resolve, reject) => {
        userModel
        .find()
        .select('favourite')
        .populate({
            path: 'favourite',
            select: 'category'
        })
        .exec((err, favouriteProperties) => {
            if(err) {
                console.log(err);
                reject(err);
                return;
            }
            // for(let i = 0; i < favouriteProperties.length; i++) {
            //     result.concat(favouriteProperties[i].favourite);
            // }
            var result = favouriteProperties.map((favouriteList) => {
                return favouriteList.favourite;
            })
            result = result.flat();
            result = result.map((property) => {
                return property.category.name;
            })
            resolve(result);
        });
    })
}

module.exports.loadPropertiesOfInterest = () => {
    return new Promise(async (resolve, reject) => {
        const listOfCategory = await loadCategory();
        const listCategoryOfAllFavouriteProperties = await loadCategoryOfAllFavouriteProperties();

        var datasets = listOfCategory.map((category) => {
            const numOfProperties = listCategoryOfAllFavouriteProperties.filter((item) => {
                return item == category;
            }).length;
            return (numOfProperties * 100 / listCategoryOfAllFavouriteProperties.length).toFixed(2);
        });
        resolve({listOfCategory: listOfCategory, datasets: datasets});
    });
}

function loadAllFavouriteProperties() {
    return new Promise(async (resolve, reject) => {
        userModel
        .find()
        .select('favourite')
        .populate({
            path: 'favourite',
            select: 'name category.name address seller.name price'
        })
        .exec((err, favouriteProperties) => {
            if(err) {
                console.log(err);
                reject(err);
                return;
            }
            

            var result = favouriteProperties.map((favouriteList) => {
                return favouriteList.favourite;
            })
            
            result = result.flat();
            result = result.map((property) => {
                return {
                    _id: property._id.toString(),
                    name: property.name,
                    category: property.category.name,
                    address: property.address,
                    seller: property.seller.name,
                    price: property.price.toLocaleString()
                };
            })
            resolve(result);
        });
    })
}

module.exports.loadTop10PropertiesOfInterest = () => {
    return new Promise(async (resolve, reject) => {
        var listOfAllFavouriteProperties = await loadAllFavouriteProperties();

        var counts = {};
        // Count and delete duplicates
        listOfAllFavouriteProperties  = listOfAllFavouriteProperties.filter((property) => {
            const tmp = (counts[property._id] || 0) + 1;
            counts[property._id] = tmp;
            if(tmp > 1)
                return false;
            return true;
        });

        // Add count to each property object => for sorting later
        listOfAllFavouriteProperties  = listOfAllFavouriteProperties.map((property) => {
            var newProperty = property;
            newProperty['count'] = counts[property._id];
            return newProperty;
        });

        // Sort in descending order
        listOfAllFavouriteProperties.sort((first, second) => {
            return second.count - first.count;
        });
        resolve(listOfAllFavouriteProperties.slice(0, 10));
    });
}