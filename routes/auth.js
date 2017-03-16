const Router = require('express').Router;

module.exports = (app) => {
  let router = new Router();

  router.post('/login',
    app.middlewares.bodyParser.json(),
    app.middlewares.ensureFields(['email', 'password']),
    app.actions.auth.login
  );

  return router;
};
