const Router = require('express').Router

module.exports = (app) => {
  let router = new Router()

  router.post('/',
    app.middlewares.ensureAuthenticated,
    app.middlewares.bodyParser.json(),
    app.middlewares.ensureFields('title'),
    app.actions.todos.create
  );

  router.get('/',
    app.middlewares.ensureAuthenticated,
    app.actions.todos.list)

  router.get('/:id',
    app.middlewares.ensureAuthenticated,
    app.actions.todos.show)

  router.put('/',
    app.middlewares.ensureAuthenticated,
    app.middlewares.bodyParser.json(),
    app.actions.todos.update)

  router.put('/:id/assign/:assignedId',
    app.middlewares.ensureAuthenticated,
    app.actions.todos.assign)

  router.delete('/:id',
    app.middlewares.ensureAuthenticated,
    app.actions.todos.remove)

  return router
}
