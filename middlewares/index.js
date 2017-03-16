module.exports = (app) => {
  app.middlewares = {
    bodyParser: require('body-parser'),
    ensureFields: require('./ensureFields')
  };
}
