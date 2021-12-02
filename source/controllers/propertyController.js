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
        const ack = await propertyService.addNewProperty(req.files.inputPreviewImage, req.files.inputDetailImage, req.body);
        res.send(JSON.stringify({response: ack}));
    }
}

module.exports = new propertyController();