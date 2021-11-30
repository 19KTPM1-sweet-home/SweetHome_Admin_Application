const homeRouter = require('../routes/home');
const propertyRouter = require('../routes/property');
function route(app){
  app.use('/',homeRouter);
  app.use('/property', propertyRouter);
}

module.exports = route;
