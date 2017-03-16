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
      .then(ensureOne)
      .then(createTodo)
      .then(setUsers)
      .then(persist)
      .then(respond.bind(null, res))
      .catch(spread.bind(null, res))

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
      .then(respond.bind(null, res))
      .catch(spread.bind(null, res))
  }

  function show(req, res, next){
    Todo.findById(req.params.id)
      .then(respond.bind(null, res))
      .catch(spread.bind(null, res))
  }

  function update(req, res, next){
    Todo.findByIdAndUpdate(req.body.id, req.body)
      .then(ensureOne)
      .then(respond.bind(null, res))
      .catch(spread.bind(null, res))
  }

  function remove(req, res, next){
    Todo.findByIdAndRemove(req.params.id)
      .then(ensureOne)
      .then(respond.bind(null, res))
      .catch(spread.bind(null, res))
  }

}

function ensureOne(data){
  return (data) ? data : Promise.reject({code: 404, message: 'todo.not.found'})
}

function respond(res, data) {
  if(!data)
    return res.status(204).send()

  return res.send(data)
}

function spread(res, error) {
  if(error.code){
    return res.status(error.code).send(error.message)
  }
  return res.status(500).send(error.message)
}
