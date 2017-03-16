module.exports = (app) => {
  app.actions = {
    users: require('./users')(app),
    todos: require('./todos')(app),
    auth: require('./auth')(app)
  }
}
