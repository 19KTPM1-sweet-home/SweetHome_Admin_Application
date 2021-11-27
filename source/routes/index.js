const homeRouter = require('../routes/home');

function route(app){
  app.use('/',homeRouter);
}

module.exports = route;
