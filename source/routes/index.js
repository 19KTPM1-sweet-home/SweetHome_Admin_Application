const homeRouter = require('./home');
const propertyRouter = require('./property');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const accountRouter = require('./account');
function route(app){
  app.use('/logout',logoutRouter);
  app.use('/login',loginRouter);
  app.use('/account',accountRouter);
  app.use('/property', propertyRouter);
  app.use('/',homeRouter);
}

module.exports = route;
