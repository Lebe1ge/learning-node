module.exports = (app) => {
  const Todo = app.models.Todo;
  const User = app.models.User;

  return {
    create,
    list,
    show,
    update,
    remove
  }

  function create(req, res, next){
    let user = null;

    User.findById(req.body.userId)
      .then(app.utils.ensureOne)
      .catch(app.utils.reject(403, 'invalid.todos'))
      .then(createTodo)
      .then(setUsers)
      .then(persist)
      .then(res.commit)
      .catch(res.error)

    function createTodo(data) {
      user = data;
      return new Todo(req.body);
    }

    function setUsers(todo){
      todo.creator = req.body.userId;
      todo.assigned = req.body.userId;
      return todo;
    }

    function persist(todo){
      return todo.save()
        .then(addToUser)
        .then(() => { return todo; })

        function addToUser(todo){
          user.todos.push(todo._id);
          user.save();
        }
    }
  }

  function list(req, res, next){
    Todo.find()
      .then(res.commit)
      .catch(res.error)
  }

  function show(req, res, next){
    Todo.findById(req.params.id)
      .then(res.commit)
      .catch(res.error)
  }

  function update(req, res, next){
    Todo.findByIdAndUpdate(req.body.id, req.body)
      .then(app.utils.ensureOne)
      .catch(app.utils.reject(404, 'todos.not.found'))
      .then(res.commit)
      .catch(res.error)
  }

  function remove(req, res, next){
    Todo.findByIdAndRemove(req.params.id)
      .then(app.utils.ensureOne)
      .catch(app.utils.reject(404, 'todos.not.found'))
      .then(res.commit)
      .catch(res.error)
  }

}
