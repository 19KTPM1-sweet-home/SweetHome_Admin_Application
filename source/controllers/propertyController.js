const propertyService = require('../services/propertyService');

class propertyController {
    //[GET]  /
    async show(req, res) {
        const properties = await propertyService.show();
        res.send(properties);
    }
}

module.exports = new propertyController();