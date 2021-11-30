const propertyService = require('../services/propertyService');
// --------------DEFAULT VALUE OF PAGINATION-----------------
const propertiesPerPage = 5;

class propertyController {
    //[GET]  /
    async loadProperties(req, res) {
        const properties = await propertyService.loadProperties(propertiesPerPage, req.params.currentPage);
        res.send(properties);
    }

    async addNewProperty(req, res) {
        console.log(req.files);
        console.log(req.body);
        // await propertyService.addNewProperty(req.body);
        res.send('hello');
    }
}

module.exports = new propertyController();