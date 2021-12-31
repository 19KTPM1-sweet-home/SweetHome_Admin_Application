const propertyService = require('../services/propertyService');
// --------------DEFAULT VALUE OF PAGINATION-----------------
const propertiesPerPage = 5;

class propertyController {
    //[GET]  /
    show(req, res) {
        if(req.user){
            res.render('property');
        }
        else{
            res.redirect('/login');
        }
    }

    async loadProperties(req, res) {
        const properties = await propertyService.loadProperties(propertiesPerPage, req.params.currentPage);
        res.send(properties);
    }

    async loadProperty(req, res) {
        console.log('req: ' + req.params.id);
        const property = await propertyService.loadProperty(req.params.id);
        res.send(property);
    }

    async addNewProperty(req, res) {
        const ack = await propertyService.addNewProperty(req.files.inputPreviewImage, req.files.inputDetailImage, req.body);
        res.send(JSON.stringify({response: ack}));
    }

    async deleteProperty(req, res) {
        const ack = await propertyService.deleteProperty(req.params.id);
        res.send(JSON.stringify({response: ack}));
    }

    async editProperty(req, res) {
        const ack = await propertyService.editProperty(req.params.id, req.body);
        res.send(JSON.stringify({response: ack}));
    }
}

module.exports = new propertyController();