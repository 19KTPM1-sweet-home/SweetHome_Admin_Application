const chartService = require('../services/chartService');
class homeController {
    //[GET]  /
    home(req, res) {
        if(req.user){
            res.render('home',{admin:req.user});
        }
        else{
            res.redirect('/login');
        }
        res.render('home');
    }

    async loadHomeTourByFilter(req, res) {
      var data;
      switch(req.params.filter) { 
            case 'day':
                data = await chartService.loadHomeTourByDays();
                break;
            case 'month':
                data = await chartService.loadHomeTourByMonths();
                break;
            case 'quarter':
                data = await chartService.loadHomeTourByQuarters();
                break;
            case 'year':
                data = await chartService.loadHomeTourByYears();
      };
      if(data)
        res.send(data);
    }
    
    async loadPropertiesOfInterest(req, res) {
        var data = await chartService.loadPropertiesOfInterest();
        if(data)
            res.send(data);
    }

    async loadTop10PropertiesOfInterest(req, res) {
        var data = await chartService.loadTop10PropertiesOfInterest();
        if(data)
            res.send(data);
    }
}

module.exports = new homeController();