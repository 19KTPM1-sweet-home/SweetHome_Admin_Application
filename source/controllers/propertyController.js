const propertyService = require('../services/propertyService');
// --------------DEFAULT VALUE OF PAGINATION-----------------
const propertiesPerPage = 5;
const fs = require('fs-extra');
class propertyController {
    //[GET]  /
    async loadProperties(req, res) {
        const properties = await propertyService.loadProperties(propertiesPerPage, req.params.currentPage);
        res.send(properties);
    }

    async addNewProperty(req, res) {
        // console.log(req.files);
        // //console.log(req.body);
        // // console.log(req.files.inputPreviewImage[0])
        fs.createFileSync('D:\\Study\\ThirdYear\\Semester_1\\Lap_trinh_web\\Project\\repo\\SweetHome_Admin_Application\\uploads\\images\\property\\a\\preview');
        //await propertyService.addNewProperty(req.files.inputPreviewImage, req.files.inputDetailImage, req.body);
        res.send('hello');
    }
}

module.exports = new propertyController();