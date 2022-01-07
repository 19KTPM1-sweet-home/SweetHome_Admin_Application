const tourService = require('../services/tourService');
// --------------DEFAULT VALUE OF PAGINATION-----------------
const tourPerPage = 5;

class tourController {
    //[GET]  /
    async show(req, res) {
        res.render('homeTour');
    }

    async loadTourPerPage(req, res) {
      const homeTourPackage = await tourService.loadTourPerPage(req.params.filter, req.params.page);
      if(homeTourPackage)
        res.send(homeTourPackage);
    }

    
    async updateTourStatus(req, res) {
        const ack = await tourService.updateTourStatus(req.params.homeTourId, req.params.status);
        if(ack)
          res.send(ack);
    }
}

module.exports = new tourController();