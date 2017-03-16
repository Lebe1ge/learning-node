module.exports = (app) => {
  app.middlewares = {
    bodyParser: require('body-parser'),
    ensureFields: require('./ensureFields'),
    ensureAuthenticated: require('./ensureAuthenticated')(app)
  };

  app.use(require('./boot'));

}
