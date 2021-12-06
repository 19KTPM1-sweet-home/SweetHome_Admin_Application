const homeRouter = require('./home');
const propertyRouter = require('./property');
const loginRouter = require('./login');
function route(app){
  app.use('/login',loginRouter);
  app.use('/property', propertyRouter);
  app.use('/',homeRouter);
}

module.exports = route;
