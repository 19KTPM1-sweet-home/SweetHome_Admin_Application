const propertyService = require('../services/propertyService');
const propertiesPerPage = 5; // number of properties per page

class propertyController {
    //[GET]  /
    async loadProperties(req, res) {
        const properties = await propertyService.loadProperties(propertiesPerPage, req.params.currentPage);
        res.send(properties);
    }
}

module.exports = new propertyController();